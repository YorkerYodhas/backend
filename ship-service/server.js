const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const shipRoutes = require('./routes/shipRoutes');  // Import ship routes
const { MONGO_URI } = require('./config/mongoConfig');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// Routes
app.use('/ship', shipRoutes);  // Use ship routes

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Ship service started on port ${PORT}`);
});
