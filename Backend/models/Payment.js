const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: {
        type: Number,
        ref: 'User', // Reference to the User model
        // required: true
    },
    cardType: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    cardExpiry: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    nameOnCard: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        // required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['completed', 'pending', 'failed'], // Possible payment statuses
        // required: true
    },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
