import React from 'react';
import { shadows } from '../../shadows';
import { tokens } from '../../tokens';

/**
 * Renders each elevation level side-by-side in light and dark contexts so that
 * designers/engineers can validate shadow legibility and layering in both modes.
 * Currently the shadow values are identical; if a dark theme variant set emerges
 * this component can accept an override prop.
 */
export const ElevationCompare: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'system-ui, sans-serif' }}>
      {shadows.map(s => (
        <div key={s.level} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 12, fontWeight: 600 }}>Level {s.level}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Surface
              mode="light"
              label="Light"
              shadow={s.value}
              bg={tokens.blueGray75}
              textColor={tokens.blue700}
            />
            <Surface
              mode="dark"
              label="Dark"
              shadow={s.value}
              bg={tokens.blueGray900}
              textColor={tokens.white}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

interface SurfaceProps {
  mode: 'light' | 'dark';
  label: string;
  shadow: string;
  bg: string;
  textColor: string;
}

const Surface: React.FC<SurfaceProps> = ({ label, shadow, bg, textColor }) => {
  return (
    <div
      style={{
        background: bg,
        padding: 20,
        borderRadius: 12,
        minHeight: 120,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        border: '1px solid rgba(0,0,0,0.05)'
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 600, color: textColor }}>{label}</div>
      <div
        style={{
          background: label === 'Dark' ? tokens.blueGray800 : '#ffffff',
          borderRadius: 10,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: shadow,
          color: textColor,
          fontSize: 12,
          fontWeight: 600
        }}
      >
        {shadow === 'none' ? 'none' : shadow.split(' rgba')[0] + ' …'}
      </div>
      <code style={{ fontSize: 10, opacity: 0.7, color: textColor }}>{shadow}</code>
    </div>
  );
};

export default ElevationCompare;
