// src\models\professional.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Professional = sequelize.define('Professional', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Professional;
