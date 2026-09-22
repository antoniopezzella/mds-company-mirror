import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// theme.css is a deliberate external/portable token export (Figma/Style-
// Dictionary handoff, non-React consumers) — the live app's own CSS-var
// theming goes through RoleVarsProvider (--role-*) instead. This test only
// checks the build artifact shape, not any in-app wiring.
describe('CSS variable generation', () => {
  test('build output theme.css exists after build (if build run)', () => {
    const cssPath = path.join(process.cwd(), 'dist', 'theme.css');
    if (!fs.existsSync(cssPath)) return; // skip gracefully if not built in this run
    const content = fs.readFileSync(cssPath, 'utf8');
    expect(content).toContain('[data-theme="dark"]');
    expect(content).toMatch(/--color-text-primary:/);
  });
});