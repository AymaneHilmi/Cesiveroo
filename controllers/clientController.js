const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../models/clientModel');
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

// Inscription d'un nouveau client
exports.createClient = async (req, res) => {
  try {
    const { name, email, phone, streetNumber, streetName, city, postalCode, password } = req.body;
    const status = 'active';
    // Vérifier si l'email existe déjà
    const emailCheckQuery = `SELECT email FROM Clients WHERE email = '${email}'`;
    const emailCheckResult = await executeQuery(emailCheckQuery);

    if (emailCheckResult.length > 0) {
      // Si l'email existe déjà, envoyer une réponse indiquant que l'email est déjà utilisé
      return res.status(400).json({ message: "Email already exist" });
    }

    // Générer un identifiant unique pour le client
    const clientId = uuidv4();

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Exécuter la requête SQL pour insérer le nouveau client
    const query = `
      INSERT INTO Clients (ClientID, name, email, phone, streetNumber, streetName, city, postalCode, hashedPassword, status) 
      VALUES ('${clientId}', '${name}', '${email}', '${phone}', '${streetNumber}', '${streetName}', '${city}', '${postalCode}', '${hashedPassword}', '${status}')`;
    await executeQuery(query);
    // Répondre avec les détails du client créé
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
      WHERE ClientID = '${req.params.id}'`;
    await executeQuery(query);
    res.status(200).json({ id: req.params.id, name, email, phone, address: { streetNumber, streetName, city, postalCode } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un client
exports.deleteClient = async (req, res) => {
  try {
    const query = `DELETE FROM Clients WHERE ClientID = '${req.params.id}'`;
    // Exécuter la requête SQL pour supprimer le client
    const result = await executeQuery(query);
    // Vérifier si un client a été supprimé (result.rowCount > 0)
    if (!result) {
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
    // Rechercher le client dans la base de données en utilisant l'email
    const client = await Client.getByEmail(email);
    if (!client) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Vérifier si le mot de passe est correct
    const isPasswordValid = await bcrypt.compare(password, client.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (client.status === 'inactive') {
      return res.status(403).json({ message: 'Account is inactive' });
    }
    // Déterminer le rôle du client
    let role = 'client';
    // Générer un token JWT avec le rôle du client
    const token = jwt.sign({ id: client.ClientID, email: client.email, role }, secret, { expiresIn: '1h' });
    res.status(200).json({ token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Path: models/clientModel.js