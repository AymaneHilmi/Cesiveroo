const express = require('express');
const router = express.Router(); // Assurez-vous que vous avez cette ligne

// Importez les modules et les middlewares nécessaires
const livreurController = require('../controllers/livreurController');

// Route pour récupérer tous les livreurs
router.get('/', livreurController.getAllLivreurs);

// Route pour récupérer un livreur par ID
router.get('/:id', livreurController.getLivreurById);

// Route pour mettre à jour un livreur existant
router.put('/:id', livreurController.updateLivreur);

// Route pour supprimer un livreur existant
router.delete('/:id', livreurController.deleteLivreur);

// Route pour se connecter
router.post('/login', livreurController.loginLivreur);

// Route pour s'inscrire
router.post('/register', livreurController.createLivreur);

module.exports = router;