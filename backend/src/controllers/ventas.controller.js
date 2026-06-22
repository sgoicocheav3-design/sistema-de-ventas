// src/controllers/ventas.controller.js
const prisma = require('../prisma/client');

// ─── Selección base para productos en búsqueda POS ──────────────────────────
const productoSearchSelect = {
  id:    true,
  nombre: true,
  marca:  true,
  precio: true,
  stock:  true,
  categoria: { select: { id: true, nombre: true } },
};

/**
 * GET /api/ventas/productos/buscar?q=&categoria=
 * Busca productos activos con stock>0. Usa índice @@index([nombre, marca]).
 * q: búsqueda ILIKE en nombre, marca y nombre de categoría
 */
const buscarProductos = async (req, res, next) => {
  try {
    const { q = '', categoria } = req.query;
    const termino = q.trim();

    const where = {
      activo: true,
      stock:  { gt: 0 },
    };

    if (termino) {
      where.OR = [
        { nombre:    { contains: termino, mode: 'insensitive' } },
        { marca:     { contains: termino, mode: 'insensitive' } },
        { categoria: { nombre: { contains: termino, mode: 'insensitive' } } },
      ];
    }

    if (categoria) where.categoriaId = parseInt(categoria);

    const productos = await prisma.producto.findMany({
      where,
      select: productoSearchSelect,
      orderBy: [{ nombre: 'asc' }],
      take: 20,
    });

    res.json(productos);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/ventas
 * Crea una venta en transacción atómica.
 * Body: { items:[{productoId, cantidad}], metodoPago, montoRecibido? }
 */
const crearVenta = async (req, res, next) => {
  try {
    const { items, metodoPago, montoRecibido, clienteId } = req.body;

    // Validaciones
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'El carrito no puede estar vacío' });
    }
    if (!metodoPago || !['EFECTIVO', 'YAPE', 'PLIN', 'TARJETA', 'CHEQUE', 'TRANSFERENCIA'].includes(metodoPago)) {
      return res.status(400).json({ message: 'Método de pago inválido' });
    }

    const venta = await prisma.$transaction(async (tx) => {
      let subtotal = 0;
      const lineas = [];

      // Validar stock y pre-calcular
      for (const item of items) {
        const producto = await tx.producto.findUnique({
          where: { id: item.productoId },
          select: { id: true, nombre: true, precio: true, stock: true, activo: true },
        });

        if (!producto || !producto.activo) {
          throw Object.assign(new Error(`Producto #${item.productoId} no disponible`), { status: 404 });
        }
        if (producto.stock < item.cantidad) {
          throw Object.assign(
            new Error(`Stock insuficiente para "${producto.nombre}". Disponible: ${producto.stock}`),
            { status: 400 }
          );
        }

        const precioUnit = parseFloat(producto.precio);
        const lineaSubtotal = precioUnit * item.cantidad;
        subtotal += lineaSubtotal;

        lineas.push({ productoId: item.productoId, cantidad: item.cantidad, precioUnitario: precioUnit, nombre: producto.nombre });
      }

      // Calcular montos
      const igv        = Math.round(subtotal * 0.18 * 100) / 100;
      const total      = Math.round((subtotal + igv) * 100) / 100;
      const recibido   = parseFloat(montoRecibido || 0);
      
      if (metodoPago === 'EFECTIVO') {
        if (recibido < total) {
          throw Object.assign(
            new Error(`Monto recibido insuficiente. Total: S/ ${total.toFixed(2)}, recibido: S/ ${recibido.toFixed(2)}`),
            { status: 400 }
          );
        }
      }

      const montoRecibidoFinal = metodoPago === 'EFECTIVO' ? recibido : total;
      const vuelto = metodoPago === 'EFECTIVO' ? recibido - total : 0;

      // Generar número de comprobante
      const ventasHoy = await tx.venta.count({
        where: {
          creadoEn: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      });
      const numero = `V-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${String(ventasHoy + 1).padStart(4, '0')}`;

      // Crear venta
      const nuevaVenta = await tx.venta.create({
        data: {
          numero,
          usuarioId:      req.user.id,
          clienteId:      clienteId ? parseInt(clienteId) : null,
          subtotal:       subtotal,
          igv:            igv,
          total:          total,
          metodoPago,
          montoRecibido:  montoRecibidoFinal,
          vuelto:         vuelto,
      detalles: {
        create: lineas.map((l) => ({
          productoId:     l.productoId,
          cantidad:       l.cantidad,
          precioUnitario: l.precioUnitario,
          subtotal:       l.precioUnitario * l.cantidad,
        })),
      },
    },
    include: {
      detalles: {
        include: { producto: { select: { nombre: true, marca: true } } },
      },
      usuario: { select: { id: true, nombre: true } },
      cliente: { select: { id: true, dni: true, nombre: true } },
    },
      });

      // Descontar stock
      for (const l of lineas) {
        await tx.producto.update({
          where: { id: l.productoId },
          data:  { stock: { decrement: l.cantidad } },
        });
      }

      return nuevaVenta;
    });

    res.status(201).json(venta);
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }
    next(err);
  }
};

/**
 * GET /api/ventas/:id/comprobante
 * Retorna la venta completa con detalle para imprimir/descargar.
 */
const comprobante = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const venta = await prisma.venta.findUnique({
      where: { id },
      include: {
        detalles: {
          include: {
            producto: { select: { id: true, nombre: true, marca: true, precio: true } },
          },
        },
        usuario: { select: { id: true, nombre: true } },
      },
    });
    if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });

    res.json(venta);
  } catch (err) {
    next(err);
  }
};

module.exports = { buscarProductos, crearVenta, comprobante };
