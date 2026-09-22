# MDS V3 Immediate Actions — Quick Start Checklist

**Created:** March 17, 2026  
**Status:** Ready to execute  
**Est. Time:** 2-3 days for Phase 1

---

## ✅ Completed Today

- [x] **Dark Mode SideNav Integration** — App.tsx now uses `useThemeMode()` hook and dynamically switches sidebar variant
- [x] **Strategic Plan Created** — See MDS_V3_STRATEGIC_PLAN.md for full roadmap

---

## 🎯 Critical Fixes (This Week)

### 1. Fix Theme.ts to Use Semantic Tokens ⚠️ CRITICAL

**Problem:** `src/theme.ts` uses primitive tokens directly, bypassing the semantic layer.

**Current (Lines 7-13):**
```typescript
// ❌ Bypasses semantic layer
const lightPalette = {
  primary: {
    main: tokens.blue1000,          // #000f47 — Direct primitive
    light: tokens.blue750,
    dark: tokens.blue950,
    contrastText: tokens.white,
  },
```

**Fix Required:**
```typescript
// ✅ Uses semantic layer (intent-based)
import { semanticColors, semanticDarkOverrides } from './semantic-tokens'

const lightPalette = {
  primary: {
    main: semanticColors.brandPrimary,        // Intent: brand primary
    light: semanticColors.brandSecondary,     // Intent: brand secondary
    dark: semanticColors.brandPrimaryDark,    // Intent: darker brand
    contrastText: semanticColors.textOnAccent,
  },
```

**Files to change:**
- [ ] `src/theme.ts` lines 7-44 (lightPalette)
- [ ] `src/theme.ts` lines 47-83 (darkPalette) — Use `semanticDarkOverrides`

**Impact:** This single change will make ALL MUI components semantic-token-aware and enable proper theme switching.

**Time:** 30 minutes

---

### 2. Consolidate Legacy/MODE Token Duality 🔄

**Problem:** `src/semantic-tokens.ts` has dual token system:
- `brandPrimary: ref('blue1000')` → Legacy midnight #000f47
- `brandPrimaryDark: ref('blue1100')` → MODE navy #002c77

**Decision needed:** Which color is One Marsh brand?
- **Option A:** MODE navy (#002c77) becomes primary → rename `brandPrimaryDark` to `brandPrimary`
- **Option B:** Keep legacy midnight → remove MODE tokens

**Recommended:** Option A (adopt MODE for One Marsh 2027)

**Actions:**
- [ ] Confirm One Marsh brand color with Brand Team (#002c77 vs #000f47)
- [ ] Update `src/semantic-tokens.ts` to eliminate duality
- [ ] Remove "Mode" suffix from token names (e.g., `textPrimaryMode` → `textPrimary`)
- [ ] Update Figma token sync to use One Marsh variables

**Files to change:**
- [ ] `src/semantic-tokens.ts` (40+ token renames)
- [ ] `figma.config.json` (if needed)

**Time:** 2 hours

---

### 3. Add Dashboard/Marketing Context Tokens 🎨

**Problem:** No context-specific semantic tokens for dashboard vs marketing surfaces.

**Current:** Components use manual `variant` props
**V3 Goal:** Theme-aware context tokens

**New tokens to add to `src/semantic-tokens.ts`:**
```typescript
// Dashboard context
dashboardSurface: ref('neutral50'),      // #f8f8f8 — Light gray page bg
dashboardCard: ref('white'),             // White card bg
dashboardNavigation: ref('blue1100'),    // Dark sidebar
dashboardBorder: ref('neutral250'),      // Card borders

// Marketing context
marketingSurface: ref('white'),          // White page bg
marketingHero: ref('blue1100'),          // Hero section bg
marketingAccent: ref('blue50'),          // Accent sections
marketingBorder: ref('neutral300'),      // Decorative borders

// Data visualization (dashboard-specific)
dataPositive: ref('green500'),           // Positive trends
dataNegative: ref('red500'),             // Negative trends
dataNeutral: ref('neutral500'),          // Neutral/no change
dataHighlight: ref('blue500'),           // Highlighted data
```

**Also add to dark overrides:**
```typescript
export const semanticDarkOverrides = {
  // ... existing overrides
  dashboardSurface: ref('neutral950'),   // Near black
  dashboardCard: ref('neutral900'),      // Elevated dark
  marketingSurface: ref('neutral900'),   
}
```

**Files to change:**
- [ ] `src/semantic-tokens.ts` — Add new context tokens
- [ ] `src/theme/roles.ts` — Map to role colors (optional)

**Time:** 1 hour

---

### 4. System Theme Preference Detection 🌓

**Problem:** Users must manually toggle theme instead of respecting OS preference.

**Current:** `ThemeModeContext` defaults to light
**V3 Goal:** Auto-detect system preference on first visit

**File to change:** `src/theme/ThemeModeContext.tsx`

**Add system detection:**
```typescript
export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    // 1. Check localStorage for user preference
    const stored = localStorage.getItem('mds-theme-mode')
    if (stored === 'light' || stored === 'dark') return stored

    // 2. Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }

    // 3. Default to light
    return 'light'
  })

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Only follow system if user hasn't set a preference
      if (!localStorage.getItem('mds-theme-mode')) {
        setMode(e.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleMode = () => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('mds-theme-mode', next) // Remember user choice
      return next
    })
  }

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ThemeModeContext.Provider>
  )
}
```

**Files to change:**
- [ ] `src/theme/ThemeModeContext.tsx` — Add system detection logic

**Time:** 30 minutes

---

## 📊 Component Library Actions

### 5. Light/Dark Mode Component Audit 🔍

**Goal:** Ensure all 45+ components work in both modes.

**Audit priority order:**
1. **Navigation** (Header, SideNavigation, Navbar) — ✅ SideNavigation complete
2. **Forms** (TextField, Select, Checkbox, Radio)
3. **Data Display** (DataGrid, Table, ChartMetricCard)
4. **Feedback** (Alert, Modal, Snackbar)
5. **Surfaces** (Card, Paper, Section)

**Testing method:**
```bash
npm run storybook
# Toggle theme in each story
# Check for:
# - Readable text (contrast)
# - Visible borders
# - Proper background colors
# - Hover/focus states work
```

**Create audit spreadsheet:**
| Component | Light Mode | Dark Mode | Issues | Fixed |
|-----------|-----------|-----------|--------|-------|
| SideNavigation | ✅ | ✅ | None | ✅ |
| Header | ? | ? | ? | ⬜ |
| DataGrid | ? | ? | ? | ⬜ |
| ... | | | | |

**Files to track:**
- [ ] Create `LIGHT_DARK_MODE_AUDIT.md` with component checklist
- [ ] Fix components one by one

**Time:** 1 day for audit, 2-3 days for fixes

---

### 6. Remove Manual Variant Props (Gradual Migration) 🔄

**Goal:** Replace `variant="dark"|"light"` with theme-aware patterns.

**Components using variants currently:**
- `HeroSection` — `variant?: 'dark' | 'light' | 'blue'`
- `WireframeSlide` — `variant?: 'light' | 'dark' | 'hero'`
- `SideNavigation` — `variant?: 'dark' | 'light'` (✅ now theme-aware in App.tsx)

**Migration strategy (DO NOT break existing usage):**

**Phase 1: Add theme-aware defaults**
```typescript
// Before (V2)
export interface HeroSectionProps {
  variant?: 'dark' | 'light' | 'blue'
}

// After (V3 - backward compatible)
export interface HeroSectionProps {
  /** @deprecated Use theme.palette.mode instead. Defaults to theme-aware */
  variant?: 'dark' | 'light' | 'blue'
  context?: 'dashboard' | 'marketing' | 'default'
}

export function HeroSection({ variant, context = 'default', ...props }: HeroSectionProps) {
  const theme = useTheme()
  
  // Backward compatibility: use variant if provided, else use theme
  const effectiveMode = variant 
    ? variant === 'dark' ? 'dark' : 'light'
    : theme.palette.mode
  
  // Context determines which surface to use
  const bgColor = context === 'dashboard'
    ? theme.palette.dashboard.surface
    : context === 'marketing'
    ? theme.palette.marketing.hero
    : theme.palette.background.default
  
  return <Box sx={{ bgcolor: bgColor }}>...</Box>
}
```

**Phase 2: Update call sites**
```tsx
// Old
<HeroSection variant="dark" />

// New (remove variant, use context)
<HeroSection context="marketing" />
```

**Phase 3: Remove deprecated variants** (MDS V4)

**Files to change (gradual):**
- [ ] `src/components/sections/HeroSection/HeroSection.tsx`
- [ ] `src/components/sections/WireframeSlide/WireframeSlide.tsx`
- [ ] Update all call sites in pages/stories

**Time:** 3-4 days (low priority, can be gradual)

---

## 🗂️ Navigation Context System

### 7. Clarify Dashboard vs Marketing Variants 🔍

**Question for you:** Where is the "Dashboard vs Marketing" distinction?

**Evidence from code:**
- `SideNavigation` has `variant: 'dark' | 'light'`
- `HeroSection` has `variant: 'dark' | 'light' | 'blue'`
- No `context` or `type` props found

**Possibilities:**
1. **Implicit in variant names** — 'dark' = Dashboard, 'light' = Marketing?
2. **Router-based** — Different layouts for /dashboard vs /marketing routes?
3. **Future feature** — Not yet implemented?

**Action needed:**
- [ ] **Please clarify:** How do you distinguish Dashboard from Marketing navigation?
- [ ] Is it a routing concern?
- [ ] Or should we add explicit `context` prop?

**Recommended V3 approach:**
```typescript
// Add context prop to Navigation components
<Navigation 
  context="dashboard"  // → Dark sidebar, compact mode, fixed position
  items={dashboardNavItems} 
/>

<Navigation 
  context="marketing"  // → Light header, full-width, sticky scroll
  items={marketingNavItems}
/>
```

**Time:** Depends on your answer

---

## 📈 Material UI Integration Benefits (Your Question)

### Why Deeper MUI Integration?

**Current Pain Points:**
1. **Manual theme propagation** — Every component must manually handle light/dark
2. **Duplicate logic** — Color logic repeated across 45+ components
3. **Hard to maintain** — Changing a color requires touching many files
4. **No typesafety** — Hardcoded colors like `'#000f47'` have no IDE autocomplete

**Benefits of Deep MUI Integration:**

#### 1. Automatic Theme Switching
```tsx
// ❌ Current: Manual variant prop drilling
<Card variant="dark">
  <Button variant="dark">Click</Button>
</Card>

// ✅ With MUI theme: Automatic
<Card>  {/* Automatically uses theme.palette.background.paper */}
  <Button>Click</Button>  {/* Automatically uses theme.palette.primary.main */}
</Card>
```

#### 2. useTheme Hook Everywhere
```tsx
const MyComponent = () => {
  const theme = useTheme() // MUI hook - type-safe palette access
  
  return (
    <Box sx={{
      bgcolor: theme.palette.dashboard.card,     // Autocomplete ✅
      color: theme.palette.text.primary,         // Theme-aware ✅
      borderColor: theme.palette.divider,        // Dark mode works ✅
    }}>
```

#### 3. SX Prop Power (Best Feature)
```tsx
<Button sx={{
  bgcolor: 'primary.main',              // From theme palette
  '&:hover': { bgcolor: 'primary.dark' },
  color: 'primary.contrastText',
  [theme.breakpoints.down('sm')]: {     // Responsive
    width: '100%'
  }
}}>
```

#### 4. Built-in Responsive API
```tsx
<Box sx={{
  display: { xs: 'none', md: 'block' },  // Hide on mobile
  p: { xs: 2, md: 3 },                   // Responsive padding
  fontSize: { xs: '14px', md: '16px' },  // Responsive text
}}>
```

#### 5. Component Variants (Cool Feature)
Define custom variants ONCE in theme:
```typescript
// In theme.ts
const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashboard' },
          style: {
            backgroundColor: semanticColors.dashboardSurface,
            '&:hover': { backgroundColor: semanticColors.interactiveHover },
          }
        }
      ]
    }
  }
})

// Use anywhere
<Button variant="dashboard">Dashboard Action</Button>
```

#### 6. Theme Augmentation (TypeScript)
```typescript
// Add custom palette colors
declare module '@mui/material/styles' {
  interface Palette {
    dashboard: {
      surface: string
      card: string
    }
  }
}

// Now TypeScript knows about it
theme.palette.dashboard.surface // ✅ Autocomplete + type checking
```

**Bottom line:** MUI theme integration reduces boilerplate by ~80% and makes dark mode automatic instead of manual.

---

## 🛠️ Testing Your Changes

### After Each Fix, Run:

```bash
# 1. Token validation
npm run tokens:check

# 2. Role usage validation
npm run roles:check

# 3. Contrast validation
npm run tokens:contrast:all

# 4. Run tests
npm test

# 5. Visual check in Storybook
npm run storybook
# Toggle theme, check components

# 6. Build check
npm run build
```

---

## 📅 Suggested Timeline

| Day | Task | Est. Hours |
|-----|------|-----------|
| **Mon** | Fix theme.ts to use semantic tokens | 1h |
| | Add system theme detection | 0.5h |
| | Add dashboard/marketing context tokens | 1h |
| **Tue** | Consolidate legacy/MODE tokens (after brand approval) | 2h |
| | Start component audit (navigation + forms) | 3h |
| **Wed** | Continue component audit (data display) | 4h |
| | Fix highest-priority components | 2h |
| **Thu** | Fix remaining components | 4h |
| | Update Storybook stories | 2h |
| **Fri** | Testing (tokens, contrast, visual) | 2h |
| | Documentation updates | 2h |
| | PR review prep | 1h |

**Total: 24.5 hours (~3 days)**

---

## ❓ Questions to Unblock

Before proceeding, we need answers to:

1. **One Marsh Brand Color:** Is it MODE navy (#002c77) or legacy midnight (#000f47)?
2. **Dashboard vs Marketing:** Where is this distinction made? Routing? Props? Future feature?
3. **Token Naming Convention:** Keep "Mode" suffix or rename for V3?
4. **Breaking Changes:** Can we deprecate `variant` props or must maintain backward compatibility?

**Recommendation:** Schedule 30min kickoff meeting to align on these decisions.

---

## 🎯 Success Criteria (End of Week)

- [ ] ✅ All MUI components use semantic tokens (not primitives)
- [ ] ✅ System theme preference detection working
- [ ] ✅ Dashboard/marketing context tokens defined
- [ ] ✅ Top 10 components work perfectly in light + dark mode
- [ ] ✅ No governance violations (`npm run roles:check` passes)
- [ ] ✅ All contrast checks pass (`npm run tokens:contrast:all`)
- [ ] ✅ Storybook stories have theme toggle
- [ ] ✅ Dark mode sidebar working (✅ already done!)

---

**Ready to start?** Pick one task and let's execute! 🚀
