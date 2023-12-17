const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true, default: false },
    superadmin: { type: Boolean, required: true, default: false },
    blocked: { type: Boolean, required: true, default: false },
    bookingHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
    }],
    gender: { type: String },
    age: { type: Number },
    countryCode: { type: String },
    mobileNumber: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;