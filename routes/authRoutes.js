const express = require('express');
const authController = require('../controllers/authController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/verify-otp', authController.verifyOTP);
router.post('/login', authController.loginUser);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.put('/update-password', authMiddleware, authController.updatePassword);
router.get('/profile', authMiddleware, authController.getUserProfile);
router.put('/profile', authMiddleware, authController.updateUserProfile);
router.get('/roles', authMiddleware, authController.getUserRoles);
router.post('/logout', authMiddleware, authController.logoutUser);

// New routes for user roles
router.get('/users', authController.getAllUsers);
router.get('/clients', authController.getClients);
router.get('/operators', authController.getOperators);
router.get('/administrators', authController.getAdministrators);
router.get('/conductors', authController.getConductors);

module.exports = router;
