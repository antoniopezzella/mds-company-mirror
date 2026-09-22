#!/usr/bin/env node
/**
 * build-knowledge-base.js
 * Compiles apps/gateway/data/approved/*.md into a single JSON artifact that
 * api/chat-stream.ts (a Vercel Edge Function — no `fs`, no Node built-ins)
 * can import directly. Mirrors build-tokens.js's "source of truth compiled
 * to a static artifact" pattern.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SRC_DIR = path.join(root, 'apps/gateway/data/approved');
const OUT_DIR = path.join(root, 'api/_data');
const OUT_FILE = path.join(OUT_DIR, 'knowledge-base.json');

const files = readdirSync(SRC_DIR).filter((f) => f.endsWith('.md'));

const docs = files.map((f) => {
  const text = readFileSync(path.join(SRC_DIR, f), 'utf8');
  const title = text.split('\n')[0].replace(/^#\s*/, '') || f;
  // '#', not a real path — this deployment has no route serving these docs
  // (the SPA catch-all rewrite would silently land a real-looking link on
  // the homepage instead of 404ing), so citations point nowhere rather than
  // somewhere misleading.
  return { title, url: '#', text };
});

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(docs, null, 2));

console.log(`[kb:build] Wrote ${docs.length} docs to ${path.relative(root, OUT_FILE)}`);
