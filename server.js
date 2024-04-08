const express = require('express');
const sql = require('mssql');
const clientRoutes = require('./routes/clientRoutes');
const restaurantsRoutes = require('./routes/restaurantRoutes');
const menuRoutes = require('./routes/menuRoutes');
const articleRoutes = require('./routes/articleRoutes');
const livreurRoutes = require('./routes/livreurRoutes');
const commandesRoutes = require('./routes/commandeRoutes');
const commercialRoutes = require('./routes/commercialRoutes');
const { authenticate, authorizeCommercial, authorizeLivreur, authorizeClient, authorizeRestaurant } = require('./middlewares');
const cors = require('cors');
// Générer un secret pour les tokens JWT
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors()); 

// Configuration de la connexion à SQL Server
const config = {
  user: 'SA', // Remplace avec le nom d'utilisateur de ta base de données
  password: 'Mdpsecurise12.', // Remplace avec le mot de passe de ta base de données
  server: 'localhost', // Remplace avec l'adresse du serveur SQL
  port: 1433,
  database: 'Cesiveroo', // Remplace avec le nom de ta base de données
  encrypt : false // Désactive le cryptage
};

// Connexion à SQL Server
sql.connect(config, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to SQL Server');
  }
});

// Routes des clients
app.use('/api/clients', clientRoutes);
// Middleware d'authentification pour les clients
app.use('/api/clients', authenticate);
// Middleware d'autorisation pour les clients
app.use('/api/clients', authorizeClient);

// Routes des commerciaux
app.use('/api/commercial', commercialRoutes);
// Middleware d'authentification pour les commerciaux
app.use('/api/commercial', authenticate);
// Middleware d'autorisation pour les commerciaux
app.use('/api/commercial', authorizeCommercial);

// Routes des livreurs
app.use('/api/livreurs', livreurRoutes);
// Middleware d'authentification pour les livreurs
app.use('/api/livreurs', authenticate);
// Middleware d'autorisation pour les livreurs
app.use('/api/livreurs', authorizeLivreur);


// Routes des restaurants
app.use('/api/restaurants', restaurantsRoutes);
// Middleware d'authentification pour les restaurants
app.use('/api/restaurants', authenticate);
// Middleware d'autorisation pour les restaurants
app.use('/api/restaurants', authorizeRestaurant);

// Routes des menus
app.use('/api/menus', menuRoutes);
// Middleware d'autorisation pour les menu
app.use('/api/menus', authorizeRestaurant);

// Routes des articles
app.use('/api/articles', articleRoutes);
// Middleware d'autorisation pour les articles
app.use('/api/articles', authorizeRestaurant);

// Routes des livreurs
// app.use('/api/commandes', commandesRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

