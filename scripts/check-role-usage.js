#!/usr/bin/env node
/**
 * check-role-usage.js
 * Warn when components directly reference primitives (tokens.*) or semanticColors.*
 * instead of consuming the roles layer.
 *
 * Flags:
 *   --strict : exit non-zero if any violations (for CI gating)
 *   --json   : output machine-readable JSON summary (stdout)
 * Exit code: 0 (default / warn-only) unless --strict provided.
 */
import fs from 'fs';
import path from 'path';
import url from 'url';

const root = process.cwd();
const componentsDir = path.join(root, 'src', 'components');

function listFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) out.push(...listFiles(full));
    else if (/\.(tsx?|jsx?)$/.test(entry)) out.push(full);
  }
  return out;
}

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const asJson = args.includes('--json');

const componentFiles = fs.existsSync(componentsDir) ? listFiles(componentsDir) : [];

const violations = [];

for (const file of componentFiles) {
  const rel = path.relative(root, file);
  const text = fs.readFileSync(file, 'utf8');
  // Skip if this file imports roles already and does not reference forbidden patterns.
  const hasRolesImport = /from\s+['"].*roles['"]/m.test(text);

  // Matches tokens.<identifier> but not string literals
  const tokenPattern = /\btokens\.[a-zA-Z0-9_]+/g;
  const semanticPattern = /\bsemanticColors\.[a-zA-Z0-9_]+/g;

  let m;
  while ((m = tokenPattern.exec(text)) !== null) {
    violations.push({ file: rel, match: m[0], recommendation: 'Import getRoleColor and map to a role instead.' });
  }
  while ((m = semanticPattern.exec(text)) !== null) {
    violations.push({ file: rel, match: m[0], recommendation: 'Use a role (see roles.ts) instead of direct semantic reference.' });
  }

  // Heuristic: if roles import exists but violations also exist, mark them for prioritized cleanup
  // (No separate logic needed now; recommendation remains.)
}

if (asJson) {
  const payload = { strict, violations };
  process.stdout.write(JSON.stringify(payload, null, 2) + '\n');
} else {
  if (violations.length === 0) {
    console.log('Role usage check: OK (no direct primitive or semantic references found in components).');
  } else {
    console.log('Role usage check: WARN — found direct primitive / semantic references.');
    for (const v of violations) {
      console.log(`  • ${v.file}: ${v.match} -> ${v.recommendation}`);
    }
    console.log(`Total violations: ${violations.length}`);
  }
}

if (strict && violations.length > 0) {
  process.exit(1);
}
process.exit(0);
