// src/routes/categorias.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const { listar } = require('../controllers/categorias.controller');

const router = Router();

// GET /api/categorias — requiere autenticación, todos los roles
router.use(authMiddleware);
router.use(roleMiddleware(['ADMIN', 'GERENTE', 'VENDEDOR', 'ALMACENERO']));

router.get('/', listar);

module.exports = router;
