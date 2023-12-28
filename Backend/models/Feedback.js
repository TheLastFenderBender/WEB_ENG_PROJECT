
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    fromUser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
    feedbackText: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
}, { timestamps: true });


const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
