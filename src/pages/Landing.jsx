import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Landing() {
  const navigate = useNavigate();
  const { setCurrentUser, currentUser, leaderboard, isGameOpen, currentSession } = useContext(AppContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  const teams = [
    { name: "Argentina", code: "ar" },
    { name: "Brazil", code: "br" },
    { name: "France", code: "fr" },
    { name: "England", code: "gb-eng" },
    { name: "Spain", code: "es" },
    { name: "Portugal", code: "pt" },
    { name: "Germany", code: "de" },
    { name: "Netherlands", code: "nl" },
    { name: "Belgium", code: "be" },
    { name: "Croatia", code: "hr" },
    { name: "Uruguay", code: "uy" },
    { name: "Japan", code: "jp" },
    { name: "South Korea", code: "kr" },
    { name: "Morocco", code: "ma" },
    { name: "United States", code: "us" },
    { name: "Mexico", code: "mx" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStart = () => {
    if (!isGameOpen) {
      alert("🛑 The game is currently closed by the Admin. Please wait until it is opened.");
      return;
    }

    if (!currentUser.name.trim() || !currentUser.mulearnId.trim() || !currentUser.team) {
      alert("Please enter your Name, MuLearn ID, and select a Team to start the shootout!");
      return;
    }

    const existingEntry = leaderboard.find(entry => entry.mulearnId === currentUser.mulearnId);
    
    if (existingEntry && existingEntry.session === currentSession) {
      alert(`🛑 You have already played in Session ${currentSession}! Wait for the Admin to start the next session.`);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      navigate('/rules');
    }, 2500);
  };

  // Group leaderboard by team for the ticker
  const squadStats = teams.map(t => {
    const squadMembers = leaderboard.filter(l => l.team === t.name);
    const points = squadMembers.reduce((sum, member) => sum + member.score, 0);
    return { ...t, points, members: squadMembers.length };
  }).sort((a, b) => b.points - a.points);

  const totalPoints = squadStats.reduce((sum, s) => sum + s.points, 0) || 1;

  // Double the ticker items for seamless looping
  const tickerItems = [...squadStats, ...squadStats];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative" style={{ zIndex: 1, paddingTop: '56px' }}>
      
      {/* Ticker Banner */}
      <div className="ticker-wrap">
        <div className="ticker">
          {tickerItems.map((squad, idx) => (
            <div key={idx} className="ticker-item">
              <span className="ticker-rank">#{ (idx % squadStats.length) + 1 }</span>
              <img src={`https://flagcdn.com/w20/${squad.code}.png`} className="ticker-flag" alt={squad.name} />
              <span className="ticker-country">{squad.name.substring(0, 3).toUpperCase()}</span>
              <span className="ticker-stat">{((squad.points / totalPoints) * 100).toFixed(1)}%</span>
              <span className={`ticker-arrow ${squad.points > 0 ? 'up' : 'neutral'}`}>
                {squad.points > 0 ? '▲' : '−'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Image Background Layer */}
      <div className="video-background-container">
        <img
          src="/football_bg.png"
          alt="Background"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,15,25,0.6), rgba(9,9,11,0.92))' }}></div>
      </div>

      <div className="bento-grid">
        
        {/* Header / Hero Card */}
        <div className="bento-card col-span-12 animate-stagger-1 text-center" style={{ minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}>
          <h1 className="text-neon mb-2" style={{ fontSize: '3rem', lineHeight: '1.2' }}>
            DSA Bootcamp Penalty Shootout
          </h1>
          <p className="text-secondary mt-2" style={{ fontSize: '1.1rem' }}>10 seconds per question. Quick thinking required.</p>
        </div>

        {/* Player Identity Card */}
        <div className="bento-card col-span-6 animate-stagger-2">
          <h3 className="mb-4 text-primary" style={{ fontSize: '1.2rem' }}>Player Authorization</h3>
          
          <input 
            type="text" 
            placeholder="Enter Player Name..." 
            value={currentUser.name}
            onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
            className="mb-4"
          />

          <input 
            type="text" 
            placeholder="Enter MuLearn ID..." 
            value={currentUser.mulearnId}
            onChange={(e) => setCurrentUser({...currentUser, mulearnId: e.target.value})}
            style={{ marginBottom: 0 }}
          />
        </div>

        {/* Team Selection Card */}
        <div className="bento-card col-span-6 animate-stagger-3" style={{ zIndex: 10 }}>
          <h3 className="mb-4 text-primary" style={{ fontSize: '1.2rem' }}>Select National Team</h3>
          
          <div className="custom-dropdown w-full" ref={dropdownRef} style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <div 
              className="dropdown-selected" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ 
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', padding: '1.2rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.2rem', color: 'white'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                {currentUser.team ? (
                  <>
                    <img src={`https://flagcdn.com/w40/${teams.find(t => t.name === currentUser.team)?.code || 'un'}.png`} width="30" alt="flag" style={{ borderRadius: '4px' }} />
                    <span>{currentUser.team}</span>
                  </>
                ) : (
                  <span className="text-secondary">Choose Team...</span>
                )}
              </div>
              <span style={{ fontSize: '0.8rem', transition: 'transform 0.3s', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
            </div>

            {isDropdownOpen && (
              <div className="dropdown-menu" style={{ 
                position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, background: 'var(--bg-dark)', border: '1px solid var(--border-subtle)', borderRadius: '8px', maxHeight: '200px', overflowY: 'auto', zIndex: 50, boxShadow: 'var(--shadow-lg)'
              }}>
                {teams.map((t) => (
                  <div 
                    key={t.name}
                    className="dropdown-item"
                    onClick={() => {
                      setCurrentUser({...currentUser, team: t.name});
                      setIsDropdownOpen(false);
                    }}
                    style={{ padding: '0.8rem 1.2rem', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1rem', alignItems: 'center' }}
                  >
                    <img src={`https://flagcdn.com/w40/${t.code}.png`} width="30" alt={t.name} style={{ borderRadius: '4px' }} />
                    <span style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{t.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Card */}
        <div className="bento-card col-span-12 animate-stagger-4" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.5rem 2rem', transition: 'all 0.3s ease' }}>
          <button className="btn-secondary" onClick={() => navigate('/leaderboard')} style={{ flex: 1, padding: '1.2rem' }}>
            View Dashboard Leaderboard
          </button>
          
          <button className="btn-primary" onClick={handleStart} style={{ flex: 2, padding: '1.2rem', background: 'var(--accent-brand)', color: 'white' }}>
            Initiate Sequence
          </button>
        </div>

      </div>

      {isLoading && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'var(--pitch-green)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div className="mu-logo-animation" style={{
            fontSize: '150px',
            fontWeight: '900',
            fontFamily: 'sans-serif',
            background: 'linear-gradient(to bottom, #3b82f6, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1
          }}>
            µ
          </div>
          <div className="mt-4 text-neon animate-pulse" style={{ fontSize: '1.5rem', letterSpacing: '2px' }}>LOADING MATCH...</div>
        </div>
      )}
    </div>
  );
}

export default Landing;
