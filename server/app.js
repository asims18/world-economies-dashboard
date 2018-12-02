// =========================================== Dependencies =========================================================
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const cors = require('cors');                 // hands Cross Origin Requests
const uploadRoutes = require('../server/api/routes/uploads');
const fileRoutes = require('../server/api/routes/files');

const fs = require('fs'); // For file system operations
// =========================================== Dependencies =========================================================
// =========================================== Middleware ===========================================================
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// =========================================== Middleware ===========================================================
// Connecting to mongodb
mongoose.connect(
    'mongodb+srv://worldeconomiesdashboard:Worldeconomies1!@worldeconomiesdashboard-umzik.mongodb.net/test?retryWrites=true'
    , { useNewUrlParser: true }
);

// app.use((req, res, next) =>{
//     res.status(200).json({
//         message: ' Works!'
//     });
// })

// =========================================== Routes ===============================================================
// Middleware that filters requests send to handler
app.use('/uploads', uploadRoutes);
app.use('/files', fileRoutes);



// convert_to_json();

// 
// app.use(express.static(path.join(__dirname, 'dist')));
// =========================================== Routes ===============================================================

module.exports = app;