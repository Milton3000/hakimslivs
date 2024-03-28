import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// Apply middleware för att konvertera till json när man skickar data från frontend. 

app.use(express.json());
app.use(cors());

app.listen(3001, () => console.log("SERVER HAS STARTED!"));