// src/routes/recepciones.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const {
  recepcionesPendientes,
  recepcionesPendientesCount,
} = require('../controllers/solicitudes.controller');

const router = Router();
router.use(authMiddleware);
router.use(roleMiddleware(['ALMACENERO', 'ADMIN']));

// IMPORTANTE: ruta más específica primero
router.get('/pendientes/count', recepcionesPendientesCount);
router.get('/pendientes',       recepcionesPendientes);

module.exports = router;
