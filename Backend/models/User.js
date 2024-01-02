const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true, default: false },
    superadmin: { type: Boolean, required: true, default: false },
    flightmanager: { type: Boolean, required: true, default: false },
    blocked: { type: Boolean, required: true, default: false },
    bookingHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
    }],
    gender: { type: String },
    age: { type: Number },
    countryCode: { type: String },
    mobileNumber: { type: String },
    userId: { type: Number, unique: true },
    nationality: { type: String },
    passportNumber: { type: String },
    passportExpiry: { type: Date },
});

// Pre-save middleware to generate a unique userId
userSchema.pre('validate', async function (next) {
    if (!this.userId) {
        try {
            const lastUser = await this.constructor.findOne({}, {}, { sort: { 'userId': -1 } });
            this.userId = lastUser ? lastUser.userId + 1 : 1;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;