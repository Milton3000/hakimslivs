import express from 'express';
import { userLogin, registerUser } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/login', userLogin);
authRouter.post('/register', registerUser);

export { authRouter };
