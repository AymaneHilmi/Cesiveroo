const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');

router.get('/', commandeController.getAllCommandes);
router.get('/:id', commandeController.getCommandeById);
router.get('/client/:id', commandeController.getCommandeByClientId);
router.put('/:id', commandeController.updateCommande);
router.delete('/:id', commandeController.deleteCommande);
router.post('/', commandeController.createCommande);
router.post('/article', commandeController.addArticleToCommande);
router.put('/article/quantity', commandeController.lowerQuantityOfArticle);
router.put('/menu/quantity', commandeController.lowerQuantityOfMenu);
router.post('/menu', commandeController.addMenuToCommande);
router.get('/panier/:id', commandeController.getPanier);

module.exports = router;