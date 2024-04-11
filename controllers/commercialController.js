const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret');
const Commercial = require('../models/commercialModel');

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
// Fonction pour connecter un commercial
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = `SELECT * FROM ServiceCommercial WHERE email = '${email}'`;
    const commercial = await Commercial.getByEmail(email);
    if (!commercial) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, commercial.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    let role = 'commercial';
    const token = jwt.sign({ id: commercial.CommercialID, email: commercial.email, role }, secret, { expiresIn: '1h' });
    res.status(200).json({ token });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Fonction pour inscrire un commercial
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO ServiceCommercial (CommercialID, name, email, hashedPassword) VALUES ('${id}', '${name}', '${email}', '${hashedPassword}')`;
    await executeQuery(query);
    res.status(201).json({ message: 'Commercial registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fonction pour vérifier un token JWT et récupérer les détails du client à partir du token
exports.verifyToken = async (req, res) => {
  try {
    const role = req.role;
    console.log(req.client)
    // Récuperer le mail à partir du middleware
    const decoded = req.client;
    // Récupérer les détails du client à partir de la base de données
    const client = await Commercial.getByEmail(decoded.email);
    // Enlever le mot de passe du client
    delete client.hashedPassword;
    res.status(200).json({ ...client, role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};