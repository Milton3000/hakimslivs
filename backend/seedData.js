import mongoose from 'mongoose';
import Product from './src/models/product.model.js'; // Make sure the path to your model is correct
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// MongoDB connection setup
const mongoDBURI = process.env.MONGODB_URI || `mongodb+srv://Milton:${mongoDBPassword}@bustercluster.nso9m.mongodb.net/hakimslivs`;

mongoose.connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
    console.log("Connected to MongoDB database!");

    // Load product data from JSON file
    const productsToAdd = JSON.parse(fs.readFileSync(path.resolve('./data/frukt.json'), 'utf-8'));

    // Loop through productsToAdd and add each product to the database
    for (const productData of productsToAdd) {
        try {
            const product = new Product(productData);
            const savedProduct = await product.save();
            console.log("Product added to the database:", savedProduct);
        } catch (err) {
            console.error("Error saving product:", err);
        }
    }
    
    // Close the connection when done
    mongoose.connection.close();
    console.log("Database connection closed.");
});
