const UserService = require('../services/UserService');

class UserController {
  static async createUser(req, res) {
    const { name, email } = req.body;

    try {
      const user = await UserService.createUser(name, email);
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  }

  static async getList(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching user list:', error);
      res.status(500).json({ error: 'Failed to fetch user list' });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const user = await UserService.getUserById(id);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
      const updatedUser = await UserService.updateUser(id, name, email);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      await UserService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
}

module.exports = UserController;
