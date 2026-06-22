// src/routes/auditoria.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const { listar, archivar } = require('../controllers/auditoria.controller');

const router = Router();
router.use(authMiddleware);
router.use(roleMiddleware(['GERENTE', 'ADMIN']));

router.get('/',          listar);
router.patch('/archivar', archivar);

module.exports = router;
