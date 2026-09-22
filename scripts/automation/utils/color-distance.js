/**
 * Color Distance Utilities
 * Implements Delta E 2000 algorithm for perceptual color difference
 * 
 * Based on: http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE2000.html
 * 
 * Delta E interpretation:
 * - 0-1: Not perceptible by human eyes
 * - 1-2: Perceptible through close observation
 * - 2-10: Perceptible at a glance
 * - 10+: Colors are more different than similar
 * 
 * For token matching, we want Delta E < 2 for high confidence
 */

/**
 * Convert RGB [0-255] to XYZ color space
 * @param {number[]} rgb - [r, g, b] where each value is 0-255
 * @returns {number[]} [x, y, z]
 */
function rgbToXyz(rgb) {
  let [r, g, b] = rgb.map(val => val / 255);

  // Apply sRGB companding
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Observer: 2° (CIE 1931), Illuminant: D65
  const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  const y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
  const z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;

  return [x * 100, y * 100, z * 100];
}

/**
 * Convert XYZ to LAB color space
 * @param {number[]} xyz - [x, y, z]
 * @returns {number[]} [l, a, b]
 */
function xyzToLab(xyz) {
  // D65 reference white point
  const refWhite = [95.047, 100.000, 108.883];
  
  let [x, y, z] = xyz.map((val, i) => val / refWhite[i]);

  // Apply LAB companding
  const f = val => val > 0.008856 ? Math.pow(val, 1/3) : (7.787 * val + 16/116);
  
  x = f(x);
  y = f(y);
  z = f(z);

  const l = (116 * y) - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);

  return [l, a, b];
}

/**
 * Convert RGB directly to LAB
 * @param {number[]} rgb - [r, g, b] where each value is 0-255
 * @returns {number[]} [l, a, b]
 */
function rgbToLab(rgb) {
  const xyz = rgbToXyz(rgb);
  return xyzToLab(xyz);
}

/**
 * Calculate Delta E 2000 color distance
 * @param {number[]} lab1 - [l, a, b] for first color
 * @param {number[]} lab2 - [l, a, b] for second color
 * @returns {number} Delta E value (0 = identical, >100 = very different)
 */
function deltaE2000(lab1, lab2) {
  const [L1, a1, b1] = lab1;
  const [L2, a2, b2] = lab2;

  // Calculate Chroma and Hue
  const C1 = Math.sqrt(a1 * a1 + b1 * b1);
  const C2 = Math.sqrt(a2 * a2 + b2 * b2);
  const Cab = (C1 + C2) / 2;

  // Calculate a' (adjusted a)
  const G = 0.5 * (1 - Math.sqrt(Math.pow(Cab, 7) / (Math.pow(Cab, 7) + Math.pow(25, 7))));
  const a1p = (1 + G) * a1;
  const a2p = (1 + G) * a2;

  // Calculate C' and h'
  const C1p = Math.sqrt(a1p * a1p + b1 * b1);
  const C2p = Math.sqrt(a2p * a2p + b2 * b2);

  const h1p = Math.atan2(b1, a1p) * (180 / Math.PI);
  const h2p = Math.atan2(b2, a2p) * (180 / Math.PI);

  // Normalize hue angles
  const hp1 = h1p >= 0 ? h1p : h1p + 360;
  const hp2 = h2p >= 0 ? h2p : h2p + 360;

  // Calculate delta values
  const dL = L2 - L1;
  const dCp = C2p - C1p;

  let dhp;
  if (C1p * C2p === 0) {
    dhp = 0;
  } else if (Math.abs(hp2 - hp1) <= 180) {
    dhp = hp2 - hp1;
  } else if (hp2 - hp1 > 180) {
    dhp = hp2 - hp1 - 360;
  } else {
    dhp = hp2 - hp1 + 360;
  }

  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp / 2) * (Math.PI / 180));

  // Calculate mean values
  const Lp = (L1 + L2) / 2;
  const Cp = (C1p + C2p) / 2;

  let hp;
  if (C1p * C2p === 0) {
    hp = hp1 + hp2;
  } else if (Math.abs(hp1 - hp2) <= 180) {
    hp = (hp1 + hp2) / 2;
  } else if (hp1 + hp2 < 360) {
    hp = (hp1 + hp2 + 360) / 2;
  } else {
    hp = (hp1 + hp2 - 360) / 2;
  }

  // Calculate weighting factors
  const T = 1 - 0.17 * Math.cos((hp - 30) * (Math.PI / 180)) +
           0.24 * Math.cos(2 * hp * (Math.PI / 180)) +
           0.32 * Math.cos((3 * hp + 6) * (Math.PI / 180)) -
           0.20 * Math.cos((4 * hp - 63) * (Math.PI / 180));

  const dTheta = 30 * Math.exp(-Math.pow((hp - 275) / 25, 2));
  const RC = 2 * Math.sqrt(Math.pow(Cp, 7) / (Math.pow(Cp, 7) + Math.pow(25, 7)));
  const SL = 1 + (0.015 * Math.pow(Lp - 50, 2)) / Math.sqrt(20 + Math.pow(Lp - 50, 2));
  const SC = 1 + 0.045 * Cp;
  const SH = 1 + 0.015 * Cp * T;
  const RT = -Math.sin(2 * dTheta * (Math.PI / 180)) * RC;

  // Calculate final Delta E
  const kL = 1.0;
  const kC = 1.0;
  const kH = 1.0;

  const deltaE = Math.sqrt(
    Math.pow(dL / (kL * SL), 2) +
    Math.pow(dCp / (kC * SC), 2) +
    Math.pow(dHp / (kH * SH), 2) +
    RT * (dCp / (kC * SC)) * (dHp / (kH * SH))
  );

  return deltaE;
}

/**
 * Calculate color distance between two RGB colors
 * @param {number[]} rgb1 - [r, g, b] for first color (0-255)
 * @param {number[]} rgb2 - [r, g, b] for second color (0-255)
 * @returns {number} Delta E 2000 value
 */
function colorDistance(rgb1, rgb2) {
  const lab1 = rgbToLab(rgb1);
  const lab2 = rgbToLab(rgb2);
  return deltaE2000(lab1, lab2);
}

/**
 * Find the closest matching color from a palette
 * @param {number[]} targetRgb - [r, g, b] to match
 * @param {Object[]} palette - Array of { name, rgb, ... }
 * @returns {Object} { match, deltaE, confidence }
 */
function findClosestColor(targetRgb, palette) {
  let closestMatch = null;
  let minDeltaE = Infinity;

  palette.forEach(color => {
    const deltaE = colorDistance(targetRgb, color.rgb);
    if (deltaE < minDeltaE) {
      minDeltaE = deltaE;
      closestMatch = color;
    }
  });

  // Calculate confidence score (0-1)
  // High confidence when deltaE < 2, low confidence when > 10
  const confidence = Math.max(0, Math.min(1, 1 - (minDeltaE / 10)));

  return {
    match: closestMatch,
    deltaE: minDeltaE,
    confidence: confidence,
    quality: minDeltaE < 2 ? 'excellent' :
             minDeltaE < 5 ? 'good' :
             minDeltaE < 10 ? 'fair' : 'poor'
  };
}

/**
 * Batch find closest colors for multiple targets
 * @param {number[][]} targetRgbs - Array of [r, g, b] to match
 * @param {Object[]} palette - Array of { name, rgb, ... }
 * @returns {Object[]} Array of match results
 */
function batchFindClosest(targetRgbs, palette) {
  return targetRgbs.map(rgb => ({
    target: rgb,
    ...findClosestColor(rgb, palette)
  }));
}

// Export functions
export {
  rgbToXyz,
  xyzToLab,
  rgbToLab,
  deltaE2000,
  colorDistance,
  findClosestColor,
  batchFindClosest
};

// Example usage (for testing in browser console or Node):
/*
const color1 = [248, 252, 247]; // statusSuccessBg
const color2 = [248, 252, 246]; // Very similar
const color3 = [255, 0, 0];     // Red (very different)

console.log('Same color:', colorDistance(color1, color1));        // ~0
console.log('Very similar:', colorDistance(color1, color2));      // ~0.3
console.log('Very different:', colorDistance(color1, color3));    // ~86

const palette = [
  { name: 'statusSuccessBg', rgb: [248, 252, 247], hex: '#f8fcf7' },
  { name: 'statusWarningBg', rgb: [255, 250, 238], hex: '#fffaee' },
  { name: 'statusDangerBg', rgb: [255, 241, 241], hex: '#fff1f1' },
];

const result = findClosestColor([248, 252, 246], palette);
console.log('Closest match:', result);
// { match: { name: 'statusSuccessBg', ... }, deltaE: 0.3, confidence: 0.97, quality: 'excellent' }
*/
