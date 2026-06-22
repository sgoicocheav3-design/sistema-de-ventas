import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email, codigo, nuevaPassword } = await req.json()

    if (!email || !codigo || !nuevaPassword) {
      return NextResponse.json({ message: 'email, codigo y nuevaPassword son requeridos' }, { status: 400 })
    }
    if (nuevaPassword.length < 6) {
      return NextResponse.json({ message: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 })
    }

    const usuario = await prisma.usuario.findFirst({ where: { email, activo: true } })
    if (!usuario || !usuario.resetCode || !usuario.resetExpiry) {
      return NextResponse.json({ message: 'Código inválido o expirado' }, { status: 400 })
    }
    if (usuario.resetCode !== codigo.trim()) {
      return NextResponse.json({ message: 'Código incorrecto' }, { status: 400 })
    }
    if (new Date() > usuario.resetExpiry) {
      return NextResponse.json({ message: 'El código ha expirado. Solicita uno nuevo.' }, { status: 400 })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(nuevaPassword, salt)

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { passwordHash, resetCode: null, resetExpiry: null },
    })

    return NextResponse.json({ message: 'Contraseña restablecida exitosamente' })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
