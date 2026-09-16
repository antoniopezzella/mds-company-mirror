import type { Preview, StoryFn, StoryContext } from '@storybook/react';
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { ThemeProvider } from '@mui/material/styles';
import { theme, darkTheme } from '../src/theme';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import RoleVarsProvider from '../src/theme/RoleVarsProvider';
import { ThemeModeContext, type ThemeMode } from '../src/theme/ThemeModeContext';
// Load font faces and typography CSS variables for Storybook preview
import '../src/index.css';
import '../src/global.scss';
import '../src/styles/_typography.scss';

export const globalTypes = {
  colorMode: {
    name: 'Color Mode',
    description: 'Light or Dark theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
      dynamicTitle: true,
    },
  },
};

// Wrap all stories with MUI theme (light/dark) and a baseline background
// Adaptive height: fullscreen layouts get 100vh, centered layouts fit content
export const decorators = [
  (Story: StoryFn, context: StoryContext) => {
    const mode: ThemeMode = context.globals?.colorMode === 'dark' ? 'dark' : 'light';
    const activeTheme = mode === 'dark' ? darkTheme : theme;
    const layout = context.parameters?.layout || 'padded';

    // The toolbar toggle used to only drive MUI's ThemeProvider. Every
    // shadcn/ui component in the library is invisible to that: Tailwind's
    // `dark:` variants and getRoleColor()'s DOM-mode fallback (see
    // roles.ts) both key off a `dark` class on <html>, RoleVarsProvider was
    // being mounted with no `mode` prop at all (silently frozen at its own
    // 'light' default), and nothing provided ThemeModeContext — so
    // useThemeMode() (SideNavigation, and any future component) always saw
    // the light default regardless of this toggle. Fixed by driving all
    // three from the same `mode` value, the same way the real app's
    // ThemeModeProvider does.
    //
    // The class toggle itself runs during render, not in a useEffect —
    // caught by actually toggling the toolbar and looking, not just
    // reading this code: a useEffect runs one render after the one that
    // needs it. Any getRoleColor() call in that first render (e.g.
    // card.tsx's background) reads the still-stale class and has no
    // reason to re-render afterward, so it stays permanently wrong —
    // exactly the same race already fixed in ThemeModeContext.tsx's
    // toggleMode(), just via a different trigger (Storybook's own toolbar
    // state instead of a click handler this project owns).
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', mode === 'dark');
    }

    // Adaptive styling based on layout type:
    // - fullscreen: Full viewport height with padding for dashboards/grids
    // - centered: Minimal padding, no minHeight (fits component)
    // - padded: Standard padding with auto height
    const containerStyle: React.CSSProperties = {
      background: activeTheme.palette.background.default,
      minHeight: layout === 'fullscreen' ? '100vh' : undefined,
      padding: layout === 'centered' ? 0 : 24,
    };

    return (
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        <ThemeModeContext.Provider value={{ mode, toggleMode: () => {} }}>
          <div style={containerStyle}>
            <RoleVarsProvider mode={mode}>
              <Story />
            </RoleVarsProvider>
          </div>
        </ThemeModeContext.Provider>
      </ThemeProvider>
    );
  }
];

// MDS's own real breakpoints, not Storybook's generic device presets —
// matches CarouselSection.module.scss's actual media queries (600/768/900/
// 1024/1200/1540) and the Header/Hero 1540px container max-width. `mobile`
// sits just below the 600px breakpoint, `desktop` at the 1200px breakpoint,
// `wideDesktop` above the 1540px container cap so the centered/capped
// container behavior is visible rather than full-bleed.
const mdsViewports: Record<string, { name: string; styles: { width: string; height: string }; type: 'mobile' | 'tablet' | 'desktop' }> = {
  mobile: { name: 'Mobile (390px)', styles: { width: '390px', height: '844px' }, type: 'mobile' },
  mobileLarge: { name: 'Mobile Large (600px)', styles: { width: '600px', height: '900px' }, type: 'mobile' },
  tablet: { name: 'Tablet (900px)', styles: { width: '900px', height: '1024px' }, type: 'tablet' },
  desktop: { name: 'Desktop (1200px)', styles: { width: '1200px', height: '800px' }, type: 'desktop' },
  wideDesktop: { name: 'Wide Desktop (1600px)', styles: { width: '1600px', height: '900px' }, type: 'desktop' },
};

export const parameters: Preview['parameters'] = {
  viewport: {
    options: mdsViewports,
  },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
    sort: 'requiredFirst',
  },
  a11y: {
    test: 'todo',
  },
  docs: {
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Primary />
        <h2>Controls</h2>
        <Controls />
        <Description />
        <Stories />
      </>
    ),
  },
  options: {
    storySort: {
      order: [
        'Foundations',
        [
          'Intro',
          'Accessibility',
          'Colors',
          'Typography',
          'Roles',
          'Spacing',
          'Grid',
          '⚠️ Grid Legacy',
          'Elevation',
          // Note: titles must match MDX meta exactly
          'Contrast',
          'Documentation-Guidelines',
        ],
        // New reference section for raw MUI component examples before DS customization
        'MUI Reference',
        // Ensure other top-level groups appear after Foundations in this order
        'Components',
        'Website',
        'Docs',
        'Debug',
        'Archive',
      ],
    },
  },
};
