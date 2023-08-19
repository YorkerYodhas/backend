const express = require('express');
const userController = require('../controllers/userController');
const verifyFirebaseToken = require('../middleware/firebaseAuth');

const router = express.Router();

// Route for user registration (no need for authentication)
router.post('/register', userController.createUser);

// Route for user login (no need for authentication)
router.post('/login', userController.loginUser);

// Route for sending password reset email (no need for authentication)
router.post('/send-reset-password-email', userController.sendPasswordResetEmail);

// Applying the middleware to protect routes that follow
router.use(verifyFirebaseToken);

// GET all users
router.get('/', userController.getAllUsers);

// GET user by email
router.get('/email/:email', userController.findUserByEmail);

// GET user by ID
router.get('/:id', userController.getUserById);

// UPDATE user by ID
router.put('/:id', userController.updateUserById);

// DELETE user by ID
router.delete('/:id', userController.deleteUserById);

// Route for user sign out (requires authentication)
router.post('/signout', userController.signOutUser);

module.exports = router;
