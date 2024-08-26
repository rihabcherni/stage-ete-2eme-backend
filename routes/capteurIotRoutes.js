const express = require('express');
const router = express.Router();
const capteurIotController = require('../controllers/capteurIotController');
const detailsCapteurIotController = require('../controllers/capteurIotController');

router.post('/capteur', capteurIotController.addCapteurIot);
router.get('/capteur', capteurIotController.getAllCapteurIots);
router.get('/capteur:id', capteurIotController.getCapteurIotById);
router.patch('/capteur:id', capteurIotController.updateCapteurIot);
router.delete('/capteur:id', capteurIotController.deleteCapteurIot);

router.post('/details-capteur', detailsCapteurIotController.addDetailsCapteurIot);
router.get('/details-capteur', detailsCapteurIotController.getAllDetailsCapteurIots);
router.get('/details-capteur:id', detailsCapteurIotController.getDetailsCapteurIotById);
router.patch('/details-capteur:id', detailsCapteurIotController.updateDetailsCapteurIot);
router.delete('/details-capteur:id', detailsCapteurIotController.deleteDetailsCapteurIot);

module.exports = router;
