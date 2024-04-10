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

Restaurant.create = async (restaurantData) => {
  try {
    const hashedPassword = await bcrypt.hash(restaurantData.password, 10);
    const restaurantId = uuidv4();
    const { name, email, phone, address, bankInfo } = restaurantData;
    const pool = await sql.connect(config);
    const request = pool.request();
    await request.input('RestaurantID', sql.UniqueIdentifier, restaurantId);
    await request.input('name', sql.NVarChar, name);
    await request.input('email', sql.NVarChar, email);
    await request.input('phone', sql.NVarChar, phone);
    await request.input('streetNumber', sql.NVarChar, address.streetNumber);
    await request.input('streetName', sql.NVarChar, address.streetName);
    await request.input('city', sql.NVarChar, address.city);
    await request.input('postalCode', sql.NVarChar, address.postalCode);
    await request.input('bankInfo', sql.NVarChar, bankInfo);
    await request.input('category', sql.NVarChar, restaurantData.category);
    await request.input('imgPath', sql.NVarChar, restaurantData.imgPath);
    await request.input('hashedPassword', sql.NVarChar, hashedPassword);
    const query = `INSERT INTO ${Restaurant.tableName} (RestaurantID, name, email, phone, streetNumber, streetName, city, postalCode, bankInfo, category, imgPath, hashedPassword)
                   VALUES (@RestaurantID, @name, @email, @phone, @streetNumber, @streetName, @city, @postalCode, @bankInfo, @category, @imgPath, @hashedPassword)`;
    await request.query(query);
  } catch (err) {
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
