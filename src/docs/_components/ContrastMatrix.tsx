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
  { fg: tokens.blue700, bg: tokens.white, label: 'Blue700 on White' },
  { fg: tokens.white, bg: tokens.blue700, label: 'White on Blue700' },
  { fg: tokens.blue700, bg: tokens.blueGray75, label: 'Blue700 on BlueGray75' },
  { fg: tokens.white, bg: tokens.blueGray900, label: 'White on BlueGray900' },
  { fg: tokens.gray900, bg: tokens.white, label: 'Gray900 on White' },
  { fg: tokens.gray700, bg: tokens.white, label: 'Gray700 on White' },
  { fg: tokens.green600, bg: tokens.white, label: 'Green600 on White' },
  { fg: tokens.yellow500, bg: tokens.blue700, label: 'Yellow500 on Blue700' },
  // Dark mode focused pairs
  { fg: tokens.blue300, bg: tokens.blueGray900, label: 'Blue300 on BlueGray900' },
  { fg: tokens.gray400, bg: tokens.blueGray900, label: 'Gray400 on BlueGray900' },
  { fg: tokens.green300, bg: tokens.blueGray900, label: 'Green300 on BlueGray900' },
  { fg: tokens.crimson600, bg: tokens.white, label: 'Crimson600 on White' },
  // Warning semantic examples (foreground on background + on white)
  { fg: tokens.amber900, bg: tokens.amber100, label: 'Warning Text on Warning Bg' },
  { fg: tokens.amber900, bg: tokens.white, label: 'Warning Text on White' },
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
      rows={rows as any}
      caption={`Contrast ratios computed per WCAG 2.1 (AA normal ≥ ${minimumAA}, large text ≥ ${minimumAALarge}).`}
    />
  );
};

export default ContrastMatrix;
