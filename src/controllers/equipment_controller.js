// src\controllers\equipment_controller.js
const Equipment = require('../models/equipment');

class EquipmentController {
  async createEquipment(req, res) {
    try {
      const { name, type, description } = req.body;

      if (!name || !type || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newEquipment = await Equipment.create({ name, type, description });

      return res.status(201).json(newEquipment);
    } catch (error) {
      console.error('Failed to create equipment:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAllEquipment(req, res) {
    try {
      const equipment = await Equipment.findAll();

      return res.json(equipment);
    } catch (error) {
      console.error('Failed to get equipment:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getEquipmentById(req, res) {
    try {
      const { id } = req.params;

      const equipment = await Equipment.findByPk(id);

      if (!equipment) {
        return res.status(404).json({ error: 'Equipment not found' });
      }

      return res.json(equipment);
    } catch (error) {
      console.error('Failed to get equipment:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateEquipment(req, res) {
    try {
      const { id } = req.params;
      const { name, type, description } = req.body;

      const equipment = await Equipment.findByPk(id);

      if (!equipment) {
        return res.status(404).json({ error: 'Equipment not found' });
      }

      equipment.name = name;
      equipment.type = type;
      equipment.description = description;

      await equipment.save();

      return res.json(equipment);
    } catch (error) {
      console.error('Failed to update equipment:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteEquipment(req, res) {
    try {
      const { id } = req.params;

      const equipment = await Equipment.findByPk(id);

      if (!equipment) {
        return res.status(404).json({ error: 'Equipment not found' });
      }

      await equipment.destroy();

      return res.status(204).end();
    } catch (error) {
      console.error('Failed to delete equipment:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = EquipmentController;
