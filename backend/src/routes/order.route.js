import express from 'express';
import { createOrder, getOrders } from '../controllers/order.controller.js'
const orderRouter = express.Router();

orderRouter.post('/neworder', createOrder);

orderRouter.get('/allorders', getOrders);

export { orderRouter };