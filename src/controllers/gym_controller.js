const Gym = require('../models/gym');

class GymController {
  async createGym(req, res) {
    try {
      const { name, address, city, country } = req.body;

      if (!name || !address || !city || !country) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newGym = await Gym.create({ name, address, city, country });

      return res.status(201).json(newGym);
    } catch (error) {
      console.error('Failed to create gym:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getGym(req, res) {
    try {
      const { id } = req.params;

      const gym = await Gym.findByPk(id);

      if (!gym) {
        return res.status(404).json({ error: 'Gym not found' });
      }

      return res.json(gym);
    } catch (error) {
      console.error('Failed to get gym:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateGym(req, res) {
    try {
      const { id } = req.params;
      const { name, address, city, country } = req.body;

      const gym = await Gym.findByPk(id);

      if (!gym) {
        return res.status(404).json({ error: 'Gym not found' });
      }

      gym.name = name;
      gym.address = address;
      gym.city = city;
      gym.country = country;

      await gym.save();

      return res.json(gym);
    } catch (error) {
      console.error('Failed to update gym:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteGym(req, res) {
    try {
      const { id } = req.params;

      const gym = await Gym.findByPk(id);

      if (!gym) {
        return res.status(404).json({ error: 'Gym not found' });
      }

      await gym.destroy();

      return res.status(204).end();
    } catch (error) {
      console.error('Failed to delete gym:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async listGyms(req, res) {
    try {
      const gyms = await Gym.findAll();

      return res.json(gyms);
    } catch (error) {
      console.error('Failed to list gyms:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = GymController;
