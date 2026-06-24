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

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
    const userAgent = req.headers.get('user-agent') || null

    const usuario = await prisma.usuario.findUnique({ where: { email: email.toLowerCase().trim() } })
    if (!usuario) {
      await prisma.logAcceso.create({
        data: { email: email.toLowerCase().trim(), accion: 'LOGIN_FAIL', ip, userAgent },
      })
      return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 })
    }

    if (usuario.bloqueadoHasta && new Date() < new Date(usuario.bloqueadoHasta)) {
      await prisma.logAcceso.create({
        data: { usuarioId: usuario.id, email: usuario.email, accion: 'LOGIN_FAIL', ip, userAgent },
      })
      return NextResponse.json({
        message: 'Cuenta temporalmente bloqueada. Intenta de nuevo más tarde.',
      }, { status: 429 })
    }

    if (!usuario.activo) {
      await prisma.logAcceso.create({
        data: { email: usuario.email, accion: 'LOGIN_FAIL', ip, userAgent },
      })
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
      await prisma.logAcceso.create({
        data: { usuarioId: usuario.id, email: usuario.email, accion: 'LOGIN_FAIL', ip, userAgent },
      })
      return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 })
    }

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { intentosFallidos: 0, bloqueadoHasta: null },
    })

    const token = signToken({ id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol })

    await prisma.logAcceso.create({
      data: { usuarioId: usuario.id, email: usuario.email, accion: 'LOGIN_OK', ip, userAgent },
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
