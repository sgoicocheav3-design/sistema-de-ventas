import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { prisma } from '@/lib/prisma'

let transporter: nodemailer.Transporter | null = null
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }
  return transporter
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) {
      return NextResponse.json({ message: 'Email es requerido' }, { status: 400 })
    }

    const usuario = await prisma.usuario.findFirst({ where: { email, activo: true } })

    if (usuario) {
      const codigo = String(Math.floor(1000 + Math.random() * 9000))
      const expiry = new Date(Date.now() + 15 * 60 * 1000)

      await prisma.usuario.update({
        where: { id: usuario.id },
        data: { resetCode: codigo, resetExpiry: expiry },
      })

      try {
        const mail = getTransporter()
        await mail.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: email,
          subject: 'Código de recuperación — MiniMarket System',
          html: `
            <div style="font-family:Arial,sans-serif;max-width:400px;margin:0 auto;padding:20px">
              <h2 style="color:#1e293b;margin-bottom:8px">Recuperación de contraseña</h2>
              <p style="color:#64748b;font-size:14px">Has solicitado restablecer tu contraseña. Usa el siguiente código:</p>
              <div style="background:#f1f5f9;border-radius:12px;padding:20px;text-align:center;margin:16px 0">
                <span style="font-size:32px;font-weight:bold;letter-spacing:8px;color:#0284c7">${codigo}</span>
              </div>
              <p style="color:#94a3b8;font-size:12px">Este código expira en 15 minutos. Si no solicitaste esto, ignora este mensaje.</p>
            </div>
          `,
        })
      } catch {
        // Email error is silent
      }
    }

    return NextResponse.json({
      message: 'Si el correo está registrado, recibirás un código de recuperación',
    })
  } catch {
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
