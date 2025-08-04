import express from 'express';
import {
    getAllBooksController,
    getBookByIdController,
    createBookController,
    updateBookController,
    deleteBookController,
    getBooksByCategoryController,
    getBooksByAuthorController
} from '../controllers/bookController.js';
import { admin, authenticated } from '../utils/middleware/index.js';

const bookRouter = express.Router();
bookRouter.get('/', authenticated, getAllBooksController);
bookRouter.post('/', authenticated, admin, createBookController);
bookRouter.get('/:id', authenticated, getBookByIdController);
bookRouter.put('/:id', authenticated, admin, updateBookController);
bookRouter.delete('/:id', authenticated, admin, deleteBookController);
bookRouter.get('/category/:categoryId', authenticated, getBooksByCategoryController);
bookRouter.get('/author/:authorId', authenticated, getBooksByAuthorController);
export default bookRouter;