const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Route pour récupérer tous les clients
router.get('/', restaurantController.getAllRestaurants);

// Route pour récupérer un client par ID
router.get('/:id', restaurantController.getRestaurantById);

// Route pour créer un nouveau client
router.post('/', restaurantController.createRestaurant);

// Route pour mettre à jour un client existant
router.put('/:id', restaurantController.updateRestaurant);

// Route pour supprimer un client existant
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;
