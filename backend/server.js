import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import stockRoutes from './routes/stock.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
})
.catch(err => console.error(err));
