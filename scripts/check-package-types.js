#!/usr/bin/env node
/**
 * check-package-types.js — type-checks the package as a CONSUMER sees it.
 *
 * Why this exists
 * ---------------
 * `src/lib/format.ts` was added and re-exported from `src/index.ts`, but
 * `vite.lib.config.ts`'s dts `include` list was not extended. The result
 * shipped green through every gate in this repo:
 *
 *   npx tsc -b            ✓  (checks src/, not dist-pkg/)
 *   npm test              ✓  (runs source through Vite, never the build)
 *   npm run build:package ✓  (rollup resolves the JS fine)
 *   check-package-css.js  ✓  (checks CSS, not types)
 *
 * ...and `npm install` handed consumers a package whose JavaScript worked and
 * whose types did not compile: `import { Button }` raised TS2307 on five
 * modules that index.d.ts referenced but that had no .d.ts emitted.
 *
 * Every gate here validated the SOURCE. Nothing validated the ARTIFACT.
 *
 * How it checks
 * -------------
 * Writes a throwaway consumer module that imports the package's public API by
 * its real entry point, then type-checks it with `skipLibCheck: true` —
 * deliberately, because that is what a real consumer's tsconfig almost always
 * says, and because it suppresses unrelated third-party @types noise while
 * leaving TS2307 (cannot find module / its type declarations) fully visible.
 * A missing .d.ts cannot hide behind skipLibCheck; that is the whole point.
 *
 * Usage: node scripts/check-package-types.js
 * Requires `npm run build:package` to have run first.
 */
import fs from 'fs';
import path from 'path';
import os from 'os';
import { execFileSync } from 'child_process';

const root = process.cwd();
const pkgDir = path.join(root, 'dist-pkg');
const entry = path.join(pkgDir, 'index.d.ts');
const pkgJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

if (!fs.existsSync(entry)) {
  console.error('✗ dist-pkg/index.d.ts not found — run `npm run build:package` first.');
  process.exit(1);
}

// 1. Every module index.d.ts points at must actually exist on disk. This is
//    the cheap, precise version of the check and gives a better error than
//    tsc's, so it runs first.
const src = fs.readFileSync(entry, 'utf8');
const specifiers = [...src.matchAll(/from\s+['"](\.[^'"]+)['"]/g)].map((m) => m[1]);
const missing = [];

for (const spec of new Set(specifiers)) {
  const base = path.join(pkgDir, spec);
  const candidates = [`${base}.d.ts`, path.join(base, 'index.d.ts'), base];
  if (!candidates.some((c) => fs.existsSync(c))) missing.push(spec);
}

if (missing.length) {
  console.error(`✗ dist-pkg/index.d.ts references ${missing.length} module(s) with no .d.ts emitted:\n`);
  for (const m of missing) console.error(`    ${m}`);
  console.error('\n  Fix: add the source path to the dts `include` list in vite.lib.config.ts.');
  console.error('  Anything re-exported from src/index.ts must be listed there, not just');
  console.error('  src/components/ui/**. The JS build does not need the list; the types do.\n');
  process.exit(1);
}

// 1b. Every BARE specifier the published types reference must be declared as a
//     dependency or peerDependency.
//
//     tsc compiles the .d.ts against *our* node_modules, where npm has hoisted
//     every transitive package — so an undeclared type dependency compiles
//     clean here and breaks for a consumer on pnpm, whose node_modules is not
//     flat. Real example: `typeof dataGridFeatures` is inferred, and the
//     inferred type expands to `import('@tanstack/table-core').TableFeature`
//     — a package we never declared, reachable locally only because
//     @tanstack/react-table depends on it.
const declared = new Set([
  ...Object.keys(pkgJson.dependencies ?? {}),
  ...Object.keys(pkgJson.peerDependencies ?? {}),
]);

const bareSpecifiers = new Set();
for (const file of fs.readdirSync(pkgDir, { recursive: true })) {
  if (typeof file !== 'string' || !file.endsWith('.d.ts')) continue;
  const text = fs.readFileSync(path.join(pkgDir, file), 'utf8');
  // A module specifier never contains whitespace. Without that constraint the
  // word "from" inside a doc comment matches, and prose gets reported as a
  // package ("the current search matched nothing" was the first false hit).
  for (const m of text.matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*)['"]([^'"\s.][^'"\s]*)['"]/g)) {
    // `@scope/name` or `name`, ignoring any deep path after it.
    const spec = m[1];
    const parts = spec.split('/');
    bareSpecifiers.add(spec.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0]);
  }
}

const undeclared = [...bareSpecifiers].filter(
  (s) => !declared.has(s) && !s.startsWith('node:')
);

if (undeclared.length) {
  console.error(`✗ published types reference ${undeclared.length} undeclared package(s):\n`);
  for (const u of undeclared) console.error(`    ${u}`);
  console.error('\n  These resolve here only because npm hoists transitives. A consumer on');
  console.error('  pnpm (non-flat node_modules) would get "cannot find module" on our types.');
  console.error('  Fix: add each to peerDependencies (type-level deps are still deps).\n');
  process.exit(1);
}

// 2. Compile a real consumer against the built entry point.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mds-dts-'));
const consumer = path.join(tmp, 'consumer.ts');
const pkgName = pkgJson.name;

fs.writeFileSync(
  consumer,
  [
    `import type * as MDS from ${JSON.stringify(entry.replace(/\.d\.ts$/, ''))};`,
    'export type Surface = MDS.ButtonProps;',
    'export type Fmt = typeof MDS.formatCurrency;',
    'export type Role = MDS.RoleName;',
    '',
  ].join('\n')
);

const tsconfig = path.join(tmp, 'tsconfig.json');
fs.writeFileSync(
  tsconfig,
  JSON.stringify(
    {
      compilerOptions: {
        noEmit: true,
        strict: true,
        // Deliberate: mirrors a real consumer, and leaves TS2307 visible.
        skipLibCheck: true,
        module: 'esnext',
        moduleResolution: 'bundler',
        target: 'es2022',
        jsx: 'react-jsx',
        types: [],
        baseUrl: root,
        paths: { '*': [path.join(root, 'node_modules/*')] },
      },
      files: [consumer],
    },
    null,
    2
  )
);

let out = '';
let failed = false;
try {
  execFileSync('npx', ['tsc', '-p', tsconfig], { cwd: root, encoding: 'utf8', stdio: 'pipe' });
} catch (e) {
  out = `${e.stdout ?? ''}${e.stderr ?? ''}`;
  failed = true;
}

fs.rmSync(tmp, { recursive: true, force: true });

if (failed) {
  console.error(`✗ a consumer of ${pkgName} does not type-check against dist-pkg:\n`);
  console.error(out.trim());
  console.error('');
  process.exit(1);
}

console.log(`✓ published types OK — ${specifiers.length} re-export(s) resolve, consumer compiles clean.`);
