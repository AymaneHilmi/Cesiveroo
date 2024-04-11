const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { authenticate, authorizeRestaurant } = require('../middlewares');

// Route pour récupérer tous les menus
router.get('/', authenticate, menuController.getAllMenus);

// Route pour récupérer un menu par son ID
router.get('/:id', authenticate, menuController.getMenuById);

// Route pour créer un nouveau menu
router.post('/', authenticate, authorizeRestaurant, menuController.createMenu);


// Route pour mettre à jour un menu existant
router.put('/:id', authenticate, authorizeRestaurant, menuController.updateMenu);

// Route pour supprimer un menu
router.delete('/:id', authenticate, authorizeRestaurant, menuController.deleteMenu);

// Route pour ajouter un article au menu
router.post('/articles', authenticate, authorizeRestaurant, menuController.addArticleToMenu);

// Route pour récupérer les articles d'un menu
router.get('/articles/:menuId', authenticate, menuController.getArticlesByMenu);

module.exports = router;