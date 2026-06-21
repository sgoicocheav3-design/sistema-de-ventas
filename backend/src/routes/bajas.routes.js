// src/routes/bajas.routes.js
const { Router } = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const { crear, listar } = require('../controllers/bajas.controller');

const router = Router();
router.use(authMiddleware);
router.use(roleMiddleware(['ALMACENERO', 'ADMIN']));

router.get('/',  listar);
router.post('/', crear);

module.exports = router;
