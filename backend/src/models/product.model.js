import mongoose from "mongoose";


// Product Schema för Produkter.
const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    unit: { type: String, required: true },
    weight: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    origin: { type: String },
    TOC: [{ type: String, required: true }],
    unit_price: { type: Number, required: true }
    
});


const Product = mongoose.model("Product", productSchema); 

export default Product; 