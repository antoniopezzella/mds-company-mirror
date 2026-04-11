# MDS V3 Strategic Plan: B2B Dashboard Excellence & One Marsh Brand Readiness

**Version:** 1.0  
**Date:** March 17, 2026  
**Target:** MDS V3 launch aligned with One Marsh brand (2027)  
**Status:** 🟡 Planning Phase

---

## 📋 Executive Summary

This strategic plan outlines the roadmap to transform the Marsh Design System from its current V2 state to V3, focusing on:
1. **B2B Dashboard Optimization** — Enhanced component library for enterprise dashboards
2. **Light/Dark Mode Excellence** — Complete theming architecture with Material UI integration
3. **Semantic Token Refinement** — Improved semantic layer for One Marsh brand transition
4. **Navigation System Expansion** — Dashboard and Marketing variants with context-aware theming
5. **Component Library Maturity** — Better MUI integration and atomic design patterns

---

## 🎯 Current State Assessment

### ✅ Strengths (Keep & Build Upon)

**Token Architecture:**
- ✅ Solid 14-stop primitive palettes (Blue, Gold, Green, Red, Purple, Gray, Neutral)
- ✅ 3-tier system: Primitives → Semantics → Roles
- ✅ Dark mode infrastructure via `semanticDarkOverrides`
- ✅ Governance workflows (contrast validation, role checking)

**Component Library:**
- ✅ MUI 7 integration established
- ✅ React 19 + TypeScript foundation
- ✅ Basic light/dark variant support in key components
- ✅ Navigation system with dual variants

**Tooling:**
- ✅ Token build pipeline
- ✅ GSAP animation integration
- ✅ Storybook documentation
- ✅ CI/CD governance checks

### ⚠️ Pain Points (Address in V3)

**Semantic Layer:**
- ⚠️ Dual token system (legacy vs MODE) causes confusion
- ⚠️ Not aligned with One Marsh brand (still using legacy midnight blue #000f47)
- ⚠️ Incomplete coverage of dashboard-specific use cases
- ⚠️ Missing context-specific semantic tokens (e.g., `dashboard.surface`, `marketing.accent`)

**Light/Dark Mode:**
- ⚠️ Material UI theme not fully leveraging semantic tokens
- ⚠️ Components using manual variant props instead of theme-aware patterns
- ⚠️ Inconsistent dark mode implementation across components
- ⚠️ Missing system preference detection

**Component Integration:**
- ⚠️ MUI theme customization incomplete
- ⚠️ No component-level theme context switching
- ⚠️ Navigation variants hardcoded (dark/light) instead of contextual (dashboard/marketing)
- ⚠️ Missing dashboard-specific component variants

---

## 🗺️ MDS V3 Roadmap

### Phase 1: Token System Evolution (Q2 2026 - 2 months)

#### 1.1 Consolidate Semantic Tokens
**Goal:** Eliminate legacy/MODE duality, adopt One Marsh brand colors

**Actions:**
- [ ] Remove all "legacy" token references
- [ ] Promote MODE tokens (`blue1100: #002c77`) to primary brand color
- [ ] Rename MODE tokens to standard names (remove "Mode" suffix)
- [ ] Update Figma sync to use One Marsh brand variables
- [ ] Create migration guide for components

**New Semantic Structure:**
```typescript
// Brand (One Marsh)
brandPrimary: ref('blue1100'),      // #002c77 — One Marsh Navy
brandSecondary: ref('blue400'),     // #95caff — Light Sky (accent)
brandAccent: ref('focusCyan'),      // #009de0 — Cyan (focus/CTA)

// Context-specific surfaces
dashboardSurface: ref('neutral50'), // #f8f8f8 — Dashboard default bg
dashboardCard: ref('white'),        // Card backgrounds
marketingSurface: ref('white'),     // Marketing pages bg
marketingHero: ref('blue1100'),     // Hero sections
```

#### 1.2 Dashboard-Specific Semantic Tokens
**Goal:** Create purpose-built tokens for B2B dashboard experiences

**New Token Categories:**
```typescript
// Dashboard surfaces
dashboard: {
  surface: {
    default: ref('neutral50'),      // Page background
    card: ref('white'),             // Card/widget background
    elevated: ref('white'),         // Elevated cards (with shadow)
    navigation: ref('blue1100'),    // Sidebar background
    header: ref('white'),           // Top header
  },
  border: {
    default: ref('neutral250'),     // Card borders
    strong: ref('neutral500'),      // Section dividers
    focus: ref('focusCyan'),        // Focus states
  },
  text: {
    primary: ref('neutral950'),     // Body text
    secondary: ref('neutral700'),   // Muted text
    inverse: ref('white'),          // On dark surfaces
    link: ref('blue750'),           // Links
  }
}

// Marketing surfaces
marketing: {
  surface: {
    default: ref('white'),
    hero: ref('blue1100'),
    accent: ref('blue50'),
    elevated: ref('neutral50'),
  }
}
```

#### 1.3 Enhanced Status & Feedback Tokens
**Goal:** B2B dashboard requires richer status/data visualization colors

**New Additions:**
```typescript
// Data visualization
data: {
  positive: ref('green500'),        // Positive trend
  negative: ref('red500'),          // Negative trend
  neutral: ref('neutral500'),       // Neutral/no change
  highlight: ref('blue500'),        // Highlighted data
  comparison: ref('purple500'),     // Comparison line
}

// Dashboard metrics
metrics: {
  kpi: {
    positive: ref('green600'),
    negative: ref('red600'),
    neutral: ref('neutral600'),
  }
}
```

---

### Phase 2: Material UI Deep Integration (Q2 2026 - 1 month)

#### 2.1 Theme Architecture Upgrade
**Goal:** Make MUI theme fully semantic-token-aware with automatic light/dark switching

**Current Issue:**
```typescript
// src/theme.ts - Currently partial integration
const theme = createTheme({
  palette: {
    primary: { main: '#000f47' },  // ❌ Hardcoded
    secondary: { main: '#ceecff' }  // ❌ Hardcoded
  }
})
```

**V3 Approach:**
```typescript
// src/theme.ts - Full semantic integration
import { semanticColors, semanticDarkOverrides } from './semantic-tokens'

function createMDSTheme(mode: 'light' | 'dark') {
  const colors = mode === 'dark' 
    ? { ...semanticColors, ...semanticDarkOverrides }
    : semanticColors

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.brandPrimary,
        light: colors.brandSecondary,
        dark: colors.brandPrimary,
        contrastText: colors.textOnAccent,
      },
      secondary: {
        main: colors.interactiveSecondary,
        light: colors.interactiveSecondaryHover,
        dark: colors.interactiveSecondaryActive,
      },
      background: {
        default: colors.surfaceDefault,
        paper: colors.surfaceSubtle,
      },
      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
        disabled: colors.textDisabled,
      },
      divider: colors.borderDefault,
      // Custom dashboard palette
      dashboard: {
        surface: colors.dashboardSurface,
        card: colors.dashboardCard,
        navigation: colors.surfaceNavigation,
      }
    },
    typography: {
      // Use Noto Sans from tokens
      fontFamily: '"Noto Sans", "Helvetica", "Arial", sans-serif',
    },
    spacing: 8, // Aligned with MDS spacing system
  })
}

export const lightTheme = createMDSTheme('light')
export const darkTheme = createMDSTheme('dark')
```

#### 2.2 System Preference Detection
**Goal:** Auto-detect user's OS theme preference

**Implementation:**
```typescript
// src/theme/ThemeModeContext.tsx - Enhanced
export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    // 1. Check localStorage
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
      localStorage.setItem('mds-theme-mode', next)
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

#### 2.3 Component-Level Theme Awareness
**Goal:** Remove manual `variant` props, use MUI theme mode

**Before (V2):**
```tsx
<SideNavigation items={items} variant="light" />
```

**After (V3):**
```tsx
// Component reads theme mode automatically
<SideNavigation items={items} />

// Implementation
const SideNavigation = ({ items }: Props) => {
  const theme = useTheme()
  const colors = useMemo(() => ({
    bg: theme.palette.background.paper,
    text: theme.palette.text.primary,
    hover: theme.palette.action.hover,
  }), [theme])
  
  return <Box sx={{ bgcolor: colors.bg }}>...</Box>
}
```

---

### Phase 3: Navigation System Expansion (Q3 2026 - 2 weeks)

#### 3.1 Context-Aware Navigation Variants
**Goal:** Replace `variant="dark"|"light"` with `context="dashboard"|"marketing"`

**New Navigation Component API:**
```typescript
export interface NavigationProps {
  items: NavItem[]
  /** Navigation context determines theming and behavior */
  context: 'dashboard' | 'marketing'
  /** Optional: Override default compact/expanded state */
  compact?: boolean
  onItemClick?: (item: NavItem) => void
}

// Usage
<Navigation context="dashboard" items={dashboardNavItems} />
<Navigation context="marketing" items={marketingNavItems} />
```

**Context-Specific Theming:**
```typescript
const getNavigationStyles = (context: 'dashboard' | 'marketing', theme: Theme) => {
  if (context === 'dashboard') {
    return {
      bg: theme.palette.dashboard.navigation,
      text: theme.palette.text.inverse,
      hover: alpha(theme.palette.common.white, 0.1),
      active: alpha(theme.palette.common.white, 0.2),
      border: 'none',
    }
  }
  
  // Marketing context
  return {
    bg: theme.palette.background.paper,
    text: theme.palette.text.primary,
    hover: theme.palette.action.hover,
    active: theme.palette.action.selected,
    border: `1px solid ${theme.palette.divider}`,
  }
}
```

#### 3.2 Dashboard-Specific Navigation Features
**Goal:** Add features needed for B2B dashboards

**New Features:**
- Collapsible sidebar with persistence
- Icon-only compact mode
- Nested navigation up to 3 levels
- Active route highlighting with React Router integration
- Keyboard navigation (Tab, Arrow keys, Enter)
- ARIA landmarks and labels

---

### Phase 4: Component Library Expansion (Q3 2026 - 2 months)

#### 4.1 Dashboard Component Kit
**Goal:** Build specialized components for B2B dashboards

**New Components:**
```
src/components/dashboard/
├── KPICard/              # Metric display with trend
├── DataTable/            # Enhanced AG Grid wrapper
├── ChartCard/            # Card wrapper for charts
├── FilterBar/            # Advanced filtering UI
├── QuickActions/         # Floating action menu
├── NotificationCenter/   # Notification dropdown
├── UserMenu/             # User profile dropdown
└── DashboardLayout/      # Layout template
```

**Example: KPICard Component**
```tsx
export interface KPICardProps {
  label: string
  value: string | number
  /** Trend: 'up' | 'down' | 'neutral' */
  trend?: 'up' | 'down' | 'neutral'
  /** Change amount (e.g., "+12.3%") */
  change?: string
  /** Optional sparkline data */
  sparkline?: { value: number }[]
  /** Optional comparison label */
  comparisonLabel?: string
}

export function KPICard({ 
  label, 
  value, 
  trend, 
  change, 
  sparkline 
}: KPICardProps) {
  const theme = useTheme()
  
  const trendColor = trend === 'up' 
    ? theme.palette.success.main
    : trend === 'down'
    ? theme.palette.error.main
    : theme.palette.text.secondary
  
  return (
    <Card sx={{ p: 3, bgcolor: theme.palette.dashboard.card }}>
      <Typography variant="overline" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h3" sx={{ mt: 1, mb: 2 }}>
        {value}
      </Typography>
      {change && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendIcon trend={trend} sx={{ color: trendColor }} />
          <Typography variant="body2" sx={{ color: trendColor }}>
            {change}
          </Typography>
        </Box>
      )}
      {sparkline && <Sparkline data={sparkline} color={trendColor} />}
    </Card>
  )
}
```

#### 4.2 Light/Dark Mode Component Audit
**Goal:** Ensure all components work perfectly in both modes

**Audit Checklist:**
- [ ] Button (all variants)
- [ ] Input fields (TextField, Select, etc.)
- [ ] Navigation (Dashboard, Marketing)
- [ ] Cards (default, elevated, outlined)
- [ ] DataGrid/Table
- [ ] Modal/Dialog
- [ ] Tabs
- [ ] Accordion
- [ ] Chips/Tags
- [ ] Tooltips
- [ ] Dropdown menus
- [ ] Status badges
- [ ] Charts (ensure readable in both modes)

**Testing Strategy:**
```bash
# Add theme toggle to all Storybook stories
export default {
  title: 'Components/KPICard',
  component: KPICard,
  parameters: {
    backgrounds: { default: 'light' }, // Test both
  },
  argTypes: {
    theme: {
      control: { type: 'radio', options: ['light', 'dark'] }
    }
  }
}
```

---

### Phase 5: Documentation & Migration (Q4 2026 - 1 month)

#### 5.1 Migration Guide
**Goal:** Help teams migrate from V2 to V3

**Topics:**
1. Token changes (legacy → One Marsh)
2. Component API changes (variant props → theme-aware)
3. Theme provider setup
4. Dark mode implementation
5. Navigation context usage
6. Breaking changes and deprecations

#### 5.2 Enhanced Storybook Documentation
**Goal:** Better component discovery and usage examples

**New Documentation Pages:**
- **Dashboard Patterns** — Common B2B dashboard layouts
- **Theme Customization** — How to extend MDS themes
- **Dark Mode Best Practices** — Designing for both modes
- **Token Decision Tree** — When to use which token
- **Component Composition** — Building complex UIs from atoms

---

## 🎨 Material UI Integration Benefits

### Why Deeper MUI Integration Matters

**Current State:**
- Components manually handle theme switching
- Duplicate styling logic across components
- Hard to maintain consistent theming

**With Deep MUI Integration:**

#### 1. **Automatic Theme Propagation**
```tsx
// No need to pass theme props manually
<ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
  <App /> {/* All components automatically get correct theme */}
</ThemeProvider>
```

#### 2. **useTheme Hook Everywhere**
```tsx
const MyComponent = () => {
  const theme = useTheme() // MUI hook
  return (
    <Box sx={{
      bgcolor: theme.palette.background.paper, // Automatic light/dark
      color: theme.palette.text.primary,
    }}>
      Content
    </Box>
  )
}
```

#### 3. **Built-in Responsive Utilities**
```tsx
<Box sx={{
  display: { xs: 'none', md: 'block' }, // Hide on mobile
  p: { xs: 2, md: 3 },                  // Responsive padding
}}>
```

#### 4. **SX Prop Power**
```tsx
<Button sx={{
  bgcolor: 'primary.main',              // From theme
  '&:hover': { bgcolor: 'primary.dark' },
  color: 'primary.contrastText',
  [theme.breakpoints.down('sm')]: {     // Responsive
    width: '100%'
  }
}}>
```

#### 5. **Component Variants**
```tsx
// Define once in theme
const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashboard' },
          style: {
            backgroundColor: semanticColors.dashboardSurface,
            color: semanticColors.textPrimary,
          }
        }
      ]
    }
  }
})

// Use anywhere
<Button variant="dashboard">Dashboard Action</Button>
```

---

## 🔄 Component Library Connection Strategy

### Problem: Disconnected Components
Currently components don't share common patterns, leading to:
- Inconsistent styling
- Duplicate code
- Hard to maintain
- Difficult to theme

### Solution: Layered Architecture

```
┌─────────────────────────────────────────┐
│           Pages (Dashboard)             │
│  Uses: Templates + specific content     │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│        Templates (DashboardLayout)      │
│  Uses: Organisms + layout structure     │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│    Organisms (Navigation, DataTable)    │
│  Uses: Molecules + complex logic        │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│   Molecules (SearchBar, FilterChip)     │
│  Uses: Atoms + simple composition       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      Atoms (Button, Input, Icon)        │
│  Uses: MUI primitives + MDS theme       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│          MUI + MDS Theme                │
│  Semantic tokens + role colors          │
└─────────────────────────────────────────┘
```

### Implementation Steps

#### 1. Create Base Component System
```typescript
// src/components/base/BaseCard.tsx
export const BaseCard = styled(MuiCard)(({ theme }) => ({
  backgroundColor: theme.palette.dashboard.card,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3),
  transition: 'all 0.2s ease',
  
  '&:hover': {
    boxShadow: theme.shadows[2],
  }
}))

// All card variants extend BaseCard
export const KPICard = ({ children, ...props }: KPICardProps) => (
  <BaseCard {...props}>
    {children}
  </BaseCard>
)
```

#### 2. Shared Hooks Library
```typescript
// src/hooks/useComponentTheme.ts
export function useComponentTheme(component: 'navigation' | 'card' | 'table') {
  const theme = useTheme()
  const mode = theme.palette.mode
  
  return useMemo(() => {
    const configs = {
      navigation: {
        bg: theme.palette.dashboard.navigation,
        text: theme.palette.text.inverse,
      },
      card: {
        bg: theme.palette.dashboard.card,
        text: theme.palette.text.primary,
      },
      table: {
        headerBg: theme.palette.background.default,
        rowHover: theme.palette.action.hover,
      }
    }
    return configs[component]
  }, [theme, component])
}
```

#### 3. Composition Patterns
```tsx
// Dashboard page uses composition
export function DashboardPage() {
  return (
    <DashboardLayout
      navigation={<Navigation context="dashboard" items={navItems} />}
      header={<DashboardHeader />}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <KPICard label="Revenue" value="$1.2M" trend="up" />
        </Grid>
        <Grid item xs={12} md={9}>
          <ChartCard title="Monthly Trends">
            <LineChart data={data} />
          </ChartCard>
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}
```

---

## 📅 Timeline & Milestones

| Phase | Duration | Target Date | Deliverables |
|-------|----------|-------------|--------------|
| **Phase 1: Token Evolution** | 2 months | May 2026 | V3 semantic tokens, One Marsh brand integration |
| **Phase 2: MUI Integration** | 1 month | June 2026 | Enhanced theme system, auto light/dark |
| **Phase 3: Navigation Expansion** | 2 weeks | Mid June 2026 | Dashboard/Marketing nav contexts |
| **Phase 4: Component Library** | 2 months | August 2026 | 15+ new dashboard components |
| **Phase 5: Documentation** | 1 month | September 2026 | Migration guide, enhanced Storybook |
| **V3 Beta Release** | - | October 2026 | Internal testing |
| **V3 Production Release** | - | Q1 2027 | Aligned with One Marsh brand launch |

---

## 🚦 Success Metrics

### Token System
- ✅ 0 legacy token references in codebase
- ✅ 100% One Marsh brand alignment
- ✅ <50 semantic tokens (simplified from current)
- ✅ 100% WCAG AA contrast compliance

### Component Library
- ✅ 20+ dashboard-specific components
- ✅ 100% components work in light + dark mode
- ✅ 90%+ Lighthouse accessibility scores
- ✅ <3s component render time (95th percentile)

### Developer Experience
- ✅ <5min to add new component
- ✅ <1hr to migrate V2 → V3 component
- ✅ 100% TypeScript coverage
- ✅ 80%+ Storybook documentation coverage

### Adoption
- ✅ 5+ dashboard implementations using MDS V3
- ✅ 90%+ developer satisfaction score
- ✅ <10 governance violations per PR

---

## 🛠️ Immediate Action Items (This Week)

### 1. Token Audit (1 day)
```bash
# Run this command to identify legacy token usage
npm run roles:check
grep -r "blue1000" src/components
grep -r "000f47" src/
```

### 2. Create V3 Branch (30 min)
```bash
git checkout -b feature/mds-v3-token-migration
```

### 3. Propose Semantic Token Changes (2 days)
- Document proposed V3 semantic token structure
- Get stakeholder feedback
- Create Figma V3 token collection

### 4. MUI Theme Prototype (1 day)
- Create `src/theme/v3/theme.ts`
- Implement full semantic token integration
- Test with 3 existing components

### 5. Navigation Variant Prototype (2 days)
- Create `context="dashboard"|"marketing"` prop
- Implement theme-aware styling
- Add Storybook story with toggle

---

## 📚 Reference Implementation

### Complete Theme File Example
```typescript
// src/theme/v3/theme.ts
import { createTheme, ThemeOptions } from '@mui/material/styles'
import { semanticColors, semanticDarkOverrides } from '../../semantic-tokens'

declare module '@mui/material/styles' {
  interface Palette {
    dashboard: {
      surface: string
      card: string
      navigation: string
    }
    marketing: {
      hero: string
      accent: string
    }
  }
  interface PaletteOptions {
    dashboard?: {
      surface?: string
      card?: string
      navigation?: string
    }
    marketing?: {
      hero?: string
      accent?: string
    }
  }
}

export function createMDSTheme(mode: 'light' | 'dark'): Theme {
  const colors = mode === 'dark'
    ? { ...semanticColors, ...semanticDarkOverrides }
    : semanticColors

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: colors.brandPrimary,
        light: colors.brandSecondary,
        contrastText: colors.textOnAccent,
      },
      secondary: {
        main: colors.interactiveSecondary,
        light: colors.interactiveSecondaryHover,
        dark: colors.interactiveSecondaryActive,
      },
      background: {
        default: colors.surfaceDefault,
        paper: colors.surfaceSubtle,
      },
      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
        disabled: colors.textDisabled,
      },
      divider: colors.borderDefault,
      dashboard: {
        surface: colors.surfaceSubtle,
        card: colors.surfaceDefault,
        navigation: colors.surfaceNavigation,
      },
      marketing: {
        hero: colors.surfaceHero,
        accent: colors.surfaceAccent,
      },
    },
    typography: {
      fontFamily: '"Noto Sans", "Helvetica", "Arial", sans-serif',
      h1: { fontFamily: '"MMC Display", serif' },
      h2: { fontFamily: '"MMC Display", serif' },
      h3: { fontFamily: '"MMC Display", serif' },
    },
    spacing: 8,
    shape: {
      borderRadius: 4,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  }

  return createTheme(themeOptions)
}

export const lightTheme = createMDSTheme('light')
export const darkTheme = createMDSTheme('dark')
```

---

## 🤝 Stakeholder Approval Needed

| Decision | Owner | Status | Due Date |
|----------|-------|--------|----------|
| One Marsh brand color approval | Brand Team | 🟡 Pending | April 15 |
| V3 timeline approval | Product | 🟡 Pending | March 20 |
| Navigation context naming | UX Team | 🟡 Pending | March 25 |
| Dashboard component priority | Engineering | 🟡 Pending | April 1 |

---

## 📞 Next Steps

1. **Review this plan** with stakeholders (Brand, Product, UX, Engineering)
2. **Prioritize quick wins** (MUI theme integration, system preference detection)
3. **Create V3 token proposal** with One Marsh brand colors
4. **Prototype navigation variants** (dashboard/marketing contexts)
5. **Schedule weekly sync** to track progress

---

**Questions? Contact:** Design System Team  
**Last Updated:** March 17, 2026  
**Next Review:** March 31, 2026
