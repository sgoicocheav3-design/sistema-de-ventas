// src/controllers/productos.controller.js
const prisma = require('../prisma/client');

/** Lee un valor de ConfigSistema, retorna defaultVal si no existe */
const getConfig = async (clave, defaultVal) => {
  const cfg = await prisma.configSistema.findUnique({ where: { clave } });
  return cfg ? parseInt(cfg.valor) : defaultVal;
};

// ─── Selección base para listar productos ────────────────────────────────────
const productoSelect = {
  id: true,
  nombre: true,
  marca: true,
  precio: true,
  stock: true,
  fechaVencimiento: true,
  activo: true,
  categoriaId: true,
  categoria: { select: { id: true, nombre: true } },
};

/**
 * GET /api/almacen/productos
 * Query params:
 *   - categoria   → filtra por categoriaId
 *   - marca       → filtra por marca (LIKE, insensible a mayúsculas)
 *   - stockBajo   → "true" para filtrar stock <= umbral_alerta_visual
 *
 * Respuesta: { productos: [...], umbralAlerta: number }
 */
const listar = async (req, res, next) => {
  try {
    const { categoria, marca, stockBajo } = req.query;

    const umbral = await getConfig('umbral_alerta_visual', 5);

    const where = { activo: true };

    if (categoria) where.categoriaId = parseInt(categoria);
    if (marca)     where.marca = { contains: marca, mode: 'insensitive' };
    if (stockBajo === 'true') where.stock = { lte: umbral };

    const productos = await prisma.producto.findMany({
      where,
      select: productoSelect,
      orderBy: { nombre: 'asc' },
    });

    res.json({ productos, umbralAlerta: umbral });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/almacen/productos/inactivos
 * Lista productos con activo=false
 */
const listarInactivos = async (req, res, next) => {
  try {
    const productos = await prisma.producto.findMany({
      where: { activo: false },
      select: productoSelect,
      orderBy: { nombre: 'asc' },
    });
    res.json(productos);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/almacen/productos
 * Crea producto. stock inicial=0. precio>0. nombre no duplicado.
 * Body: { nombre, marca, categoriaId, precio, fechaVencimiento? }
 */
const crear = async (req, res, next) => {
  try {
    const { nombre, marca, categoriaId, precio, fechaVencimiento } = req.body;

    // Validaciones básicas
    if (!nombre || !marca || !categoriaId || precio === undefined) {
      return res.status(400).json({ message: 'nombre, marca, categoriaId y precio son requeridos' });
    }
    const precioNum = parseFloat(precio);
    if (isNaN(precioNum) || precioNum <= 0) {
      return res.status(400).json({ message: 'El precio debe ser mayor a 0' });
    }

    // Nombre no duplicado (solo entre activos)
    const existe = await prisma.producto.findFirst({
      where: { nombre: { equals: nombre, mode: 'insensitive' }, activo: true },
    });
    if (existe) {
      return res.status(409).json({ message: `Ya existe un producto activo llamado "${nombre}"` });
    }

    // Verificar que la categoría exista
    const cat = await prisma.categoria.findUnique({ where: { id: parseInt(categoriaId) } });
    if (!cat) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    const nuevo = await prisma.producto.create({
      data: {
        nombre,
        marca,
        categoriaId: parseInt(categoriaId),
        precio:  precioNum,
        stock:   0,
        fechaVencimiento: fechaVencimiento ? new Date(fechaVencimiento) : null,
      },
      select: productoSelect,
    });

    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/almacen/productos/:id
 * Edita todos los campos excepto stock.
 * Body: { nombre?, marca?, categoriaId?, precio?, fechaVencimiento? }
 */
const editar = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, marca, categoriaId, precio, fechaVencimiento } = req.body;

    const data = {};

    if (nombre !== undefined) {
      // Verificar duplicado (excluyendo el mismo producto)
      const dup = await prisma.producto.findFirst({
        where: { nombre: { equals: nombre, mode: 'insensitive' }, activo: true, NOT: { id } },
      });
      if (dup) {
        return res.status(409).json({ message: `Ya existe un producto activo llamado "${nombre}"` });
      }
      data.nombre = nombre;
    }

    if (marca       !== undefined) data.marca       = marca;
    if (categoriaId !== undefined) data.categoriaId = parseInt(categoriaId);

    if (precio !== undefined) {
      const precioNum = parseFloat(precio);
      if (isNaN(precioNum) || precioNum <= 0) {
        return res.status(400).json({ message: 'El precio debe ser mayor a 0' });
      }
      data.precio = precioNum;
    }

    if (fechaVencimiento !== undefined) {
      data.fechaVencimiento = fechaVencimiento ? new Date(fechaVencimiento) : null;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: 'Debe enviar al menos un campo a editar' });
    }

    const actualizado = await prisma.producto.update({
      where: { id },
      data,
      select: productoSelect,
    });

    res.json(actualizado);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    next(err);
  }
};

/**
 * DELETE /api/almacen/productos/:id
 * Soft delete: activo=false
 */
const desactivar = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.producto.update({ where: { id }, data: { activo: false } });
    res.json({ message: 'Producto desactivado correctamente' });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    next(err);
  }
};

/**
 * PATCH /api/almacen/productos/:id/reactivar
 * Reactiva un producto (activo=true) y registra en LogAcceso.
 */
const reactivar = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const producto = await prisma.producto.update({
      where: { id },
      data: { activo: true },
      select: productoSelect,
    });

    // Registrar en LogAcceso quién reactivó el producto
    await prisma.logAcceso.create({
      data: {
        usuarioId: req.user.id,
        rol: req.user.rol,
      },
    });

    res.json(producto);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    next(err);
  }
};

/**
 * GET /api/almacen/productos/vencimiento-proximo?dias=7
 * Retorna productos activos cuya fechaVencimiento <= hoy + N días.
 */
const vencimientoProximo = async (req, res, next) => {
  try {
    const dias = parseInt(req.query.dias) || 7;
    const limite = new Date();
    limite.setDate(limite.getDate() + dias);

    const productos = await prisma.producto.findMany({
      where: {
        activo: true,
        fechaVencimiento: { not: null, lte: limite },
      },
      select: { ...productoSelect },
      orderBy: { fechaVencimiento: 'asc' },
    });

    res.json(productos);
  } catch (err) {
    next(err);
  }
};

module.exports = { listar, listarInactivos, crear, editar, desactivar, reactivar, vencimientoProximo };
