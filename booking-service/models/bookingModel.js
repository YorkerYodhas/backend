const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,  // e.g., duration in hours
        required: true
    },
    spaceShuttleNumber: {
        type: String,
        required: true
    },
    seatNumbers: {
        type: [String],  // Array of seat numbers
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED'],  // Enum restricts the value to one of these
        default: 'PENDING'
    },
    paymentId: {
        type: String,
        required: function() { return this.paymentStatus === 'COMPLETED'; }  // Only required if paymentStatus is 'COMPLETED'
    },
    // ... other necessary fields if needed.
});

module.exports = mongoose.model('Booking', bookingSchema);
