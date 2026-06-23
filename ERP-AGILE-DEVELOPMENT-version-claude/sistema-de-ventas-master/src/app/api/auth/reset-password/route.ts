import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { validatePassword } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const { email, codigo, nueva_password } = await req.json()

    if (!email || !codigo || !nueva_password) {
      return NextResponse.json({ message: 'Email, código y nueva contraseña requeridos' }, { status: 400 })
    }

    if (typeof codigo !== 'string' || !/^\d{4}$/.test(codigo)) {
      return NextResponse.json({ message: 'Código inválido' }, { status: 400 })
    }

    if (typeof nueva_password !== 'string') {
      return NextResponse.json({ message: 'Contraseña inválida' }, { status: 400 })
    }

    const passwordError = validatePassword(nueva_password)
    if (passwordError) {
      return NextResponse.json({ message: passwordError }, { status: 400 })
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase().trim(), activo: true },
    })

    if (!usuario) {
      return NextResponse.json({ message: 'Código inválido o expirado' }, { status: 400 })
    }

    if (!usuario.resetTokenHash || usuario.resetTokenHash !== codigo) {
      return NextResponse.json({ message: 'Código inválido o expirado' }, { status: 400 })
    }

    if (usuario.resetUsed) {
      return NextResponse.json({ message: 'Este código ya ha sido utilizado. Solicita uno nuevo.' }, { status: 400 })
    }

    if (!usuario.resetExpiry || new Date() > usuario.resetExpiry) {
      return NextResponse.json({ message: 'El código ha expirado. Solicita uno nuevo.' }, { status: 400 })
    }

    const mismaPassword = await bcrypt.compare(nueva_password, usuario.passwordHash)
    if (mismaPassword) {
      return NextResponse.json({ message: 'No puedes usar la misma contraseña anterior' }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(nueva_password, 10)

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        passwordHash,
        resetTokenHash: null,
        resetExpiry: null,
        resetUsed: false,
        intentosFallidos: 0,
        bloqueadoHasta: null,
      },
    })

    await prisma.logAcceso.create({
      data: { usuarioId: usuario.id, accion: 'Contraseña restablecida exitosamente vía código' },
    })

    return NextResponse.json({ message: 'Contraseña restablecida exitosamente' })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
