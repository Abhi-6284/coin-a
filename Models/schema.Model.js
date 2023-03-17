const mongoose = require('mongoose');

const User = mongoose.model('users', {
    firstName: String,
    lastName: String,
    email: String,
    password: String
},{timestamps: true});

module.exports = User;