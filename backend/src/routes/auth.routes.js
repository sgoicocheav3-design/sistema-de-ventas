// src/routes/auth.routes.js
const { Router } = require('express');
const { login, forgotPassword, resetPassword } = require('../controllers/auth.controller');

const router = Router();

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

// POST /api/auth/reset-password
router.post('/reset-password', resetPassword);

module.exports = router;
