// src\routes\student_routes.js
const express = require('express');
const StudentController = require('../controllers/student_controller');

const router = express.Router();
const studentController = new StudentController();

router.post('/students', studentController.createStudent);
router.get('/students', studentController.getAllStudents);
router.get('/students/:id', studentController.getStudentById);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
