const mongoose = require('mongoose');
const { Schema } = mongoose;

const refundSchema = new mongoose.Schema({
    userId: Number, 
    refundedAmount: Number,
    refundMethod: String,
    comment: String,
    reason: String,
    refundStatus: {
        type: String,
        enum: ['Processed', 'Pending', 'Failed'], // Status of refund process
        default: 'Pending',
    },
});

const Refund = mongoose.model('Refund', refundSchema);

module.exports =  Refund;