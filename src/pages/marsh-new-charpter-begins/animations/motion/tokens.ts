// Centralized motion tokens for durations, eases, and staggers
// Keep these conservative; adjust only with design sign-off.

export const durations = {
  xs: 0.2,
  sm: 0.35,
  md: 0.6,
  lg: 0.9,
};

export const staggers = {
  tight: 0.04,
  standard: 0.06,
  relaxed: 0.1,
};

export const eases = {
  entrance: 'power2.out',
  standard: 'power1.out',
  emphasized: 'expo.out',
  none: 'none',
} as const;

export type EaseName = keyof typeof eases;
