const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Menu = require('../models/menuModel');

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

// Récupérer tous les menus
exports.getAllMenus = async (req, res) => {
  try {
    const query = 'SELECT * FROM Menus';
    const menus = await executeQuery(query);
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un menu par son ID
exports.getMenuById = async (req, res) => {
  try {
    const query = `SELECT * FROM Menus WHERE MenuID = '${req.params.id}'`;
    const menu = await executeQuery(query);
    if (!menu[0]) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.status(200).json(menu[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un nouveau menu
exports.createMenu = async (req, res) => {
  try {
    // Extract menu data from request body
    const { restaurantId, name, price } = req.body;

    // Call the create method of the Menu model to insert the new menu
    const newMenu = await Menu.create({ restaurantId, name, price });

    // If the menu was successfully created, send the new menu data back
    res.status(201).json(newMenu);
  } catch (err) {
    // If there's an error, send back a 500 status with the error message
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour un menu
exports.updateMenu = async (req, res) => {
  try {
    const { name, ingredients, price } = req.body;
    const query = `
      UPDATE Menus
      SET name = '${name}', ingredients = '${ingredients}', price = ${price}
      WHERE MenuID = '${req.params.id}'`;
    await executeQuery(query);
    res.status(200).json({ name, ingredients, price });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un menu
exports.deleteMenu = async (req, res) => {
  try {
    // The ID of the menu to delete is passed in the URL but it's an UUID with special characters
    // So we need to wrap it in single quotes to make it a string
    const query = `DELETE FROM Menus WHERE MenuID = ${req.params.id}`;
    const menu = await executeQuery(query);
    res.status(200).json({ message: 'Menu deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addArticleToMenu = async (req, res) => {
  try {
    // L'ID du menu et de l'article sont passés dans le corps de la requête
    const { menuId, articleId } = req.body;

    // Appelez la méthode du modèle pour ajouter l'article au menu
    const success = await Menu.addArticleToMenu(menuId, articleId);

    if (success) {
      // Si l'article a été ajouté au menu avec succès, envoyez un statut 201 (Created)
      res.status(201).json({ message: 'Article added to menu successfully' });
    } else {
      // Sinon, envoyez un statut 400 (Bad Request)
      res.status(400).json({ message: 'Failed to add article to menu' });
    }
  } catch (err) {
    // Si une erreur survient, envoyez un statut 500 (Internal Server Error)
    res.status(500).json({ message: err.message });
  }
};

exports.getArticlesOfMenu = async (req, res) => {
  try {
    const menuId = req.params.menuId; // Assurez-vous que l'ID du menu est correctement récupéré depuis les paramètres de la requête
    const articles = await Menu.getArticlesOfMenu(menuId);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};