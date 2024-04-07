const express = require('express');
const router = express.Router();
const commercialController = require('../controllers/commercialController');
const { authenticateClient, authorizeCommercial } = require('../middlewares');

// Route pour consulter les comptes clients
router.get('/clients', authorizeCommercial, commercialController.getAllClients);

// Route pour suspendre un compte client
router.put('/clients/:id/suspend', authorizeCommercial, commercialController.suspendClient);

// Route pour modifier un compte client
router.put('/clients/:id', authorizeCommercial, commercialController.updateClient);

// Route pour supprimer un compte client
router.delete('/clients/:id', authorizeCommercial, commercialController.deleteClient);

// Route pour afficher les tableaux de bord de suivi des processus de commande
router.get('/dashboard', authorizeCommercial, commercialController.getDashboard);

module.exports = router;
