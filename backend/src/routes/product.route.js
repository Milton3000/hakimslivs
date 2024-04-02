import express from 'express';
import { ProductModel } from '../models/Products.js';

const router = express.Router();

// Fetcha alla produkter
router.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router as productRouter };
