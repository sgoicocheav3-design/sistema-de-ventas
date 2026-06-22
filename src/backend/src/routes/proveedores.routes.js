// src/routes/proveedores.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const { listar, crear, editar, desactivar } = require('../controllers/proveedores.controller');

const router = Router();

// Todas las rutas requieren ADMIN
router.use(authMiddleware);
router.use(roleMiddleware(['ADMIN']));

router.get('/',      listar);
router.post('/',     crear);
router.put('/:id',   editar);
router.delete('/:id', desactivar);

module.exports = router;
