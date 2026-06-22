// src/controllers/reportes.controller.js
const prisma = require('../prisma/client');

/**
 * GET /api/admin/reportes/ventas?desde=&hasta=&metodoPago=&formato=json|csv
 * Lista ventas con filtros; opcionalmente exporta CSV.
 * PDF generation is handled client-side using pdfmake.
 */
const reporteVentas = async (req, res, next) => {
  try {
    const { desde, hasta, metodoPago, formato = 'json' } = req.query;

    // ─── Build WHERE ──────────────────────────────────────────────────────
    const where = {};
    if (desde || hasta) {
      where.creadoEn = {};
      if (desde) where.creadoEn.gte = new Date(desde + 'T00:00:00');
      if (hasta) where.creadoEn.lte = new Date(hasta + 'T23:59:59.999');
    }
    if (metodoPago) where.metodoPago = metodoPago;

    const ventas = await prisma.venta.findMany({
      where,
      include: {
        detalles: {
          include: { producto: { select: { nombre: true, marca: true } } },
        },
        usuario: { select: { id: true, nombre: true } },
        cliente: { select: { id: true, dni: true, nombre: true } },
      },
      orderBy: { creadoEn: 'desc' },
      take: 500,
    });

    // ─── CSV export ───────────────────────────────────────────────────────
    if (formato === 'csv') {
      const header = 'ID,Número,Fecha,Vendedor,Cliente,Método Pago,Subtotal,IGV,Total\n';
      const rows = ventas.map((v) => {
        const fecha = new Date(v.creadoEn).toLocaleString('es-PE');
        const vendedor = `"${(v.usuario?.nombre || '').replace(/"/g, '""')}"`;
        const cliente = `"${(v.cliente?.nombre || 'Sin cliente').replace(/"/g, '""')}"`;
        return `${v.id},${v.numero},"${fecha}",${vendedor},${cliente},${v.metodoPago},${v.subtotal},${v.igv},${v.total}`;
      }).join('\n');

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename=reporte_ventas_${new Date().toISOString().split('T')[0]}.csv`);
      return res.send('\uFEFF' + header + rows);
    }

    // ─── JSON (default) ───────────────────────────────────────────────────
    const totalMonto = ventas.reduce((s, v) => s + parseFloat(v.total), 0);
    res.json({
      total:   ventas.length,
      monto:   Math.round(totalMonto * 100) / 100,
      ventas,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/gerencia/reportes/cierre-caja?fecha=YYYY-MM-DD
 * Agrupa ventas de la fecha por método de pago (HU-28).
 */
const cierreCaja = async (req, res, next) => {
  try {
    const { fecha } = req.query;
    const dia = fecha ? new Date(fecha + 'T00:00:00') : new Date();
    dia.setHours(0, 0, 0, 0);
    const finDia = new Date(dia);
    finDia.setHours(23, 59, 59, 999);

    const porMetodo = await prisma.$queryRaw`
      SELECT
        "metodoPago"       AS metodo,
        COUNT(*)::int      AS cantidad,
        COALESCE(SUM("total"), 0) AS total
      FROM "ventas"
      WHERE "creadoEn" >= ${dia} AND "creadoEn" <= ${finDia}
      GROUP BY "metodoPago"
      ORDER BY total DESC
    `;

    const totalesAgg = await prisma.venta.aggregate({
      _count: true,
      _sum:   { total: true },
      _avg:   { total: true },
      where: { creadoEn: { gte: dia, lte: finDia } },
    });

    const desglose = {};
    porMetodo.forEach((m) => {
      desglose[m.metodo] = {
        cantidad: Number(m.cantidad),
        total:    parseFloat(m.total),
      };
    });

    res.json({
      fecha:           dia.toISOString().split('T')[0],
      totalEfectivo:   desglose.EFECTIVO?.total || 0,
      totalYape:       desglose.YAPE?.total || 0,
      totalPlin:       desglose.PLIN?.total || 0,
      totalGeneral:    parseFloat(totalesAgg._sum.total || 0),
      cantidadVentas:  totalesAgg._count || 0,
      ticketPromedio:  parseFloat(totalesAgg._avg.total || 0),
      desglose,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { reporteVentas, cierreCaja };
