import express from 'express';
const customerRouter = express.Router();
import { createCustomer } from '../controllers/customer.controller.js';


customerRouter.post('/register', createCustomer);


export { customerRouter };
