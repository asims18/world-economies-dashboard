const express = require("express");
const router = express.Router();
const multer = require('multer');
const UploadsController = require('../controllers/uploads');

// Handles storing the file
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        currentDate = new Date();
        
        // cb(null, currentDate.getMonth() + '-' + currentDate.getDate() + '-' +  currentDate.getFullYear() + '-' + file.originalname );
        cb(null, file.originalname );
    }
});

// Filters a file if it is not a csv
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }

};

// Creates an upload object from multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// Handles the different routes
router.get("/", UploadsController.uploads_get_all);

router.post("/", upload.single('csv'), UploadsController.uploads_create_upload);

router.get("/:uploadId", UploadsController.uploads_get_upload);

router.patch("/:uploadId", UploadsController.uploads_update_upload);

router.delete("/:uploadId", UploadsController.uploads_delete);

module.exports = router;
