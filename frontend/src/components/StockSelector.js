import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function StockSelector({ onSelect }) {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
     api.get('/stocks/top500')
      .then(res => setStocks(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <select onChange={e => onSelect(e.target.value)} style={{ padding: '8px', marginBottom: '20px' }}>
      <option value="">Select Stock</option>
      {stocks.map(stock => (
        <option key={stock.symbol} value={stock.symbol}>
          {stock.symbol} - {stock.name}
        </option>
      ))}
    </select>
  );
}
