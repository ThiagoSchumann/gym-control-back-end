// src\controllers\activity_controller.js
const Activity = require('../models/activity');

class ActivityController {
  async createActivity(req, res) {
    try {
      const { name, duration, description } = req.body;

      if (!name || !duration || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newActivity = await Activity.create({ name, duration, description });

      return res.status(201).json(newActivity);
    } catch (error) {
      console.error('Failed to create activity:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAllActivity(req, res) {
    try {
      const activities = await Activity.findAll();

      return res.json(activities);
    } catch (error) {
      console.error('Failed to get activities:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getActivityById(req, res) {
    try {
      const { id } = req.params;

      const activity = await Activity.findByPk(id);

      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }

      return res.json(activity);
    } catch (error) {
      console.error('Failed to get activity:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateActivity(req, res) {
    try {
      const { id } = req.params;
      const { name, duration, description } = req.body;

      const activity = await Activity.findByPk(id);

      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }

      activity.name = name;
      activity.duration = duration;
      activity.description = description;

      await activity.save();

      return res.json(activity);
    } catch (error) {
      console.error('Failed to update activity:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteActivity(req, res) {
    try {
      const { id } = req.params;

      const activity = await Activity.findByPk(id);

      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }

      await activity.destroy();

      return res.status(204).end();
    } catch (error) {
      console.error('Failed to delete activity:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = ActivityController;
