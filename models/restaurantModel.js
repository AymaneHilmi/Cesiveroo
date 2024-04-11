const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

// Connexion à SQL Server
const config = {
  user: 'SA', // Nom d'utilisateur de la base de données
  password: 'Mdpsecurise12.', // Mot de passe de la base de données
  server: 'localhost', // Adresse du serveur SQL
  port: 1433, // Port de la base de données
  database: 'Cesiveroo', // Nom de la base de données
  encrypt: false, // Désactivation du cryptage, à adapter en fonction de vos besoins de sécurité
};
// Définition du modèle SQL
const Restaurant = {
  tableName: 'Restaurants',
  columns: ['RestaurantID', 'name', 'email', 'phone', 'streetNumber', 'streetName', 'city', 'postalCode', 'bankInfo', 'category', 'imgPath', 'hashedPassword'],
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

Restaurant.create = async (restaurantData) => {
  try {
    const hashedPassword = await bcrypt.hash(restaurantData.password, 10);
    const pool = await sql.connect(config);
    const request = pool.request();
    request.input('RestaurantID', sql.UniqueIdentifier, uuidv4());
    request.input('name', sql.NVarChar, restaurantData.name);
    request.input('email', sql.NVarChar, restaurantData.email);
    request.input('phone', sql.NVarChar, restaurantData.phone);
    request.input('streetNumber', sql.NVarChar, restaurantData.streetNumber);
    request.input('streetName', sql.NVarChar, restaurantData.streetName);
    request.input('city', sql.NVarChar, restaurantData.city);
    request.input('postalCode', sql.NVarChar, restaurantData.postalCode);
    request.input('bankInfo', sql.NVarChar, restaurantData.bankInfo);
    request.input('category', sql.NVarChar, restaurantData.category);
    request.input('hashedPassword', sql.NVarChar, hashedPassword);
    const query = `INSERT INTO ${Restaurant.tableName} VALUES (@RestaurantID, @name, @email, @phone, @streetNumber, @streetName, @city, @postalCode, @bankInfo, @category, '', @hashedPassword)`;
    await request.query(query);
  }
  catch (err) {
    throw new Error(err.message);
  }
}

// Fonction pour récupérer un client par son email depuis la base de données
Restaurant.getByEmail = async (email) => {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();
    request.input('email', sql.NVarChar, email);
    const query = `SELECT * FROM ${Restaurant.tableName} WHERE email = @email`;
    const result = await request.query(query);
    return result.recordset[0];
  } catch (err) {
    throw new Error(err.message);
  }
}

// Fonction pour vérifier le mot de passe d'un restaurant
Restaurant.checkPassword = async (email, password) => {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();
    request.input('email', sql.NVarChar, email);
    const query = `SELECT hashedPassword FROM ${Restaurant.tableName} WHERE email = @email`;
    const result = await request.query(query);
    return await bcrypt.compare(password, result.recordset[0].hashedPassword);
  } catch (err) {
    throw new Error(err.message);
  }
}

// Export du modèle
module.exports = Restaurant;
