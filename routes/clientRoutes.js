const express = require('express');
const router = express.Router(); // Assurez-vous que vous avez cette ligne

// Importez les modules et les middlewares nécessaires
const clientController = require('../controllers/clientController');
const { authenticateClient, authorizeCommercial } = require('../middlewares');

// Route pour récupérer tous les clients
router.get('/', authorizeCommercial, authenticateClient, clientController.getAllClients);

// Route pour récupérer un client par ID
router.get('/:id', authorizeCommercial, authenticateClient, clientController.getClientById);

// Route pour mettre à jour un client existant
router.put('/:id', authorizeCommercial, authenticateClient, clientController.updateClient);

// Route pour supprimer un client existant
router.delete('/:id', authorizeCommercial, authenticateClient, clientController.deleteClient);

// Route pour se connecter
router.post('/login', clientController.login);

// Route pour s'inscrire
router.post('/register', clientController.createClient);

module.exports = router;