import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


import { userRouter } from './routes/users.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Apply middleware för att konvertera till json när man skickar data från frontend. 
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter); // Endpoint för authentication (routes > users.js)

// Använder environment variable för MongoDB Password.
const mongoDBPassword = process.env.MONGODB_PASSWORD;



mongoose.connect(`mongodb+srv://Milton:${mongoDBPassword}@hakimcluster.jkjs7d2.mongodb.net/hakimslivs`);

app.listen(3001, () => console.log("SERVER HAS STARTED!"));
