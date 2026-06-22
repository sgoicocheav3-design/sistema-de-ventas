// src/routes/gerencia-solicitudes.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const {
  listarGerencia,
  listarProveedores,
  aprobar,
  rechazar,
} = require('../controllers/solicitudes.controller');

const router = Router();
router.use(authMiddleware);
router.use(roleMiddleware(['GERENTE', 'ADMIN']));

router.get('/',              listarGerencia);
router.get('/proveedores',   listarProveedores);
router.patch('/:id/aprobar',  aprobar);
router.patch('/:id/rechazar', rechazar);

module.exports = router;
