const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Route pour récupérer tous les restaurant
router.get('/', restaurantController.getAllRestaurants);

// Route pour récupérer un restaurant par ID
router.get('/:id', restaurantController.getRestaurantById);

// Route pour créer un nouveau restaurant
router.post('/', restaurantController.createRestaurant);

// Route pour mettre à jour un restaurant existant
router.put('/:id', restaurantController.updateRestaurant);

// Route pour supprimer un restaurant existant
router.delete('/:id', restaurantController.deleteRestaurant);

// Route pour se connecter
router.post('/login', restaurantController.login);

module.exports = router;
