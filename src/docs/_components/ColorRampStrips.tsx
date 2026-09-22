import React, { useState } from 'react';
import { tokens } from '../../tokens';

// ── Data ──────────────────────────────────────────────────────────────────────
// Derived from the real src/tokens.ts at render time, not a hand-copied
// duplicate — a prior hardcoded version of this file drifted out of sync with
// several real token corrections (see docs/FIGMA_PRIMITIVE_TOKEN_ASSESSMENT.md)
// without anyone noticing, since nothing re-checked it against the source.

interface Stop { scale: string; hex: string; anchor?: boolean }
interface Palette { name: string; stops: Stop[] }

const PALETTE_NAMES = ['Blue', 'Gold', 'Green', 'Red', 'Purple', 'Gray', 'Neutral'] as const;

// Which stops are Figma-verified anchors — design metadata, not a color
// value, so (unlike hex) it's fine for this to be hand-maintained here.
// Sourced from tokens.ts's own "★ ... anchor" comments; update this if those
// change. Anything not listed renders as an interpolated stop.
const ANCHOR_STOPS: Record<(typeof PALETTE_NAMES)[number], string[]> = {
  Blue: ['250', '500', '600', '750', '900', '950', '1000', '1100'],
  Gold: ['250', '300', '400', '500', '600', '650', '750', '850', '950', '1000'],
  Green: ['250', '500', '750', '1000'],
  Red: ['250', '500', '750', '1000'],
  Purple: ['250', '500', '750', '1000'],
  Gray: ['150', '250', '350', '450', '500', '550', '650', '750', '850', '1000'],
  Neutral: ['200', '250', '500', '600', '750', '800', '950', '1000'],
};

// Only the canonical "00"/"50"-ending scale steps — excludes one-off derived
// utilities like blue975/blue990 (alpha-blend approximations for nav hover/
// active, not primary ramp rungs).
const SCALE_RE = /^(\d+)(?:00|50)$/;

function buildPalettes(): Palette[] {
  return PALETTE_NAMES.map((name) => {
    const prefix = name.toLowerCase();
    const anchors = ANCHOR_STOPS[name];
    const stops: Stop[] = Object.entries(tokens)
      .filter(([key]) => key.startsWith(prefix) && SCALE_RE.test(key.slice(prefix.length)))
      .map(([key, hex]) => {
        const scale = key.slice(prefix.length);
        return { scale, hex: hex as string, anchor: anchors.includes(scale) };
      })
      .sort((a, b) => Number(a.scale) - Number(b.scale));
    return { name, stops };
  });
}

const PALETTES: Palette[] = buildPalettes();

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

  const handleClick = () => {
    copyToClipboard(stop.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      title={`${paletteName} ${stop.scale} — ${stop.hex}`}
      aria-label={`Copy ${paletteName} ${stop.scale} hex value ${stop.hex}`}
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
