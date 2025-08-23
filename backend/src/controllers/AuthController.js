const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validação dos campos obrigatórios
      if (!email || !password) {
        return res.status(400).json({
          error: 'Campos obrigatórios',
          message: 'Email e senha são obrigatórios'
        });
      }

      // Buscar usuário por email
      const user = UserRepository.findByEmail(email);
      
      if (!user) {
        return res.status(401).json({
          error: 'Credenciais inválidas',
          message: 'Email ou senha incorretos'
        });
      }

      // Verificar senha (sem criptografia conforme especificado)
      if (user.password !== password) {
        return res.status(401).json({
          error: 'Credenciais inválidas',
          message: 'Email ou senha incorretos'
        });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          type: user.type 
        },
        process.env.JWT_SECRET,
        { 
          expiresIn: '24h' 
        }
      );

      // Retornar dados do usuário (sem senha) e token
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        message: 'Login realizado com sucesso',
        user: userWithoutPassword,
        token
      });

    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Ocorreu um erro durante o processo de autenticação'
      });
    }
  }
}

module.exports = AuthController;
