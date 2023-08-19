const express = require('express');
const mongoose = require('mongoose');
const bookingRoutes = require('./routes/bookingRoutes');
const { MONGO_URI } = require('./config/mongoConfig');  // Assuming you have a similar configuration as in the template

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());  // Using express.json() middleware which is a replacement for bodyParser.json()

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/bookings', bookingRoutes);

// Catch 404
app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Error Handler Middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Booking service started on port ${PORT}`);
});
