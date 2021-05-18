const express = require('express');
const authController = require('../controllers/auth.controllers');
const router = express.Router();

router.post('/register', authController.registerPost);

router.post('/login', authController.loginPost);

router.post('/logout', authController.logoutPost);


module.exports = router;