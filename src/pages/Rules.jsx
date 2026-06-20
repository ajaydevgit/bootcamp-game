import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Rules() {
  const navigate = useNavigate();
  const { setCurrentScore } = useContext(AppContext);

  const startMatch = () => {
    setCurrentScore(0);
    navigate('/quiz', { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ padding: '2rem' }}>
      <div style={{
        maxWidth: '640px', width: '100%',
        background: 'rgba(24, 24, 27, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            fontSize: '0.75rem', fontWeight: '700', letterSpacing: '4px', textTransform: 'uppercase',
            color: 'var(--accent-brand)', marginBottom: '12px',
          }}>BRIEFING</div>
          <h2 style={{
            fontSize: '2.2rem', fontWeight: '900', letterSpacing: '-0.03em',
            color: '#fff', lineHeight: 1.1, margin: 0,
          }}>Match Rules</h2>
          <div style={{
            width: '48px', height: '3px', borderRadius: '2px',
            background: 'linear-gradient(90deg, var(--accent-brand), #a855f7)',
            margin: '16px auto 0',
          }}></div>
        </div>

        {/* Rules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { num: '01', text: 'Each participant will be presented with', bold: '5 questions', suffix: '.' },
            { num: '02', text: 'A strict time limit of', bold: '10 seconds', suffix: ' is allotted for each question.' },
            { num: '03', text: '', bold: 'One goal', suffix: ' will be awarded for every correct answer.' },
            { num: '04', text: 'The maximum possible score is', bold: '5 goals', suffix: '.' },
            { num: '05', text: '', bold: 'Daily prizes', suffix: ' will be awarded to the top three performers based on their final scores.' },
          ].map((rule, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: '18px',
              padding: '16px 20px',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '14px',
              borderLeft: '3px solid var(--accent-brand)',
              transition: 'all 0.25s ease',
            }}>
              <span style={{
                fontFamily: 'var(--font-main)', fontWeight: '900',
                fontSize: '1.3rem', color: 'var(--accent-brand)',
                minWidth: '30px', lineHeight: 1.4, letterSpacing: '-0.02em',
              }}>{rule.num}</span>
              <span style={{
                fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.6, fontWeight: '400', letterSpacing: '0.01em',
              }}>
                {rule.text}{rule.text ? ' ' : ''}
                <span style={{ fontWeight: '700', color: '#fff' }}>{rule.bold}</span>
                {rule.suffix}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '14px', marginTop: '2.5rem' }}>
          <button onClick={() => navigate('/')} style={{
            flex: 1, padding: '14px', borderRadius: '12px', fontSize: '0.95rem', fontWeight: '700',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            color: '#fff', cursor: 'pointer', transition: 'all 0.2s ease', letterSpacing: '0.5px',
          }}>← Back</button>
          <button onClick={startMatch} style={{
            flex: 2, padding: '14px', borderRadius: '12px', fontSize: '1rem', fontWeight: '800',
            background: 'linear-gradient(135deg, var(--accent-brand), #2563eb)',
            border: 'none', color: '#fff', cursor: 'pointer', letterSpacing: '1px',
            boxShadow: '0 4px 20px rgba(59,130,246,0.35)', transition: 'all 0.2s ease',
          }}>KICK OFF ⚡</button>
        </div>
      </div>
    </div>
  );
}

export default Rules;
