const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SaleProduct = sequelize.define('SaleProduct', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  priceAtSale: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  timestamps: false
});

module.exports=SaleProduct;