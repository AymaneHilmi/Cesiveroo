const express = require('express');
const router = express.Router();
const commercialController = require('../controllers/commercialController');
const { authenticateClient, authorizeCommercial } = require('../middlewares');
// Route pour connecter un commercial
router.post('/login', authenticateClient, commercialController.login);
// Route pour inscrire un commercial
router.post('/register', commercialController.register);

module.exports = router;
