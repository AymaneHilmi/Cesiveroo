const express = require('express');
const router = express.Router(); // Assurez-vous que vous avez cette ligne

// Importez les modules et les middlewares nécessaires
const livreurController = require('../controllers/livreurController');
const { authenticateLivreur } = require('../middlewares');

// Route pour récupérer tous les livreurs
router.get('/', livreurController.getAllLivreurs);

// Route pour récupérer un livreur par ID
router.get('/:id', authenticateLivreur, livreurController.getLivreurById);

// Route pour mettre à jour un livreur existant
router.put('/:id', authenticateLivreur, livreurController.updateLivreur);

// Route pour supprimer un livreur existant
router.delete('/:id',  authenticateLivreur, livreurController.deleteLivreur);

// Route pour se connecter
router.post('/login', livreurController.loginLivreur);

// Route pour s'inscrire
router.post('/register', livreurController.createLivreur);

module.exports = router;