import mongoose from 'mongoose';
import Product from './src/models/product.model.js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// MongoDB connection setup
const mongoDBPassword = process.env.MONGODB_PASSWORD;
const mongoDBURI = `mongodb+srv://Milton:${mongoDBPassword}@bustercluster.nso9m.mongodb.net/hakimslivs`;

mongoose.connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
    console.log("Connected to MongoDB database!");

    // List of JSON files to read, excluding frukt.json
    const jsonFiles = [
        './data/chark.json', 
        './data/dryck.json', 
        './data/mejeri.json', 
        './data/snacks&godis.json', 
        './data/torrvaror.json'
    ];

    // Loop through each JSON file and add its contents to the database
    for (const file of jsonFiles) {
        const productsToAdd = JSON.parse(fs.readFileSync(path.resolve(file), 'utf-8'));

        for (const productData of productsToAdd) {
            try {
                const product = new Product(productData);
                const savedProduct = await product.save();
                console.log("Product added to the database:", savedProduct);
            } catch (err) {
                console.error("Error saving product:", err);
            }
        }
    }
    
    // Close the connection when done
    mongoose.connection.close();
    console.log("Database connection closed.");
});
