const express = require('express');
const passport = require('passport');
const router = express.Router();

//auth/register
router.post ('/register', (req, res, next) => {
    const {email, password, username} = req.body;
    console.log('Registrando usuario...');
    if (!email || !password || !username) {
        const error = new Error('User name and password are required');
        return res.json(error.message);
    }
    passport.authenticate('registro', (error, user) => {
        if (error) {
            return res.json(error.message);
        }
        const userRegister = user;
        userRegister.password = null;

        return res.json(userRegister);
    })(req, res, next);
});

module.exports = router;