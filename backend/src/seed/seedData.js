import mongoose from 'mongoose';
import Product from '../models/product.model.js';

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
            title: "Alpro Soja Mjölk",
            supplier: "Alpro",
            description: "Laktosfri Mjölk",
            imageUrl: "https://productimages.motatos.com/MS214363/ms214363_12312333png-781ee242-5058-464a-9751-3beab8ab2c98.png?tr=w-2034h-2034",
            weight: 1000,
            quantity: 200,
            price: 14,
            origin: "",
            TOC: ["Tag 1", "Tag 2"]
        },
        {
            category: "Snacks & Godis",
            title: "Svenska LantChips",
            supplier: "Lantchips",
            description: "Gräddfil",
            imageUrl: "https://productimages.motatos.com/7392659004557/7392659004557-utgaende-lantchips-eko-retro-sourcream-1jpg-3f830ef0-2b86-4534-be6f-8cba17626f36.jpg?tr=w-2034h-2034",
            weight: 1000,
            quantity: 150,
            price: 28,
            origin: "",
            TOC: ["Tag 1", "Tag 2"]
        },
        {
            category: "Dryck",
            title: "Pepsi Max",
            supplier: "Pepsi",
            description: "Läskdryck",
            imageUrl: "https://productimages.motatos.com/MS211023/ms211023-f0f1e6b6-89c4-4282-9cb6-ace581a91bb2.jpg?tr=w-2034h-2034",
            weight: 1000,
            quantity: 200,
            price: 8.99,
            origin: "",
            TOC: ["Tag 1", "Tag 2"]
        },
        {
            category: "Snacks & Godis",
            title: "Tutti Frutti",
            supplier: "Fazer",
            description: "Gelatinfritt Godis",
            imageUrl: "https://productimages.motatos.com/MS228865/ms224575_132123123png-ce4c2dee-b25d-46d0-ab0b-b0cbda6be97c.png?tr=w-2034h-2034",
            weight: 100,
            quantity: 300,
            price: 5,
            origin: "",
            TOC: ["Tag 1", "Tag 2"]
        },
        {
            category: "Snacks & Godis",
            title: "Marabou",
            supplier: "Marabou",
            description: "Choklad",
            imageUrl: "https://productimages.motatos.com/MS104210/mjolkchokladkingsize.jpg?tr=w-2034h-2034",
            weight: 800,
            quantity: 400,
            price: 9.99,
            origin: "",
            TOC: ["Tag 1", "Tag 2"]
        },
        {
            category: "Mejeri",
            title: "Taco Tubs Kit",
            supplier: "Santa Maria",
            description: "Tacoskal",
            imageUrl: "https://productimages.motatos.com/MS108048/tacobrod.jpg?tr=w-2034h-2034",
            weight: 500,
            quantity: 150,
            price: 19.99,
            origin: "",
            TOC: ["Tag 1", "Tag 2"]
        },
        // Lägg till fler produkter här
    ];

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