const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;

const connect = async () => {
    console.log('Testing DB');
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connecting to DB');
    } catch (error) {
        console.log('Error conecting to DB', error);
    }
};

//prevent mongoDB deprecation errors
mongoose.set('useCreateIndex', true);

module.exports = {connect, DB_URL};