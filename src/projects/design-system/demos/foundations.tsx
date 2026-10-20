import * as React from 'react';
import {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  Settings,
  Trash2,
  Download,
  Copy,
  Calendar,
  Clock,
  Info,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Star,
  Plus,
  Minus,
  ArrowRight,
  LogOut,
  Shield,
  FileText,
  Globe,
  Bold,
} from 'lucide-react';
import { getRoleColor } from '@/theme/roles';
import { useThemeMode } from '@/theme/ThemeModeContext';
import { tokens } from '@/tokens';
import { spacing } from '@/spacing';
import { shadows } from '@/shadows';
import { Button } from '@/components/ui/button';

// ── Principles ──────────────────────────────────────────────────────────
// Content sourced from docs/foundations/DESIGN.md (this repo's Stitch-format
// brand identity file) — not duplicated invention.

const PRINCIPLES = [
  {
    title: 'Institutional, not sterile',
    body: 'A deep navy (Midnight Blue) anchors nearly every dark surface and primary action, paired with a warm, slightly off-white neutral — trustworthy without tipping into cold.',
  },
  {
    title: 'One place for warmth',
    body: 'Display type is a serif (Marsh Serif) at generous, regular weight — the one place the brand allows itself a point of view. Everything functional stays Noto Sans.',
  },
  {
    title: 'Small, consistent corners',
    body: 'Corners are close to square (2–8px). No pill buttons, no heavily rounded cards — sharp, small-radius corners are part of the precise, institutional feel.',
  },
  {
    title: 'Darken, don’t lighten, on hover',
    body: 'Interactive elements get darker on hover in light mode (the opposite of many lighter brand systems) — navy is the "full strength" state.',
  },
];

export function PrinciplesDemo() {
  const { mode } = useThemeMode();
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {PRINCIPLES.map((p) => (
        <div key={p.title} className="rounded-lg border p-4" style={{ borderColor: getRoleColor('border.default', { mode }) }}>
          <h5 className="text-sm font-semibold" style={{ color: getRoleColor('fg.primary', { mode }) }}>
            {p.title}
          </h5>
          <p className="mt-1 text-sm" style={{ color: getRoleColor('fg.neutral.subtle', { mode }) }}>
            {p.body}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── Tokens ──────────────────────────────────────────────────────────────
// Direct `tokens` import is a deliberate, established exception for a
// reference/inspector page (matches src/pages/ColorSandbox.tsx's own
// precedent) — the whole point of this section is to display primitives,
// not consume them for styling.

const PALETTES = ['blue', 'gold', 'green', 'red', 'purple', 'neutral'] as const;
const STOPS = [50, 100, 200, 250, 300, 400, 500, 600, 700, 750, 800, 900, 950, 1000] as const;

function TokenArchitectureRow({ step, file, name, value, note }: { step: string; file: string; name: string; value: string; note: string }) {
  const { mode } = useThemeMode();
  return (
    <div className="flex items-start gap-4 border-b py-3 last:border-b-0" style={{ borderColor: getRoleColor('border.default', { mode }) }}>
      <span
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
        style={{ backgroundColor: getRoleColor('bg.neutral.subtle', { mode }), color: getRoleColor('fg.primary', { mode }) }}
      >
        {step}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs" style={{ color: getRoleColor('fg.neutral.subtle', { mode }) }}>
          {file}
        </p>
        <p className="font-mono text-sm" style={{ color: getRoleColor('fg.primary', { mode }) }}>
          {name} <span style={{ color: getRoleColor('fg.neutral.subtle', { mode }) }}>= {value}</span>
        </p>
        <p className="mt-0.5 text-xs" style={{ color: getRoleColor('fg.neutral.subtle', { mode }) }}>
          {note}
        </p>
      </div>
    </div>
  );
}

export function TokensDemo() {
  const { mode } = useThemeMode();
  const bodyColor = getRoleColor('fg.neutral.subtle', { mode });
  const headingColor = getRoleColor('fg.primary', { mode });

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm" style={{ color: bodyColor }}>
          Tokens exist so a color decision is made exactly once and consumed everywhere — change{' '}
          <code className="font-mono">interactivePrimary</code> in one file and every button, link, and focus state
          in the app updates, in both themes, without touching a single component. We never let a component reach
          for a raw value directly; it asks for a <em>role</em>, and the role resolves to whatever the current
          brand and theme say that role should be right now.
        </p>
        <p className="mt-3 text-sm" style={{ color: bodyColor }}>
          Three layers, each with a different job:
        </p>
        <div className="mt-3 rounded-lg border p-4" style={{ borderColor: getRoleColor('border.default', { mode }) }}>
          <TokenArchitectureRow
            step="1"
            file="src/tokens.ts — primitives (167 values, 7 palettes)"
            name="blue1000"
            value="#000f47"
            note="Raw hex, no meaning attached. Named by palette + step, not by what it's for. Never referenced by a component."
          />
          <TokenArchitectureRow
            step="2"
            file="src/semantic-tokens.ts — semantics (63 aliases)"
            name="interactivePrimary"
            value="blue1000"
            note="Gives the primitive intent — 'this is the primary interactive color' — and carries the dark-mode override (blue400 in semanticDarkOverrides). Still not consumed directly by components."
          />
          <TokenArchitectureRow
            step="3"
            file="src/theme/roles.ts — roles (41 names, the public API)"
            name="interactive.primary"
            value="interactivePrimary"
            note="What a component actually asks for: getRoleColor('interactive.primary'). One role can be reassigned to a different semantic later without any component changing."
          />
        </div>
      </div>

      <div>
        <h5 className="text-sm font-semibold" style={{ color: headingColor }}>
          Primitives — the raw palette
        </h5>
        <p className="mt-1 text-sm" style={{ color: bodyColor }}>
          167 values across 7 palettes, 14 stops each. Reference only — see the <strong>Color</strong> section for
          the role layer components actually use.
        </p>
        <div className="mt-4 space-y-3">
          {PALETTES.map((palette) => (
            <div key={palette} className="flex items-center gap-1">
              <span className="w-16 shrink-0 text-xs capitalize" style={{ color: bodyColor }}>
                {palette}
              </span>
              {STOPS.map((stop) => {
                const key = `${palette}${stop}` as keyof typeof tokens;
                const value = tokens[key];
                if (!value) return null;
                return (
                  <div
                    key={key}
                    title={`${key}: ${value}`}
                    className="h-8 flex-1 rounded-md border"
                    style={{ backgroundColor: value, borderColor: getRoleColor('border.default', { mode }) }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-sm font-semibold" style={{ color: headingColor }}>
          Governance
        </h5>
        <p className="mt-1 text-sm" style={{ color: bodyColor }}>
          <code className="font-mono">npm run roles:check</code> scans every component for a direct{' '}
          <code className="font-mono">tokens.*</code> or <code className="font-mono">semanticColors.*</code>{' '}
          reference and fails the build if it finds one — the role layer is enforced, not just documented.
        </p>
        <CodeBlock>{`// ✅ Good\nimport { getRoleColor } from '@/theme/roles';\n<Button sx={{ backgroundColor: getRoleColor('interactive.primary') }} />\n\n// ❌ Fails roles:check\nimport { tokens } from '@/tokens';\n<Button sx={{ backgroundColor: tokens.blue1000 }} />`}</CodeBlock>
      </div>

      <div>
        <h5 className="text-sm font-semibold" style={{ color: headingColor }}>
          Build pipeline
        </h5>
        <p className="mt-1 text-sm" style={{ color: bodyColor }}>
          The three TypeScript files above are the single source of truth. <code className="font-mono">npm run tokens:build</code>{' '}
          compiles them into <code className="font-mono">dist/tokens.json</code> (portable, for other tools/platforms) and{' '}
          <code className="font-mono">dist/theme.css</code> (CSS custom properties, keyed off <code className="font-mono">[data-theme]</code>).
        </p>
      </div>
    </div>
  );
}

// ── Color ───────────────────────────────────────────────────────────────
// Role-level swatches (not primitives — that's the Tokens section above).
// This is what components actually consume via getRoleColor(); toggle the
// header's theme control to see the same roles resolve for dark mode.

const COLOR_GROUPS: Array<{ label: string; roles: import('@/theme/roles').RoleName[] }> = [
  { label: 'Brand & text', roles: ['bg.accent', 'fg.primary', 'fg.neutral.subtle', 'fg.disabled'] },
  { label: 'Surface', roles: ['bg.default', 'bg.neutral.subtle', 'bg.neutral.subtle', 'bg.shell'] },
  { label: 'Border & focus', roles: ['border.default', 'border.strong', 'border.focus'] },
  { label: 'Interactive', roles: ['interactive.primary', 'interactive.primary.hover', 'interactive.secondary', 'interactive.danger'] },
  {
    label: 'Status',
    roles: [
      'fg.success',
      'bg.success.subtle',
      'fg.warning',
      'bg.warning.subtle',
      'fg.critical',
      'bg.critical.subtle',
      'fg.info',
      'bg.info.subtle',
    ],
  },
];

const LIGHT_DARK_COMPARISON: Array<{ role: import('@/theme/roles').RoleName; note: string }> = [
  { role: 'interactive.primary', note: 'Lightens rather than inverts to white — buttons stay legible and colored on dark, not plain white-on-navy chrome.' },
  { role: 'fg.primary', note: 'Inverts fully: Midnight Blue on light, white on dark.' },
  { role: 'bg.default', note: 'Inverts fully: white page background on light, near-black (#101010) on dark.' },
  { role: 'bg.accent', note: 'Deliberately unchanged — the gold CTA accent stays fixed in both modes.' },
];

export function ColorDemo() {
  const { mode } = useThemeMode();
  const bodyColor = getRoleColor('fg.neutral.subtle', { mode });
  const headingColor = getRoleColor('fg.primary', { mode });

  return (
    <div className="space-y-8">
      <p className="text-sm" style={{ color: bodyColor }}>
        The role layer — the only color API components use, via <code className="font-mono">getRoleColor(role, {'{'} mode {'}'})</code>.
        Roles are what make theming possible: a component that asks for <code className="font-mono">interactive.primary</code>{' '}
        never needs to know or care which theme is active — the role resolves the right value for whichever mode is current.
      </p>

      <div>
        <h5 className="mb-2 text-sm font-semibold" style={{ color: headingColor }}>
          Light vs. dark isn't a simple inversion
        </h5>
        <p className="mb-3 text-sm" style={{ color: bodyColor }}>
          Each role decides its own dark-mode behavior — some invert, some lighten, some stay fixed. Shown below regardless of the page's own current theme, so both are visible at once.
        </p>
        <div className="space-y-3">
          {LIGHT_DARK_COMPARISON.map(({ role, note }) => (
            <div key={role} className="flex items-start gap-4 rounded-lg border p-3" style={{ borderColor: getRoleColor('border.default', { mode }) }}>
              <div className="flex shrink-0 gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: getRoleColor(role, { mode: 'light' }), borderColor: getRoleColor('border.default', { mode }) }} />
                  <span className="text-[10px]" style={{ color: bodyColor }}>light</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: getRoleColor(role, { mode: 'dark' }), borderColor: getRoleColor('border.default', { mode }) }} />
                  <span className="text-[10px]" style={{ color: bodyColor }}>dark</span>
                </div>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-sm" style={{ color: headingColor }}>
                  {role}
                </p>
                <p className="text-xs" style={{ color: bodyColor }}>
                  {note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h5 className="mb-3 text-sm font-semibold" style={{ color: headingColor }}>
          Full role reference (current theme)
        </h5>
        <p className="mb-3 text-sm" style={{ color: bodyColor }}>
          Toggle light/dark in the header above to see every swatch below resolve live.
        </p>
        {COLOR_GROUPS.map((group) => (
        <div key={group.label}>
          <h5 className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: getRoleColor('fg.neutral.subtle', { mode }) }}>
            {group.label}
          </h5>
          <div className="flex flex-wrap gap-3">
            {group.roles.map((role) => {
              const value = getRoleColor(role, { mode });
              return (
                <div key={role} className="flex flex-col items-center gap-1.5">
                  <div
                    className="h-12 w-12 rounded-md border"
                    style={{ backgroundColor: value, borderColor: getRoleColor('border.default', { mode }) }}
                    title={value}
                  />
                  <span className="max-w-[72px] text-center text-[10px] leading-tight" style={{ color: getRoleColor('fg.neutral.subtle', { mode }) }}>
                    {role}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

// ── Icons ───────────────────────────────────────────────────────────────

const ICONS: Array<{ name: string; Icon: React.ComponentType<{ className?: string }> }> = [
  { name: 'Check', Icon: Check },
  { name: 'X', Icon: X },
  { name: 'ChevronDown', Icon: ChevronDown },
  { name: 'ChevronUp', Icon: ChevronUp },
  { name: 'Search', Icon: Search },
  { name: 'Settings', Icon: Settings },
  { name: 'Trash2', Icon: Trash2 },
  { name: 'Download', Icon: Download },
  { name: 'Copy', Icon: Copy },
  { name: 'Calendar', Icon: Calendar },
  { name: 'Clock', Icon: Clock },
  { name: 'Info', Icon: Info },
  { name: 'AlertCircle', Icon: AlertCircle },
  { name: 'AlertTriangle', Icon: AlertTriangle },
  { name: 'CheckCircle2', Icon: CheckCircle2 },
  { name: 'Star', Icon: Star },
  { name: 'Plus', Icon: Plus },
  { name: 'Minus', Icon: Minus },
  { name: 'ArrowRight', Icon: ArrowRight },
  { name: 'LogOut', Icon: LogOut },
  { name: 'Shield', Icon: Shield },
  { name: 'FileText', Icon: FileText },
  { name: 'Globe', Icon: Globe },
  { name: 'Bold', Icon: Bold },
];

export function IconsDemo() {
  const { mode } = useThemeMode();
  return (
    <div>
      <p className="text-sm" style={{ color: getRoleColor('fg.neutral.subtle', { mode }) }}>
        <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="underline">
          lucide-react
        </a>{' '}
        — the icon set used across <code className="font-mono">src/components/ui/*</code>. A representative sample
        of icons already in use, not the full library.
      </p>
      <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
        {ICONS.map(({ name, Icon }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-1.5 rounded-md p-3"
            style={{ color: getRoleColor('fg.primary', { mode }) }}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px]" style={{ color: getRoleColor('fg.neutral.subtle', { mode }) }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Typography ──────────────────────────────────────────────────────────
// Renders the real CSS custom properties from src/styles/_typography.scss —
// what you see here is exactly what the app renders, not a recreation.

const TYPE_VARIANTS = [
  { key: 'h1', label: 'H1 — Marsh Serif' },
  { key: 'h2', label: 'H2 — Marsh Serif' },
  { key: 'h3', label: 'H3 — Marsh Serif' },
  { key: 'body1', label: 'Body 1 — Noto Sans' },
  { key: 'subtitle1', label: 'Subtitle 1 — Noto Sans Medium' },
  { key: 'caption', label: 'Caption — Noto Sans' },
  { key: 'overline', label: 'Overline — Noto Sans' },
] as const;

export function TypographyDemo() {
  const { mode } = useThemeMode();
  return (
    <div className="space-y-4">
      {TYPE_VARIANTS.map((v) => (
        <div key={v.key} className="flex items-baseline gap-4 border-b pb-3" style={{ borderColor: getRoleColor('border.default', { mode }) }}>
          <span className="w-32 shrink-0 text-xs" style={{ color: getRoleColor('fg.neutral.subtle', { mode }) }}>
            {v.label}
          </span>
          <span
            style={{
              color: getRoleColor('fg.primary', { mode }),
              fontFamily: `var(--typo-${v.key}-font-family)`,
              fontWeight: `var(--typo-${v.key}-font-weight)` as unknown as number,
              fontSize: `var(--typo-${v.key}-font-size)`,
              lineHeight: `var(--typo-${v.key}-line-height)`,
              textTransform: v.key === 'overline' ? 'uppercase' : undefined,
            }}
          >
            The quick brown fox jumps
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Spacing ─────────────────────────────────────────────────────────────

export function SpacingDemo() {
  const { mode } = useThemeMode();
  const max = spacing[spacing.length - 1];
  return (
    <div className="space-y-2">
      {spacing.map((px) => (
        <div key={px} className="flex items-center gap-3">
          <span className="w-10 shrink-0 text-right text-xs font-mono" style={{ color: getRoleColor('fg.neutral.subtle', { mode }) }}>
            {px}
          </span>
          <div
            className="h-3 rounded-md"
            style={{ width: `${(px / max) * 100}%`, backgroundColor: getRoleColor('interactive.primary', { mode }) }}
          />
        </div>
      ))}
    </div>
  );
}

// ── Grid ────────────────────────────────────────────────────────────────
// This system's grid is plain Tailwind (`grid grid-cols-*`/`col-span-*`),
// the same utility classes used throughout src/components/ui/* — there is
// no separate bespoke grid layer for the shadcn set (src/pages/GridShowcase.tsx
// is a different, older CSS-Grid utility-class system predating the shadcn
// migration; not part of this track).

function CodeBlock({ children }: { children: string }) {
  const { mode } = useThemeMode();
  return (
    <pre
      className="mt-3 overflow-x-auto rounded-md p-3 text-xs"
      style={{ backgroundColor: getRoleColor('bg.neutral.subtle', { mode }), color: getRoleColor('fg.primary', { mode }) }}
    >
      <code className="font-mono">{children}</code>
    </pre>
  );
}

export function GridDemo() {
  const { mode } = useThemeMode();
  const labelColor = getRoleColor('fg.neutral.subtle', { mode });
  const cellStyle = { backgroundColor: getRoleColor('bg.neutral.subtle', { mode }), color: labelColor };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm" style={{ color: labelColor }}>
          Responsive column count — 4 columns on mobile, 8 on tablet, 12 at desktop widths. Resize the window to see it shift.
        </p>
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8 lg:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex h-10 items-center justify-center rounded-md text-xs" style={cellStyle}>
              {i + 1}
            </div>
          ))}
        </div>
        <CodeBlock>{`<div className="grid grid-cols-4 gap-2 sm:grid-cols-8 lg:grid-cols-12">\n  {items.map((item) => <div key={item.id}>{item.content}</div>)}\n</div>`}</CodeBlock>
      </div>

      <div>
        <p className="text-sm" style={{ color: labelColor }}>
          Real usage — a lead card spanning more columns than its siblings via <code className="font-mono">col-span-*</code>.
        </p>
        <div className="mt-4 grid grid-cols-4 gap-3">
          <div className="col-span-4 flex h-16 items-center justify-center rounded-md text-sm sm:col-span-2" style={cellStyle}>
            col-span-4 sm:col-span-2
          </div>
          <div className="col-span-2 flex h-16 items-center justify-center rounded-md text-sm sm:col-span-1" style={cellStyle}>
            col-span-1
          </div>
          <div className="col-span-2 flex h-16 items-center justify-center rounded-md text-sm sm:col-span-1" style={cellStyle}>
            col-span-1
          </div>
        </div>
        <CodeBlock>{`<div className="grid grid-cols-4 gap-3">\n  <div className="col-span-4 sm:col-span-2">Lead card</div>\n  <div className="col-span-2 sm:col-span-1">Card</div>\n  <div className="col-span-2 sm:col-span-1">Card</div>\n</div>`}</CodeBlock>
      </div>
    </div>
  );
}

// ── Elevation ───────────────────────────────────────────────────────────

export function ElevationDemo() {
  const { mode } = useThemeMode();
  return (
    <div className="grid grid-cols-3 gap-6 sm:grid-cols-6">
      {shadows.map((s) => (
        <div key={s.level} className="flex flex-col items-center gap-2">
          <div
            className="h-16 w-16 rounded-md"
            style={{ boxShadow: s.value, backgroundColor: getRoleColor('bg.default', { mode }) }}
            title={s.usage}
          />
          <span className="text-xs" style={{ color: getRoleColor('fg.neutral.subtle', { mode }) }}>
            Level {s.level}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Radius ──────────────────────────────────────────────────────────────

const RADII = [
  { label: 'sm', px: 2 },
  { label: 'md', px: 4 },
  { label: 'lg', px: 8 },
];

export function RadiusDemo() {
  const { mode } = useThemeMode();
  return (
    <div className="flex gap-6">
      {RADII.map((r) => (
        <div key={r.label} className="flex flex-col items-center gap-2">
          <div
            className="h-16 w-16"
            style={{ borderRadius: r.px, backgroundColor: getRoleColor('interactive.primary', { mode }) }}
          />
          <span className="text-xs font-mono" style={{ color: getRoleColor('fg.neutral.subtle', { mode }) }}>
            {r.label} — {r.px}px
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Accessibility ───────────────────────────────────────────────────────

export function AccessibilityDemo() {
  const { mode } = useThemeMode();
  const textColor = getRoleColor('fg.neutral.subtle', { mode });
  return (
    <div className="space-y-4">
      <ul className="list-disc space-y-1.5 pl-5 text-sm" style={{ color: textColor }}>
        <li>Text on surfaces holds WCAG AA: 4.5:1 minimum for body text, 3:1 for large text and UI borders.</li>
        <li>Every interactive element gets a visible focus ring via <code className="font-mono">focus.ring</code> — never removed, only restyled.</li>
        <li>Keyboard navigation (Tab, Arrow keys, Enter/Space) is a requirement, not an enhancement, for every interactive component.</li>
      </ul>
      <div>
        <p className="mb-2 text-xs" style={{ color: textColor }}>
          Tab to this button to see the real focus ring:
        </p>
        <Button variant="secondary">Focus me</Button>
      </div>
    </div>
  );
}
