# Contributing to MDS Platform

Thank you for your interest in contributing to the Marsh Design System (MDS) Platform! This guide will help you get started with setting up your environment, creating components, and submitting changes.

## 🛠 Development Setup

### Prerequisites
- Node.js v22 (Check `package.json` engines)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/antoniopezzella/Marsh-Design-System.git

# Install dependencies
npm install
```

### Key Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the Vite dev server for the platform app |
| `npm run storybook` | Starts the Storybook environment (Recommended for component dev) |
| `npm test` | Runs the test suite (Vitest) |
| `npm run tokens:build` | Generates CSS and JSON artifacts from token definitions |
| `npm run roles:check` | Validates usage of role-based tokens in code |

## 🧩 Creating a New Component

1.  **Scaffold Files**: Create a new folder in `src/components/MyComponent/` with:
    *   `MyComponent.tsx`
    *   `MyComponent.stories.tsx`
    *   `MyComponent.test.tsx`
    *   `MyComponent.module.scss` (if needed)

2.  **Follow Conventions**:
    *   **Styling**: Use `sx` props with `theme.spacing()` or CSS Modules. Do not assume hardcoded pixels.
    *   **Colors**: ALWAYS use `getRoleColor(...)`. Never use hex codes directly.
    *   **Exports**: Export your component from `src/components/index.ts` (if applicable).

3.  **Storybook**: Add stories covering all variants (Primary, Secondary, Disabled, Error states).

4.  **Testing**: Ensure you have basic render tests and interaction tests if the component is interactive.

## 🎨 Token System Workflow

If you need to add a new color or token:

1.  **Primitives**: Update `src/tokens.ts` (Raw values).
2.  **Semantics**: Update `src/semantic-tokens.ts` (Intent names).
3.  **Roles**: Update `src/theme/roles.ts` (Component usage API).
4.  **Build**: Run `npm run tokens:build` to regenerate artifacts.

## ✅ Pull Request Process

1.  Ensure all tests pass: `npm test`
2.  Check for linting errors: `npm run lint`
3.  Verify Storybook builds: `npm run build-storybook`
4.  Update `COMPONENT_COVERAGE.md` if you are delivering a tracked component.
