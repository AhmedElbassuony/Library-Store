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

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/', registerUser);
userRouter.get('/:id', getUserByIdController);
userRouter.put('/:id', updateUserController);
userRouter.delete('/:id', deleteUserController);
userRouter.post('/signin', signInUser);

userRouter.get('/cart', getCart);
userRouter.put('/cart', putCartController);
userRouter.delete('/cart', clearCartController);
export default userRouter;
