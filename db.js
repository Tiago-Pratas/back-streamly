const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;

const connect = async () => {
    console.log('Establishing connection with the DB');
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the DB');
    } catch (error) {
        console.log('Error conecting to the DB', error);
    }
};

//prevent mongoDB deprecation warnings
mongoose.set('useCreateIndex', true);

module.exports = {connect, DB_URL};