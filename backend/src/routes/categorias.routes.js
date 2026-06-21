// src/routes/categorias.routes.js
const { Router } = require('express');
const { listar } = require('../controllers/categorias.controller');

const router = Router();

// GET /api/categorias  — público, sin autenticación
router.get('/', listar);

module.exports = router;
