import React from 'react';
import { tokens } from '../../tokens';
import { TokenTable } from './TokenTable';

interface Pair { fg: string; bg: string; label?: string }

export interface ContrastMatrixProps {
  pairs?: Pair[];
  minimumAA?: number; // default 4.5 normal text
  minimumAALarge?: number; // default 3.0 large text
}

// Utility functions (self‑contained to avoid extra deps)
const hexToRgb = (hex: string): [number, number, number] => {
  if (!hex || typeof hex !== 'string') {
    console.warn('hexToRgb received invalid input:', hex);
    return [0, 0, 0]; // fallback to black
  }
  const v = hex.replace('#','');
  const full = v.length === 3 ? v.split('').map(c => c + c).join('') : v;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const luminance = (r: number, g: number, b: number) => {
  const toLin = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const [R, G, B] = [toLin(r), toLin(g), toLin(b)];
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

const contrastRatio = (hex1: string, hex2: string): number => {
  const [r1,g1,b1] = hexToRgb(hex1);
  const [r2,g2,b2] = hexToRgb(hex2);
  const L1 = luminance(r1,g1,b1) + 0.05;
  const L2 = luminance(r2,g2,b2) + 0.05;
  const ratio = L1 > L2 ? L1 / L2 : L2 / L1;
  return Number(ratio.toFixed(2));
};

const defaultPairs: Pair[] = [
  { fg: tokens.blue750, bg: tokens.white, label: 'Blue750 (Active/links) on White' },
  { fg: tokens.white, bg: tokens.blue750, label: 'White on Blue750' },
  { fg: tokens.blue1000, bg: tokens.neutral50, label: 'Blue1000 (brand) on Neutral50' },
  { fg: tokens.white, bg: tokens.blue1000, label: 'White on Blue1000 (Midnight)' },
  { fg: tokens.neutral1000, bg: tokens.white, label: 'Neutral1000 on White' },
  { fg: tokens.neutral700, bg: tokens.white, label: 'Neutral700 on White' },
  { fg: tokens.statusSuccess, bg: tokens.white, label: 'StatusSuccess on White' },
  { fg: tokens.gold750, bg: tokens.blue1000, label: 'Gold750 (CTA) on Blue1000' },
  // Dark mode focused pairs
  { fg: tokens.blue500, bg: tokens.neutral950, label: 'Blue500 on Neutral950 (dark bg)' },
  { fg: tokens.neutral500, bg: tokens.neutral950, label: 'Neutral500 on Neutral950' },
  { fg: tokens.green400, bg: tokens.neutral950, label: 'Green400 on Neutral950' },
  { fg: tokens.statusCritical, bg: tokens.white, label: 'StatusCritical on White' },
  // Warning semantic examples (foreground on background + on white)
  { fg: tokens.statusWarning, bg: tokens.gold50, label: 'Warning Text on Warning Bg' },
  { fg: tokens.statusWarning, bg: tokens.white, label: 'Warning Text on White' },
];

export const ContrastMatrix: React.FC<ContrastMatrixProps> = ({
  pairs = defaultPairs,
  minimumAA = 4.5,
  minimumAALarge = 3.0,
}) => {
  const rows = pairs.map(p => {
    const ratio = contrastRatio(p.fg, p.bg);
    const passAA = ratio >= minimumAA;
    const passAALarge = ratio >= minimumAALarge;
    const badgeColor = passAA ? '#14853d' : passAALarge ? '#ffbe00' : '#c53532';
    const badgeLabel = passAA ? 'AA' : passAALarge ? 'AA Large' : 'Fail';
    return {
      pair: p.label || `${p.fg} on ${p.bg}`,
      preview: (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{
            padding: '6px 10px',
            background: p.bg,
            color: p.fg,
            border: '1px solid #e0e0e0',
            borderRadius: 6,
            minWidth: 110,
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 600,
            boxShadow: '0 1px 2px rgba(0,0,0,0.06)'
          }}>Aa</div>
          <code style={{ fontSize: 11 }}>{p.fg} / {p.bg}</code>
        </div>
      ),
      ratio: ratio,
      status: (
        <span style={{
          display: 'inline-block',
          background: badgeColor,
          color: '#fff',
          padding: '2px 6px',
            borderRadius: 4,
          fontSize: 10,
          fontWeight: 600
        }}>{badgeLabel}</span>
      )
    };
  });

  return (
    <TokenTable
      columns={[
        { key: 'pair', label: 'Pair' },
        { key: 'preview', label: 'Preview' },
        { key: 'ratio', label: 'Contrast', align: 'right', width: 90 },
        { key: 'status', label: 'Status', width: 80, align: 'center' }
      ]}
      rows={rows}
      caption={`Contrast ratios computed per WCAG 2.1 (AA normal ≥ ${minimumAA}, large text ≥ ${minimumAALarge}).`}
    />
  );
};

export default ContrastMatrix;
