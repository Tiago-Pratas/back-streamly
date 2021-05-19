const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/streamly';

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

module.exports = {connect, DB_URL};