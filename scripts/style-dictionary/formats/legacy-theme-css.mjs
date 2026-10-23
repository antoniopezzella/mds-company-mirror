import { camelToKebab } from '../../token-utils/kebab.js';

// Reproduces `dist/theme.css` exactly as scripts/build-tokens.js generated it
// before this migration — same two invariants src/__tests__/tokens.theme-css.test.ts
// checks: a `:root` block with `--primitive-*`/`--color-*` vars, and a
// `[data-theme="dark"]` block with the dark-mode `--color-*` overrides. Reads
// the original in-memory values via platform `options`, same reasoning as
// legacy-tokens-json.mjs.
//
// ── The role tier ──────────────────────────────────────────────────────────
// `--role-*` is emitted here too, and that is newer than the rest of this
// file. Before it, the ROLE tier — the only tier CLAUDE.md permits components
// to consume — had **no static CSS representation anywhere**. The sole
// mechanism that ever defined a `--role-*` property was a `useEffect` in
// `src/theme/RoleVarsProvider.tsx`, i.e. a React component.
//
// That worked everywhere we looked and nowhere we shipped: `src/main.tsx` and
// `.storybook/preview.tsx` both mount the provider, so the dev app, Storybook
// and every a11y test had the variables defined. The published package did
// not. `dist-pkg/styles.css` referenced five `--role-*` properties (Button's
// fill colours) and defined zero, so a consumer following README.package.md
// rendered a primary button with no background.
//
// Emitting them statically is purely ADDITIVE: RoleVarsProvider sets its
// values via an inline `style` attribute, which outranks any stylesheet, so
// nested per-panel modes keep overriding these defaults exactly as before.
const roleVarName = (role) =>
  // Dots to dashes and NOTHING else — this must match `roleNameToVar` in
  // src/theme/RoleVarsProvider.tsx:24-26 byte for byte, because Button's
  // classes are generated from that convention.
  //
  // Do NOT reach for camelToKebab here. `text.onInteractive` has to stay
  // `--role-fg-on-interactive`; kebab-casing the segments yields
  // `--role-text-on-interactive`, which resolves to nothing, and every
  // destructive button silently falls back to inherited navy at 3.38:1. That
  // exact bug already shipped once — see src/components/ui/button.tsx:53-65.
  `--role-${role.replaceAll('.', '-')}`;

export const legacyThemeCssFormat = {
  name: 'legacy/theme-css',
  format: ({ options }) => {
    const { tokens, semanticColors, semanticDarkOverrides, roleMap, getRoleColor } = options.originalValues;

    const light = semanticColors;
    const dark = { ...semanticColors, ...semanticDarkOverrides };

    // Resolve through getRoleColor, the same way build-tokens.js emits
    // roles.generated.css. This used to index the semantic palette directly —
    // a second copy of the resolution rules, and once roles could be PINNED to
    // a Figma token (step 4 of the token-pipeline migration) that copy went
    // stale: the role tier followed Figma while this export, which external
    // consumers read, kept the old semantic value. Found on 2026-10-23, two
    // days after the pin landed, because Figma moved border/default and only
    // one of the two outputs followed.
    const roleLines = (mode) =>
      Object.keys(roleMap ?? {}).map(
        (role) => `  ${roleVarName(role)}: ${getRoleColor(role, { mode })};`
      );

    const linesRoot = [':root {'];
    for (const [k, v] of Object.entries(tokens)) {
      linesRoot.push(`  --primitive-${camelToKebab(k)}: ${v};`);
    }
    for (const [k, v] of Object.entries(light)) {
      // semantic keys are dotted (fg.primary) since the 2026-10-21 rename;
      // dots are illegal-ish in a CSS var name and inconsistent with --role-*,
      // so collapse them to dashes (camelToKebab leaves dots untouched).
      linesRoot.push(`  --color-${camelToKebab(k).replaceAll('.', '-')}: ${v};`);
    }
    linesRoot.push(...roleLines('light'));
    linesRoot.push('}');

    const darkDecls = [
      ...Object.entries(dark).map(([k, v]) => `  --color-${camelToKebab(k).replaceAll('.', '-')}: ${v};`),
      ...roleLines('dark'),
    ];

    // BOTH dark selectors, deliberately.
    //
    // `[data-theme="dark"]` is what this file has always emitted and nothing
    // in this repo sets it — that is intentional, `dist/theme.css` is a
    // portable export for Figma/Style-Dictionary/non-React consumers
    // (see the header note in build-tokens.js). Dropping it would break that
    // contract.
    //
    // `.dark` is what the live system actually toggles: index.html's
    // pre-paint script, ThemeModeContext, Tailwind's `darkMode: ['class']`,
    // and `currentDomMode()` in roles.ts all agree on it. Emitting only
    // `[data-theme]` would ship a stylesheet whose light values are correct
    // and whose dark values never activate — a silent failure of exactly the
    // family check-role-usage.js's header documents.
    const linesDark = ['[data-theme="dark"] {', ...darkDecls, '}'];
    const linesDarkClass = ['.dark {', ...darkDecls, '}'];

    return `${linesRoot.join('\n')}\n\n${linesDark.join('\n')}\n\n${linesDarkClass.join('\n')}\n`;
  },
};
