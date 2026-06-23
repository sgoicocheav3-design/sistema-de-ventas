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

export async function sendPasswordResetEmail(to: string, resetLink: string) {
  const mail = getTransporter()
  await mail.sendMail({
    from: `"${APP_NAME}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to,
    subject: `Restablece tu contraseña — ${APP_NAME}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px">
        <div style="background:#2563eb;border-radius:12px;padding:20px;text-align:center;margin-bottom:24px">
          <span style="font-size:24px;font-weight:bold;color:#fff">${APP_NAME}</span>
        </div>
        <h2 style="color:#1e293b;margin-bottom:8px">Restablecimiento de contraseña</h2>
        <p style="color:#475569;font-size:14px;line-height:1.6">
          Has solicitado restablecer tu contraseña. Haz clic en el siguiente botón para continuar:
        </p>
        <div style="text-align:center;margin:24px 0">
          <a href="${resetLink}"
             style="display:inline-block;background:#2563eb;color:#fff;padding:12px 32px;border-radius:8px;text-decoration:none;font-size:16px;font-weight:600">
            Restablecer contraseña
          </a>
        </div>
        <p style="color:#64748b;font-size:13px;line-height:1.5">
          O copia este enlace en tu navegador:<br>
          <span style="color:#2563eb;font-size:12px;word-break:break-all">${resetLink}</span>
        </p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0">
        <p style="color:#94a3b8;font-size:12px;line-height:1.5">
          Este enlace expira en <strong>30 minutos</strong>.
          Si no solicitaste este cambio, ignora este mensaje.
        </p>
        <p style="color:#94a3b8;font-size:12px;margin-top:8px">
          &mdash; El equipo de ${APP_NAME}
        </p>
      </div>
    `,
  })
}
