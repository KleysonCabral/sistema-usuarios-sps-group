const { Router } = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

const userRoutes = Router();

// Aplicar middleware de autenticação a todas as rotas de usuários
userRoutes.use(authMiddleware);

// GET /users - Listar todos os usuários
userRoutes.get('/', UserController.index);

// GET /users/:id - Buscar usuário por ID
userRoutes.get('/:id', UserController.show);

// POST /users - Criar novo usuário
userRoutes.post('/', UserController.store);

// PUT /users/:id - Atualizar usuário
userRoutes.put('/:id', UserController.update);

// DELETE /users/:id - Deletar usuário
userRoutes.delete('/:id', UserController.destroy);

module.exports = userRoutes;
