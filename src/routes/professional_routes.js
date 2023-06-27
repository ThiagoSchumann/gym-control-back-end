// src\routes\professional_routes.js
const express = require('express');
const ProfessionalController = require('../controllers/professional_controller');

const router = express.Router();
const professionalController = new ProfessionalController();

router.post('/professional', professionalController.createProfessional);
router.get('/professional', professionalController.getProfessional);
router.get('/professional/:id', professionalController.getProfessionalById);
router.put('/professional/:id', professionalController.updateProfessional);
router.delete('/professional/:id', professionalController.deleteProfessional);

module.exports = router;
