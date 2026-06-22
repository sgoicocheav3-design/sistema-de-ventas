// src/controllers/dashboard.controller.js
const prisma = require('../prisma/client');

const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

const getConfig = async (clave, defaultVal) => {
  const cfg = await prisma.configSistema.findUnique({ where: { clave } });
  return cfg ? parseInt(cfg.valor) : defaultVal;
};

/**
 * GET /api/dashboard/stats
 * Retorna métricas generales del sistema.
 */
const stats = async (req, res, next) => {
  try {
    const umbral = await getConfig('umbral_alerta_visual', 5);

    const ahora   = new Date();
    const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
    const inicioDia = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());

    const [
      totalProductos,
      productosStockBajo,
      totalProveedores,
      totalUsuarios,
      ventasHoyAgg,
      ventasMesAgg,
      entradasMesAgg,
      igvMesAgg,
      efectivoAgg,
      yapePlinAgg,
    ] = await Promise.all([
      prisma.producto.count({ where: { activo: true } }),
      prisma.producto.count({ where: { activo: true, stock: { lte: umbral } } }),
      prisma.proveedor.count({ where: { activo: true } }),
      prisma.usuario.count({ where: { activo: true } }),

      // Ventas del día
      prisma.venta.aggregate({
        _sum: { total: true },
        where: { creadoEn: { gte: inicioDia } },
      }),
      // Ventas del mes
      prisma.venta.aggregate({
        _sum: { total: true },
        where: { creadoEn: { gte: inicioMes } },
      }),
      // Entradas (compras) del mes
      prisma.entradaMercaderia.aggregate({
        _sum: { cantidad: true },
        where: { creadoEn: { gte: inicioMes } },
      }),
      // IGV del mes
      prisma.venta.aggregate({
        _sum: { igv: true },
        where: { creadoEn: { gte: inicioMes } },
      }),
      // Ventas en efectivo del mes
      prisma.venta.aggregate({
        _sum: { total: true },
        where: { creadoEn: { gte: inicioMes }, metodoPago: 'EFECTIVO' },
      }),
      // Ventas Yape+Plin del mes
      prisma.venta.aggregate({
        _sum: { total: true },
        where: { creadoEn: { gte: inicioMes }, metodoPago: { in: ['YAPE', 'PLIN'] } },
      }),
    ]);

    const ventasMes    = parseFloat(ventasMesAgg._sum.total  || 0);
    const igvMes       = parseFloat(igvMesAgg._sum.igv       || 0);
    const utilidadMes  = ventasMes - igvMes;

    res.json({
      ventasHoy:        parseFloat(ventasHoyAgg._sum.total || 0),
      ventasMes,
      comprasMes:       entradasMesAgg._sum.cantidad || 0,
      utilidadMes:      utilidadMes > 0 ? utilidadMes : 0,
      igvMes,
      efectivoCaja:     parseFloat(efectivoAgg._sum.total  || 0),
      yapePlin:         parseFloat(yapePlinAgg._sum.total  || 0),
      productosStockBajo,
      totalProductos,
      totalProveedores,
      totalUsuarios,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/dashboard/chart
 * Retorna ventas y entradas agrupadas por mes para el año actual.
 */
const chart = async (req, res, next) => {
  try {
    const anio = new Date().getFullYear();

    const meses = MESES.map((mes) => ({
      mes,
      ventas:   0,
      compras:  0,
    }));

    // Sumar ventas por mes
    const ventasRaw = await prisma.$queryRaw`
      SELECT EXTRACT(MONTH FROM "creadoEn") AS mes, SUM("total") AS total
      FROM "ventas"
      WHERE EXTRACT(YEAR FROM "creadoEn") = ${anio}
      GROUP BY mes
    `;
    ventasRaw.forEach(({ mes, total }) => {
      meses[parseInt(mes) - 1].ventas = parseFloat(total);
    });

    res.json({ anio, meses });
  } catch (err) {
    // Si la DB no responde, retornar datos vacíos sin error
    const meses = MESES.map((mes) => ({ mes, ventas: 0, compras: 0 }));
    res.json({ anio: new Date().getFullYear(), meses });
  }
};

module.exports = { stats, chart };
