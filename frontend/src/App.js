import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import StockSelector from './components/StockSelector';
import StockChart from './components/StockChart';
import RiskRewardDashboard from './components/RiskRewardDashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [selectedStock, setSelectedStock] = useState('');

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const handleLogout = () => {
    setToken('');
    setSelectedStock('');
  };

  if (!token) return <Login setToken={setToken} />;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f0f4f8', minHeight: '100vh', padding: '30px' }}>
      
      {/* Header */}
      <header
        style={{
          textAlign: 'center',
          marginBottom: '40px',
          padding: '30px',
          borderRadius: '12px',
          background: 'linear-gradient(to right, #6a11cb, #2575fc)',
          color: '#fff',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>DailyTrades Dashboard</h1>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)' }}>
          Track stocks, indicators, and risk/reward analysis in real-time
        </p>
        <button
          onClick={handleLogout}
          style={{
            marginTop: '15px',
            padding: '8px 15px',
            borderRadius: '8px',
            cursor: 'pointer',
            border: 'none',
            background: '#ff4d4f',
            color: '#fff',
            fontWeight: 'bold',
            transition: '0.3s',
          }}
          onMouseOver={(e) => (e.target.style.background = '#d9363e')}
          onMouseOut={(e) => (e.target.style.background = '#ff4d4f')}
        >
          Logout
        </button>
      </header>

      {/* Stock Selector */}
      <div style={{ maxWidth: '400px', margin: '0 auto 50px auto', textAlign: 'center' }}>
        <StockSelector token={token} onSelect={setSelectedStock} />
      </div>

      {/* Dashboard Cards */}
      {selectedStock && (
        <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'center' }}>
          
          {/* Chart Card */}
          <div
            style={{
              flex: '1 1 600px',
              background: '#fff',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>{selectedStock} Chart</h2>
            <StockChart symbol={selectedStock} token={token} />
          </div>

          {/* Risk/Reward Card */}
          <div
            style={{
              flex: '1 1 300px',
              background: '#fff',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
              height: 'fit-content',
              transition: 'transform 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Risk / Reward</h2>
            <RiskRewardDashboard symbol={selectedStock} token={token} />
          </div>

        </div>
      )}
    </div>
  );
}

export default App;
