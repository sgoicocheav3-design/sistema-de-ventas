import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const auth = withAuth(req, ['GERENTE', 'ADMIN'])
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const estado = searchParams.get('estado') || 'PENDIENTE'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '50')

  try {
    const [solicitudes, total] = await Promise.all([
      prisma.solicitudReposicion.findMany({
        where: { estado },
        include: {
          producto: { select: { id: true, nombre: true, codigo: true, stock: true } },
          solicitante: { select: { id: true, nombre: true } },
          revisor: { select: { id: true, nombre: true } },
        },
        orderBy: { creadoEn: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.solicitudReposicion.count({ where: { estado } }),
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
