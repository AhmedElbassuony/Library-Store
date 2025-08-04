import mongoose from 'mongoose';
import { isAuthorExists } from '../../services/authorService.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const userValidation = (user) => {
    const { email, password, username, gender } = user;
    const errors = {};
    if (!email) {
        errors.email = 'Email is required';
    }
    else if (!emailRegex.test(email)) {
        errors.email = 'Invalid email format';
    }
    if (!password) {
        errors.password = 'Password is required';
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }
    if (!username) {
        errors.username = 'Username is required';
    } else if (username.length < 3) {
        errors.username = 'Username must be at least 3 characters long';
    }
    if (!gender) {
        errors.gender = 'Gender is required';
    } else if (gender !== 'male' && gender !== 'female') {
        errors.gender = 'Gender must be either male or female';
    }
    return { isValid: Object.keys(errors).length === 0, errors };
};

const signInUserValidation = (user) => {
    const { email, password } = user;
    const errors = {};
    if (!email) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
        errors.email = 'Invalid email format';
    }
    if (!password) {
        errors.password = 'Password is required';
    }
    return { isValid: Object.keys(errors).length === 0, errors };
};

const userUpdateValidation = (user) => {
    const { email, username, gender, role, cart, password } = user;
    const errors = {};

    if (email) {
        errors.email = "You cannot update email";
    }

    if (password && password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    if (username) {
        const trimmedUsername = username.trim();
        if (trimmedUsername.length < 3) {
            errors.username = 'Username must be at least 3 characters long';
        }
    }

    if (gender) {
        errors.gender = 'You cannot update gender';
    }

    if (role) {
        errors.role = 'You cannot update role';
    }

    if (cart) {
        errors.cart = 'You cannot update cart';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

const createBookValidation = (book) => {
    const { title, author, price, stock, averageRating } = book;
    const errors = {};
    if (!title) {
        errors.title = 'Title is required';
    }
    if (!author || !mongoose.Types.ObjectId.isValid(author) || !isAuthorExists(author)) {
        errors.author = 'Author is required and must be a valid Id';
    }
    if (price === undefined || price === null || price === '') {
        errors.price = 'Price is required';
    } else if (typeof price !== 'number' || Number(price) <= 0) {
        errors.price = 'Price must be a positive number';
    }
    if (stock === undefined || stock === null || stock === '') {
        errors.stock = 'Stock is required';
    } else if (typeof stock !== 'number' || Number(stock) < 0) {
        errors.stock = 'Stock must be a non-negative number';
    }
    if (averageRating !== undefined && (typeof averageRating !== 'number' || Number(averageRating) < 0 || Number(averageRating) > 5)) {
        errors.averageRating = 'Average rating must be a number between 0 and 5';
    }
    return { isValid: Object.keys(errors).length === 0, errors };
};

const updateBookValidation = (book) => {
    const { title, author, category, price, stock, summary, averageRating } = book;
    const errors = {};
    if (title && typeof title !== 'string') {
        errors.title = 'Title must be a string';
    }
    if (author && (!mongoose.Types.ObjectId.isValid(author) || !isAuthorExists(author))) {
        errors.author = 'Author must be a valid Id';
    }
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
        errors.category = 'Category must be a valid Id';
    }
    if (price !== undefined && (typeof price !== 'number' || Number(price) < 0)) {
        errors.price = 'Price must be a non-negative number';
    }
    if (stock !== undefined && (typeof stock !== 'number' || Number(stock) < 0)) {
        errors.stock = 'Stock must be a non-negative number';
    }
    if (summary && typeof summary !== 'string') {
        errors.summary = 'Summary must be a string';
    }
    if (averageRating !== undefined && (typeof averageRating !== 'number' || Number(averageRating) < 0 || Number(averageRating) > 5)) {
        errors.averageRating = 'Average rating must be a number between 0 and 5';
    }
    return { isValid: Object.keys(errors).length === 0, errors };
}

const createAuthorValidation = (author) => {
    const { name } = author;
    const errors = {};
    if (!name) {
        errors.name = 'Author name is required';
    } else if (typeof name !== 'string' || name.trim().length === 0) {
        errors.name = 'Author name must be a non-empty string';
    }
    return { isValid: Object.keys(errors).length === 0, errors };
};

const updateAuthorValidation = (author) => {
    const { name } = author;
    const errors = {};
    if (name && (typeof name !== 'string' || name.trim().length === 0)) {
        errors.name = 'Author name must be a non-empty string';
    }
    return { isValid: Object.keys(errors).length === 0, errors };
};


export {
    userValidation,
    signInUserValidation,
    userUpdateValidation,
    createBookValidation,
    updateBookValidation,
    createAuthorValidation,
    updateAuthorValidation
};