require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const db = require('./db');
const indexRoutes = require('./routes/index.routes');
const authRoutes = require('./routes/auth.routes');
db.connect();

const PORT = 5000;

const app = express();

/* const router = express.Router(); */

/* const PORT = process.env.PORT; */

require('./passport/passport');

app.use(session({
    secret:'AasWsfi.854-@',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 48 * 60 * 60 * 1000
    },
    store:MongoStore.create({mongoUrl:db.DB_URL}),
}));
app.use(passport.initialize());
app.use(passport.session());

/* app.use('/', (req, res) => {
    res.send('streamly');
}); */

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', indexRoutes);
app.use('/auth', authRoutes);


const serverCallback = () => {
    console.log(`server port: ${PORT}`);
};

app.listen(PORT, serverCallback);

//creamos el middleware encargado de capturar todas las rutas:

app.use('*', (req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

//creamos el middleware para la gestion de errores

app.use((error, req, res,) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');

});



