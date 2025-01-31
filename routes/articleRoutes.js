const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Route pour récupérer tous les articles
router.get('/', articleController.getAllArticles);

// Route pour récupérer un article par ID
router.get('/:id', articleController.getArticleById);

// Route pour créer un nouveau article
router.post('/', articleController.createArticle);

// Route pour mettre à jour un article existant
router.put('/:id', articleController.updateArticle);

// Route pour supprimer un article existant
router.delete('/:id', articleController.deleteArticle);

module.exports = router;