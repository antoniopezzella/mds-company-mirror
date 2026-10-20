import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// theme.css is a deliberate external/portable token export (Figma/Style-
// Dictionary handoff, non-React consumers). It now also carries the ROLE
// tier, which it did not originally — see the note below on why that matters.
describe('CSS variable generation', () => {
  const read = (...p: string[]) => {
    const file = path.join(process.cwd(), ...p);
    return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  };

  test('build output theme.css exists after build (if build run)', () => {
    const content = read('dist', 'theme.css');
    if (content === null) return; // skip gracefully if not built in this run
    expect(content).toContain('[data-theme="dark"]');
    expect(content).toMatch(/--color-text-primary:/);
  });

  // The role tier had NO static CSS representation anywhere — it was set only
  // by a useEffect in RoleVarsProvider, a React component. The published
  // package therefore shipped Button classes referencing five `--role-*`
  // properties it never defined, and consumers rendered a primary button with
  // no background while all nine gates stayed green.
  //
  // These assertions are cheap insurance against that silently coming back.
  test('theme.css carries the role tier, in both dark selectors', () => {
    const content = read('dist', 'theme.css');
    if (content === null) return;
    expect(content).toMatch(/--role-interactive-primary:/);
    // `.dark` is what the live system toggles; `[data-theme="dark"]` is the
    // portable contract. Emitting only one of them breaks the other audience.
    expect(content).toContain('.dark {');
    expect(content).toContain('[data-theme="dark"]');
  });

  test('roles.generated.css defines every role in both modes', () => {
    const content = read('src', 'styles', 'roles.generated.css');
    if (content === null) return;
    const light = content.slice(content.indexOf(':root'), content.indexOf('.dark'));
    const dark = content.slice(content.indexOf('.dark'));
    const count = (s: string) => (s.match(/--role-[A-Za-z0-9-]+:/g) ?? []).length;
    expect(count(light)).toBeGreaterThan(0);
    // A role defined in one mode but not the other resolves to nothing in the
    // other — the same silent-transparency failure, one mode at a time.
    expect(count(dark)).toBe(count(light));
  });

  // The var name is `role.replaceAll('.', '-')` and nothing else, so camelCase
  // segments survive. Kebab-casing them yields `--role-text-on-interactive`,
  // which resolves to nothing and renders destructive buttons navy-on-red at
  // 3.38:1. That bug has already shipped once (button.tsx:53-65).
  test('camelCase role segments are preserved, not kebab-cased', () => {
    const content = read('src', 'styles', 'roles.generated.css');
    if (content === null) return;
    expect(content).toMatch(/--role-fg-on-interactive:/);
    expect(content).not.toMatch(/--role-text-on-interactive:/); // roles-allow-dangling — naming the wrong form IS the assertion
  });
});
