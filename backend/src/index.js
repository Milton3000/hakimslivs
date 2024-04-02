import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { customerRouter } from './routes/customer.route';
import { productRouter } from './routes/product.route';
import { authRouter } from './routes/auth.route';

// Kan skippa sen, behöver bara fixa problemet med att produkterna in laddas. 
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
};





// Load environment variables from .env file
dotenv.config();

const app = express();

// Apply middleware för att konvertera till json när man skickar data från frontend. 
app.use(express.json());
app.use(cors(corsOptions));
// app.use(cors()); ORGINALET


app.use("/api/auth", authRouter); // Endpoint för authentication (routes > users.js)
app.use("/api/products", productRouter);
app.use("/api/customers", customerRouter);

// Använder environment variable för MongoDB Password.
const mongoDBPassword = process.env.MONGODB_PASSWORD;


mongoose.connect(`mongodb+srv://Milton:${mongoDBPassword}@hakimcluster.jkjs7d2.mongodb.net/hakimslivs`);

app.listen(3001, () => console.log("SERVER HAS STARTED!"));
