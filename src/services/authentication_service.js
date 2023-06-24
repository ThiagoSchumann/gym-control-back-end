const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

class AuthenticationService {
  async login(email, password) {
    try {
      // Verificar se o usuário existe no banco de dados
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Verificar se a senha está correta
      const isPasswordValid = await (password == user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      // Gerar um token de autenticação
      const token = jwt.sign({ userId: user.id }, 'c5e87a02-40e8-4e48-9f8b-739d2c78e9a1', {
        expiresIn: '10h', // Define o tempo de expiração do token
      });

      // Retornar o token e as informações do usuário (exceto a senha)
      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
    console.error('Failed to create user:', error);
      throw new Error('Failed to login');
    }
  }
}

module.exports = AuthenticationService;
