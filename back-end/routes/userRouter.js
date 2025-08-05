import express from 'express';
import {
    getUsers,
    registerUser,
    getUserByIdController,
    signInUser,
    updateUserController,
    deleteUserController,
    getCart,
    clearCartController,
    putCartController,
    removeBookFromCartController
} from '../controllers/userController.js';
import { admin, authenticated, hasAccess } from '../utils/middleware/index.js';
import { addBookToCartController } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.get('/', authenticated, admin, getUsers);
userRouter.post('/', registerUser);
userRouter.post('/signin', signInUser);

userRouter.get('/cart', authenticated, getCart);
userRouter.post('/cart', authenticated, putCartController);
userRouter.put('/cart', authenticated, addBookToCartController);
userRouter.delete('/cart', authenticated, clearCartController);
userRouter.delete('/cart/:bookId', authenticated, removeBookFromCartController);

userRouter.get('/:id', authenticated, hasAccess, getUserByIdController);
userRouter.put('/:id', authenticated, hasAccess, updateUserController);
userRouter.delete('/:id', authenticated, hasAccess, deleteUserController);

export default userRouter;
