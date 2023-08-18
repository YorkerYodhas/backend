const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'YOUR_MONGODB_CONNECTION_STRING';

// Middlewares
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Could not connect to MongoDB', error));

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
    console.log(`Server started on port ${PORT}`);
});

