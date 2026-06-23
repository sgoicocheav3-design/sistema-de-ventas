import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createHash } from 'crypto'

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')
    if (!token || token.length < 20) {
      return NextResponse.json({ valido: false, mensaje: 'Enlace inválido' })
    }

    const tokenHash = createHash('sha256').update(token).digest('hex')

    const usuario = await prisma.usuario.findFirst({
      where: { resetTokenHash: tokenHash, activo: true },
      select: { resetUsed: true, resetExpiry: true, nombre: true },
    })

    if (!usuario) {
      return NextResponse.json({ valido: false, mensaje: 'Enlace inválido o expirado' })
    }

    if (usuario.resetUsed) {
      return NextResponse.json({ valido: false, mensaje: 'Este enlace ya ha sido utilizado' })
    }

    if (!usuario.resetExpiry || new Date() > usuario.resetExpiry) {
      return NextResponse.json({ valido: false, mensaje: 'El enlace ha expirado' })
    }

    return NextResponse.json({ valido: true, nombre: usuario.nombre })
  } catch {
    return NextResponse.json({ valido: false, mensaje: 'Error al validar enlace' })
  }
}
