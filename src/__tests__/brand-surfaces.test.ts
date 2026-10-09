import { describe, test, expect } from 'vitest';
import { tokens } from '../tokens';
import { semanticColors, semanticDarkOverrides } from '../semantic-tokens';

/**
 * Brand surfaces must stay brand-coloured — in BOTH modes.
 *
 * Why this file exists
 * --------------------
 * `surfaceHero` is the brand surface. Its dark override was repointed to
 * `gray950` (#3e4944) as collateral damage from removing the blueGray
 * palette, so Marsh's hero rendered SAGE GREEN in dark mode on every page
 * that used it. It survived because it broke no existing rule:
 *
 *   - the role -> semantic -> primitive chain was structurally valid;
 *   - `text.onHero` on it measured 7.61:1, comfortably past WCAG AA;
 *   - plenty of other semantics legitimately change colour family between
 *     modes (`surfaceNavigation` blue -> neutral950, `textPrimary` blue ->
 *     white), so it did not stand out as anomalous either.
 *
 * Two broader gates were prototyped and REJECTED as too noisy, which is why
 * this file is a narrow assertion instead:
 *
 *   1. "no semantic may resolve to an INTERPOLATED primitive" — flagged 51 of
 *      136 references, nearly all correct (`interactivePrimary` dark ->
 *      `blue400` is the deliberate lightening for dark mode).
 *   2. "flag brand-ramp -> neutral-ramp drift in dark" — flagged 6 sites, all
 *      six deliberate and correct.
 *
 * A gate with that false-positive rate gets suppressed within a month. So
 * rather than infer the rule heuristically, this encodes the DECISION that
 * was actually made: brand surfaces are pinned to brand primitives.
 *
 * Note this cannot catch the general class — a visually-wrong-but-valid token
 * is a job for dark-mode visual coverage, not static analysis. It catches
 * exactly this regression, with zero false positives.
 */

/**
 * The pin. Each brand surface names the PRIMITIVE it must equal in both modes.
 *
 * Deliberately the primitive, not the `brandPrimary` SEMANTIC: that overrides
 * to `#ffffff` in dark, so pinning to it would assert the hero should be
 * white. Aliasing `interactivePrimary` would be wrong for the opposite reason
 * — it lightens to `#95caff` for button fills on dark, putting `text.onHero`
 * on it at 1.40:1.
 */
const BRAND_SURFACE_PINS = {
  surfaceHero: 'blue1000',
} as const satisfies Record<string, keyof typeof tokens>;

/**
 * Brand surfaces that DO legitimately shift in dark, with the reason. Listed
 * explicitly so that adding one is a deliberate act rather than an omission —
 * if a surface is neither pinned above nor excused here, the final test fails.
 */
const INTENTIONALLY_MODE_SHIFTED: Record<string, string> = {
  surfaceNavigation:
    'the nav chrome goes neutral in dark so it recedes behind content rather than competing with it',
  surfaceNavigationHover: 'follows surfaceNavigation',
  surfaceNavigationActive: 'follows surfaceNavigation',
  surfaceRowHover: 'sky-blue row hover would glare on a dark grid; neutral900 is the dark equivalent',
};

describe('brand surfaces', () => {
  for (const [semantic, primitive] of Object.entries(BRAND_SURFACE_PINS)) {
    test(`${semantic} is ${primitive} in BOTH modes`, () => {
      const expected = tokens[primitive as keyof typeof tokens];

      const light = semanticColors[semantic as keyof typeof semanticColors];
      expect(light, `${semantic} (light) must be ${primitive}`).toBe(expected);

      // An absent override is correct: it inherits the light value. A PRESENT
      // override must still resolve to the same brand primitive.
      const darkOverride = (semanticDarkOverrides as Record<string, string | undefined>)[semantic];
      const dark = darkOverride ?? light;
      expect(
        dark,
        `${semantic} (dark) must be ${primitive} — it is the brand surface, and the ` +
          `brand colour does not change between modes. It was once gray950 (#3e4944), ` +
          `which rendered the hero sage green.`
      ).toBe(expected);
    });
  }

  test('no brand surface drifts to a neutral ramp in dark without being declared', () => {
    // Which primitive name does a value come from? Values are unique enough in
    // this palette for a reverse lookup to be unambiguous.
    const byValue = new Map<string, string>();
    for (const [name, value] of Object.entries(tokens)) {
      if (!byValue.has(value)) byValue.set(value, name);
    }
    const family = (primitiveName: string) => /^[a-zA-Z]+?(?=[0-9]|$)/.exec(primitiveName)?.[0] ?? primitiveName;
    const NEUTRAL_FAMILIES = new Set(['neutral', 'white', 'black', 'shades']);

    const undeclared: string[] = [];

    for (const [semantic, darkValue] of Object.entries(semanticDarkOverrides)) {
      if (!semantic.startsWith('surface')) continue;
      if (semantic in BRAND_SURFACE_PINS) continue;
      if (semantic in INTENTIONALLY_MODE_SHIFTED) continue;

      const lightValue = semanticColors[semantic as keyof typeof semanticColors];
      const lightPrim = byValue.get(lightValue);
      const darkPrim = byValue.get(darkValue as string);
      if (!lightPrim || !darkPrim) continue;

      const lightIsBrand = !NEUTRAL_FAMILIES.has(family(lightPrim));
      const darkIsNeutral = NEUTRAL_FAMILIES.has(family(darkPrim));

      if (lightIsBrand && darkIsNeutral) {
        undeclared.push(
          `${semantic}: ${lightPrim} (${lightValue}) -> ${darkPrim} (${darkValue})`
        );
      }
    }

    expect(
      undeclared,
      'A brand-coloured surface drops to a neutral ramp in dark mode. That is how ' +
        'surfaceHero became sage green. If it is deliberate, add it to ' +
        'INTENTIONALLY_MODE_SHIFTED with the reason; if not, repoint it to the ' +
        'brand primitive.'
    ).toEqual([]);
  });
});
