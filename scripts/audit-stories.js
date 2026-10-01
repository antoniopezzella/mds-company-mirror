#!/usr/bin/env node
/**
 * audit-stories.js — what Storybook actually documents about each component.
 *
 * Why this exists
 * ---------------
 * Every other gate in this repo checks the SOURCE: tokens, roles, spacing,
 * radius, stacking, deprecations. Nothing checked the documentation surface,
 * and it had drifted badly without anyone being able to see it:
 *
 *   - 4 PUBLICLY EXPORTED components had no story at all. That is worse than
 *     undocumented — axe runs on stories, so a component with no story is
 *     also a component with no accessibility check, while still shipping in
 *     `src/index.ts` for consumers to use.
 *   - 24 of 93 modules had a component-level description. The other 69
 *     autodocs pages opened with a bare prop table and no statement of what
 *     the thing is for.
 *   - 30 of 93 declared `argTypes`, so most Controls panels had no knobs.
 *   - 6 of 93 had a `play` function.
 *
 * The first number was 9 before the coverage rules below were right. Do not
 * loosen them without re-checking the list by hand — an audit that overstates
 * is one nobody acts on.
 *
 * What it does NOT do
 * -------------------
 * It does not fail the build. Story coverage is a judgement call per
 * component — some modules here are genuine internals (`table-primitives`,
 * the `data-table-*-filter` parts) where a story would be noise. Making this
 * a hard gate before those calls are made would just teach people to add
 * empty stories. Run it, read it, decide.
 *
 * Two accuracy notes, learned by getting both wrong first
 * ------------------------------------------------------
 * 1. "Owns a story file" is NOT the same as "is documented". `input` has no
 *    input.stories.tsx but appears in four other story files. This reports
 *    those separately as "covered by another story".
 * 2. Prop counts are regex-derived, not type-checked. They are a signal for
 *    where to look, never a number to quote. Marked approximate in output.
 *
 * Usage: node scripts/audit-stories.js [--json]
 */

import fs from 'node:fs';
import path from 'node:path';

const UI = 'src/components/ui';
const INDEX = 'src/index.ts';
const asJson = process.argv.includes('--json');

const files = fs.readdirSync(UI);
const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null);

/** A component module: a .tsx that is not itself a test or a story. */
const modules = files
  .filter((f) => f.endsWith('.tsx') && !/\.(test|stories)\.tsx$/.test(f))
  .map((f) => f.replace(/\.tsx$/, ''))
  .sort();

/** Every story file in the repo, not just the ones beside the component. */
const storyCorpus = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!/node_modules|dist|\.git/.test(p)) walk(p);
    } else if (e.name.endsWith('.stories.tsx')) {
      storyCorpus.push(fs.readFileSync(p, 'utf8'));
    }
  }
})('src');
const corpus = storyCorpus.join('\n');

const publicApi = read(INDEX) ?? '';

const rows = modules.map((name) => {
  const src = read(path.join(UI, `${name}.tsx`)) ?? '';
  const story = read(path.join(UI, `${name}.stories.tsx`));

  // Covered elsewhere? Two ways, and BOTH are needed — checking only the
  // first reported `toast` as an undocumented public component when
  // toaster.stories.tsx is literally titled "Components/Toast". It imports
  // from './toaster' and './use-toast', never './toast'.
  //   a) some story imports this module path directly (input, label, spinner)
  //   b) some story renders one of this module's exported symbols, whatever
  //      path it reached it by (toast, table-primitives)
  const importedByStory = new RegExp(`from ['"](\\./|@/components/ui/)${name}['"]`).test(corpus);
  const exportedSymbols = [
    ...src.matchAll(/^export (?:const|function|class)\s+([A-Z][A-Za-z0-9]*)/gm),
  ].map((m) => m[1]);
  // Also catch `export { A, B }` blocks, which is how toast.tsx exposes its parts.
  for (const block of src.matchAll(/^export \{([^}]+)\}/gm)) {
    for (const part of block[1].split(',')) {
      const id = part.trim().split(/\s+as\s+/).pop().trim();
      if (/^[A-Z][A-Za-z0-9]*$/.test(id)) exportedSymbols.push(id);
    }
  }
  const renderedByStory = exportedSymbols.some((sym) =>
    new RegExp(`<${sym}[\\s/>]`).test(corpus)
  );
  //   c) one hop: a module that DOES have a story imports this one. That is
  //      how toast is covered — toaster.tsx renders every Toast primitive and
  //      toaster.stories.tsx (titled "Components/Toast") mounts <Toaster/>.
  //      Only one hop: beyond that "covered" stops meaning anything.
  const coveredViaParent = files
    .filter((f) => f.endsWith('.stories.tsx'))
    .map((f) => f.replace(/\.stories\.tsx$/, ''))
    .some((parent) => {
      const parentSrc = read(path.join(UI, `${parent}.tsx`));
      return parentSrc && new RegExp(`from ['"]\\./${name}['"]`).test(parentSrc);
    });

  // Props declared at one indent level inside an interface/type.
  const props = [...new Set([...src.matchAll(/^\s{2}([a-zA-Z][a-zA-Z0-9]*)\??:\s/gm)].map((m) => m[1]))];
  const documented = props.filter((p) =>
    new RegExp(`(\\*/|//[^\\n]*)\\n\\s{2}${p}\\??:`, 'm').test(src)
  );

  return {
    name,
    isPublic: new RegExp(`from ['"]\\./components/ui/${name}['"]`).test(publicApi),
    ownsStory: !!story,
    coveredElsewhere: !story && (importedByStory || renderedByStory || coveredViaParent),
    hasTest: fs.existsSync(path.join(UI, `${name}.test.tsx`)),
    autodocs: story ? /tags:\s*\[[^\]]*['"]autodocs['"]/.test(story) : false,
    componentDoc: story ? /description:\s*\{[\s\S]{0,200}?component:/.test(story) : false,
    argTypes: story ? /argTypes:\s*\{/.test(story) : false,
    play: story ? /play:\s*async/.test(story) : false,
    storyCount: story ? (story.match(/^export const /gm) ?? []).length : 0,
    props: props.length,
    undocumentedProps: props.length - documented.length,
  };
});

if (asJson) {
  console.log(JSON.stringify(rows, null, 2));
  process.exit(0);
}

const n = rows.length;
const tally = (k) => rows.filter(k).length;
const bar = (x) => '█'.repeat(Math.round((x / n) * 20)).padEnd(20, '·');
const line = (label, k) => {
  const c = tally(k);
  console.log(`  ${bar(c)}  ${String(c).padStart(3)}/${n}  ${label}`);
};

console.log(`\nStorybook documentation audit — ${n} component modules in ${UI}\n`);
line('owns a story file', (r) => r.ownsStory);
line('has a test file', (r) => r.hasTest);
line("tags: ['autodocs']", (r) => r.autodocs);
line('component-level description', (r) => r.componentDoc);
line('argTypes (Controls panel works)', (r) => r.argTypes);
line('play function (interaction tested)', (r) => r.play);

const group = (label, k, note) => {
  const hits = rows.filter(k);
  if (!hits.length) return;
  console.log(`\n${label} (${hits.length})`);
  if (note) console.log(`  ${note}`);
  console.log(`  ${hits.map((r) => r.name).join(', ')}`);
};

group(
  '⚠ PUBLIC and completely unstoried',
  (r) => r.isPublic && !r.ownsStory && !r.coveredElsewhere,
  'Shipped from src/index.ts with no docs — and no axe coverage, since axe runs on stories.'
);
group(
  'Internal and unstoried',
  (r) => !r.isPublic && !r.ownsStory && !r.coveredElsewhere,
  'Lower priority: a story may be noise for a genuine internal.'
);
group(
  'No story file, but covered by another story',
  (r) => r.coveredElsewhere,
  'Not a gap in itself — they appear in a sibling component\'s stories.'
);
group('Story, but no component-level description', (r) => r.ownsStory && !r.componentDoc);
group('Story, but no argTypes', (r) => r.ownsStory && !r.argTypes);
group('Story, but no play function', (r) => r.ownsStory && !r.play);

console.log('\nWidest prop-documentation gaps (APPROXIMATE — regex, not the type checker)');
rows
  .filter((r) => r.props >= 4)
  .sort((a, b) => b.undocumentedProps - a.undocumentedProps)
  .slice(0, 10)
  .forEach((r) =>
    console.log(
      `  ${r.name.padEnd(24)} ${String(r.undocumentedProps).padStart(2)} of ${String(r.props).padStart(2)} props carry no JSDoc`
    )
  );
console.log('');
