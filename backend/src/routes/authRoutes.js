const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

const authRoutes = Router();

// POST /auth/login - Autenticação
authRoutes.post('/login', AuthController.login);

module.exports = authRoutes;
