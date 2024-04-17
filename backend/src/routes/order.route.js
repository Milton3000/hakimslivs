import express from 'express';
import { createOrder, getOrders, updateOrder } from '../controllers/order.controller.js'
const orderRouter = express.Router();

orderRouter.post('/neworder', createOrder);

orderRouter.get('/allorders', getOrders);

orderRouter.put('/update/:id', updateOrder);

export { orderRouter };