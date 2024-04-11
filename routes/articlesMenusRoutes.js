const express = require('express');
const router = express.Router();
const articlesMenusController = require('../controllers/articlesMenusController');
const { authenticate, authorizeRestaurant } = require('../middlewares');

// Route pour lier un article à un menu
router.post('/', authenticate, authorizeRestaurant, articlesMenusController.linkArticleToMenu);

// Route pour supprimer un article lié à un menu
router.delete('/', authenticate, authorizeRestaurant, articlesMenusController.unlinkArticleFromMenu);

// Route pour récupérer les articles liés à un menu
router.get('/menus/:id', authenticate, authorizeRestaurant, articlesMenusController.getArticlesByMenu);

// Route pour récupérer les menus liés à un article
router.get('/articles/:id', authenticate, authorizeRestaurant, articlesMenusController.getMenusByArticle);

module.exports = router;
