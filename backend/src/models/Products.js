import mongoose from "mongoose";


// Product Schema för Produkter.
const ProductSchema = new mongoose.Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    supplier: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    weight: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    origin: { type: String, required: true },
    TOC: [{ type: String, required: true }],
});



const ProductModel = mongoose.model("products", ProductSchema); // Initialize RecipeModel First

export { ProductModel }; // Export RecipeModel after initialization