import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { calcularTotalesConIgvIncluido } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''
  const categoria = searchParams.get('categoria')
  const limitStr = searchParams.get('limit')
  const limit = limitStr ? parseInt(limitStr) : 50

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
      take: limit,
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

    const isMP = ['YAPE', 'PLIN', 'TARJETA'].includes(metodoPago)

    const venta = await prisma.$transaction(async (tx) => {
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
        lineas.push({ productoId: item.productoId, cantidad: item.cantidad, precioUnitario: precioUnit })
      }

      const { total, subtotalSinIgv, igvIncluido } = calcularTotalesConIgvIncluido(
        lineas.map((l) => ({ precio: l.precioUnitario, cantidad: l.cantidad }))
      )
      const subtotal = subtotalSinIgv
      const igv = igvIncluido
      const recibido = Number(montoRecibido || 0)

      if (metodoPago === 'EFECTIVO' && recibido < total) {
        throw new Error(`Monto recibido insuficiente. Total: S/ ${total.toFixed(2)}, recibido: S/ ${recibido.toFixed(2)}`)
      }

      const montoRecibidoFinal = isMP ? total : (metodoPago === 'EFECTIVO' ? recibido : total)
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
          estado: isMP ? 'PENDIENTE' : 'COMPLETADA',
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

    let qrData = null;
    let pagoId = null;

    if (isMP) {
      const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' });
      const preference = new Preference(client);
      
      const protocol = req.headers.get('x-forwarded-proto') || 'http';
      const host = req.headers.get('host');
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;
      
      const pref = await preference.create({
        body: {
          items: [
            {
              id: venta.numero,
              title: `Venta ${venta.numero}`,
              quantity: 1,
              unit_price: Number(venta.total)
            }
          ],
          external_reference: venta.id.toString(),
          notification_url: `${baseUrl}/api/webhooks/mercadopago`,
        }
      });
      
      qrData = pref.init_point;
      pagoId = pref.id;

      await prisma.venta.update({
        where: { id: venta.id },
        data: { pagoId, qrData }
      });
    }

    return NextResponse.json({ ...venta, qrData, pagoId }, { status: 201 })
  } catch (err: any) {
    console.error("Venta Error Detail:", err);
    const message = err?.message || 'Error al procesar la venta'
    const status = message.includes('Stock') || message.includes('Monto') ? 400 : 500
    return NextResponse.json({ message: `Error del Servidor: ${message}` }, { status })
  }
}
