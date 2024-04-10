const sql = require('mssql');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

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
const Client = {
  tableName: 'Clients',
  columns: ['ClientID', 'name', 'email', 'phone', 'streetNumber', 'streetName', 'city', 'postalCode', 'hashedPassword', 'status'],
};

// Fonction pour insérer un client dans la base de données
Client.create = async (clientData) => {
  try {
    const hashedPassword = await bcrypt.hash(clientData.password, 10);
    const clientId = uuidv4();
    const { name, email, phone, address, status } = clientData;
    const pool = await sql.connect(config);
    const request = pool.request();
    await request.input('ClientId', sql.UniqueIdentifier, clientId);
    await request.input('name', sql.NVarChar, name);
    await request.input('email', sql.NVarChar, email);
    await request.input('phone', sql.NVarChar, phone);
    await request.input('streetNumber', sql.NVarChar, address.streetNumber);
    await request.input('streetName', sql.NVarChar, address.streetName);
    await request.input('city', sql.NVarChar, address.city);
    await request.input('postalCode', sql.NVarChar, address.postalCode);
    await request.input('hashedPassword', sql.NVarChar, hashedPassword);
    await request.input('imgPath', sql.NVarChar, status);
    await request.input('status', sql.NVarChar, status);
    const query = `INSERT INTO ${Client.tableName} (ClientID, name, email, phone, streetNumber, streetName, city, postalCode, hashedPassword,imgPath, status) 
                   VALUES (@clientId, @name, @email, @phone, @streetNumber, @streetName, @city, @postalCode, @hashedPassword,@imgPath, @status)`;
    await request.query(query);
  } catch (err) {
    throw new Error('Erreur lors de la création du client : ' + err.message);
  }
};

// Fonction pour récupérer un client par son email depuis la base de données
Client.getByEmail = async (email) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().input('email', sql.NVarChar, email).query(`SELECT * FROM ${Client.tableName} WHERE email = @email`);
    return result.recordset[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

// fonction pour récupérer un client par son ID depuis la base de données
Client.getById = async (id) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().input('id', sql.NVarChar, id).query(`SELECT * FROM ${Client.tableName} WHERE ClientID = @id`);
    return result.recordset[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

// Fonction pour vérifier le mot de passe d'un client
Client.verifyPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    throw new Error(err.message);
  }
};

// Export du modèle
module.exports = Client;