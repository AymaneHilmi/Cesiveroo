const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Route pour récupérer tous les clients
router.get('/', articleController.getAllArticles);

// Route pour récupérer un client par ID
router.get('/:id', articleController.getArticleById);

// Route pour créer un nouveau client
router.post('/', articleController.createArticle);

// Route pour mettre à jour un client existant
router.put('/:id', articleController.updateArticle);

// Route pour supprimer un client existant
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
