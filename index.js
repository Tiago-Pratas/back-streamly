require('dotenv').config();
const passport = require('passport');
const db = require('./db');
const indexRoutes = require('./routes/index.routes');
const authRoutes = require('./routes/auth.routes');
db.connect();

const PORT = 5000;

const express = require('express');

const app = express();

/* const router = express.Router(); */

/* const PORT = process.env.PORT; */

require('./passport/passport');

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



