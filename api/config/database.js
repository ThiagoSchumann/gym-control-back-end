const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/gym-control-dev.sqlite',
});

module.exports = sequelize;
