import Stock from '../models/Stock.js';
import { calculateEMA, calculateRSI } from '../utils/indicators.js';

export const getStockIndicators = async (req, res) => {
  try {
    const { symbol } = req.params;
    const stock = await Stock.findOne({ symbol });
    if (!stock) return res.status(404).json({ message: 'Stock not found' });

    // ✅ Fix: use 'prices' instead of 'priceData'
    const closePrices = stock.prices.map(d => d.close);

    const ema10 = calculateEMA(closePrices, 10);
    const ema20 = calculateEMA(closePrices, 20);
    const ema50 = calculateEMA(closePrices, 50);
    const ema200 = calculateEMA(closePrices, 200);
    const rsi = calculateRSI(closePrices, 14);

    res.json({
      prices: stock.prices,
      indicators: { EMA10: ema10, EMA20: ema20, EMA50: ema50, EMA200: ema200, RSI: rsi },
      riskReward: stock.riskReward,
    });
  } catch (error) {
    console.error('Error in getStockIndicators:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getTop500 = async (req, res) => {
  try {
    const stocks = await Stock.find().limit(500);
    res.json(stocks);
  } catch (error) {
    console.error('Error in getTop500:', error);
    res.status(500).json({ error: error.message });
  }
};
