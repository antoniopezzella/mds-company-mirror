import { camelToKebab } from '../../token-utils/kebab.js';

// Reproduces `dist/theme.css` exactly as scripts/build-tokens.js generated it
// before this migration — same two invariants src/__tests__/tokens.theme-css.test.ts
// checks: a `:root` block with `--primitive-*`/`--color-*` vars, and a
// `[data-theme="dark"]` block with the dark-mode `--color-*` overrides. Reads
// the original in-memory values via platform `options`, same reasoning as
// legacy-tokens-json.mjs.
export const legacyThemeCssFormat = {
  name: 'legacy/theme-css',
  format: ({ options }) => {
    const { tokens, semanticColors, semanticDarkOverrides } = options.originalValues;

    const light = semanticColors;
    const dark = { ...semanticColors, ...semanticDarkOverrides };

    const linesRoot = [':root {'];
    for (const [k, v] of Object.entries(tokens)) {
      linesRoot.push(`  --primitive-${camelToKebab(k)}: ${v};`);
    }
    for (const [k, v] of Object.entries(light)) {
      linesRoot.push(`  --color-${camelToKebab(k)}: ${v};`);
    }
    linesRoot.push('}');

    const linesDark = ['[data-theme="dark"] {'];
    for (const [k, v] of Object.entries(dark)) {
      linesDark.push(`  --color-${camelToKebab(k)}: ${v};`);
    }
    linesDark.push('}');

    return `${linesRoot.join('\n')}\n\n${linesDark.join('\n')}\n`;
  },
};
