const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;

const connect = async () => {
    console.log('Testando Base de Datos');
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a la Base de Datos');
    } catch (error) {
        console.log('Error conectado con la Base de Datos', error);
    }
};

//prevent mongoDB deprecation errors
mongoose.set('useCreateIndex', true);

module.exports = {connect, DB_URL};