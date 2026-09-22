# Insurance Dashboard - Quick Start

## ✅ Created Successfully!

Your comprehensive insurance dashboard is ready to use.

## 🚀 View the Dashboard

### Option 1: Storybook (Recommended)
```
http://localhost:6006/?path=/story/projects-insurance-dashboard-full-dashboard--default
```

### Option 2: Dev Server
```
http://localhost:5173/insurance-dashboard
```

## 📦 What's Included

### Components Built:

1. **DashboardMetrics** - KPI cards with trends
   - Total Premiums
   - Active Policies
   - Open Claims
   - Risk Score

2. **RecentClaims** - Claims list with status
   - Sortable by status
   - Priority indicators
   - Avatar initials
   - Click-to-view details

3. **RiskOverview** - Visual risk assessment
   - Property Risk
   - Cyber Risk
   - Liability Risk
   - Financial Risk

4. **QuickActions** - Fast access buttons
   - New Policy
   - File Claim
   - Risk Assessment
   - Add Client

5. **InsuranceDashboard** - Complete page composition

## 🎨 Design Features

- **Fully Responsive**: Mobile, tablet, desktop optimized
- **Marsh Design System**: Uses official tokens (Gold-750, Midnight-1000, etc.)
- **Interactive**: Hover effects, animations, transitions
- **Accessible**: Proper color contrast, semantic HTML
- **Theme Support**: Light/dark mode ready

## 📊 Sample Data

The dashboard includes realistic sample data:
- $2.4M in premiums (+12.5%)
- 1,247 active policies (+8.3%)
- 34 open claims (-15.2%)
- Risk score: 72/100 (+5.1%)

## 🔧 Customize

All components accept props for custom data:

```tsx
<InsuranceDashboard userName="John Smith" />

<DashboardMetrics
  metrics={{
    totalPremiums: '$3.5M',
    premiumsChange: 18.2,
  }}
/>
```

## 📁 File Structure

```
src/projects/insurance-dashboard/
├── components/
│   ├── DashboardMetrics.tsx
│   ├── RecentClaims.tsx
│   ├── RiskOverview.tsx
│   └── QuickActions.tsx
├── pages/
│   ├── InsuranceDashboard.tsx
│   └── InsuranceDashboard.stories.tsx
├── index.ts
└── README.md
```

## 🎯 Next Steps

1. **View in Storybook**: See all variants and documentation
2. **Test Responsive**: Resize browser to see mobile/tablet layouts
3. **Customize Data**: Replace sample data with real API calls
4. **Add Navigation**: Link quick actions to actual routes
5. **Integrate Backend**: Connect to your insurance data API

## 🐛 Troubleshooting

If you see white screens:
1. Refresh browser (Cmd+R / Ctrl+R)
2. Check browser console for errors (F12)
3. Ensure servers are running:
   - Vite: http://localhost:5173
   - Storybook: http://localhost:6006

Enjoy your new Insurance Dashboard! 🎉
