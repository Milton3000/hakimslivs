import express from 'express';
import { createOrder, getOrders, updateOrder, addProductToOrder, deleteProductFromOrder, deleteOrder } from '../controllers/order.controller.js'
const orderRouter = express.Router();

orderRouter.post('/neworder', createOrder);

orderRouter.get('/allorders', getOrders);

orderRouter.put('/update/:id', updateOrder);

orderRouter.put('/addproduct/:id', addProductToOrder);

orderRouter.put('/deleteproduct/:id/:productId', deleteProductFromOrder);

orderRouter.delete('/delete/:id', deleteOrder);

export { orderRouter };