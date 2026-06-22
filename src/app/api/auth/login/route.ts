import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ message: 'Email y contraseña requeridos' }, { status: 400 })
    }

    const usuario = await prisma.usuario.findUnique({ where: { email } })
    if (!usuario) {
      return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 })
    }
    if (!usuario.activo) {
      return NextResponse.json({ message: 'Cuenta desactivada' }, { status: 401 })
    }

    const passwordValida = await bcrypt.compare(password, usuario.passwordHash)
    if (!passwordValida) {
      return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 })
    }

    const token = signToken({ id: usuario.id, rol: usuario.rol, nombre: usuario.nombre })

    await prisma.logAcceso.create({
      data: { usuarioId: usuario.id, accion: `Inicio de sesión - ${usuario.rol}` },
    })

    return NextResponse.json({
      token,
      user: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
    })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
