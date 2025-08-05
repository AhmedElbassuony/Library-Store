import {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
} from "../services/authorService.js";

import mongoose from "mongoose";
import { createJSONResponse } from "../utils/index.js";
import { updateAuthorValidation, createAuthorValidation } from "../utils/validation/index.js";

const getAuthors = async (req, res) => {
    try {
        const authors = await getAllAuthors();
        res.status(200).json(createJSONResponse(true, 'Authors retrieved successfully', authors));
    } catch (error) {
        res.status(500).json(createJSONResponse(false, error.message));
    }
}

const getAuthor = async (req, res) => {
    const authorId = req.params.id;
    if (!authorId || !mongoose.Types.ObjectId.isValid(authorId)) {
        return res.status(400).json(createJSONResponse(false, 'Invalid author ID'));
    }
    try {
        const author = await getAuthorById(authorId);
        if (!author) {
            return res.status(404).json(createJSONResponse(false, 'Author not found'));
        }
        res.status(200).json(createJSONResponse(true, 'Author retrieved successfully', author));
    } catch (error) {
        res.status(500).json(createJSONResponse(false, error.message));
    }
}

const createNewAuthor = async (req, res) => {
    const authorData = req.body;
    if (!authorData || typeof authorData !== 'object') {
        return res.status(400).json(createJSONResponse(false, 'Invalid author data'));
    }
    const { isValid, errors } = createAuthorValidation(authorData);
    if (!isValid) {
        return res.status(400).json(createJSONResponse(false, 'Validation errors', errors));
    }
    try {
        const newAuthor = await createAuthor(authorData);
        res.status(201).json(createJSONResponse(true, 'Author created successfully', newAuthor));
    } catch (error) {
        res.status(500).json(createJSONResponse(false, error.message));
    }
}

const updateExistingAuthor = async (req, res) => {
    const authorId = req.params.id;
    if (!authorId || !mongoose.Types.ObjectId.isValid(authorId)) {
        return res.status(400).json(createJSONResponse(false, 'Invalid author ID'));
    }
    const authorData = req.body;
    if (!authorData || typeof authorData !== 'object') {
        return res.status(400).json(createJSONResponse(false, 'Invalid author data'));
    }
    const { isValid, errors } = updateAuthorValidation(authorData);
    if (!isValid) {
        return res.status(400).json(createJSONResponse(false, 'Validation errors', errors));
    }
    try {
        const updatedAuthor = await updateAuthor(authorId, authorData);
        if (!updatedAuthor) {
            return res.status(404).json(createJSONResponse(false, 'Author not found'));
        }
        res.status(200).json(createJSONResponse(true, 'Author updated successfully', updatedAuthor));
    } catch (error) {
        res.status(500).json(createJSONResponse(false, error.message));
    }
}

const deleteExistingAuthor = async (req, res) => {
    const authorId = req.params.id;
    if (!authorId || !mongoose.Types.ObjectId.isValid(authorId)) {
        return res.status(400).json(createJSONResponse(false, 'Invalid author ID'));
    }
    try {
        const deletedAuthor = await deleteAuthor(authorId);
        if (!deletedAuthor) {
            return res.status(404).json(createJSONResponse(false, 'Author not found'));
        }
        res.status(200).json(createJSONResponse(true, 'Author deleted successfully', deletedAuthor));
    } catch (error) {
        res.status(500).json(createJSONResponse(false, error.message));
    }
}

export {
    getAuthors,
    getAuthor,
    createNewAuthor,
    updateExistingAuthor,
    deleteExistingAuthor
};