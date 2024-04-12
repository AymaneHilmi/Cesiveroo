const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { authenticate, authorizeRestaurant } = require('../middlewares');

// Route pour récupérer tous les restaurant
router.get('/', authenticate, authorizeRestaurant, restaurantController.getAllRestaurants);

// Route pour récuperer les informations du restaurant
router.get('/infos/:id', authenticate, authorizeRestaurant, restaurantController.getRestaurantInfo);

// Route pour récuperer les informations du restaurant
router.get('/infos', authenticate, authorizeRestaurant, restaurantController.getAllRestaurantsInfos);

// Route pour récuperer les informations du restaurant
router.get('/orders/nb/:id', authenticate, authorizeRestaurant, restaurantController.getNbOrders);

// Route pour récupérer un restaurant par ID
router.get('/:id', authenticate, authorizeRestaurant, restaurantController.getRestaurantById);

// Route pour récupérer un restaurant par ID
router.get('/orders/:id', authenticate, authorizeRestaurant, restaurantController.getOrderList);

// Route pour mettre à jour un restaurant existant
router.put('/:id', authenticate, authorizeRestaurant, restaurantController.updateRestaurant);

// Route pour supprimer un restaurant existant
router.delete('/:id', authenticate, authorizeRestaurant, restaurantController.deleteRestaurant);

// Route pour récuperer tous les menus d'un restaurant
router.get('/:id/menus', authenticate, authorizeRestaurant, restaurantController.getAllMenus);

// Route pour récuperer tous les articles d'un restaurant
router.get('/:id/articles', authenticate, authorizeRestaurant, restaurantController.getAllArticles);



// Route pour se connecter
router.post('/login', restaurantController.login);

// Route pour s'inscrire
router.post('/register', restaurantController.createRestaurant);

// Route pour vérifier et récupérer un restaurant par token
router.post('/verify', authenticate, authorizeRestaurant, restaurantController.verifyToken);

module.exports = router;
