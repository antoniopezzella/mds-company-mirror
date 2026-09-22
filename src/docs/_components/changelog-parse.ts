/**
 * Parser for the conventional-changelog format this repo emits. Kept apart
 * from Changelog.tsx so the component file only exports components (the
 * react-refresh rule) and so the parsing is unit-testable on its own.
 */

export interface Entry {
  scope?: string;
  text: string;
  hash?: string;
  url?: string;
}
export interface Section {
  title: string;
  entries: Entry[];
}
export interface Release {
  version: string;
  date?: string;
  compareUrl?: string;
  sections: Section[];
}

const UNTITLED = 'Changes';

/**
 * Parses the subset of the conventional-changelog format this repo emits:
 *   ## [1.2.3](compare-url) (2026-08-21)   |   ## 0.0.0 (2025-10-12)
 *   ### Features
 *   * **scope:** description ([hash](commit-url))
 * Bullets that appear before any `###` (the 0.0.0 block does this) are
 * collected under a generic section rather than dropped.
 */
export function parseChangelog(src: string): Release[] {
  const releases: Release[] = [];
  let release: Release | null = null;
  let section: Section | null = null;

  for (const line of src.split('\n')) {
    const h2 = line.match(/^##\s+(?:\[([^\]]+)\]\(([^)]+)\)|([^\s(]+))\s*(?:\(([^)]+)\))?/);
    if (h2) {
      release = { version: h2[1] ?? h2[3] ?? '', compareUrl: h2[2], date: h2[4], sections: [] };
      releases.push(release);
      section = null;
      continue;
    }
    if (!release) continue;

    const h3 = line.match(/^###\s+(.+?)\s*$/);
    if (h3) {
      section = { title: h3[1], entries: [] };
      release.sections.push(section);
      continue;
    }

    const bullet = line.match(/^\*\s+(.*)$/);
    if (bullet) {
      if (!section) {
        section = { title: UNTITLED, entries: [] };
        release.sections.push(section);
      }
      let body = bullet[1];
      let hash: string | undefined;
      let url: string | undefined;
      const link = body.match(/\(\[([0-9a-f]{6,})\]\(([^)]+)\)\)\s*$/i);
      if (link) {
        hash = link[1].slice(0, 7);
        url = link[2];
        body = body.slice(0, link.index).trim();
      }
      const scoped = body.match(/^\*\*([^:*]+):\*\*\s*(.*)$/);
      section.entries.push(
        scoped ? { scope: scoped[1], text: scoped[2], hash, url } : { text: body, hash, url }
      );
    }
  }
  // A release heading with no bullets under it carries no information.
  return releases.filter((r) => r.sections.some((s) => s.entries.length));
}

