// spacing.ts
// Canonical spacing scale (pixels). Index can map to step for consistency.
export const spacing: number[] = [4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128];

// Convenience map (value => value) in case an object is easier for lookups.
export const spacingMap: Record<string, number> = Object.fromEntries(
  spacing.map(v => [String(v), v])
);

export type SpacingToken = typeof spacing[number];

export const getSpacingValue = (px: SpacingToken) => px;
