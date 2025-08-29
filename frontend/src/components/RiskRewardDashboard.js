// components/RiskRewardDashboard.js
import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function RiskRewardDashboard({ symbol }) {
  const [riskReward, setRiskReward] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await api.get(`/stocks/${symbol}/indicators`);
        setRiskReward(res.data.riskReward);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStock();
  }, [symbol]);

  if (!riskReward) return <div>Loading risk/reward...</div>;

  return (
    <div>
      <h3>Risk/Reward for {symbol}</h3>
      <p>Risk: {riskReward.risk}</p>
      <p>Reward: {riskReward.reward}</p>
    </div>
  );
}
