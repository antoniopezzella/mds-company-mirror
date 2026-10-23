import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { getRoleColor } from '../theme/roles';

// The `--ring` custom property (consumed by the shadcn/ui track's `ring-ring`
// Tailwind class, via `button.tsx`/`side-navigation.tsx`) is a second,
// independent copy of the same value `getRoleColor('border.focus')` resolves to
// — not derived from it. It already drifted once silently (a hand-transcribed
// HSL triplet that decoded to #0080ff instead of the intended #0b4bff). This
// test parses the two `--ring` declarations directly out of the CSS file and
// asserts they still match the token, so any future edit to either side that
// breaks the pairing fails CI instead of drifting unnoticed again.
//
// The declarations live in src/styles/token-variables.css, not src/index.css:
// they were extracted there so the app and the published package stylesheet
// share exactly one definition rather than each carrying its own copy — which
// is the same class of drift this test exists to catch.

const CSS_PATH = path.join(process.cwd(), 'src', 'styles', 'token-variables.css');

function extractRingValues(css: string): { root: string; dark: string } {
  const matches = [...css.matchAll(/--ring:\s*(#[0-9a-fA-F]{3,8});/g)].map((m) => m[1].toLowerCase());
  if (matches.length !== 2) {
    throw new Error(
      `Expected exactly 2 "--ring: #hex;" declarations in ${CSS_PATH}, found ${matches.length}`,
    );
  }
  return { root: matches[0], dark: matches[1] };
}

describe('--ring CSS variable stays in sync with the focus.ring role', () => {
  const css = fs.readFileSync(CSS_PATH, 'utf8');
  const { root, dark } = extractRingValues(css);

  test('light value matches focus.ring (light)', () => {
    expect(root).toBe(getRoleColor('border.focus', { mode: 'light' }).toLowerCase());
  });

  test('dark value matches focus.ring (dark)', () => {
    expect(dark).toBe(getRoleColor('border.focus', { mode: 'dark' }).toLowerCase());
  });
});
