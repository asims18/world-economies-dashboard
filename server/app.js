// =========================================== Dependencies =========================================================
const express = require('express');
const mongoose = require('mongoose');
const app = express();
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)



// Connecting to mongodb
mongoose.connect(
    'mongodb+srv://worldeconomiesdashboard:Worldeconomies1!@worldeconomiesdashboard-umzik.mongodb.net/test?retryWrites=true'
    , { useNewUrlParser: true }
);

app.use((req, res, next) =>{
    res.status(200).json({
        message: ' Works!'
    });
})


// =========================================== Routes =======================================================

module.exports = app;