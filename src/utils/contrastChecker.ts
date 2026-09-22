/**
 * WCAG Contrast Ratio Calculator
 * 
 * Calculates color contrast ratios per WCAG 2.1 standards
 * https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance per WCAG formula
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns ratio from 1:1 (no contrast) to 21:1 (max contrast)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    console.warn('Invalid color format:', color1, color2);
    return 0;
  }

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA standard
 */
export function meetsWCAG_AA(
  contrastRatio: number,
  isLargeText: boolean = false
): boolean {
  const threshold = isLargeText ? 3.0 : 4.5;
  return contrastRatio >= threshold;
}

/**
 * Check if contrast ratio meets WCAG AAA standard
 */
export function meetsWCAG_AAA(
  contrastRatio: number,
  isLargeText: boolean = false
): boolean {
  const threshold = isLargeText ? 4.5 : 7.0;
  return contrastRatio >= threshold;
}

/**
 * Get WCAG compliance level for a contrast ratio
 */
export function getWCAGLevel(
  contrastRatio: number,
  isLargeText: boolean = false
): 'FAIL' | 'AA' | 'AAA' {
  if (meetsWCAG_AAA(contrastRatio, isLargeText)) return 'AAA';
  if (meetsWCAG_AA(contrastRatio, isLargeText)) return 'AA';
  return 'FAIL';
}

/**
 * Format contrast ratio as string
 */
export function formatContrastRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}
