import { describe, test, expect } from 'vitest';
import { listRoles, getRoleColor } from '../theme/roles';

// Snapshot of role resolutions for both light and dark modes.
// Update snapshot intentionally when mappings change; include CHANGELOG entry.

describe('roles snapshot', () => {
  test('role color resolutions', () => {
    const data = listRoles().map(r => ({
      role: r.role,
      semantic: r.semantic,
      light: getRoleColor(r.role, { mode: 'light' }),
      dark: getRoleColor(r.role, { mode: 'dark' })
    }));
    // Sort for consistent ordering (in case of insertion order changes)
    data.sort((a,b) => a.role.localeCompare(b.role));
    expect(data).toMatchSnapshot('role-color-resolutions');
  });
});
