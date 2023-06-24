const { sequelize } = require('../../config/database');
const User = require('../models/User');

class UserService {
  static async createUser(name, email) {
    try {
      const user = await User.create({ name, email });
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  static async getAllUsers() {
    try {
      const users = await User.findAll();

      return users;
    } catch (error) {
      console.error('Error fetching user list:', error);
      throw new Error('Failed to fetch user list');
    }
  }

  static async getUserById(id) {
    try {
      const user = await User.findByPk(id);

      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }
    
  static async updateUser(id, name, email) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error('User not found');
      }

      user.name = name;
      user.email = email;

      await user.save();

      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  static async deleteUser(id) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error('User not found');
      }

      await user.destroy();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }


}

module.exports = UserService;
