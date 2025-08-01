import express from 'express';
import { getUsers, registerUser, getUserByIdController, signInUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/', registerUser);
userRouter.get('/:id', getUserByIdController);
userRouter.post('/signin', signInUser);
export default userRouter;
