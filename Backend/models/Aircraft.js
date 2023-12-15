const mongoose = require('mongoose');

const aircraftSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    }
});

const Aircraft = mongoose.model('Aircraft', aircraftSchema);

module.exports = Aircraft;
