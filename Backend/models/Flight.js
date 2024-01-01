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
        enum: ['one-way'] ,
        required: true,
    },
    flightClass: {
        type: String,
        enum: ['economy', 'business'],
        required: true,
    },
    
    prices: {
        economy: {
            type: Number,
            required: true,
        },
        business: {
            type: Number,
            required: true,
        },
    },
    status: {
        type: String,
        enum: ['scheduled', 'cancelled', 'postponed'], // Define various status options
        default: 'scheduled', // Set a default status
    },

   
});

flightSchema.pre('save', async function (next) {
    if (!this._id) {
        try {
            const lastFlight = await this.constructor.findOne({}, {}, { sort: { '_id': -1 } });
            this._id = lastFlight ? lastFlight._id + 1 : 1;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
