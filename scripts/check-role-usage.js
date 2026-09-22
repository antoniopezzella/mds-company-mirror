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
const hardcoded = [];

// Good-enough for this lint heuristic — strips comments so prose that
// merely *mentions* a token/role name (e.g. "see semantic-tokens.ts") isn't
// flagged as a real reference. A word-boundary-only check isn't enough:
// `\btokens\.` matches inside `semantic-tokens.ts` too, since `-` counts as
// a boundary.
function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
}

for (const file of componentFiles) {
  const rel = path.relative(root, file);
  const text = stripComments(fs.readFileSync(file, 'utf8'));
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

  // Hardcoded colour literals. Reported separately from the violations above
  // and never failing the build: some are deliberate and documented (see
  // button.tsx, where several states have no role yet). The point is that
  // drift stays *visible* — the checker previously passed clean while
  // `bg-[#000f47]` sat in component and story code, which is how it crept in.
  // Annotate an intentional one with `roles-allow-hex` on the same line or
  // the line above.
  const rawText = fs.readFileSync(file, 'utf8');
  // Whole-file opt-out, for files whose content *is* colour values
  // (palette swatches, token fixtures).
  if (/roles-allow-hex-file/.test(rawText)) continue;
  const raw = rawText.split('\n');
  raw.forEach((line, i) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // comment-only line
    const allowed = /roles-allow-hex/.test(line) || /roles-allow-hex/.test(raw[i - 1] ?? '');
    if (allowed) return;
    const hits = line.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g);
    if (hits) for (const h of hits) hardcoded.push({ file: rel, line: i + 1, match: h });
  });
}

// ─── Dangling --role-* CSS variables ────────────────────────────────────────
// RoleVarsProvider publishes one custom property per role, named
// `--role-${role.replaceAll('.', '-')}` — note it does NOT kebab-case the
// segment, so `text.onInteractive` becomes `--role-text-onInteractive`.
// A reference to a name that isn't published resolves to nothing, and CSS
// fails silently: the declaration is dropped and the property inherits or
// falls back to a browser default. Nothing catches that — not tsc, not the
// linter, not the hardcoded-hex sweep above.
//
// This is not hypothetical. It shipped three times:
//   • button.tsx asked for `--role-text-on-interactive` (kebab) instead of
//     `--role-text-onInteractive`, so every destructive primary button
//     rendered inherited navy text on the red fill (3.38:1) instead of white.
//   • `--role-border-subtle` and `--role-shadow-low` were referenced but had
//     no corresponding role at all — shadows aren't in the role system, and
//     border.subtle doesn't exist — so those surfaces rendered flat/unbordered.
// All three were found by an accessibility audit, not by any gate.
// roles.ts is TypeScript and this script is plain Node, so the role list is
// parsed from the RoleName union rather than imported — the same approach the
// other governance scripts take to avoid a build step. dist/tokens.json is not
// an option here: it carries primitives and semantics, not roles.
const publishedRoleVars = (() => {
  const rolesSrc = fs.readFileSync(path.join(root, 'src', 'theme', 'roles.ts'), 'utf8');
  const union = rolesSrc.slice(
    rolesSrc.indexOf('export type RoleName'),
    rolesSrc.indexOf(';', rolesSrc.indexOf('export type RoleName'))
  );
  const names = [...union.matchAll(/'([a-zA-Z][a-zA-Z0-9.]*)'/g)].map((m) => m[1]);
  if (names.length === 0) {
    console.error('check-role-usage: could not parse RoleName union from src/theme/roles.ts');
    process.exit(2);
  }
  return new Set(names.map((role) => `--role-${role.replaceAll('.', '-')}`));
})();
const danglingVars = [];
{
  const scanDirs = ['src'];
  const scanExt = new Set(['.ts', '.tsx', '.js', '.jsx', '.scss', '.css']);
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules') continue;
        walk(full);
      } else if (scanExt.has(path.extname(entry.name))) {
        // Comments stripped first — several of these dead names are quoted in
        // the very comments that explain why they were removed, and a detector
        // that trips on its own documentation is useless. Line numbers are
        // preserved because stripComments only blanks comment text, and a
        // block comment spanning lines collapses; close enough for a pointer.
        const src = stripComments(fs.readFileSync(full, 'utf8'));
        const rel = path.relative(root, full);
        src.split(/\r?\n/).forEach((line, i) => {
          for (const m of line.matchAll(/--role-[A-Za-z0-9-]+/g)) {
            if (!publishedRoleVars.has(m[0])) {
              // Suggest the published name that differs only in case/dashes.
              const norm = (s) => s.toLowerCase().replace(/-/g, '');
              const suggestion = [...publishedRoleVars].find((v) => norm(v) === norm(m[0]));
              danglingVars.push({ file: rel, line: i + 1, match: m[0], suggestion: suggestion ?? null });
            }
          }
        });
      }
    }
  };
  for (const d of scanDirs) {
    const abs = path.join(root, d);
    if (fs.existsSync(abs)) walk(abs);
  }
}

if (asJson) {
  const payload = { strict, violations, hardcoded, danglingVars };
  process.stdout.write(JSON.stringify(payload, null, 2) + '\n');
} else {
  if (violations.length === 0) {
    console.log('Role usage check: OK (no direct primitive or semantic references found in components).');
  } else {
    console.log(`Role usage check: ${strict ? 'FAIL' : 'WARN'} — found direct primitive / semantic references.`);
    for (const v of violations) {
      console.log(`  • ${v.file}: ${v.match} -> ${v.recommendation}`);
    }
    console.log(`Total violations: ${violations.length}`);
  }

  if (hardcoded.length) {
    const byFile = hardcoded.reduce((a, h) => ((a[h.file] = (a[h.file] || 0) + 1), a), {});
    console.log(`\nHardcoded colour literals: ${hardcoded.length} in ${Object.keys(byFile).length} file(s) (informational — not a gate)`);
    for (const [f, n] of Object.entries(byFile).sort((a, b) => b[1] - a[1])) {
      console.log(`  • ${f}: ${n}`);
    }
    console.log('  Prefer a role via getRoleColor()/var(--role-*); annotate deliberate ones with `roles-allow-hex`.');
  }
}

if (danglingVars.length) {
  console.log(`\nDangling --role-* CSS variables: ${danglingVars.length} (these resolve to NOTHING at runtime)`);
  for (const d of danglingVars) {
    console.log(`  • ${d.file}:${d.line}  ${d.match}${d.suggestion ? `  -> did you mean ${d.suggestion}?` : '  (no such role)'}`);
  }
}

// Dangling vars gate in --strict alongside direct-token violations: unlike a
// hardcoded hex (which at least renders the colour someone intended), one of
// these renders nothing and is invisible until someone looks closely.
if (strict && (violations.length > 0 || danglingVars.length > 0)) {
  process.exit(1);
}
process.exit(0);
