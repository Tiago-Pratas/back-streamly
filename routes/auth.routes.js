const express = require('express');
const passport = require('passport');
const router = express.Router();

//auth/register
router.post ('/register', (req, res, next) => {
    const {email, password, username} = req.body;
    console.log('Registrando usuario...');
    if (!email || !password || !username) {
        const error = new Error('User, email and password are required');
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


router.post('/login', (req, res, next) => {
    const {username, email, password} = req.body;
    console.log('Logueando al usuario...', req.body);

    if(!email|| !password || !username) {
        const error = new Error('User, email and password are required');
        return res.json(error.message);
    }
    passport.authenticate('acceso', (error, user) => {
        if(error) {
            return res.json(error.message);
        }
        return res.json(user);
    })(req, res, next);
});


module.exports = router;