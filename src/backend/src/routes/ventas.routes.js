// src/routes/ventas.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const { buscarProductos, crearVenta, comprobante } = require('../controllers/ventas.controller');

const router = Router();

router.use(authMiddleware);

router.get(
  '/productos/buscar',
  roleMiddleware(['VENDEDOR', 'ADMIN', 'GERENTE']),
  buscarProductos
);

router.post(
  '/',
  roleMiddleware(['VENDEDOR', 'ADMIN']),
  crearVenta
);

router.get(
  '/:id/comprobante',
  roleMiddleware(['VENDEDOR', 'ADMIN', 'GERENTE']),
  comprobante
);

module.exports = router;
