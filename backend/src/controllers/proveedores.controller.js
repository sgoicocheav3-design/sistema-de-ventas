// src/controllers/proveedores.controller.js
const prisma = require('../prisma/client');

/** Valida que el RUC tenga exactamente 11 dígitos numéricos */
const validarRUC = (ruc) => /^\d{11}$/.test(ruc);

/**
 * GET /api/admin/proveedores
 * Lista todos los proveedores activos
 */
const listar = async (req, res, next) => {
  try {
    const proveedores = await prisma.proveedor.findMany({
      where: { activo: true },
      orderBy: { nombre: 'asc' },
    });
    res.json(proveedores);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/admin/proveedores
 * Crea un proveedor. Valida RUC único de 11 dígitos.
 * Body: { nombre, ruc, contacto }
 */
const crear = async (req, res, next) => {
  try {
    const { nombre, ruc, contacto } = req.body;

    if (!nombre || !ruc || !contacto) {
      return res.status(400).json({ message: 'nombre, ruc y contacto son requeridos' });
    }
    if (!validarRUC(ruc)) {
      return res.status(400).json({ message: 'El RUC debe tener exactamente 11 dígitos numéricos' });
    }

    const existe = await prisma.proveedor.findUnique({ where: { ruc } });
    if (existe) {
      return res.status(409).json({ message: `Ya existe un proveedor con el RUC ${ruc}` });
    }

    const nuevo = await prisma.proveedor.create({
      data: { nombre, ruc, contacto },
    });
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/proveedores/:id
 * Edita nombre, ruc y/o contacto.
 */
const editar = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, ruc, contacto } = req.body;

    if (!nombre && !ruc && !contacto) {
      return res.status(400).json({ message: 'Debe enviar al menos un campo a editar' });
    }

    if (ruc) {
      if (!validarRUC(ruc)) {
        return res.status(400).json({ message: 'El RUC debe tener exactamente 11 dígitos numéricos' });
      }
      // Verificar que el RUC no esté en uso por otro proveedor
      const otro = await prisma.proveedor.findFirst({
        where: { ruc, NOT: { id } },
      });
      if (otro) {
        return res.status(409).json({ message: `El RUC ${ruc} ya está registrado en otro proveedor` });
      }
    }

    const actualizado = await prisma.proveedor.update({
      where: { id },
      data: {
        ...(nombre   && { nombre }),
        ...(ruc      && { ruc }),
        ...(contacto && { contacto }),
      },
    });
    res.json(actualizado);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    next(err);
  }
};

/**
 * DELETE /api/admin/proveedores/:id
 * Soft delete: activo=false
 */
const desactivar = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.proveedor.update({ where: { id }, data: { activo: false } });
    res.json({ message: 'Proveedor desactivado correctamente' });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    next(err);
  }
};

module.exports = { listar, crear, editar, desactivar };
