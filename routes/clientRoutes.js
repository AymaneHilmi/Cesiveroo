const express = require('express');
const router = express.Router(); // Assurez-vous que vous avez cette ligne

// Importez les modules et les middlewares nécessaires
const clientController = require('../controllers/clientController');
const { authenticate, authorizeClient } = require('../middlewares');

// Route pour récupérer tous les clients
router.get('/', authenticate, authorizeClient, clientController.getAllClients);

// Route pour récupérer un client par ID
router.get('/:id', authenticate, authorizeClient, clientController.getClientById);

// Route pour mettre à jour un client existant
router.put('/:id', authenticate, authorizeClient, clientController.updateClient);

// Route pour supprimer un client existant
router.delete('/:id', authenticate, authorizeClient, clientController.deleteClient);

// Route pour se connecter
router.post('/login', clientController.login);

// Route pour s'inscrire
router.post('/register', clientController.createClient);

// Route pour suspendre un compte client
router.put('/suspend/:id',clientController.suspendClient);

module.exports = router;