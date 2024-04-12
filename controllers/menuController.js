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
    const { RestaurantID, name, price } = req.body;
    // Vérifiez si le restaurantID du menu correspond à celui de l'utilisateur connecté
    if (RestaurantID !== req.client.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    // Call the create method of the Menu model to insert the new menu
    const success = await Menu.create({ RestaurantID, name, price });

    // If the menu was successfully created, send the new menu data back
    if (success) {
      res.status(201).json({ RestaurantID, name, price });
    } else {
      res.status(400).json({ message: 'Failed to create menu' });
    }
  } catch (err) {
    // If there's an error, send back a 500 status with the error message
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour un menu
exports.updateMenu = async (req, res) => {
  try {
    const { name, price } = req.body;
    // Vérifiez si le restaurantID du menu correspond à celui de l'utilisateur connecté
    const checkQuery = `SELECT RestaurantID FROM Menus WHERE MenuID = ${req.params.id}`;
    const checkResult = await executeQuery(checkQuery);
    if (checkResult[0].RestaurantID !== req.client.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const query = `
      UPDATE Menus
      SET name = '${name}', price = ${price}
      WHERE MenuID = '${req.params.id}'`;
    await executeQuery(query);
    res.status(200).json({ name, price });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Supprimer un menu
exports.deleteMenu = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'Menu ID is required' });
    }
    // Vérifiez si le restaurantID du menu correspond à celui de l'utilisateur connecté
    const checkQuery = `SELECT RestaurantID FROM Menus WHERE MenuID = ${req.params.id}`;
    const checkResult = await executeQuery(checkQuery);
    if (checkResult[0].RestaurantID !== req.client.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const query = `DELETE FROM Menus WHERE MenuID = ${req.params.id}`;
    const menu = await executeQuery(query);
    // Supprimer également dans ArticlesMenus
    const query2 = `DELETE FROM ArticlesMenus WHERE MenuID = ${req.params.id}`;
    await executeQuery(query2);
    res.status(200).json({ message: 'Menu deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addArticleToMenu = async (req, res) => {
  try {
    // L'ID du menu et de l'article sont passés dans le corps de la requête
    const { menuId, articleId } = req.body;
    // Vérifiez si le restaurantID du menu correspond à celui de l'utilisateur connecté
    const checkQuery = `SELECT RestaurantID FROM Menus WHERE MenuID = ${menuId}`;
    const checkResult = await executeQuery(checkQuery);
    if (checkResult[0].RestaurantID !== req.client.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
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

exports.getArticlesByMenu = async (req, res) => {
  try {
    const menuId = req.params.menuId; // Assurez-vous que l'ID du menu est correctement récupéré depuis les paramètres de la requête
    const articles = await Menu.getArticlesByMenu(menuId);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};