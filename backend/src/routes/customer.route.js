import express from 'express';
import { registerCustomer, getCustomers } from '../controllers/customer.controller.js';
const customerRouter = express.Router();

customerRouter.post('/register', registerCustomer);
customerRouter.get('/all', getCustomers);

export { customerRouter };
