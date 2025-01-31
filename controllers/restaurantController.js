const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Restaurant = require('../models/restaurantModel');

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
    const { name, email, phone, streetNumber, streetName, city, postalCode, bankInfo, password } = req.body;

    // Générer un identifiant unique pour le restaurant
    const restaurantId = uuidv4();

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Exécuter la requête SQL pour insérer le nouveau restaurant
    const query = `
      INSERT INTO Restaurants (RestaurantID, name, email, phone, streetNumber, streetName, city, postalCode, bankInfo, hashedPassword) 
      VALUES ('${restaurantId}', '${name}', '${email}', '${phone}', '${streetNumber}', '${streetName}', '${city}', '${postalCode}', '${bankInfo}', '${hashedPassword}')`;
    await executeQuery(query);

    // Répondre avec les détails du restaurant créé (sans inclure le mot de passe)
    res.status(201).json({ id: restaurantId, name, email, phone, address: { streetNumber, streetName, city, postalCode, bankInfo } });
  } catch (err) {
    res.status(400).json({ message: err.message });
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
    const restaurant = await executeQuery(query);
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (err) {
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
    const isPasswordValid = await bcrypt.compare(password, restaurant.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Générer un token JWT
    const token = jwt.sign({ email: restaurant.email, id: restaurant
          .RestaurantID }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};