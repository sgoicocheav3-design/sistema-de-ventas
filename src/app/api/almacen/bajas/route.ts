import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const desde = searchParams.get('desde')
  const hasta = searchParams.get('hasta')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '50')

  try {
    const dateFilter: Record<string, Date> = {}
    if (desde) dateFilter.gte = new Date(desde)
    if (hasta) dateFilter.lte = new Date(hasta + 'T23:59:59.999Z')
    const where = Object.keys(dateFilter).length ? { creadoEn: dateFilter } : {}

    const [bajas, total] = await Promise.all([
      prisma.bajaInventario.findMany({
        where,
        include: {
          producto: { select: { id: true, nombre: true, codigo: true } },
          usuario: { select: { id: true, nombre: true } },
        },
        orderBy: { creadoEn: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.bajaInventario.count({ where }),
    ])

    const result = bajas.map((b) => ({
      ...b,
      cantidad: Number(b.cantidad),
    }))

    return NextResponse.json({ bajas: result, total, page, totalPages: Math.ceil(total / limit) })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN', 'ALMACENERO'])
  if (auth instanceof NextResponse) return auth

  try {
    const { productoId, cantidad, motivo } = await req.json()

    if (!productoId || !cantidad || !motivo?.trim()) {
      return NextResponse.json({ message: 'productoId, cantidad y motivo son requeridos' }, { status: 400 })
    }
    const cant = parseInt(cantidad)
    if (isNaN(cant) || cant <= 0) {
      return NextResponse.json({ message: 'La cantidad debe ser un número entero positivo' }, { status: 400 })
    }

    const producto = await prisma.producto.findUnique({ where: { id: parseInt(productoId) } })
    if (!producto || !producto.activo) {
      return NextResponse.json({ message: 'Producto no disponible' }, { status: 400 })
    }
    if (producto.stock < cant) {
      return NextResponse.json({ message: `Stock insuficiente. Disponible: ${producto.stock}` }, { status: 400 })
    }

    const baja = await prisma.$transaction(async (tx) => {
      const nueva = await tx.bajaInventario.create({
        data: {
          productoId: parseInt(productoId),
          cantidad: cant,
          motivo: motivo.trim(),
          usuarioId: auth.id,
        },
        include: {
          producto: { select: { id: true, nombre: true, codigo: true } },
          usuario: { select: { id: true, nombre: true } },
        },
      })

      await tx.producto.update({
        where: { id: parseInt(productoId) },
        data: { stock: { decrement: cant } },
      })

      return nueva
    })

    return NextResponse.json(baja, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
