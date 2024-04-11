const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Restaurant = require('../models/restaurantModel');
const secret = require('../secret');

// Connexion à SQL Server
const config = {
  user: 'SA', // Nom d'utilisateur de la base de données
  password: 'Mdpsecurise12.', // Mot de passe de la base de données
  server: 'localhost', // Adresse du serveur SQL
  port: 1433, // Port de la base de données
  database: 'Cesiveroo', // Nom de la base de données
  encrypt: false, // Désactivation du cryptage, à adapter en fonction de vos besoins de sécurité
};

// Fonction pour exécuter les requêtes SQL
async function executeQuery(query) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Récupérer tous les restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const query = 'SELECT * FROM Restaurants';
    const restaurants = await executeQuery(query);
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un restaurant par son ID
exports.getRestaurantById = async (req, res) => {
  try {
    const query = `SELECT * FROM Restaurants WHERE RestaurantID = '${req.params.id}'`;
    const restaurant = await executeQuery(query);
    if (!restaurant[0]) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un nouveau restaurant avec UUID
exports.createRestaurant = async (req, res) => {
  try {
    const { name, email, phone, streetNumber, streetName, city, postalCode, bankInfo, category, password } = req.body;
    // Vérifier si le restaurant existe déjà
    const restaurant = await Restaurant.getByEmail(email);
    if (restaurant) {
      return res.status(409).json({ message: 'Restaurant already exists' });
    }
    // Créer un nouveau restaurant
    await Restaurant.create({ name, email, phone, streetNumber, streetName, city, postalCode, bankInfo, category, password });
    res.status(201).json({ name, email, phone, address: { streetNumber, streetName, city, postalCode }, category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Mettre à jour un restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const { name, email, phone, streetNumber, streetName, city, postalCode, bankInfo } = req.body;
    const query = `
      UPDATE Restaurants
      SET name = '${name}', email = '${email}', phone = '${phone}',
          streetNumber = '${streetNumber}', streetName = '${streetName}', city = '${city}', postalCode = '${postalCode}', bankInfo = '${bankInfo}'
      WHERE RestaurantID = '${req.params.id}'`;
    await executeQuery(query);
    res.status(200).json({ id: req.params.id, name, email, phone, address: { streetNumber, streetName, city, postalCode } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    const query = `DELETE FROM Restaurants WHERE RestaurantID = '${req.params.id}'`;
    await executeQuery(query);
    res.status(200).json({ message: 'Restaurant deleted successfully, id: ' + req.params.id });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Connexion d'un restaurant
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Recherchez l'utilisateur dans la base de données en utilisant l'email
    const restaurant = await Restaurant.getByEmail(email);
    if (!restaurant) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Vérifiez si le mot de passe est correct
    const validPassword = await Restaurant.checkPassword(email, password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    let role = 'restaurant';
    // Générer un token JWT
    const token = jwt.sign({
      email: restaurant.email, id: restaurant
        .RestaurantID, role: role
    }, secret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un restaurant par son ID
exports.getRestaurantInfo = async (req, res) => {
  try {
    const query = `SELECT name, phone, streetNumber, streetName, city, postalCode, category, imgPath FROM Restaurants WHERE RestaurantID = '${req.params.id}'`;
    const restaurant = await executeQuery(query);
    if (!restaurant[0]) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}