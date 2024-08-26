const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const currentLocationController = require('../controllers/trainController');
const conductorTrainController = require('../controllers/trainController');

router.post('/trains', trainController.addTrain);
router.get('/trains', trainController.getAllTrains);
router.get('/trains/:id', trainController.getTrainById);
router.put('/trains/:id', trainController.updateTrain);
router.delete('/trains/:id', trainController.deleteTrain);

router.post('/location', currentLocationController.addCurrentLocation);
router.get('/location', currentLocationController.getAllCurrentLocations);
router.get('/location:id', currentLocationController.getCurrentLocationById);
router.patch('/location:id', currentLocationController.updateCurrentLocation);
router.delete('/location:id', currentLocationController.deleteCurrentLocation);


router.post('/conducteur-train', conductorTrainController.addConductorTrain);
router.get('/conducteur-train', conductorTrainController.getAllConductorTrains);
router.get('/conducteur-train:id', conductorTrainController.getConductorTrainById);
router.patch('/conducteur-train:id', conductorTrainController.updateConductorTrain);
router.delete('/conducteur-train:id', conductorTrainController.deleteConductorTrain);

module.exports = router;
