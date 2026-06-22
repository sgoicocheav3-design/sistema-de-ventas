// src/routes/backup.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const { listar, restaurar } = require('../controllers/backup.controller');

const router = Router();
router.use(authMiddleware);
router.use(roleMiddleware(['ADMIN']));

// GET  /api/admin/backups          → Lista archivos de backup
router.get('/', listar);

// POST /api/admin/backups/restaurar → Restaura un backup
router.post('/restaurar', restaurar);

module.exports = router;
