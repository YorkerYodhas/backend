const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const { MONGO_URI } = require('./config/mongoConfig');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// Routes
app.use('/user', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`User service started on port ${PORT}`);
});
