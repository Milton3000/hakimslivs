import express from 'express';
import { registerUser, getUser } from '../controllers/user.controller.js';
const userRouter = express.Router();

userRouter.post('/registeruser', registerUser);
userRouter.get('/users', getUser);

export { userRouter };
