#!/usr/bin/env node
/**
 * check-osv.js — scan the installed dependency tree against the OSV database
 * (api.osv.dev), the same vulnerability data the company's Artifactory/Xray
 * policy enforces. Its whole reason to exist: the company registry 403s on
 * any package version with a known CVE ("forbidden by your security policy"),
 * and that only surfaces mid-pipeline on the MMC runner. This surfaces it HERE
 * — on every dev's machine and in our own CI — so a vulnerable dep is caught
 * and pinned to a clean version before it ever reaches Artifactory.
 *
 * Reads package-lock.json (the resolved tree, so it sees transitive deps too),
 * batch-queries OSV, then fetches severity + fixed-version for each hit.
 *
 *   node scripts/check-osv.js            # advisory — reports, exits 0
 *   node scripts/check-osv.js --strict   # exits 1 if any vuln is found
 *   node scripts/check-osv.js --selftest # proves the gate can fail
 *
 * An allowlist (scripts/osv-allowlist.json: ["GHSA-xxxx", ...]) suppresses
 * accepted/unfixable advisories so the strict gate can stay green while a fix
 * is pending — mirror of the hex/palette ratchet pattern in this repo.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STRICT = process.argv.includes('--strict');
const SELFTEST = process.argv.includes('--selftest');

const allowlistPath = path.join(root, 'scripts', 'osv-allowlist.json');
const allow = new Set(fs.existsSync(allowlistPath) ? JSON.parse(fs.readFileSync(allowlistPath, 'utf8')) : []);

/** Collect every {name, version} from the lockfile's resolved `packages` map. */
function readTree() {
  const lock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf8'));
  const seen = new Map(); // name@version -> {name, version}
  for (const [key, v] of Object.entries(lock.packages || {})) {
    if (!key.startsWith('node_modules/') || !v.version) continue;
    const name = key.slice(key.lastIndexOf('node_modules/') + 'node_modules/'.length);
    seen.set(`${name}@${v.version}`, { name, version: v.version });
  }
  return [...seen.values()];
}

async function osvBatch(pkgs) {
  // querybatch returns, per query (in order), { vulns: [{id, modified}] } or {}
  const out = [];
  for (let i = 0; i < pkgs.length; i += 900) {
    const chunk = pkgs.slice(i, i + 900);
    const res = await fetch('https://api.osv.dev/v1/querybatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ queries: chunk.map((p) => ({ package: { name: p.name, ecosystem: 'npm' }, version: p.version })) }),
    });
    if (!res.ok) throw new Error(`OSV querybatch failed: ${res.status}`);
    const json = await res.json();
    (json.results || []).forEach((r, j) => {
      const vulns = (r.vulns || []).map((v) => v.id).filter((id) => !allow.has(id));
      if (vulns.length) out.push({ ...chunk[j], vulns });
    });
  }
  return out;
}

const vulnCache = new Map();
async function vulnDetail(id) {
  if (vulnCache.has(id)) return vulnCache.get(id);
  const res = await fetch(`https://api.osv.dev/v1/vulns/${id}`);
  const j = res.ok ? await res.json() : {};
  // severity: prefer CVSS, else the GHSA database_specific label
  let sev = (j.database_specific && j.database_specific.severity) || '';
  if (!sev && Array.isArray(j.severity) && j.severity[0]) sev = 'CVSS:' + j.severity[0].score;
  const fixed = [];
  (j.affected || []).forEach((a) => {
    if (a.package && a.package.ecosystem === 'npm') {
      (a.ranges || []).forEach((rg) => (rg.events || []).forEach((e) => { if (e.fixed) fixed.push(`${a.package.name}@${e.fixed}`); }));
    }
  });
  const detail = { id, sev: sev || '—', fixed: [...new Set(fixed)].slice(0, 2).join(', ') };
  vulnCache.set(id, detail);
  return detail;
}

const SEV_RANK = { CRITICAL: 0, HIGH: 1, MODERATE: 2, MEDIUM: 2, LOW: 3, '—': 4 };

async function scan(tree) {
  const hits = await osvBatch(tree);
  const rows = [];
  for (const h of hits) {
    const details = await Promise.all(h.vulns.map(vulnDetail));
    for (const d of details) rows.push({ pkg: `${h.name}@${h.version}`, ...d });
  }
  rows.sort((a, b) => (SEV_RANK[a.sev.toUpperCase()] ?? 9) - (SEV_RANK[b.sev.toUpperCase()] ?? 9) || a.pkg.localeCompare(b.pkg));
  return rows;
}

async function main() {
  if (SELFTEST) {
    // Prove the scan flags a known-vulnerable package (one the company 403s on).
    const rows = await scan([{ name: 'vitest', version: '3.2.4' }]);
    if (!rows.length || !rows.some((r) => r.pkg === 'vitest@3.2.4')) {
      console.error('✗ osv self-test: known-vulnerable vitest@3.2.4 was NOT flagged — the gate is broken.');
      process.exit(1);
    }
    const clean = await scan([{ name: 'vitest', version: '4.1.11' }]);
    if (clean.length) {
      console.error('✗ osv self-test: clean vitest@4.1.11 was flagged — false positive.');
      process.exit(1);
    }
    console.log('✓ osv self-test: flags vitest@3.2.4 (vulnerable), passes vitest@4.1.11 (clean).');
    return;
  }

  const tree = readTree();
  console.log(`check-osv: scanning ${tree.length} resolved packages against api.osv.dev …\n`);
  const rows = await scan(tree);

  if (!rows.length) {
    console.log('✓ No known vulnerabilities in the dependency tree (per OSV).');
    return;
  }
  const pad = (s, n) => String(s).padEnd(n);
  console.log(`  ${pad('Package', 34)} ${pad('Severity', 10)} ${pad('Advisory', 24)} Fixed in`);
  console.log(`  ${'─'.repeat(34)} ${'─'.repeat(10)} ${'─'.repeat(24)} ${'─'.repeat(20)}`);
  for (const r of rows) console.log(`  ${pad(r.pkg, 34)} ${pad(r.sev, 10)} ${pad(r.id, 24)} ${r.fixed || '—'}`);
  console.log(`\n${rows.length} vulnerable package/advisory pair(s). These will 403 against the company registry if its policy blocks their severity.`);
  if (allow.size) console.log(`(${allow.size} advisory id(s) suppressed via scripts/osv-allowlist.json)`);

  if (STRICT) {
    console.error('\n✗ check-osv --strict: vulnerable dependencies present. Pin clean versions (see "Fixed in") or allowlist accepted advisories.');
    process.exit(1);
  }
  console.log('\n(advisory run — not failing the build. Use --strict to enforce.)');
}

main().catch((e) => { console.error('check-osv error:', e.message); process.exit(2); });
