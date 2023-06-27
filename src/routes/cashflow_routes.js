const express = require('express');
const CashflowController = require('../controllers/cashflow_controller');

const router = express.Router();
const cashflowController = new CashflowController();

router.post('/cashflows', cashflowController.createCashflow);
router.get('/cashflows', cashflowController.getAllCashflows);
router.get('/cashflows/:id', cashflowController.getCashflowById);
router.put('/cashflows/:id', cashflowController.updateCashflow);
router.delete('/cashflows/:id', cashflowController.deleteCashflow);

module.exports = router;
