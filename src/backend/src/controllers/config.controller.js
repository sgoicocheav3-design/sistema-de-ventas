// src/controllers/config.controller.js
const prisma = require('../prisma/client');

/**
 * Claves de configuración permitidas y sus defaults.
 */
const ALLOWED_KEYS = {
  umbral_alerta_visual: 5,
  umbral_solicitud_reposicion: 5,
};

/**
 * GET /api/admin/config
 * Retorna todos los umbrales de configuración del sistema.
 */
const leer = async (req, res, next) => {
  try {
    const configs = await prisma.configSistema.findMany({
      where: {
        clave: { in: Object.keys(ALLOWED_KEYS) },
      },
    });

    // Construir respuesta con defaults para claves no encontradas
    const result = {};
    for (const [clave, defaultVal] of Object.entries(ALLOWED_KEYS)) {
      const found = configs.find((c) => c.clave === clave);
      result[clave] = found ? parseInt(found.valor) : defaultVal;
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/config
 * Body: { umbral_alerta_visual?: number, umbral_solicitud_reposicion?: number }
 * Actualiza los umbrales (upsert).
 */
const actualizar = async (req, res, next) => {
  try {
    const updates = {};

    for (const clave of Object.keys(ALLOWED_KEYS)) {
      if (req.body[clave] !== undefined) {
        const val = parseInt(req.body[clave]);
        if (isNaN(val) || val < 0) {
          return res.status(400).json({
            message: `El valor de "${clave}" debe ser un número entero no negativo`,
          });
        }
        updates[clave] = String(val);
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: 'Debe enviar al menos un campo: umbral_alerta_visual, umbral_solicitud_reposicion',
      });
    }

    // Upsert cada clave
    for (const [clave, valor] of Object.entries(updates)) {
      await prisma.configSistema.upsert({
        where: { clave },
        update: { valor },
        create: { clave, valor },
      });
    }

    // Retornar la configuración actualizada
    const result = {};
    for (const [clave, defaultVal] of Object.entries(ALLOWED_KEYS)) {
      const cfg = await prisma.configSistema.findUnique({ where: { clave } });
      result[clave] = cfg ? parseInt(cfg.valor) : defaultVal;
    }

    res.json({ message: 'Configuración actualizada', config: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { leer, actualizar };
