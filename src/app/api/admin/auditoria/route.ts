import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'
import { parsePagination } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const auth = withAuth(req, ['ADMIN', 'GERENTE'])
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const { page, limit, skip } = parsePagination(searchParams)
  const userId = searchParams.get('userId')

  try {
    const where: Record<string, unknown> = {}
    if (userId) where.usuarioId = parseInt(userId)

    const [registros, total] = await Promise.all([
      prisma.logAcceso.findMany({
        where,
        include: { usuario: { select: { id: true, nombre: true, rol: true } } },
        orderBy: { creadoEn: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.logAcceso.count({ where }),
    ])

    return NextResponse.json({ registros, total, page, totalPages: Math.ceil(total / limit) })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
