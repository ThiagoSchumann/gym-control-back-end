const Sale = require("../models/sale");
const SaleProduct = require("../models/saleProduct");
const Product = require("../models/product");
const Cashflow = require("../models/cashflow");

class SaleController {
  async createSale(req, res) {
    try {
      const { paymentMethod, products } = req.body;

      const sale = await Sale.create({
        totalAmount: 0,
        paymentMethod,
        products,
      });

      // Encontrar o último registro de cashflow
      const lastCashflow = await Cashflow.findOne({
        order: [["createdAt", "DESC"]],
      });

      const cashflow = await Cashflow.create({
        amount: 0,
        description: `Sale payment - Sale ID: ${sale.id}`,
        type: "income",
        balance: 0,
      });

      sale.cashflowId = cashflow.id;
      await sale.save();

      let sum = 0;

      for (const productData of products) {
        await SaleProduct.create({
          saleId: sale.id,
          productId: productData.id,
          priceAtSale: productData.price,
          quantity: productData.quantity,
        });
        sum += productData.price * productData.quantity;
      }

      sale.totalAmount = sum;
      await sale.save();

      cashflow.amount = sale.totalAmount;

      if (lastCashflow) {
        cashflow.balance = lastCashflow.balance + cashflow.amount;
      } else {
        cashflow.balance = cashflow.amount;
      }

      await cashflow.save();

      return res.status(201).json(sale);
    } catch (error) {
      console.error("Error creating sale:", error);
      return res.status(500).json({ error: "Failed to create sale" });
    }
  }

  async getSale(req, res) {
    try {
      const { saleId } = req.params;
      const sale = await Sale.findByPk(saleId, { include: [Product] });

      if (!sale) {
        return res.status(404).json({ error: "Sale not found" });
      }

      return res.json(sale);
    } catch (error) {
      console.error("Error getting sale:", error);
      return res.status(500).json({ error: "Failed to get sale" });
    }
  }

  async getAllSales(req, res) {
    try {
      const sales = await Sale.findAll({ include: [Product] });
      return res.json(sales);
    } catch (error) {
      console.error("Error getting sales:", error);
      return res.status(500).json({ error: "Failed to get sales" });
    }
  }

  async updateSale(req, res) {
    try {
      const { saleId } = req.params;
      const { paymentMethod, products } = req.body;

      const sale = await Sale.findByPk(saleId);

      if (!sale) {
        return res.status(404).json({ error: "Sale not found" });
      }

      // Update sale properties
      sale.paymentMethod = paymentMethod;
      sale.products = products;

      await sale.save();

      return res.json(sale);
    } catch (error) {
      console.error("Error updating sale:", error);
      return res.status(500).json({ error: "Failed to update sale" });
    }
  }

  async deleteSale(req, res) {
    try {
      const { saleId } = req.params;

      const sale = await Sale.findByPk(saleId);

      if (!sale) {
        return res.status(404).json({ error: "Sale not found" });
      }

      await sale.destroy();

      return res.json({ message: "Sale deleted successfully" });
    } catch (error) {
      console.error("Error deleting sale:", error);
      return res.status(500).json({ error: "Failed to delete sale" });
    }
  }
}

module.exports = SaleController;
