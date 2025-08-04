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
    putCartController
} from '../controllers/userController.js';
import { admin, authenticated, hasAccess } from '../utils/middleware/index.js';

const userRouter = express.Router();

userRouter.get('/',authenticated,admin, getUsers);
userRouter.post('/', registerUser);
userRouter.get('/:id', authenticated, hasAccess, getUserByIdController);
userRouter.put('/:id', authenticated, hasAccess, updateUserController);
userRouter.delete('/:id', authenticated, hasAccess, deleteUserController);
userRouter.post('/signin', signInUser);

userRouter.get('/cart', authenticated, getCart);
userRouter.put('/cart', authenticated, putCartController);
userRouter.delete('/cart', authenticated, clearCartController);
export default userRouter;
