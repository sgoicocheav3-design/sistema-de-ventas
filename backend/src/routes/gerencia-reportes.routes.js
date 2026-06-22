// src/routes/gerencia-reportes.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const { cierreCaja } = require('../controllers/reportes.controller');

const router = Router();
router.use(authMiddleware);
router.use(roleMiddleware(['GERENTE', 'VENDEDOR', 'ADMIN']));

router.get('/cierre-caja', cierreCaja);

module.exports = router;
