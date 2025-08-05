import mongoose from "mongoose";
import { createJSONResponse } from "../utils/index.js";
import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getBooksByCategory,
    getBooksByAuthor
} from "../services/bookService.js";
import { createBookValidation, updateBookValidation } from "../utils/validation/index.js";


const getAllBooksController = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.json(createJSONResponse(true, 'Books retrieved successfully', books));
    } catch (error) {
        return res.status(500).json(createJSONResponse(false, 'Error retrieving books', error.message));
    }
}

const getBookByIdController = async (req, res) => {
    const bookId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json(createJSONResponse(false, 'Invalid book ID'));
    }
    try {
        const book = await getBookById(bookId);
        if (!book) {
            return res.status(404).json(createJSONResponse(false, 'Book not found'));
        }
        return res.json(createJSONResponse(true, 'Book retrieved successfully', book));
    } catch (error) {
        return res.status(500).json(createJSONResponse(false, 'Error retrieving book', error.message));
    }
}

const createBookController = async (req, res) => {
    const bookData = req.body;
    if (!bookData || typeof bookData !== 'object') {
        return res.status(400).json(createJSONResponse(false, 'Invalid book data'));
    }
    const { isValid, errors } = createBookValidation(bookData);
    if (!isValid) {
        return res.status(400).json(createJSONResponse(false, 'Validation errors', errors));
    }
    try {
        const newBook = await createBook(bookData);
        return res.status(201).json(createJSONResponse(true, 'Book created successfully', newBook));
    } catch (error) {
        return res.status(500).json(createJSONResponse(false, 'Error creating book', error.message));
    }
}

const updateBookController = async (req, res) => {
    const bookId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json(createJSONResponse(false, 'Invalid book ID'));
    }
    const bookData = req.body;
    if (!bookData || typeof bookData !== 'object') {
        return res.status(400).json(createJSONResponse(false, 'Invalid book data'));
    }
    const { isValid, errors } = updateBookValidation(bookData);
    if (!isValid) {
        return res.status(400).json(createJSONResponse(false, 'Validation errors', errors));
    }
    try {
        const updatedBook = await updateBook(bookId, bookData);
        if (!updatedBook) {
            return res.status(404).json(createJSONResponse(false, 'Book not found'));
        }
        return res.json(createJSONResponse(true, 'Book updated successfully', updatedBook));
    } catch (error) {
        return res.status(500).json(createJSONResponse(false, 'Error updating book', error.message));
    }
}

const deleteBookController = async (req, res) => {
    const bookId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json(createJSONResponse(false, 'Invalid book ID'));
    }
    try {
        const deletedBook = await deleteBook(bookId);
        if (!deletedBook) {
            return res.status(404).json(createJSONResponse(false, 'Book not found'));
        }
        return res.json(createJSONResponse(true, 'Book deleted successfully', deletedBook));
    } catch (error) {
        return res.status(500).json(createJSONResponse(false, 'Error deleting book', error.message));
    }
}

const getBooksByCategoryController = async (req, res) => {
    const categoryId = req.params.categoryId;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json(createJSONResponse(false, 'Invalid category ID'));
    }
    try {
        const books = await getBooksByCategory(categoryId);
        return res.json(createJSONResponse(true, 'Books retrieved successfully', books));
    } catch (error) {
        return res.status(500).json(createJSONResponse(false, 'Error retrieving books by category', error.message));
    }
}

const getBooksByAuthorController = async (req, res) => {
    const authorId = req.params.authorId;
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
        return res.status(400).json(createJSONResponse(false, 'Invalid author ID'));
    }
    try {
        const books = await getBooksByAuthor(authorId);
        return res.json(createJSONResponse(true, 'Books retrieved successfully', books));
    } catch (error) {
        return res.status(500).json(createJSONResponse(false, 'Error retrieving books by author', error.message));
    }
}



export {
    getAllBooksController,
    getBookByIdController,
    createBookController,
    updateBookController,
    deleteBookController,
    getBooksByCategoryController,
    getBooksByAuthorController
};
