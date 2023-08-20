const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    distance: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    weather: {
        type: String
    },
    culture: {
        type: String
    },
    imageUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Planet', planetSchema);
