// src/controllers/bajas.controller.js
const prisma = require('../prisma/client');

/**
 * POST /api/almacen/bajas
 * Body: { productoId, cantidad, motivo }
 * Valida stock, descuenta en transacción atómica, crea BajaInventario.
 */
const crear = async (req, res, next) => {
  try {
    const { productoId, cantidad, motivo } = req.body;

    if (!productoId || !cantidad || !motivo) {
      return res.status(400).json({ message: 'productoId, cantidad y motivo son requeridos' });
    }
    const cantNum = parseInt(cantidad);
    if (isNaN(cantNum) || cantNum <= 0) {
      return res.status(400).json({ message: 'La cantidad debe ser mayor a 0' });
    }

    const baja = await prisma.$transaction(async (tx) => {
      const producto = await tx.producto.findUnique({ where: { id: parseInt(productoId) } });
      if (!producto || !producto.activo) {
        throw Object.assign(new Error('Producto no encontrado o inactivo'), { status: 404 });
      }
      if (producto.stock < cantNum) {
        throw Object.assign(
          new Error(`Stock insuficiente: solo hay ${producto.stock} unidades de "${producto.nombre}"`),
          { status: 400 }
        );
      }

      // Descontar stock
      await tx.producto.update({
        where: { id: parseInt(productoId) },
        data:  { stock: { decrement: cantNum } },
      });

      // Registrar baja
      return tx.bajaInventario.create({
        data: {
          productoId: parseInt(productoId),
          cantidad:   cantNum,
          motivo,
          usuarioId:  req.user.id,
        },
        include: {
          producto: { select: { id: true, nombre: true, marca: true, stock: true } },
          usuario:  { select: { id: true, nombre: true } },
        },
      });
    });

    res.status(201).json(baja);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ message: err.message });
    next(err);
  }
};

/**
 * GET /api/almacen/bajas
 * Query: desde (ISO), hasta (ISO), productoId
 * Lista historial de bajas.
 */
const listar = async (req, res, next) => {
  try {
    const { desde, hasta, productoId } = req.query;

    const where = {};
    if (desde || hasta) {
      where.creadoEn = {};
      if (desde) where.creadoEn.gte = new Date(desde);
      if (hasta) {
        const hastaFin = new Date(hasta);
        hastaFin.setHours(23, 59, 59, 999);
        where.creadoEn.lte = hastaFin;
      }
    }
    if (productoId) where.productoId = parseInt(productoId);

    const bajas = await prisma.bajaInventario.findMany({
      where,
      include: {
        producto: { select: { nombre: true, marca: true } },
        usuario:  { select: { nombre: true } },
      },
      orderBy: { creadoEn: 'desc' },
      take: 200,
    });

    res.json(bajas);
  } catch (err) {
    next(err);
  }
};

module.exports = { crear, listar };
