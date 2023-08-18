const bookingService = require('../services/bookingService');
const admin = require('../config/firebaseConfig');

const verifyFirebaseToken = async (req, res, next) => {
    const idToken = req.headers.authorization;

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        if (decodedToken) {
            req.user = decodedToken; // Attach the decoded payload to the request
            next();
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
};

// CREATE booking
exports.createBooking = async (req, res) => {
    try {
        const booking = await bookingService.createBooking(req.body);
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookings();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET bookings by user ID
exports.getBookingsByUserId = async (req, res) => {
    try {
        const bookings = await bookingService.getBookingsByUserId(req.params.userId);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        if (booking) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET bookings by space shuttle number
exports.getBookingsBySpaceShuttle = async (req, res) => {
    try {
        const bookings = await bookingService.getBookingsBySpaceShuttle(req.params.spaceShuttleNumber);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE booking by ID
exports.updateBookingById = async (req, res) => {
    try {
        const updatedBooking = await bookingService.updateBookingById(req.params.id, req.body);
        if (updatedBooking) {
            res.status(200).json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE booking by ID
exports.deleteBookingById = async (req, res) => {
    try {
        const result = await bookingService.deleteBookingById(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Booking deleted' });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
