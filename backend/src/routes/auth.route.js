import express from 'express';
import { customerLogin } from '../controllers/auth.controller.js';
const authRouter = express.Router();

authRouter.post('/customerLogin', customerLogin);

export { authRouter };