const express = require('express');
const router = express.Router();
const wagonController = require('../controllers/wagonController');

// Routes for wagons
router.post('/wagons', wagonController.addWagon);
router.get('/wagons', wagonController.getAllWagons);
router.get('/train/:trainId', wagonController.getWagonByTrainId);
router.get('/wagons/:id', wagonController.getWagonById);
router.put('/wagons/:id', wagonController.updateWagon);
router.delete('/wagons/:id', wagonController.deleteWagon);

module.exports = router;
