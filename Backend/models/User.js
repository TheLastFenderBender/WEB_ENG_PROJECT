const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true, default: false },
    blocked: { type: Boolean, required: true, default: false },
    followers: [{ type: String }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;