import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = withAuth(req, ['GERENTE', 'ADMIN'])
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const { estado } = await req.json()

    if (!['APROBADA', 'RECHAZADA'].includes(estado)) {
      return NextResponse.json({ message: 'Estado inválido. Debe ser APROBADA o RECHAZADA' }, { status: 400 })
    }

    const solicitud = await prisma.solicitudReposicion.findUnique({ where: { id: parseInt(id) } })
    if (!solicitud) {
      return NextResponse.json({ message: 'Solicitud no encontrada' }, { status: 404 })
    }
    if (solicitud.estado !== 'PENDIENTE') {
      return NextResponse.json({ message: 'La solicitud ya fue revisada' }, { status: 400 })
    }

    const actualizada = await prisma.solicitudReposicion.update({
      where: { id: parseInt(id) },
      data: { estado, revisadoEn: new Date(), revisorId: auth.id },
      include: {
        producto: { select: { id: true, nombre: true, codigo: true, stock: true } },
        solicitante: { select: { id: true, nombre: true } },
        revisor: { select: { id: true, nombre: true } },
      },
    })

    return NextResponse.json(actualizada)
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && (err as { code: string }).code === 'P2025') {
      return NextResponse.json({ message: 'Solicitud no encontrada' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
