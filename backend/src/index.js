import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { customerRouter } from './routes/customer.route.js';
import { productRouter } from './routes/product.route.js';
import { authRouter } from './routes/auth.route.js';
import { orderRouter } from './routes/order.route.js'
import { userRouter } from './routes/user.route.js'

// Load environment variables from .env file
dotenv.config();

const app = express();

// Define allowed origins
const allowedOrigins = ['https://hakimslivs.vercel.app', 'http://localhost:3000', 'http://localhost:3001'];


// Enable CORS middleware with allowed origins
app.use(cors({
  origin: allowedOrigins
}));

// Apply middleware to convert data to JSON when sent from the frontend
app.use(express.json());

app.use("/api/auth", authRouter); // Endpoint for authentication (routes > users.js)
app.use("/api/products", productRouter);
app.use("/api/customers", customerRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);

// Use environment variable for MongoDB Password
const mongoDBPassword = process.env.MONGODB_PASSWORD;

const mongoDBURI = process.env.MONGODB_URI || `mongodb+srv://Milton:${mongoDBPassword}@bustercluster.nso9m.mongodb.net/hakimslivs?retryWrites=true&w=majority&appName=Bustercluster`;

mongoose.connect(mongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
