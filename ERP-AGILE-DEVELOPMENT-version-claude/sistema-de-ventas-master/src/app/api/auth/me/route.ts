import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest, signToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const payload = getUserFromRequest(req)
    if (!payload) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: payload.id },
      select: { id: true, nombre: true, email: true, rol: true, activo: true },
    })

    if (!usuario || !usuario.activo) {
      return NextResponse.json({ message: 'Usuario no disponible' }, { status: 401 })
    }

    const newToken = signToken({ id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol })

    return NextResponse.json({
      token: newToken,
      user: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
    })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
