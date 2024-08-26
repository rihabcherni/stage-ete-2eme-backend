const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/orders', orderController.addOrder);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);
router.get('/orders/:id', orderController.getOrderById);
router.get('/clients/:clientId/orders', orderController.getOrdersByClient);

module.exports = router;
