import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Leaderboard() {
  const { leaderboard } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('players'); // 'players' | 'teams'

  const getRankStyle = (index) => {
    if (index === 0) return { color: 'var(--gold)', fontWeight: 'bold' };
    if (index === 1) return { color: 'var(--silver)', fontWeight: 'bold' };
    if (index === 2) return { color: 'var(--bronze)', fontWeight: 'bold' };
    return { color: 'var(--text-primary)' };
  };

  const teamScores = leaderboard.reduce((acc, entry) => {
    if (!entry.team) return acc;
    if (!acc[entry.team]) acc[entry.team] = 0;
    acc[entry.team] += entry.score;
    return acc;
  }, {});

  const teamLeaderboard = Object.entries(teamScores)
    .map(([team, score]) => ({ team, score }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="flex flex-col items-center h-full py-4">
      <div className="glass-card flex-col w-full" style={{ maxWidth: '800px' }}>
        <h1 className="text-neon mb-4 text-center">Tournament Leaderboard 🏆</h1>
        
        <div className="flex justify-center gap-4 mb-6">
          <button 
            className={`btn-secondary ${activeTab === 'players' ? 'btn-primary' : ''}`} 
            onClick={() => setActiveTab('players')}
            style={activeTab === 'players' ? { border: '2px solid var(--neon-accent)' } : {}}
          >
            Players
          </button>
          <button 
            className={`btn-secondary ${activeTab === 'teams' ? 'btn-primary' : ''}`} 
            onClick={() => setActiveTab('teams')}
            style={activeTab === 'teams' ? { border: '2px solid var(--neon-accent)' } : {}}
          >
            Teams
          </button>
        </div>

        {activeTab === 'players' && (
          leaderboard.length === 0 ? (
            <p className="text-center text-secondary">No matches played yet. Be the first!</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                    <th className="p-2">Rank</th>
                    <th className="p-2">Player</th>
                    <th className="p-2">Team</th>
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
                      <td className="p-2">{entry.team || '-'}</td>
                      <td className="p-2 font-bold">{entry.score} ⚽</td>
                      <td className="p-2 text-secondary" style={{ fontSize: '0.9rem' }}>{entry.day}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {activeTab === 'teams' && (
          teamLeaderboard.length === 0 ? (
            <p className="text-center text-secondary">No team scores recorded yet!</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                    <th className="p-2">Rank</th>
                    <th className="p-2">Team</th>
                    <th className="p-2">Total Goals</th>
                  </tr>
                </thead>
                <tbody>
                  {teamLeaderboard.map((entry, index) => (
                    <tr key={entry.team} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td className="p-2" style={getRankStyle(index)}>
                        #{index + 1}
                      </td>
                      <td className="p-2 font-bold" style={{ fontSize: '1.2rem', ...getRankStyle(index) }}>
                        {entry.team}
                      </td>
                      <td className="p-2 font-bold">{entry.score} ⚽</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        <div className="flex justify-center mt-6">
          <button className="btn-secondary" onClick={() => navigate('/')}>Back to Main Menu</button>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
