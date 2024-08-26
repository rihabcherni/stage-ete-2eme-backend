const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

router.post('/itineraries', itineraryController.createItinerary);
router.get('/itineraries', itineraryController.getItineraries);
router.get('/itineraries/:id', itineraryController.getItineraryById);
router.put('/itineraries/:id', itineraryController.updateItinerary);
router.delete('/itineraries/:id', itineraryController.deleteItinerary);

module.exports = router;
