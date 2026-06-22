// src/controllers/auditoria.controller.js
const prisma = require('../prisma/client');

/**
 * GET /api/gerencia/auditoria?pagina=1&limite=20
 * Lista log_accesos donde archivado=false, orden DESC por timestamp.
 */
const listar = async (req, res, next) => {
  try {
    const pagina = Math.max(1, parseInt(req.query.pagina) || 1);
    const limite = Math.min(100, Math.max(1, parseInt(req.query.limite) || 20));
    const skip   = (pagina - 1) * limite;

    const [logs, total] = await Promise.all([
      prisma.logAcceso.findMany({
        where: { archivado: false },
        include: {
          usuario: { select: { id: true, nombre: true, email: true } },
        },
        orderBy: { timestamp: 'desc' },
        skip,
        take: limite,
      }),
      prisma.logAcceso.count({ where: { archivado: false } }),
    ]);

    res.json({
      logs,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite),
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/gerencia/auditoria/archivar
 * Body: { hasta: "YYYY-MM-DD" }
 * Actualiza archivado=true donde timestamp <= hasta (soft-archive).
 */
const archivar = async (req, res, next) => {
  try {
    const { hasta } = req.body;

    if (!hasta) {
      return res.status(400).json({ message: 'El campo "hasta" (YYYY-MM-DD) es requerido' });
    }

    const fechaLimite = new Date(hasta + 'T23:59:59.999');

    if (isNaN(fechaLimite.getTime())) {
      return res.status(400).json({ message: 'Fecha inválida. Usa formato YYYY-MM-DD' });
    }

    const result = await prisma.logAcceso.updateMany({
      where: {
        archivado: false,
        timestamp: { lte: fechaLimite },
      },
      data: { archivado: true },
    });

    res.json({
      message: `${result.count} registro(s) archivados correctamente`,
      archivados: result.count,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { listar, archivar };
