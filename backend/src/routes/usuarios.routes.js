// src/routes/usuarios.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const { listar, crear, editar, desactivar } = require('../controllers/usuarios.controller');

const router = Router();

// Todas las rutas de este módulo requieren token válido + rol ADMIN
router.use(authMiddleware);
router.use(roleMiddleware(['ADMIN']));

// GET    /api/admin/usuarios       → Lista usuarios activos
router.get('/', listar);

// POST   /api/admin/usuarios       → Crea usuario
router.post('/', crear);

// PUT    /api/admin/usuarios/:id   → Edita nombre, email, rol
router.put('/:id', editar);

// DELETE /api/admin/usuarios/:id   → Soft delete (activo=false)
router.delete('/:id', desactivar);

module.exports = router;
