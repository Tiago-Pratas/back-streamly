const express = require('express');
const passport = require('passport');
const User = require('../model/User');
const router = express.Router();

passport.serializeUser((user, done) => {
    return done(null, user._id);
});
passport.deserializeUser(async(userId, done) => {
    try {
        const existingUser = await User.findById(userId);
        return done(null, existingUser);
    } catch (error) {
        return done(error);
    }
});

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

//auth/login
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

        req.login(user, (error) => {
            if(error) {
                return res.send(error.message);
            }
            return res.send(user);
        });

        /* return res.json(user); */
    })(req, res, next);
});

//auth/logout

router.post('/logout', (req, res) => {
    console.log('req.user', req.user);

    if(req.user) {
        req.logout();

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.json('Usuario Deslogueado');
        });
    }else {
        return res.json('No user found');
    }
});


module.exports = router;