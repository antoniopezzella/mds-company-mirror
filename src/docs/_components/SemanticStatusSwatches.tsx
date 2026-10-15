import React from 'react';
import { semanticColors } from '../../semantic-tokens';

const statusKeys = [
  { bg: 'statusSuccessBg', text: 'statusSuccessText', label: 'Success (Bg/Text)' },
  { bg: 'statusSuccess', label: 'Success (Legacy)', text: 'statusSuccess' },
  { bg: 'statusWarningBg', text: 'statusWarningText', label: 'Warning (Bg/Text)' },
  { bg: 'statusWarning', label: 'Warning (Legacy Single)', text: 'statusWarning' },
  { bg: 'statusDangerBg', text: 'statusDangerText', label: 'Danger (Bg/Text)' },
  { bg: 'statusDanger', label: 'Danger (Legacy)', text: 'statusDanger' },
];

export const SemanticStatusSwatches: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {statusKeys.map(s => {
        const bg = semanticColors[s.bg as keyof typeof semanticColors];
        const textColor = semanticColors[s.text as keyof typeof semanticColors];
        return (
          <div key={s.label} style={{
            width: 140,
            border: '1px solid #e0e0e0',
            borderRadius: 6,
            background: '#fff',
            fontFamily: 'system-ui, sans-serif',
            boxShadow: '0 1px 2px rgba(0,0,0,0.06)'
          }}>
            <div style={{ background: bg, color: textColor, padding: '10px 8px', fontSize: 12, fontWeight: 600, minHeight: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              {s.label}
            </div>
            <div style={{ padding: '6px 8px', fontSize: 11 }}>
              <div><strong>bg:</strong> {s.bg}</div>
              <div><strong>text:</strong> {s.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SemanticStatusSwatches;
