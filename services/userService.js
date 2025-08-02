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

const putCart = async (user, cart) => {
    user.cart = cart;
    await user.save();
    return user.cart;
};

const addBookToCart = async (user, bookId, quantity = 1) => {
    const book = user.cart.find(item => item.book.toString() === bookId.toString());
    if (book) {
        book.quantity += quantity;
    } else {
        user.cart.push({ book: bookId, quantity });
    }
    await user.save();
    return user.cart;
};

const removeBookFromCart = async (user, bookId, quantity = 1) => {
    const book = user.cart.find(item => item.book.toString() === bookId.toString());
    if (book) {
        book.quantity -= quantity;
        if (book.quantity <= 0) {
            user.cart = user.cart.filter(item => item.book.toString() !== bookId.toString());
        }
        await user.save();
    }
    return user.cart;
};

const clearCart = async (user) => {
    user.cart = [];
    await user.save();
};

const getCartItems = async (user) => {
    return user.cart;
}

const getCartTotal = async (user) => {
    return user.cart.reduce((total, item) => total + (item.book.price * item.quantity), 0);
};

export {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    isUserExists,
    addBookToCart,
    removeBookFromCart,
    clearCart,
    getCartItems,
    getCartTotal
};

