import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    dateOfBirth: Date,
    nationality: {
        type: String,
        trim: true,
        lowercase: true
    },
    profilePicture: String
}, {
    timestamps: true // includes createdAt and updatedAt
});

const Author = mongoose.model("Author", authorSchema);

export default Author;
