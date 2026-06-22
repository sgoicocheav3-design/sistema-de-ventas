// src/routes/dashboard.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const { stats, chart } = require('../controllers/dashboard.controller');

const router = Router();

// Cualquier usuario autenticado con un rol válido puede ver el dashboard
router.use(authMiddleware);
router.use(roleMiddleware(['ADMIN', 'GERENTE', 'VENDEDOR', 'ALMACENERO']));

router.get('/stats', stats);
router.get('/chart', chart);

module.exports = router;
