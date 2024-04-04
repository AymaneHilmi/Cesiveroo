const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Route pour récupérer tous les clients
router.get('/', clientController.getAllClients);

// Route pour récupérer un client par ID
router.get('/:id', clientController.getClientById);
// Route pour créer un nouveau client
router.post('/', clientController.createClient);

// Route pour mettre à jour un client existant
router.put('/:id', clientController.updateClient);

// Route pour supprimer un client existant
router.delete('/:id', clientController.deleteClient);

// Route pour se connecter
router.post('/login', clientController.login);


module.exports = router;
