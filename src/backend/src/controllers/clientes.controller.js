// src/controllers/clientes.controller.js
const prisma = require('../prisma/client');

/** Valida que el DNI tenga exactamente 8 dígitos numéricos */
const validarDNI = (dni) => /^\d{8}$/.test(dni);

/**
 * GET /api/clientes
 * Lista todos los clientes activos. Soporta ?q= para buscar por DNI o nombre.
 */
const listar = async (req, res, next) => {
  try {
    const { q } = req.query;
    const where = { activo: true };

    if (q && q.trim()) {
      const termino = q.trim();
      where.OR = [
        { dni:    { contains: termino } },
        { nombre: { contains: termino, mode: 'insensitive' } },
      ];
    }

    const clientes = await prisma.cliente.findMany({
      where,
      orderBy: { nombre: 'asc' },
      take: 100,
    });
    res.json(clientes);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/clientes/buscar-dni/:dni
 * Busca un cliente exacto por DNI (para el POS).
 */
const buscarPorDni = async (req, res, next) => {
  try {
    const { dni } = req.params;
    if (!validarDNI(dni)) {
      return res.status(400).json({ message: 'El DNI debe tener exactamente 8 dígitos numéricos' });
    }
    const cliente = await prisma.cliente.findUnique({ where: { dni } });
    if (!cliente || !cliente.activo) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/clientes
 * Crea un cliente nuevo. Body: { dni, nombre, email?, telefono? }
 */
const crear = async (req, res, next) => {
  try {
    const { dni, nombre, email, telefono } = req.body;

    if (!dni || !nombre) {
      return res.status(400).json({ message: 'dni y nombre son requeridos' });
    }
    if (!validarDNI(dni)) {
      return res.status(400).json({ message: 'El DNI debe tener exactamente 8 dígitos numéricos' });
    }

    // Verificar unicidad
    const existe = await prisma.cliente.findUnique({ where: { dni } });
    if (existe) {
      if (existe.activo) {
        return res.status(409).json({ message: `Ya existe un cliente con DNI ${dni}`, cliente: existe });
      }
      // Reactivar cliente inactivo
      const reactivado = await prisma.cliente.update({
        where: { dni },
        data: { nombre, email: email || null, telefono: telefono || null, activo: true },
      });
      return res.status(200).json(reactivado);
    }

    const nuevo = await prisma.cliente.create({
      data: {
        dni,
        nombre,
        email:    email || null,
        telefono: telefono || null,
      },
    });
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/clientes/exportar
 * Genera un CSV con id, dni, nombre, email de todos los clientes activos.
 */
const exportarCSV = async (req, res, next) => {
  try {
    const clientes = await prisma.cliente.findMany({
      where: { activo: true },
      orderBy: { id: 'asc' },
      select: { id: true, dni: true, nombre: true, email: true },
    });

    // Cabecera CSV
    const header = 'id,dni,nombre,email\n';
    const rows = clientes.map((c) => {
      const escapedNombre = `"${(c.nombre || '').replace(/"/g, '""')}"`;
      const escapedEmail  = `"${(c.email || '').replace(/"/g, '""')}"`;
      return `${c.id},${c.dni},${escapedNombre},${escapedEmail}`;
    }).join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=clientes_${new Date().toISOString().split('T')[0]}.csv`);
    res.send('\uFEFF' + header + rows); // BOM for Excel UTF-8
  } catch (err) {
    next(err);
  }
};

module.exports = { listar, buscarPorDni, crear, exportarCSV };
