import User from '../models/user.js';
import { hashPassword } from '../utils/index.js';
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
    userData.email = userData.email.toLowerCase(); // Ensure email is stored in lowercase
    userData.password = await hashPassword(userData.password); // Hash the password
    return await User.insertOne(userData);
};

const updateUser = async (userId, userData) => {
    if (userData.password) {
        userData.password = await hashPassword(userData.password); // Hash the password if provided
    }
    return await User.findByIdAndUpdate(userId, userData, { new: true });
};

const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

const isUserExists = async (email) => {
    const user = await getUserByEmail(email);
    return user !== null;
};

export {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    isUserExists
};

