import React, { useState } from 'react';

// ── Data ──────────────────────────────────────────────────────────────────────

interface Stop { scale: string; hex: string; anchor?: boolean }
interface Palette { name: string; stops: Stop[] }

const PALETTES: Palette[] = [
  {
    name: 'Blue',
    stops: [
      { scale: '50',   hex: '#f5fbff' },
      { scale: '100',  hex: '#ebf7ff' },
      { scale: '200',  hex: '#d8f0ff' },
      { scale: '250',  hex: '#ceecff', anchor: true },
      { scale: '300',  hex: '#bbe1ff' },
      { scale: '400',  hex: '#95caff' },
      { scale: '500',  hex: '#6fb4ff' },
      { scale: '600',  hex: '#478aff' },
      { scale: '700',  hex: '#1f60ff', anchor: true },
      { scale: '750',  hex: '#0b4bff' },
      { scale: '800',  hex: '#093fda' },
      { scale: '900',  hex: '#042791' },
      { scale: '950',  hex: '#021b6c' },
      { scale: '1000', hex: '#000f47', anchor: true },
    ],
  },
  {
    name: 'Gold',
    stops: [
      { scale: '50',   hex: '#fffcf8' },
      { scale: '100',  hex: '#fff8ed' },
      { scale: '200',  hex: '#fff5e1' },
      { scale: '250',  hex: '#fff2da' },
      { scale: '300',  hex: '#ffe0bd' },
      { scale: '400',  hex: '#ffbd84' },
      { scale: '500',  hex: '#ff994a' },
      { scale: '600',  hex: '#ffa02e' },
      { scale: '700',  hex: '#ffab14' },
      { scale: '750',  hex: '#ffb700', anchor: true },
      { scale: '800',  hex: '#f5a907' },
      { scale: '900',  hex: '#e09015' },
      { scale: '950',  hex: '#d5831c' },
      { scale: '1000', hex: '#cb7623' },
    ],
  },
  {
    name: 'Green',
    stops: [
      { scale: '50',   hex: '#f8fcf7' },
      { scale: '100',  hex: '#f2faef' },
      { scale: '200',  hex: '#e5f5df' },
      { scale: '250',  hex: '#def2d7' },
      { scale: '300',  hex: '#ceeac9' },
      { scale: '400',  hex: '#addbae' },
      { scale: '500',  hex: '#8dcc92', anchor: true },
      { scale: '600',  hex: '#7cc664' },
      { scale: '700',  hex: '#6cc044' },
      { scale: '750',  hex: '#64bc30' },
      { scale: '800',  hex: '#54a731' },
      { scale: '900',  hex: '#449631' },
      { scale: '950',  hex: '#3a8a32' },
      { scale: '1000', hex: '#2f7d32', anchor: true },
    ],
  },
  {
    name: 'Red',
    stops: [
      { scale: '50',   hex: '#fffafa' },
      { scale: '100',  hex: '#fff4f4' },
      { scale: '200',  hex: '#ffeded' },
      { scale: '250',  hex: '#ffe8e8' },
      { scale: '300',  hex: '#ffcfcf' },
      { scale: '400',  hex: '#ff9d9d' },
      { scale: '500',  hex: '#ff6b6b', anchor: true },
      { scale: '600',  hex: '#f55555' },
      { scale: '700',  hex: '#ec4540' },
      { scale: '750',  hex: '#e53935' },
      { scale: '800',  hex: '#d33330' },
      { scale: '900',  hex: '#af2625' },
      { scale: '950',  hex: '#9d201f' },
      { scale: '1000', hex: '#8b1a1a', anchor: true },
    ],
  },
  {
    name: 'Purple',
    stops: [
      { scale: '50',   hex: '#fef8fe' },
      { scale: '100',  hex: '#fcf1fc' },
      { scale: '200',  hex: '#f7ebfe' },
      { scale: '250',  hex: '#f2e6ff' },
      { scale: '300',  hex: '#e9d3ff' },
      { scale: '400',  hex: '#dcbaff' },
      { scale: '500',  hex: '#c88fff', anchor: true },
      { scale: '600',  hex: '#b96bf5' },
      { scale: '700',  hex: '#ab5aea' },
      { scale: '750',  hex: '#8f37c6' },
      { scale: '800',  hex: '#842daf' },
      { scale: '900',  hex: '#7720b0' },
      { scale: '950',  hex: '#6a18a3' },
      { scale: '1000', hex: '#5e0f95', anchor: true },
    ],
  },
  {
    name: 'Gray',
    stops: [
      { scale: '50',   hex: '#fdfefe' },
      { scale: '100',  hex: '#fbfbfb' },
      { scale: '200',  hex: '#f9f9f9' },
      { scale: '250',  hex: '#f7f8f8', anchor: true },
      { scale: '300',  hex: '#eaebea' },
      { scale: '400',  hex: '#cfd0cd' },
      { scale: '500',  hex: '#b4b6b1' },
      { scale: '600',  hex: '#9c9e9a' },
      { scale: '700',  hex: '#8a8c88' },
      { scale: '750',  hex: '#787b78' },
      { scale: '800',  hex: '#6a6e6b' },
      { scale: '900',  hex: '#4d5551' },
      { scale: '950',  hex: '#3e4944' },
      { scale: '1000', hex: '#303c37' },
    ],
  },
  {
    name: 'Neutral',
    stops: [
      { scale: '50',   hex: '#f8f8f8' },
      { scale: '100',  hex: '#eeeeee' },
      { scale: '200',  hex: '#e3e3e3' },
      { scale: '250',  hex: '#dadada', anchor: true },
      { scale: '300',  hex: '#c4c4c4' },
      { scale: '400',  hex: '#a8a8a8' },
      { scale: '500',  hex: '#878787' },
      { scale: '600',  hex: '#767676' },
      { scale: '700',  hex: '#595959', anchor: true },
      { scale: '750',  hex: '#4a4a4a' },
      { scale: '800',  hex: '#3b3b3b' },
      { scale: '900',  hex: '#252525' },
      { scale: '950',  hex: '#101010' },
      { scale: '1000', hex: '#000000' },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function isLight(hex: string): boolean {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 155;
}

function copyToClipboard(text: string) {
  navigator.clipboard?.writeText(text).catch(() => {});
}

// ── Stop cell ─────────────────────────────────────────────────────────────────

const StopCell: React.FC<{ stop: Stop; paletteName: string }> = ({ stop, paletteName }) => {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const light = isLight(stop.hex);
  const labelColor = light ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.6)';
  const strongColor = light ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.9)';

  const handleClick = () => {
    copyToClipboard(stop.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div
      style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      title={`${paletteName} ${stop.scale} — ${stop.hex}`}
    >
      {/* Swatch */}
      <div
        style={{
          backgroundColor: stop.hex,
          height: 72,
          position: 'relative',
          transition: 'transform 0.12s ease',
          transform: hovered ? 'scaleY(1.06)' : 'scaleY(1)',
          transformOrigin: 'bottom',
          outline: stop.anchor ? `2px solid ${light ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.28)'}` : 'none',
          outlineOffset: -2,
        }}
      >
        {copied && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 700,
            color: light ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
            fontFamily: 'system-ui',
            letterSpacing: '0.04em',
          }}>
            COPIED
          </div>
        )}
        {hovered && !copied && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontFamily: 'monospace',
            color: light ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.75)',
          }}>
            {stop.hex}
          </div>
        )}
      </div>

      {/* Label */}
      <div style={{
        padding: '5px 0 0',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{
          fontSize: 10,
          fontWeight: stop.anchor ? 700 : 400,
          color: stop.anchor ? '#000f47' : '#666',
          letterSpacing: stop.anchor ? '0.02em' : 0,
        }}>
          {stop.scale}
        </div>
        {stop.anchor && (
          <div style={{ fontSize: 9, color: '#999', fontFamily: 'monospace', marginTop: 1 }}>
            {stop.hex}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

export const ColorRampStrips: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'system-ui, sans-serif' }}>
    {PALETTES.map(palette => (
      <div key={palette.name}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 8,
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#000f47', minWidth: 56 }}>
            {palette.name}
          </span>
          <span style={{ fontSize: 11, color: '#999' }}>
            {palette.stops.length} stops · click any swatch to copy hex
          </span>
        </div>
        <div style={{ display: 'flex', gap: 2, borderRadius: 6, overflow: 'hidden' }}>
          {palette.stops.map(stop => (
            <StopCell key={stop.scale} stop={stop} paletteName={palette.name} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default ColorRampStrips;
