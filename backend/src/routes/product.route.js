import express from 'express';
const productRouter = express.Router();
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

productRouter.get('/products', getProducts);
productRouter.get('/product:id', getProduct);
productRouter.get('/products/:category', getProductByCategory);
productRouter.post('/newProduct', createProduct);
productRouter.put('/updateProduct:id', updateProduct);
productRouter.delete('/deleteProduct:id', deleteProduct);

export { productRouter };