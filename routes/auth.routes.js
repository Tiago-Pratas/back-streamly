const express = require('express');
const authController = require('../controllers/auth.controllers');
const router = express.Router();

router.post('/register', authController.registerPost);

router.post('/login', authController.loginPost);

router.post('/logout', authController.logoutPost);

router.post('/verify/resend', authController.resendToken);

router.post('/verify/:email/:verificationToken', authController.verifyToken);

router.get('/check-session', authController.checkSession);

console.log(router.stack);

module.exports = router;

