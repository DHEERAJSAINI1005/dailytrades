export const calculateEMA = (prices, period) => {
    let k = 2 / (period + 1);
    let emaArray = [prices[0]];
    for (let i = 1; i < prices.length; i++) {
        emaArray.push(prices[i] * k + emaArray[i - 1] * (1 - k));
    }
    return emaArray;
};

export const calculateRSI = (prices, period = 14) => {
    let gains = 0, losses = 0;
    for (let i = 1; i <= period; i++) {
        let diff = prices[i] - prices[i - 1];
        if (diff >= 0) gains += diff;
        else losses -= diff;
    }
    let avgGain = gains / period;
    let avgLoss = losses / period;
    let rsi = [100 - 100 / (1 + avgGain / avgLoss)];

    for (let i = period + 1; i < prices.length; i++) {
        let diff = prices[i] - prices[i - 1];
        if (diff >= 0) {
            avgGain = (avgGain * (period - 1) + diff) / period;
            avgLoss = (avgLoss * (period - 1)) / period;
        } else {
            avgGain = (avgGain * (period - 1)) / period;
            avgLoss = (avgLoss * (period - 1) - diff) / period;
        }
        rsi.push(100 - 100 / (1 + avgGain / avgLoss));
    }
    return rsi;
};
