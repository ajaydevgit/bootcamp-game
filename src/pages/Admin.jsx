import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Admin() {
  const { questions, setQuestions, resetLeaderboard } = useContext(AppContext);
  const navigate = useNavigate();

  const [newQuestion, setNewQuestion] = useState({ text: '', opt1: '', opt2: '', opt3: '', opt4: '', answer: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleDelete = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newQuestion.text || !newQuestion.opt1 || !newQuestion.opt2 || !newQuestion.opt3 || !newQuestion.opt4 || !newQuestion.answer) {
      alert("Please fill all fields!");
      return;
    }

    const options = [newQuestion.opt1, newQuestion.opt2, newQuestion.opt3, newQuestion.opt4];
    if (!options.includes(newQuestion.answer)) {
      alert("Answer must exactly match one of the options!");
      return;
    }

    setQuestions(prev => [...prev, {
      id: Date.now(),
      text: newQuestion.text,
      options,
      answer: newQuestion.answer
    }]);

    setNewQuestion({ text: '', opt1: '', opt2: '', opt3: '', opt4: '', answer: '' });
    setIsAdding(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'mulearn_admin') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect Password!');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <form onSubmit={handleLogin} className="glass-card flex-col items-center" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-neon mb-4">Admin Login</h2>
          <input 
            type="password" 
            placeholder="Enter Password..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          <button type="submit" className="btn-primary w-full mb-2">Login</button>
          <button type="button" className="btn-secondary w-full" onClick={() => navigate('/')}>Back to Home</button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-full py-4">
      <div className="glass-card flex-col w-full" style={{ maxWidth: '800px' }}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-neon">Admin Locker Room 🛠️</h1>
          <button className="btn-secondary" onClick={() => navigate('/')}>Exit</button>
        </div>

        <div className="flex justify-between mb-4">
          <button className="btn-primary" onClick={() => setIsAdding(!isAdding)}>
            {isAdding ? 'Cancel' : 'Add New Question'}
          </button>
          <button className="btn-secondary" style={{ color: 'var(--neon-red)', borderColor: 'var(--neon-red)' }} onClick={() => {
            if(window.confirm('Are you sure you want to clear the leaderboard?')) resetLeaderboard();
          }}>
            Reset Leaderboard
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleAdd} className="mb-4 p-4 border border-gray-600 rounded" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <h3 className="mb-2">New Question</h3>
            <textarea placeholder="Question Text" value={newQuestion.text} onChange={e => setNewQuestion({...newQuestion, text: e.target.value})} rows={2} />
            <div className="flex gap-2">
              <input type="text" placeholder="Option 1" value={newQuestion.opt1} onChange={e => setNewQuestion({...newQuestion, opt1: e.target.value})} />
              <input type="text" placeholder="Option 2" value={newQuestion.opt2} onChange={e => setNewQuestion({...newQuestion, opt2: e.target.value})} />
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Option 3" value={newQuestion.opt3} onChange={e => setNewQuestion({...newQuestion, opt3: e.target.value})} />
              <input type="text" placeholder="Option 4" value={newQuestion.opt4} onChange={e => setNewQuestion({...newQuestion, opt4: e.target.value})} />
            </div>
            <input type="text" placeholder="Exact Correct Answer" value={newQuestion.answer} onChange={e => setNewQuestion({...newQuestion, answer: e.target.value})} />
            <button type="submit" className="btn-primary w-full">Save Question</button>
          </form>
        )}

        <div style={{ overflowX: 'auto', maxHeight: '500px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                <th className="p-2">Question</th>
                <th className="p-2">Answer</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td className="p-2">{q.text}</td>
                  <td className="p-2 text-neon">{q.answer}</td>
                  <td className="p-2">
                    <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }} onClick={() => handleDelete(q.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Admin;
