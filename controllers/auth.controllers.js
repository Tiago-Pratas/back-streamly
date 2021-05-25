const passport = require('passport');
const { sendEmailToken } = require('../services/nodemailer');
const crypto = require('crypto');
const Token = require('../model/Token');
const User = require('../model/User');

//auth/register
const registerPost = (req, res, next) => {
    const { email, password, username } = req.body;
    console.log('Registering user...');
    if (!email || !password || !username) {
        const error = new Error('User, email and password are required');
        return res.json(error.message);
    }
    passport.authenticate('register', (error, user, token) => {
        if (error) {
            return res.json(error.message);
        }

        //send email with verification link
        sendEmailToken(email, token.verificationToken, req.protocol, req.get('host'));
        const userRegister = user;
        userRegister.password = null;

        return res.json(userRegister);
    })(req, res, next);
};

//auth/login
const loginPost = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error('Email and password are required');
        return res.json(error.message);
    }
    passport.authenticate('login', (error, user) => {
        if (error) {
            return res.json(error.message);
        }

        req.login(user, (error) => {
            if (error) {
                return res.send(error.message);
            }
            const userLogged = user;
            userLogged.password = null;
            return res.send(userLogged);
        });

        /* return res.json(user); */
    })(req, res, next);
};

//auth/logout
const logoutPost = (req, res) => {
    if (req.user) {
        req.logout();

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.json('Logout user');
        });
    } else {
        return res.json('No user found');
    }
};

//auth/check-session
const checkSession = async (req, res) => {
    if (req.user) {
        const userRegister = req.user;
        userRegister.password = null;
        return res.status(200).json(userRegister);
    } else {
        const error = new Error('Unexpected error');
        return res.status(401).json(error.message);
    }
};

/* POST /verify/resend
* resend token email
*/
const resendToken = async (req, res, next) => {
    try {
        const { email } = req.body;

        const findUser = await User.findOne({ email });

        if (!findUser.length) {
            const error = new Error('Please create an account');

            return res.status(401).json(error);
        }

        const findToken = await Token.findOne({ userId: findUser._id, email });

        if (!findToken.length) {
            const newToken = new Token({
                userId: findUser._id,
                email,
                verificationToken: crypto.randomBytes(25).toString('hex'),
            });

            const saveToken = await newToken.save();

            return await sendEmailToken(
                email,
                saveToken.verificationToken,
                req.protocol,
                req.get('host'),
            );
        }

        return await sendEmailToken(
            email,
            findToken.verificationToken,
            req.protocol,
            req.get('host'),
        );
    } catch (e) {
        next(e);
    }
};

/**
 * TODO: routes for email validation, password reset and tutorial completed
 */

module.exports = {
    registerPost,
    loginPost,
    logoutPost,
    checkSession,
    resendToken
};
