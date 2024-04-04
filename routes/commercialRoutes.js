const express = require('express');
const router = express.Router();
const commercialController = require('../controllers/commercialController');

// Route pour consulter tous les clients
router.get('/', commercialController.getAllClients);

// Route pour consulter un client par son ID
router.get('/:id', commercialController.getClientById);

// Route pour modifier un client
router.put('/:id', commercialController.updateClient);

// Route pour supprimer un client
router.delete('/:id', commercialController.deleteClient);

// Route pour se connecter
router.post('/login', commercialController.login);

module.exports = router;
