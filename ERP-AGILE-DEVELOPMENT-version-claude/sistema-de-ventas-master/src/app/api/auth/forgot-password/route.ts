import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetCode } from '@/lib/email'

const CODE_EXPIRY_MINUTES = 15

function generateCode(): string {
  return String(Math.floor(1000 + Math.random() * 9000))
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'Email requerido' }, { status: 400 })
    }

    const usuario = await prisma.usuario.findUnique({ where: { email: email.toLowerCase().trim() } })

    if (usuario && usuario.activo) {
      const code = generateCode()
      const expiry = new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000)

      await prisma.usuario.update({
        where: { id: usuario.id },
        data: { resetTokenHash: code, resetExpiry: expiry, resetUsed: false },
      })

      try {
        await sendPasswordResetCode(email, code)
        await prisma.logAcceso.create({
          data: { usuarioId: usuario.id, accion: 'Solicitud de código de recuperación' },
        })
      } catch {
        // Error de correo silencioso
      }
    }

    return NextResponse.json({
      message: 'Si el correo está registrado, recibirás un código de recuperación',
    })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
