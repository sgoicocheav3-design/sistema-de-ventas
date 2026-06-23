import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const notificaciones = await prisma.notificacion.findMany({
      where: { usuarioId: auth.id },
      orderBy: { creadoEn: 'desc' },
      take: 50,
    })
    const noLeidas = await prisma.notificacion.count({
      where: { usuarioId: auth.id, leida: false },
    })
    return NextResponse.json({ notificaciones, noLeidas })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const auth = withAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { ids } = await req.json()
    await prisma.notificacion.updateMany({
      where: { id: { in: ids }, usuarioId: auth.id },
      data: { leida: true },
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
