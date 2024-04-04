const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../models/clientModel');

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

// Récupérer tous les clients
exports.getAllClients = async (req, res) => {
  try {
    const query = 'SELECT * FROM Clients';
    const clients = await executeQuery(query);
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un client par son ID
exports.getClientById = async (req, res) => {
  try {
    const query = `SELECT * FROM Clients WHERE ClientID = '${req.params.id}'`;
    const client = await executeQuery(query);
    if (!client[0]) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(client[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un nouveau client avec UUID
exports.createClient = async (req, res) => {
  try {
    const { name, email, phone, streetNumber, streetName, city, postalCode, password } = req.body;
    
    // Générer un identifiant unique pour le client
    const clientId = uuidv4();
    
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Exécuter la requête SQL pour insérer le nouveau client
    const query = `
      INSERT INTO Clients (ClientID, name, email, phone, streetNumber, streetName, city, postalCode, hashedPassword) 
      VALUES ('${clientId}', '${name}', '${email}', '${phone}', '${streetNumber}', '${streetName}', '${city}', '${postalCode}', '${hashedPassword}')`;
    await executeQuery(query);

    // Répondre avec les détails du client créé (sans inclure le mot de passe)
    res.status(201).json({ id: clientId, name, email, phone, address: { streetNumber, streetName, city, postalCode } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mettre à jour un client
exports.updateClient = async (req, res) => {
  try {
    const { name, email, phone, streetNumber, streetName, city, postalCode } = req.body;
    const query = `
      UPDATE Clients
      SET name = '${name}', email = '${email}', phone = '${phone}', 
          streetNumber = '${streetNumber}', streetName = '${streetName}', city = '${city}', postalCode = '${postalCode}' 
      WHERE ClientID = ${req.params.id}`;
    await executeQuery(query);
    res.status(200).json({ id: req.params.id, name, email, phone, address: { streetNumber, streetName, city, postalCode } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un client
exports.deleteClient = async (req, res) => {
  try {
    // The ID of the client to delete is passed in the URL but it's an UUID with special characters
    // So we need to wrap it in single quotes to make it a string
    const query = `DELETE FROM Clients WHERE ClientID = '${req.params.id}'`;
    await executeQuery(query);
    if (!client[0]) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Connexion d'un client
exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;
      
      // Recherchez l'utilisateur dans la base de données en utilisant l'email
      const client = await Client.getByEmail(email);
      if (!client) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }
      // Vérifiez si le mot de passe est correct
      const isPasswordValid = await bcrypt.compare(password, client.hashedPassword);
      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }
      // Générer un token JWT
      const token = jwt.sign({ email: client.email, id: client
          .ClientID }, 'secret', { expiresIn: '1h' });
      res.status(200).json({ token });

  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
// Path: models/clientModel.js