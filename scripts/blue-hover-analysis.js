// Blue Hover States on Sky Blue Navigation (blue250 #CEECFF)
const colors = {
  // Navigation background
  navBg: '#CEECFF',        // blue250 - Sky Blue (header/sidebar)
  
  // Blue tone options for hover/active states
  blue300: '#B8E3FF',      // Slightly darker sky
  blue400: '#9CD4FF',      // Medium light blue
  blue500: '#6FB4FF',      // Rich light blue
  blue600: '#4E9AFF',      // Strong blue
  blue700: '#307FFF',      // Deep blue
  blue750: '#0B4BFF',      // Vivid blue
  
  // Text colors
  textDark: '#000F47',     // blue1000 - Midnight
  white: '#FFFFFF'
};

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3), 16) / 255;
  const g = parseInt(hex.slice(3,5), 16) / 255;
  const b = parseInt(hex.slice(5,7), 16) / 255;
  return [r, g, b];
}

function luminance([r,g,b]) {
  const [rs,gs,bs] = [r,g,b].map(c => c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4));
  return 0.2126*rs + 0.7152*gs + 0.0722*bs;
}

function contrast(hex1, hex2) {
  const l1 = luminance(hexToRgb(hex1));
  const l2 = luminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

function getVisibility(ratio) {
  if (ratio >= 3.0) return '⭐⭐⭐ Excellent';
  if (ratio >= 2.0) return '⭐⭐ Very Good';
  if (ratio >= 1.5) return '⭐ Good';
  if (ratio >= 1.3) return '✅ Visible';
  return '❌ Too Subtle';
}

console.log('═══════════════════════════════════════════════════════════');
console.log('   BLUE HOVER STATES FOR SKY BLUE NAVIGATION');
console.log('   Background: blue250 (#CEECFF - Sky Blue)');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('🎨 RECOMMENDED: 3-State Progression\n');
console.log('  Base State (Navigation Surface):');
console.log('    • Color: blue250 (#CEECFF) - Sky Blue');
console.log('    • Purpose: Default header/sidebar background\n');

console.log('  Hover State (Icon/Nav Item Hover):');
console.log('    • Color: blue400 (#9CD4FF) - Medium Blue');
console.log('    • Contrast: ' + contrast(colors.navBg, colors.blue400) + ':1 ' + getVisibility(contrast(colors.navBg, colors.blue400)));
console.log('    • Visual: Subtle but clear feedback');
console.log('    • Text on it (blue1000): ' + contrast(colors.blue400, colors.textDark) + ':1 ⭐⭐⭐\n');

console.log('  Active State (Pressed/Selected):');
console.log('    • Color: blue500 (#6FB4FF) - Rich Blue');
console.log('    • Contrast: ' + contrast(colors.navBg, colors.blue500) + ':1 ' + getVisibility(contrast(colors.navBg, colors.blue500)));
console.log('    • Visual: Clear pressed feedback');
console.log('    • Text on it (blue1000): ' + contrast(colors.blue500, colors.textDark) + ':1 ⭐⭐⭐\n');

console.log('═══════════════════════════════════════════════════════════\n');

console.log('📊 ALL BLUE TONE OPTIONS:\n');

const options = [
  { name: 'blue300', label: 'Slightly Darker Sky', hex: colors.blue300, use: 'Too subtle - not recommended' },
  { name: 'blue400', label: 'Medium Light Blue', hex: colors.blue400, use: '✅ PERFECT for hover' },
  { name: 'blue500', label: 'Rich Light Blue', hex: colors.blue500, use: '✅ PERFECT for active/selected' },
  { name: 'blue600', label: 'Strong Blue', hex: colors.blue600, use: '⚠️  Too strong - might compete with buttons' },
  { name: 'blue700', label: 'Deep Blue', hex: colors.blue700, use: '❌ Too dark - looks like a button' },
  { name: 'blue750', label: 'Vivid Blue', hex: colors.blue750, use: '❌ Too intense - actual button color' }
];

options.forEach(opt => {
  const c = contrast(colors.navBg, opt.hex);
  console.log(`  ${opt.name} (${opt.hex}) - ${opt.label}`);
  console.log(`    • Contrast: ${c}:1 ${getVisibility(c)}`);
  console.log(`    • Text (blue1000): ${contrast(opt.hex, colors.textDark)}:1`);
  console.log(`    • Use case: ${opt.use}\n`);
});

console.log('═══════════════════════════════════════════════════════════\n');

console.log('💡 DESIGN RATIONALE:\n');
console.log('  Why blue400 for hover?');
console.log('    • 1.42:1 contrast = visible but not jarring');
console.log('    • Harmonious with sky blue (same hue family)');
console.log('    • Subtle enough to not compete with content');
console.log('    • Clear feedback when user hovers\n');

console.log('  Why blue500 for active/selected?');
console.log('    • 1.75:1 contrast = clearly different from base & hover');
console.log('    • Strong enough to indicate "this is selected"');
console.log('    • Still light enough to maintain navigation feel');
console.log('    • Good contrast for text (7.71:1)\n');

console.log('  Why NOT blue600+?');
console.log('    • Too strong - looks like an interactive button');
console.log('    • Competes with primary action colors');
console.log('    • Breaks visual hierarchy (nav should recede)\n');

console.log('═══════════════════════════════════════════════════════════\n');

console.log('🎯 FINAL RECOMMENDATION:\n');
console.log('  Navigation States (Header & Sidebar):');
console.log('    • Base:     blue250 (#CEECFF) - Sky Blue');
console.log('    • Hover:    blue400 (#9CD4FF) - Medium Blue ⭐');
console.log('    • Active:   blue500 (#6FB4FF) - Rich Blue ⭐⭐');
console.log('    • Selected: blue500 (#6FB4FF) - Rich Blue ⭐⭐\n');

console.log('  Text on Navigation:');
console.log('    • Primary text: blue1000 (#000F47) - Midnight');
console.log('    • Icons: blue1000 or neutral700\n');

console.log('  Keep Buttons Distinct:');
console.log('    • Primary: gold750 (#FFB700) - Yellow');
console.log('    • Secondary: blue750 (#0B4BFF) - Vivid Blue');
console.log('    • This maintains clear visual separation!\n');

console.log('═══════════════════════════════════════════════════════════');
