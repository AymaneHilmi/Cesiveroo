const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { authenticate, authorizeRestaurant } = require('../middlewares');

// Route pour récupérer tous les restaurant
router.get('/', authenticate, authorizeRestaurant, restaurantController.getAllRestaurants);

// Route pour récuperer les informations du restaurant
router.get('/infos/:id', authenticate, authorizeRestaurant, restaurantController.getRestaurantInfo);

// Route pour récupérer un restaurant par ID
router.get('/:id', authenticate, authorizeRestaurant, restaurantController.getRestaurantById);

// Route pour mettre à jour un restaurant existant
router.put('/:id', authenticate, authorizeRestaurant, restaurantController.updateRestaurant);

// Route pour supprimer un restaurant existant
router.delete('/:id', authenticate, authorizeRestaurant, restaurantController.deleteRestaurant);

// Route pour se connecter
router.post('/login', restaurantController.login);

// Route pour s'inscrire
router.post('/register', restaurantController.createRestaurant);

module.exports = router;
