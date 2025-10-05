import bycrapt from 'bcrypt';





const createJSONResponse = (success, message, data = null) => {
    return {
        success,
        message,
        data
    };
}

const hasInvalidBook = (cart) => {
    if (!Array.isArray(cart)) {
        return true;
    }
    for (const item of cart) {
        if (!item.book || !item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
            return true;
        }
        if (!mongoose.Types.ObjectId.isValid(item.book)) {
            return true;
        }
        // Check if book exists in the database
    }
    return false;
}


const hashPassword = async (password) => {
    const hashedPassword = await bycrapt.hash(password, 8);
    return hashedPassword;
};

const isPasswordCorrect = async (password, hashedPassword) => {
    return await bycrapt.compare(password, hashedPassword);
};

export {
    createJSONResponse,
    hashPassword,
    isPasswordCorrect
};
