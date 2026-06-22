// src/routes/reportes.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const { reporteVentas } = require('../controllers/reportes.controller');

const router = Router();
router.use(authMiddleware);
router.use(roleMiddleware(['ADMIN']));

router.get('/ventas', reporteVentas);

module.exports = router;
