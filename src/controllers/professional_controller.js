// src\controllers\professional_controller.js
const Professional = require('../models/professional');

class ProfessionalController {
  async createProfessional(req, res) {
    try {
      const { name, specialization, experience } = req.body;

      if (!name || !specialization || !experience) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newProfessional = await Professional.create({ name, specialization, experience });

      return res.status(201).json(newProfessional);
    } catch (error) {
      console.error('Failed to create professional:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProfessional(req, res) {
    try {
      const professionals = await Professional.findAll();

      return res.json(professionals);
    } catch (error) {
      console.error('Failed to get professionals:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProfessionalById(req, res) {
    try {
      const { id } = req.params;

      const professional = await Professional.findByPk(id);

      if (!professional) {
        return res.status(404).json({ error: 'Professional not found' });
      }

      return res.json(professional);
    } catch (error) {
      console.error('Failed to get professional:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateProfessional(req, res) {
    try {
      const { id } = req.params;
      const { name, specialization, experience } = req.body;

      const professional = await Professional.findByPk(id);

      if (!professional) {
        return res.status(404).json({ error: 'Professional not found' });
      }

      professional.name = name;
      professional.specialization = specialization;
      professional.experience = experience;

      await professional.save();

      return res.json(professional);
    } catch (error) {
      console.error('Failed to update professional:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteProfessional(req, res) {
    try {
      const { id } = req.params;

      const professional = await Professional.findByPk(id);

      if (!professional) {
        return res.status(404).json({ error: 'Professional not found' });
      }

      await professional.destroy();

      return res.status(204).end();
    } catch (error) {
      console.error('Failed to delete professional:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = ProfessionalController;
