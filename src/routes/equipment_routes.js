// src\routes\equipment_routes.js
const express = require('express');
const EquipmentController = require('../controllers/equipment_controller');

const router = express.Router();
const equipmentController = new EquipmentController();

router.post('/equipment', equipmentController.createEquipment);
router.get('/equipment', equipmentController.getAllEquipment);
router.get('/equipment/:id', equipmentController.getEquipmentById);
router.put('/equipment/:id', equipmentController.updateEquipment);
router.delete('/equipment/:id', equipmentController.deleteEquipment);

module.exports = router;
