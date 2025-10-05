// Script to check for usage of design system spacing tokens in src/components
// Usage: node scripts/check-spacing-tokens.js

const fs = require('fs');
const path = require('path');

const SPACING_TOKENS = [4, 8, 16, 24, 32, 40, 48, 64];
const SRC_DIR = path.join(__dirname, '../src/components');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let found = false;
  SPACING_TOKENS.forEach((spacing) => {
    if (content.includes(spacing.toString())) {
      found = true;
    }
  });
  if (found) {
    console.log(`✅ ${filePath}: Spacing tokens used.`);
  } else {
    console.log(`⚠️  ${filePath}: No design system spacing tokens found.`);
  }
}

fs.readdirSync(SRC_DIR).forEach((file) => {
  if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
    checkFile(path.join(SRC_DIR, file));
  }
});
