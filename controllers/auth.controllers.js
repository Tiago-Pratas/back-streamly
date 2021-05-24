const passport = require('passport');

//auth/register
const registerPost = (req, res, next) => {
    const { email, password, username } = req.body;
    console.log('Registering user...');
    if (!email || !password || !username) {
        const error = new Error('User, email and password are required');
        return res.json(error.message);
    }
    passport.authenticate('register', (error, user) => {
        if (error) {
            return res.json(error.message);
        }
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

module.exports = {
    registerPost,
    loginPost,
    logoutPost,
    checkSession,
};
