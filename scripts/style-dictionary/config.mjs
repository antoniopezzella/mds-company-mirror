// `originalValues` (the already-correct in-memory tokens/spacing/shadows/
// semanticColors/semanticDarkOverrides/meta, compiled by build-tokens.js
// before Style Dictionary runs) is threaded through as platform `options` so
// the legacy/* custom formats can reproduce today's exact output shape —
// see formats/legacy-tokens-json.mjs and formats/legacy-theme-css.mjs for why.
// `name/camel` derives each token's `name` from its FULL path rather than the
// default, which uses only the last path segment. Without it, Style Dictionary
// collapses `role.color.text.primary` and `role.color.interactive.primary` to
// the same name (`primary`) and warns "token collisions were found; output may
// be unexpected" on every build — 8 collision groups across both platforms,
// including the status* tokens, which appear in all three of the primitive,
// semantic, and semanticDark layers by design.
//
// That warning was always cosmetic: the legacy/* formats below rebuild their
// output from `options.originalValues` and never read `token.name`, so the
// colliding names were computed and discarded. But a scary warning on the
// design system's primary artifact, printed on every `npm run tokens:build`,
// is not something a new contributor can tell is benign — so the names are now
// made genuinely unique instead of the warning being silenced. Output is
// byte-identical before and after (verified against a pinned baseline).
const NAME_TRANSFORMS = ['name/camel'];

export function buildConfig(originalValues) {
  return {
    source: ['.tmp-token-build/tokens-dtcg/**/*.tokens.json'],
    platforms: {
      legacyJson: {
        transforms: NAME_TRANSFORMS,
        buildPath: 'dist/',
        files: [{ destination: 'tokens.json', format: 'legacy/tokens-json' }],
        options: { originalValues },
      },
      css: {
        transforms: NAME_TRANSFORMS,
        buildPath: 'dist/',
        files: [{ destination: 'theme.css', format: 'legacy/theme-css' }],
        options: { originalValues },
      },
    },
  };
}
