import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (user) {
      await prisma.logAcceso.create({
        data: { usuarioId: user.id, accion: `Cierre de sesión - ${user.rol}` },
      })
    }

    const response = NextResponse.json({ message: 'Sesión cerrada' })
    response.cookies.set('auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
