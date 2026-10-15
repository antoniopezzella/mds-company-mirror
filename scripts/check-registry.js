#!/usr/bin/env node
/**
 * Registry completeness check.
 *
 * WHY THIS EXISTS
 * ---------------
 * `registry.json` is one of two documented ways another team adopts these
 * components (`npx shadcn add ...`; the other is the npm package). It is
 * hand-written, and `npx shadcn registry validate` checks only that the FILE
 * is well-formed — never that it matches what is on disk.
 *
 * So it drifted silently: by 2026-10-06 it listed 71 `registry:ui` items
 * against 94 components, and everything added in the preceding 82 commits was
 * missing — the entire DataGrid family, the entire filter system, PageShell,
 * Stack, data-state, error-state, sparkline, table-primitives. A team told to
 * use the registry route would find the data grid simply unavailable, which is
 * the single most important component for the dashboards this system targets.
 * Meanwhile docs/get-started/DEVELOPERS.md claimed coverage of "all 71
 * components", which read as complete.
 *
 * `src/components/ui/taxonomy.test.ts` already does exactly this job for the
 * taxonomy manifest and has kept it at 94/94. This is the same idea for the
 * registry.
 *
 * Usage:
 *   node scripts/check-registry.js             report drift, exit 1 if any
 *   node scripts/check-registry.js --suggest   additionally print a derived
 *                                              entry for each missing module
 * Exit: 0 complete · 1 drift found · 2 harness error
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const UI_DIR = path.join(root, 'src', 'components', 'ui');
const suggest = process.argv.includes('--suggest');
const fix = process.argv.includes('--fix');

const stripComments = (source) =>
  source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');

const LIB_DIR = path.join(root, 'src', 'lib');

/**
 * Modules that are deliberately NOT installable, with the reason.
 *
 * Keep this list tiny and justified. "It is not a component" is not a reason —
 * `data-grid-features.ts` is not a component either, and every `DataTable`
 * consumer imports it.
 */
const NOT_INSTALLABLE = {
  taxonomy: 'A classification manifest for this repo\'s own tooling and gallery. No shipped component imports it.',
};

/**
 * Components on disk. A component is a `.tsx` file OR a directory with an
 * index — `filters/` is the first of the latter, and counting only loose files
 * is what let a whole directory-shaped component escape the taxonomy once.
 * Same definition as taxonomy.test.ts, deliberately.
 */
function componentsOnDisk() {
  const entries = fs.readdirSync(UI_DIR, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && e.name.endsWith('.tsx') && !/\.(stories|test)\.tsx$/.test(e.name))
    .map((e) => e.name.replace(/\.tsx$/, ''));
  const dirs = entries
    .filter(
      (e) =>
        e.isDirectory() &&
        ['index.ts', 'index.tsx'].some((i) => fs.existsSync(path.join(UI_DIR, e.name, i)))
    )
    .map((e) => e.name);
  return [...files, ...dirs].sort();
}

/**
 * Non-component modules that a copied component still needs on disk.
 *
 * Counting only `.tsx` is how `data-grid-features.ts` stayed missing after the
 * first pass of this check: `npx shadcn add data-table` copied a file importing
 * `./data-grid-features`, that file did not come, and the install did not
 * compile. A registry that lists every component and none of their shared
 * modules is not an install path.
 *
 * `src/lib` is included for the same reason — `utils` was already an item, but
 * `format` and `format-context` were not, while `StatCard` imports both.
 */
function supportModulesOnDisk() {
  const scan = (dir, prefix) =>
    fs
      .readdirSync(dir, { withFileTypes: true })
      .filter(
        (e) =>
          e.isFile() &&
          /\.tsx?$/.test(e.name) &&
          !/\.(stories|test)\.tsx?$/.test(e.name) &&
          !e.name.endsWith('.d.ts')
      )
      .map((e) => ({ name: e.name.replace(/\.tsx?$/, ''), dir: prefix }));

  const ui = scan(UI_DIR, 'src/components/ui').filter(
    (m) => !fs.existsSync(path.join(UI_DIR, `${m.name}.tsx`))
  );
  const lib = fs.existsSync(LIB_DIR) ? scan(LIB_DIR, 'src/lib') : [];
  return [...ui, ...lib]
    .filter((m) => !(m.name in NOT_INSTALLABLE))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Files that make up a component — one `.tsx`, or every source file in a directory. */
function filesFor(name) {
  const asFile = path.join(UI_DIR, `${name}.tsx`);
  if (fs.existsSync(asFile)) return [`src/components/ui/${name}.tsx`];
  // Support modules: a bare .ts/.tsx in ui/ or lib/.
  for (const [dir, prefix] of [[UI_DIR, 'src/components/ui'], [LIB_DIR, 'src/lib']]) {
    for (const ext of ['.ts', '.tsx']) {
      if (fs.existsSync(path.join(dir, `${name}${ext}`))) return [`${prefix}/${name}${ext}`];
    }
  }
  // Directory component: EVERY source file beneath it, recursively.
  // A non-recursive read left `filters/adapters/predicate.ts` owned by nobody
  // while `filters/index.ts` imported it — the copy would not compile.
  const dir = path.join(UI_DIR, name);
  // Items that live outside ui/ and lib/ — blocks, for instance — own their
  // `files[]` in registry.json and are not derivable from a name.
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return [];
  const out = [];
  const walk = (d, rel) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(d, e.name);
      const r = rel ? `${rel}/${e.name}` : e.name;
      if (e.isDirectory()) walk(full, r);
      else if (/\.tsx?$/.test(e.name) && !/\.(stories|test)\.tsx?$/.test(e.name)) {
        out.push(`src/components/ui/${name}/${r}`);
      }
    }
  };
  walk(dir, '');
  return out;
}

/**
 * Resolve an internal import specifier to a path on disk, or null.
 *
 * `./x` and `../x` resolve against the importing file; `@/x` against `src/`.
 * Extensions and `/index` are tried in the order a bundler would.
 */
function resolveImport(spec, fromFile) {
  let base;
  if (spec.startsWith('@/')) base = path.join(root, 'src', spec.slice(2));
  else if (spec.startsWith('.')) base = path.resolve(path.dirname(path.join(root, fromFile)), spec);
  else return null; // bare specifier: an npm package, not our file
  for (const cand of [
    base, `${base}.ts`, `${base}.tsx`,
    path.join(base, 'index.ts'), path.join(base, 'index.tsx'),
  ]) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      return path.relative(root, cand).split(path.sep).join('/');
    }
  }
  return null;
}

/**
 * Derive dependencies the way the existing entries were derived: from the
 * module's actual imports. Bare specifiers become npm `dependencies`; sibling
 * ui modules and `@/lib/utils` become `registryDependencies`.
 */
let _installable;
/** Every name a registryDependency may legitimately point at. */
function installableNames() {
  if (!_installable) {
    _installable = new Set([
      ...componentsOnDisk(),
      ...supportModulesOnDisk().map((m) => m.name),
    ]);
  }
  return _installable;
}

function depsFor(name) {
  const npm = new Set();
  const registry = new Set();
  for (const rel of filesFor(name)) {
    // Comments stripped first, and the match anchored to a real import/export
    // statement. A bare /from ['"]...['"]/ sweep picks up prose: the word
    // "from" inside a doc comment, followed by any quoted string, produced a
    // dependency literally named `there\n  `. This is the same failure the
    // role-usage gate had — parsing source without removing the prose first.
    const src = stripComments(fs.readFileSync(path.join(root, rel), 'utf8'));
    for (const m of src.matchAll(/^\s*(?:import|export)\b[^;]*?\bfrom\s+['"]([^'"]+)['"]/gm)) {
      const spec = m[1];
      if (spec === 'react' || spec === 'react-dom' || spec.startsWith('react/')) continue;
      if (spec.startsWith('@/lib/') || spec.startsWith('@/components/ui/') ||
          spec.startsWith('./') || spec.startsWith('../')) {
        const base = path.basename(spec).replace(/\.(tsx?|js)$/, '');
        // A relative import inside a directory component points at a sibling
        // file, not another registry item — those ship together in `files`.
        // Support modules DO count: data-grid-features.ts is not a component
        // and a copy that omits it does not compile.
        if (base !== name && installableNames().has(base)) registry.add(base);
        continue;
      }
      if (spec.startsWith('@/')) continue; // other internal aliases: not registry items
      // Scoped package: keep @scope/pkg. Bare: keep the first segment.
      npm.add(spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0]);
    }
  }
  return { npm: [...npm].sort(), registry: [...registry].sort() };
}

/**
 * THE DEPENDENCY GRAPH CHECK.
 *
 * Entry presence is not an install path. `registry.json` listed every component
 * and still produced code that did not compile, because `data-table` declared
 * 7 dependencies and imported 11 — the gate checked the index, not the edges.
 *
 * Ownership is the real contract: every internal import must resolve to a file
 * that is either (a) shipped by the same item, or (b) shipped by an item named
 * in its `registryDependencies`. Anything else means `npx shadcn add <item>`
 * copies a tree with a dangling import.
 */
function checkGraph(items) {
  const owner = new Map();
  for (const it of items) for (const f of it.files ?? []) owner.set(f.path, it.name);

  const underDeclared = [];   // imports a file owned by an undeclared item
  const unowned = [];         // imports a file no item ships at all
  const overDeclared = [];    // declares a dependency it never imports (informational)

  for (const it of items) {
    const declared = new Set(it.registryDependencies ?? []);
    const used = new Set();
    for (const f of it.files ?? []) {
      if (!fs.existsSync(f.path)) continue;
      const src = stripComments(fs.readFileSync(f.path, 'utf8'));
      for (const m of src.matchAll(/^\s*(?:import|export)\b[^;]*?\bfrom\s+['"]([^'"]+)['"]/gm)) {
        const target = resolveImport(m[1], f.path);
        if (!target) continue;
        if (owner.get(target) === it.name) continue; // ships with this item
        const ownerName = owner.get(target);
        if (!ownerName) { unowned.push({ item: it.name, file: f.path, target }); continue; }
        used.add(ownerName);
        if (!declared.has(ownerName)) underDeclared.push({ item: it.name, needs: ownerName, via: target });
      }
    }
    for (const d of declared) if (!used.has(d)) overDeclared.push({ item: it.name, dep: d });
  }
  return { underDeclared, unowned, overDeclared };
}

let registry;
try {
  registry = JSON.parse(fs.readFileSync(path.join(root, 'registry.json'), 'utf8'));
} catch (err) {
  console.error(`check-registry: could not read registry.json — ${err.message}`);
  process.exit(2);
}

const listed = new Set(registry.items.map((i) => i.name));
const disk = componentsOnDisk();
const support = supportModulesOnDisk();
const missing = [...disk, ...support.map((m) => m.name)].filter((c) => !listed.has(c));
const stale = registry.items
  .filter((i) => i.type === 'registry:ui' && !disk.includes(i.name))
  .map((i) => i.name);

// `--fix` adds the missing edges and refreshes directory items' file lists.
// It deliberately does NOT invent entries for unowned files — deciding that
// `src/shadows.ts` should be installable is a judgement call, not a patch.
if (fix) {
  for (const it of registry.items) {
    const real = filesFor(it.name);
    if (real.length > 1 && (it.files ?? []).length !== real.length) {
      it.files = real.map((pth) => ({ path: pth, type: it.files?.[0]?.type ?? 'registry:ui' }));
    }
  }
  const g = checkGraph(registry.items);
  const add = new Map();
  for (const u of g.underDeclared) {
    if (!add.has(u.item)) add.set(u.item, new Set());
    add.get(u.item).add(u.needs);
  }
  for (const [name, needs] of add) {
    const it = registry.items.find((i) => i.name === name);
    it.registryDependencies = [...new Set([...(it.registryDependencies ?? []), ...needs])].sort();
  }
  fs.writeFileSync(
    path.join(root, 'registry.json'),
    `${JSON.stringify(registry, null, 2)}\n`
  );
  console.log(`\ncheck-registry --fix: added ${g.underDeclared.length} edge(s) across ${add.size} item(s).`);
  if (g.unowned.length > 0) {
    const uniq = [...new Set(g.unowned.map((u) => u.target))];
    console.log(`Left ${uniq.length} unowned file(s) for a human — they need an entry or a home:`);
    for (const t of uniq) console.log(`  • ${t}`);
  }
}

const graph = checkGraph(registry.items);

console.log('\nRegistry completeness\n');
console.log(`  components on disk      : ${disk.length}`);
console.log(`  support modules on disk : ${support.length}  (shared .ts in ui/ and lib/)`);
console.log(`  listed in registry      : ${disk.length + support.length - missing.length}`);
console.log(`  registry items          : ${registry.items.length}`);
console.log(`  dependency edges        : ${graph.underDeclared.length} under-declared · ` +
            `${graph.unowned.length} unowned · ${graph.overDeclared.length} over-declared`);

if (
  missing.length === 0 &&
  stale.length === 0 &&
  graph.underDeclared.length === 0 &&
  graph.unowned.length === 0
) {
  console.log('\n✓ Every item exists, nothing is stale, and every internal import');
  console.log('  resolves to a file the item ships or declares. `npx shadcn add`');
  console.log('  copies a complete tree.\n');
  if (graph.overDeclared.length > 0) {
    console.log(`  ℹ ${graph.overDeclared.length} dependency/ies declared but not imported ` +
                '(harmless — extra files get copied):');
    for (const o of graph.overDeclared.slice(0, 8)) console.log(`      ${o.item} -> ${o.dep}`);
    if (graph.overDeclared.length > 8) console.log(`      …and ${graph.overDeclared.length - 8} more`);
    console.log('');
  }
  process.exit(0);
}

if (missing.length > 0) {
  console.error(`\n✗ ${missing.length} component(s) on disk have NO registry entry.`);
  console.error('  A consumer running `npx shadcn add <name>` for these gets nothing.\n');
  for (const name of missing) console.error(`  • ${name}`);
}
if (stale.length > 0) {
  console.error(`\n✗ ${stale.length} registry entr(ies) reference a component that no longer exists:\n`);
  for (const name of stale) console.error(`  • ${name}`);
}

if (suggest && missing.length > 0) {
  console.error('\n--- derived entries (verify title/description by hand before use) ---\n');
  const entries = missing.map((name) => {
    const { npm, registry: reg } = depsFor(name);
    const entry = {
      name,
      type: 'registry:ui',
      title: name.replace(/(^|-)([a-z])/g, (_, s, c) => (s ? ' ' : '') + c.toUpperCase()),
      description: 'TODO — one line on what this is for.',
      ...(npm.length ? { dependencies: npm } : {}),
      ...(reg.length ? { registryDependencies: reg } : {}),
      files: filesFor(name).map((p) => ({ path: p, type: 'registry:ui' })),
    };
    return entry;
  });
  console.error(JSON.stringify(entries, null, 2));
}

if (graph.unowned.length > 0) {
  const uniq = [...new Map(graph.unowned.map((u) => [u.target, u])).values()];
  console.error(`\n✗ ${uniq.length} file(s) are imported by a registry item but shipped by NO item.`);
  console.error('  `npx shadcn add` cannot copy them, so the install has a dangling import.\n');
  for (const u of uniq) console.error(`  • ${u.target}  (needed by ${u.item})`);
}

if (graph.underDeclared.length > 0) {
  const byItem = new Map();
  for (const u of graph.underDeclared) {
    if (!byItem.has(u.item)) byItem.set(u.item, new Set());
    byItem.get(u.item).add(u.needs);
  }
  console.error(`\n✗ ${byItem.size} item(s) import from an item they do not declare ` +
                `(${graph.underDeclared.length} edge(s)).`);
  console.error('  Entry presence is not an install path — this is what makes the copy compile.\n');
  for (const [item, needs] of [...byItem].sort()) {
    console.error(`  • ${item}`);
    console.error(`      add to registryDependencies: ${[...needs].sort().join(', ')}`);
  }
}

if (!suggest && missing.length > 0) {
  console.error('\nRun with --suggest to print derived entries for the missing modules.');
}
console.error('');
process.exit(1);
