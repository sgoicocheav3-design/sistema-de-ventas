// src/controllers/gerencia-dashboard.controller.js
const prisma = require('../prisma/client');

const getConfig = async (clave, defaultVal) => {
  const cfg = await prisma.configSistema.findUnique({ where: { clave } });
  return cfg ? parseInt(cfg.valor) : defaultVal;
};

/**
 * GET /api/gerencia/dashboard/kpis
 * Retorna KPIs clave para el dashboard del gerente.
 */
const kpis = async (req, res, next) => {
  try {
    const umbral = await getConfig('umbral_alerta_visual', 5);
    const inicioDia = new Date();
    inicioDia.setHours(0, 0, 0, 0);

    const [
      ingresosHoyAgg,
      alertasStock,
      totalClientes,
      solicitudesPendientes,
      ticketPromedioAgg,
      valorInventarioAgg,
    ] = await Promise.all([
      // Ingresos de hoy
      prisma.venta.aggregate({
        _sum: { total: true },
        where: { creadoEn: { gte: inicioDia } },
      }),
      // Productos con stock <= umbral
      prisma.producto.count({
        where: { activo: true, stock: { lte: umbral } },
      }),
      // Total clientes activos
      prisma.cliente.count({ where: { activo: true } }),
      // Solicitudes pendientes
      prisma.solicitudReposicion.count({ where: { estado: 'PENDIENTE' } }),
      // Ticket promedio (todas las ventas)
      prisma.venta.aggregate({ _avg: { total: true } }),
      // Valor inventario = SUM(precio * stock)
      prisma.$queryRaw`
        SELECT COALESCE(SUM("precio" * "stock"), 0) AS valor
        FROM "productos"
        WHERE "activo" = true
      `,
    ]);

    res.json({
      ingresosHoy:          parseFloat(ingresosHoyAgg._sum.total || 0),
      alertasStock,
      totalClientes,
      solicitudesPendientes,
      ticketPromedio:       parseFloat(ticketPromedioAgg._avg.total || 0),
      valorInventario:      parseFloat(valorInventarioAgg[0]?.valor || 0),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/gerencia/dashboard/graficos?tipo=barras|lineas|pastel&periodo=semana|mes
 * Retorna ventas agrupadas por día/semana según periodo.
 */
const graficos = async (req, res, next) => {
  try {
    const { tipo = 'barras', periodo = 'semana' } = req.query;

    let desde;
    const ahora = new Date();

    if (periodo === 'semana') {
      desde = new Date(ahora);
      desde.setDate(desde.getDate() - 6);
      desde.setHours(0, 0, 0, 0);
    } else {
      // mes: últimos 30 días
      desde = new Date(ahora);
      desde.setDate(desde.getDate() - 29);
      desde.setHours(0, 0, 0, 0);
    }

    // Ventas agrupadas por día
    const ventasPorDia = await prisma.$queryRaw`
      SELECT
        DATE("creadoEn") AS fecha,
        COUNT(*)::int AS cantidad,
        COALESCE(SUM("total"), 0) AS total
      FROM "ventas"
      WHERE "creadoEn" >= ${desde}
      GROUP BY DATE("creadoEn")
      ORDER BY fecha ASC
    `;

    // Rellenar días sin ventas
    const datos = [];
    const cursor = new Date(desde);
    const hoy = new Date(ahora);
    hoy.setHours(23, 59, 59, 999);

    while (cursor <= hoy) {
      const fechaStr = cursor.toISOString().split('T')[0];
      const dia = ventasPorDia.find((v) => {
        const vFecha = v.fecha instanceof Date
          ? v.fecha.toISOString().split('T')[0]
          : String(v.fecha).split('T')[0];
        return vFecha === fechaStr;
      });

      datos.push({
        fecha: fechaStr,
        etiqueta: cursor.toLocaleDateString('es-PE', { weekday: 'short', day: 'numeric', month: 'short' }),
        cantidad: dia ? Number(dia.cantidad) : 0,
        total:    dia ? parseFloat(dia.total)  : 0,
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    // Para pastel: agrupar por método de pago
    let datosPastel = null;
    if (tipo === 'pastel') {
      const porMetodo = await prisma.$queryRaw`
        SELECT
          "metodoPago" AS metodo,
          COUNT(*)::int AS cantidad,
          COALESCE(SUM("total"), 0) AS total
        FROM "ventas"
        WHERE "creadoEn" >= ${desde}
        GROUP BY "metodoPago"
        ORDER BY total DESC
      `;
      datosPastel = porMetodo.map((m) => ({
        metodo:   m.metodo,
        cantidad: Number(m.cantidad),
        total:    parseFloat(m.total),
      }));
    }

    res.json({ tipo, periodo, datos, datosPastel });
  } catch (err) {
    next(err);
  }
};

module.exports = { kpis, graficos };
