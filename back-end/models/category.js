import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true, // adds createdAt and updatedAt,
    versionKey: false // disables the __v field
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
