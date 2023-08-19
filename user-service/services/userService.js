const admin = require('firebase-admin'); // Assuming you have Firebase Admin SDK initialized
const User = require('../models/userModel');

const createUser = async (email, password, userData) => {
    // First, create the user in Firebase
    const firebaseUserRecord = await admin.auth().createUser({
        email: email,
        password: password
    });

    // Then, save additional user details in your database, using the Firebase UID as a reference
    const newUser = new User({
        firebaseUID: firebaseUserRecord.uid,
        email: email,
        ...userData
    });

    return newUser.save();
};

const loginUser = async (email, password) => {
    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        const token = await admin.auth().createCustomToken(userRecord.uid);
        return token;
    } catch (error) {
        throw error;
    }
};

const signOutUser = async (email) => {
    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        await admin.auth().revokeRefreshTokens(userRecord.uid);
        return { message: 'Successfully signed out.' };
    } catch (error) {
        throw error;
    }
};

const sendPasswordResetEmail = async (email) => {
    try {
        await admin.auth().generatePasswordResetLink(email);
        return { message: 'Password reset email sent.' };
    } catch (error) {
        throw error;
    }
};

const getAllUsers = async () => {
    return User.find({});
};

const findUserByEmail = async (email) => {
    return User.findOne({ email: email });
};

const getUserById = async (id) => {
    return User.findById(id);
};

const updateUserById = async (id, updatedData) => {
    return User.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteUserById = async (id) => {
    return User.findByIdAndDelete(id);
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
