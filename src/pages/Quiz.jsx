import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Quiz() {
  const { questions, setCurrentScore } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isAnswering, setIsAnswering] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Pick 5 random questions
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setSessionQuestions(shuffled.slice(0, 5));
  }, [questions]);

  useEffect(() => {
    if (sessionQuestions.length === 0 || isAnswering) return;
    
    setTimeLeft(10);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentIndex, sessionQuestions, isAnswering]);

  const handleTimeOut = () => {
    nextQuestion();
  };

  const handleAnswer = (option) => {
    if (isAnswering) return;
    clearInterval(timerRef.current);
    setIsAnswering(true);

    const currentQ = sessionQuestions[currentIndex];
    if (option === currentQ.answer) {
      setCurrentScore(prev => prev + 1);
    }
    
    // Move to next question instantly
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      // add a small delay before enabling answering again to prevent double-tap bug
      setTimeout(() => setIsAnswering(false), 200);
    } else {
      navigate('/results');
    }
  };

  if (sessionQuestions.length === 0) return <div>Loading Match...</div>;

  const currentQ = sessionQuestions[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-full relative w-full">
      
      <div className="glass-card flex-col items-center w-full" style={{ maxWidth: '800px', padding: '3rem', transition: 'all 0.3s ease' }}>
        <div className="flex flex-col items-center w-full mb-8">
          <div className="text-secondary mb-2" style={{ fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
            Question {currentIndex + 1} / 5
          </div>
          <div className={`text-neon ${timeLeft <= 3 ? 'text-neon-red animate-pulse' : ''}`} style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '3px', fontFamily: 'var(--font-display)' }}>
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </div>
        </div>


        <h2 className="mb-8 text-center" style={{ fontSize: '1.6rem', minHeight: '80px', lineHeight: '1.4', fontWeight: '700', color: 'var(--text-primary)' }}>
          {currentQ.text}
        </h2>

        <div className="flex flex-col gap-4 w-full">
          {currentQ.options.map((opt, i) => (
            <button 
              key={i} 
              className="btn-secondary" 
              style={{ 
                fontSize: '1.1rem', 
                padding: '1.2rem 1.5rem', 
                textAlign: 'left', 
                borderLeft: '4px solid var(--pitch-light-green)',
                transition: 'all 0.2s ease',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                color: 'var(--text-primary)'
              }}
              onMouseEnter={(e) => {
                if(!isAnswering) {
                  e.target.style.background = 'rgba(255,255,255,0.1)';
                  e.target.style.borderLeftColor = 'var(--neon-accent)';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if(!isAnswering) {
                  e.target.style.background = 'rgba(255,255,255,0.05)';
                  e.target.style.borderLeftColor = 'var(--pitch-light-green)';
                  e.target.style.transform = 'none';
                }
              }}
              onClick={() => handleAnswer(opt)}
              disabled={isAnswering}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
