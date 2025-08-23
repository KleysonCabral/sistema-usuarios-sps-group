const UserRepository = require('../repositories/UserRepository');

class UserController {
  // GET /users - Listar todos os usuários
  static async index(req, res) {
    try {
      const users = UserRepository.findAll();
      
      // Remover senhas dos usuários na resposta
      const usersWithoutPassword = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      res.json({
        message: 'Usuários listados com sucesso',
        users: usersWithoutPassword
      });
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Não foi possível listar os usuários'
      });
    }
  }

  // GET /users/:id - Buscar usuário por ID
  static async show(req, res) {
    try {
      const { id } = req.params;
      const user = UserRepository.findById(id);

      if (!user) {
        return res.status(404).json({
          error: 'Usuário não encontrado',
          message: 'O usuário solicitado não existe'
        });
      }

      // Remover senha da resposta
      const { password, ...userWithoutPassword } = user;

      res.json({
        message: 'Usuário encontrado',
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Não foi possível buscar o usuário'
      });
    }
  }

  // POST /users - Criar novo usuário
  static async store(req, res) {
    try {
      const { name, email, type, password } = req.body;

      // Validação dos campos obrigatórios
      if (!name || !email || !type || !password) {
        return res.status(400).json({
          error: 'Campos obrigatórios',
          message: 'Nome, email, tipo e senha são obrigatórios'
        });
      }

      // Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: 'Email inválido',
          message: 'Por favor, forneça um email válido'
        });
      }

      // Verificar se o email já existe
      if (UserRepository.emailExists(email)) {
        return res.status(409).json({
          error: 'Email já cadastrado',
          message: 'Este email já está sendo usado por outro usuário'
        });
      }

      // Validar tipo de usuário
      const validTypes = ['admin', 'user'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          error: 'Tipo inválido',
          message: 'O tipo deve ser "admin" ou "user"'
        });
      }

      // Criar usuário
      const newUser = UserRepository.create({
        name,
        email,
        type,
        password
      });

      // Remover senha da resposta
      const { password: _, ...userWithoutPassword } = newUser;

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: userWithoutPassword
      });

    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Não foi possível criar o usuário'
      });
    }
  }

  // PUT /users/:id - Atualizar usuário
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, type, password } = req.body;

      // Verificar se usuário existe
      const existingUser = UserRepository.findById(id);
      if (!existingUser) {
        return res.status(404).json({
          error: 'Usuário não encontrado',
          message: 'O usuário que você está tentando atualizar não existe'
        });
      }

      // Validação dos campos obrigatórios
      if (!name || !email || !type || !password) {
        return res.status(400).json({
          error: 'Campos obrigatórios',
          message: 'Nome, email, tipo e senha são obrigatórios'
        });
      }

      // Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: 'Email inválido',
          message: 'Por favor, forneça um email válido'
        });
      }

      // Verificar se o email já existe (excluindo o usuário atual)
      if (UserRepository.emailExists(email, id)) {
        return res.status(409).json({
          error: 'Email já cadastrado',
          message: 'Este email já está sendo usado por outro usuário'
        });
      }

      // Validar tipo de usuário
      const validTypes = ['admin', 'user'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          error: 'Tipo inválido',
          message: 'O tipo deve ser "admin" ou "user"'
        });
      }

      // Atualizar usuário
      const updatedUser = UserRepository.update(id, {
        name,
        email,
        type,
        password
      });

      // Remover senha da resposta
      const { password: _, ...userWithoutPassword } = updatedUser;

      res.json({
        message: 'Usuário atualizado com sucesso',
        user: userWithoutPassword
      });

    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Não foi possível atualizar o usuário'
      });
    }
  }

  // DELETE /users/:id - Deletar usuário
  static async destroy(req, res) {
    try {
      const { id } = req.params;

      // Verificar se usuário existe
      const existingUser = UserRepository.findById(id);
      if (!existingUser) {
        return res.status(404).json({
          error: 'Usuário não encontrado',
          message: 'O usuário que você está tentando deletar não existe'
        });
      }

      // Não permitir deletar o usuário admin principal
      if (existingUser.email === 'admin@spsgroup.com.br') {
        return res.status(403).json({
          error: 'Operação não permitida',
          message: 'Não é possível deletar o usuário administrador principal'
        });
      }

      // Deletar usuário
      const deleted = UserRepository.delete(id);

      if (deleted) {
        res.json({
          message: 'Usuário deletado com sucesso'
        });
      } else {
        res.status(500).json({
          error: 'Erro interno',
          message: 'Não foi possível deletar o usuário'
        });
      }

    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Não foi possível deletar o usuário'
      });
    }
  }
}

module.exports = UserController;
