// tokens.ts
// Design system color tokens (primitives) — Figma "Primitive Colors" collection
// Synced from: Figma OneWeb Design Concepts → Primitive Colors (local variables)
// All palettes: 14 uniform stops (50–1000) with brand anchors at ★250, ★500, ★750, ★1000
// Palettes: Blue, Gold, Green, Red, Purple, Gray, Neutral + Static + Utilities + Shades

export const tokens = {
  // ── BLUE (14 stops) ───────────────────────────────────────────────────────
  blue50:   '#f5fbff',   // interpolated
  blue100:  '#ebf7ff',   // interpolated
  blue200:  '#d8f0ff',   // interpolated
  blue250:  '#ceecff',   // ★ Figma anchor — Sky
  blue300:  '#bbe1ff',   // interpolated
  blue400:  '#95caff',   // interpolated
  blue500:  '#82baff',   // ★ Figma anchor — corrected from interpolated #6fb4ff (2026-09-15 Figma re-sync)
  blue600:  '#5e9aff',   // ★ Figma anchor — corrected from interpolated #478aff (2026-09-15 Figma re-sync)
  blue700:  '#1f60ff',   // interpolated
  blue750:  '#0b4bff',   // ★ Figma anchor — Active
  blue800:  '#093fda',   // interpolated
  blue900:  '#082d9e',   // ★ Figma anchor — corrected from interpolated #042791 (2026-09-15 Figma re-sync)
  blue950:  '#06206e',   // ★ Figma anchor — corrected from interpolated #021b6c (2026-09-15 Figma re-sync)
  blue975:  '#1a2759',   // ~white@10% blended over #000f47 (nav hover)
  blue990:  '#333f6b',   // ~white@20% blended over #000f47 (nav active)
  blue1000: '#000f47',   // ★ Figma anchor — Midnight (legacy)
  blue1100: '#002c77',   // ★ Figma anchor — MODE Primary (darker navy)

  // ── GOLD (14 stops) ───────────────────────────────────────────────────────
  gold50:   '#fffcf8',   // interpolated
  gold100:  '#fff8ed',   // interpolated
  gold200:  '#fff5e1',   // interpolated
  gold250:  '#fff2da',   // ★ Figma anchor
  gold300:  '#ffeeca',   // ★ Figma anchor — corrected from interpolated #ffe0bd (2026-09-15 Figma re-sync)
  gold400:  '#ffe3aa',   // ★ Figma anchor — corrected from interpolated #ffbd84 (2026-09-15 Figma re-sync)
  gold500:  '#ffd98a',   // ★ Figma anchor — corrected from #ff994a (2026-09-15 Figma re-sync)
  gold600:  '#ffcf53',   // ★ Figma anchor — corrected from interpolated #ffa02e (2026-09-15 Figma re-sync)
  gold650:  '#ffc937',   // ★ Figma anchor
  gold700:  '#ffab14',   // interpolated
  gold750:  '#ffbf00',   // ★ Figma anchor — verified 2026-08-24 against the live "Primary Alt" Button component (uWlcofRor5Dik8LBnJbIjo node 9749:3234, var V3/Surface/Secondary); corrected from #ffb700
  gold800:  '#f5a907',   // interpolated
  gold850:  '#eaa501',   // ★ Figma anchor — matches button.tsx's primaryAlt hover hex exactly
  gold900:  '#e09015',   // interpolated
  gold950:  '#d58b02',   // ★ Figma anchor — corrected from interpolated #d5831c (unused anywhere in src/, safe to fix); matches button.tsx's primaryAlt active hex exactly
  gold1000: '#cb7623',   // ★ Figma anchor

  // ── GREEN (14 stops) ──────────────────────────────────────────────────────
  green50:   '#f8fcf7',   // interpolated
  green100:  '#f2faef',   // interpolated
  green200:  '#e5f5df',   // interpolated
  green250:  '#def2d7',   // ★ Figma anchor
  green300:  '#ceeac9',   // interpolated
  green400:  '#addbae',   // interpolated
  green500:  '#b0dc92',   // ★ Figma anchor — corrected from #8dcc92 (2026-09-15 Figma re-sync)
  green600:  '#7cc664',   // interpolated
  green700:  '#6cc044',   // interpolated
  green750:  '#64bc30',   // ★ Figma anchor
  green800:  '#54a731',   // interpolated
  green900:  '#449631',   // interpolated
  green950:  '#3a8a32',   // interpolated
  green1000: '#2f7d32',   // ★ Figma anchor

  // ── RED (14 stops) ────────────────────────────────────────────────────────
  red50:   '#fffafa',   // interpolated
  red100:  '#fff4f4',   // interpolated
  red200:  '#ffeded',   // interpolated
  red250:  '#ffe8e8',   // ★ Figma anchor
  red300:  '#ffcfcf',   // interpolated
  red400:  '#ff9d9d',   // interpolated
  red500:  '#ff6b6b',   // ★ Figma anchor
  red600:  '#f55555',   // interpolated
  red700:  '#ec4540',   // interpolated
  red750:  '#e53935',   // ★ Figma anchor
  red800:  '#d33330',   // interpolated
  red900:  '#af2625',   // interpolated
  red950:  '#9d201f',   // interpolated
  red1000: '#8b1a1a',   // ★ Figma anchor

  // ── PURPLE (14 stops) ─────────────────────────────────────────────────────
  purple50:   '#fef8fe',   // interpolated
  purple100:  '#fcf1fc',   // Figma value
  purple200:  '#f7ebfe',   // interpolated
  purple250:  '#f2e6ff',   // ★ Figma anchor
  purple300:  '#e9d3ff',   // interpolated
  purple400:  '#dcbaff',   // Figma value
  purple500:  '#deb1ff',   // ★ Figma anchor — corrected from #c88fff (2026-09-15 Figma re-sync)
  purple600:  '#b96bf5',   // interpolated
  purple700:  '#ab5aea',   // Figma value
  purple750:  '#8f20de',   // ★ Figma anchor — corrected from #8f37c6 (2026-09-15 Figma re-sync); feeds interactiveSecondaryVisited
  purple800:  '#842daf',   // interpolated
  purple900:  '#7720b0',   // Figma value
  purple950:  '#6a18a3',   // interpolated
  purple1000: '#5e0f95',   // ★ Figma anchor

  // ── GRAY removed 2026-10-09 — the warm/green-tinted family was retired in
  //    favour of the pure `neutral` brand family. Its four live semantics
  //    (surfaceAccent, surfaceAccentStrong, interactiveDisabled bg/fg) were
  //    repointed to the nearest neutral. See docs/tasks/token-authority-decision.md.

  // ── NEUTRAL (14 stops — pure R=G=B scale) ─────────────────────────────────
  neutral50:   '#f8f8f8',   // interpolated
  neutral100:  '#eeeeee',   // interpolated
  neutral200:  '#e3e3e3',   // Figma anchor
  neutral250:  '#dadada',   // ★ brand anchor (= Figma 300)
  neutral300:  '#c4c4c4',   // interpolated
  neutral400:  '#a8a8a8',   // interpolated
  neutral500:  '#878787',   // ★ brand anchor (= Figma 525)
  neutral600:  '#767676',   // Figma anchor
  neutral700:  '#595959',   // interpolated
  neutral750:  '#4a4a4a',   // ★ brand anchor
  neutral800:  '#3b3b3b',   // Figma anchor
  neutral900:  '#252525',   // interpolated
  neutral925:  '#1a1a1a',   // interpolated — dark panel lift, between 900 and 950
  neutral950:  '#101010',   // Figma anchor
  neutral1000: '#000000',   // ★ brand anchor — pure black

  // ── STATIC ────────────────────────────────────────────────────────────────
  white: '#ffffff',
  black: '#000000',

  // ── TRAFFIC / CRIMSON ─────────────────────────────────────────────────────
  // Figma's destructive ramp, which is NOT the `red*` ramp above — that one
  // maps to a different Figma family. Only the 600 step had been imported
  // (as `statusCritical` below); 700 and 800 existed in Figma with
  // `mdsToken: null` in figma-variable-map.json, so Button, which needs the
  // full ramp for hover and active, had nowhere to point and shipped them as
  // literals. The `red800`/`red900` the danger roles used instead are marked
  // "interpolated" — invented values that never matched the design.
  crimson700: '#9a1c1f',   // ★ Figma anchor — Traffic/Crimson 700
  crimson800: '#691315',   // ★ Figma anchor — Traffic/Crimson 800

  // ── UTILITIES ─────────────────────────────────────────────────────────────
  statusCritical: '#c53532',   // Figma Utilities/Critical (= Traffic/Crimson 600 - default)
  statusWarning:  '#cb7e03',   // Figma Utilities/Warning
  statusSuccess:  '#14853d',   // Figma Utilities/Success
  statusInfo:     '#6fb4ff',   // → blue500
  focusCyan:      '#009de0',   // Figma MODE/Border/Focus (future-state)
  focusBlue:      '#3d7aff',   // Figma uWlcofRor5Dik8LBnJbIjo node 7582:7847 — Border/Focus (light, "On dark surface")
  focusBlueDark:  '#5e9aff',   // same node — Border/Focus (dark)

  // ── SHADES — White (alpha) ────────────────────────────────────────────────
  shadesWhite90: 'rgba(255,255,255,0.90)',
  shadesWhite85: 'rgba(255,255,255,0.85)',
  shadesWhite80: 'rgba(255,255,255,0.80)',
  shadesWhite70: 'rgba(255,255,255,0.70)',
  shadesWhite65: 'rgba(255,255,255,0.65)',
  shadesWhite60: 'rgba(255,255,255,0.60)',
  shadesWhite50: 'rgba(255,255,255,0.50)',
  shadesWhite40: 'rgba(255,255,255,0.40)',
  shadesWhite30: 'rgba(255,255,255,0.30)',
  shadesWhite20: 'rgba(255,255,255,0.20)',
  shadesWhite10: 'rgba(255,255,255,0.10)',
  shadesWhite5:  'rgba(255,255,255,0.05)',
  shadesWhite0:  'rgba(255,255,255,0.00)',

  // ── SHADES — Black (alpha) ────────────────────────────────────────────────
  shadesBlack90: 'rgba(0,0,0,0.90)',
  shadesBlack85: 'rgba(0,0,0,0.85)',
  shadesBlack80: 'rgba(0,0,0,0.80)',
  shadesBlack75: 'rgba(0,0,0,0.75)',
  shadesBlack70: 'rgba(0,0,0,0.70)',
  shadesBlack65: 'rgba(0,0,0,0.65)',
  shadesBlack60: 'rgba(0,0,0,0.60)',
  shadesBlack55: 'rgba(0,0,0,0.55)',
  shadesBlack50: 'rgba(0,0,0,0.50)',
  shadesBlack45: 'rgba(0,0,0,0.45)',
  shadesBlack40: 'rgba(0,0,0,0.40)',
  shadesBlack30: 'rgba(0,0,0,0.30)',
  shadesBlack20: 'rgba(0,0,0,0.20)',
  shadesBlack10: 'rgba(0,0,0,0.10)',
  shadesBlack5:  'rgba(0,0,0,0.05)',
  shadesBlack0:  'rgba(0,0,0,0.00)',

  // ── SHADES — Midnight Blue (alpha) ────────────────────────────────────────
  shadesMidnight90: 'rgba(0,15,71,0.90)',
  shadesMidnight85: 'rgba(0,15,71,0.85)',
  shadesMidnight80: 'rgba(0,15,71,0.80)',
  shadesMidnight75: 'rgba(0,15,71,0.75)',
  shadesMidnight70: 'rgba(0,15,71,0.70)',
  shadesMidnight65: 'rgba(0,15,71,0.65)',
  shadesMidnight60: 'rgba(0,15,71,0.60)',
  shadesMidnight55: 'rgba(0,15,71,0.55)',
  shadesMidnight50: 'rgba(0,15,71,0.50)',
  shadesMidnight45: 'rgba(0,15,71,0.45)',
  shadesMidnight40: 'rgba(0,15,71,0.40)',
  shadesMidnight30: 'rgba(0,15,71,0.30)',
  shadesMidnight20: 'rgba(0,15,71,0.20)',
  shadesMidnight10: 'rgba(0,15,71,0.10)',

  // ── SHADES — Active Blue (alpha) ──────────────────────────────────────────
  shadesActive90: 'rgba(11,75,255,0.90)',
  shadesActive85: 'rgba(11,75,255,0.85)',
  shadesActive80: 'rgba(11,75,255,0.80)',
  shadesActive75: 'rgba(11,75,255,0.75)',
  shadesActive70: 'rgba(11,75,255,0.70)',
  shadesActive65: 'rgba(11,75,255,0.65)',
  shadesActive60: 'rgba(11,75,255,0.60)',
  shadesActive55: 'rgba(11,75,255,0.55)',
  shadesActive50: 'rgba(11,75,255,0.50)',
  shadesActive45: 'rgba(11,75,255,0.45)',
  shadesActive40: 'rgba(11,75,255,0.40)',
  shadesActive30: 'rgba(11,75,255,0.30)',
  shadesActive20: 'rgba(11,75,255,0.20)',
  shadesActive10: 'rgba(11,75,255,0.10)',
};
