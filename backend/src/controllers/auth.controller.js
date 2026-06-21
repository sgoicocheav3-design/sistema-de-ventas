// src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');

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
    const usuario = await prisma.usuario.findUnique({ where: { email } });

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

module.exports = { login };
