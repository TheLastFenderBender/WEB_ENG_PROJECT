const mongoose = require('mongoose');

const aircraftSchema = new mongoose.Schema({
    aircraftID: {
        type: Number,
        required: true,
    },
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
        default: false
    }
});

const Aircraft = mongoose.model('Aircraft', aircraftSchema);

module.exports = Aircraft;
