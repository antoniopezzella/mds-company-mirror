// Script to check for usage of design system color tokens in src/components
// Usage: node scripts/check-color-tokens.js

const fs = require('fs');
const path = require('path');

const TOKENS_IMPORT = /import\s+\{\s*tokens\s*\}\s+from\s+['"]\.\.\/tokens['"]/;
const COLOR_TOKEN_USAGE = /tokens\.[a-zA-Z0-9_]+/g;
const SRC_DIR = path.join(__dirname, '../src/components');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const hasTokensImport = TOKENS_IMPORT.test(content);
  const colorUsages = content.match(COLOR_TOKEN_USAGE) || [];
  if (!hasTokensImport && colorUsages.length > 0) {
    console.log(`❌ ${filePath}: Color tokens used but tokens not imported.`);
  } else if (colorUsages.length === 0) {
    console.log(`⚠️  ${filePath}: No color tokens found.`);
  } else {
    console.log(`✅ ${filePath}: Color tokens used correctly.`);
  }
}

fs.readdirSync(SRC_DIR).forEach((file) => {
  if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
    checkFile(path.join(SRC_DIR, file));
  }
});
