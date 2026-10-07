---
paths:
  - "vite.config.ts"
  - "tsconfig*.json"
  - "src/theme.ts"
  - "src/App.tsx"
---

# Stack & build configuration

> **Partly stale — read this header first.** Moved out of `CLAUDE.md` on
> 2026-10-07 because much of it no longer describes the repo, and officially
> *"if two instructions contradict each other, Claude may pick one
> arbitrarily."* Known-outdated below:
>
> - **Tailwind is v4**, not v3. The `tailwind` skill is authoritative.
> - **MUI is being removed.** The MUI theme/`sx` patterns below describe the
>   legacy half of the codebase, not the target. New work uses
>   `src/components/ui/` + Tailwind. 19 legacy `src/components/[A-Z]*`
>   directories remain as of 2026-10-07.
> - Dependency versions drift; `package.json` is the source of truth, not this.
>
> Still accurate: Node 22.x, the Vite dev/build/preview commands, GSAP +
> Lenis for animation, and the MUI theme's `shape.borderRadius: 6`
> correction noted inline.

## 3. Frameworks & Libraries

### Core Stack

```json
// package.json (key dependencies)
{
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "@mui/material": "^7.3.4",
    "@mui/icons-material": "^7.3.1",
    "@mui/x-data-grid": "^8.27.5",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "react-router-dom": "^7.9.3",
    "gsap": "^3.13.0",
    "lenis": "^1.3.11"
  },
  "devDependencies": {
    "vite": "^6.3.4",
    "typescript": "^5.8.3",
    "@storybook/react-vite": "^8.5.3",
    "vitest": "^3.1.1",
    "sass": "^1.83.5"
  }
}
```

**Node Version:** 22.x (required by `package.json` engines)

### Build System (Vite)

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' })
  ],
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap': ['gsap', 'gsap/ScrollTrigger', 'gsap/ScrollToPlugin'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    cors: {
      origin: ['http://localhost:3333'],
      credentials: true
    }
  }
});
```

**Dev Server:** `npm run dev` (port 5173)  
**Production Build:** `npm run build` (outputs to `dist/`)  
**Preview:** `npm run preview` (port 4173)

### MUI Theme Configuration

```typescript
// src/theme.ts
import { createTheme } from '@mui/material/styles';
import { tokens } from './tokens';
import { spacing } from './spacing';
import { shadows } from './shadows';

const lightPalette = {
  primary: {
    main: tokens.blue1000,          // #000f47 — Brand Primary
    light: tokens.blue750,          // #0b4bff
    dark: tokens.blue950,           // #021b6c
    contrastText: tokens.white,
  },
  background: {
    default: tokens.white,
    paper: tokens.gray250,          // #f7f8f8
  },
  text: {
    primary: tokens.blue1000,
    secondary: tokens.neutral700,
    disabled: tokens.neutral600,
  },
};

export const lightTheme = createTheme({
  palette: lightPalette,
  typography: {
    fontFamily: 'Noto Sans, sans-serif',
    h1: {
      fontFamily: 'var(--typo-h1-font-family)',
      fontSize: 'var(--typo-h1-font-size)',
      // ... CSS variables for all variants
    },
  },
  spacing: (index: number) => spacing[index] ?? index * 4,
  shadows: [
    'none',
    shadows[1].value,
    shadows[2].value,
    // ... all 6 shadow levels
  ],
  shape: {
    // 6px, matching rounded-md (the control default). NOTE: this key was
    // MISSING from src/theme.ts entirely until 2026-09-25, so every MUI component silently used MUI's
    // own 4px default while this file documented 2px. Set on BOTH the light
    // and dark themes, or the two disagree.
    borderRadius: 6,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: tokens.blue400,          // Lightened for dark bg
      // ...
    },
    background: {
      default: tokens.neutral950,    // #101010
      paper: tokens.neutral900,      // #252525
    },
  },
  // ... same typography, spacing, shadows
});
```

**Theme Provider Usage:**
```typescript
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = mode === 'light' ? lightTheme : darkTheme;
  
  return (
    <ThemeProvider theme={theme}>
      {/* App components */}
    </ThemeProvider>
  );
}
```

### Animation (GSAP)

```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Example: Card entrance animation
useEffect(() => {
  gsap.from('.card', {
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.card-container',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
}, []);
```

**Available Plugins:** ScrollTrigger, ScrollToPlugin  
**Smooth Scroll:** Lenis (`lenis` package)

---


---

### MUI Props → DS Props Mapping

| MUI Prop | DS Prop | Values |
|----------|---------|--------|
| `color` | `variant` + `tone` | variant: primary/secondary/outline/ghost<br/>tone: default/danger/success |
| `size` | `size` | sm / md / lg |
| `variant` | `variant` | (maps to visual style) |
| `disabled` | `disabled` + `loading` | boolean / boolean |

---

