const Booking = require('../models/bookingModel');

// CREATE booking
const createBooking = async (bookingData) => {
    return Booking.create(bookingData);
};

// READ all bookings
const getAllBookings = async () => {
    return Booking.find({});
};

// READ bookings by user ID
const getBookingsByUserId = async (userId) => {
    return Booking.find({ userId: userId });
};

// READ booking by ID
const getBookingById = async (id) => {
    return Booking.findById(id);
};

// READ bookings by space shuttle number
const getBookingsBySpaceShuttle = async (spaceShuttleNumber) => {
    return Booking.find({ spaceShuttleNumber: spaceShuttleNumber });
};

// UPDATE booking by ID
const updateBookingById = async (id, updatedData) => {
    return Booking.findByIdAndUpdate(id, updatedData, { new: true });  // { new: true } returns the updated booking
};

// DELETE booking by ID
const deleteBookingById = async (id) => {
    return Booking.findByIdAndDelete(id);
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingsByUserId,
    getBookingById,
    getBookingsBySpaceShuttle,
    updateBookingById,
    deleteBookingById
};
