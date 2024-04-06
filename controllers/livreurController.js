const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Livreur = require('../models/livreurModel'); // Assurez-vous d'avoir un modèle livreurModel adapté
const secret = 'YOUR_SECRET_KEY'; // Utilisez votre propre secret pour JWT

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
    const query = 'SELECT * FROM Livreurs';
    const livreurs = await executeQuery(query);
    res.status(200).json(livreurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un livreur par son ID
exports.getLivreurById = async (req, res) => {
  try {
    const query = `SELECT * FROM Livreurs WHERE LivreurID = '${req.params.id}'`;
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

    // Vérifiez d'abord si un livreur avec le même email existe déjà
    const emailCheckQuery = `SELECT * FROM Livreurs WHERE email = '${email}'`;
    const existingEmail = await executeQuery(emailCheckQuery);

    if (existingEmail.length > 0) {
      // Si un livreur avec cet email existe déjà, retournez un message d'erreur
      return res.status(400).json({ message: "Email already exists. Please use a different email." });
    }

    // Si l'email n'est pas déjà pris, procédez à la création du livreur
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
    console.log(req.body)
    const livreur = await Livreur.getByEmail(email);
    console.log(livreur)
    if (!livreur) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, livreur.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    let role = 'livreur';
    const token = jwt.sign({ id: livreur.LivreurID, email: livreur.email, role }, secret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
