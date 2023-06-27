// src\controllers\student_controller.js
const Student = require('../models/student');

class StudentController {
  async createStudent(req, res) {
    try {
      const { name, age, email } = req.body;

      if (!name || !age || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newStudent = await Student.create({ name, age, email });

      return res.status(201).json(newStudent);
    } catch (error) {
      console.error('Failed to create student:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAllStudents(req, res) {
    try {
      const students = await Student.findAll();

      return res.json(students);
    } catch (error) {
      console.error('Failed to get students:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getStudentById(req, res) {
    try {
      const { id } = req.params;

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      return res.json(student);
    } catch (error) {
      console.error('Failed to get student:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateStudent(req, res) {
    try {
      const { id } = req.params;
      const { name, age, email } = req.body;

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      student.name = name;
      student.age = age;
      student.email = email;

      await student.save();

      return res.json(student);
    } catch (error) {
      console.error('Failed to update student:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteStudent(req, res) {
    try {
      const { id } = req.params;

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      await student.destroy();

      return res.status(204).end();
    } catch (error) {
      console.error('Failed to delete student:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = StudentController;
