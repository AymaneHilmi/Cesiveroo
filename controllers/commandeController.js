const sql = require('mssql');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Commande = require('../models/commandeModel.js');

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

exports.createCommande = async (req, res) => {
  const commandeData = req.body; // Assurez-vous que ceci recueille correctement toutes les données nécessaires de req.body
  try {
    await Commande.createCommande(commandeData);
    res.status(201).json({ success: true, message: 'Commande created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mettre à jour une commande
exports.updateCommande = async (req, res) => {
  try {
    const { status, orderDate, deliveryDate, price } = req.body;
    const query = `
      UPDATE Commandes
      SET status = '${status}', orderDate = '${orderDate}', deliveryDate = '${deliveryDate}', price = ${price}
      WHERE CommandeID = '${req.params.id}'`;
    await executeQuery(query);
    res.status(200).json({ status, orderDate, deliveryDate, price });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCommande = async (req, res) => {
  try {
    const query = `DELETE FROM Commandes WHERE CommandeID = '${req.params.id}'`;
    // Exécuter la requête SQL pour supprimer le client
    const result = await executeQuery(query);
    // Vérifier si un client a été supprimé (result.rowCount > 0)
    res.status(200).json({ message: 'Commande deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer une commande par ID
exports.getCommandeById = async (req, res) => {
  try {
    const query = `SELECT * FROM Commandes WHERE CommandeID = '${req.params.id}'`;
    const commande = await executeQuery(query);
    if (!commande[0]) {
      return res.status(404).json({ message: 'Commande not found' });
    }
    res.status(200).json(commande[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer une commande par ID
exports.getCommandeByClientId = async (req, res) => {
  try {
    const query = `SELECT * FROM Commandes WHERE ClientID = '${req.params.id}'`;
    const commande = await executeQuery(query);
    if (!commande[0]) {
      return res.status(404).json({ message: 'Commande not found' });
    }
    res.status(200).json(commande[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Récupérer toutes les commandes
exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.getAllCommandes();
    res.status(200).json(commandes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addArticleToCommande = async (req, res) => {
  const { CommandeID, ArticleID } = req.body;
  // Définir la quantité à 1 par défaut si elle n'est pas spécifiée
  const Quantity = 1;

  try {
    // Vérifier si l'article est déjà dans la commande
    const checkQuery = `
      SELECT * FROM CommandeArticles
      WHERE CommandeID = '${CommandeID}' AND ArticleID = '${ArticleID}'
    `;
    const checkResult = await executeQuery(checkQuery);

    if (checkResult.length > 0) {
      // L'article est déjà dans la commande, donc on augmente la quantité
      const updateQuery = `
        UPDATE CommandeArticles
        SET Quantity = Quantity + ${Quantity}
        WHERE CommandeID = '${CommandeID}' AND ArticleID = '${ArticleID}'
      `;
      await executeQuery(updateQuery);
      res.status(200).json({ message: 'Quantité de l\'article mise à jour avec succès' });
    } else {
      // L'article n'est pas dans la commande, on l'ajoute avec la quantité spécifiée ou 1 par défaut
      const insertQuery = `
        INSERT INTO CommandeArticles (CommandeID, ArticleID, Quantity)
        VALUES ('${CommandeID}', '${ArticleID}', ${Quantity})
      `;
      await executeQuery(insertQuery);
      res.status(200).json({ message: 'Article ajouté à la commande avec succès' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// Ajouter un menu à une commande
exports.addMenuToCommande = async (req, res) => {
  const { CommandeID, MenuID } = req.body;
  // Définir la quantité à 1 par défaut si elle n'est pas spécifiée
  const Quantity = 1;

  try {
    // Vérifier si le menu est déjà dans la commande
    const checkQuery = `
      SELECT * FROM CommandeMenus
      WHERE CommandeID = '${CommandeID}' AND MenuID = '${MenuID}'
    `;
    const checkResult = await executeQuery(checkQuery);

    if (checkResult.length > 0) {
      // Le menu est déjà dans la commande, donc on augmente la quantité
      const updateQuery = `
        UPDATE CommandeMenus
        SET Quantity = Quantity + ${Quantity}
        WHERE CommandeID = '${CommandeID}' AND MenuID = '${MenuID}'
      `;
      await executeQuery(updateQuery);
      res.status(200).json({ message: 'Quantité du menu mise à jour avec succès' });
    } else {
      // Le menu n'est pas dans la commande, on l'ajoute avec la quantité spécifiée ou 1 par défaut
      const insertQuery = `
        INSERT INTO CommandeMenus (CommandeID, MenuID, Quantity)
        VALUES ('${CommandeID}', '${MenuID}', ${Quantity})
      `;
      await executeQuery(insertQuery);
      res.status(200).json({ message: 'Menu ajouté à la commande avec succès' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Récupérer les détails d'une commande, incluant les articles et menus associés
exports.getPanier = async (req, res) => {
  try {

    // Requête pour récupérer les détails de base de la commande
    const commandeDetailsQuery = `SELECT * FROM Commandes WHERE CommandeID = '${req.params.id}'`;
    const commandeDetails = await executeQuery(commandeDetailsQuery);

    if (!commandeDetails[0]) {
      return res.status(404).json({ message: 'Commande not found' });
    }

    // Requête pour récupérer les articles de la commande
    const articlesQuery = `
      SELECT a.ArticleID, a.Name, a.Ingredients, a.Price, ca.Quantity
      FROM CommandeArticles ca
      JOIN Articles a ON ca.ArticleID = a.ArticleID
      WHERE ca.CommandeID = '${req.params.id}'
    `;
    const articles = await executeQuery(articlesQuery);

    // Requête pour récupérer les menus de la commande
    const menusQuery = `
      SELECT m.MenuID, m.name, m.price, cm.Quantity
      FROM CommandeMenus cm
      JOIN Menus m ON cm.MenuID = m.MenuID
      WHERE cm.CommandeID = '${req.params.id}'
    `;
    const menus = await executeQuery(menusQuery);

    // Assembler les détails de la commande avec les articles et menus associés
    const panierDetails = {
      commande: commandeDetails[0],
      articles: articles,
      menus: menus
    };

    res.status(200).json(panierDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.lowerQuantityOfArticle = async (req, res) => {
  const { CommandeID, ArticleID } = req.body;

  try {
    const query = `
      BEGIN TRANSACTION;
      IF EXISTS (SELECT 1 FROM CommandeArticles WHERE CommandeID = '${CommandeID}' AND ArticleID = '${ArticleID}' AND Quantity > 1)
        UPDATE CommandeArticles SET Quantity = Quantity - 1 WHERE CommandeID = '${CommandeID}' AND ArticleID = '${ArticleID}';
      ELSE
        DELETE FROM CommandeArticles WHERE CommandeID = '${CommandeID}' AND ArticleID = '${ArticleID}';
      COMMIT TRANSACTION;
    `;
    const commande = await executeQuery(query);

    res.status(200).json({ success: true, message: 'Article quantity lower successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update quantity article', error: error.message });
  }
};

exports.lowerQuantityOfMenu = async (req, res) => {
  const { CommandeID, MenuID } = req.body;

  try {
    const query = `
      BEGIN TRANSACTION;
      IF EXISTS (SELECT 1 FROM CommandeMenus WHERE CommandeID = '${CommandeID}' AND MenuID = '${MenuID}' AND Quantity > 1)
        UPDATE CommandeMenus SET Quantity = Quantity - 1 WHERE CommandeID = '${CommandeID}' AND MenuID = '${MenuID}';
      ELSE
        DELETE FROM CommandeMenus WHERE CommandeID = '${CommandeID}' AND MenuID = '${MenuID}';
      COMMIT TRANSACTION;
    `;
    const commande = await executeQuery(query);

    res.status(200).json({ success: true, message: 'Menu quantity lower successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update quantity Menu', error: error.message });
  }
};