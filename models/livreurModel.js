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

// Définition du modèle SQL pour Livreur
const Livreur = {
  tableName: 'Livreurs',
  columns: ['LivreurID', 'name', 'email', 'phone', 'streetNumber', 'streetName', 'city', 'postalCode', 'bankInfo', 'hashedPassword'],
};

// // Fonction pour insérer un livreur dans la base de données
// Livreur.create = async (livreurData) => {
//   try {
//     const hashedPassword = await bcrypt.hash(livreurData.password, 10);
//     const livreurId = uuidv4();
//     const { name, email, phone, address, bankInfo } = livreurData;
//     const pool = await sql.connect(config);
//     const request = pool.request();
//     await request.input('LivreurId', sql.UniqueIdentifier, livreurId);
//     await request.input('name', sql.NVarChar, name);
//     await request.input('email', sql.NVarChar, email);
//     await request.input('phone', sql.NVarChar, phone);
//     await request.input('streetNumber', sql.NVarChar, address.streetNumber);
//     await request.input('streetName', sql.NVarChar, address.streetName);
//     await request.input('city', sql.NVarChar, address.city);
//     await request.input('postalCode', sql.NVarChar, address.postalCode);
//     await request.input('bankInfo', sql.NVarChar, bankInfo);
//     await request.input('hashedPassword', sql.NVarChar, hashedPassword);
//     const query = `INSERT INTO ${Livreur.tableName} (LivreurID, name, email, phone, streetNumber, streetName, city, postalCode, bankInfo, hashedPassword)
//                    VALUES (@LivreurId, @name, @email, @phone, @streetNumber, @streetName, @city, @postalCode, @bankInfo, @hashedPassword)`;
//     await request.query(query);
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

// Fonction pour récupérer un livreur par son email depuis la base de données
Livreur.getByEmail = async (email) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().input('email', sql.NVarChar, email).query(`SELECT * FROM ${Livreur.tableName} WHERE email = @email`);
    return result.recordset[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

// Fonction pour vérifier le mot de passe d'un livreur
Livreur.verifyPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    throw new Error(err.message);
  }
};

// Export du modèle
module.exports = Livreur;
