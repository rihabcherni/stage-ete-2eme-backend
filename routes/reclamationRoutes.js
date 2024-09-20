const express = require('express');
const router = express.Router();
const reclamationController = require('../controllers/reclamationController');
router.post('/', reclamationController.createReclamation);
router.get('/', reclamationController.getAllReclamations);
router.get('/:id', reclamationController.getReclamationById);
router.put('/:id', reclamationController.updateReclamation);
router.delete('/:id', reclamationController.deleteReclamation);
router.get('/client/:clientId', reclamationController.getClientReclamations);

module.exports = router;
