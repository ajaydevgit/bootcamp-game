import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Landing() {
  const navigate = useNavigate();
  const { setCurrentUser, currentUser, leaderboard } = useContext(AppContext);

  const handleStart = () => {
    if (!currentUser.name.trim() || !currentUser.mulearnId.trim()) {
      alert("Please enter both your Name and MuLearn ID to start the shootout!");
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
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="glass-card flex-col items-center" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="text-neon mb-2" style={{ fontSize: '3rem' }}>DSA Penalty Shootout ⚽</h1>
        <h3 className="mb-4 text-secondary">Score goals by solving DSA questions in 5 seconds!</h3>
        
        <input 
          type="text" 
          placeholder="Enter Player Name..." 
          value={currentUser.name}
          onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
          className="mb-2"
          style={{ fontSize: '1.2rem', textAlign: 'center' }}
        />

        <input 
          type="text" 
          placeholder="Enter MuLearn ID..." 
          value={currentUser.mulearnId}
          onChange={(e) => setCurrentUser({...currentUser, mulearnId: e.target.value})}
          className="mb-4"
          style={{ fontSize: '1.2rem', textAlign: 'center' }}
        />

        <div className="flex flex-col gap-4 w-full">
          <button className="btn-primary w-full" onClick={handleStart}>Start Quiz</button>
          
          <div className="flex justify-center gap-4 w-full mt-2">
            <button className="btn-secondary w-full" onClick={() => navigate('/leaderboard')}>View Leaderboard</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
