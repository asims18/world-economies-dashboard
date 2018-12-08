/**
 * This file is a route to handle the csv files uploaded to node js server
 * Author: Asim Siddiqui
 */

// Dependencies
var express = require('express'); // require express library
var router = express.Router(); // require the express router
var multer = require('multer'); // require multer for the file uploads
const fs = require('fs'); // For file system operations
const FilesController = require('../controllers/files'); // For file controller

// Handles storing the file using multer
const storage = multer.diskStorage({
    // Set the destination for csv upload as the angular assets folder
    destination: function(req, file, cb) {
        cb(null, './src/assets/');
    },
    filename: function(req, file, cb) {
        currentDate = new Date();
        cb(null, file.originalname );
    }
});

/**
 * Filters a file to see if its a csv
 * @param {*} req The fileFilter request obejct
 * @param {*} file The file being passed
 * @param {*} cb  The callback function
 */
const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(csv)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
// Creates an upload handler
var upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


// Handles the route using the controller functions
// POST method only implemented
router.post('/', upload.single('csv'), FilesController.files_create_file);

module.exports = router;