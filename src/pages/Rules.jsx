import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Rules() {
  const navigate = useNavigate();
  const { setCurrentScore } = useContext(AppContext);

  const startMatch = () => {
    setCurrentScore(0);
    navigate('/quiz');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="glass-card flex-col items-center" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-neon mb-4">Match Rules 📋</h2>
        
        <ul className="mb-4 text-left" style={{ listStyleType: 'none', padding: 0, fontSize: '1.2rem', lineHeight: '1.8' }}>
          <li>⚽ <strong>5 Questions</strong> per participant.</li>
          <li>⏱️ <strong>10 Seconds</strong> strictly per question.</li>
          <li>✅ <strong>1 Goal</strong> for every correct answer.</li>
          <li>🏆 <strong>5 Goals</strong> is the maximum score.</li>
          <li>🥇 Top 3 players win daily prizes!</li>
        </ul>

        <div className="flex gap-4 w-full mt-4">
          <button className="btn-secondary flex-1" onClick={() => navigate('/')}>Back</button>
          <button className="btn-primary flex-1" onClick={startMatch}>Kick Off!</button>
        </div>
      </div>
    </div>
  );
}

export default Rules;
