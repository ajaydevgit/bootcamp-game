import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Landing from './pages/Landing';
import Rules from './pages/Rules';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
