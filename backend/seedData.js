import mongoose from 'mongoose';
import Product from './src/models/product.model.js';
import fs from 'fs';
import path from 'path';

// MongoDB connection setup
mongoose.connect("mongodb+srv://Milton:potatis@hakimcluster.jkjs7d2.mongodb.net/hakimslivs", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
    console.log("Connected to MongoDB database!");

    // Array of products to be added to the database
    const productsToAdd = JSON.parse(fs.readFileSync(path.resolve('./data/frukt.json'), 'utf-8'));

  

    // Loop through productsToAdd and add each product to the databas
    for (const productData of productsToAdd) {
        try {
            const product = new Product(productData);
            const savedProduct = await product.save();
            console.log("Product added to the database:", savedProduct);
        } catch (err) {
            console.error("Error saving product:", err);
        }
    }
});