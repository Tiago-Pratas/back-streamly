require('dotenv').config();
const db = require('./db');
db.connect();

const PORT = 5000;

const express = require('express');

const app = express();

const router = express.Router();

/* const PORT = process.env.PORT; */

app.use('/', (req, res) => {
    res.send('streamly');
});

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

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');

});



