import React from 'react';
import { tokens } from '../../tokens';

export const ColorPaletteTokens = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
    {Object.entries(tokens).map(([name, color]) => (
      <div key={name} style={{ border: '1px solid #e2e2e4', borderRadius: 6, overflow: 'hidden' }}>
        <div style={{ height: 64, background: String(color) }} />
        <div style={{ padding: '8px 10px' }}>
          <div style={{ fontSize: 12, color: '#555' }}>{name}</div>
          <div style={{ fontSize: 12 }}>{String(color)}</div>
        </div>
      </div>
    ))}
  </div>
);
