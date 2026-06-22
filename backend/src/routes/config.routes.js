// src/routes/config.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const { leer, actualizar } = require('../controllers/config.controller');

const router = Router();
router.use(authMiddleware);
router.use(roleMiddleware(['ADMIN']));

// GET /api/admin/config  → Lee configuración de umbrales
router.get('/', leer);

// PUT /api/admin/config  → Actualiza configuración de umbrales
router.put('/', actualizar);

module.exports = router;
