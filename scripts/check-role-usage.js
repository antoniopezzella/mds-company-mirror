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
const palette = [];

// Tailwind DEFAULT-palette colour utilities (`bg-red-500`, `text-gray-100`,
// `from-indigo-950`). They render Tailwind's colours, not Marsh's, bypass the
// role system entirely, and — being valid classes — no other gate catches
// them. `colors` is merged via `theme.extend`, so the whole default palette
// stays reachable. Enforced in src/components/ui/ source (same set and escape
// hatches as hex); advisory elsewhere; stories/tests exempt (swatch demos).
// MDS's own semantic classes (`bg-primary`, `bg-surface-accent`) never match —
// they carry no numeric step. Annotate a deliberate one with
// `roles-allow-palette` (line or line-above) or `roles-allow-palette-file`.
const PALETTE_CLASS =
  /\b(?:bg|text|border|ring|from|via|to|fill|stroke|divide|outline|decoration|caret|accent|shadow)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950)\b/g;

/**
 * Where a hex literal is a hard failure rather than a note.
 *
 * Hex was informational everywhere until 2026-10-08, because much of it is
 * documented debt in the legacy MUI half with no role to move to yet. But
 * "never hardcode a colour" being advisory in the CURRENT component set meant
 * the rule everyone is told to follow had no teeth exactly where the role
 * layer is complete. Peers enforce this: SLDS Linter's
 * `no-hardcoded-values-slds2`, Salt's `correct-theme-token-usage`.
 *
 * Scope is `src/components/ui/` component source only, and it cost nothing to
 * turn on: that set had **0** hex literals when this was added, so the gate
 * locks in a clean state rather than demanding a cleanup. It ratchets —
 * new debt cannot enter the current set, and the 77 legacy + 36
 * story/test literals stay advisory.
 *
 * Stories and tests are excluded on purpose. They legitimately name colours:
 * swatch demos, and assertions that a component resolved to an expected
 * value. Forcing roles there would make the tests tautological — asserting
 * getRoleColor() equals getRoleColor().
 */
const isEnforcedHexPath = (rel) =>
  /^src\/components\/ui\//.test(rel) && !/\.(stories|test)\.tsx?$/.test(rel);

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
  const paletteFileAllowed = /roles-allow-palette-file/.test(rawText);
  const raw = rawText.split('\n');
  // Block-comment state has to be tracked ACROSS lines, and trailing `//`
  // stripped, or the sweep counts documentation as drift. It previously only
  // skipped comment-ONLY lines, so it missed `{/* … #ceecff … */}` (starts
  // with `{`), trailing notes like `foo, // dark is #95caff`, and any
  // continuation line of a block comment that does not begin with `*`.
  //
  // That was 38 of 109 reported literals across this component set — a third
  // of the number, and every one of them a comment explaining a contrast
  // ratio. Measuring prose as though it were colour made the figure useless
  // for deciding anything.
  let inBlock = false;
  raw.forEach((line, i) => {
    let code = '';
    for (let c = 0; c < line.length; c += 1) {
      if (inBlock) {
        if (line.startsWith('*/', c)) {
          inBlock = false;
          c += 1;
        }
        continue;
      }
      if (line.startsWith('/*', c)) {
        inBlock = true;
        c += 1;
        continue;
      }
      if (line.startsWith('//', c)) break; // rest of the line is a comment
      code += line[c];
    }
    if (!code.trim()) return;

    const allowed = /roles-allow-hex/.test(line) || /roles-allow-hex/.test(raw[i - 1] ?? '');
    if (allowed) return;
    const hits = code.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g);
    if (hits) for (const h of hits) hardcoded.push({ file: rel, line: i + 1, match: h, enforced: isEnforcedHexPath(rel) });

    if (!paletteFileAllowed) {
      const palAllowed = /roles-allow-palette/.test(line) || /roles-allow-palette/.test(raw[i - 1] ?? '');
      if (!palAllowed) {
        const pm = code.match(PALETTE_CLASS);
        if (pm) for (const p of pm) palette.push({ file: rel, line: i + 1, match: p, enforced: isEnforcedHexPath(rel) });
      }
    }
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
  // Comments are stripped BEFORE slicing, not after. The union is annotated
  // with prose, and prose contains semicolons: a comment inside the union
  // reading "(Sky, flipping to Midnight); the other is body text" truncated
  // this slice at that semicolon for three weeks, so the parser saw 6 of 55
  // roles and reported the other 49 as unknown. The check still "ran"; it just
  // could not find anything. See the floor below.
  const rolesSrc = stripComments(
    fs.readFileSync(path.join(root, 'src', 'theme', 'roles.ts'), 'utf8')
  );
  const start = rolesSrc.indexOf('export type RoleName');
  const union = rolesSrc.slice(start, rolesSrc.indexOf(';', start));
  const names = [...union.matchAll(/'([a-zA-Z][a-zA-Z0-9.]*)'/g)].map((m) => m[1]);

  // A floor, not a zero-check. The original guard only fired on 0 names, which
  // is why a 6-name parse sailed through: a partial parse is the failure mode
  // this script actually has, and it is indistinguishable from success unless
  // the count is asserted. Cross-check against ROLE_MAP, the other place every
  // role is listed, so the two have to disagree before this passes wrongly.
  const mapEntries = (rolesSrc.match(/^\s*'[a-zA-Z][a-zA-Z0-9.]*':\s*\{/gm) ?? []).length;
  if (names.length === 0) {
    console.error('check-role-usage: could not parse RoleName union from src/theme/roles.ts');
    process.exit(2);
  }
  if (mapEntries > 0 && names.length < mapEntries) {
    console.error(
      `check-role-usage: parsed only ${names.length} role name(s) from the RoleName ` +
        `union, but ROLE_MAP defines ${mapEntries}. The union parse is truncating — ` +
        `check src/theme/roles.ts for a stray ';' the comment stripper did not remove.`
    );
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
        const raw = fs.readFileSync(full, 'utf8');
        const src = stripComments(raw);
        // The annotation has to be read from the RAW line, because the
        // annotation IS a comment and stripComments would eat it first.
        const rawLines = raw.split(/\r?\n/);
        const rel = path.relative(root, full);
        src.split(/\r?\n/).forEach((line, i) => {
          // A dangling name is sometimes the point: the regression tests that
          // guard this very bug class have to name the wrong form in order to
          // assert it is absent. Same annotation convention as roles-allow-hex.
          if (/roles-allow-dangling/.test(rawLines[i] ?? '')) return;
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
  const payload = { strict, violations, hardcoded, palette, danglingVars };
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
    const enforcedHits = hardcoded.filter((h) => h.enforced);
    const advisoryHits = hardcoded.filter((h) => !h.enforced);

    if (enforcedHits.length) {
      console.log(
        `\nHardcoded colour literals in src/components/ui/ source: ${enforcedHits.length} — ${strict ? 'FAIL' : 'WARN'}`
      );
      for (const h of enforcedHits) {
        console.log(`  • ${h.file}:${h.line}  ${h.match}`);
      }
      console.log('  The role layer is complete for this set, so there is a role for this.');
      console.log('  Use getRoleColor(\'role.name\') or var(--role-*). If the literal is genuinely');
      console.log('  right (a brand asset, a third-party constant), annotate the line with');
      console.log('  `roles-allow-hex` and say why.');
    }

    if (advisoryHits.length) {
      const byFile = advisoryHits.reduce((a, h) => ((a[h.file] = (a[h.file] || 0) + 1), a), {});
      console.log(
        `\nHardcoded colour literals elsewhere: ${advisoryHits.length} in ${Object.keys(byFile).length} file(s) (informational — legacy components, stories and tests)`
      );
      for (const [f, n] of Object.entries(byFile).sort((a, b) => b[1] - a[1])) {
        console.log(`  • ${f}: ${n}`);
      }
      console.log('  Prefer a role via getRoleColor()/var(--role-*); annotate deliberate ones with `roles-allow-hex`.');
    }
  }

  if (palette.length) {
    const enforcedPal = palette.filter((p) => p.enforced);
    const advisoryPal = palette.filter((p) => !p.enforced);

    if (enforcedPal.length) {
      console.log(
        `\nTailwind default-palette classes in src/components/ui/ source: ${enforcedPal.length} — ${strict ? 'FAIL' : 'WARN'}`
      );
      for (const p of enforcedPal) console.log(`  • ${p.file}:${p.line}  ${p.match}`);
      console.log('  These render Tailwind\'s colours, not Marsh\'s, and bypass the role system');
      console.log('  (and do NOT theme-swap in dark mode). Use a semantic class (bg-primary,');
      console.log('  bg-surface-accent) or a role via var(--role-*). Annotate a deliberate one');
      console.log('  with `roles-allow-palette` and say why.');
    }

    if (advisoryPal.length) {
      const byFile = advisoryPal.reduce((a, p) => ((a[p.file] = (a[p.file] || 0) + 1), a), {});
      console.log(
        `\nTailwind default-palette classes elsewhere: ${advisoryPal.length} in ${Object.keys(byFile).length} file(s) (informational — legacy, stories and tests)`
      );
      for (const [f, n] of Object.entries(byFile).sort((a, b) => b[1] - a[1])) console.log(`  • ${f}: ${n}`);
    }
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
//
// Hex in `src/components/ui/` source joins them — see isEnforcedHexPath.
// Hex anywhere else stays informational.
const enforcedHex = hardcoded.filter((h) => h.enforced);
// Default-palette classes in ui/ source join the hard set: like hex, the role
// layer is complete for this set and they were 0 when the gate went in, so it
// ratchets rather than demanding a cleanup.
const enforcedPalette = palette.filter((p) => p.enforced);
if (strict && (violations.length > 0 || danglingVars.length > 0 || enforcedHex.length > 0 || enforcedPalette.length > 0)) {
  process.exit(1);
}
process.exit(0);
