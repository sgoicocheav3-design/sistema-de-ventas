import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'

const MAX_ATTEMPTS = 5
const BLOCK_MINUTES = 15

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ message: 'Email y contraseña requeridos' }, { status: 400 })
    }
    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 400 })
    }

    const usuario = await prisma.usuario.findUnique({ where: { email: email.toLowerCase().trim() } })
    if (!usuario) {
      return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 })
    }

    if (usuario.bloqueadoHasta && new Date() < new Date(usuario.bloqueadoHasta)) {
      return NextResponse.json({
        message: 'Cuenta temporalmente bloqueada. Intenta de nuevo más tarde.',
      }, { status: 429 })
    }

    if (!usuario.activo) {
      return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 })
    }

    const passwordValida = await bcrypt.compare(password, usuario.passwordHash)
    if (!passwordValida) {
      const attempts = (usuario.intentosFallidos || 0) + 1
      const updates: Record<string, unknown> = { intentosFallidos: attempts }
      if (attempts >= MAX_ATTEMPTS) {
        updates.bloqueadoHasta = new Date(Date.now() + BLOCK_MINUTES * 60 * 1000)
        updates.intentosFallidos = 0
      }
      await prisma.usuario.update({ where: { id: usuario.id }, data: updates })
      return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 })
    }

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { intentosFallidos: 0, bloqueadoHasta: null },
    })

    const token = signToken({ id: usuario.id, rol: usuario.rol, nombre: usuario.nombre })

    await prisma.logAcceso.create({
      data: { usuarioId: usuario.id, accion: `Inicio de sesión - ${usuario.rol}` },
    })

    const response = NextResponse.json({
      token,
      user: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
    })

    response.cookies.set('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 3600,
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
