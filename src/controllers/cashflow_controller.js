// src\controllers\cashflow_controller.js
const Cashflow = require("../models/cashflow");

class CashflowController {
  async createCashflow(req, res) {
    try {
      // Extrair os dados do corpo da solicitação
      const { amount, description, type } = req.body;

      // Encontrar o último registro de cashflow
      const lastCashflow = await Cashflow.findOne({
        order: [["createdAt", "DESC"]],
      });

      // Calcular o saldo atual com base no último registro de cashflow e no tipo de transação
      let balance = 0;
      if (lastCashflow) {
        // Se existir um último registro de cashflow, atualizar o saldo de acordo com o tipo de transação
        balance = lastCashflow.balance;
        if (type === "income") {
          balance += amount;
        } else {
          balance -= amount;
        }
      }

      // Criar um novo registro de cashflow com os dados fornecidos e o saldo calculado
      const cashflow = await Cashflow.create({
        amount,
        description,
        type,
        balance,
      });

      // Retornar a resposta com o novo registro de cashflow
      return res.status(201).json(cashflow);
    } catch (error) {
      // Lidar com erros e retornar uma resposta de erro
      console.error("Error creating cashflow:", error);
      return res.status(500).json({ error: "Failed to create cashflow" });
    }
  }

  async getAllCashflows(req, res) {
    try {
      const cashflows = await Cashflow.findAll();

      return res.json(cashflows);
    } catch (error) {
      console.error("Error getting cashflows:", error);
      return res.status(500).json({ error: "Failed to get cashflows" });
    }
  }

  async getCashflowById(req, res) {
    try {
      const { id } = req.params;

      const cashflow = await Cashflow.findByPk(id);

      if (!cashflow) {
        return res.status(404).json({ error: "Cashflow not found" });
      }

      return res.json(cashflow);
    } catch (error) {
      console.error("Error getting cashflow by ID:", error);
      return res.status(500).json({ error: "Failed to get cashflow" });
    }
  }

  async updateCashflow(req, res) {
    try {
      const { id } = req.params;
      const { amount, description, type } = req.body;

      const cashflow = await Cashflow.findByPk(id);

      if (!cashflow) {
        return res.status(404).json({ error: "Cashflow not found" });
      }

      cashflow.amount = amount;
      cashflow.description = description;
      cashflow.type = type;

      await cashflow.save();

      return res.json(cashflow);
    } catch (error) {
      console.error("Error updating cashflow:", error);
      return res.status(500).json({ error: "Failed to update cashflow" });
    }
  }

  async deleteCashflow(req, res) {
    try {
      const { id } = req.params;

      const cashflow = await Cashflow.findByPk(id);

      if (!cashflow) {
        return res.status(404).json({ error: "Cashflow not found" });
      }

      await cashflow.destroy();

      return res.json({ message: "Cashflow deleted successfully" });
    } catch (error) {
      console.error("Error deleting cashflow:", error);
      return res.status(500).json({ error: "Failed to delete cashflow" });
    }
  }
}

module.exports = CashflowController;
