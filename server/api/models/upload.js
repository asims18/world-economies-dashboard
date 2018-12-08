/**
 * This file is a mongoose model of the upload object
 * Note that this file isn't used in the final project
 * Author: Asim Siddiqui
 */

 // Dependencies
const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    csv: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Upload', uploadSchema);