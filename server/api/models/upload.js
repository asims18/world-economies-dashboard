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