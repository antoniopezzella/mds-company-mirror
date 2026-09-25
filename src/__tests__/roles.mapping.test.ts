import { describe, it } from 'vitest';
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
