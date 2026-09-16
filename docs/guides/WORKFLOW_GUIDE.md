# Workflow Guide

## Development Workflows

### 🚀 Quick Start
```bash
# Clone and set up project
git clone <repo-url>
cd MDS-Platform
npm install
npm run dev
```

### 🔄 Daily Development Workflow
```bash
# 1. Start fresh development session
npm run workflow:local

# 2. Start development server
npm run dev

# 3. Run tests in watch mode (separate terminal)
npm run test:watch

# 4. Run Storybook for component development (separate terminal)
npm run storybook
```

### 🧹 Clean Installation Workflows

#### Fresh Local Setup
```bash
npm run fresh-start
```
Performs: Clean → CI install → Test → Build

#### Dependency Issues
```bash
npm run clean:install
```
Removes node_modules and reinstalls with latest package-lock.json

#### CI Environment Simulation
```bash
npm run clean:ci
```
Uses `npm ci` for exact dependency reproduction

### 🔒 Security & Dependencies

#### Check for Outdated Packages
```bash
npm run deps:check
```

#### Update Dependencies
```bash
npm run deps:update
```
Updates packages and fixes security vulnerabilities

#### Security Audit Only
```bash
npm run security
```

### 🏗️ Build Workflows

#### Local Build Testing
```bash
npm run workflow:local
```
Complete local validation pipeline

#### CI/CD Pipeline Simulation
```bash
npm run workflow:ci
```
Exact CI environment workflow

#### Production Build
```bash
npm run build
```

#### Storybook Build
```bash
npm run build-storybook
```

### 📦 Deployment Workflows

#### Vercel Production Deploy
```bash
npm run deploy
```
Builds tokens → Storybook → Deploys to production

#### Vercel Preview Deploy
```bash
npm run deploy:preview
```
Builds tokens → Storybook → Deploys to preview URL

#### Tokens Only Deploy
```bash
npm run deploy:tokens
```
Quick token updates without full rebuild

### 🧪 Testing Workflows

#### Run All Tests
```bash
npm test
```

#### Watch Mode Development
```bash
npm run test:watch
```

#### Coverage Report
```bash
npm run test:coverage
```

#### UI Testing in Storybook
```bash
npm run test:storybook
```

### 🎨 Design System Workflows

#### Token Development
```bash
# Build tokens
npm run tokens:build

# Check token integrity
npm run tokens:check

# Generate contrast reports
npm run tokens:contrast:badge
```

#### Component Development
```bash
# Start Storybook
npm run storybook

# Check role usage compliance
npm run roles:check

# Generate governance reports
npm run governance:ci
```

### 🔧 Troubleshooting Workflows

#### Node Modules Issues
```bash
# Nuclear option - complete reset
rm -rf node_modules package-lock.json
npm install
```

#### Build Issues
```bash
# Clear all build artifacts
npm run clean
npm run build
```

#### Storybook Issues
```bash
# Clear Storybook cache
npm run storybook:clean
npm run storybook
```

#### Dependency Conflicts
```bash
# Check for conflicts
npm ls

# Force dependency resolution
npm install --force
```

### 📋 Pre-commit Checklist

Before committing code:
```bash
# 1. Run full validation
npm run workflow:local

# 2. Check code quality
npm run lint
npm run type-check

# 3. Update documentation if needed
npm run docs:build

# 4. Verify tokens and governance
npm run tokens:check
npm run governance:ci
```

### 🎯 Common Scenarios

#### New Feature Development
1. `npm run dev` (development server)
2. `npm run storybook` (component playground)
3. `npm run test:watch` (test feedback)
4. `npm run workflow:local` (pre-commit validation)

#### Bug Fix
1. `npm run clean:install` (clean environment)
2. Reproduce issue
3. `npm run test:watch` (TDD approach)
4. `npm run workflow:local` (validation)

#### Dependency Update
1. `npm run deps:check` (check outdated)
2. `npm run deps:update` (update safely)
3. `npm run workflow:local` (verify compatibility)
4. `npm run test:coverage` (ensure no regressions)

#### Production Deployment
1. `npm run workflow:ci` (CI simulation)
2. `npm run deploy:preview` (preview testing)
3. `npm run deploy` (production deployment)

### 🤖 GitHub Actions Integration

The project includes automated workflows:

#### npm-install.yml
- Triggered on push/PR to main
- Tests across Node.js versions and platforms
- Runs security audits
- Caches dependencies for performance

#### Manual trigger available for dependency testing

## Best Practices

1. **Always use `npm ci` in CI environments**
2. **Run security audits regularly**
3. **Test builds locally before pushing**
4. **Keep dependencies updated**
5. **Use workflow commands for consistency**
6. **Clear caches when experiencing issues**

## Environment Requirements

- **Node.js**: 22.x (see package.json engines)
- **npm**: Latest stable
- **Platform**: macOS, Linux, Windows (via workflows)

## Support

For issues with workflows:
1. Check this guide
2. Review GitHub Actions logs
3. Run local troubleshooting commands
4. Clear caches and retry