const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bookingRoutes = require('./routes/bookingRoutes');
const { MONGO_URI } = require('./config/mongoConfig');  // Assuming you have a similar configuration as in the template
const axios = require('axios');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());  // Using express.json() middleware which is a replacement for bodyParser.json()

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Token Introspection Middleware
app.use(async (req, res, next) => {
    const accessToken = req.headers.authorization?.split(' ')[1]; // Extract the access token from the Authorization header

    if (!accessToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Make a token introspection request to Asgardeo
        const introspectionResponse = await axios.post(
            'https://api.asgardeo.io/t/orgfsqqg/oauth2/introspect',  // Replace with your actual introspection endpoint
            `token=${accessToken}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${process.env.AUTH_SERVER_AUTH}`
                }
            }
        );

        if (introspectionResponse.data.active) {
            // Token is valid, proceed to the next middleware
            next();
        } else {
            return res.status(401).json({ message: 'Token invalid' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error introspecting token' });
    }
});

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
