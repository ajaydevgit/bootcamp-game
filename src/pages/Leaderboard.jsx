import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Leaderboard() {
  const { leaderboard } = useContext(AppContext);
  const navigate = useNavigate();

  const getRankStyle = (index) => {
    if (index === 0) return { color: 'var(--gold)', fontWeight: 'bold' };
    if (index === 1) return { color: 'var(--silver)', fontWeight: 'bold' };
    if (index === 2) return { color: 'var(--bronze)', fontWeight: 'bold' };
    return { color: 'var(--text-primary)' };
  };

  return (
    <div className="flex flex-col items-center h-full py-4">
      <div className="glass-card flex-col w-full" style={{ maxWidth: '800px' }}>
        <h1 className="text-neon mb-4 text-center">Tournament Leaderboard 🏆</h1>
        
        {leaderboard.length === 0 ? (
          <p className="text-center text-secondary">No matches played yet. Be the first!</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                  <th className="p-2">Rank</th>
                  <th className="p-2">Player</th>
                  <th className="p-2">Goals</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td className="p-2" style={getRankStyle(index)}>
                      #{index + 1}
                    </td>
                    <td className="p-2" style={getRankStyle(index)}>
                      {entry.name} <br/>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{entry.mulearnId}</span>
                    </td>
                    <td className="p-2 font-bold">{entry.score} ⚽</td>
                    <td className="p-2 text-secondary" style={{ fontSize: '0.9rem' }}>{entry.day}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button className="btn-secondary" onClick={() => navigate('/')}>Back to Main Menu</button>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
