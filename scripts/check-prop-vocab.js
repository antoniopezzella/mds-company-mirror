#!/usr/bin/env node
/**
 * check-prop-vocab.js
 * Guard the unified `size` / `tone` vocabularies across src/components/ui.
 *
 * The component set had grown SEVEN `size` vocabularies (`small|medium`,
 * `small|medium|large|xlarge`, `sm|md|lg`, `sm|md|lg|fullscreen`, `sm|md`,
 * Button accepting both, and Dialog's PascalCase `Small|Medium|Large|FullScreen`)
 * and FOUR `tone` vocabularies. They are unified on `sm|md|lg|xl` and `danger`;
 * the legacy spellings still resolve via src/components/ui/prop-compat.ts and
 * are removed at 1.0.
 *
 * This script does two different jobs, deliberately:
 *
 *   1. USAGE — report call sites still on a legacy spelling, so the deprecation
 *      window can actually close. Advisory by default.
 *
 *   2. INTEGRITY — verify the deprecation record itself: every alias names a
 *      replacement, and that replacement is a real canonical value. This
 *      inversion is borrowed from scripts/validate-tokens.js, which validates
 *      the token deprecation record rather than merely flagging usage. A broken
 *      record fails even without --strict, because it means the compatibility
 *      layer is lying about where a consumer should go.
 *
 * THE HAZARD THIS EXISTS TO AVOID: roughly 46 `size="small"` call sites in this
 * repo target MUI components, which have their own entirely legitimate
 * `small|medium|large` vocabulary. Worse, `DSTextField` names two different
 * components (src/components/ui/text-field.tsx and
 * src/components/TextField/TextField.tsx) with overlapping prop shapes, as does
 * Modal. So this resolves imports BY PATH and never by identifier — a
 * find-and-replace on the identifier silently corrupts the MUI call sites, which
 * is exactly what happened once during the migration and was caught only by tsc.
 *
 * Flags:
 *   --strict : exit non-zero if any legacy usage remains (for CI gating)
 *   --json   : machine-readable summary on stdout
 * Exit code: 0 (advisory) unless --strict, or unless the record is inconsistent.
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const srcDir = path.join(root, 'src');
const uiDir = path.join(root, 'src', 'components', 'ui');

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const asJson = args.includes('--json');

function listFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) out.push(...listFiles(full));
    else if (/\.(tsx?|jsx?)$/.test(entry)) out.push(full);
  }
  return out;
}

/**
 * Blank out comments so prose mentioning a legacy spelling isn't reported as
 * usage — while PRESERVING line numbering.
 *
 * A block comment is replaced by the same number of newlines it spanned rather
 * than deleted. Deleting it shifts every subsequent line, so the reported
 * `file:line` points somewhere else entirely and the report is worse than
 * useless — you go to fix a call site and find unrelated code.
 */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => '\n'.repeat((m.match(/\n/g) || []).length))
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
}

// ---------------------------------------------------------------------------
// 1. Read the canonical record straight out of prop-compat.ts.
//    Parsed rather than imported: this is a plain Node script with no TS loader,
//    and the same regex-the-source approach is used by report-governance.js to
//    read ROLE_MAP out of roles.ts.
// ---------------------------------------------------------------------------
const compatPath = path.join(uiDir, 'prop-compat.ts');
if (!fs.existsSync(compatPath)) {
  console.error('check-prop-vocab: src/components/ui/prop-compat.ts not found.');
  process.exit(1);
}
const compatSrc = fs.readFileSync(compatPath, 'utf8');

function parseAliasBlock(name) {
  const m = compatSrc.match(new RegExp(`export const ${name} = \\{([\\s\\S]*?)\\} as const`));
  if (!m) return {};
  const out = {};
  for (const line of m[1].split('\n')) {
    const p = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:\s*'([^']+)'/);
    if (p) out[p[1]] = p[2];
  }
  return out;
}

const SIZE_ALIASES = parseAliasBlock('SIZE_ALIASES');
const TONE_ALIASES = parseAliasBlock('TONE_ALIASES');

const registry = {};
{
  const m = compatSrc.match(/DEPRECATED_PROP_VALUES[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (m) {
    const re = /'([^']+)':\s*\{\s*replaceWith:\s*'([^']+)',\s*rationale:\s*'([^']*)'/g;
    let g;
    while ((g = re.exec(m[1]))) registry[g[1]] = { replaceWith: g[2], rationale: g[3] };
  }
}

// ---------------------------------------------------------------------------
// 2. Integrity — does the deprecation record hold together?
// ---------------------------------------------------------------------------
const CANONICAL_SIZES = new Set(['sm', 'md', 'lg', 'xl', 'fullscreen']);
const CANONICAL_TONES = new Set(['default', 'danger', 'success', 'warning', 'info']);
const integrity = [];

for (const [legacy, canonical] of Object.entries(SIZE_ALIASES)) {
  const entry = registry[`size.${legacy}`];
  if (!entry) integrity.push(`size.${legacy} is aliased but has no DEPRECATED_PROP_VALUES entry`);
  else if (entry.replaceWith !== canonical)
    integrity.push(`size.${legacy} aliases to '${canonical}' but its entry promises '${entry.replaceWith}'`);
  if (!CANONICAL_SIZES.has(canonical))
    integrity.push(`size.${legacy} resolves to '${canonical}', which is not a canonical size`);
}
for (const [legacy, canonical] of Object.entries(TONE_ALIASES)) {
  const entry = registry[`tone.${legacy}`];
  if (!entry) integrity.push(`tone.${legacy} is aliased but has no DEPRECATED_PROP_VALUES entry`);
  else if (entry.replaceWith !== canonical)
    integrity.push(`tone.${legacy} aliases to '${canonical}' but its entry promises '${entry.replaceWith}'`);
  if (!CANONICAL_TONES.has(canonical))
    integrity.push(`tone.${legacy} resolves to '${canonical}', which is not a canonical tone`);
}
for (const [key, entry] of Object.entries(registry)) {
  if (!entry.rationale) integrity.push(`${key} has no rationale — a consumer is told to move but not why`);
}

// ---------------------------------------------------------------------------
// 3. Usage — legacy spellings still in the tree, resolved BY IMPORT PATH.
// ---------------------------------------------------------------------------
const LEGACY_SIZES = Object.keys(SIZE_ALIASES);
const LEGACY_TONES = Object.keys(TONE_ALIASES);

/** Components exported from src/components/ui, by file basename. */
const uiComponentFiles = new Set(
  fs
    .readdirSync(uiDir)
    .filter((f) => /\.tsx$/.test(f) && !/\.(stories|test)\.tsx$/.test(f))
    .map((f) => f.replace(/\.tsx$/, '')),
);

/**
 * Map every imported identifier in a file to the module it came from.
 *
 * File-level "does this import from ui/" is NOT good enough, and getting that
 * wrong is the whole risk here: PortfolioComponentGallery.tsx imports DSSelect
 * from components/ui AND DSTextField from components/TextField (the MUI
 * wrapper), so a file-level test flags six perfectly correct MUI call sites.
 */
function importSources(src) {
  const map = new Map();
  const re = /import\s+(?:type\s+)?(?:(\w+)\s*,?\s*)?(?:\{([^}]*)\})?\s*from\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(src))) {
    const [, defaultId, named, source] = m;
    if (defaultId) map.set(defaultId, source);
    if (named) {
      for (const part of named.split(',')) {
        const id = part.replace(/\s*as\s+/, ' ').trim().split(/\s+/).pop();
        if (id) map.set(id, source);
      }
    }
  }
  return map;
}

const isUiSource = (source) => /components\/ui(\/|$)/.test(source) || /^\.\/[a-z-]+$/.test(source);

/**
 * Walk backwards from a line to the JSX opening tag it sits inside, so the
 * attribute can be attributed to a specific component.
 */
function enclosingTag(lines, idx) {
  for (let i = idx; i >= 0 && i > idx - 40; i--) {
    const m = lines[i].match(/<([A-Z][A-Za-z0-9_.]*)/);
    if (m) return m[1].split('.')[0];
    if (/^\s*<\/|^\s*\)/.test(lines[i]) && i !== idx) break;
  }
  return null;
}

const usage = [];
for (const file of listFiles(srcDir)) {
  // The compatibility layer and its own tests legitimately name legacy values.
  if (/prop-compat\.(ts|tsx)$|prop-compat\.test\.tsx$/.test(file)) continue;
  const raw = fs.readFileSync(file, 'utf8');
  const src = stripComments(raw);
  const imports = importSources(raw);
  const inUiDir = file.startsWith(uiDir);
  const lines = src.split('\n');

  lines.forEach((line, i) => {
    // An explicit, documented legacy usage — e.g. a story demonstrating that the
    // deprecated spelling still works. Mirrors check-role-usage.js's
    // `roles-allow-hex` escape hatch.
    if (/prop-vocab-allow-legacy/.test(raw.split('\n')[i] ?? '')) return;
    if (/prop-vocab-allow-legacy-file/.test(raw)) return;

    const checks = [
      ['size', LEGACY_SIZES, SIZE_ALIASES],
      ['tone', LEGACY_TONES, TONE_ALIASES],
    ];
    for (const [prop, legacyValues, aliases] of checks) {
      for (const legacy of legacyValues) {
        if (!new RegExp(`${prop}=\\{?['"]${legacy}['"]`).test(line)) continue;
        const tag = enclosingTag(lines, i);
        if (!tag) continue;
        const source = imports.get(tag);
        // Only report when the component demonstrably came from components/ui.
        // A local component in a ui/ file counts; anything else does not.
        const fromUi = source ? isUiSource(source) : inUiDir && uiComponentFiles.has(tag.toLowerCase());
        if (!fromUi) continue;
        usage.push({
          file: path.relative(root, file),
          line: i + 1,
          component: tag,
          prop,
          value: legacy,
          replaceWith: aliases[legacy],
        });
      }
    }
  });
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
const summary = {
  aliases: { size: SIZE_ALIASES, tone: TONE_ALIASES },
  registryEntries: Object.keys(registry).length,
  integrityErrors: integrity,
  legacyUsage: usage,
  status: integrity.length ? 'BROKEN_RECORD' : usage.length ? 'LEGACY_USAGE' : 'OK',
};

if (asJson) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log(`Prop vocabulary check — ${Object.keys(registry).length} deprecated values tracked`);
  if (integrity.length) {
    console.log('\n✗ Deprecation record is inconsistent:');
    for (const e of integrity) console.log(`  - ${e}`);
  }
  if (usage.length) {
    console.log(`\n⚠ ${usage.length} call site(s) still on a legacy spelling:`);
    for (const u of usage) {
      console.log(`  ${u.file}:${u.line}  <${u.component}> ${u.prop}="${u.value}" → "${u.replaceWith}"`);
    }
    if (!strict) console.log('\n  (advisory — run with --strict to fail)');
  }
  if (!integrity.length && !usage.length) {
    console.log('✓ No legacy size/tone spellings in files importing from components/ui.');
  }
}

// A broken record fails regardless of --strict: it means the compatibility layer
// is pointing consumers at a replacement that doesn't exist.
if (integrity.length) process.exit(1);
if (strict && usage.length) process.exit(1);
