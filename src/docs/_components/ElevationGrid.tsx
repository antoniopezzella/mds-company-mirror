import React from 'react';
import { shadows } from '../../shadows';

export const ElevationGrid: React.FC = () => {
  return (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
      {shadows.map(s => (
        <div key={s.level} style={{ fontFamily: 'system-ui, sans-serif' }}>
          <div style={{
            height: 100,
            borderRadius: 12,
            background: 'linear-gradient(#fff,#fafafa)',
            boxShadow: s.value,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: 14,
            color: '#002c77'
          }}>
            L{s.level}
          </div>
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Level {s.level}</div>
            <div style={{ fontSize: 11, opacity: 0.8, lineHeight: 1.3 }}>{s.usage}</div>
            <code style={{ display: 'block', fontSize: 10, marginTop: 4 }}>{s.value}</code>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ElevationGrid;
