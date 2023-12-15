const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    aircraftID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aircraft',
    },
    departure: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    availableSeats: {
        type: Number,
        required: true,
    },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
