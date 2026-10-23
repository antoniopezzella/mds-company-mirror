import React, { useState } from 'react';
import { semanticColors, semanticDarkOverrides, type SemanticColorName } from '../../semantic-tokens';

// ── Types ─────────────────────────────────────────────────────────────────────

interface TokenEntry {
  name: SemanticColorName;
  description: string;
}

interface Group { label: string; tokens: TokenEntry[] }

// ── Token catalogue ───────────────────────────────────────────────────────────

const GROUPS: Group[] = [
  {
    label: 'Brand',
    tokens: [
      { name: 'brand.primary',   description: 'Midnight Blue — primary CTA & brand identity' },
      { name: 'bg.secondary', description: 'Sky Blue — secondary brand accent' },
      { name: 'bg.accent',    description: 'Gold — supporting accent / decorative' },
    ],
  },
  {
    label: 'Text',
    tokens: [
      { name: 'fg.primary',   description: 'Primary body & UI text' },
      { name: 'fg.neutral.subtle', description: 'Muted secondary text' },
      { name: 'fg.input.placeholder',  description: 'Placeholder / tertiary text' },
      { name: 'fg.on-accent',  description: 'Text on Midnight / accent surfaces' },
      { name: 'fg.on-primary',    description: 'Text on dark hero sections' },
      { name: 'fg.disabled',  description: 'Disabled text & icons' },
    ],
  },
  {
    label: 'Surfaces',
    tokens: [
      { name: 'bg.default',        description: 'Default page background' },
      { name: 'bg.neutral.subtle',         description: 'Slightly elevated background' },
      { name: 'bg.neutral',         description: 'Warm accent background' },
      { name: 'bg.shell',     description: 'Header / sidebar background' },
      { name: 'bg.shell.hover', description: 'Nav item hover overlay' },
      { name: 'bg.primary',           description: 'Dark hero background' },
      { name: 'bg.disabled',       description: 'Disabled element surface' },
      { name: 'bg.raised',         description: 'Panel above the page — lifted in dark, flush in light' },
    ],
  },
  {
    label: 'Borders',
    tokens: [
      { name: 'border.subtle',  description: 'Hairline rules inside a surface (translucent in dark)' },
      { name: 'border.default', description: 'Standard borders & outlines' },
      { name: 'border.strong',  description: 'Emphasized borders' },
      { name: 'border.focus',     description: 'Focus ring / keyboard highlight' },
    ],
  },
  {
    label: 'Interactive',
    tokens: [
      { name: 'interactive.primary',        description: 'Primary interactive element' },
      { name: 'interactive.primary.hover',   description: 'Primary hover state' },
      { name: 'interactive.primary.active',  description: 'Primary active / pressed state' },
      { name: 'interactive.secondary',      description: 'Active Blue — links & secondary actions' },
      { name: 'interactive.secondary.hover', description: 'Secondary hover state' },
      { name: 'interactive.danger',         description: 'Destructive action base' },
      { name: 'interactive.danger.hover',    description: 'Destructive hover state' },
    ],
  },
  {
    label: 'Status — Success',
    tokens: [
      { name: 'status.success',       description: 'Success accent color' },
      { name: 'bg.success.subtle',     description: 'Success background' },
      { name: 'fg.success',   description: 'Success text / icon' },
      { name: 'border.success', description: 'Success border' },
    ],
  },
  {
    label: 'Status — Warning',
    tokens: [
      { name: 'status.warning',       description: 'Warning accent color' },
      { name: 'bg.warning.subtle',     description: 'Warning background' },
      { name: 'fg.warning',   description: 'Warning text / icon' },
      { name: 'border.warning', description: 'Warning border' },
    ],
  },
  {
    label: 'Status — Danger',
    tokens: [
      { name: 'status.danger',       description: 'Danger accent color' },
      { name: 'bg.critical.subtle',     description: 'Danger background' },
      { name: 'fg.critical',   description: 'Danger text / icon' },
      { name: 'border.critical', description: 'Danger border' },
    ],
  },
  {
    label: 'Status — Info',
    tokens: [
      { name: 'status.info',       description: 'Info accent color' },
      { name: 'bg.info.subtle',     description: 'Info background' },
      { name: 'fg.info',   description: 'Info text / icon' },
      { name: 'border.info', description: 'Info border' },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function isLight(hex: string): boolean {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 150;
}

function copyToClipboard(text: string) {
  navigator.clipboard?.writeText(text).catch(() => {});
}

function resolve(name: SemanticColorName, mode: 'light' | 'dark'): string {
  if (mode === 'dark' && name in semanticDarkOverrides) {
    return semanticDarkOverrides[name] ?? semanticColors[name];
  }
  return semanticColors[name];
}

function hasDarkOverride(name: SemanticColorName): boolean {
  return name in semanticDarkOverrides;
}

// ── Token card ────────────────────────────────────────────────────────────────

const TokenCard: React.FC<{ entry: TokenEntry; mode: 'light' | 'dark' }> = ({ entry, mode }) => {
  const [copiedHex, setCopiedHex] = useState(false);
  const [copiedName, setCopiedName] = useState(false);

  const hex = resolve(entry.name, mode);
  const light = isLight(hex);
  const hasDark = hasDarkOverride(entry.name);
  const lightHex = semanticColors[entry.name];
  const darkHex = hasDark ? (semanticDarkOverrides[entry.name] ?? lightHex) : lightHex;

  const handleCopyHex = () => {
    copyToClipboard(hex);
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 1200);
  };

  const handleCopyName = () => {
    copyToClipboard(entry.name);
    setCopiedName(true);
    setTimeout(() => setCopiedName(false), 1200);
  };

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e8e8e8',
      borderRadius: 8,
      overflow: 'hidden',
      fontFamily: 'system-ui, sans-serif',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      {/* Swatch */}
      <div
        role="button"
        tabIndex={0}
        style={{ background: hex, height: 56, cursor: 'pointer', position: 'relative' }}
        onClick={handleCopyHex}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCopyHex();
          }
        }}
        title={`Click to copy ${hex}`}
        aria-label={`Copy hex value ${hex}`}
      >
        {copiedHex && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
            color: light ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
          }}>
            COPIED
          </div>
        )}
        {!copiedHex && (
          <div style={{
            position: 'absolute', right: 6, bottom: 6,
            fontSize: 10, fontFamily: 'monospace',
            color: light ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.55)',
          }}>
            {hex}
          </div>
        )}
        {!hasDark && mode === 'dark' && (
          <div style={{
            position: 'absolute', left: 6, top: 6,
            fontSize: 9, padding: '2px 5px', borderRadius: 3,
            background: 'rgba(0,0,0,0.28)', color: '#fff', letterSpacing: '0.03em',
          }}>
            no override
          </div>
        )}
      </div>

      {/* Meta */}
      <div style={{ padding: '8px 10px 10px' }}>
        <div
          role="button"
          tabIndex={0}
          style={{
            fontSize: 11, fontFamily: 'monospace', fontWeight: 600,
            color: '#000f47', cursor: 'pointer', marginBottom: 2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}
          onClick={handleCopyName}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCopyName();
            }
          }}
          title={`Click to copy token name: ${entry.name}`}
          aria-label={`Copy token name ${entry.name}`}
        >
          {copiedName ? '✔ copied' : entry.name}
        </div>
        <div style={{ fontSize: 10, color: '#888', lineHeight: 1.35 }}>
          {entry.description}
        </div>
        {hasDark && (
          <div style={{
            display: 'flex', gap: 4, marginTop: 6, alignItems: 'center',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: lightHex, border: '1px solid rgba(0,0,0,0.1)', flexShrink: 0 }} />
            <div style={{ width: 10, height: 10, borderRadius: 2, background: darkHex, border: '1px solid rgba(0,0,0,0.1)', flexShrink: 0 }} />
            <span style={{ fontSize: 9, color: '#bbb' }}>light / dark</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main export ───────────────────────────────────────────────────────────────

export const SemanticColorCards: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Mode toggle */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginBottom: 28,
      }}>
        <span style={{ fontSize: 13, color: '#666' }}>Viewing:</span>
        <div style={{
          display: 'flex', background: '#f0f0f0',
          borderRadius: 6, padding: 3, gap: 2,
        }}>
          {(['light', 'dark'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '4px 14px', borderRadius: 4, border: 'none',
                cursor: 'pointer', fontSize: 12, fontWeight: 500,
                fontFamily: 'system-ui',
                background: mode === m ? '#000f47' : 'transparent',
                color: mode === m ? '#fff' : '#666',
                transition: 'all 0.15s ease',
              }}
            >
              {m === 'light' ? '☀ Light' : '◑ Dark'}
            </button>
          ))}
        </div>
        <span style={{ fontSize: 11, color: '#aaa' }}>
          Tokens with a dark override show their dark value when toggled
        </span>
      </div>

      {/* Groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {GROUPS.map(group => (
          <div key={group.label}>
            <div style={{
              fontSize: 12, fontWeight: 700, color: '#000f47',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: 12, paddingBottom: 6,
              borderBottom: '1px solid #e8e8e8',
            }}>
              {group.label}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: 10,
            }}>
              {group.tokens.map(entry => (
                <TokenCard key={entry.name} entry={entry} mode={mode} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SemanticColorCards;
