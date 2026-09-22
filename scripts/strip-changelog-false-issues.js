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

let after = before
  // Drop a whole ", references <links...>" tail when every link in it is hex-shaped.
  .replace(/, references (?:\[#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\]\(https?:\/\/[^)]*\/issues\/[0-9a-fA-F]+\)\s*)+/g, '')
  // Then any stragglers that sat alongside a real numeric reference.
  .replace(hexIssueLink, '')
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
