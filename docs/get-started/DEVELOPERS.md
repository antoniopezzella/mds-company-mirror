# Developer Get Started Guide

Welcome to the Marsh Design System (MDS) Platform. This guide will help you integrate the design system into your application.

## 📦 Installation

To use MDS components in your project, ensure you have the necessary dependencies:

```bash
npm install @mui/material @emotion/react @emotion/styled
# Plus the MDS package if it's published to a registry, otherwise local import
```

## 🏗 Setup

### 1. Wrap your Application
MDS relies on a custom implementation of the MUI Theme. You must wrap your application root with the `ThemeProvider` and our custom formatting context.

```tsx
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme'; // Import from MDS source

function App() {
  return (
    <ThemeProvider theme={theme}>
        <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Using Components
Import components directly from the components directory.

```tsx
import { Button } from 'src/components/Button';

// Usage
<Button variant="primary" size="md">
  Click Me
</Button>
```

### 3. Using Tokens (Roles)
We enforce a strict **Role-Based** token system. You should rarely access raw palette colors.

**✅ DO:**
```tsx
import { getRoleColor } from 'src/theme/roles';

// In sx prop
<Box sx={{ backgroundColor: getRoleColor('surface.background') }} />

// In styled components
const MyDiv = styled('div')(({ theme }) => ({
  color: getRoleColor('text.primary'),
}));
```

**❌ DON'T:**
```tsx
<Box sx={{ color: '#000000' }} /> // No hardcoded hex
<Box sx={{ color: 'primary.main' }} /> // Avoid default MUI palette aliases if possible
```

## 🛠 Tooling
- **VS Code Extension**: We recommend the **ESLint** extension to catch role usage issues.
- **Storybook**: Run `npm run storybook` to explore all components and their props interactively.

## 📚 Next Steps
- Read about [Tokens](../foundations/TOKENS.md) to understand the color system.
- Check the [Component Coverage](../../COMPONENT_COVERAGE.md) to see what's available.
