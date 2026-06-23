import nodemailer from 'nodemailer'

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

const APP_NAME = 'Sistema de Ventas'

export async function sendPasswordResetCode(to: string, code: string) {
  const mail = getTransporter()
  await mail.sendMail({
    from: `"${APP_NAME}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to,
    subject: `Tu código de recuperación — ${APP_NAME}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px">
        <div style="background:#2563eb;border-radius:12px;padding:20px;text-align:center;margin-bottom:24px">
          <span style="font-size:24px;font-weight:bold;color:#fff">${APP_NAME}</span>
        </div>
        <h2 style="color:#1e293b;margin-bottom:8px">Código de recuperación</h2>
        <p style="color:#475569;font-size:14px;line-height:1.6">
          Has solicitado restablecer tu contraseña. Usa el siguiente código:
        </p>
        <div style="text-align:center;margin:24px 0">
          <div style="display:inline-block;background:#f1f5f9;padding:16px 40px;border-radius:12px;font-size:36px;font-weight:700;letter-spacing:8px;color:#1e293b;font-family:monospace">
            ${code}
          </div>
        </div>
        <p style="color:#64748b;font-size:13px;line-height:1.5">
          Este código expira en <strong>15 minutos</strong>.
          Si no solicitaste este cambio, ignora este mensaje.
        </p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0">
        <p style="color:#94a3b8;font-size:12px;margin-top:8px">
          &mdash; El equipo de ${APP_NAME}
        </p>
      </div>
    `,
  })
}
