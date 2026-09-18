#!/usr/bin/env node
// Kill any running Storybook dev servers to avoid port/cache conflicts during tests
// - Looks for processes by command line
// - Also kills processes bound to common Storybook ports
import { execSync } from 'node:child_process';

// Only reclaim the ports in CI (or when explicitly asked). Locally this used
// to kill whatever Storybook the developer had open — every `npm test` took
// their session down and left the browser tab on a dead HMR connection,
// which surfaces as "Failed to fetch dynamically imported module". CI has no
// such session, and that's where the port/cache conflict this guards against
// actually happens.
const force = process.env.KILL_STORYBOOK === '1';
if (!process.env.CI && !force) {
  console.log('[storybook] Local run — leaving any running dev server alone (set KILL_STORYBOOK=1 to override).');
  process.exit(0);
}

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

console.log('[storybook] Ensured no Storybook dev server is running.');
