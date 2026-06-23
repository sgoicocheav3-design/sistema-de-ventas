import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { createHash } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json({ message: 'Token y contraseña requeridos' }, { status: 400 })
    }

    if (typeof token !== 'string' || token.length < 20) {
      return NextResponse.json({ message: 'Enlace inválido o expirado' }, { status: 400 })
    }

    if (typeof password !== 'string' || password.length < 6) {
      return NextResponse.json({ message: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 })
    }

    const tokenHash = createHash('sha256').update(token).digest('hex')

    const usuario = await prisma.usuario.findFirst({
      where: { resetTokenHash: tokenHash, activo: true },
    })

    if (!usuario) {
      return NextResponse.json({ message: 'Enlace inválido o expirado' }, { status: 400 })
    }

    if (usuario.resetUsed) {
      return NextResponse.json({ message: 'Este enlace ya ha sido utilizado. Solicita uno nuevo.' }, { status: 400 })
    }

    if (!usuario.resetExpiry || new Date() > usuario.resetExpiry) {
      return NextResponse.json({ message: 'El enlace ha expirado. Solicita uno nuevo.' }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

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
      data: { usuarioId: usuario.id, accion: 'Contraseña restablecida exitosamente' },
    })

    return NextResponse.json({ message: 'Contraseña restablecida exitosamente' })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
