import bycrapt from 'bcrypt';


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const createJSONResponse = (success, message, data = null) => {
    return {
        success,
        message,
        data
    };
}

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


const hashPassword = async (password) => {
    const hashedPassword = await bycrapt.hash(password, 8);
    return hashedPassword;
};

const isPasswordCorrect = async (password, hashedPassword) => {
    return await bycrapt.compare(password, hashedPassword);
};

export { createJSONResponse, userValidation, hashPassword, isPasswordCorrect, signInUserValidation };
