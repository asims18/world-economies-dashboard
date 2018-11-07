// =========================================== Dependencies =========================================================
const express = require('express');
const mongoose = require('mongoose');
const app = express();
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)

app.use((req, res, next) =>{
    res.status(200).json({
        message: ' Works!'
    });
})

// Connecting to mongodb
mongoose.connect(
    'mongodb+srv://worldeconomiesdashboard1@gmail.com:' + 
    process.env.MONGO_ATLAS_PW +
    '@worldeconomiesdashboard-umzik.mongodb.net/test?retryWrites=true'
    , { useNewUrlParser: true }
);

// =========================================== Routes =======================================================

module.exports = app;