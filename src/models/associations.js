const Sale = require('./sale');
const Product = require('./product');
const SaleProduct = require('./saleProduct');

Sale.belongsToMany(Product, { through: SaleProduct, foreignKey: 'saleId' });
Product.belongsToMany(Sale, { through: SaleProduct, foreignKey: 'productId' });

SaleProduct.belongsTo(Sale, { foreignKey: 'saleId' });
SaleProduct.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  Sale,
  Product,
  SaleProduct
};