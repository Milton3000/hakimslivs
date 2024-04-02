import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct, getProductByCategory } from '../controllers/product.controller.js';
const productRouter = express.Router();

productRouter.get('/all', getProducts);
productRouter.get('/:id', getProduct);
productRouter.get('/:category', getProductByCategory);
productRouter.post('/new', createProduct);
productRouter.put('/update:id', updateProduct);
productRouter.delete('/delete:id', deleteProduct);

export { productRouter };