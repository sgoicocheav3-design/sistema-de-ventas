// src/controllers/solicitudes.controller.js
const prisma = require('../prisma/client');

/** Lee un valor de ConfigSistema, retorna defaultVal si no existe */
const getConfig = async (clave, defaultVal) => {
  const cfg = await prisma.configSistema.findUnique({ where: { clave } });
  return cfg ? parseInt(cfg.valor) : defaultVal;
};

// ─── Includes reutilizables ──────────────────────────────────────────────────
const solicitudInclude = {
  producto:  { select: { id: true, nombre: true, marca: true, stock: true, precio: true } },
  usuario:   { select: { id: true, nombre: true } },
  proveedor: { select: { id: true, nombre: true, ruc: true } },
};

// ─────────────────────────────────────────────────────────────────────────────
// ALMACENERO
// ─────────────────────────────────────────────────────────────────────────────

/**
 * POST /api/almacen/solicitudes
 * Body: { productoId, cantidadSolicitada }
 * Lee umbral_solicitud_reposicion de ConfigSistema.
 * Crea SolicitudReposicion con estado=PENDIENTE.
 */
const crear = async (req, res, next) => {
  try {
    const { productoId, cantidadSolicitada } = req.body;

    if (!productoId || !cantidadSolicitada) {
      return res.status(400).json({ message: 'productoId y cantidadSolicitada son requeridos' });
    }
    const cantNum = parseInt(cantidadSolicitada);
    if (isNaN(cantNum) || cantNum <= 0) {
      return res.status(400).json({ message: 'La cantidad solicitada debe ser mayor a 0' });
    }

    const producto = await prisma.producto.findUnique({ where: { id: parseInt(productoId) } });
    if (!producto || !producto.activo) {
      return res.status(404).json({ message: 'Producto no encontrado o inactivo' });
    }

    // Leer umbral de reposición
    const umbral = await getConfig('umbral_solicitud_reposicion', 5);

    const solicitud = await prisma.solicitudReposicion.create({
      data: {
        productoId:         parseInt(productoId),
        cantidadActual:     producto.stock,
        cantidadSolicitada: cantNum,
        estado:             'PENDIENTE',
        usuarioId:          req.user.id,
      },
      include: solicitudInclude,
    });

    res.status(201).json({ solicitud, umbralReposicion: umbral });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/almacen/solicitudes/historial
 * Lista solicitudes del almacenero logueado.
 * Query: estado, desde, hasta
 */
const historial = async (req, res, next) => {
  try {
    const { estado, desde, hasta } = req.query;

    const where = { usuarioId: req.user.id };
    if (estado) where.estado = estado;
    if (desde || hasta) {
      where.creadoEn = {};
      if (desde) where.creadoEn.gte = new Date(desde);
      if (hasta) {
        const hastaFin = new Date(hasta);
        hastaFin.setHours(23, 59, 59, 999);
        where.creadoEn.lte = hastaFin;
      }
    }

    const solicitudes = await prisma.solicitudReposicion.findMany({
      where,
      include: solicitudInclude,
      orderBy: { creadoEn: 'desc' },
      take: 200,
    });

    res.json(solicitudes);
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/almacen/solicitudes/:id/completar
 * Transacción atómica: incrementa stock, crea EntradaMercaderia, cambia estado=COMPLETADA.
 */
const completar = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const result = await prisma.$transaction(async (tx) => {
      const solicitud = await tx.solicitudReposicion.findUnique({
        where: { id },
        include: { producto: true, proveedor: true },
      });

      if (!solicitud) {
        throw Object.assign(new Error('Solicitud no encontrada'), { status: 404 });
      }
      if (solicitud.estado !== 'APROBADA') {
        throw Object.assign(
          new Error(`Solo se pueden completar solicitudes aprobadas (estado actual: ${solicitud.estado})`),
          { status: 400 }
        );
      }
      if (!solicitud.proveedorId) {
        throw Object.assign(new Error('La solicitud no tiene proveedor asignado'), { status: 400 });
      }

      // Incrementar stock
      await tx.producto.update({
        where: { id: solicitud.productoId },
        data:  { stock: { increment: solicitud.cantidadSolicitada } },
      });

      // Crear EntradaMercaderia vinculada
      await tx.entradaMercaderia.create({
        data: {
          productoId:     solicitud.productoId,
          proveedorId:    solicitud.proveedorId,
          cantidad:       solicitud.cantidadSolicitada,
          precioUnitario: solicitud.producto.precio,
          usuarioId:      req.user.id,
        },
      });

      // Marcar como COMPLETADA
      return tx.solicitudReposicion.update({
        where: { id },
        data:  { estado: 'COMPLETADA' },
        include: solicitudInclude,
      });
    });

    res.json(result);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ message: err.message });
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// RECEPCIONES (ALMACENERO)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/almacen/recepciones/pendientes
 * Lista solicitudes APROBADAS con fechaEstimada <= hoy.
 */
const recepcionesPendientes = async (req, res, next) => {
  try {
    const hoy = new Date();
    hoy.setHours(23, 59, 59, 999);

    const solicitudes = await prisma.solicitudReposicion.findMany({
      where: {
        estado: 'APROBADA',
        OR: [
          { fechaEstimada: { lte: hoy } },
          { fechaEstimada: null },
        ],
      },
      include: solicitudInclude,
      orderBy: { fechaEstimada: 'asc' },
    });

    res.json(solicitudes);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/almacen/recepciones/pendientes/count
 * Retorna { count } de recepciones pendientes.
 */
const recepcionesPendientesCount = async (req, res, next) => {
  try {
    const hoy = new Date();
    hoy.setHours(23, 59, 59, 999);

    const count = await prisma.solicitudReposicion.count({
      where: {
        estado: 'APROBADA',
        OR: [
          { fechaEstimada: { lte: hoy } },
          { fechaEstimada: null },
        ],
      },
    });

    res.json({ count });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GERENCIA
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/gerencia/solicitudes?estado=
 * Lista todas las solicitudes con producto, almacenero y estado.
 */
const listarGerencia = async (req, res, next) => {
  try {
    const { estado } = req.query;
    const where = {};
    if (estado) where.estado = estado;

    const solicitudes = await prisma.solicitudReposicion.findMany({
      where,
      include: solicitudInclude,
      orderBy: { creadoEn: 'desc' },
      take: 200,
    });

    res.json(solicitudes);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/gerencia/proveedores
 * Lista proveedores activos (para el selector del modal de aprobación).
 */
const listarProveedores = async (req, res, next) => {
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
 * PATCH /api/gerencia/solicitudes/:id/aprobar
 * Body: { proveedorId, fechaEstimada }
 * Cambia estado=APROBADA.
 */
const aprobar = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { proveedorId, fechaEstimada } = req.body;

    if (!proveedorId) {
      return res.status(400).json({ message: 'proveedorId es requerido para aprobar' });
    }

    const solicitud = await prisma.solicitudReposicion.findUnique({ where: { id } });
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    if (solicitud.estado !== 'PENDIENTE') {
      return res.status(400).json({ message: `La solicitud ya fue ${solicitud.estado.toLowerCase()}` });
    }

    const proveedor = await prisma.proveedor.findUnique({ where: { id: parseInt(proveedorId) } });
    if (!proveedor || !proveedor.activo) {
      return res.status(404).json({ message: 'Proveedor no encontrado o inactivo' });
    }

    const updated = await prisma.solicitudReposicion.update({
      where: { id },
      data: {
        estado:        'APROBADA',
        proveedorId:   parseInt(proveedorId),
        fechaEstimada: fechaEstimada ? new Date(fechaEstimada) : null,
      },
      include: solicitudInclude,
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/gerencia/solicitudes/:id/rechazar
 * Body: { notaRechazo }
 * Cambia estado=RECHAZADA.
 */
const rechazar = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { notaRechazo } = req.body;

    const solicitud = await prisma.solicitudReposicion.findUnique({ where: { id } });
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    if (solicitud.estado !== 'PENDIENTE') {
      return res.status(400).json({ message: `La solicitud ya fue ${solicitud.estado.toLowerCase()}` });
    }

    const updated = await prisma.solicitudReposicion.update({
      where: { id },
      data: {
        estado:      'RECHAZADA',
        notaRechazo: notaRechazo || null,
      },
      include: solicitudInclude,
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  crear,
  historial,
  completar,
  recepcionesPendientes,
  recepcionesPendientesCount,
  listarGerencia,
  listarProveedores,
  aprobar,
  rechazar,
};
