// src\routes\sale_routes.js
const express = require('express');
const SaleController = require('../controllers/sale_controller');

const router = express.Router();
const saleController = new SaleController();

router.post('/sales', saleController.createSale);
// Adicione outras rotas relacionadas às vendas, se necessário

module.exports = router;
