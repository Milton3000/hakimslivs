import mongoose from 'mongoose';
import { ProductModel } from '../models/Products.js';

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
    const productsToAdd = [
        {
            category: "Mejeri",
            title: "Mjölk",
            supplier: "Arla",
            description: "3% Mjölk",
            imageUrl: "https://example.com/product1.jpg",
            weight: 1000,
            quantity: 200,
            price: 12,
            origin: "",
            TOC: ["Tag 1", "Tag 2"]
        },
        {
            category: "Snacks & Godis",
            title: "Chips",
            supplier: "OLW",
            description: "Sourcream & Onion",
            imageUrl: "https://example.com/product2.jpg",
            weight: 1000,
            quantity: 150,
            price: 28,
            origin: "",
            TOC: ["Tag 1", "Tag 2"]
        },
        // Lägg till fler produkter här
    ];

    // Loop through productsToAdd and add each product to the databas
    for (const productData of productsToAdd) {
        try {
            const product = new ProductModel(productData);
            const savedProduct = await product.save();
            console.log("Product added to the database:", savedProduct);
        } catch (err) {
            console.error("Error saving product:", err);
        }
    }
});