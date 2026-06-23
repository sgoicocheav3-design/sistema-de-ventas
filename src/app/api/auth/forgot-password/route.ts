import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail } from '@/lib/email'
import { createHash, randomBytes } from 'crypto'

const RESET_EXPIRY_MINUTES = 30
const COOLDOWN_SECONDS = 60

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'Email requerido' }, { status: 400 })
    }

    const usuario = await prisma.usuario.findUnique({ where: { email: email.toLowerCase().trim() } })

    if (usuario && usuario.activo) {
      if (usuario.resetExpiry && !usuario.resetUsed && new Date() < usuario.resetExpiry) {
        const remainingMs = usuario.resetExpiry.getTime() - Date.now()
        if (remainingMs > (RESET_EXPIRY_MINUTES * 60 - COOLDOWN_SECONDS) * 1000) {
          return NextResponse.json({
            message: 'Si el correo está registrado, recibirás un enlace de recuperación',
          })
        }
      }

      const rawToken = randomBytes(32).toString('hex')
      const tokenHash = createHash('sha256').update(rawToken).digest('hex')
      const expiry = new Date(Date.now() + RESET_EXPIRY_MINUTES * 60 * 1000)

      await prisma.usuario.update({
        where: { id: usuario.id },
        data: { resetTokenHash: tokenHash, resetExpiry: expiry, resetUsed: false },
      })

      const proto = req.headers.get('x-forwarded-proto') || 'http'
      const host = req.headers.get('host') || 'localhost:3000'
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${proto}://${host}`
      const resetLink = `${baseUrl}/reset-password/${rawToken}`

      try {
        await sendPasswordResetEmail(email, resetLink)
        await prisma.logAcceso.create({
          data: { usuarioId: usuario.id, accion: 'Solicitud de restablecimiento de contraseña' },
        })
      } catch {
        // Error de correo silencioso — no revelar info
      }
    }

    return NextResponse.json({
      message: 'Si el correo está registrado, recibirás un enlace de recuperación',
    })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
