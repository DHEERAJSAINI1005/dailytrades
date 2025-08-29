import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { api } from '../api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StockChart({ symbol }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await api.get(`/stocks/${symbol}/indicators`);
        const prices = res.data.prices;
        const indicators = res.data.indicators;

        const data = {
          labels: prices.map(p => new Date(p.date).toLocaleDateString()),
          datasets: [
            {
              label: 'Close Price',
              data: prices.map(p => p.close),
              borderColor: 'blue',
              fill: false,
            },
            {
              label: 'EMA10',
              data: prices.map(() => indicators.EMA10),
              borderColor: 'green',
              fill: false,
            },
            {
              label: 'EMA20',
              data: prices.map(() => indicators.EMA20),
              borderColor: 'orange',
              fill: false,
            },
            {
              label: 'EMA50',
              data: prices.map(() => indicators.EMA50),
              borderColor: 'purple',
              fill: false,
            },
            {
              label: 'EMA200',
              data: prices.map(() => indicators.EMA200),
              borderColor: 'red',
              fill: false,
            },
          ],
        };

        setChartData(data);
      } catch (err) {
        console.error('Error fetching stock indicators:', err);
      }
    };

    fetchStock();
  }, [symbol]);

  if (!chartData) return <div>Loading chart...</div>;

  return <Line data={chartData} />;
}
