import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Landing() {
  const navigate = useNavigate();
  const { setCurrentUser, currentUser, leaderboard } = useContext(AppContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    if (!currentUser.name.trim() || !currentUser.mulearnId.trim() || !currentUser.team) {
      alert("Please enter your Name, MuLearn ID, and select a Team to start the shootout!");
      return;
    }

    const today = new Date().toLocaleDateString();
    const existingEntry = leaderboard.find(entry => entry.mulearnId === currentUser.mulearnId);
    
    if (existingEntry && existingEntry.day === today) {
      alert("🛑 You have already played your 5 penalties for today! Come back tomorrow.");
      return;
    }

    navigate('/rules');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-8 relative" style={{ zIndex: 1 }}>
      
      {/* Dynamic Background Player Images Layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, pointerEvents: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', opacity: 0.2, mixBlendMode: 'screen', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1518605368461-1e1e3eecb0ce?w=600&q=80&auto=format&fit=crop" style={{ height: '70%', objectFit: 'contain', WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)' }} alt="Player 1" />
        <img src="https://images.unsplash.com/photo-1508344928928-7137b29de216?w=600&q=80&auto=format&fit=crop" style={{ height: '85%', objectFit: 'contain', WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)' }} alt="Player 2" />
        <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80&auto=format&fit=crop" style={{ height: '70%', objectFit: 'contain', WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)' }} alt="Player 3" />
      </div>

      <div className="bento-grid">
        
        {/* Header / Hero Card */}
        <div className="bento-card col-span-12 animate-stagger-1 text-center" style={{ minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 className="text-neon mb-2" style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>
            Career to Career<br/>
            <span className="text-primary" style={{ fontSize: '1.8rem', opacity: 0.9 }}>DSA Bootcamp Penalty Shootout ⚽</span>
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
        <div className="bento-card col-span-12 animate-stagger-4" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.5rem 2rem' }}>
          <button className="btn-secondary" onClick={() => navigate('/leaderboard')} style={{ flex: 1, padding: '1.2rem' }}>
            View Dashboard Leaderboard
          </button>
          
          <button className="btn-primary" onClick={handleStart} style={{ flex: 2, padding: '1.2rem', background: 'var(--accent-brand)', color: 'white' }}>
            Initiate Sequence
          </button>
        </div>

      </div>
    </div>
  );
}

export default Landing;
