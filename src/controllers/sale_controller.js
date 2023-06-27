// src\controllers\sale_controller.js
const Sale = require('../models/sale');
const SaleProduct = require('../models/saleProduct');
const Product = require('../models/product');
const Cashflow = require('../models/cashflow');

class SaleController {
  async createSale(req, res) {
    try {
      const { totalAmount, paymentMethod, products } = req.body;

      const sale = await Sale.create({ totalAmount, paymentMethod });

      const cashflow = await Cashflow.create({
        amount: totalAmount,
        description: `Sale payment - Sale ID: ${sale.id}`,
        type: 'income',
        balance: 0,
      });

      sale.cashflowId = cashflow.id;
      await sale.save();

      for (const productData of products) {
        await SaleProduct.create({ saleId: sale.id, productId: productData.id, priceAtSale: productData.price, quantity: productData.quantity });
      }

      return res.status(201).json(sale);
    } catch (error) {
      console.error('Error creating sale:', error);
      return res.status(500).json({ error: 'Failed to create sale' });
    }
  }

  // Restante das funções do controller
  // ...
}

module.exports = SaleController;
