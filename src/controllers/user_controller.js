const User = require('../models/user');
const AuthenticationService = require('../services/authentication_service');

class UserController {
  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newUser = await User.create({ name, email, password });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Failed to create user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json(user);
    } catch (error) {
      console.error('Failed to get user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.name = name;
      user.email = email;

      // Only update the password if it is provided
      if (password) {
        user.password = password;
      }

      await user.save();

      return res.json(user);
    } catch (error) {
      console.error('Failed to update user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();

      return res.status(204).end();
    } catch (error) {
      console.error('Failed to delete user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async listUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
      });

      return res.json(users);
    } catch (error) {
      console.error('Failed to list users:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Instanciar o serviço de autenticação
      const authenticationService = new AuthenticationService();

      // Chamar o método de login do serviço
      const result = await authenticationService.login(email, password);

      // Retornar o token e as informações do usuário
      return res.json(result);
    } catch (error) {
      console.error('Failed to login:', error);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  }
}

module.exports = UserController;
