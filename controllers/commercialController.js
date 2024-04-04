const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Commercial = require('../models/commercialModel');

// Connexion à SQL Server
const config
    = {
        user : 'SA', // Nom d'utilisateur de la base de données
        password : 'Mdpsecurise12.', // Mot de passe de la base de données
        server : 'localhost', // Adresse du serveur SQL
        port : 1433, // Port de la base de données
        database : 'Cesiveroo', // Nom de la base de données
        encrypt : false, // Désactivation du cryptage, à adapter en fonction de vos besoins de sécurité
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

// Récuperer tous les clients à partir de la base de données
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
      const query = `SELECT * FROM Clients WHERE ClientID = ${req.params.id}`;
      const client = await executeQuery(query);
      if (!client[0]) {
        return res.status(404).json({ message: 'Client not found' });
      }
      res.status(200).json(client[0]);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Mettre à jour un client
exports.updateClient = async (req, res) => {
    try {
        const { name, email, phone, streetNumber, streetName, city, postalCode } = req.body;
        const query = `UPDATE Clients SET Name = '${name}', Email = '${email}', Phone = '${phone}', StreetNumber = '${streetNumber}', StreetName = '${streetName}', City = '${city}', PostalCode = '${postalCode}' WHERE ClientID = ${req.params.id}`;
        await executeQuery(query);
        res.status(200).json({ message: 'Client updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Supprimer un client

exports.deleteClient = async (req, res) => {
    try {
        const query = `DELETE FROM Clients WHERE ClientID = ${req.params.id}`;
        await executeQuery(query);
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Se connecter
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const query = `SELECT * FROM Clients WHERE Email = '${email}'`;
        const client = await executeQuery(query);
        if (!client[0]) {
            return res.status(404).json({ message: 'Client not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, client[0].HashedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: client[0].ClientID }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Path: routes/commercialRoutes.js