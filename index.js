require('dotenv').config();

const express = require('express');

const app = express();

const PORT = process.env.PORT;



app.use('/', (req, res, next) => {
    res.send('streamly')
});

const serverCallback = () => {
    console.log(`server port: ${PORT}`)
};

app.listen(PORT, serverCallback);