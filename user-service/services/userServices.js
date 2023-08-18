const User = require('../models/userModel');

// CREATE user
const createUser = async (userData) => {
    return User.create(userData);
};

// READ all users
const getAllUsers = async () => {
    return User.find({});
};

// READ user by email
const findUserByEmail = async (email) => {
    return User.findOne({ email: email });
};

// READ user by ID
const getUserById = async (id) => {
    return User.findById(id);
};

// UPDATE user by ID
const updateUserById = async (id, updatedData) => {
    return User.findByIdAndUpdate(id, updatedData, { new: true });  // { new: true } returns the updated user
};

// DELETE user by ID
const deleteUserById = async (id) => {
    return User.findByIdAndDelete(id);
};

module.exports = {
    createUser,
    getAllUsers,
    findUserByEmail,
    getUserById,
    updateUserById,
    deleteUserById
};
