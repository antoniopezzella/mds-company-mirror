#!/usr/bin/env node
/*
 * check-docs-sprawl: enforces the repo-root .md allowlist from CLAUDE.md's
 * "Documentation Governance" section — this repo previously accumulated
 * ~70 one-off build summaries, sprint plans, and status reports at the
 * root before they were moved to docs/archive/. This is the mechanical,
 * enforceable slice of that rule: it cannot judge whether a new docs/*.md
 * file belongs where it was placed (that needs human/agent judgment), it
 * only catches the literal failure mode of a new file landing at root.
 */
import { readdirSync } from 'fs';

const ALLOWLIST = new Set([
  'README.md',
  'README.package.md',
  'CLAUDE.md',
  'SECURITY.md',
  'CHANGELOG.md',
  'DESIGN.md',
]);

const rootFiles = readdirSync('.', { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
  .map((entry) => entry.name);

const unexpected = rootFiles.filter((name) => !ALLOWLIST.has(name));

if (unexpected.length > 0) {
  console.error('\n[docs-sprawl] Unexpected .md file(s) at repo root:');
  unexpected.forEach((name) => console.error(`  - ${name}`));
  console.error(
    '\nRepo-root .md files are a short, closed allowlist (see CLAUDE.md ' +
    '"Documentation Governance"). Move this to docs/ in the category that ' +
    'fits (get-started/, foundations/, guides/, tasks/, or docs/ itself), ' +
    'or docs/archive/ if it documents something no longer true. If it ' +
    'genuinely belongs at root, add it to the allowlist in ' +
    'scripts/check-docs-sprawl.js — that\'s a deliberate decision, not a ' +
    'default.\n'
  );
  process.exit(1);
}

console.log(`[docs-sprawl] OK — ${rootFiles.length} root .md file(s), all allowlisted.`);
