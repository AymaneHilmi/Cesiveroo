const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret');

// Connexion à SQL Server
const config = {
  user: 'SA', // Nom d'utilisateur de la base de données
  password: 'Mdpsecurise12.', // Mot de passe de la base de données
  server: 'localhost', // Adresse du serveur SQL
  port: 1433, // Port de la base de données
  database: 'Cesiveroo', // Nom de la base de données
  encrypt: false, // Désactivation du cryptage
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

// Fonction pour récupérer tous les clients
exports.getAllClients = async (req, res) => {
  try {
    const query = 'SELECT * FROM Clients';
    const clients = await executeQuery(query);
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fonction pour suspendre un compte client
exports.suspendClient = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `UPDATE Clients SET status = 'suspended' WHERE ClientID = '${id}'`;
    await executeQuery(query);
    res.status(200).json({ message: 'Client suspended successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fonction pour modifier un compte client
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    // Récupérer les données du client à partir du corps de la requête
    const { name, email, phone, streetNumber, streetName, city, postalCode } = req.body;
    const query = `
      UPDATE Clients
      SET name = '${name}', email = '${email}', phone = '${phone}', 
          streetNumber = '${streetNumber}', streetName = '${streetName}', city = '${city}', postalCode = '${postalCode}' 
      WHERE ClientID = '${id}'`;
    await executeQuery(query);
    res.status(200).json({ message: 'Client updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fonction pour supprimer un compte client
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM Clients WHERE ClientID = '${id}'`;
    await executeQuery(query);
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fonction pour afficher les tableaux de bord de suivi des processus de commande
exports.getDashboard = async (req, res) => {
  try {
    // Votre logique pour récupérer les données de tableau de bord
    // ...
    // Exemple de réponse
    res.status(200).json({ message: 'Dashboard data retrieved successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
