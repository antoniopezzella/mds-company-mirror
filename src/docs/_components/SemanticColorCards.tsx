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
      { name: 'brandPrimary',   description: 'Midnight Blue — primary CTA & brand identity' },
      { name: 'brandSecondary', description: 'Sky Blue — secondary brand accent' },
      { name: 'brandAccent',    description: 'Gold — supporting accent / decorative' },
    ],
  },
  {
    label: 'Text',
    tokens: [
      { name: 'textPrimary',   description: 'Primary body & UI text' },
      { name: 'textSecondary', description: 'Muted secondary text' },
      { name: 'textTertiary',  description: 'Placeholder / tertiary text' },
      { name: 'textOnAccent',  description: 'Text on Midnight / accent surfaces' },
      { name: 'textOnHero',    description: 'Text on dark hero sections' },
      { name: 'textDisabled',  description: 'Disabled text & icons' },
    ],
  },
  {
    label: 'Surfaces',
    tokens: [
      { name: 'surfaceDefault',        description: 'Default page background' },
      { name: 'surfaceSubtle',         description: 'Slightly elevated background' },
      { name: 'surfaceAccent',         description: 'Warm accent background' },
      { name: 'surfaceNavigation',     description: 'Header / sidebar background' },
      { name: 'surfaceNavigationHover', description: 'Nav item hover overlay' },
      { name: 'surfaceHero',           description: 'Dark hero background' },
      { name: 'surfaceDisabled',       description: 'Disabled element surface' },
    ],
  },
  {
    label: 'Borders',
    tokens: [
      { name: 'borderSubtle',  description: 'Very light dividers' },
      { name: 'borderDefault', description: 'Standard borders & outlines' },
      { name: 'borderStrong',  description: 'Emphasized borders' },
      { name: 'focusRing',     description: 'Focus ring / keyboard highlight' },
    ],
  },
  {
    label: 'Interactive',
    tokens: [
      { name: 'interactivePrimary',        description: 'Primary interactive element' },
      { name: 'interactivePrimaryHover',   description: 'Primary hover state' },
      { name: 'interactivePrimaryActive',  description: 'Primary active / pressed state' },
      { name: 'interactiveSecondary',      description: 'Active Blue — links & secondary actions' },
      { name: 'interactiveSecondaryHover', description: 'Secondary hover state' },
      { name: 'interactiveDanger',         description: 'Destructive action base' },
      { name: 'interactiveDangerHover',    description: 'Destructive hover state' },
    ],
  },
  {
    label: 'Status — Success',
    tokens: [
      { name: 'statusSuccess',       description: 'Success accent color' },
      { name: 'statusSuccessBg',     description: 'Success background' },
      { name: 'statusSuccessText',   description: 'Success text / icon' },
      { name: 'statusSuccessBorder', description: 'Success border' },
    ],
  },
  {
    label: 'Status — Warning',
    tokens: [
      { name: 'statusWarning',       description: 'Warning accent color' },
      { name: 'statusWarningBg',     description: 'Warning background' },
      { name: 'statusWarningText',   description: 'Warning text / icon' },
      { name: 'statusWarningBorder', description: 'Warning border' },
    ],
  },
  {
    label: 'Status — Danger',
    tokens: [
      { name: 'statusDanger',       description: 'Danger accent color' },
      { name: 'statusDangerBg',     description: 'Danger background' },
      { name: 'statusDangerText',   description: 'Danger text / icon' },
      { name: 'statusDangerBorder', description: 'Danger border' },
    ],
  },
  {
    label: 'Status — Info',
    tokens: [
      { name: 'statusInfo',       description: 'Info accent color' },
      { name: 'statusInfoBg',     description: 'Info background' },
      { name: 'statusInfoText',   description: 'Info text / icon' },
      { name: 'statusInfoBorder', description: 'Info border' },
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
        style={{ background: hex, height: 56, cursor: 'pointer', position: 'relative' }}
        onClick={handleCopyHex}
        title={`Click to copy ${hex}`}
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
          style={{
            fontSize: 11, fontFamily: 'monospace', fontWeight: 600,
            color: '#000f47', cursor: 'pointer', marginBottom: 2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}
          onClick={handleCopyName}
          title={`Click to copy token name: ${entry.name}`}
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
