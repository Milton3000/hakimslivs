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
            title: "Product 1",
            brand: "Brand 1",
            description: "Description for Product 1",
            imageUrl: "https://example.com/product1.jpg",
            weight: 100,
            quantity: 10,
            price: 19.99,
            origin: "Origin 1",
            TOC: ["Tag 1", "Tag 2"]
        },
        // Lägg till fler produkter här
    ];

    // Add each product to the database
    productsToAdd.forEach(async (productData) => {
        try {
            const product = new ProductModel(productData);
            const savedProduct = await product.save();
            console.log("Product added to the database:", savedProduct);
        } catch (err) {
            console.error("Error saving product:", err);
        }
    });
});
