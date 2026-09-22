// `originalValues` (the already-correct in-memory tokens/spacing/shadows/
// semanticColors/semanticDarkOverrides/meta, compiled by build-tokens.js
// before Style Dictionary runs) is threaded through as platform `options` so
// the legacy/* custom formats can reproduce today's exact output shape —
// see formats/legacy-tokens-json.mjs and formats/legacy-theme-css.mjs for why.
export function buildConfig(originalValues) {
  return {
    source: ['.tmp-token-build/tokens-dtcg/**/*.tokens.json'],
    platforms: {
      legacyJson: {
        buildPath: 'dist/',
        files: [{ destination: 'tokens.json', format: 'legacy/tokens-json' }],
        options: { originalValues },
      },
      css: {
        buildPath: 'dist/',
        files: [{ destination: 'theme.css', format: 'legacy/theme-css' }],
        options: { originalValues },
      },
    },
  };
}
