#!/usr/bin/env node
/**
 * Figma Variable Exporter
 * 
 * Since Desktop Bridge isn't connecting, this script provides instructions
 * for manually exporting Figma variables and then comparing with code.
 * 
 * Usage:
 *   1. Run this script: node scripts/export-figma-variables.js
 *   2. Follow the printed instructions to export from Figma
 *   3. Save the export as figma-variables.json
 *   4. Run comparison script
 */

const fs = require('fs');
const path = require('path');

console.log(`
╔══════════════════════════════════════════════════════════════╗
║   Figma Variables Export Instructions                        ║
╚══════════════════════════════════════════════════════════════╝

Since the Desktop Bridge plugin isn't connecting automatically,
please follow these steps to manually export your Figma variables:

┌─────────────────────────────────────────────────────────────┐
│ METHOD 1: Using Figma Desktop Plugin                        │
└─────────────────────────────────────────────────────────────┘

1. Open your Figma file:
   https://www.figma.com/design/NlOtqWmmgMyHdxB0T8bR7d/

2. Open the Variables panel:
   • Click the "Local variables" icon in the right sidebar
   • OR Press: Shift + Cmd + K (Mac) / Shift + Ctrl + K (Windows)

3. For EACH variable collection:
   • Right-click on the collection name
   • Select "Copy as JSON" (if available)
   • OR use "Export" option if available
   • Paste into a text file

4. Save all exports to a single JSON file:
   ${path.resolve(process.cwd(), 'figma-variables.json')}

┌─────────────────────────────────────────────────────────────┐
│ METHOD 2: Using Figma Plugin (Variables Exporter)           │
└─────────────────────────────────────────────────────────────┘

1. Install a variables export plugin:
   • Search for "Export Variables" or "Variables to JSON" in plugins
   • Recommended: "Design Tokens" or "Token Studio"

2. Run the plugin and export all collections

3. Save export to:
   ${path.resolve(process.cwd(), 'figma-variables.json')}

┌─────────────────────────────────────────────────────────────┐
│ METHOD 3: Manual Copy from Token Browser                    │
└─────────────────────────────────────────────────────────────┘

The token browser showed:
• 435 total tokens (282 colors, 130 numbers)
• 27 collections

You can manually document the key collections:

1. Take screenshots of each collection in Variables panel
2. List collection names and token counts
3. Note any dark mode values (check mode dropdown)

┌─────────────────────────────────────────────────────────────┐
│ Expected JSON Format                                         │
└─────────────────────────────────────────────────────────────┘

Your export should look something like this:

{
  "collections": [
    {
      "name": "Color/Primitives/Gold",
      "modes": ["Light", "Dark"],
      "variables": [
        {
          "name": "gold/50",
          "type": "COLOR",
          "resolvedType": "COLOR",
          "valuesByMode": {
            "Light": { "r": 1, "g": 0.99, "b": 0.97, "a": 1 },
            "Dark": { "r": 0.05, "g": 0.04, "b": 0.03, "a": 1 }
          }
        },
        ...
      ]
    },
    ...
  ]
}

┌─────────────────────────────────────────────────────────────┐
│ After Export Complete                                        │
└─────────────────────────────────────────────────────────────┘

Once you have figma-variables.json, run:

  npm run tokens:compare

Or manually:

  node scripts/compare-figma-tokens.js

This will show you:
• Tokens in Figma but missing from code (141 expected)
• Tokens in code but not in Figma (inconsistencies)
• Naming differences
• Value mismatches

╚══════════════════════════════════════════════════════════════╝
`);

// Check if export already exists
const exportPath = path.resolve(process.cwd(), 'figma-variables.json');
if (fs.existsSync(exportPath)) {
  console.log(`\n✅ Found existing export: figma-variables.json\n`);
  
  try {
    const data = JSON.parse(fs.readFileSync(exportPath, 'utf8'));
    
    // Quick analysis
    const collections = data.collections || data;
    console.log(`📊 Quick Analysis:`);
    console.log(`   Collections: ${Array.isArray(collections) ? collections.length : 'Unknown'}`);
    
    if (Array.isArray(collections)) {
      let totalVars = 0;
      collections.forEach(col => {
        const varCount = col.variables?.length || col.variableIds?.length || 0;
        totalVars += varCount;
        console.log(`   - ${col.name}: ${varCount} variables`);
      });
      console.log(`   Total Variables: ${totalVars}`);
    }
    
    console.log(`\n✅ Ready to compare! Run: npm run tokens:compare\n`);
    
  } catch (err) {
    console.log(`⚠️  File exists but couldn't parse: ${err.message}`);
    console.log(`   Please check the JSON format.\n`);
  }
} else {
  console.log(`\n⏳ Waiting for export... (save to figma-variables.json)\n`);
}

// Create placeholder file with instructions if it doesn't exist
if (!fs.existsSync(exportPath)) {
  const placeholder = {
    "_readme": "Export your Figma variables here",
    "_instructions": [
      "1. Open Figma file",
      "2. Open Variables panel (Shift+Cmd+K)",
      "3. Export each collection as JSON",
      "4. Paste all collections in this file",
      "5. Run: node scripts/compare-figma-tokens.js"
    ],
    "collections": []
  };
  
  fs.writeFileSync(exportPath, JSON.stringify(placeholder, null, 2), 'utf8');
  console.log(`📝 Created placeholder file: figma-variables.json`);
  console.log(`   Fill it with your Figma export data.\n`);
}
