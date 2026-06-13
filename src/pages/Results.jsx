import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import confetti from 'canvas-confetti';

function Results() {
  const { currentScore, currentUser, saveScore } = useContext(AppContext);
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const hasSaved = useRef(false);

  useEffect(() => {
    if (currentScore === 5) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    }
  }, [currentScore]);

  useEffect(() => {
    if (!hasSaved.current && currentUser.name) {
      saveScore(currentUser.name, currentUser.mulearnId, currentScore);
      hasSaved.current = true;
      setSaved(true);
    }
  }, [currentUser, currentScore, saveScore]);

  const getMessage = () => {
    if (currentScore === 5) return "Hattrick Hero! Flawless Victory! 🏆";
    if (currentScore >= 3) return "Great Match! Solid Performance! ⚽";
    if (currentScore > 0) return "Good effort, but you need more practice on the pitch!";
    return "Yellow Card! You missed everything. Back to training! 🟨";
  };

  const balls = Array(5).fill('❌');
  for(let i=0; i<currentScore; i++) {
    balls[i] = '⚽';
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="glass-card flex-col items-center text-center" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="text-neon mb-4" style={{ fontSize: '3rem' }}>FULL TIME!</h1>
        
        <div className="mb-4 text-secondary" style={{ fontSize: '1.5rem' }}>
          Player: <strong className="text-primary">{currentUser.name}</strong> <br/>
          <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>ID: {currentUser.mulearnId}</span>
        </div>

        <div className="flex justify-center gap-2 mb-4" style={{ fontSize: '2.5rem' }}>
          {balls.map((b, i) => <span key={i}>{b}</span>)}
        </div>
        
        <h2 className="mb-4">You scored {currentScore} Goals!</h2>
        
        <p className="mb-4 text-secondary" style={{ fontSize: '1.2rem' }}>{getMessage()}</p>

        <div className="flex gap-4 w-full">
          <button className="btn-secondary flex-1" onClick={() => navigate('/leaderboard')}>View Leaderboard</button>
          <button className="btn-primary flex-1" onClick={() => navigate('/')}>Play Again</button>
        </div>
      </div>
    </div>
  );
}

export default Results;
