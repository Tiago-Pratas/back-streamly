const passport = require('passport');
const crypto = require('crypto');
const Token = require('../model/Token');
const User = require('../model/User');
const { sendEmailToken } = require('../services/nodemailer');

//auth/register
const registerPost = (req, res, next) => {
    const { email, password, username } = req.body;
    console.log('Registering user...');
    if (!email || !password || !username) {
        const error = new Error('User, email and password are required');
        error.status = 400;
        return next(error.message);
    }
    passport.authenticate('register', (error, user, token) => {
        if (error) {
            return next(error.message);
        }
        //send email with verification link
        sendEmailToken(email, token.verificationToken, req.get('origin'));
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
        error.status = 400;
        return next(error.message);
    }
    passport.authenticate('login', (error, user) => {
        if (error) {
            return next(error.message);
        }

        req.login(user, (error) => {
            if (error) {
                return next(error.message);
            }
            const userLogged = user;
            userLogged.password = null;
            return res.json(userLogged);
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
        const error = new Error('No user found');
        error.status = 401;
        return next(error);
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
        error.status = 401;
        return next(error.message);
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
            error.status = 401;
            return next(error);
        }

        const findToken = await Token.findOne({ userId: findUser._id, email });

        if (!findToken.length) {
            const newToken = new Token({
                userId: findUser._id,
                email,
                verificationToken: crypto.randomBytes(25).toString('hex'),
            });

            const saveToken = await newToken.save();

            await sendEmailToken(email, saveToken.verificationToken, req.get('origin'));

            return res.json('Le hemos enviado un correo de confirmacion');
        }

        return await sendEmailToken(email, findToken.verificationToken, req.get('origin'));
    } catch (err) {
        next(err);
    }
};

/**
 * TODO: routes for email validation, password reset and tutorial completed
 */

/**
 * GET verify/:email/:verificationToken
 * verify if token corresponds to email
 */
const verifyToken = async (req, res, next) => {
    try {
        const { email, verificationToken } = req.params;

        console.log(email);

        const foundToken = await Token.findOne({ email, verificationToken });

        //confirm email by changing the isActive field to true
        if (foundToken && !foundToken.pwdReset ) {
            const updatedUser = await User.findByIdAndUpdate(
                foundToken.userId,
                { isActive: true },
                { new: true },
            );
            
            updatedUser.password = null;

            return res.json(updatedUser);
        }
        if (foundToken && foundToken.pwdReset) {
            await User.findOneAndUpdate(
                foundToken.userId,
                { password: req.body.password },
                { new: true },
            );

            return res.json('Contraseña actualizada con exito');
        }


    } catch (err) {
        next(err);
    } 
};

const resetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const updateUser = await User.findOneAndUpdate({ email },
            { pwdReset: true },
            { new: true });

        if(!updateUser) return res.json('no hemos encontrado su direccion, por favor asegurese que esta está correcta');

        const newToken = new Token({
            userId: req.body.id,
            email,
            verificationToken: crypto.randomBytes(25).toString('hex'),
        });

        const saveToken = await newToken.save();

        await sendEmailToken(email, saveToken.verificationToken, req.get('origin'));

        return res.json('Le hemos enviado un email a su direccion');
    } catch (err) {
        next(err);
    }
};

module.exports = {
    registerPost,
    loginPost,
    logoutPost,
    checkSession,
    resendToken,
    verifyToken,
    resetPassword
};
