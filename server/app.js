/**
 * This file is for the node js application configurations
 * Author: Asim Siddiqui
 */

// Dependencies 
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const cors = require('cors');                 // hands Cross Origin Requests
const uploadRoutes = require('../server/api/routes/uploads');
const fileRoutes = require('../server/api/routes/files');

// Middleware 
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connecting to mongodb
mongoose.connect(
    'mongodb+srv://worldeconomiesdashboard:Worldeconomies1!@worldeconomiesdashboard-umzik.mongodb.net/test?retryWrites=true'
    , { useNewUrlParser: true }
);


// Routes that are filtered with requests send to handler
app.use('/uploads', uploadRoutes);
app.use('/files', fileRoutes);

// app.use(express.static(path.join(__dirname, 'dist')));

module.exports = app;