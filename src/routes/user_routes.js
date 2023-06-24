const express = require('express');
const UserController = require('../controllers/user_controller');

const router = express.Router();
const userController = new UserController();

router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users', userController.listUsers);

router.post('/login', userController.login);

module.exports = router;
