import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      setToken(data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          background: '#fff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '30px', color: '#1f2937' }}>Daily Trades Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: '12px 15px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '12px 15px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px',
              background: '#2575fc',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.background = '#1a5ed8')}
            onMouseOut={(e) => (e.target.style.background = '#2575fc')}
          >
            Login
          </button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#6b7280' }}>
          Use <strong>admin / 123456</strong> to login
        </p>
      </div>
    </div>
  );
}

export default Login;
