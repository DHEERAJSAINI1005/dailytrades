import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Stock from './models/Stock.js';

dotenv.config();

const stocksData = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    prices: [
      { date: new Date(), open: 150, high: 155, low: 148, close: 153, volume: 10000 },
      { date: new Date(Date.now() - 86400000), open: 148, high: 152, low: 147, close: 150, volume: 9000 },
      { date: new Date(Date.now() - 2*86400000), open: 149, high: 151, low: 146, close: 148, volume: 8500 },
    ],
    indicators: { RSI: 60, EMA10: 151, EMA20: 150, EMA50: 148, EMA200: 140 },
    riskReward: { risk: 2, reward: 5 },
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    prices: [
      { date: new Date(), open: 300, high: 310, low: 295, close: 305, volume: 12000 },
      { date: new Date(Date.now() - 86400000), open: 295, high: 305, low: 290, close: 300, volume: 11000 },
    ],
    indicators: { RSI: 55, EMA10: 302, EMA20: 300, EMA50: 295, EMA200: 280 },
    riskReward: { risk: 3, reward: 6 },
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    prices: [
      { date: new Date(), open: 2800, high: 2850, low: 2780, close: 2825, volume: 5000 },
      { date: new Date(Date.now() - 86400000), open: 2770, high: 2820, low: 2750, close: 2800, volume: 4800 },
    ],
    indicators: { RSI: 50, EMA10: 2810, EMA20: 2795, EMA50: 2750, EMA200: 2600 },
    riskReward: { risk: 4, reward: 7 },
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    prices: [
      { date: new Date(), open: 3400, high: 3450, low: 3380, close: 3420, volume: 8000 },
      { date: new Date(Date.now() - 86400000), open: 3380, high: 3420, low: 3350, close: 3400, volume: 7500 },
    ],
    indicators: { RSI: 58, EMA10: 3410, EMA20: 3390, EMA50: 3350, EMA200: 3200 },
    riskReward: { risk: 3, reward: 6 },
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    prices: [
      { date: new Date(), open: 700, high: 720, low: 690, close: 710, volume: 15000 },
      { date: new Date(Date.now() - 86400000), open: 680, high: 700, low: 670, close: 695, volume: 14000 },
    ],
    indicators: { RSI: 65, EMA10: 705, EMA20: 690, EMA50: 680, EMA200: 650 },
    riskReward: { risk: 5, reward: 10 },
  },
];

const seedStocks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Delete all previous records
    await Stock.deleteMany({});
    console.log('Previous records deleted');

    // Insert new dummy stocks
    await Stock.insertMany(stocksData);
    console.log('New dummy stocks added');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedStocks();
