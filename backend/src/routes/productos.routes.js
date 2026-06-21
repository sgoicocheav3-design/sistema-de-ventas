// src/routes/productos.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const {
  listar,
  listarInactivos,
  crear,
  editar,
  desactivar,
  reactivar,
  vencimientoProximo,
} = require('../controllers/productos.controller');

const router = Router();

// Todas las rutas requieren token + rol ALMACENERO o ADMIN
router.use(authMiddleware);
router.use(roleMiddleware(['ALMACENERO', 'ADMIN']));

// IMPORTANTE: las rutas estáticas van ANTES que las dinámicas (:id)
router.get('/inactivos',              listarInactivos);
router.get('/vencimiento-proximo',    vencimientoProximo);
router.get('/',                       listar);
router.post('/',                      crear);
router.put('/:id',                    editar);
router.delete('/:id',                 desactivar);
router.patch('/:id/reactivar',        reactivar);

module.exports = router;
