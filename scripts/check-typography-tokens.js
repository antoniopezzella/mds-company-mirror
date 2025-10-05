// Script to check for usage of design system typography tokens in src/components
// Usage: node scripts/check-typography-tokens.js

const fs = require('fs');
const path = require('path');

const FONT_FAMILIES = [
  'MMC Display',
  'Noto Sans',
];
const SRC_DIR = path.join(__dirname, '../src/components');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let found = false;
  FONT_FAMILIES.forEach((font) => {
    if (content.includes(font)) {
      found = true;
    }
  });
  if (found) {
    console.log(`✅ ${filePath}: Typography tokens used.`);
  } else {
    console.log(`⚠️  ${filePath}: No design system typography tokens found.`);
  }
}

fs.readdirSync(SRC_DIR).forEach((file) => {
  if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
    checkFile(path.join(SRC_DIR, file));
  }
});
