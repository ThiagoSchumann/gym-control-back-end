const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/db-dev.sqlite',
});

module.exports = sequelize;
