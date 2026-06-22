// src/controllers/entradas.controller.js
const prisma = require('../prisma/client');

/**
 * POST /api/almacen/entradas
 * Body: { productoId, proveedorId, cantidad }
 * Transacción atómica: crea EntradaMercaderia e incrementa stock.
 */
const crear = async (req, res, next) => {
  try {
    const { productoId, proveedorId, cantidad, precioUnitario } = req.body;

    if (!productoId || !proveedorId || !cantidad || precioUnitario === undefined) {
      return res.status(400).json({ message: 'productoId, proveedorId, cantidad y precioUnitario son requeridos' });
    }
    const cantNum = parseInt(cantidad);
    if (isNaN(cantNum) || cantNum <= 0) {
      return res.status(400).json({ message: 'La cantidad debe ser mayor a 0' });
    }
    const precioNum = parseFloat(precioUnitario);
    if (isNaN(precioNum) || precioNum <= 0) {
      return res.status(400).json({ message: 'El precio unitario debe ser mayor a 0' });
    }

    const entrada = await prisma.$transaction(async (tx) => {
      // Verificar producto
      const producto = await tx.producto.findUnique({ where: { id: parseInt(productoId) } });
      if (!producto || !producto.activo) {
        throw Object.assign(new Error('Producto no encontrado o inactivo'), { status: 404 });
      }

      // Verificar proveedor
      const proveedor = await tx.proveedor.findUnique({ where: { id: parseInt(proveedorId) } });
      if (!proveedor || !proveedor.activo) {
        throw Object.assign(new Error('Proveedor no encontrado o inactivo'), { status: 404 });
      }

      // Incrementar stock
      await tx.producto.update({
        where: { id: parseInt(productoId) },
        data:  { stock: { increment: cantNum } },
      });

      // Registrar entrada
      return tx.entradaMercaderia.create({
        data: {
          productoId:     parseInt(productoId),
          proveedorId:    parseInt(proveedorId),
          cantidad:       cantNum,
          precioUnitario: precioNum,
          usuarioId:      req.user.id,
        },
        include: {
          producto:  { select: { id: true, nombre: true, marca: true, stock: true } },
          proveedor: { select: { id: true, nombre: true } },
          usuario:   { select: { id: true, nombre: true } },
        },
      });
    });

    res.status(201).json(entrada);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ message: err.message });
    next(err);
  }
};

/**
 * GET /api/almacen/entradas
 * Query: desde (ISO), hasta (ISO), productoId
 * Lista historial de entradas paginado.
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

    const entradas = await prisma.entradaMercaderia.findMany({
      where,
      include: {
        producto:  { select: { nombre: true, marca: true } },
        proveedor: { select: { nombre: true } },
        usuario:   { select: { nombre: true } },
      },
      orderBy: { creadoEn: 'desc' },
      take: 200,
    });

    res.json(entradas);
  } catch (err) {
    next(err);
  }
};

module.exports = { crear, listar };
