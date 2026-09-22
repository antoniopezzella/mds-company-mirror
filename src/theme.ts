
import { createTheme } from '@mui/material/styles';
import { tokens } from './tokens';
import { spacing } from './spacing';


const lightPalette = {
  primary: {
    main: tokens.blue1000,          // #000f47 — Brand Primary (Midnight)
    light: tokens.blue750,          // #0b4bff (Active)
    dark: tokens.blue950,           // #021b6c
    contrastText: tokens.white,
  },
  secondary: {
    main: tokens.blue250,           // #ceecff — Sky Blue
    light: tokens.blue100,          // #ebf7ff
    dark: tokens.blue500,           // #6fb4ff
    contrastText: tokens.blue1000,
  },
  error: {
    main: tokens.statusCritical,    // #c53532 — Utilities/Critical
    contrastText: tokens.white,
  },
  warning: {
    main: tokens.statusWarning,     // #cb7e03 — Utilities/Warning
    contrastText: tokens.white,
  },
  success: {
    main: tokens.statusSuccess,     // #14853d — Utilities/Success
    contrastText: tokens.white,
  },
  background: {
    default: tokens.white,
    paper: tokens.gray250,          // #f7f8f8 — App background (was blueGray75)
  },
  text: {
    primary: tokens.blue1000,       // #000f47 — Brand-tinted text
    secondary: tokens.neutral700,   // #595959
    disabled: tokens.neutral600,    // #767676
  },
  divider: tokens.neutral250,       // #dadada
};


const darkPalette = {
  primary: {
    main: tokens.blue400,           // #95caff — Lightened for dark bg
    light: tokens.blue300,          // #bbe1ff
    dark: tokens.blue750,           // #0b4bff (Active)
    contrastText: tokens.neutral950, // #101010
  },
  secondary: {
    main: tokens.blue400,           // #95caff — Lightened Sky Blue
    light: tokens.blue300,          // #bbe1ff
    dark: tokens.blue600,           // #478aff
    contrastText: tokens.neutral950,
  },
  error: {
    main: tokens.red500,            // #ff6b6b — Lightened red
    contrastText: tokens.white,
  },
  warning: {
    main: tokens.gold500,           // #ff994a — Lightened gold
    contrastText: tokens.neutral950,
  },
  success: {
    main: tokens.green500,          // #8dcc92 — Lightened green
    contrastText: tokens.neutral950,
  },
  background: {
    default: tokens.neutral950,     // #101010 — Near black
    paper: tokens.neutral900,       // #252525 — Elevated dark surface
  },
  text: {
    primary: tokens.white,          // #ffffff
    secondary: tokens.neutral250,   // #dadada
    disabled: tokens.neutral500,    // #878787
  },
  divider: tokens.neutral700,       // #595959
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
  // Headings read CSS variables so marketing pages can use Marsh Serif while
  // dashboard containers switch the same variants to Noto Sans Bold.
  h1: {
    fontFamily: 'var(--typo-h1-font-family)',
    fontWeight: 'var(--typo-h1-font-weight)',
    fontSize: 'var(--typo-h1-font-size)',
    lineHeight: 'var(--typo-h1-line-height)',
    letterSpacing: 'var(--typo-h1-letter-spacing)',
  },
  h2: {
    fontFamily: 'var(--typo-h2-font-family)',
    fontWeight: 'var(--typo-h2-font-weight)',
    fontSize: 'var(--typo-h2-font-size)',
    lineHeight: 'var(--typo-h2-line-height)',
    letterSpacing: 'var(--typo-h2-letter-spacing)',
  },
  h3: {
    fontFamily: 'var(--typo-h3-font-family)',
    fontWeight: 'var(--typo-h3-font-weight)',
    fontSize: 'var(--typo-h3-font-size)',
    lineHeight: 'var(--typo-h3-line-height)',
    letterSpacing: 'var(--typo-h3-letter-spacing)',
  },
  h4: {
    fontFamily: 'var(--typo-h4-font-family)',
    fontWeight: 'var(--typo-h4-font-weight)',
    fontSize: 'var(--typo-h4-font-size)',
    lineHeight: 'var(--typo-h4-line-height)',
    letterSpacing: 'var(--typo-h4-letter-spacing)',
  },
  h5: {
    fontFamily: 'var(--typo-h5-font-family)',
    fontWeight: 'var(--typo-h5-font-weight)',
    fontSize: 'var(--typo-h5-font-size)',
    lineHeight: 'var(--typo-h5-line-height)',
    letterSpacing: 'var(--typo-h5-letter-spacing)',
  },
  h6: {
    fontFamily: 'var(--typo-h6-font-family)',
    fontWeight: 'var(--typo-h6-font-weight)',
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
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'outlined', // Dashboard rule: secondary (outlined) is the default
        disableElevation: true,
      },
    },
  },
});

// Alias for backward compatibility
export const lightTheme = theme;

export const darkTheme = createTheme({
  palette: { mode: 'dark', ...darkPalette },
  typography,
  spacing: spacingFn,
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'outlined', // Dashboard rule: secondary (outlined) is the default
        disableElevation: true,
      },
    },
  },
});
