// src\controllers\cashflow_controller.js
const Cashflow = require('../models/cashflow');

class CashflowController {
    async createCashflow(req, res) {
        try {
            const { amount, description, type } = req.body;

            const lastCashflow = await Cashflow.findOne({
                order: [['createdAt', 'DESC']],
            });

            const balance = lastCashflow
                ? lastCashflow.balance + (type === 'income' ? amount : -amount)
                : 0;

            const cashflow = await Cashflow.create({ amount, description, type, balance });

            return res.status(201).json(cashflow);
        } catch (error) {
            console.error('Error creating cashflow:', error);
            return res.status(500).json({ error: 'Failed to create cashflow' });
        }
    }

    async getAllCashflows(req, res) {
        try {
            const cashflows = await Cashflow.findAll();

            return res.json(cashflows);
        } catch (error) {
            console.error('Error getting cashflows:', error);
            return res.status(500).json({ error: 'Failed to get cashflows' });
        }
    }

    async getCashflowById(req, res) {
        try {
            const { id } = req.params;

            const cashflow = await Cashflow.findByPk(id);

            if (!cashflow) {
                return res.status(404).json({ error: 'Cashflow not found' });
            }

            return res.json(cashflow);
        } catch (error) {
            console.error('Error getting cashflow by ID:', error);
            return res.status(500).json({ error: 'Failed to get cashflow' });
        }
    }

    async updateCashflow(req, res) {
        try {
            const { id } = req.params;
            const { amount, description, type } = req.body;

            const cashflow = await Cashflow.findByPk(id);

            if (!cashflow) {
                return res.status(404).json({ error: 'Cashflow not found' });
            }

            cashflow.amount = amount;
            cashflow.description = description;
            cashflow.type = type;

            await cashflow.save();

            return res.json(cashflow);
        } catch (error) {
            console.error('Error updating cashflow:', error);
            return res.status(500).json({ error: 'Failed to update cashflow' });
        }
    }

    async deleteCashflow(req, res) {
        try {
            const { id } = req.params;

            const cashflow = await Cashflow.findByPk(id);

            if (!cashflow) {
                return res.status(404).json({ error: 'Cashflow not found' });
            }

            await cashflow.destroy();

            return res.json({ message: 'Cashflow deleted successfully' });
        } catch (error) {
            console.error('Error deleting cashflow:', error);
            return res.status(500).json({ error: 'Failed to delete cashflow' });
        }
    }
}

module.exports = CashflowController;
