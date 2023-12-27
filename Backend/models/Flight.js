const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    airline: {
        type: String,
        required: true,
    },
    aircraftID: {
        type: Number,
        required: true,
    },
    routeID: {
        type: Number,
        required: true,
    },
    departure: {
        type: String,
        required: true,
    },
    arrival: {
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
