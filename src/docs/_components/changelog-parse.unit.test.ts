import { readFileSync } from 'node:fs';
import path from 'node:path';
import { parseChangelog } from './changelog-parse';

/**
 * Parsed against the real CHANGELOG.md, not a fixture — the Foundations
 * page renders that file directly, so if its generated shape ever changes
 * these tests are what catches the page silently rendering nothing.
 */
const real = readFileSync(path.join(process.cwd(), 'CHANGELOG.md'), 'utf8');

describe('parseChangelog', () => {
  it('parses every release out of the real CHANGELOG.md', () => {
    const releases = parseChangelog(real);
    expect(releases.length).toBeGreaterThan(0);
    // Every release must carry a version and at least one entry, otherwise
    // the page renders an empty heading.
    for (const r of releases) {
      expect(r.version).toBeTruthy();
      expect(r.sections.flatMap((s) => s.entries).length).toBeGreaterThan(0);
    }
  });

  it('reads a linked version heading with a compare URL and date', () => {
    const [first] = parseChangelog(`## [1.2.3](https://example.com/compare) (2026-08-21)

### Features

* **components:** add a thing ([abc1234](https://example.com/commit/abc1234))
`);
    expect(first.version).toBe('1.2.3');
    expect(first.compareUrl).toBe('https://example.com/compare');
    expect(first.date).toBe('2026-08-21');
  });

  it('splits scope, subject and short hash out of an entry', () => {
    const [r] = parseChangelog(`## [1.0.0](u) (2026-01-01)

### Features

* **components:** add a size prop to Badge ([abcdef1234567](https://example.com/c/abcdef1234567))
`);
    const e = r.sections[0].entries[0];
    expect(e.scope).toBe('components');
    expect(e.text).toBe('add a size prop to Badge');
    expect(e.hash).toBe('abcdef1'); // truncated to 7
    expect(e.url).toBe('https://example.com/c/abcdef1234567');
  });

  it('handles an unscoped entry and an entry with no commit link', () => {
    const [r] = parseChangelog(`## 0.0.0 (2025-10-12)

* chore: tidy things ([1234567](https://example.com/c/1234567))
* a bare entry with no link
`);
    expect(r.sections[0].entries[0].scope).toBeUndefined();
    expect(r.sections[0].entries[0].text).toBe('chore: tidy things');
    expect(r.sections[0].entries[1].hash).toBeUndefined();
    expect(r.sections[0].entries[1].text).toBe('a bare entry with no link');
  });

  it('keeps bullets that appear before any section heading', () => {
    // The 0.0.0 block in this repo's changelog has no `###` headings.
    const [r] = parseChangelog(`## 0.0.0 (2025-10-12)

* chore: something ([1234567](https://example.com/c/1234567))
`);
    expect(r.sections).toHaveLength(1);
    expect(r.sections[0].entries).toHaveLength(1);
  });

  it('drops a release heading that has no entries under it', () => {
    expect(parseChangelog('## [9.9.9](u) (2026-01-01)\n\n\n')).toHaveLength(0);
  });

  it('ignores the file preamble above the first release', () => {
    const releases = parseChangelog(`# Changelog

All notable changes are documented here.

## [1.0.0](u) (2026-01-01)

* **x:** y ([1234567](https://e.com/c/1234567))
`);
    expect(releases).toHaveLength(1);
    expect(releases[0].version).toBe('1.0.0');
  });
});
