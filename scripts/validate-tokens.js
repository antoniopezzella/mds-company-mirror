#!/usr/bin/env node
/**
 * validate-tokens.js
 * Lightweight schema + custom rule validator for dist/tokens.json.
 */
import fs from 'fs';
import path from 'path';

const artifactPath = path.join(process.cwd(), 'dist', 'tokens.json');
const schemaPath = path.join(process.cwd(), 'tokens.schema.json');

function fail(msg) {
  console.error('\nToken validation FAILED:', msg);
  process.exit(1);
}

if (!fs.existsSync(artifactPath)) fail('tokens.json not found (run tokens:build first)');
if (!fs.existsSync(schemaPath)) fail('tokens.schema.json missing');

const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

// Basic structural checks (manual, minimal JSON schema implementation)
const requiredTop = schema.required || [];
for (const key of requiredTop) {
  if (!(key in artifact)) fail(`Missing required top-level key: ${key}`);
}

// Color pattern & hex validity
const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
for (const [k,v] of Object.entries(artifact.color || {})) {
  if (typeof v !== 'string' || !hexRegex.test(v)) fail(`Color token ${k} has invalid hex value: ${v}`);
}

// Spacing ascending
const spacing = artifact.spacing;
if (!Array.isArray(spacing)) fail('spacing must be an array');
for (let i=1;i<spacing.length;i++) {
  if (!(spacing[i] > spacing[i-1])) fail('spacing scale must be strictly ascending');
}

// Shadows contiguous
const levels = (artifact.shadows||[]).map(s=>s.level).sort((a,b)=>a-b);
for (let i=0;i<levels.length;i++) {
  if (levels[i] !== i) fail('shadow levels must be contiguous starting at 0');
}

// Semantic color subset of primitives
const primitiveValues = new Set(Object.values(artifact.color||{}));
const semanticColor = artifact.semantic?.color || {};
for (const [k,v] of Object.entries(semanticColor)) {
  if (!primitiveValues.has(v)) fail(`Semantic color ${k} value ${v} not found among primitives`);
}

// No duplicate semantic keys with identical value that appear to want differentiation (warning only for status tokens)
const statusKeys = Object.keys(semanticColor).filter(k=>k.startsWith('status'));
const statusValues = statusKeys.map(k=>semanticColor[k]);
if (new Set(statusValues).size !== statusValues.length) {
  console.warn('Warning: Duplicate status semantic token values detected (consider differentiating).');
}

console.log('Token validation passed.');

// Deprecation advisories
const deprecated = artifact.meta?.deprecated || {};
for (const [depKey, info] of Object.entries(deprecated)) {
  if (!(depKey in semanticColor)) continue; // still present; ensure replacements exist
  const repl = info.replaceWith || [];
  if (!Array.isArray(repl) || repl.length === 0) {
    console.warn(`Deprecated token ${depKey} has no replacement guidance.`);
  } else {
    const missing = repl.filter(r => !(r in semanticColor));
    if (missing.length) {
      console.warn(`Deprecated token ${depKey} replacements missing in semantic layer: ${missing.join(', ')}`);
    }
  }
}
