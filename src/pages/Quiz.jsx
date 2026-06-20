import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Quiz() {
  const { questions, setCurrentScore } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [shotStatus, setShotStatus] = useState('idle');
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
    triggerMiss();
  };

  const handleAnswer = (option) => {
    if (isAnswering) return;
    clearInterval(timerRef.current);
    setIsAnswering(true);

    const currentQ = sessionQuestions[currentIndex];
    if (option === currentQ.answer) {
      triggerGoal();
    } else {
      triggerMiss();
    }
  };

  const triggerGoal = () => {
    setShotStatus('goal');
    setCurrentScore(prev => prev + 1);

    setTimeout(() => {
      setShotStatus('idle');
      nextQuestion();
    }, 1500);
  };

  const triggerMiss = () => {
    setShotStatus('miss');
    setTimeout(() => {
      setShotStatus('idle');
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
    setIsAnswering(false);
    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      navigate('/results');
    }
  };

  if (sessionQuestions.length === 0) return <div>Loading Match...</div>;

  const currentQ = sessionQuestions[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-full relative w-full">

      
      <div className="glass-card flex-col items-center w-full" style={{ maxWidth: '800px' }}>
        <div className="flex justify-between w-full mb-4 items-center">
          <div className="text-secondary" style={{ fontSize: '1.2rem' }}>
            Question {currentIndex + 1} / 5
          </div>
          <div className={`text-neon ${timeLeft <= 2 ? 'text-neon-red animate-pulse' : ''}`} style={{ fontSize: '3rem', fontWeight: 'bold' }}>
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </div>
        </div>


        <h2 className="mb-4 text-center" style={{ fontSize: '1.2rem', minHeight: '60px' }}>
          {currentQ.text}
        </h2>

        <div className="flex flex-col gap-4 w-full">
          {currentQ.options.map((opt, i) => (
            <button 
              key={i} 
              className="btn-secondary" 
              style={{ fontSize: '1.2rem', padding: '1rem', textAlign: 'left', borderLeft: '4px solid var(--pitch-light-green)' }}
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
