const express = require('express');
const UserController = require('../controllers/user_controller');

const router = express.Router();
const userController = new UserController();

router.post('/user', userController.createUser);
router.get('/user/:id', userController.getUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.get('/user', userController.listUsers);

router.post('/login', userController.login);

module.exports = router;
