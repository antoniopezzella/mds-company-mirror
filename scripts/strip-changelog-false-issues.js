#!/usr/bin/env node
/**
 * Removes bogus "references [#abc123](.../issues/abc123)" links from
 * CHANGELOG.md, run as commit-and-tag-version's `postchangelog` hook.
 *
 * Why this exists: conventional-changelog matches issue references as `#(\w+)`,
 * not `#(\d+)`. This repo's commit bodies quote hex colours constantly —
 * they explain contrast fixes, e.g. "#cb7623 on #fffcf8 is 3.34:1" — so every
 * one of those became a link to a GitHub issue that does not exist. The 0.5.0
 * changelog had ~25 dead links (issues/ee4343, issues/cb7623, issues/878787...)
 * before this ran.
 *
 * Configuring it away was tried first and does not work: neither
 * `parserOpts.issuePrefixes: []` nor a top-level `issuePrefixes: []` in
 * .versionrc.json is honoured by the conventionalcommits preset. Hence
 * post-processing.
 *
 * Only hex-shaped references are stripped (3, 6 or 8 hex digits). A genuine
 * numeric issue reference like `#123` is left alone, so this stays correct if
 * the project ever starts using GitHub issues.
 */
import fs from 'fs';
import path from 'path';

const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
if (!fs.existsSync(changelogPath)) {
  console.log('[changelog] CHANGELOG.md not found, nothing to clean.');
  process.exit(0);
}

const before = fs.readFileSync(changelogPath, 'utf8');

// A hex-shaped issue link: [#ee4343](https://.../issues/ee4343)
const hexIssueLink = /\[#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\]\(https?:\/\/[^)]*\/issues\/[0-9a-fA-F]+\)/g;

// `references` is NOT the only keyword. conventional-changelog emits
// `closes` (and `fixes`/`resolves`) for closing references, and only
// `references` for plain mentions. Handling one and not the others
// corrupted the 0.7.0 changelog: a `, closes [#691315](...)` tail had its
// LINK removed by the second pass while the bare `, closes` survived, and
// the `\s*` then swallowed the blank line after it — pulling the following
// `### Bug Fixes` heading onto the entry's own line. The Bug Fixes,
// Documentation and Refactoring sections silently merged into Features:
// 59 entries under Features against 38 actual `feat` commits, and 21 bug
// fixes with no section of their own.
//
// This is the exact failure .versionrc.json's comment warns about in its
// other form — "a silently incomplete changelog is the worse failure".
// ALWAYS diff the section list after a release.
const KEYWORDS = '(?:references|closes|fixes|resolves)';
const HEX = '(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})';
const HEX_LINK = `\\[#${HEX}\\]\\(https?:\\/\\/[^)]*\\/issues\\/[0-9a-fA-F]+\\)`;

let after = before
  // Drop a whole ", <keyword> <links...>" tail when every link in it is
  // hex-shaped. `[^\S\n]*` matches spaces/tabs between links but NEVER a
  // newline, so a heading on the next line can no longer be absorbed.
  .replace(new RegExp(`, ${KEYWORDS} (?:${HEX_LINK}[^\\S\\n]*)+`, 'g'), '')
  // Then any stragglers that sat alongside a real numeric reference.
  .replace(hexIssueLink, '')
  // A keyword left with no references at all after the pass above.
  .replace(new RegExp(`, ${KEYWORDS}[^\\S\\n]*$`, 'gm'), '')
  // Tidy the whitespace those removals leave behind.
  .replace(/[ \t]+$/gm, '')
  .replace(/\(\s*,/g, '(');

if (after === before) {
  console.log('[changelog] No hex-shaped issue links found.');
  process.exit(0);
}

const removed = (before.match(hexIssueLink) || []).length;
fs.writeFileSync(changelogPath, after);
console.log(`[changelog] Removed ${removed} hex-shaped issue link(s) that pointed at non-existent issues.`);
