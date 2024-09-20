const express = require('express');
const router = express.Router();
const adminDasboardController = require('../controllers/dashboardAdminController');

router.get('/count', adminDasboardController.getAdminStatistiques);

module.exports = router;
