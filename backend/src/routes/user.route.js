// user.route.js

import express from 'express';
import { getUser } from '../controllers/user.controller.js';
import authenticateUser from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

// Apply the authentication middleware to the /admin route
userRouter.get('/admin', authenticateUser, getUser);
userRouter.get('/', getUser);

export { userRouter };
