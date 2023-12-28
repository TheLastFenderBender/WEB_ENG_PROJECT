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

    flightType: {
        type: String,
        enum: ['one-way', 'return'],
        required: true,
    },
    flightClass: {
        type: String,
        enum: ['economy', 'business'],
        required: true,
    },
    returnDeparture: {
        type: String,
        required: function () {
            return this.flightType === 'return'; // Required only for return flights
        },
    },
    returnArrival: {
        type: String,
        required: function () {
            return this.flightType === 'return'; // Required only for return flights
        },
    },
    returnDate: {
        type: Date,
        required: function () {
            return this.flightType === 'return'; // Required only for return flights
        },
    },

    timeDuration: { // Adding time duration for the flight
        type: String,
        required: true,
    },
    oneWayPrice: { // Price for one-way flight
        type: Number,
        required: function () {
            return this.flightType === 'one-way';
        },
    },
    returnPrice: { // Price for return flight
        type: Number,
        required: function () {
            return this.flightType === 'return';
        },
    },

});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
