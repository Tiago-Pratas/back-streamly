const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/User');
const SALT_ROUNDS = 10;

const registerStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            const previousUser = await User.findOne({ email });
            if (previousUser) {
                const error = new Error('User already exist!');
                return done(error);
            }

            const hash = await bcrypt.hash(password, SALT_ROUNDS);

            const newUser = new User({
                email,
                username: req.body.username,
                password: hash,
            });

            const savedUser = await newUser.save();
            return done(null, savedUser);
        } catch (error) {
            return done(error);
        }
    }
);

passport.use('registro', registerStrategy);
