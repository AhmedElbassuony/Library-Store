import User from '../models/userModel.js';

const getAllUsers = async () => {
    return await User.find().select('-password');
};

const getUserById = async (userId) => {
    return await User.findById(userId).select('-password');
}

const getUserByEmail = async (email) => {
    return await User.findOne({ email: email.toLowerCase() });
};

const createUser = async (userData) => {
    return await User.insertOne(userData);
};

const updateUser = async (userId, userData) => {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
};

const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};

