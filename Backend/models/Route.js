const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    routeID: {
        type: Number,
        required: true,
        unique: true,
    },
    departure: {
        type: String,
        required: true,
    },
    arrival: {
        type: String,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    travelTime: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
