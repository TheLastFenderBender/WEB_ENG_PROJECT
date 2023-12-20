
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
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
