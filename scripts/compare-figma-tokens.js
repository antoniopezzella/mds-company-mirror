#!/usr/bin/env node
/**
 * Compare Figma Variables with Code Tokens
 * 
 * Reads figma-variables.json and compares with tokens.ts and semantic-tokens.ts
 * to identify missing tokens, naming mismatches, and value differences.
 * 
 * Usage: node scripts/compare-figma-tokens.js
 */

const fs = require('fs');
const path = require('path');

// Helper to convert RGB to hex
function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16).toUpperCase();
    return hex.padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Read Figma export
const figmaPath = path.resolve(process.cwd(), 'figma-variables.json');
if (!fs.existsSync(figmaPath)) {
  console.error(`\n❌ Error: figma-variables.json not found!`);
  console.error(`   Run: node scripts/export-figma-variables.js for instructions\n`);
  process.exit(1);
}

let figmaData;
try {
  figmaData = JSON.parse(fs.readFileSync(figmaPath, 'utf8'));
} catch (err) {
  console.error(`\n❌ Error parsing figma-variables.json: ${err.message}\n`);
  process.exit(1);
}

// Parse Figma data
const figmaTokens = new Map(); // name -> { value, collection, type }
const figmaCollections = [];

if (figmaData._readme) {
  console.error(`\n⚠️  figma-variables.json is a placeholder!`);
  console.error(`   Please export your actual Figma variables.\n`);
  process.exit(1);
}

const collections = figmaData.collections || figmaData;
if (!Array.isArray(collections)) {
  console.error(`\n❌ Unexpected Figma data format. Expected array of collections.\n`);
  process.exit(1);
}

collections.forEach(col => {
  figmaCollections.push({
    name: col.name,
    modes: col.modes || [],
    variableCount: col.variables?.length || col.variableIds?.length || 0
  });
  
  const variables = col.variables || [];
  variables.forEach(v => {
    const lightMode = col.modes?.[0]?.modeId || 'Light';
    const value = v.valuesByMode?.[lightMode];
    
    let hexValue = null;
    if (value && typeof value === 'object' && 'r' in value) {
      hexValue = rgbToHex(value.r, value.g, value.b);
    }
    
    figmaTokens.set(v.name, {
      value: hexValue || value,
      collection: col.name,
      type: v.resolvedType || v.type,
      modes: Object.keys(v.valuesByMode || {})
    });
  });
});

// Read code tokens
const tokensPath = path.resolve(process.cwd(), 'src/tokens.ts');
const semanticPath = path.resolve(process.cwd(), 'src/semantic-tokens.ts');

const codeTokens = new Map(); // name -> value

// Parse tokens.ts (simplified - actual parsing would need a TS parser)
if (fs.existsSync(tokensPath)) {
  const tokensContent = fs.readFileSync(tokensPath, 'utf8');
  const tokenRegex = /(\w+):\s*['"]([#\w]+)['"]/g;
  let match;
  while ((match = tokenRegex.exec(tokensContent)) !== null) {
    codeTokens.set(match[1], { value: match[2], source: 'tokens.ts' });
  }
}

// Parse semantic-tokens.ts
if (fs.existsSync(semanticPath)) {
  const semanticContent = fs.readFileSync(semanticPath, 'utf8');
  const semanticRegex = /(\w+):\s*ref\(['"](\w+)['"]\)/g;
  let match;
  while ((match = semanticRegex.exec(semanticContent)) !== null) {
    codeTokens.set(match[1], { value: `→ ${match[2]}`, source: 'semantic-tokens.ts' });
  }
}

// Analysis
console.log(`
╔══════════════════════════════════════════════════════════════╗
║   Figma vs Code Token Comparison                            ║
╚══════════════════════════════════════════════════════════════╝
`);

console.log(`📊 Summary:\n`);
console.log(`   Figma:`);
console.log(`     - Collections: ${figmaCollections.length}`);
console.log(`     - Total Tokens: ${figmaTokens.size}`);
figmaCollections.forEach(col => {
  console.log(`       • ${col.name}: ${col.variableCount} tokens`);
});

console.log(`\n   Code:`);
console.log(`     - Files: 2 (tokens.ts, semantic-tokens.ts)`);
console.log(`     - Total Tokens: ${codeTokens.size}`);

// Find missing tokens
console.log(`\n\n┌─────────────────────────────────────────────────────────────┐`);
console.log(`│ Tokens in Figma but MISSING from Code                       │`);
console.log(`└─────────────────────────────────────────────────────────────┘\n`);

const missingInCode = [];
figmaTokens.forEach((data, name) => {
  if (!codeTokens.has(name)) {
    missingInCode.push({ name, ...data });
  }
});

if (missingInCode.length === 0) {
  console.log(`   ✅ All Figma tokens are in code!`);
} else {
  console.log(`   ⚠️  ${missingInCode.length} tokens missing from code:\n`);
  
  // Group by collection
  const byCollection = {};
  missingInCode.forEach(token => {
    if (!byCollection[token.collection]) {
      byCollection[token.collection] = [];
    }
    byCollection[token.collection].push(token);
  });
  
  Object.entries(byCollection).forEach(([col, tokens]) => {
    console.log(`   ${col} (${tokens.length} missing):`);
    tokens.slice(0, 10).forEach(t => {
      console.log(`     - ${t.name}: ${t.value}`);
    });
    if (tokens.length > 10) {
      console.log(`     ... and ${tokens.length - 10} more`);
    }
    console.log(``);
  });
}

// Find extra tokens
console.log(`\n┌─────────────────────────────────────────────────────────────┐`);
console.log(`│ Tokens in Code but NOT in Figma                              │`);
console.log(`└─────────────────────────────────────────────────────────────┘\n`);

const missingInFigma = [];
codeTokens.forEach((data, name) => {
  if (!figmaTokens.has(name)) {
    missingInFigma.push({ name, ...data });
  }
});

if (missingInFigma.length === 0) {
  console.log(`   ✅ All code tokens are in Figma!`);
} else {
  console.log(`   ⚠️  ${missingInFigma.length} tokens in code not in Figma:\n`);
  missingInFigma.slice(0, 20).forEach(t => {
    console.log(`     - ${t.name} (${t.source}): ${t.value}`);
  });
  if (missingInFigma.length > 20) {
    console.log(`     ... and ${missingInFigma.length - 20} more`);
  }
}

// Find value mismatches
console.log(`\n\n┌─────────────────────────────────────────────────────────────┐`);
console.log(`│ Tokens with Different Values (Figma vs Code)                │`);
console.log(`└─────────────────────────────────────────────────────────────┘\n`);

const mismatches = [];
figmaTokens.forEach((figmaData, name) => {
  const codeData = codeTokens.get(name);
  if (codeData && codeData.value !== figmaData.value) {
    // Skip references (semantic tokens)
    if (!codeData.value.startsWith('→')) {
      mismatches.push({
        name,
        figmaValue: figmaData.value,
        codeValue: codeData.value
      });
    }
  }
});

if (mismatches.length === 0) {
  console.log(`   ✅ All matching tokens have same values!`);
} else {
  console.log(`   ⚠️  ${mismatches.length} value mismatches found:\n`);
  mismatches.slice(0, 20).forEach(m => {
    console.log(`     ${m.name}:`);
    console.log(`       Figma: ${m.figmaValue}`);
    console.log(`       Code:  ${m.codeValue}`);
    console.log(``);
  });
  if (mismatches.length > 20) {
    console.log(`     ... and ${mismatches.length - 20} more`);
  }
}

// Recommendations
console.log(`\n\n╔══════════════════════════════════════════════════════════════╗`);
console.log(`║   Recommendations                                            ║`);
console.log(`╚══════════════════════════════════════════════════════════════╝\n`);

if (missingInCode.length > 0) {
  console.log(`⚠️  ${missingInCode.length} tokens missing from code`);
  console.log(`   Action: Review each token and decide:`);
  console.log(`   • Add to code if actively used in designs`);
  console.log(`   • Keep in Figma only if experimental`);
  console.log(`   • Delete from Figma if unused\n`);
}

if (missingInFigma.length > 0) {
  console.log(`⚠️  ${missingInFigma.length} tokens in code not in Figma`);
  console.log(`   Action: These may be:`);
  console.log(`   • Legacy tokens that should be removed`);
  console.log(`   • Code-only utilities (e.g., white, black)`);
  console.log(`   • Missing from Figma export (check export method)\n`);
}

if (mismatches.length > 0) {
  console.log(`⚠️  ${mismatches.length} value mismatches`);
  console.log(`   Action: Determine source of truth:`);
  console.log(`   • Update code to match Figma (recommended)`);
  console.log(`   • Update Figma to match code (if intentional)`);
  console.log(`   • Document why values differ\n`);
}

if (missingInCode.length === 0 && missingInFigma.length === 0 && mismatches.length === 0) {
  console.log(`✅ Perfect! Figma and code are in sync!\n`);
}

console.log(`Next steps:`);
console.log(`  1. Review detailed analysis above`);
console.log(`  2. Make decisions on missing/extra tokens`);
console.log(`  3. Record findings in docs/ (see docs/archive/FIGMA_COLOR_SYSTEM_ANALYSIS.md for the prior analysis)`);
console.log(`  4. Get approval before making code changes\n`);

// Write detailed report to file
const reportPath = path.resolve(process.cwd(), 'token-comparison-report.json');
const report = {
  summary: {
    figmaTokens: figmaTokens.size,
    codeTokens: codeTokens.size,
    figmaCollections: figmaCollections.length,
    missingInCode: missingInCode.length,
    missingInFigma: missingInFigma.length,
    valueMismatches: mismatches.length
  },
  figmaCollections,
  missingInCode,
  missingInFigma,
  valueMismatches: mismatches
};

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
console.log(`📄 Detailed report saved to: token-comparison-report.json\n`);
