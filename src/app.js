const express = require('express');
const app = express();
const userRoutes = require('./routes/user_routes');
const sequelize = require('./config/database');
const User = require('./models/user');

// Configuração do body parser para trabalhar com JSON
app.use(express.json());

// Configuração das rotas
app.use(userRoutes);

// Sincronizar os modelos com o banco de dados
sequelize
  .sync()
  .then(() => {
    // Iniciar o servidor após a sincronização
    const port = 3000;
    app.listen(port, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Failed to sync models:', error);
  });
