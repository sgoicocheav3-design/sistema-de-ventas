// src/routes/gerencia-dashboard.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const { kpis, graficos } = require('../controllers/gerencia-dashboard.controller');

const router = Router();
router.use(authMiddleware);
router.use(roleMiddleware(['GERENTE', 'ADMIN']));

router.get('/kpis',     kpis);
router.get('/graficos', graficos);

module.exports = router;
