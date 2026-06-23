import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'
import { parsePagination } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const desde = searchParams.get('desde')
  const hasta = searchParams.get('hasta')
  const { page, limit, skip } = parsePagination(searchParams)

  try {
    const dateFilter: Record<string, Date> = {}
    if (desde) dateFilter.gte = new Date(desde)
    if (hasta) dateFilter.lte = new Date(hasta + 'T23:59:59.999Z')
    const where = Object.keys(dateFilter).length ? { creadoEn: dateFilter } : {}

    const [entradas, total] = await Promise.all([
      prisma.entradaMercaderia.findMany({
        where,
        include: {
          producto: { select: { id: true, nombre: true, codigo: true } },
          proveedor: { select: { id: true, nombre: true, ruc: true } },
          usuario: { select: { id: true, nombre: true } },
        },
        orderBy: { creadoEn: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.entradaMercaderia.count({ where }),
    ])

    const result = entradas.map((e) => ({
      ...e,
      cantidad: Number(e.cantidad),
    }))

    return NextResponse.json({ entradas: result, total, page, totalPages: Math.ceil(total / limit) })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN', 'ALMACENERO'])
  if (auth instanceof NextResponse) return auth

  try {
    const { productoId, proveedorId, cantidad } = await req.json()

    if (!productoId || !proveedorId || cantidad === undefined) {
      return NextResponse.json({ message: 'productoId, proveedorId y cantidad son requeridos' }, { status: 400 })
    }
    const cant = parseInt(cantidad)
    if (isNaN(cant) || cant <= 0) {
      return NextResponse.json({ message: 'La cantidad debe ser un número entero positivo' }, { status: 400 })
    }

    const producto = await prisma.producto.findUnique({ where: { id: parseInt(productoId) } })
    if (!producto || !producto.activo) {
      return NextResponse.json({ message: 'Producto no disponible' }, { status: 400 })
    }
    const proveedor = await prisma.proveedor.findUnique({ where: { id: parseInt(proveedorId) } })
    if (!proveedor || !proveedor.activo) {
      return NextResponse.json({ message: 'Proveedor no disponible' }, { status: 400 })
    }

    const entrada = await prisma.$transaction(async (tx) => {
      const nueva = await tx.entradaMercaderia.create({
        data: {
          productoId: parseInt(productoId),
          proveedorId: parseInt(proveedorId),
          cantidad: cant,
          usuarioId: auth.id,
        },
        include: {
          producto: { select: { id: true, nombre: true, codigo: true } },
          proveedor: { select: { id: true, nombre: true, ruc: true } },
          usuario: { select: { id: true, nombre: true } },
        },
      })

      await tx.producto.update({
        where: { id: parseInt(productoId) },
        data: { stock: { increment: cant } },
      })

      return nueva
    })

    return NextResponse.json(entrada, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
