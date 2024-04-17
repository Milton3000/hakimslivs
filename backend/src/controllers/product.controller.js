import Product from '../models/product.model.js';
import { productErrorHandler } from '../utils/apiHelpers.js';

// Fetcha alla produkter
async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getProductsByName(req, res) {
    try {
        const { name } = req.query;
        let products;

        if (name) {
            const regex = new RegExp(name, 'i');
            products = await Product.find({ title: regex });
        } else {
            products = await Product.find();
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Fetcha en specifik produkt

async function getProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        productErrorHandler(error, res);
    }
}


// Fetcha en produkt baserat på kategori

async function getProductByCategory(req, res) {
    try {
        const category = decodeURIComponent(req.params.category);
        const products = await Product.find({ category: category });
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this category' });
        }
        res.status(200).json(products);
    }
    catch (error) {
        productErrorHandler(error, res);
    }
}


// Skapa en produkt

async function createProduct(req, res) {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        productErrorHandler(error, res);
    }
}

// Uppdatera en produkt

async function updateProduct(req, res) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        productErrorHandler(error, res);
    }
}

// Ta bort en produkt

async function deleteProduct(req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        productErrorHandler(error, res);
    }
}



export { getProducts, getProductsByName, getProduct, getProductByCategory, createProduct, updateProduct, deleteProduct };
