const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Use the verifyFirebaseToken middleware to protect the routes below this line
router.use(userController.verifyFirebaseToken);

// CREATE user
router.post('/', userController.createUser);

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

module.exports = router;
