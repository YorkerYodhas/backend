const userService = require('../services/userService');
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

// CREATE user
const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET user by email
const findUserByEmail = async (req, res) => {
    try {
        const user = await userService.findUserByEmail(req.params.email);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET user by ID
const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE user by ID
const updateUserById = async (req, res) => {
    try {
        const user = await userService.updateUserById(req.params.id, req.body);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE user by ID
const deleteUserById = async (req, res) => {
    try {
        await userService.deleteUserById(req.params.id);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    findUserByEmail,
    getUserById,
    updateUserById,
    deleteUserById,
    verifyFirebaseToken
};
