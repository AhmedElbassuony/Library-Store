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