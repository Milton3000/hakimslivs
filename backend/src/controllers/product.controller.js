import Product from '../models/product.model.js';

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

// Fetcha en specifik produkt

async function getProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// Fetcha en produkt baserat på kategori

async function getProductByCategory(req, res) {
    try {
        const products = await Product.find({ category: req.params.category });
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this category' });
        }
        res.status(200).json(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// Skapa en produkt

async function createProduct(req, res) {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Uppdatera en produkt

async function updateProduct(req, res) {
    try {
        const product = await
            Product.findByIdAndUpdate(req
                .params
                .id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
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
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { getProducts, getProduct, getProductByCategory, createProduct, updateProduct, deleteProduct };
