// src/routes/solicitudes.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const {
  crear,
  historial,
  completar,
} = require('../controllers/solicitudes.controller');

const router = Router();
router.use(authMiddleware);
router.use(roleMiddleware(['ALMACENERO', 'ADMIN']));

// Rutas estáticas ANTES de dinámicas (:id)
router.get('/historial',       historial);
router.post('/',               crear);
router.patch('/:id/completar', completar);

module.exports = router;
