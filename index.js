require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const db = require('./db');

const indexRoutes = require('./routes/index.routes');
const authRoutes = require('./routes/auth.routes');

db.connect();

const PORT = 5000;

const app = express();

require('./passport/passport');

//allow CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(session({
    secret:process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 48 * 60 * 60 * 1000
    },
    store:MongoStore.create({mongoUrl:db.DB_URL}),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', indexRoutes);
app.use('/auth', authRoutes);


const serverCallback = () => {
    console.log(`server port: ${PORT}`);
};

app.listen(PORT, serverCallback);

//middleware to handle route exceptions
app.use('*', (req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

//middleware to handle exceptions
app.use((error, req, res,) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');

});



