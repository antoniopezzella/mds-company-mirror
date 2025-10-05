
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

const typography = {
  fontFamily: [
    'Noto Sans',
    'sans-serif',
  ].join(','),
  h1: {
    fontFamily: 'MMC Display, sans-serif',
    fontWeight: 700,
  },
  h2: {
    fontFamily: 'MMC Display, sans-serif',
    fontWeight: 700,
  },
  h3: {
    fontFamily: 'MMC Display, sans-serif',
    fontWeight: 700,
  },
  h4: {
    fontFamily: 'MMC Display, sans-serif',
    fontWeight: 700,
  },
  h5: {
    fontFamily: 'MMC Display, sans-serif',
    fontWeight: 700,
  },
  h6: {
    fontFamily: 'MMC Display, sans-serif',
    fontWeight: 700,
  },
  button: {
    fontFamily: 'MMC Display, sans-serif',
    fontWeight: 700,
    textTransform: 'none' as const,
  },
};

// Custom spacing function: accepts numeric index or direct pixel value.
const spacingFn = (factor: number): string => {
  if (factor < spacing.length) return `${spacing[factor]}px`;
  // Fallback: multiply base (4px) for unspecified indices
  return `${factor * 4}px`;
};

const theme = createTheme({
  palette: { mode: 'light', ...lightPalette },
  typography,
  spacing: spacingFn,
});
const darkTheme = createTheme({
  palette: { mode: 'dark', ...darkPalette },
  typography,
  spacing: spacingFn,
});

export { theme, darkTheme };
export default theme;
