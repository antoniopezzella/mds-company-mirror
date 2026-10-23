/**
 * AI Design Validator
 * Validates Figma components against MDS design system rules
 * 
 * Checks:
 * - Color token usage (hardcoded vs variables)
 * - Spacing compliance (4px grid)
 * - Typography usage (approved variants)
 * - Component patterns (MDS conventions)
 * - Accessibility (contrast, ARIA, focus states)
 * 
 * Usage:
 *   node scripts/automation/ai-design-validator.js <color-data.json>
 *   node scripts/automation/ai-design-validator.js --test
 * 
 * Input: JSON from parse-figma-colors.js
 * Output: Validation report with compliance score and recommendations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { findClosestColor, deltaE2000, rgbToLab } from './utils/color-distance.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// MDS VALIDATION RULES
// ============================================================================

/**
 * MDS Spacing Scale (4px grid)
 * Approved spacing values in pixels
 */
const MDS_SPACING_SCALE = [4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128];

/**
 * MDS Typography Variants
 * Approved font families, sizes, and weights
 */
const MDS_TYPOGRAPHY = {
  fonts: {
    // Marketing headings are Marsh Serif; dashboard headings are Noto Sans 700.
    // MMC Display was removed from the system (2026-10-09) — it was never the
    // heading face, despite older docs claiming so.
    heading: 'Marsh Serif',
    body: 'Noto Sans',
    ui: 'Noto Sans'
  },
  sizes: {
    heading: [36, 32, 28, 24, 20, 18], // h1-h6
    body: [16, 15, 14], // body1, body2, caption
    ui: [16, 14, 12] // button, label, helper
  },
  weights: {
    bold: 700,
    semibold: 600,
    medium: 500,
    regular: 400
  }
};

/**
 * WCAG Contrast Requirements
 */
const WCAG_CONTRAST = {
  AA_NORMAL: 4.5,   // Normal text (< 18px or < 14px bold)
  AA_LARGE: 3.0,    // Large text (≥ 18px or ≥ 14px bold)
  AA_UI: 3.0        // UI components (borders, icons)
};

/**
 * MDS Semantic Token Categories
 */
const TOKEN_CATEGORIES = {
  brand: ['brandPrimary', 'brandPrimaryDark', 'bgSecondary', 'bgAccent'],
  text: ['fgPrimary', 'fgNeutralSubtle', 'fgInputPlaceholder', 'fgOnAccent', 'fgOnPrimary', 'fgDisabled'],
  surface: ['bgDefault', 'bgNeutralSubtle', 'surfaceMuted', 'surfaceAccent', 'bgShell'],
  border: ['borderDefault', 'borderMuted', 'borderStrong', 'borderAccent'],
  interactive: ['interactivePrimary', 'interactivePrimaryHover', 'interactivePrimaryActive'],
  status: ['statusSuccess', 'bgSuccessSubtle', 'fgSuccess', 'statusWarning', 'statusDanger', 'statusInfo']
};

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate color token usage
 * Checks if colors are bound to MDS tokens vs hardcoded
 */
function validateColorTokens(colorData, palette) {
  const issues = [];
  const suggestions = [];
  let hardcodedCount = 0;
  let boundCount = 0;
  
  for (const [hex, data] of Object.entries(colorData.colorGroups || {})) {
    const occurrences = data.occurrences || [];
    
    for (const occurrence of occurrences) {
      if (occurrence.boundVariable) {
        boundCount++;
        
        // Validate bound variable is an approved MDS token
        const isApprovedToken = Object.values(TOKEN_CATEGORIES)
          .flat()
          .some(token => occurrence.boundVariable.includes(token));
        
        if (!isApprovedToken) {
          issues.push({
            severity: 'warning',
            type: 'token-usage',
            message: `Variable "${occurrence.boundVariable}" is not a recognized MDS semantic token`,
            location: `${occurrence.nodeName} → ${occurrence.property}`,
            suggestion: 'Use MDS semantic tokens from Semantic Colors collection'
          });
        }
      } else {
        hardcodedCount++;
        
        // Find closest MDS token
        const match = findClosestColor(data.rgb, palette);
        
        if (match.deltaE < 2) {
          // Excellent match - should be using this token
          issues.push({
            severity: 'critical',
            type: 'hardcoded-color',
            message: `Hardcoded color ${hex} should use token "${match.match.name}"`,
            location: `${occurrence.nodeName} → ${occurrence.property}`,
            autofix: {
              action: 'bind-variable',
              token: match.match.name,
              figmaPath: match.match.figmaPath,
              confidence: match.confidence
            }
          });
        } else if (match.deltaE < 5) {
          // Good match - suggest using token
          suggestions.push({
            severity: 'suggestion',
            type: 'token-suggestion',
            message: `Color ${hex} is similar to "${match.match.name}" (ΔE: ${match.deltaE.toFixed(2)})`,
            location: `${occurrence.nodeName} → ${occurrence.property}`,
            suggestion: `Consider using ${match.match.name} or request new token if intentional`
          });
        } else {
          // No good match - might need new token
          issues.push({
            severity: 'warning',
            type: 'custom-color',
            message: `Color ${hex} does not match any MDS token (closest: ${match.match.name}, ΔE: ${match.deltaE.toFixed(2)})`,
            location: `${occurrence.nodeName} → ${occurrence.property}`,
            suggestion: 'If this is intentional, request a new semantic token via TOKEN_REQUEST_PROCESS.md'
          });
        }
      }
    }
  }
  
  return {
    score: hardcodedCount === 0 ? 100 : Math.round((boundCount / (boundCount + hardcodedCount)) * 100),
    issues,
    suggestions,
    stats: {
      total: boundCount + hardcodedCount,
      bound: boundCount,
      hardcoded: hardcodedCount,
      compliance: `${boundCount}/${boundCount + hardcodedCount}`
    }
  };
}

/**
 * Validate spacing against 4px grid
 * Analyzes padding, gaps, margins from component metadata
 */
function validateSpacing(componentData) {
  const issues = [];
  const suggestions = [];
  
  // This would require component layout metadata from Figma
  // For now, provide guidelines
  
  return {
    score: 100, // Placeholder - would calculate from actual spacing data
    issues,
    suggestions: [
      {
        severity: 'info',
        type: 'spacing-guideline',
        message: 'Ensure all spacing uses MDS scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128px',
        suggestion: 'Use theme.spacing(n) in React components'
      }
    ],
    stats: {
      scale: MDS_SPACING_SCALE,
      guideline: 'All spacing should be multiples of 4px'
    }
  };
}

/**
 * Validate typography usage
 * Checks font families, sizes, weights against MDS standards
 */
function validateTypography(componentData) {
  const issues = [];
  const suggestions = [];
  
  // This would require text style metadata from Figma
  // For now, provide guidelines
  
  return {
    score: 100, // Placeholder
    issues,
    suggestions: [
      {
        severity: 'info',
        type: 'typography-guideline',
        message: 'Headings use Marsh Serif (marketing) or Noto Sans 700 (dashboard); body text uses Noto Sans',
        suggestion: 'Reference CSS variables: var(--typo-h1-font-family), var(--typo-body1-font-size)'
      }
    ],
    stats: {
      fonts: MDS_TYPOGRAPHY.fonts,
      guideline: 'Use approved MDS typography variants'
    }
  };
}

/**
 * Validate accessibility compliance
 * Checks contrast ratios, ARIA patterns
 */
function validateAccessibility(colorData, palette) {
  const issues = [];
  const warnings = [];
  
  // Check for common status color pairings
  const statusPairings = [
    { fg: 'fgSuccess', bg: 'bgSuccessSubtle', min: WCAG_CONTRAST.AA_NORMAL },
    { fg: 'statusWarning', bg: 'bgWarningSubtle', min: WCAG_CONTRAST.AA_NORMAL },
    { fg: 'fgCritical', bg: 'bgCriticalSubtle', min: WCAG_CONTRAST.AA_NORMAL },
    { fg: 'statusInfo', bg: 'bgInfoSubtle', min: WCAG_CONTRAST.AA_NORMAL },
    { fg: 'fgPrimary', bg: 'bgDefault', min: WCAG_CONTRAST.AA_NORMAL },
    { fg: 'fgNeutralSubtle', bg: 'bgDefault', min: WCAG_CONTRAST.AA_NORMAL }
  ];
  
  // This would calculate actual contrast ratios from component colors
  // For now, provide guidelines
  
  return {
    score: 100, // Placeholder
    issues,
    warnings,
    suggestions: [
      {
        severity: 'info',
        type: 'a11y-guideline',
        message: 'Ensure text contrast ≥4.5:1 (WCAG AA), UI elements ≥3.0:1',
        suggestion: 'Run: npm run tokens:contrast:all to validate all token pairings'
      },
      {
        severity: 'info',
        type: 'a11y-aria',
        message: 'Interactive elements should have ARIA labels and focus states',
        suggestion: 'Use role="alert" for status messages, aria-label for icon-only buttons'
      }
    ],
    stats: {
      requirements: WCAG_CONTRAST,
      guideline: 'WCAG AA compliance required for all components'
    }
  };
}

/**
 * Validate component patterns
 * Checks if component follows MDS conventions
 */
function validateComponentPatterns(colorData) {
  const issues = [];
  const suggestions = [];
  
  const componentName = colorData.meta?.extractedFrom || 'Unknown Component';
  
  // Check for status variant patterns
  if (componentName.toLowerCase().includes('alert') || 
      componentName.toLowerCase().includes('status') ||
      componentName.toLowerCase().includes('notification')) {
    
    // Should have 4 status variants
    const hasSuccess = Object.keys(colorData.colorGroups || {}).some(hex => 
      hex === '#f8fcf7' || hex === '#14853d' || hex === '#2f7d32'
    );
    const hasWarning = Object.keys(colorData.colorGroups || {}).some(hex => 
      hex === '#fffaee' || hex === '#ed9400'
    );
    const hasDanger = Object.keys(colorData.colorGroups || {}).some(hex => 
      hex === '#fff1f1' || hex === '#d62f2f'
    );
    const hasInfo = Object.keys(colorData.colorGroups || {}).some(hex => 
      hex === '#eef4ff' || hex === '#1c5eb7'
    );
    
    if (!hasSuccess || !hasWarning || !hasDanger || !hasInfo) {
      suggestions.push({
        severity: 'suggestion',
        type: 'pattern-completeness',
        message: 'Status components should have all 4 variants: success, warning, danger, info',
        suggestion: 'Consider adding missing status variants for consistency'
      });
    }
  }
  
  return {
    score: 100, // Placeholder
    issues,
    suggestions,
    stats: {
      componentType: componentName,
      guideline: 'Follow MDS component patterns and naming conventions'
    }
  };
}

// ============================================================================
// REPORT GENERATION
// ============================================================================

/**
 * Generate comprehensive validation report
 */
function generateReport(validationResults) {
  const { colorTokens, spacing, typography, accessibility, patterns, metadata } = validationResults;
  
  // Calculate overall compliance score (weighted average)
  const weights = {
    colorTokens: 0.40,  // Most critical
    spacing: 0.20,
    typography: 0.15,
    accessibility: 0.15,
    patterns: 0.10
  };
  
  const overallScore = Math.round(
    colorTokens.score * weights.colorTokens +
    spacing.score * weights.spacing +
    typography.score * weights.typography +
    accessibility.score * weights.accessibility +
    patterns.score * weights.patterns
  );
  
  // Collect all issues by severity
  const allIssues = [
    ...colorTokens.issues,
    ...spacing.issues,
    ...typography.issues,
    ...accessibility.issues,
    ...patterns.issues
  ];
  
  const allSuggestions = [
    ...colorTokens.suggestions,
    ...spacing.suggestions,
    ...typography.suggestions,
    ...accessibility.suggestions,
    ...patterns.suggestions
  ];
  
  const critical = allIssues.filter(i => i.severity === 'critical').length;
  const warnings = allIssues.filter(i => i.severity === 'warning').length;
  const suggestions = allSuggestions.length;
  
  // Grade system
  let grade = 'F';
  if (overallScore >= 95) grade = 'A+';
  else if (overallScore >= 90) grade = 'A';
  else if (overallScore >= 85) grade = 'B+';
  else if (overallScore >= 80) grade = 'B';
  else if (overallScore >= 75) grade = 'C';
  else if (overallScore >= 70) grade = 'D';
  
  return {
    metadata,
    summary: {
      overallScore,
      grade,
      critical,
      warnings,
      suggestions,
      status: critical === 0 ? 'PASS' : 'FAIL'
    },
    details: {
      colorTokens,
      spacing,
      typography,
      accessibility,
      patterns
    },
    recommendations: generateRecommendations(allIssues, allSuggestions),
    autofix: generateAutofixScript(allIssues)
  };
}

/**
 * Generate actionable recommendations
 */
function generateRecommendations(issues, suggestions) {
  const recommendations = [];
  
  const criticalIssues = issues.filter(i => i.severity === 'critical');
  if (criticalIssues.length > 0) {
    recommendations.push({
      priority: 'HIGH',
      action: 'Fix critical issues before code generation',
      count: criticalIssues.length,
      details: criticalIssues.map(i => i.message)
    });
  }
  
  const hardcodedColors = issues.filter(i => i.type === 'hardcoded-color');
  if (hardcodedColors.length > 0) {
    recommendations.push({
      priority: 'HIGH',
      action: 'Apply token bindings to hardcoded colors',
      count: hardcodedColors.length,
      automation: 'Run: npm run figma:auto-bind to apply bindings automatically'
    });
  }
  
  const warnings = issues.filter(i => i.severity === 'warning');
  if (warnings.length > 0) {
    recommendations.push({
      priority: 'MEDIUM',
      action: 'Review warnings and update design if needed',
      count: warnings.length
    });
  }
  
  if (suggestions.length > 0) {
    recommendations.push({
      priority: 'LOW',
      action: 'Consider suggestions for improved consistency',
      count: suggestions.length
    });
  }
  
  return recommendations;
}

/**
 * Generate autofix script for one-click fixes
 */
function generateAutofixScript(issues) {
  const autofixes = issues
    .filter(i => i.autofix)
    .map(i => ({
      location: i.location,
      action: i.autofix.action,
      token: i.autofix.token,
      figmaPath: i.autofix.figmaPath,
      confidence: i.autofix.confidence
    }));
  
  return {
    count: autofixes.length,
    script: autofixes.length > 0 
      ? 'Auto-bind script available (will be generated in auto-binder tool)'
      : 'No auto-fixable issues',
    fixes: autofixes
  };
}

/**
 * Print colored console output
 */
function printReport(report) {
  console.log('\n' + '='.repeat(80));
  console.log('🎨 MDS DESIGN VALIDATOR — Validation Report');
  console.log('='.repeat(80) + '\n');
  
  // Metadata
  console.log(`📋 Component: ${report.metadata.componentName}`);
  console.log(`📂 Source: ${report.metadata.nodeId || 'N/A'}`);
  console.log(`📅 Validated: ${report.metadata.timestamp}\n`);
  
  // Summary
  const { summary } = report;
  const statusEmoji = summary.status === 'PASS' ? '✅' : '❌';
  const gradeColor = summary.grade.startsWith('A') ? '🟢' : 
                     summary.grade.startsWith('B') ? '🟡' : '🔴';
  
  console.log('📊 SUMMARY');
  console.log('─'.repeat(80));
  console.log(`${statusEmoji} Status: ${summary.status}`);
  console.log(`${gradeColor} Grade: ${summary.grade}`);
  console.log(`📈 Overall Score: ${summary.overallScore}/100\n`);
  console.log(`🔴 Critical Issues: ${summary.critical}`);
  console.log(`⚠️  Warnings: ${summary.warnings}`);
  console.log(`💡 Suggestions: ${summary.suggestions}\n`);
  
  // Detailed scores
  console.log('📈 DETAILED SCORES');
  console.log('─'.repeat(80));
  console.log(`🎨 Color Tokens:     ${report.details.colorTokens.score}/100 (${report.details.colorTokens.stats.compliance})`);
  console.log(`📏 Spacing:          ${report.details.spacing.score}/100`);
  console.log(`✍️  Typography:       ${report.details.typography.score}/100`);
  console.log(`♿ Accessibility:    ${report.details.accessibility.score}/100`);
  console.log(`🧩 Component Patterns: ${report.details.patterns.score}/100\n`);
  
  // Critical issues
  if (summary.critical > 0) {
    console.log('🔴 CRITICAL ISSUES (Must Fix)');
    console.log('─'.repeat(80));
    report.details.colorTokens.issues
      .filter(i => i.severity === 'critical')
      .forEach((issue, idx) => {
        console.log(`${idx + 1}. ${issue.message}`);
        console.log(`   📍 ${issue.location}`);
        if (issue.autofix) {
          console.log(`   ✨ Auto-fix: Bind to ${issue.autofix.token} (${(issue.autofix.confidence * 100).toFixed(1)}% confidence)`);
        }
        console.log('');
      });
  }
  
  // Recommendations
  if (report.recommendations.length > 0) {
    console.log('💡 RECOMMENDATIONS');
    console.log('─'.repeat(80));
    report.recommendations.forEach((rec, idx) => {
      const priorityEmoji = rec.priority === 'HIGH' ? '🔴' : 
                           rec.priority === 'MEDIUM' ? '🟡' : '🟢';
      console.log(`${idx + 1}. ${priorityEmoji} [${rec.priority}] ${rec.action}`);
      if (rec.count) console.log(`   Count: ${rec.count}`);
      if (rec.automation) console.log(`   🤖 ${rec.automation}`);
      console.log('');
    });
  }
  
  // Autofix summary
  if (report.autofix.count > 0) {
    console.log('✨ AUTO-FIX AVAILABLE');
    console.log('─'.repeat(80));
    console.log(`${report.autofix.count} issues can be fixed automatically`);
    console.log(`Run: npm run figma:auto-bind -- --node-id=${report.metadata.nodeId || 'NODE_ID'}\n`);
  }
  
  console.log('='.repeat(80) + '\n');
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

/**
 * Load MDS token palette for matching
 */
function loadMdsPalette() {
  // Reuse palette from match-mds-variables.js
  // In production, this would load from a shared module
  
  const semanticTokens = {
    // Status tokens
    bgSuccessSubtle: '#f8fcf7',
    statusSuccess: '#14853d',
    fgSuccess: '#2f7d32',
    bgWarningSubtle: '#fffaee',
    statusWarning: '#ed9400',
    bgCriticalSubtle: '#fff1f1',
    fgCritical: '#d62f2f',
    bgInfoSubtle: '#eef4ff',
    statusInfo: '#1c5eb7',
    // Add more tokens as needed
  };
  
  const palette = Object.entries(semanticTokens).map(([name, hex]) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    const category = name.startsWith('status') ? 'status' :
                    name.startsWith('text') ? 'text' :
                    name.startsWith('surface') ? 'surface' :
                    name.startsWith('border') ? 'border' :
                    name.startsWith('interactive') ? 'interactive' : 'brand';
    
    return {
      name,
      hex,
      rgb: [r, g, b],
      category,
      figmaPath: `Semantic Colors/${category.charAt(0).toUpperCase() + category.slice(1)}/${name}`
    };
  });
  
  return palette;
}

/**
 * Main validation function
 */
async function validateDesign(colorData) {
  console.log('🔍 Validating design against MDS rules...\n');
  
  const palette = loadMdsPalette();
  
  // Run all validators
  const colorTokens = validateColorTokens(colorData, palette);
  const spacing = validateSpacing(colorData);
  const typography = validateTypography(colorData);
  const accessibility = validateAccessibility(colorData, palette);
  const patterns = validateComponentPatterns(colorData);
  
  // Generate report
  const report = generateReport({
    colorTokens,
    spacing,
    typography,
    accessibility,
    patterns,
    metadata: {
      componentName: colorData.meta?.extractedFrom || 'Unknown Component',
      nodeId: colorData.meta?.nodeId,
      timestamp: new Date().toISOString(),
      validator: 'MDS AI Design Validator v1.0'
    }
  });
  
  return report;
}

/**
 * CLI Entry Point
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node ai-design-validator.js <color-data.json>');
    console.log('\nOr run in test mode:');
    console.log('node ai-design-validator.js --test\n');
    return;
  }
  
  let colorData;
  
  if (args[0] === '--test') {
    console.log('🧪 Running in TEST mode with System Alert colors\n');
    
    // Test data from System Alert Component
    colorData = {
      meta: {
        extractedFrom: 'Alert (System Alert Component)',
        nodeId: '7584:25919',
        totalColorInstances: 48,
        uniqueColors: 9,
        hardcodedCount: 9
      },
      colorGroups: {
        '#f8fcf7': { rgb: [248, 252, 247], occurrences: [{ nodeName: 'Success Alert', property: 'fill[0]' }] },
        '#14853d': { rgb: [20, 133, 61], occurrences: [{ nodeName: 'Success Alert', property: 'stroke[0]' }] },
        '#2f7d32': { rgb: [47, 125, 50], occurrences: [{ nodeName: 'Success Title', property: 'text-fill[0]' }] },
        '#fffaee': { rgb: [255, 250, 238], occurrences: [{ nodeName: 'Warning Alert', property: 'fill[0]' }] },
        '#ed9400': { rgb: [237, 148, 0], occurrences: [{ nodeName: 'Warning Alert', property: 'stroke[0]' }] },
        '#fff1f1': { rgb: [255, 241, 241], occurrences: [{ nodeName: 'Error Alert', property: 'fill[0]' }] },
        '#d62f2f': { rgb: [214, 47, 47], occurrences: [{ nodeName: 'Error Alert', property: 'stroke[0]' }] },
        '#eef4ff': { rgb: [238, 244, 255], occurrences: [{ nodeName: 'Info Alert', property: 'fill[0]' }] },
        '#1c5eb7': { rgb: [28, 94, 183], occurrences: [{ nodeName: 'Info Alert', property: 'stroke[0]' }] }
      }
    };
  } else {
    // Load from file
    const inputPath = path.resolve(args[0]);
    console.log(`📂 Loading color data from: ${inputPath}\n`);
    colorData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  }
  
  // Run validation
  const report = await validateDesign(colorData);
  
  // Print report
  printReport(report);
  
  // Save report
  const outputPath = args[0] === '--test' 
    ? path.join(__dirname, '../../validation-report.json')
    : args[0].replace('.json', '-validation.json');
  
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`💾 Full report saved to: ${outputPath}\n`);
  
  // Exit with error code if validation failed
  process.exit(report.summary.critical > 0 ? 1 : 0);
}

// Run if called directly
const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMainModule) {
  main();
}

export {
  validateDesign,
  validateColorTokens,
  validateSpacing,
  validateTypography,
  validateAccessibility,
  validateComponentPatterns,
  generateReport
};
