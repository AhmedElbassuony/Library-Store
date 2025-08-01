import { getAllUsers, isUserExists, createUser, getUserById, getUserByEmail } from '../services/userService.js';
import { createJSONResponse, userValidation, signInUserValidation, isPasswordCorrect } from '../utils/index.js';
import mongoose from 'mongoose';

const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        return res.json(createJSONResponse(true, 'Users retrieved successfully', users));
    } catch (error) {
        return res.status(500).json(createJSONResponse(false, 'Error retrieving users', error.message));
    }
};

const registerUser = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json(createJSONResponse(false, 'Request body is required'));
    }
    const validationResult = userValidation(req.body);
    if (!validationResult.isValid) {
        return res.status(400).json(createJSONResponse(false, 'Validation errors', validationResult.errors));
    }
    if (await isUserExists(req.body.email)) {
        return res.status(400).json(createJSONResponse(false, 'User with this email already exists'));
    }
    try {
        const newUser = await createUser(req.body);
        newUser.password = undefined; // Remove password from response
        return res.status(201).json(createJSONResponse(true, 'User registered successfully', newUser));
    } catch (error) {
        return res.status(500).json(createJSONResponse(false, 'Error registering user', error.message));
    }
};

const getUserByIdController = async (req, res) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json(createJSONResponse(false, 'Invalid user ID'));
    }
    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json(createJSONResponse(false, 'User not found'));
        }
        return res.json(createJSONResponse(true, 'User retrieved successfully', user));
    } catch (error) {
        return res.status(500).json(createJSONResponse(false, 'Error retrieving user', error.message));
    }
};

const signInUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json(createJSONResponse(false, 'Email and password are required'));
    }
    const validationResult = signInUserValidation(req.body);
    if (validationResult.isValid === false) {
        return res.status(400).json(createJSONResponse(false, 'Validation errors', validationResult.errors));
    }
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json(createJSONResponse(false, 'Invalid email or password'));
        }
        const isPasswordValid = await isPasswordCorrect(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json(createJSONResponse(false, 'Invalid email or password'));
        }
        user.password = undefined; // Remove password from response
        return res.json(createJSONResponse(true, 'User signed in successfully', user));
    } catch (error) {
        return res.status(500).json(createJSONResponse(false, 'Error signing in user', error.message));
    }
}

export {
    getUsers,
    registerUser,
    getUserByIdController,
    signInUser
}
