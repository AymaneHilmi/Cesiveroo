const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Livreur = require('../models/livreurModel'); // Assurez-vous d'avoir un modèle livreurModel adapté
const secret = require('../secret');

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

// Récupérer tous les livreurs
exports.getAllLivreurs = async (req, res) => {
  try {
    // Exclure le mot de passe de la requête
    const query = 'SELECT LivreurID, name, email, phone, streetNumber, streetName, city, postalCode, bankInfo FROM Livreurs';
    const livreurs = await executeQuery(query);
    res.status(200).json(livreurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un livreur par son ID
exports.getLivreurById = async (req, res) => {
  try {
    // Exclure le mot de passe de la requête
    const query = `SELECT LivreurID, name, email, phone, streetNumber, streetName, city, postalCode, bankInfo FROM Livreurs WHERE LivreurID = '${req.params.id}'`;
    const livreur = await executeQuery(query);
    if (!livreur[0]) {
      return res.status(404).json({ message: 'Livreur not found' });
    }
    res.status(200).json(livreur[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Inscription d'un nouveau livreur
exports.createLivreur = async (req, res) => {
  try {
    const { name, email, phone, streetNumber, streetName, city, postalCode, bankInfo, password } = req.body;

    // Vérifier si un livreur avec le même email existe déjà
    const existingLivreur = await Livreur.getByEmail(email);
    if (existingLivreur) {
      return res.status(400).json({ message: 'Livreur already exists' });
    }

    const livreurId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO Livreurs (LivreurID, name, email, phone, streetNumber, streetName, city, postalCode, bankInfo, hashedPassword) 
      VALUES ('${livreurId}', '${name}', '${email}', '${phone}', '${streetNumber}', '${streetName}', '${city}', '${postalCode}', '${bankInfo}', '${hashedPassword}')`;
    await executeQuery(query);
    res.status(201).json({ id: livreurId, name, email, phone, address: { streetNumber, streetName, city, postalCode }, bankInfo });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Mettre à jour un livreur
exports.updateLivreur = async (req, res) => {
  try {
    const { name, email, phone, streetNumber, streetName, city, postalCode, bankInfo } = req.body;
    // Vérifier si le LivreurID est le même que celui du token
    if (req.client.id !== req.params.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const query = `
      UPDATE Livreurs
      SET name = '${name}', email = '${email}', phone = '${phone}', 
          streetNumber = '${streetNumber}', streetName = '${streetName}', city = '${city}', postalCode = '${postalCode}', bankInfo = '${bankInfo}'
      WHERE LivreurID = '${req.params.id}'`;
    await executeQuery(query);
    res.status(200).json({ id: req.params.id, name, email, phone, address: { streetNumber, streetName, city, postalCode }, bankInfo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un livreur
exports.deleteLivreur = async (req, res) => {
  try {
    // Vérifier si le LivreurID est le même que celui du token
    if (req.client.id !== req.params.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const query = `DELETE FROM Livreurs WHERE LivreurID = '${req.params.id}'`;
    const result = await executeQuery(query);
    res.status(200).json({ message: 'Livreur deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Connexion d'un livreur
exports.loginLivreur = async (req, res) => {
  try {
    const { email, password } = req.body;
    const livreur = await Livreur.getByEmail(email);
    if (!livreur) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await Livreur.checkPassword(email, password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Déterminer le rôle du livreur
    let role = 'livreur';
    // Générer un token JWT avec le rôle du livreur
    const token = jwt.sign({ id: livreur.LivreurID, email: livreur.email, role }, secret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fonction pour vérifier un token JWT et récupérer les détails du client à partir du token
exports.verifyToken = async (req, res) => {
  try {
    const role = req.role;
    // Récuperer le mail à partir du middleware
    const decoded = req.client;
    // Récupérer les détails du client à partir de la base de données
    const client = await Livreur.getByEmail(decoded.email);
    // Enlever le mot de passe du client
    delete client.hashedPassword;
    res.status(200).json({ ...client, role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};