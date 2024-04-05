const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Article = require('../models/articleModel');

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

// Récupérer tous les articles
exports.getAllArticles = async (req, res) => {
  try {
    const query = 'SELECT * FROM Articles';
    const articles = await executeQuery(query);
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un article par son ID
exports.getArticleById = async (req, res) => {
  try {
    const query = `SELECT * FROM Articles WHERE ArticleID = '${req.params.id}'`;
    const article = await executeQuery(query);
    if (!article[0]) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un nouveau article
exports.createArticle = async (req, res) => {
  try {
    const { restaurantId, name, ingredients, price } = req.body;

    // Exécuter la requête SQL pour insérer le nouveau article sans spécifier ArticleID
    const query = `
      INSERT INTO Articles (restaurantId, name, ingredients, price) 
      VALUES ('${restaurantId}', '${name}', '${ingredients}', '${price}')`;
    const result = await executeQuery(query);

    res.status(201).json({ id: restaurantId, name, ingredients, price });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mettre à jour un article
exports.updateArticle = async (req, res) => {
  try {
    const { name, ingredients, price } = req.body;
    const query = `
      UPDATE Articles
      SET name = '${name}', ingredients = '${ingredients}', price = ${price}
      WHERE ArticleID = '${req.params.id}'`;
    await executeQuery(query);
    res.status(200).json({ name, ingredients, price });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un article
exports.deleteArticle = async (req, res) => {
  try {
    // The ID of the article to delete is passed in the URL but it's an UUID with special characters
    // So we need to wrap it in single quotes to make it a string
    const query = `DELETE FROM Articles WHERE ArticleID = ${req.params.id}`;
    const article = await executeQuery(query);
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};