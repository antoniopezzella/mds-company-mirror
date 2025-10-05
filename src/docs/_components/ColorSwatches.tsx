import React from 'react';
import { tokens } from '../../tokens';

// Group tokens heuristically by semantic clusters (blue, gray, accent, status)
const groupOrder: Array<{ title: string; match: (name: string) => boolean }> = [
  { title: 'Blues', match: n => n.startsWith('blue') },
  { title: 'Blue Gray', match: n => n.startsWith('blueGray') },
  { title: 'Grays', match: n => n.startsWith('gray') },
  { title: 'Accents', match: n => /(green|yellow|crimson|teal|turquoise)/.test(n) },
];

export const ColorSwatches: React.FC = () => {
  const entries = Object.entries(tokens) as Array<[string, string]>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {groupOrder.map(group => {
        const set = entries.filter(([k]) => group.match(k));
        if (!set.length) return null;
        return (
          <div key={group.title}>
            <h3 style={{ margin: '0 0 12px' }}>{group.title}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {set.map(([name, value]) => (
                <div
                  key={name}
                  style={{
                    width: 110,
                    border: '1px solid #e0e0e0',
                    borderRadius: 6,
                    background: 'white',
                    overflow: 'hidden',
                    fontFamily: 'system-ui, sans-serif',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.08)'
                  }}
                >
                  <div style={{ background: value, height: 48 }} />
                  <div style={{ padding: '6px 8px' }}>
                    <div style={{ fontSize: 11, fontWeight: 600 }}>{name}</div>
                    <div style={{ fontSize: 11, opacity: 0.75 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ColorSwatches;
