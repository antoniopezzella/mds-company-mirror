# Insurance Dashboard - MDS Implementation Guide

## 📊 Overview

A production-ready insurance dashboard built using **30+ MDS Code Connect components** from the Marsh Design System. This dashboard demonstrates best practices for building enterprise B2B applications with proper token governance, accessibility, and responsive design.

---

## 🎯 Figma Source

**Original Design File:**
- File Key: `O3BWh3pilhsyWHnK6kbcCt`
- Node ID: `1126:26`
- Canvas: "✅ Dashboard - Code Connect Components"
- URL: https://www.figma.com/design/O3BWh3pilhsyWHnK6kbcCt/Marsh-One---Phase-1.5?node-id=1126-26

**MDS Component Library:**
- File Key: `uWlcofRor5Dik8LBnJbIjo`
- Library: V2 - MDS COMPONENTS

---

## 🏗️ Dashboard Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Header (Code Connect)                                       │
│ • Navigation • Search • User Profile                        │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ Page Title & Breadcrumbs                                    │
│ "Welcome back, [User]"                                      │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ System Alert (Code Connect)                                 │
│ "Maintenance Scheduled..."                                  │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ Tabs (Code Connect)                                         │
│ Overview | Policies | Claims | Analytics | Reports          │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ TAB: OVERVIEW                                               │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ KPI Metrics Grid (ChartMetricCard × 4)               │   │
│ │ ┌─────────┬─────────┬─────────┬─────────┐          │   │
│ │ │ Total   │ Active  │ Claims  │ Renewal │          │   │
│ │ │ Premium │ Policies│ Pending │ Rate    │          │   │
│ │ │ $2.4M ↑ │ 1,247 ↑ │ 23 ↓    │ 94.2% ↑ │          │   │
│ │ └─────────┴─────────┴─────────┴─────────┘          │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌──────────────┬──────────────────────────────────────┐   │
│ │ Quick Actions│ Recent Policies (Card + Table)       │   │
│ │ (Card)       │ ┌──────────┬─────────┬──────┬────┐  │   │
│ │ • Create     │ │ Policy # │ Client  │ Type │ $$ │  │   │
│ │   Policy     │ ├──────────┼─────────┼──────┼────┤  │   │
│ │ • Process    │ │ POL-1001 │ Acme    │ Prop │125k│  │   │
│ │   Claim      │ │ POL-1002 │ Global  │ Liab │250k│  │   │
│ │ • Generate   │ │ POL-1003 │ Tech    │ Cyber│ 85k│  │   │
│ │   Report     │ └──────────┴─────────┴──────┴────┘  │   │
│ └──────────────┴──────────────────────────────────────┘   │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ Policies Requiring Attention (Table)                │   │
│ │ ┌──────────┬─────────┬──────┬───────┬────────┬───┐ │   │
│ │ │ Policy # │ Client  │ Type │ $$    │ Status │ ... │   │
│ │ ├──────────┼─────────┼──────┼───────┼────────┼───┤ │   │
│ │ │ POL-1003 │ Tech Sol│ Cyber│ $85k  │ Pending│   │ │   │
│ │ │ POL-1005 │ Retail  │ Prop │ $95k  │ Renewal│   │ │   │
│ │ └──────────┴─────────┴──────┴───────┴────────┴───┘ │   │
│ └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 MDS Components Used

### Navigation (Code Connect)
- **Header** (`src/figma/Header.figma.tsx`)
  - Variant: `application`
  - Props: `showSearch`, `showProfile`
  
- **Tabs** (`src/figma/Tabs.figma.tsx`)
  - 5 tabs: Overview, Policies, Claims, Analytics, Reports
  - Active state tracking

### Data Display (Code Connect)
- **ChartMetricCard** (`src/figma/ChartMetricCard.figma.tsx`)
  - KPI display with trend indicators
  - Props: `title`, `value`, `trend`, `subtitle`
  
- **Table** (`src/figma/Table.figma.tsx`)
  - Policy listings with columns
  - Props: `columns`, `rows`
  
- **Card** (`src/figma/Card.figma.tsx`)
  - Quick actions container
  - Recent policies wrapper
  - Orientation: `vertical` / `horizontal`

### Feedback (Code Connect)
- **Alert** (`src/figma/Alert.figma.tsx`)
  - System notifications
  - Severity: `info`, `warning`, `success`, `error`
  
- **Button** (`src/figma/Button.figma.tsx`)
  - Action triggers
  - Variants: `primary`, `outline`, `ghost`

---

## 🎨 Token Usage (CLAUDE.md Compliance)

### ✅ Correct Pattern (Used in Implementation)

```typescript
import { getRoleColor } from '../../../theme/roles';

// ✅ Colors via role tokens
sx={{
  backgroundColor: getRoleColor('bg.default'),
  color: getRoleColor('fg.primary'),
  borderBottom: `1px solid ${getRoleColor('border.default')}`,
}}

// ✅ Spacing via theme.spacing()
sx={{
  py: 3,
  mt: 3,
  mb: 4,
}}

// ✅ Typography via MUI variants
<Typography variant="h3" sx={{ color: getRoleColor('fg.primary') }}>
  Dashboard Title
</Typography>
```

### ❌ Anti-Patterns (NOT used)

```typescript
// ❌ Hardcoded hex colors
backgroundColor: '#000f47'  // NEVER

// ❌ Direct token imports
import { tokens } from '@/tokens';  // FORBIDDEN

// ❌ Inline pixel values
padding: '24px'  // Use spacing tokens
```

---

## 📦 Component Props Interface

```typescript
export interface InsuranceDashboardProps {
  /** Dashboard title (default: "Insurance Dashboard") */
  title?: string;
  
  /** User display name for welcome message */
  userName?: string;
  
  /** Show header navigation (default: true) */
  showHeader?: boolean;
}
```

---

## 🚀 Usage Examples

### Basic Usage

```tsx
import { InsuranceDashboard } from '@/components/sections/InsuranceDashboard';

function App() {
  return (
    <InsuranceDashboard
      title="Insurance Dashboard"
      userName="John Smith"
      showHeader={true}
    />
  );
}
```

### Custom Title

```tsx
<InsuranceDashboard
  title="Commercial Lines Dashboard"
  userName="Jane Doe"
/>
```

### Embedded (No Header)

```tsx
<InsuranceDashboard
  title="Policy Summary"
  userName="Manager"
  showHeader={false}
/>
```

### With Theme Provider

```tsx
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '@/theme';

<ThemeProvider theme={lightTheme}>
  <InsuranceDashboard />
</ThemeProvider>
```

---

## 📊 Sample Data Structure

### KPI Metrics

```typescript
const metrics = [
  {
    title: 'Total Premium',
    value: '$2.4M',
    trend: { value: 12.5, direction: 'up' },
    subtitle: 'vs. last quarter',
  },
  // ... more metrics
];
```

### Policy Table Data

```typescript
const policyRows = [
  {
    id: 1,
    policyNumber: 'POL-2024-1001',
    clientName: 'Acme Corporation',
    type: 'Property',
    premium: '$125,000',
    status: 'Active',
    renewalDate: '2024-12-15',
  },
  // ... more rows
];
```

---

## 🎪 Storybook Stories

Run Storybook to view all dashboard variants:

```bash
npm run storybook
```

### Available Stories

1. **Default** - Full dashboard with all sections
2. **WithoutHeader** - Embedded mode (no global header)
3. **CustomTitle** - Custom page title
4. **ExecutiveSummary** - High-level KPI focus

Navigate to: **Sections > InsuranceDashboard** in Storybook UI.

---

## 🧪 Governance Validation

### Run Checks Before Committing

```bash
# 1. Role token usage validation
npm run roles:check

# 2. Color contrast validation (WCAG AA)
npm run tokens:contrast:all

# 3. Full governance suite
npm run governance:ci

# 4. TypeScript compilation
npm run build
```

### Expected Results

✅ **All checks should pass:**
- No direct `tokens.*` or `semanticColors.*` imports
- All text-on-background pairs meet WCAG AA (4.5:1)
- TypeScript compilation successful

---

## 🔧 Customization Guide

### Adding New KPIs

```typescript
// Add to metrics array in InsuranceDashboard.tsx
const newMetric = {
  title: 'Average Response Time',
  value: '2.3 days',
  trend: { value: 15, direction: 'down' },
  subtitle: 'Claims processing',
};
```

### Adding Table Columns

```typescript
// Add to policyColumns array
const newColumn = {
  field: 'underwriter',
  headerName: 'Underwriter',
  width: 150,
};
```

### Changing Tab Content

Modify the tab rendering logic in the component:

```typescript
{activeTab === 'yourNewTab' && (
  <YourCustomContent />
)}
```

---

## 📱 Responsive Behavior

### Breakpoints (MUI)

- **xs**: 0px (mobile)
- **sm**: 600px (tablets)
- **md**: 900px (small desktops)
- **lg**: 1200px (desktops)
- **xl**: 1536px (large screens)

### Grid Behavior

```typescript
// KPI Cards: 1 column mobile → 2 columns tablet → 4 columns desktop
<Grid item xs={12} sm={6} lg={3}>
  <ChartMetricCard {...metric} />
</Grid>

// Quick Actions: Full width mobile → 4 columns desktop
<Grid item xs={12} md={4}>
  <Card>Quick Actions</Card>
</Grid>
```

---

## ♿ Accessibility

### WCAG AA Compliance

- ✅ Color contrast ratios ≥ 4.5:1 (text)
- ✅ Color contrast ratios ≥ 3:1 (UI components)
- ✅ Focus indicators on interactive elements
- ✅ Semantic HTML (`<section>`, `<nav>`, `<main>`)
- ✅ ARIA labels where needed

### Keyboard Navigation

- Tab through interactive elements
- Enter/Space to activate buttons
- Arrow keys for table navigation (via DataGrid)

---

## 🐛 Troubleshooting

### Issue: Colors not displaying

**Cause:** Missing role token  
**Fix:** Check `src/theme/roles.ts` for available roles

```typescript
// If role doesn't exist, add it:
export type RoleName =
  | 'fg.primary'
  | 'your.new.role'; // Add here

const ROLE_MAP = {
  'your.new.role': { semantic: 'yourSemanticToken', description: '...' },
};
```

### Issue: Spacing looks wrong

**Cause:** Incorrect spacing index  
**Fix:** Use MUI spacing scale

```typescript
// Spacing scale: [4, 8, 12, 16, 20, 24, 32, 40, ...]
sx={{ p: 3 }}  // 16px (spacing[3])
sx={{ mb: 4 }} // 20px (spacing[4])
```

### Issue: Component not found

**Cause:** Missing barrel export  
**Fix:** Check `src/components/sections/index.ts`

```typescript
export { InsuranceDashboard } from './InsuranceDashboard';
```

---

## 📚 Related Documentation

- [CLAUDE.md](../../../CLAUDE.md) - MDS integration rules
- [Token Request Process](../../../docs/TOKEN_REQUEST_PROCESS.md)
- [Figma Code Connect Guide](../../../docs/FIGMA_CODE_CONNECT_GUIDE.md)
- [Component Library Summary](../../../docs/archive/COMPONENT_LIBRARY_SUMMARY.md) (archived, historical)

---

## 🔄 Next Steps

### To View in Storybook

```bash
npm run storybook
# → Navigate to Sections > InsuranceDashboard
```

### To Integrate in Your App

```tsx
import { InsuranceDashboard } from '@/components/sections';

<InsuranceDashboard
  title="My Dashboard"
  userName="Your Name"
/>
```

### To Connect to Real Data

Replace sample data arrays with API calls:

```typescript
const { data: metrics } = useQuery('kpi-metrics', fetchMetrics);
const { data: policies } = useQuery('policies', fetchPolicies);
```

---

**Created:** April 24, 2026  
**MDS Version:** 2.0  
**Status:** ✅ Ready for Integration
