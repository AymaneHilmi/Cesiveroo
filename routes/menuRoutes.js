const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Route pour récupérer tous les clients
router.get('/', menuController.getAllMenus);

// Route pour récupérer un client par ID
router.get('/:id', menuController.getMenuById);

// Route pour créer un nouveau client
router.post('/', menuController.createMenu);

// Route pour mettre à jour un client existant
router.put('/:id', menuController.updateMenu);

// Route pour supprimer un client existant
router.delete('/:id', menuController.deleteMenu);

// Route pour ajouter un article au menu
router.post('/articles', menuController.addArticleToMenu);

// Route pour récupérer les articles d'un menu
router.get('/articles/:menuId', menuController.getArticlesOfMenu);

module.exports = router;