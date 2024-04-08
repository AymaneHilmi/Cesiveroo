const express = require('express');
const router = express.Router();
const commercialController = require('../controllers/commercialController');
const { authenticate, authorizeCommercial } = require('../middlewares');
// Route pour connecter un commercial
router.post('/login', authenticate, commercialController.login);
// Route pour inscrire un commercial
router.post('/register', commercialController.register);

module.exports = router;
