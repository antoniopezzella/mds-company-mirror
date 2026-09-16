// Reproduces the exact `dist/tokens.json` shape this repo's governance
// scripts (check-contrast.js, validate-tokens.js, diff-tokens.js) and
// tokens.schema.json depend on today. Deliberately reads the *original*
// in-memory values passed in via platform `options` (see config.mjs) rather
// than reconstructing shape from Style Dictionary's own resolved
// `dictionary.allTokens` — the legacy shape (a flat hex-string `color` map, a
// plain `spacing` number array, `shadows` objects with a free-text `usage`
// field, a hand-authored `meta` block with no token representation) doesn't
// map cleanly onto a generic DTCG-tree walk, and getting this byte-compatible
// is the entire point of this format.
export const legacyTokensJsonFormat = {
  name: 'legacy/tokens-json',
  format: ({ options }) => {
    const { tokens, spacing, shadows, semanticColors, semanticDarkOverrides, meta } =
      options.originalValues;

    const artifact = {
      $schema: 'https://example.com/design-tokens.schema.json',
      meta,
      color: tokens,
      spacing,
      shadows,
      semantic: {
        color: semanticColors,
        modes: {
          dark: semanticDarkOverrides,
        },
      },
    };

    return JSON.stringify(artifact, null, 2);
  },
};
