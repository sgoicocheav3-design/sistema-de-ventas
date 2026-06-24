import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'
import { parsePagination } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  const { searchParams } = new URL(req.url)
  const estado = searchParams.get('estado') || ''
  const soloCritico = searchParams.get('solo_critico') === 'true'
  const desde = searchParams.get('desde') || ''
  const hasta = searchParams.get('hasta') || ''
  const { page, limit } = parsePagination(searchParams)

  try {
    const where: Record<string, unknown> = {}
    if (estado) where.estado = estado
    if (soloCritico) {
      where.producto = {
        stock: { lte: 15 },
      }
    }
    if (desde || hasta) {
      const fecha: Record<string, Date> = {}
      if (desde) fecha.gte = new Date(desde + 'T00:00:00')
      if (hasta) fecha.lte = new Date(hasta + 'T23:59:59')
      where.creadoEn = fecha
    }
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
  const auth = withAuth(req, ['ADMIN', 'ALMACENERO'])
  if (auth instanceof NextResponse) return auth

  try {
    const { items } = await req.json()

    if (!items?.length) {
      return NextResponse.json({ message: 'Debe seleccionar al menos un producto' }, { status: 400 })
    }

    const creadas = await prisma.$transaction(async (tx) => {
      const results = []
      for (const item of items) {
        const cant = parseInt(item.cantidad_solicitada)
        if (isNaN(cant) || cant <= 0) {
          throw new Error(`Cantidad inválida para producto #${item.productoId}`)
        }
        const solicitud = await tx.solicitudReposicion.create({
          data: {
            productoId: parseInt(item.productoId),
            cantidad: cant,
            solicitanteId: auth.id,
          },
          include: {
            producto: { select: { id: true, nombre: true, codigo: true, stock: true } },
            solicitante: { select: { id: true, nombre: true } },
          },
        })
        results.push(solicitud)
      }
      return results
    })

    const gerentes = await prisma.usuario.findMany({
      where: { rol: 'GERENTE', activo: true },
      select: { id: true },
    })
    if (gerentes.length > 0) {
      await prisma.notificacion.createMany({
        data: gerentes.map((g) => ({
          usuarioId: g.id,
          titulo: 'Nueva solicitud de reposición',
          mensaje: `${auth.nombre} ha creado ${creadas.length} solicitud(es) de reposición.`,
        })),
      })
    }

    return NextResponse.json(creadas, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error interno del servidor'
    return NextResponse.json({ message }, { status: 400 })
  }
}
