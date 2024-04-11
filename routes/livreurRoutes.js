const express = require('express');
const router = express.Router(); // Assurez-vous que vous avez cette ligne

// Importez les modules et les middlewares nécessaires
const livreurController = require('../controllers/livreurController');
const { authenticate, authorizeLivreur } = require('../middlewares');

// Route pour récupérer tous les livreurs
router.get('/', authenticate, authorizeLivreur, livreurController.getAllLivreurs);

// Route pour récupérer un livreur par ID
router.get('/:id', authenticate, authorizeLivreur, livreurController.getLivreurById);

// Route pour mettre à jour un livreur existant
router.put('/:id', authenticate, authorizeLivreur, livreurController.updateLivreur);

// Route pour supprimer un livreur existant
router.delete('/:id', authenticate, authorizeLivreur, livreurController.deleteLivreur);

// Route pour se connecter
router.post('/login', livreurController.loginLivreur);

// Route pour s'inscrire
router.post('/register', livreurController.createLivreur);

// Route pour vérifier le token
router.post('/verify', authenticate, authorizeLivreur, livreurController.verifyToken);
module.exports = router;