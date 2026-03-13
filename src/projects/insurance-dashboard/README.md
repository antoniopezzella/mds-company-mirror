# Insurance Dashboard

A comprehensive insurance dashboard for Marsh featuring real-time metrics, claims management, and risk assessment.

## Components

### 1. **DashboardMetrics** 
KPI cards showing:
- Total Premiums with trend
- Active Policies count
- Open Claims status
- Risk Score overview

**Features:**
- Hover elevation effect
- Trend indicators (up/down arrows)
- Color-coded changes (green=positive, red=negative)
- Responsive grid layout

### 2. **RecentClaims**
List of recent insurance claims with:
- Policy holder information
- Claim type and amount
- Status chips (pending, approved, rejected, investigating)
- Priority indicators
- Avatar initials

**Features:**
- Hover effects on claim cards
- Status color coding
- Filterable by status
- Click to view details

### 3. **RiskOverview**
Visual risk assessment across categories:
- Property Risk
- Cyber Risk
- Liability Risk
- Financial Risk

**Features:**
- Progress bars with risk levels
- Color-coded severity (high/medium/low)
- Trend descriptions
- Real-time risk scoring

### 4. **QuickActions**
Fast access buttons for:
- Create New Policy
- File Claim
- Run Risk Assessment
- Add Client

**Features:**
- Icon-based actions
- Descriptive labels
- Hover animations
- Responsive grid

### 5. **InsuranceDashboard (Main Page)**
Full dashboard composition combining all components in a responsive layout.

## Design System

All components use Marsh Design System tokens:
- **Primary**: BlueActive750 (#0B4BFF)
- **Gold**: Gold750 (#FFBF00) for accents
- **Success**: Green (#14853D)
- **Warning**: Gold (#CB7E03)
- **Danger**: StatusCritical (#C53532)
- **Midnight**: Midnight1000 (#000F47) for dark surfaces

## Usage

```tsx
import { InsuranceDashboard } from './projects/insurance-dashboard';

<InsuranceDashboard userName="John Doe" />
```

## Storybook

View all components in Storybook:
- http://localhost:6006/?path=/story/projects-insurance-dashboard

## Customization

Each component accepts props for custom data:

```tsx
<DashboardMetrics
  metrics={{
    totalPremiums: '$3.2M',
    premiumsChange: 15.3,
    activePolicies: '1,500',
    policiesChange: 10.2,
  }}
/>
```

## Responsive Behavior

- **Mobile**: Stacked single column
- **Tablet**: 2-column grid
- **Desktop**: 3-4 column grid with optimized spacing
