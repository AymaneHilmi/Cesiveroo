const express = require('express');
const sql = require('mssql');
const clientRoutes = require('./routes/clientRoutes');
const restaurantsRoutes = require('./routes/restaurantRoutes');
const commercialRoutes = require('./routes/commercialRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Configuration de la connexion à SQL Server
const config = {
  user: 'SA', // Remplace avec le nom d'utilisateur de ta base de données
  password: 'Mdpsecurise12.', // Remplace avec le mot de passe de ta base de données
  server: 'localhost', // Remplace avec l'adresse du serveur SQL
  port : 1433,
  database: 'Cesiveroo', // Remplace avec le nom de ta base de données
  options: {
    encrypt: false,
  },
};

// Connexion à SQL Server
sql.connect(config)
  .then(() => {
    console.log('Connected to SQL Server');
  })
  .catch((err) => {
    console.error('Error connecting to SQL Server:', err);
  });

// Routes des clients
app.use('/api/clients', clientRoutes);
app.use('/api/commercial', commercialRoutes);

// Routes des restaurants
app.use('/api/restaurants', restaurantsRoutes);

// Routes des articles
app.use('/api/articles', articleRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
