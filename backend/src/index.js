import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { customerRouter } from './routes/customer.route.js';
import { productRouter } from './routes/product.route.js';
import { authRouter } from './routes/auth.route.js';

// Load environment variables from .env file
dotenv.config();


const app = express();

// Enable CORS middleware
app.use(cors()); 


// Apply middleware för att konvertera till json när man skickar data från frontend. 
app.use(express.json());


app.use("/api/auth", authRouter); // Endpoint för authentication (routes > users.js)
app.use("/api/products", productRouter);
app.use("/api/customers", customerRouter);

// Använder environment variable för MongoDB Password.
const mongoDBPassword = process.env.MONGODB_PASSWORD;

const mongoDBURI = `mongodb+srv://Milton:${mongoDBPassword}@hakimcluster.jkjs7d2.mongodb.net/hakimslivs`;

mongoose.connect(mongoDBURI);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});