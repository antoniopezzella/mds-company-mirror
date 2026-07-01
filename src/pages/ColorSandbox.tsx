import React, { useState } from 'react';
import { tokens } from '../tokens';
import { semanticColors, semanticDarkOverrides } from '../semantic-tokens';

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = 'primitives' | 'semantic';

interface SwatchProps {
  name: string;
  value: string;
  isAnchor?: boolean;
  alias?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function contrastColor(hex: string): string {
  // Returns black or white based on perceived luminance
  const c = hex.replace('#', '');
  if (c.length !== 6) return '#000000';
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L > 0.35 ? '#000f47' : '#ffffff';
}

function isAlpha(value: string): boolean {
  return value.startsWith('rgba');
}

function alphaToHex(rgba: string): string {
  // Keep rgba as-is for display, but return a checkered pattern hint
  return rgba;
}

// ── Swatch ────────────────────────────────────────────────────────────────────

const Swatch: React.FC<SwatchProps> = ({ name, value, isAnchor, alias }) => {
  const [copied, setCopied] = useState(false);
  const alpha = isAlpha(value);
  const textColor = alpha ? '#000f47' : contrastColor(value);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div
      onClick={copy}
      title={`${name}: ${value}`}
      style={{
        cursor: 'pointer',
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid rgba(0,15,71,0.08)',
        boxShadow: isAnchor ? '0 0 0 2px #0b4bff' : undefined,
        userSelect: 'none',
      }}
    >
      {/* Colour block */}
      <div
        style={{
          height: 64,
          background: alpha
            ? `repeating-conic-gradient(#ccc 0% 25%, white 0% 50%) 0 0 / 12px 12px`
            : value,
          position: 'relative',
        }}
      >
        {alpha && (
          <div style={{ position: 'absolute', inset: 0, background: value }} />
        )}
        {isAnchor && (
          <span
            style={{
              position: 'absolute',
              top: 4,
              right: 6,
              fontSize: 8,
              fontFamily: 'monospace',
              color: textColor,
              opacity: 0.7,
              letterSpacing: '0.1em',
            }}
          >
            ★
          </span>
        )}
        {copied && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 11,
              fontFamily: 'monospace',
            }}
          >
            Copied
          </div>
        )}
      </div>

      {/* Label */}
      <div style={{ padding: '6px 8px', background: '#fff' }}>
        <div
          style={{
            fontSize: 10,
            fontFamily: 'monospace',
            color: '#000f47',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </div>
        {alias && (
          <div style={{ fontSize: 9, fontFamily: 'monospace', color: '#595959', marginTop: 1 }}>
            → {alias}
          </div>
        )}
        <div style={{ fontSize: 9, fontFamily: 'monospace', color: '#767676', marginTop: 1 }}>
          {value.length > 22 ? value.slice(0, 22) + '…' : value}
        </div>
      </div>
    </div>
  );
};

// ── Palette group ─────────────────────────────────────────────────────────────

interface PaletteGroupProps {
  label: string;
  accent?: string;
  swatches: { name: string; value: string; isAnchor?: boolean }[];
}

const PaletteGroup: React.FC<PaletteGroupProps> = ({ label, accent = '#000f47', swatches }) => (
  <div style={{ marginBottom: 40 }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
      }}
    >
      <div style={{ width: 3, height: 20, background: accent, borderRadius: 2 }} />
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          fontWeight: 700,
          color: '#000f47',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#767676' }}>
        {swatches.length} tokens
      </span>
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: 8,
      }}
    >
      {swatches.map((s) => (
        <Swatch key={s.name} {...s} />
      ))}
    </div>
  </div>
);

// ── Semantic swatch (wider, shows intent) ─────────────────────────────────────

interface SemanticSwatchProps {
  name: string;
  value: string;
  darkValue?: string;
  mode: 'light' | 'dark';
}

const SemanticSwatch: React.FC<SemanticSwatchProps> = ({ name, value, darkValue, mode }) => {
  const [copied, setCopied] = useState(false);
  const displayValue = mode === 'dark' && darkValue ? darkValue : value;
  const isOverridden = mode === 'dark' && darkValue !== undefined;
  const alpha = isAlpha(displayValue);
  const textColor = alpha ? '#000f47' : contrastColor(displayValue);

  const copy = () => {
    navigator.clipboard.writeText(displayValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div
      onClick={copy}
      title={`${name}: ${displayValue}`}
      style={{
        cursor: 'pointer',
        borderRadius: 4,
        overflow: 'hidden',
        border: `1px solid ${isOverridden ? 'rgba(11,75,255,0.3)' : 'rgba(0,15,71,0.08)'}`,
        boxShadow: isOverridden ? '0 0 0 1px rgba(11,75,255,0.15)' : undefined,
        userSelect: 'none',
      }}
    >
      <div
        style={{
          height: 56,
          background: alpha
            ? `repeating-conic-gradient(#ccc 0% 25%, white 0% 50%) 0 0 / 12px 12px`
            : displayValue,
          position: 'relative',
        }}
      >
        {alpha && <div style={{ position: 'absolute', inset: 0, background: displayValue }} />}
        {isOverridden && (
          <span
            style={{
              position: 'absolute',
              top: 4,
              right: 6,
              fontSize: 8,
              fontFamily: 'monospace',
              background: 'rgba(11,75,255,0.8)',
              color: '#fff',
              padding: '1px 4px',
              borderRadius: 2,
            }}
          >
            dark
          </span>
        )}
        {copied && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 11,
              fontFamily: 'monospace',
            }}
          >
            Copied
          </div>
        )}
      </div>
      <div
        style={{
          padding: '6px 8px',
          background: mode === 'dark' ? '#1a1a2e' : '#fff',
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontFamily: 'monospace',
            color: mode === 'dark' ? '#ceecff' : '#000f47',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 9,
            fontFamily: 'monospace',
            color: mode === 'dark' ? '#95caff' : '#767676',
            marginTop: 1,
          }}
        >
          {displayValue.length > 20 ? displayValue.slice(0, 20) + '…' : displayValue}
        </div>
      </div>
    </div>
  );
};

// ── Semantic group ────────────────────────────────────────────────────────────

interface SemanticGroupProps {
  label: string;
  accent?: string;
  entries: { name: string; value: string; darkValue?: string }[];
  mode: 'light' | 'dark';
}

const SemanticGroup: React.FC<SemanticGroupProps> = ({ label, accent = '#000f47', entries, mode }) => (
  <div style={{ marginBottom: 36 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
      <div style={{ width: 3, height: 18, background: accent, borderRadius: 2 }} />
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          fontWeight: 700,
          color: mode === 'dark' ? '#ceecff' : '#000f47',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#767676' }}>
        {entries.length} tokens
      </span>
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 8,
      }}
    >
      {entries.map((e) => (
        <SemanticSwatch key={e.name} mode={mode} {...e} />
      ))}
    </div>
  </div>
);

// ── Main page ─────────────────────────────────────────────────────────────────

const ANCHOR_STOPS = new Set([
  'blue250', 'blue500', 'blue750', 'blue1000', 'blue1100',
  'gold250', 'gold500', 'gold750', 'gold1000',
  'green250', 'green500', 'green750', 'green1000',
  'red250', 'red500', 'red750', 'red1000',
  'purple250', 'purple500', 'purple750', 'purple1000',
  'gray250', 'gray500', 'gray750', 'gray1000',
  'neutral250', 'neutral500', 'neutral750', 'neutral1000',
]);

function pickPalette(prefix: string): { name: string; value: string; isAnchor?: boolean }[] {
  return Object.entries(tokens)
    .filter(([k]) => k.startsWith(prefix) && !k.startsWith(prefix + 'shade'))
    .map(([k, v]) => ({ name: k, value: v as string, isAnchor: ANCHOR_STOPS.has(k) }));
}

function semanticEntry(name: string) {
  const value = semanticColors[name as keyof typeof semanticColors] as string;
  const darkValue = semanticDarkOverrides[name as keyof typeof semanticDarkOverrides] as string | undefined;
  return { name, value, darkValue };
}

export default function ColorSandbox() {
  const [tab, setTab] = useState<Tab>('primitives');
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const bgColor = mode === 'dark' && tab === 'semantic' ? '#0d0d1a' : '#f7f8f8';
  const textColor = mode === 'dark' && tab === 'semantic' ? '#ceecff' : '#000f47';

  // ── Primitive palettes ────────────────────────────────────────────────────
  const primitivePalettes: PaletteGroupProps[] = [
    {
      label: 'Blue',
      accent: '#0b4bff',
      swatches: pickPalette('blue'),
    },
    {
      label: 'Gold',
      accent: '#ffb700',
      swatches: pickPalette('gold'),
    },
    {
      label: 'Green',
      accent: '#2f7d32',
      swatches: pickPalette('green'),
    },
    {
      label: 'Red',
      accent: '#e53935',
      swatches: pickPalette('red'),
    },
    {
      label: 'Purple',
      accent: '#8f37c6',
      swatches: pickPalette('purple'),
    },
    {
      label: 'Gray',
      accent: '#787b78',
      swatches: pickPalette('gray'),
    },
    {
      label: 'Neutral',
      accent: '#4a4a4a',
      swatches: pickPalette('neutral'),
    },
    {
      label: 'Static',
      accent: '#000000',
      swatches: [
        { name: 'white', value: tokens.white },
        { name: 'black', value: tokens.black },
      ],
    },
    {
      label: 'Utilities',
      accent: '#14853d',
      swatches: [
        { name: 'statusCritical', value: tokens.statusCritical },
        { name: 'statusWarning', value: tokens.statusWarning },
        { name: 'statusSuccess', value: tokens.statusSuccess },
        { name: 'statusInfo', value: tokens.statusInfo },
        { name: 'focusCyan', value: tokens.focusCyan },
      ],
    },
    {
      label: 'Shades — White α',
      accent: '#ceecff',
      swatches: Object.entries(tokens)
        .filter(([k]) => k.startsWith('shadesWhite'))
        .map(([k, v]) => ({ name: k, value: v as string })),
    },
    {
      label: 'Shades — Black α',
      accent: '#595959',
      swatches: Object.entries(tokens)
        .filter(([k]) => k.startsWith('shadesBlack'))
        .map(([k, v]) => ({ name: k, value: v as string })),
    },
    {
      label: 'Shades — Midnight α',
      accent: '#000f47',
      swatches: Object.entries(tokens)
        .filter(([k]) => k.startsWith('shadesMidnight'))
        .map(([k, v]) => ({ name: k, value: v as string })),
    },
    {
      label: 'Shades — Active Blue α',
      accent: '#0b4bff',
      swatches: Object.entries(tokens)
        .filter(([k]) => k.startsWith('shadesActive'))
        .map(([k, v]) => ({ name: k, value: v as string })),
    },
  ];

  // ── Semantic groups ───────────────────────────────────────────────────────
  const semanticGroups: SemanticGroupProps[] = [
    {
      label: 'Brand',
      accent: '#000f47',
      entries: ['brandPrimary', 'brandPrimaryDark', 'brandSecondary', 'brandAccent'].map(semanticEntry),
      mode,
    },
    {
      label: 'Typography',
      accent: '#595959',
      entries: [
        'textPrimary', 'textPrimaryMode', 'textSecondary', 'textTertiary',
        'textOnAccent', 'textOnHero', 'textDisabled', 'textOnLight', 'textOnDark',
      ].map(semanticEntry),
      mode,
    },
    {
      label: 'Surfaces',
      accent: '#f7f8f8',
      entries: [
        'surfaceDefault', 'surfaceSubtle', 'surfaceMuted', 'surfaceAccent',
        'surfaceSecondaryHover', 'surfaceNavigation', 'surfaceNavigationMode',
        'surfaceNavigationHover', 'surfaceNavigationActive', 'surfaceAccentStrong',
        'surfaceHero', 'surfaceDisabled',
      ].map(semanticEntry),
      mode,
    },
    {
      label: 'Borders & Focus',
      accent: '#0b4bff',
      entries: [
        'borderSubtle', 'borderDefault', 'borderStrong',
        'borderFocus', 'borderFocusMode', 'focusRing',
      ].map(semanticEntry),
      mode,
    },
    {
      label: 'Interactive — Primary',
      accent: '#000f47',
      entries: [
        'interactivePrimary', 'interactivePrimaryHover',
        'interactivePrimaryActive', 'interactivePrimaryDisabled',
      ].map(semanticEntry),
      mode,
    },
    {
      label: 'Interactive — Secondary',
      accent: '#0b4bff',
      entries: [
        'interactiveSecondary', 'interactiveSecondaryHover',
        'interactiveSecondaryActive', 'interactiveSecondaryVisited',
      ].map(semanticEntry),
      mode,
    },
    {
      label: 'Interactive — Tertiary',
      accent: '#878787',
      entries: [
        'interactiveTertiary', 'interactiveTertiaryHover', 'interactiveTertiaryActive',
      ].map(semanticEntry),
      mode,
    },
    {
      label: 'Interactive — Danger',
      accent: '#e53935',
      entries: [
        'interactiveDanger', 'interactiveDangerHover', 'interactiveDangerActive', 'textOnDanger',
      ].map(semanticEntry),
      mode,
    },
    {
      label: 'Status — Success',
      accent: '#14853d',
      entries: [
        'statusSuccess', 'statusSuccessBg', 'statusSuccessBorder', 'statusSuccessText',
      ].map(semanticEntry),
      mode,
    },
    {
      label: 'Status — Warning',
      accent: '#ffb700',
      entries: [
        'statusWarning', 'statusWarningBg', 'statusWarningBorder', 'statusWarningText',
      ].map(semanticEntry),
      mode,
    },
    {
      label: 'Status — Danger',
      accent: '#e53935',
      entries: [
        'statusDanger', 'statusDangerBg', 'statusDangerBorder', 'statusDangerText',
      ].map(semanticEntry),
      mode,
    },
    {
      label: 'Status — Info',
      accent: '#6fb4ff',
      entries: [
        'statusInfo', 'statusInfoBg', 'statusInfoBorder', 'statusInfoText',
      ].map(semanticEntry),
      mode,
    },
  ];

  const totalPrimitives = Object.keys(tokens).length;
  const totalSemantic = Object.keys(semanticColors).length;
  const totalOverrides = Object.keys(semanticDarkOverrides).length;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: bgColor,
        color: textColor,
        fontFamily: '"Noto Sans", sans-serif',
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: '#000f47',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          padding: '0 40px',
          height: 56,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em' }}>
          MDS Color Sandbox
        </span>
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.15)' }} />

        {/* Tabs */}
        {(['primitives', 'semantic'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: tab === t ? '#ceecff' : 'rgba(255,255,255,0.45)',
              fontFamily: 'monospace',
              fontSize: 12,
              fontWeight: tab === t ? 700 : 400,
              padding: '0 4px',
              borderBottom: tab === t ? '2px solid #ceecff' : '2px solid transparent',
              paddingBottom: 4,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {t === 'primitives' ? `Primitives (${totalPrimitives})` : `Semantic (${totalSemantic})`}
          </button>
        ))}

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          {tab === 'semantic' && (
            <>
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                {totalOverrides} dark overrides
              </span>
              <button
                onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')}
                style={{
                  background: mode === 'dark' ? 'rgba(206,236,255,0.15)' : 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  padding: '4px 14px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  fontSize: 11,
                  letterSpacing: '0.05em',
                }}
              >
                {mode === 'light' ? '◑ Light' : '● Dark'}
              </button>
            </>
          )}
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
            Click any swatch to copy
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 40px 80px' }}>

        {tab === 'primitives' && (
          <>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: '#000f47' }}>
                Primitive Tokens
              </h1>
              <p style={{ fontSize: 13, color: '#595959', marginTop: 6, fontFamily: 'monospace' }}>
                {totalPrimitives} raw values across 7 palettes + static + utilities + 4 shade sets
                &nbsp;·&nbsp; ★ = Figma anchor
              </p>
            </div>
            {primitivePalettes.map((p) => (
              <PaletteGroup key={p.label} {...p} />
            ))}
          </>
        )}

        {tab === 'semantic' && (
          <>
            <div style={{ marginBottom: 32 }}>
              <h1
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  margin: 0,
                  color: mode === 'dark' ? '#ffffff' : '#000f47',
                }}
              >
                Semantic Tokens
              </h1>
              <p
                style={{
                  fontSize: 13,
                  color: mode === 'dark' ? '#ceecff' : '#595959',
                  marginTop: 6,
                  fontFamily: 'monospace',
                }}
              >
                {totalSemantic} intent aliases referencing primitives
                &nbsp;·&nbsp; {totalOverrides} dark mode overrides
                &nbsp;·&nbsp; Blue badge = value changes in dark mode
              </p>
            </div>
            {semanticGroups.map((g) => (
              <SemanticGroup key={g.label} {...g} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
