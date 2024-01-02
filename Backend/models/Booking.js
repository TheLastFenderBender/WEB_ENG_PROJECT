const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingNumber: {
        type: Number,
        unique: true,
    },

    userId: {
        type: Number,
        ref: 'User',
        required: true,
    },
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
        // required: true,
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
    flightNumber: Number,
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
        flightClass: String,
     },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
    flightStatus: {
        type: String,
        enum: ['scheduled', 'delayed', 'cancelled'],
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

// Pre-save middleware to generate a unique booking number
bookingSchema.pre('validate', async function (next) {
    if (!this.bookingNumber) {
        try {
            const lastBooking = await this.constructor.findOne({}, {}, { sort: { 'bookingNumber': -1 } });
            this.bookingNumber = lastBooking ? lastBooking.bookingNumber + 1 : 1;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
