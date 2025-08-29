import React, { useState } from 'react';
import StockSelector from './components/StockSelector';
import StockChart from './components/StockChart';
import RiskRewardDashboard from './components/RiskRewardDashboard';

function App() {
  const [selectedStock, setSelectedStock] = useState('');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f4f7fa', minHeight: '100vh', padding: '30px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1f2937', fontSize: '2.5rem', fontWeight: 'bold' }}>
          DailyTrades Dashboard
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1rem' }}>Track stocks, indicators, and risk/reward analysis in real-time</p>
      </header>

      {/* Stock Selector */}
      <div style={{ maxWidth: '400px', margin: '0 auto 40px auto', textAlign: 'center' }}>
        <StockSelector onSelect={setSelectedStock} />
      </div>

      {selectedStock && (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Chart Card */}
          <div style={{
            flex: '1 1 600px',
            background: '#ffffff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}>
            <h2 style={{ marginBottom: '15px', color: '#111827' }}>{selectedStock} Chart</h2>
            <StockChart symbol={selectedStock} />
          </div>

          {/* Risk/Reward Card */}
          <div style={{
            flex: '1 1 300px',
            background: '#ffffff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            height: 'fit-content'
          }}>
            <h2 style={{ marginBottom: '15px', color: '#111827' }}>Risk / Reward</h2>
            <RiskRewardDashboard symbol={selectedStock} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
