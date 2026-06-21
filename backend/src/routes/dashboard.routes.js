// src/routes/dashboard.routes.js
const { Router } = require('express');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { stats, chart } = require('../controllers/dashboard.controller');

const router = Router();

// Cualquier usuario autenticado puede ver el dashboard
router.use(authMiddleware);

router.get('/stats', stats);
router.get('/chart', chart);

module.exports = router;
