#!/usr/bin/env node
/**
 * Cleanup script to kill orphaned processes on ports 3333 and 5173
 * Runs before starting dev servers to prevent EADDRINUSE errors
 */

import { execSync } from 'child_process';

const PORTS = [3333, 5173, 5176]; // Gateway, Vite old, Vite new
const PROCESS_PATTERNS = [
  'tsx watch src/start.ts',
  'vite',
  'npm run dev:gateway',
  'npm run dev',
];

console.log('🧹 Cleaning up orphaned processes...\n');

// Kill processes by port
PORTS.forEach(port => {
  try {
    const cmd = `lsof -ti :${port} | xargs kill -9 2>/dev/null || true`;
    execSync(cmd, { stdio: 'pipe' });
    console.log(`✓ Cleared port ${port}`);
  } catch (error) {
    // Port already free
  }
});

// Kill processes by pattern
PROCESS_PATTERNS.forEach(pattern => {
  try {
    const cmd = `pkill -9 -f "${pattern}" 2>/dev/null || true`;
    execSync(cmd, { stdio: 'pipe' });
  } catch (error) {
    // Process not found
  }
});

console.log('\n✅ Cleanup complete!\n');

// Wait a moment for ports to be fully released
execSync('sleep 1');
