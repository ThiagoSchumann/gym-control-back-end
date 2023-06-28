const express = require("express");
const SaleController = require("../controllers/sale_controller");

const router = express.Router();
const saleController = new SaleController();

router.post("/sales", saleController.createSale);
router.get("/sales/:saleId", saleController.getSale);
router.get("/sales", saleController.getAllSales);
router.put("/sales/:saleId", saleController.updateSale);
router.delete("/sales/:saleId", saleController.deleteSale);

module.exports = router;
