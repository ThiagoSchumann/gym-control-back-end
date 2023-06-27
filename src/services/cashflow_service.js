// src\services\cashflow_service.js
const Cashflow = require('../models/cashflow');

class CashflowService {
  async getBalance() {
    try {
      const lastCashflow = await Cashflow.findOne({
        order: [['createdAt', 'DESC']],
      });

      return lastCashflow ? lastCashflow.balance : 0;
    } catch (error) {
      console.error('Error getting cashflow balance:', error);
      throw new Error('Failed to get cashflow balance');
    }
  }
}

module.exports = CashflowService;
