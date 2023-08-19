const userService = require('../services/userService');

// CREATE user
const createUser = async (req, res) => {
    try {
        const { email, password, ...restOfData } = req.body;
        const user = await userService.createUser(email, password, restOfData);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userService.loginUser(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const signOutUser = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await userService.signOutUser(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const sendPasswordResetEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await userService.sendPasswordResetEmail(email);
        res.status(200).json(result);
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
    loginUser,
    signOutUser,
    sendPasswordResetEmail,
    getAllUsers,
    findUserByEmail,
    getUserById,
    updateUserById,
    deleteUserById
};
