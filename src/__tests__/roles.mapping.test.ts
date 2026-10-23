import { describe, it, expect, afterEach } from 'vitest';
import { getRoleColor, listRoles } from '../theme/roles';

// Basic contract tests for role resolution

/**
 * A role must resolve to a colour a browser will accept.
 *
 * This used to assert `startsWith('#')`, which was a proxy for "is a colour"
 * and held only while every token was an opaque hex. `border.subtle` is
 * deliberately translucent in dark mode — a hairline has to composite over
 * whatever surface it lands on — so the hex check would have rejected a
 * correct value.
 *
 * Widened rather than dropped: the point of the test is that no role resolves
 * to `undefined`, an empty string, or a raw token name, and that is still
 * enforced. A stricter form would parse the value; `#` was never doing that.
 */
const COLOUR = /^(#[0-9a-f]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\))$/i;

describe('roles mapping', () => {
  it('every listed role resolves in light & dark to a valid CSS colour', () => {
    const roles = listRoles();
    for (const r of roles) {
      for (const mode of ['light', 'dark'] as const) {
        const value = getRoleColor(r.role, { mode });
        if (typeof value !== 'string' || !COLOUR.test(value)) {
          throw new Error(`Role ${r.role} ${mode} value invalid: ${JSON.stringify(value)}`);
        }
      }
    }
  });
});

/**
 * getRoleColor() with no explicit mode reads the mode off <html>. Two
 * mechanisms are live during the token-pipeline migration — the `dark` class
 * and `data-theme` — and the attribute is checked first, because a surface can
 * carry `data-theme`/`data-surface` WITHOUT the page-level class (a light card
 * inside a navy band). Reading the class there would resolve the card's inline
 * colours against the page mode instead of its own. See
 * docs/tasks/token-pipeline-migration.md step 2.
 */
describe('DOM mode fallback', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.removeAttribute('data-theme');
  });

  const probe = 'fg.primary' as const;
  const light = getRoleColor(probe, { mode: 'light' });
  const dark = getRoleColor(probe, { mode: 'dark' });

  it('the probe role actually differs between modes (or this suite proves nothing)', () => {
    expect(light).not.toBe(dark);
  });

  it('a bare document resolves light', () => {
    expect(getRoleColor(probe)).toBe(light);
  });

  it('data-theme="dark" alone resolves dark', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    expect(getRoleColor(probe)).toBe(dark);
  });

  it('the dark class alone still resolves dark (consumers setting only the class)', () => {
    document.documentElement.classList.add('dark');
    expect(getRoleColor(probe)).toBe(dark);
  });

  it('data-theme wins over a conflicting class', () => {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'light');
    expect(getRoleColor(probe)).toBe(light);
  });

  it('an unrecognised data-theme falls back to the class', () => {
    document.documentElement.setAttribute('data-theme', 'sepia');
    document.documentElement.classList.add('dark');
    expect(getRoleColor(probe)).toBe(dark);
  });
});
