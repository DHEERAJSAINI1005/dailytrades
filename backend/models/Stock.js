// models/Stock.js
import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
  date: Date,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number,
});

const stockSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  prices: [priceSchema], // ✅ this must match the controller
  indicators: Object,
  riskReward: Object,
});

export default mongoose.model('Stock', stockSchema);
