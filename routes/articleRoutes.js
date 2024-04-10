const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { authenticate, authorizeRestaurant } = require('../middlewares');

// Route pour récupérer tous les articles
router.get('/', articleController.getAllArticles);

// Route pour récupérer un article par ID
router.get('/:id', articleController.getArticleById);

// Route pour créer un nouveau article

router.post('/', authenticate, authorizeRestaurant, articleController.createArticle);

// Route pour mettre à jour un article existant
router.put('/:id', authenticate, authorizeRestaurant, articleController.updateArticle);

// Route pour supprimer un article existant
router.delete('/:id', authenticate, authorizeRestaurant, articleController.deleteArticle);

module.exports = router;