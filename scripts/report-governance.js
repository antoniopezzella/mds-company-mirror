#!/usr/bin/env node
/**
 * report-governance.js
 * Aggregates design system governance signals into a single JSON/text report:
 *  - Role usage violations (from scanning components)
 *  - Role contrast status (recomputes enforced & monitored pairs)
 *  - Semantic contrast summary (consumes existing contrast JSON if available, or runs light/dark inline)
 *
 * Flags:
 *  --json  : output JSON payload only
 *  --strict: non-zero exit if any enforced failures (role usage violations OR contrast fails)
 */
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const strict = args.includes('--strict');

// ------------ Helpers (contrast) ------------
function hexToRgb(hex) {
  const h = hex.replace('#','');
  const full = h.length === 3 ? h.split('').map(c=>c+c).join('') : h;
  const int = parseInt(full,16);
  return { r:(int>>16)&255, g:(int>>8)&255, b:int&255 };
}
function lumChan(c){ const v=c/255; return v<=0.03928? v/12.92: Math.pow((v+0.055)/1.055,2.4);} 
function relLum({r,g,b}){ return 0.2126*lumChan(r)+0.7152*lumChan(g)+0.0722*lumChan(b);} 
function contrast(a,b){ const L1=relLum(hexToRgb(a)); const L2=relLum(hexToRgb(b)); const lighter=Math.max(L1,L2); const darker=Math.min(L1,L2); return (lighter+0.05)/(darker+0.05);} 

// ------------ Load semantic artifact (tokens build) ------------
const artifactPath = path.join(process.cwd(), 'dist', 'tokens.json');
let semantic = null; let darkOverrides = {};
if (fs.existsSync(artifactPath)) {
  try {
    const artifact = JSON.parse(fs.readFileSync(artifactPath,'utf8'));
    semantic = artifact.semantic?.color || null;
    darkOverrides = artifact.semantic?.modes?.dark || {};
  } catch(e) { /* ignore */ }
}

// ------------ Role contrast (mirror roles.contrast.test enforced set) ------------
// We import roles and semantic-tokens directly for dynamic values.
function parseRoleMap() {
  const rolesPath = path.join(process.cwd(),'src','theme','roles.ts');
  const src = fs.readFileSync(rolesPath,'utf8');
  const mapBlockMatch = src.match(/const ROLE_MAP:[\s\S]*?= ({[\s\S]*?});/);
  if (!mapBlockMatch) return {};
  const objText = mapBlockMatch[1];
  // Rough parse: extract lines like '"text.primary": { semantic: 'textPrimary'
  const lineRegex = /'([^']+)'\s*:\s*{\s*semantic:\s*'([^']+)'/g;
  const map = {};
  let m; while((m=lineRegex.exec(objText))!==null){ map[m[1]] = m[2]; }
  return map;
}

// NOTE: All role contrast pairs are now fully enforced (no monitored set).
// If future incremental improvements are needed, reintroduce MONITORED_ROLE_PAIRS
// and keep them out of ENFORCED_ROLE_PAIRS until they meet thresholds.
const ENFORCED_ROLE_PAIRS = [
  ['text.primary','surface.default',4.5],
  ['text.secondary','surface.default',3.0],
  ['text.inverse','surface.accent',4.5],
  ['text.onAccent','interactive.primary',4.5],
  ['text.onAccent','interactive.primary.hover',4.5],
  ['status.success.fg','status.success.bg',3.0],
  ['status.warning.fg','status.warning.bg',3.0],
  ['status.danger.fg','status.danger.bg',3.0],
];
const MONITORED_ROLE_PAIRS = [
  // none
];

async function computeRoleContrast() {
  const roleToSemantic = parseRoleMap();
  if (!Object.keys(roleToSemantic).length || !semantic) {
    return { enforced: [], monitored: [], enforcedFailures: [], unavailable: true };
  }
  const dark = { ...semantic, ...darkOverrides };
  function roleColor(role, mode) {
    const sem = roleToSemantic[role];
    if (!sem) throw new Error('Unknown role '+role);
    const map = mode==='dark'? dark: semantic;
    return map[sem];
  }
  function assess(set, level){
    return set.map(([fg,bg,req]) => {
      const lightRatio = contrast(roleColor(fg,'light'), roleColor(bg,'light'));
      const darkRatio = contrast(roleColor(fg,'dark'), roleColor(bg,'dark'));
      return { fg, bg, required:req, light:Number(lightRatio.toFixed(2)), dark:Number(darkRatio.toFixed(2)), level };
    });
  }
  const enforced = assess(ENFORCED_ROLE_PAIRS,'enforced');
  const monitored = assess(MONITORED_ROLE_PAIRS,'monitored');
  const enforcedFailures = enforced.filter(p => p.light < p.required || p.dark < p.required);
  return { enforced, monitored, enforcedFailures };
}

// ------------ Role usage scan (reuse logic simplified) ------------
function scanRoleUsage() {
  const componentsDir = path.join(process.cwd(),'src','components');
  function list(dir){ return fs.existsSync(dir) ? fs.readdirSync(dir).flatMap(e=>{ const f=path.join(dir,e); const s=fs.statSync(f); return s.isDirectory()? list(f): /\.(tsx?|jsx?)$/.test(e)? [f]: []; }) : []; }
  const files = list(componentsDir);
  const viols=[];
  for (const file of files) {
    const text = fs.readFileSync(file,'utf8');
    const tokenPattern = /\btokens\.[a-zA-Z0-9_]+/g;
    const semanticPattern = /\bsemanticColors\.[a-zA-Z0-9_]+/g;
    let m; while((m=tokenPattern.exec(text))!==null) viols.push({file:path.relative(process.cwd(),file), ref:m[0]});
    while((m=semanticPattern.exec(text))!==null) viols.push({file:path.relative(process.cwd(),file), ref:m[0]});
  }
  return viols;
}

// ------------ Semantic contrast quick summary ------------
function semanticContrastSummary() {
  if (!semantic) return { available:false };
  const base = semantic;
  const dark = { ...semantic, ...darkOverrides };
  function ratio(fg,bg,mode){ const map = mode==='dark'? dark: base; return contrast(map[fg], map[bg]); }
  const pairs = [
    { fg:'textPrimary', bg:'surfaceDefault', required:4.5 },
    { fg:'textSecondary', bg:'surfaceDefault', required:3.0 },
    { fg:'statusSuccessText', bg:'statusSuccessBg', required:3.0 },
    { fg:'statusWarningText', bg:'statusWarningBg', required:3.0 },
    { fg:'statusDangerText', bg:'statusDangerBg', required:3.0 },
  ];
  return {
    available:true,
    pairs: pairs.map(p => ({
      ...p,
      light: Number(ratio(p.fg,p.bg,'light').toFixed(2)),
      dark: Number(ratio(p.fg,p.bg,'dark').toFixed(2))
    }))
  };
}

// ------------ Run aggregation ------------
(async () => {
  const roleUsage = scanRoleUsage();
  const roleContrast = await computeRoleContrast();
  const semanticContrast = semanticContrastSummary();
  const exitFailures = [];
  if (roleUsage.length && strict) exitFailures.push('roleUsage');
  if (roleContrast.enforcedFailures.length && strict) exitFailures.push('roleContrast');
  const payload = {
    strict,
    roleUsage: { violations: roleUsage, count: roleUsage.length },
    roleContrast: roleContrast,
    semanticContrast,
    status: exitFailures.length ? 'FAILED' : 'OK'
  };
  if (asJson) {
    process.stdout.write(JSON.stringify(payload,null,2)+'\n');
  } else {
    console.log('Design System Governance Report');
    console.log('================================');
    console.log(`Role usage violations: ${roleUsage.length}`);
    if (roleUsage.length) {
      for (const v of roleUsage.slice(0,10)) console.log(`  - ${v.file}: ${v.ref}`);
      if (roleUsage.length > 10) console.log(`  ... +${roleUsage.length - 10} more`);
    }
    console.log('\nRole contrast (enforced):');
    for (const p of roleContrast.enforced) {
      const fail = (p.light < p.required || p.dark < p.required) ? 'FAIL' : 'PASS';
      console.log(`  ${p.fg} on ${p.bg} -> light ${p.light} / dark ${p.dark} (req ${p.required}) ${fail}`);
    }
    if (roleContrast.monitored.length) {
      console.log('\nRole contrast (monitored):');
      for (const p of roleContrast.monitored) {
        console.log(`  ${p.fg} on ${p.bg} -> light ${p.light} / dark ${p.dark} (target ${p.required}) MONITOR`);
      }
    }
    if (semanticContrast.available) {
      console.log('\nSemantic contrast snapshot:');
      for (const p of semanticContrast.pairs) {
        console.log(`  ${p.fg} on ${p.bg} -> light ${p.light} / dark ${p.dark} (req ${p.required})`);
      }
    } else {
      console.log('\nSemantic contrast snapshot unavailable (dist/tokens.json missing).');
    }
    console.log(`\nOverall status: ${payload.status}`);
  }
  process.exit(exitFailures.length ? 1 : 0);
})();
