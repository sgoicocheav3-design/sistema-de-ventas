// src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const prisma = require('../prisma/client');

// ─── Nodemailer transporter (configurado vía env) ────────────────────────────
let transporter = null;
const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST || 'smtp.gmail.com',
      port:   parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
};

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña requeridos' });
    }

    // 1. Buscar usuario por email
    const usuario = await prisma.Usuario.findUnique({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // 2. Verificar si la cuenta está activa
    if (!usuario.activo) {
      return res.status(401).json({ message: 'Cuenta desactivada' });
    }

    // 3. Verificar contraseña con bcrypt
    const passwordValida = await bcrypt.compare(password, usuario.passwordHash);
    if (!passwordValida) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // 4. Generar JWT con { id, rol, nombre }
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    // 5. Registrar en LogAcceso
    await prisma.logAcceso.create({
      data: {
        usuarioId: usuario.id,
        rol: usuario.rol,
      },
    });

    // 6. Respuesta
    return res.json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/forgot-password
 * Body: { email }
 * Genera código de 4 dígitos, guarda en usuario, envía por email.
 * Siempre responde 200 (no revela si el email existe).
 */
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email es requerido' });
    }

    // Buscar usuario activo
    const usuario = await prisma.Usuario.findFirst({
      where: { email, activo: true },
    });

    if (usuario) {
      // Generar código aleatorio de 4 dígitos
      const codigo = String(Math.floor(1000 + Math.random() * 9000));
      const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

      // Guardar en la BD
      await prisma.Usuario.update({
        where: { id: usuario.id },
        data: { resetCode: codigo, resetExpiry: expiry },
      });

      // Enviar email
      try {
        const mail = getTransporter();
        await mail.sendMail({
          from:    process.env.SMTP_FROM || process.env.SMTP_USER,
          to:      email,
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
        });
      } catch (mailErr) {
        console.error('Error enviando email de recuperación:', mailErr.message);
        // No fallamos la request — el código ya está guardado
      }
    }

    // Siempre 200 (no revela si el email existe)
    res.json({ message: 'Si el correo está registrado, recibirás un código de recuperación' });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/reset-password
 * Body: { email, codigo, nuevaPassword }
 * Valida código y expiración, actualiza contraseña.
 */
const resetPassword = async (req, res, next) => {
  try {
    const { email, codigo, nuevaPassword } = req.body;

    if (!email || !codigo || !nuevaPassword) {
      return res.status(400).json({ message: 'email, codigo y nuevaPassword son requeridos' });
    }

    if (nuevaPassword.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const usuario = await prisma.Usuario.findFirst({
      where: { email, activo: true },
    });

    if (!usuario || !usuario.resetCode || !usuario.resetExpiry) {
      return res.status(400).json({ message: 'Código inválido o expirado' });
    }

    // Validar código
    if (usuario.resetCode !== codigo.trim()) {
      return res.status(400).json({ message: 'Código incorrecto' });
    }

    // Validar expiración
    if (new Date() > usuario.resetExpiry) {
      return res.status(400).json({ message: 'El código ha expirado. Solicita uno nuevo.' });
    }

    // Actualizar contraseña y limpiar campos de reset
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(nuevaPassword, salt);

    await prisma.Usuario.update({
      where: { id: usuario.id },
      data: {
        passwordHash,
        resetCode:   null,
        resetExpiry: null,
      },
    });

    res.json({ message: 'Contraseña restablecida exitosamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, forgotPassword, resetPassword };
