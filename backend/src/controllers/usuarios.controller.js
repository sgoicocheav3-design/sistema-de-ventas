// src/controllers/usuarios.controller.js
const bcrypt = require('bcryptjs');
const prisma = require('../prisma/client');

/**
 * GET /api/admin/usuarios
 * Lista todos los usuarios activos (id, nombre, email, rol)
 */
const listar = async (req, res, next) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      where: { activo: true },
      select: { id: true, nombre: true, email: true, rol: true, creadoEn: true },
      orderBy: { creadoEn: 'desc' },
    });
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/usuarios
 * Crea un nuevo usuario. Valida email único. Hash bcrypt salt=10.
 * Body: { nombre, email, password, rol }
 */
const crear = async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const rolesValidos = ['ADMIN', 'VENDEDOR', 'ALMACENERO', 'GERENTE'];
    if (!rolesValidos.includes(rol)) {
      return res.status(400).json({ message: `Rol inválido. Valores permitidos: ${rolesValidos.join(', ')}` });
    }

    // Verificar email único
    const existe = await prisma.usuario.findUnique({ where: { email } });
    if (existe) {
      return res.status(409).json({ message: 'Ya existe un usuario con ese email' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevo = await prisma.usuario.create({
      data: { nombre, email, passwordHash, rol },
      select: { id: true, nombre: true, email: true, rol: true, creadoEn: true },
    });

    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/usuarios/:id
 * Edita nombre, email y/o rol de un usuario.
 * Body: { nombre?, email?, rol? }
 */
const editar = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, email, rol } = req.body;

    if (!nombre && !email && !rol) {
      return res.status(400).json({ message: 'Debe enviar al menos un campo a editar' });
    }

    // Si cambia el email, verificar que no esté en uso por otro usuario
    if (email) {
      const otro = await prisma.usuario.findFirst({
        where: { email, NOT: { id } },
      });
      if (otro) {
        return res.status(409).json({ message: 'Ese email ya está en uso' });
      }
    }

    if (rol) {
      const rolesValidos = ['ADMIN', 'VENDEDOR', 'ALMACENERO', 'GERENTE'];
      if (!rolesValidos.includes(rol)) {
        return res.status(400).json({ message: `Rol inválido. Valores permitidos: ${rolesValidos.join(', ')}` });
      }
    }

    const actualizado = await prisma.usuario.update({
      where: { id },
      data: {
        ...(nombre && { nombre }),
        ...(email && { email }),
        ...(rol && { rol }),
      },
      select: { id: true, nombre: true, email: true, rol: true },
    });

    res.json(actualizado);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    next(err);
  }
};

/**
 * DELETE /api/admin/usuarios/:id
 * Soft delete: activo=false. No borra el registro.
 */
const desactivar = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    // Evitar que el admin se desactive a sí mismo
    if (id === req.user.id) {
      return res.status(400).json({ message: 'No puedes desactivar tu propia cuenta' });
    }

    await prisma.usuario.update({
      where: { id },
      data: { activo: false },
    });

    res.json({ message: 'Usuario desactivado correctamente' });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    next(err);
  }
};

module.exports = { listar, crear, editar, desactivar };
