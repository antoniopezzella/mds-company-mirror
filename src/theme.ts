
import { createTheme } from '@mui/material/styles';
import { tokens } from './tokens';
import { spacing } from './spacing';


const lightPalette = {
  primary: {
    main: tokens.blue700,
    light: tokens.blue600,
    dark: tokens.blue900,
    contrastText: tokens.white,
  },
  secondary: {
    main: tokens.blue500,
    light: tokens.blueGray700,
    dark: tokens.blueGray900,
    contrastText: tokens.white,
  },
  error: {
    main: tokens.crimson600,
    contrastText: tokens.white,
  },
  warning: {
    main: tokens.yellow500,
    contrastText: tokens.gray900,
  },
  success: {
    main: tokens.green600,
    contrastText: tokens.white,
  },
  background: {
    default: tokens.blueGray75,
    paper: tokens.white,
  },
  text: {
    primary: tokens.blue700,
    secondary: tokens.gray900,
    disabled: tokens.gray600,
  },
  divider: tokens.gray500,
};


const darkPalette = {
  primary: {
    main: tokens.blue700,
    light: tokens.blue600,
    dark: tokens.blue900,
    contrastText: tokens.white,
  },
  secondary: {
    main: tokens.blueGray700,
  light: tokens.blueGray700,
    dark: tokens.blueGray900,
    contrastText: tokens.white,
  },
  error: {
    main: tokens.crimson300,
    contrastText: tokens.blue700,
  },
  warning: {
    main: tokens.yellow400,
    contrastText: tokens.blue700,
  },
  success: {
    main: tokens.green300,
    contrastText: tokens.blue700,
  },
  background: {
    default: tokens.blueGray900,
    paper: tokens.blueGray800,
  },
  text: {
    primary: tokens.white,
    secondary: tokens.gray400,
    disabled: tokens.gray600,
  },
  divider: tokens.gray500,
};

// --- Typography via CSS variables ------------------------------------------
// Typography values are sourced from CSS variables defined in
// src/styles/_typography.scss. This keeps a single source of truth that is
// consumable by both CSS Modules and MUI theme consumers.

const typography = {
  fontFamily: [
    'Noto Sans',
    'sans-serif',
  ].join(','),
  // Headings — MMC Display for brand voice; strong but controlled hierarchy
  h1: {
    fontFamily: 'var(--typo-h1-font-family)',
    fontWeight: 700,
    fontSize: 'var(--typo-h1-font-size)',
    lineHeight: 'var(--typo-h1-line-height)',
    letterSpacing: 'var(--typo-h1-letter-spacing)',
  },
  h2: {
    fontFamily: 'var(--typo-h2-font-family)',
    fontWeight: 700,
    fontSize: 'var(--typo-h2-font-size)',
    lineHeight: 'var(--typo-h2-line-height)',
    letterSpacing: 'var(--typo-h2-letter-spacing)',
  },
  h3: {
    fontFamily: 'var(--typo-h3-font-family)',
    fontWeight: 700,
    fontSize: 'var(--typo-h3-font-size)',
    lineHeight: 'var(--typo-h3-line-height)',
    letterSpacing: 'var(--typo-h3-letter-spacing)',
  },
  h4: {
    fontFamily: 'var(--typo-h4-font-family)',
    fontWeight: 700,
    fontSize: 'var(--typo-h4-font-size)',
    lineHeight: 'var(--typo-h4-line-height)',
    letterSpacing: 'var(--typo-h4-letter-spacing)',
  },
  h5: {
    fontFamily: 'var(--typo-h5-font-family)',
    fontWeight: 700,
    fontSize: 'var(--typo-h5-font-size)',
    lineHeight: 'var(--typo-h5-line-height)',
    letterSpacing: 'var(--typo-h5-letter-spacing)',
  },
  h6: {
    fontFamily: 'var(--typo-h6-font-family)',
    fontWeight: 700,
    fontSize: 'var(--typo-h6-font-size)',
    lineHeight: 'var(--typo-h6-line-height)',
    letterSpacing: 'var(--typo-h6-letter-spacing)',
  },
  // Body & UI copy — Noto Sans for readability
  body1: {
    fontFamily: 'var(--typo-body1-font-family)',
    fontWeight: 400,
    fontSize: 'var(--typo-body1-font-size)',
    lineHeight: 'var(--typo-body1-line-height)',
    letterSpacing: 'var(--typo-body1-letter-spacing)',
  },
  body2: {
    fontFamily: 'var(--typo-body2-font-family)',
    fontWeight: 400,
    fontSize: 'var(--typo-body2-font-size)',
    lineHeight: 'var(--typo-body2-line-height)',
    letterSpacing: 'var(--typo-body2-letter-spacing)',
  },
  subtitle1: {
    fontFamily: 'var(--typo-subtitle1-font-family)',
    fontWeight: 500,
    fontSize: 'var(--typo-subtitle1-font-size)',
    lineHeight: 'var(--typo-subtitle1-line-height)',
    letterSpacing: 'var(--typo-subtitle1-letter-spacing)',
  },
  subtitle2: {
    fontFamily: 'var(--typo-subtitle2-font-family)',
    fontWeight: 500,
    fontSize: 'var(--typo-subtitle2-font-size)',
    lineHeight: 'var(--typo-subtitle2-line-height)',
    letterSpacing: 'var(--typo-subtitle2-letter-spacing)',
  },
  caption: {
    fontFamily: 'var(--typo-caption-font-family)',
    fontWeight: 400,
    fontSize: 'var(--typo-caption-font-size)',
    lineHeight: 'var(--typo-caption-line-height)',
    letterSpacing: 'var(--typo-caption-letter-spacing)',
  },
  overline: {
    fontFamily: 'var(--typo-overline-font-family)',
    fontWeight: 400,
    fontSize: 'var(--typo-overline-font-size)',
    lineHeight: 'var(--typo-overline-line-height)',
    letterSpacing: 'var(--typo-overline-letter-spacing)',
    textTransform: 'uppercase' as const,
  },
  button: {
    fontFamily: 'var(--typo-button-font-family)',
    fontWeight: 500,
    textTransform: 'none' as const,
    letterSpacing: 'var(--typo-button-letter-spacing)',
  },
};

// Custom spacing function: accepts numeric index or direct pixel value.
const spacingFn = (factor: number): string => {
  if (factor < spacing.length) return `${spacing[factor]}px`;
  // Fallback: multiply base (4px) for unspecified indices
  return `${factor * 4}px`;
};

export const theme = createTheme({
  palette: { mode: 'light', ...lightPalette },
  typography,
  spacing: spacingFn,
});

export const darkTheme = createTheme({
  palette: { mode: 'dark', ...darkPalette },
  typography,
  spacing: spacingFn,
});
