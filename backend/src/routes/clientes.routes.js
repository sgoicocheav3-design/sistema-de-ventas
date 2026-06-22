// src/routes/clientes.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const { listar, buscarPorDni, crear, exportarCSV } = require('../controllers/clientes.controller');

const router = Router();
router.use(authMiddleware);
router.use(roleMiddleware(['VENDEDOR', 'ADMIN', 'GERENTE']));

// Rutas estáticas ANTES de :param
router.get('/exportar',       exportarCSV);
router.get('/buscar-dni/:dni', buscarPorDni);
router.get('/',                listar);
router.post('/',               crear);

module.exports = router;
