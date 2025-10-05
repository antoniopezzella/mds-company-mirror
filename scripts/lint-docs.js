#!/usr/bin/env node
/*
 * docs lint: enforces MDX authoring guidelines.
 * Fails on:
 *  - deprecated blocks: ArgsTable, ArgTypes (we standardized on Controls-only)
 *  - multiple <Meta /> per file
 *  - use of <Story id="..."> (prefer of={StoryExport})
 *  - missing <Meta of={...}> (heuristic)
 */
import { readFileSync, readdirSync } from 'fs';
import { glob } from 'glob';

const MDX_GLOB = 'src/docs/**/*.mdx';

let failed = false;

function report(file, message) {
  console.error(`\n[docs-lint] ${file}: ${message}`);
  failed = true;
}

const files = glob.sync(MDX_GLOB, { nodir: true });

files.forEach((file) => {
  let content = readFileSync(file, 'utf8');

  // Strip fenced code blocks (``` ... ```) to avoid false positives inside examples
  const contentNoFences = content.replace(/```[\s\S]*?```/g, '');

  // 1. Deprecated blocks: only flag actual tag usage (<ArgsTable ...>), not mentions in backticks or prose
  if (/<\s*ArgsTable\b/.test(contentNoFences)) {
    report(file, 'Contains deprecated <ArgsTable>. Use <ApiSection> / Controls-only pattern.');
  }
  if (/<\s*ArgTypes\b/.test(contentNoFences)) {
    report(file, 'Contains deprecated <ArgTypes>. Remove and rely on Controls or ApiSection.');
  }

  // 2. Actual <Meta> tags: count only when tag starts a line (ignores inline textual mentions & code fences)
  const metaTagLines = [...contentNoFences.matchAll(/^[ \t]*<Meta\b[^\n>]*/gm)].map(m => m[0]);
  if (metaTagLines.length > 1) {
    report(file, `Multiple <Meta> tags (${metaTagLines.length}) found.`);
  }

  // 3. Story id usage (ignoring code fences)
  // Remove inline code spans to avoid flagging educational examples: `... <Story id="..." /> ...`
  const contentNoFencesNoInline = contentNoFences.replace(/`[^`]*`/g, '');
  const storyIdPattern = /<Story[^>]*\bid=/;
  if (storyIdPattern.test(contentNoFencesNoInline)) {
    report(file, 'Uses <Story id="...">; prefer <Story of={StoryExport}>.');
  }

  // 4. Meta without of= (heuristic) – allow specific categories by title
  if (metaTagLines.length === 1) {
    const metaLine = metaTagLines[0];
    const titleMatch = metaLine.match(/title="([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : '';
    const exemptTitle = /^(Docs\/|Foundations\/|Debug\/)/.test(title) || /Documentation Guidelines|Intro/i.test(title);
    if (!/\bof=/.test(metaLine) && !exemptTitle) {
      report(file, '<Meta> missing required of={StoriesModule}.');
    }

    // 5. Heading hierarchy validation (only once we know it's an MDX we care about)
    // Strip inline code spans for heading parse safety
    const headingScanSource = contentNoFences.replace(/`[^`]*`/g, '');
    const headings = [...headingScanSource.matchAll(/^#{1,6}\s+.*$/gm)].map(m => m[0]);
    if (headings.length === 0) {
      report(file, 'Missing top-level # heading.');
    } else {
      const h1s = headings.filter(h => h.startsWith('# '));
      if (h1s.length !== 1) {
        report(file, `Expected exactly one # heading, found ${h1s.length}.`);
      }
      let prevLevel = 0;
      headings.forEach(h => {
        const level = h.match(/^#+/)[0].length;
        if (prevLevel && level - prevLevel > 1) {
          report(file, `Heading level jumps from ${prevLevel} to ${level}.`);
        }
        prevLevel = level;
      });
    }

    // 6. Components pages: enforce ApiSection usage (no raw Controls) for consistency
    const isComponentsPage = /^Components\//.test(title);
    if (isComponentsPage) {
      if (!/<ApiSection\b/.test(contentNoFences)) {
        report(file, 'Components page missing <ApiSection>.');
      }
      if (/<Controls\b/.test(contentNoFences)) {
        report(file, 'Raw <Controls> found in components page (use <ApiSection>).');
      }
    }
  }
});

if (failed) {
  console.error('\nDocs lint failed. Fix issues above.');
  process.exit(1);
} else {
  console.log('Docs lint passed.');
}
