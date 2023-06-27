const express = require('express');
const GymController = require('../controllers/gym_controller');

const router = express.Router();
const gymController = new GymController();

router.post('/gym', gymController.createGym);
router.get('/gym/:id', gymController.getGym);
router.put('/gym/:id', gymController.updateGym);
router.delete('/gym/:id', gymController.deleteGym);
router.get('/gym', gymController.listGyms);

module.exports = router;
