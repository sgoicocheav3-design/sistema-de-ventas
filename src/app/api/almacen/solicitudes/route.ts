import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'
import { parsePagination } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const estado = searchParams.get('estado') || 'PENDIENTE'
  const { page, limit, skip } = parsePagination(searchParams)

  try {
    const where: Record<string, unknown> = { estado }
    if (auth.rol !== 'GERENTE' && auth.rol !== 'ADMIN') {
      where.solicitanteId = auth.id
    }

    const [solicitudes, total] = await Promise.all([
      prisma.solicitudReposicion.findMany({
        where,
        include: {
          producto: { select: { id: true, nombre: true, codigo: true, stock: true } },
          solicitante: { select: { id: true, nombre: true } },
          revisor: { select: { id: true, nombre: true } },
        },
        orderBy: { creadoEn: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.solicitudReposicion.count({ where }),
    ])

    const result = solicitudes.map((s) => ({
      ...s,
      cantidad: Number(s.cantidad),
    }))

    return NextResponse.json({ solicitudes: result, total, page, totalPages: Math.ceil(total / limit) })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { productoId, cantidad } = await req.json()

    if (!productoId || cantidad === undefined) {
      return NextResponse.json({ message: 'productoId y cantidad son requeridos' }, { status: 400 })
    }
    const cant = parseInt(cantidad)
    if (isNaN(cant) || cant <= 0) {
      return NextResponse.json({ message: 'La cantidad debe ser un número entero positivo' }, { status: 400 })
    }

    const producto = await prisma.producto.findUnique({ where: { id: parseInt(productoId) } })
    if (!producto || !producto.activo) {
      return NextResponse.json({ message: 'Producto no disponible' }, { status: 400 })
    }

    const solicitud = await prisma.solicitudReposicion.create({
      data: {
        productoId: parseInt(productoId),
        cantidad: cant,
        solicitanteId: auth.id,
      },
      include: {
        producto: { select: { id: true, nombre: true, codigo: true, stock: true } },
        solicitante: { select: { id: true, nombre: true } },
      },
    })

    return NextResponse.json(solicitud, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
