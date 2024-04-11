const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const articlesMenus = require('../models/articlesMenusModel');

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

// Lier un article à un menu
exports.linkArticleToMenu = async (req, res) => {
    try {
        const { ArticleID, MenuID } = req.body;
        // Vérifier si le RestaurateurID est bien le propriétaire de l'article
        const queryCheck = `SELECT * FROM Articles WHERE ArticleID = '${ArticleID}' AND RestaurantID = '${req.client.id}'`;
        const article = await executeQuery(queryCheck);
        if (!article[0]) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        // Vérifier si le RestaurateurID est bien le propriétaire du menu
        const queryCheckMenu = `SELECT * FROM Menus WHERE MenuID = '${MenuID}' AND RestaurantID = '${req.client.id}'`;
        const menu = await executeQuery(queryCheckMenu);
        if (!menu[0]) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const query = `INSERT INTO ArticlesMenus (ArticleID, MenuID) VALUES ('${ArticleID}', '${MenuID}')`;
        await executeQuery(query);
        res.status(201).json({ message: 'Article linked to menu' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Supprimer le lien entre un article et un menu
exports.unlinkArticleFromMenu = async (req, res) => {
    try {
        const { ArticleID, MenuID } = req.body;
        // Vérifier si le RestaurateurID est bien le propriétaire de l'article
        const queryCheck = `SELECT * FROM Articles WHERE ArticleID = '${ArticleID}' AND RestaurantID = '${req.client.id}'`;
        const article = await executeQuery(queryCheck);
        if (!article[0]) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        // Vérifier si le RestaurateurID est bien le propriétaire du menu
        const queryCheckMenu = `SELECT * FROM Menus WHERE MenuID = '${MenuID}' AND RestaurantID = '${req.client.id}'`;
        const menu = await executeQuery(queryCheckMenu);
        if (!menu[0]) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const query = `DELETE FROM ArticlesMenus WHERE ArticleID = '${ArticleID}' AND MenuID = '${MenuID}'`;
        await executeQuery(query);
        res.status(200).json({ message: 'Article unlinked from menu' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Récupérer les articles liés à un menu
exports.getArticlesByMenu = async (req, res) => {
    try {
        const MenuID = req.params.id;
        console.log(MenuID)
        const query = `SELECT * FROM ArticlesMenus WHERE MenuID = '${MenuID}'`;
        const articles = await executeQuery(query);
        res.status(200).json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Récupérer les menus liés à un article
exports.getMenusByArticle = async (req, res) => {
    try {
        const ArticleID = req.params.id;
        // Convert string in Int
        console.log(ArticleID)
        const query = `SELECT * FROM ArticlesMenus WHERE ArticleID = '${ArticleID}'`;
        const menus = await executeQuery(query);
        res.status(200).json(menus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

