const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
        required: true,
    },
    seatNumber: {
        type: String,
        required: true,
    },
    // status: {
    //     type: String,
    //     enum: ['booked', 'canceled'],
    //     default: 'booked',
    // },
    // paymentStatus: {
    //     type: String,
    //     enum: ['pending', 'completed'],
    //     default: 'pending',
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

    bookingId: mongoose.Schema.Types.ObjectId,
    flightNumber: String,
    dateOfFlight: Date,
    flightDetails: { 
        airline: String,
        departure: String,
        arrival: String,
        aircraftID: String,
        routeID: String,
        date: Date,
        day: String,
        time: String,
        duration: String,
        availableSeats: Number,
        price: Number,
     },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'canceled'],
        default: 'pending',
    },
    flightStatus: {
        type: String,
        enum: ['scheduled', 'delayed', 'canceled'],
        default: 'scheduled',
    },
    seatSelected: String,
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'refunded'],
        default: 'pending',
    },
    paymentAmount: Number,
}, { timestamps: true });



const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
