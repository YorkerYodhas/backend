const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// // Use the verifyFirebaseToken middleware to protect the routes below this line
// router.use(userController.verifyFirebaseToken);

// CREATE booking
router.post('/', bookingController.createBooking);

// GET all bookings
router.get('/', bookingController.getAllBookings);

// GET booking by ID
router.get('/id/:id', bookingController.getBookingById);

// GET bookings by user ID
router.get('/user/:userId', bookingController.getBookingsByUserId);

// GET bookings by space shuttle number
router.get('/shuttle/:spaceShuttleNumber', bookingController.getBookingsBySpaceShuttle);

// UPDATE booking by ID
router.put('/:id', bookingController.updateBookingById);

// DELETE booking by ID
router.delete('/:id', bookingController.deleteBookingById);

module.exports = router;
