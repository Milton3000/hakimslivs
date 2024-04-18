import express from 'express';
import { userLogin } from '../controllers/auth.controller.js';
const authRouter = express.Router();

authRouter.post('/userLogin', userLogin);

export { authRouter };