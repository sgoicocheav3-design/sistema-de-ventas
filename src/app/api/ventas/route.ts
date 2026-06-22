import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''
  const categoria = searchParams.get('categoria')

  try {
    const where: Record<string, unknown> = { activo: true, stock: { gt: 0 } }

    if (q.trim()) {
      where.OR = [
        { nombre: { contains: q.trim(), mode: 'insensitive' } },
        { marca: { contains: q.trim(), mode: 'insensitive' } },
        { categoria: { nombre: { contains: q.trim(), mode: 'insensitive' } } },
      ]
    }
    if (categoria) where.categoriaId = parseInt(categoria)

    const productos = await prisma.producto.findMany({
      where,
      select: {
        id: true, nombre: true, marca: true, precio: true, stock: true,
        categoria: { select: { id: true, nombre: true } },
      },
      orderBy: { nombre: 'asc' },
      take: 20,
    })

    return NextResponse.json(productos)
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = withAuth(req, ['VENDEDOR', 'ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const { items, metodoPago, montoRecibido, clienteId } = await req.json()

    if (!items?.length) {
      return NextResponse.json({ message: 'El carrito no puede estar vacío' }, { status: 400 })
    }
    const metodosValidos = ['EFECTIVO', 'YAPE', 'PLIN', 'TARJETA', 'CHEQUE', 'TRANSFERENCIA']
    if (!metodosValidos.includes(metodoPago)) {
      return NextResponse.json({ message: 'Método de pago inválido' }, { status: 400 })
    }

    const venta = await prisma.$transaction(async (tx) => {
      let subtotal = 0
      const lineas: Array<{ productoId: number; cantidad: number; precioUnitario: number }> = []

      for (const item of items) {
        const producto = await tx.producto.findUnique({
          where: { id: item.productoId },
          select: { id: true, nombre: true, precio: true, stock: true, activo: true },
        })
        if (!producto || !producto.activo) {
          throw new Error(`Producto #${item.productoId} no disponible`)
        }
        if (producto.stock < item.cantidad) {
          throw new Error(`Stock insuficiente para "${producto.nombre}". Disponible: ${producto.stock}`)
        }
        const precioUnit = Number(producto.precio)
        subtotal += precioUnit * item.cantidad
        lineas.push({ productoId: item.productoId, cantidad: item.cantidad, precioUnitario: precioUnit })
      }

      const igv = Math.round(subtotal * 0.18 * 100) / 100
      const total = Math.round((subtotal + igv) * 100) / 100
      const recibido = Number(montoRecibido || 0)

      if (metodoPago === 'EFECTIVO' && recibido < total) {
        throw new Error(`Monto recibido insuficiente. Total: S/ ${total.toFixed(2)}, recibido: S/ ${recibido.toFixed(2)}`)
      }

      const montoRecibidoFinal = metodoPago === 'EFECTIVO' ? recibido : total
      const vuelto = metodoPago === 'EFECTIVO' ? recibido - total : 0

      const ventasHoy = await tx.venta.count({
        where: { creadoEn: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
      })
      const now = new Date()
      const numero = `V-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(ventasHoy + 1).padStart(4, '0')}`

      const nuevaVenta = await tx.venta.create({
        data: {
          numero,
          usuarioId: auth.id,
          clienteId: clienteId ? parseInt(clienteId) : null,
          subtotal,
          igv,
          total,
          metodoPago,
          montoRecibido: montoRecibidoFinal,
          vuelto,
          detalles: {
            create: lineas.map((l) => ({
              productoId: l.productoId,
              cantidad: l.cantidad,
              precioUnitario: l.precioUnitario,
              subtotal: l.precioUnitario * l.cantidad,
            })),
          },
        },
        include: {
          detalles: { include: { producto: { select: { nombre: true, marca: true } } } },
          usuario: { select: { id: true, nombre: true } },
          cliente: { select: { id: true, dni: true, nombre: true } },
        },
      })

      for (const l of lineas) {
        await tx.producto.update({
          where: { id: l.productoId },
          data: { stock: { decrement: l.cantidad } },
        })
      }

      return nuevaVenta
    })

    return NextResponse.json(venta, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al procesar la venta'
    const status = message.includes('Stock') || message.includes('Monto') ? 400 : 500
    return NextResponse.json({ message }, { status })
  }
}
