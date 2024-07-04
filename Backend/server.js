import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
import router from './Routes/taskRoute.js';
import authrouter from './Routes/authRoute.js';

// Middleware for routes
app.use('/api/v1/auth', authrouter);
app.use('/api/v1/task', router);

app.get('/', (req, res) => {
  res.send("<h1>This is our Health API and is working fine!</h1>");
});

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
