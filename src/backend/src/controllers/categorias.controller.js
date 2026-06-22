// src/controllers/categorias.controller.js
const prisma = require('../prisma/client');

/**
 * GET /api/categorias
 * Público — lista todas las categorías (sin filtro de activo, no hay campo activo en Categoria)
 */
const listar = async (req, res, next) => {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: { nombre: 'asc' },
      select: { id: true, nombre: true },
    });
    res.json(categorias);
  } catch (err) {
    next(err);
  }
};

module.exports = { listar };
