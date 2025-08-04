import Author from "../models/author.js";

const getAllAuthors = async () => {
    return await Author.find();
}

const getAuthorById = async (id) => {
    return await Author.findById(id);
}

const isAuthorExists = async (id) => {
    const author = await Author.findById(id);
    return !!author;
}

const createAuthor = async (authorData) => {
    const author = new Author(authorData);
    return await author.save();
}

const updateAuthor = async (id, authorData) => {
    return await Author.findByIdAndUpdate(id, authorData, { new: true });
}

const deleteAuthor = async (id) => {
    return await Author.findByIdAndDelete(id);
}

export {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    isAuthorExists
}