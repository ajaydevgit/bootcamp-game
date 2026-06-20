import React, { createContext, useState, useEffect } from 'react';
import rawQuestions from '../data/questions.json';

export const AppContext = createContext();

const defaultQuestions = rawQuestions.map((q, index) => ({
  id: index + 1,
  text: q.question,
  options: [q.options.A, q.options.B, q.options.C, q.options.D],
  answer: q.options[q.answer || q.correctAnswer]
}));

export const AppProvider = ({ children }) => {
  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem('dsa_questions_v3');
      return saved ? JSON.parse(saved) : defaultQuestions;
    } catch (e) {
      return defaultQuestions;
    }
  });

  const [leaderboard, setLeaderboard] = useState(() => {
    try {
      const saved = localStorage.getItem('dsa_leaderboard');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState({ name: '', mulearnId: '', team: '' });
  const [currentScore, setCurrentScore] = useState(0);

  const [isGameOpen, setIsGameOpen] = useState(() => {
    try {
      const saved = localStorage.getItem('dsa_game_open');
      return saved !== null ? JSON.parse(saved) : true;
    } catch (e) {
      return true;
    }
  });

  const [currentSession, setCurrentSession] = useState(() => {
    try {
      const saved = localStorage.getItem('dsa_current_session');
      return saved ? parseInt(saved) : 1;
    } catch (e) {
      return 1;
    }
  });

  useEffect(() => {
    localStorage.setItem('dsa_questions_v3', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('dsa_leaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  useEffect(() => {
    localStorage.setItem('dsa_game_open', JSON.stringify(isGameOpen));
  }, [isGameOpen]);

  useEffect(() => {
    localStorage.setItem('dsa_current_session', currentSession.toString());
  }, [currentSession]);

  const saveScore = (name, mulearnId, score, team) => {
    setLeaderboard(prev => {
      const existingIndex = prev.findIndex(entry => entry.mulearnId === mulearnId);
      
      if (existingIndex !== -1) {
        const newLeaderboard = [...prev];
        newLeaderboard[existingIndex] = {
          ...newLeaderboard[existingIndex],
          name: name, // In case they update their name
          score: newLeaderboard[existingIndex].score + score,
          team: team || newLeaderboard[existingIndex].team,
          session: currentSession
        };
        return newLeaderboard.sort((a, b) => b.score - a.score);
      } else {
        const newEntry = { id: Date.now(), name, mulearnId, score, team, session: currentSession };
        return [...prev, newEntry].sort((a, b) => b.score - a.score);
      }
    });
  };

  const resetLeaderboard = () => {
    setLeaderboard([]);
  };

  return (
    <AppContext.Provider value={{
      questions, setQuestions,
      leaderboard, setLeaderboard, saveScore, resetLeaderboard,
      currentUser, setCurrentUser,
      currentScore, setCurrentScore,
      isGameOpen, setIsGameOpen,
      currentSession, setCurrentSession
    }}>
      {children}
    </AppContext.Provider>
  );
};
