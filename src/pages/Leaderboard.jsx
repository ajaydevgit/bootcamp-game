import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TEAM_CODES = {
  "Argentina": "ar", "Brazil": "br", "France": "fr", "England": "gb-eng",
  "Spain": "es", "Portugal": "pt", "Germany": "de", "Netherlands": "nl",
  "Belgium": "be", "Croatia": "hr", "Uruguay": "uy", "Japan": "jp",
  "South Korea": "kr", "Morocco": "ma", "United States": "us", "Mexico": "mx",
};

function PodiumCard({ rank, name, points, members, flagCode, isSquad }) {
  const configs = {
    1: { bg: 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(217,119,6,0.1))', border: '#f59e0b', label: '#fbbf24', height: 200, badgeBg: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    2: { bg: 'linear-gradient(135deg, rgba(156,163,175,0.2), rgba(107,114,128,0.1))', border: '#9ca3af', label: '#e5e7eb', height: 165, badgeBg: 'linear-gradient(135deg, #9ca3af, #6b7280)' },
    3: { bg: 'linear-gradient(135deg, rgba(205,124,59,0.2), rgba(146,64,14,0.1))', border: '#cd7c3b', label: '#d97706', height: 145, badgeBg: 'linear-gradient(135deg, #cd7c3b, #92400e)' },
  };
  const c = configs[rank];
  const order = rank === 2 ? -1 : rank === 1 ? 0 : 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', order, gap: '8px' }}>
      <div style={{
        width: '28px', height: '28px', borderRadius: '50%',
        background: c.badgeBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: '900', fontSize: '13px', color: '#000',
        boxShadow: `0 0 10px ${c.border}88`
      }}>{rank}</div>

      <div style={{
        background: c.bg,
        border: `1px solid ${c.border}55`,
        borderRadius: '16px',
        padding: '1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        minWidth: '140px',
        maxWidth: '160px',
        height: `${c.height}px`,
        justifyContent: 'center',
        backdropFilter: 'blur(12px)',
        boxShadow: `0 8px 32px ${c.border}22`,
        transition: 'transform 0.3s ease',
      }}>
        {flagCode && (
          <img src={`https://flagcdn.com/w40/${flagCode}.png`} alt={name}
            style={{ width: '36px', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }} />
        )}
        <div style={{ fontWeight: '800', fontSize: '0.95rem', color: c.label, textAlign: 'center', lineHeight: 1.2 }}>
          {name}
        </div>
        <div style={{ fontWeight: '900', fontSize: '1.4rem', color: '#fff' }}>
          {points} <span style={{ fontSize: '0.65rem', fontWeight: '600', color: c.label, letterSpacing: '1px' }}>PTS</span>
        </div>
        {isSquad && members !== undefined && (
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '1px', fontWeight: '600' }}>
            {members} MEMBERS
          </div>
        )}
      </div>
    </div>
  );
}

function Leaderboard() {
  const { leaderboard } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('squad');
  const [search, setSearch] = useState('');

  // Squad aggregation
  const squadMap = {};
  leaderboard.forEach(entry => {
    if (!entry.team) return;
    if (!squadMap[entry.team]) squadMap[entry.team] = { name: entry.team, points: 0, members: 0 };
    squadMap[entry.team].points += entry.score || 0;
    squadMap[entry.team].members += 1;
  });
  const squadList = Object.values(squadMap).sort((a, b) => b.points - a.points);
  const individualList = [...leaderboard].sort((a, b) => (b.score || 0) - (a.score || 0));

  const filteredSquad = squadList.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const filteredIndividual = individualList.filter(p => (p.name || '').toLowerCase().includes(search.toLowerCase()));

  const renderPodium = (items, isSquad) => {
    const top3 = items.slice(0, 3);
    const rest = items.slice(3);

    return (
      <>
        {/* Top 3 Podium */}
        {top3.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '16px', margin: '2rem 0' }}>
            {top3.map((item, i) => (
              <PodiumCard
                key={isSquad ? item.name : (item.id || item.mulearnId)}
                rank={i + 1}
                name={isSquad ? item.name : item.name}
                points={isSquad ? item.points : (item.score || 0)}
                members={isSquad ? item.members : undefined}
                flagCode={isSquad ? (TEAM_CODES[item.name] || null) : (TEAM_CODES[item.team] || null)}
                isSquad={isSquad}
              />
            ))}
          </div>
        )}

        {/* Rank 4+ List */}
        {rest.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '1rem' }}>
            {rest.map((item, i) => {
              const flagCode = isSquad ? (TEAM_CODES[item.name] || null) : (TEAM_CODES[item.team] || null);
              return (
                <div key={isSquad ? item.name : (item.id || item.mulearnId)} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px',
                  padding: '14px 20px',
                  transition: 'background 0.2s ease',
                }}>
                  <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-secondary)', minWidth: '24px' }}>
                    {i + 4}
                  </span>
                  <span style={{ color: '#10b981', fontSize: '12px', fontWeight: '700' }}>▲</span>
                  {flagCode && (
                    <img src={`https://flagcdn.com/w20/${flagCode}.png`} alt=""
                      style={{ width: '22px', borderRadius: '2px' }} />
                  )}
                  <span style={{ fontWeight: '700', fontSize: '1rem', color: '#fff', flex: 1 }}>
                    {isSquad ? item.name : item.name}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: '800', color: '#60a5fa', fontSize: '0.95rem' }}>
                      {isSquad ? item.points : (item.score || 0)} PTS
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      {isSquad ? `${item.members} MEMBERS` : item.mulearnId}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {items.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem 0' }}>
            No data yet. Be the first to play!
          </p>
        )}
      </>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', padding: '0' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <button onClick={() => navigate('/')} style={{
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
          color: '#fff', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer',
          fontWeight: '600', fontSize: '0.9rem', transition: 'all 0.2s'
        }}>← Back</button>

        <h1 style={{ fontSize: '1.6rem', fontWeight: '900', letterSpacing: '2px', color: '#fff' }}>
          STANDINGS
        </h1>

        <div style={{
          background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)',
          color: '#ef4444', borderRadius: '8px', padding: '6px 14px',
          fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px'
        }}>
          <span style={{ animation: 'pulse-subtle 1.5s infinite', display: 'inline-block', fontSize: '10px' }}>●</span> LIVE
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 2rem' }}>
        {['squad', 'individual'].map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setSearch(''); }} style={{
            background: activeTab === tab ? 'var(--accent-brand)' : 'transparent',
            color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
            border: 'none',
            borderBottom: activeTab === tab ? '2px solid transparent' : '2px solid transparent',
            padding: '14px 24px',
            fontWeight: '800',
            fontSize: '0.85rem',
            letterSpacing: '1px',
            cursor: 'pointer',
            borderRadius: activeTab === tab ? '8px 8px 0 0' : '0',
            transition: 'all 0.2s ease',
            marginRight: '4px',
            marginBottom: '-1px',
          }}>
            {tab === 'squad' ? 'SQUAD STANDINGS' : 'INDIVIDUAL STANDINGS'}
          </button>
        ))}
      </div>

      {/* Body */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '1.5rem 2rem' }}>
        {/* Search */}
        <input
          type="text"
          placeholder={activeTab === 'squad' ? 'Search squad country...' : 'Search player name...'}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            padding: '12px 18px',
            color: '#fff',
            fontSize: '0.95rem',
            marginBottom: '0.5rem',
          }}
        />

        {activeTab === 'squad' && renderPodium(filteredSquad, true)}
        {activeTab === 'individual' && renderPodium(filteredIndividual, false)}
      </div>
    </div>
  );
}

export default Leaderboard;

