// src\app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/user_routes');
const gymRoutes = require('./routes/gym_routes');
const professionalRoutes = require('./routes/professional_routes');
const activityRoutes = require('./routes/activity_routes');
const equipmentRoutes = require('./routes/equipment_routes');
const studentRoutes = require('./routes/student_routes');
const cashflowRoutes = require('./routes/cashflow_routes');
const saleRoutes = require('./routes/sale_routes');
const productRoutes = require('./routes/product_routes');
const sequelize = require('./config/database');

const { Sale, Product, SaleProduct } = require('./models/associations'); 



// Configuração do body parser para trabalhar com JSON
app.use(express.json());

// Configuração das rotas
app.use(userRoutes);
app.use(gymRoutes);
app.use(professionalRoutes);
app.use(activityRoutes);
app.use(equipmentRoutes);
app.use(studentRoutes);
app.use(cashflowRoutes);
app.use(saleRoutes);
app.use(productRoutes);

// Sincronizar os modelos com o banco de dados
async function synchronizeModels() {
  await Sale.sync();
  await Product.sync();
  await SaleProduct.sync();
  // sync other models...
}

synchronizeModels()
  .then(() => {
    // Iniciar o servidor após a sincronização
    const port = 3000;
    app.listen(port, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Failed to sync models:', error);
  });