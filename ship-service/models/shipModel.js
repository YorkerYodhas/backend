// models/shipModel.js

const mongoose = require('mongoose');
const shortid = require('shortid');

const priceSchema = new mongoose.Schema({
    mode: {
        type: String,
        required: true,
        enum: ['Galactic economy', 'Lunar Luxe', 'Cosmic Opulence']
    },
    amount: {
        type: Number,
        required: true
    }
}, { _id: false });  // We don't need a separate ID for this sub-document.

const shipSchema = new mongoose.Schema({
    tripId: {
        type: String,
        required: true,
        unique: true,
        default: shortid.generate
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
    startPoint: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    duration: {
        type: Number,  // e.g., duration in hours
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    prices: [priceSchema],
    travelMode: {
        type: String,
        required: true
    },
    // ... other necessary fields if needed.
});

module.exports = mongoose.model('Ship', shipSchema);
