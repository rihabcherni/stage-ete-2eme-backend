const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/', messageController.createMessage);
router.get('/', messageController.getMessages);
router.get('/users', messageController.getAllUsersChat);

module.exports = router;
