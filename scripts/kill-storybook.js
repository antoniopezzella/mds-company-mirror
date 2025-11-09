#!/usr/bin/env node
// Kill any running Storybook dev servers to avoid port/cache conflicts during tests
// - Looks for processes by command line
// - Also kills processes bound to common Storybook ports
import { execSync } from 'node:child_process';

const cmds = [
  "pkill -f 'storybook dev' || true",
  'lsof -ti :6006 | xargs kill -9 2>/dev/null || true',
  'lsof -ti :6007 | xargs kill -9 2>/dev/null || true',
  'lsof -ti :6014 | xargs kill -9 2>/dev/null || true',
];

for (const cmd of cmds) {
  try {
    execSync(cmd, { stdio: 'ignore', shell: '/bin/zsh' });
  } catch {}
}

console.log('[pretest] Ensured no Storybook dev server is running.');
