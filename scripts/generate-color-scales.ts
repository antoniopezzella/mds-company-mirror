/**
 * Generate OKLCH-based color scales for Marsh Design System
 * Using the algorithm from design-system-skills repository
 * 
 * Run: npx tsx scripts/generate-color-scales.ts
 */

// ============================================================================
// OKLCH Color Generation Algorithm
// Based on: github.com/dylantarre/design-system-skills
// ============================================================================

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function srgbToLinear(c: number): number {
  c = c / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
  const clamped = Math.max(0, Math.min(1, c));
  return clamped <= 0.0031308
    ? Math.round(clamped * 12.92 * 255)
    : Math.round((1.055 * Math.pow(clamped, 1 / 2.4) - 0.055) * 255);
}

function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l = Math.cbrt(l_);
  const m = Math.cbrt(m_);
  const s = Math.cbrt(s_);

  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const bVal = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;

  const C = Math.sqrt(a * a + bVal * bVal);
  let H = Math.atan2(bVal, a) * 180 / Math.PI;
  if (H < 0) H += 360;

  return [L, C, H];
}

function oklchToRgb(L: number, C: number, H: number): [number, number, number] {
  const a = C * Math.cos(H * Math.PI / 180);
  const b = C * Math.sin(H * Math.PI / 180);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const lr = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  return [linearToSrgb(lr), linearToSrgb(lg), linearToSrgb(lb)];
}

// Lightness stops for perceptually uniform scales
const LIGHTNESS_STOPS = [
  { step: 50, L: 0.97 },
  { step: 100, L: 0.93 },
  { step: 200, L: 0.87 },
  { step: 300, L: 0.78 },
  { step: 400, L: 0.65 },
  { step: 500, L: 0.55 },
  { step: 600, L: 0.45 },
  { step: 700, L: 0.37 },
  { step: 800, L: 0.27 },
  { step: 900, L: 0.20 },
  { step: 950, L: 0.14 },
];

interface ColorStop {
  step: number;
  hex: string;
  oklch: [number, number, number];
}

function generateColorScale(hex: string): ColorStop[] {
  const [r, g, b] = hexToRgb(hex);
  const [, C, H] = rgbToOklch(r, g, b);

  return LIGHTNESS_STOPS.map(({ step, L }) => {
    // Reduce chroma at extremes to prevent washed-out or muddy colors
    const chromaMultiplier = L > 0.9 ? 0.3 : L < 0.2 ? 0.7 : 1;
    const adjustedC = C * chromaMultiplier;

    const [newR, newG, newB] = oklchToRgb(L, adjustedC, H);
    const newHex = rgbToHex(newR, newG, newB);

    return { step, hex: newHex, oklch: [L, adjustedC, H] };
  });
}

// ============================================================================
// Marsh Brand Colors (From Figma)
// ============================================================================

const MARSH_BRAND_COLORS = {
  gold: '#FFBF00',      // Primary Action Color
  midnight: '#000F47',  // Brand Dark
  sky: '#CEECFF',       // Brand Light
  blueActive: '#0B4BFF', // Focus States
};

// ============================================================================
// Generate Full Scales
// ============================================================================

console.debug('🎨 Generating OKLCH-based color scales for Marsh Design System\n');
console.debug('Using perceptually uniform algorithm from design-system-skills\n');

const scales: Record<string, ColorStop[]> = {};

for (const [name, hex] of Object.entries(MARSH_BRAND_COLORS)) {
  console.debug(`\n📊 ${name.toUpperCase()} (Base: ${hex})`);
  console.debug('─'.repeat(60));
  
  const scale = generateColorScale(hex);
  scales[name] = scale;
  
  // Display in TypeScript format
  scale.forEach(({ step, hex, oklch }) => {
    const [L, C, H] = oklch;
    const oklchStr = `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${H.toFixed(1)})`;
    console.debug(`  ${name}${step}: '${hex}',  // ${oklchStr}`);
  });
}

// ============================================================================
// Generate TypeScript Output
// ============================================================================

console.debug('\n\n📝 Complete tokens.ts output:\n');
console.debug('─'.repeat(80));

let tokensOutput = `// Generated with OKLCH algorithm from design-system-skills
// Date: ${new Date().toISOString().split('T')[0]}

export const tokens = {\n`;

for (const [name, scale] of Object.entries(scales)) {
  tokensOutput += `  // ${name.toUpperCase()} PALETTE (OKLCH-based)\n`;
  scale.forEach(({ step, hex, oklch }) => {
    const [L, C, H] = oklch;
    const comment = `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${H.toFixed(1)})`;
    tokensOutput += `  ${name}${step}: '${hex}', // ${comment}\n`;
  });
  tokensOutput += '\n';
}

tokensOutput += `  // STATIC COLORS
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;`;

console.debug(tokensOutput);

console.debug('\n\n✅ Color scales generated successfully!');
console.debug('Copy the output above to src/tokens.ts');
