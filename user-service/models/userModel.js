const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 3
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    starid: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    // ... other fields you need
});

module.exports = mongoose.model('User', userSchema);
