import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'
import { parsePagination } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN', 'ALMACENERO'])
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const { page, limit, skip } = parsePagination(searchParams)

  try {
    const where = { activo: false }

    const [productos, total] = await Promise.all([
      prisma.producto.findMany({
        where,
        include: { categoria: { select: { id: true, nombre: true } } },
        orderBy: { nombre: 'asc' },
        skip,
        take: limit,
      }),
      prisma.producto.count({ where }),
    ])

    const result = productos.map((p) => ({
      ...p,
      precio: Number(p.precio),
    }))

    return NextResponse.json({ productos: result, total, page, totalPages: Math.ceil(total / limit) })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
