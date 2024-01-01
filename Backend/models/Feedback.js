
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true,
    // },
    description: {
        type: String,
        required: true,
    },
    userID: {
        type: Number,
        required: true,
        unique: true, 
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        // required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    flightNumber: {  
        type: Number,
        required: true,
    },
}, { timestamps: true });

// Pre-save middleware to generate a unique ID for feedback
feedbackSchema.pre('validate', async function (next) {
    if (!this._id) {
        try {
            const lastFeedback = await this.constructor.findOne({}, {}, { sort: { '_id': -1 } });
            this._id = lastFeedback ? lastFeedback._id + 1 : 1;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
