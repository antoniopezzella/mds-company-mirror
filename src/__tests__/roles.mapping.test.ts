import { describe, it } from 'vitest';
import { getRoleColor, listRoles } from '../theme/roles';

// Basic contract tests for role resolution

describe('roles mapping', () => {
  it('every listed role resolves in light & dark without throwing', () => {
    const roles = listRoles();
    for (const r of roles) {
      const light = getRoleColor(r.role, { mode: 'light' });
      const dark = getRoleColor(r.role, { mode: 'dark' });
      if (typeof light !== 'string' || !light.startsWith('#')) throw new Error(`Role ${r.role} light value invalid`);
      if (typeof dark !== 'string' || !dark.startsWith('#')) throw new Error(`Role ${r.role} dark value invalid`);
    }
  });
});
