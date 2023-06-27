// src\routes\activity_routes.js
const express = require('express');
const ActivityController = require('../controllers/activity_controller');

const router = express.Router();
const activityController = new ActivityController();

router.post('/activity', activityController.createActivity);
router.get('/activity', activityController.getAllActivity);
router.get('/activity/:id', activityController.getActivityById);
router.put('/activity/:id', activityController.updateActivity);
router.delete('/activity/:id', activityController.deleteActivity);

module.exports = router;
