const mongoose = require('mongoose');

const User = mongoose.model('users', {
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "employee"
    }
});

module.exports = User;