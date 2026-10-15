/**
 * MDS Variable Matcher
 * Maps captured RGB colors to closest MDS semantic tokens
 * 
 * Usage:
 * 1. Run parse-figma-colors.js to extract colors
 * 2. Copy JSON output
 * 3. Run: node scripts/automation/match-mds-variables.js <colors.json>
 * 4. Review matches and confidence scores
 * 
 * Requirements:
 * - Node.js 22+
 * - MDS tokens loaded from src/semantic-tokens.ts
 * - Color distance utilities
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { findClosestColor, batchFindClosest } from './utils/color-distance.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Convert hex color to RGB array
 * @param {string} hex - Hex color (e.g., '#f8fcf7')
 * @returns {number[]} [r, g, b]
 */
function hexToRgb(hex) {
  const cleaned = hex.replace('#', '');
  return [
    parseInt(cleaned.substring(0, 2), 16),
    parseInt(cleaned.substring(2, 4), 16),
    parseInt(cleaned.substring(4, 6), 16)
  ];
}

/**
 * Load MDS semantic token palette
 * Parses tokens.ts and semantic-tokens.ts to build searchable RGB palette
 * 
 * @returns {Object[]} Array of { name, rgb, hex, category, ... }
 */
function loadMdsPalette() {
  console.log('📚 Loading MDS token palette...\n');

  // MDS Semantic Colors (from src/semantic-tokens.ts)
  // These are the values that should be bound in Figma
  const semanticTokens = {
    // Brand Identity
    brandPrimary: '#000f47',
    brandPrimaryDark: '#002c77',
    brandSecondary: '#ceecff',
    brandAccent: '#ffb700',

    // Typography
    textPrimary: '#000f47',
    textPrimaryMode: '#002c77',
    textSecondary: '#595959',
    textTertiary: '#767676',
    textOnAccent: '#ffffff',
    textOnHero: '#ffffff',
    textDisabled: '#767676',
    textOnLight: '#000f47',
    textOnDark: '#ffffff',

    // Surfaces
    surfaceDefault: '#ffffff',
    surfaceSubtle: '#f8f8f8',
    surfaceMuted: '#e3e3e3',
    surfaceAccent: '#f7f8f8',
    surfaceNavigation: '#000f47',
    surfaceNavigationMode: '#002c77',
    surfaceNavigationHover: '#1a2759',
    surfaceNavigationActive: '#333f6b',
    surfaceAccentStrong: '#cfd0cd',
    surfaceHero: '#303c37',
    surfaceDisabled: '#e3e3e3',

    // Borders
    borderSubtle: '#dadada',
    borderDefault: '#878787',
    borderStrong: '#595959',
    borderFocus: '#0b4bff',
    borderFocusMode: '#009de0',
    focusRing: '#0b4bff',

    // Interactive - Primary
    interactivePrimary: '#000f47',
    interactivePrimaryHover: '#021b6c',
    interactivePrimaryActive: '#042791',
    interactivePrimaryDisabled: '#dadada',

    // Interactive - Secondary
    interactiveSecondary: '#0b4bff',
    interactiveSecondaryHover: '#042791',
    interactiveSecondaryActive: '#021b6c',
    interactiveSecondaryVisited: '#8f37c6',

    // Interactive - Tertiary
    interactiveTertiary: '#878787',
    interactiveTertiaryHover: '#767676',
    interactiveTertiaryActive: '#595959',

    // Status - Success
    statusSuccess: '#14853d',
    statusSuccessBg: '#f8fcf7',
    statusSuccessBorder: '#14853d',
    statusSuccessText: '#2f7d32',
    statusSuccessFg: '#2f7d32', // Alias for text

    // Status - Warning
    statusWarning: '#ed9400',
    statusWarningBg: '#fffaee',
    statusWarningBorder: '#ed9400',
    statusWarningText: '#ed9400',
    statusWarningFg: '#ed9400',

    // Status - Danger/Error
    statusDanger: '#c53532',
    statusDangerBg: '#fff1f1',
    statusDangerBorder: '#c53532',
    statusDangerText: '#d62f2f',
    statusDangerFg: '#d62f2f',

    // Status - Info
    statusInfo: '#1c5eb7',
    statusInfoBg: '#eef4ff',
    statusInfoBorder: '#1c5eb7',
    statusInfoText: '#1c5eb7',
    statusInfoFg: '#1c5eb7',

    // Interactive - Danger
    interactiveDanger: '#e53935',
    interactiveDangerHover: '#af2625',
    interactiveDangerActive: '#8b1a1a',
  };

  // Convert to palette format with metadata
  const palette = Object.entries(semanticTokens).map(([name, hex]) => {
    const rgb = hexToRgb(hex);
    
    // Categorize tokens for better matching logic
    let category = 'other';
    let figmaPath = `Semantic Colors/${name}`;
    
    if (name.startsWith('brand')) {
      category = 'brand';
      figmaPath = `Semantic Colors/Brand/${name.replace('brand', '')}`;
    } else if (name.startsWith('text')) {
      category = 'text';
      figmaPath = `Semantic Colors/Text/${name.replace('text', '')}`;
    } else if (name.startsWith('surface')) {
      category = 'surface';
      figmaPath = `Semantic Colors/Surface/${name.replace('surface', '')}`;
    } else if (name.startsWith('border') || name === 'focusRing') {
      category = 'border';
      figmaPath = `Semantic Colors/Border/${name.replace('border', '')}`;
    } else if (name.startsWith('interactive')) {
      category = 'interactive';
      const variant = name.replace('interactive', '');
      figmaPath = `Semantic Colors/Interactive/${variant}`;
    } else if (name.startsWith('status')) {
      category = 'status';
      // Extract status type (Success, Warning, Danger, Info)
      const parts = name.replace('status', '').match(/^(Success|Warning|Danger|Info)(.*)$/);
      if (parts) {
        const [, type, suffix] = parts;
        figmaPath = `Semantic Colors/Status/${type}/${suffix || 'Default'}`;
      }
    }

    return {
      name,
      hex,
      rgb,
      category,
      figmaPath,
      description: getTokenDescription(name)
    };
  });

  console.log(`✅ Loaded ${palette.length} MDS semantic tokens\n`);
  
  // Show breakdown by category
  const categories = {};
  palette.forEach(token => {
    categories[token.category] = (categories[token.category] || 0) + 1;
  });
  
  console.log('📊 Token breakdown:');
  Object.entries(categories).forEach(([cat, count]) => {
    console.log(`   - ${cat}: ${count} tokens`);
  });
  console.log('\n');

  return palette;
}

/**
 * Get human-readable description for token
 */
function getTokenDescription(name) {
  const descriptions = {
    brandPrimary: 'Midnight Blue — Primary brand color',
    brandSecondary: 'Sky Blue — Secondary brand color',
    statusSuccessBg: 'Success background (light green)',
    statusSuccessBorder: 'Success border (medium green)',
    statusSuccessFg: 'Success text/icon (dark green)',
    statusWarningBg: 'Warning background (light orange)',
    statusWarningBorder: 'Warning border (medium orange)',
    statusWarningFg: 'Warning text/icon (dark orange)',
    statusDangerBg: 'Error background (light red)',
    statusDangerBorder: 'Error border (medium red)',
    statusDangerFg: 'Error text/icon (dark red)',
    statusInfoBg: 'Info background (light blue)',
    statusInfoBorder: 'Info border (medium blue)',
    statusInfoFg: 'Info text/icon (dark blue)',
  };
  return descriptions[name] || '';
}

/**
 * Match captured colors to MDS palette
 * @param {Object} colorData - Output from parse-figma-colors.js
 * @param {Object[]} palette - MDS token palette
 * @returns {Object} Match results with confidence scores
 */
function matchColors(colorData, palette) {
  console.log('🎨 Matching captured colors to MDS tokens...\n');

  const results = {
    meta: {
      sourceNode: colorData.meta.extractedFrom,
      timestamp: new Date().toISOString(),
      totalColors: colorData.meta.totalColorInstances,
      uniqueColors: colorData.meta.uniqueColors,
      hardcodedColors: colorData.meta.hardcodedCount,
    },
    matches: [],
    summary: {
      excellent: 0,  // Delta E < 2
      good: 0,       // Delta E < 5
      fair: 0,       // Delta E < 10
      poor: 0,       // Delta E >= 10
    }
  };

  // Match each unique color group
  Object.entries(colorData.colorGroups).forEach(([hex, colorGroup]) => {
    // Skip if already bound to a variable
    if (colorGroup.boundVariable) {
      console.log(`⏭️  Skipping ${hex} (already bound to ${colorGroup.boundVariable.name})`);
      results.matches.push({
        capturedHex: hex,
        capturedRgb: colorGroup.rgb,
        occurrences: colorGroup.occurrences,
        alreadyBound: true,
        boundVariable: colorGroup.boundVariable,
        recommendation: 'No action needed (already variable-bound)'
      });
      return;
    }

    // Find closest match
    const matchResult = findClosestColor(colorGroup.rgb, palette);
    
    // Track quality distribution
    results.summary[matchResult.quality]++;

    results.matches.push({
      capturedHex: hex,
      capturedRgb: colorGroup.rgb,
      occurrences: colorGroup.occurrences,
      matchedToken: matchResult.match,
      deltaE: matchResult.deltaE,
      confidence: matchResult.confidence,
      quality: matchResult.quality,
      recommendation: getRecommendation(matchResult)
    });

    // Log result
    const emoji = matchResult.quality === 'excellent' ? '✅' :
                  matchResult.quality === 'good' ? '✔️' :
                  matchResult.quality === 'fair' ? '⚠️' : '❌';
    
    console.log(`${emoji} ${hex} → ${matchResult.match.name} (${matchResult.match.hex})`);
    console.log(`   ΔE: ${matchResult.deltaE.toFixed(2)}, Confidence: ${(matchResult.confidence * 100).toFixed(1)}%`);
    console.log(`   Figma path: ${matchResult.match.figmaPath}`);
    console.log(`   Occurrences: ${colorGroup.occurrences.length}x\n`);
  });

  return results;
}

/**
 * Get binding recommendation based on match quality
 */
function getRecommendation(matchResult) {
  if (matchResult.quality === 'excellent') {
    return `Auto-bind to ${matchResult.match.name}`;
  } else if (matchResult.quality === 'good') {
    return `Auto-bind to ${matchResult.match.name} (review recommended)`;
  } else if (matchResult.quality === 'fair') {
    return `Manual review required — closest match is ${matchResult.match.name}`;
  } else {
    return `Poor match — manual token selection required`;
  }
}

/**
 * Generate binding instructions for Figma Plugin Console
 * @param {Object} matchResults - Output from matchColors
 * @returns {string} JavaScript code for auto-binding
 */
function generateBindingScript(matchResults) {
  const bindings = matchResults.matches
    .filter(m => !m.alreadyBound && m.quality !== 'poor')
    .map(m => ({
      hex: m.capturedHex,
      tokenName: m.matchedToken.name,
      figmaPath: m.matchedToken.figmaPath,
      occurrences: m.occurrences
    }));

  // TODO: Generate actual Figma plugin script
  return `
// Auto-generated token binding script
// Total bindings: ${bindings.length}
// Generated: ${new Date().toISOString()}

const bindings = ${JSON.stringify(bindings, null, 2)};

// Implementation will be added in auto-bind-tokens.js
  `.trim();
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node match-mds-variables.js <color-data.json>');
    console.log('\nOr run in test mode:');
    console.log('node match-mds-variables.js --test\n');
    return;
  }

  // Test mode with hardcoded System Alert colors
  if (args[0] === '--test') {
    console.log('🧪 Running in TEST mode with System Alert colors\n');
    
    const testColorData = {
      meta: {
        extractedFrom: 'Alert (System Alert Component)',
        nodeId: '7584:25919',
        totalColorInstances: 48,
        uniqueColors: 16,
        hardcodedCount: 48
      },
      colorGroups: {
        '#f8fcf7': { rgb: [248, 252, 247], occurrences: [{ nodeName: 'Success Card', property: 'fill[0]' }] },
        '#14853d': { rgb: [20, 133, 61], occurrences: [{ nodeName: 'Success Card', property: 'stroke[0]' }] },
        '#2f7d32': { rgb: [47, 125, 50], occurrences: [{ nodeName: 'Title', property: 'text-fill[0]' }] },
        '#fffaee': { rgb: [255, 250, 238], occurrences: [{ nodeName: 'Warning Card', property: 'fill[0]' }] },
        '#ed9400': { rgb: [237, 148, 0], occurrences: [{ nodeName: 'Warning Card', property: 'stroke[0]' }] },
        '#fff1f1': { rgb: [255, 241, 241], occurrences: [{ nodeName: 'Error Card', property: 'fill[0]' }] },
        '#d62f2f': { rgb: [214, 47, 47], occurrences: [{ nodeName: 'Error Card', property: 'stroke[0]' }] },
        '#eef4ff': { rgb: [238, 244, 255], occurrences: [{ nodeName: 'Info Card', property: 'fill[0]' }] },
        '#1c5eb7': { rgb: [28, 94, 183], occurrences: [{ nodeName: 'Info Card', property: 'stroke[0]' }] },
      }
    };

    const palette = loadMdsPalette();
    const results = matchColors(testColorData, palette);
    
    console.log('\n📊 Match Summary:');
    console.log(`   ✅ Excellent matches: ${results.summary.excellent}`);
    console.log(`   ✔️  Good matches: ${results.summary.good}`);
    console.log(`   ⚠️  Fair matches: ${results.summary.fair}`);
    console.log(`   ❌ Poor matches: ${results.summary.poor}\n`);

    // Save results
    const outputPath = path.join(__dirname, '../../test-match-results.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`💾 Results saved to: ${outputPath}\n`);

    return;
  }

  // Production mode: load from file
  const inputPath = path.resolve(args[0]);
  console.log(`📂 Loading color data from: ${inputPath}\n`);

  const colorData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const palette = loadMdsPalette();
  const results = matchColors(colorData, palette);

  console.log('\n📊 Match Summary:');
  console.log(`   ✅ Excellent matches: ${results.summary.excellent}`);
  console.log(`   ✔️  Good matches: ${results.summary.good}`);
  console.log(`   ⚠️  Fair matches: ${results.summary.fair}`);
  console.log(`   ❌ Poor matches: ${results.summary.poor}\n`);

  // Save results
  const outputPath = inputPath.replace('.json', '-matches.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`💾 Results saved to: ${outputPath}\n`);
}

// Run if called directly (ES module check)
// Check if this file is the main module being executed
const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMainModule) {
  main();
}

export {
  loadMdsPalette,
  matchColors,
  generateBindingScript
};
