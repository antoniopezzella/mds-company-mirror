
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // Mirrors the MDS grid system's xxl container (src/styles/_grid.scss —
    // $container-max.xxl / $container-padding), so Tailwind-based (shadcn)
    // components line up with the MUI side's `max-width: 1540px` toolbar.
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        md: '24px',
        lg: '32px',
      },
      screens: {
        '2xl': '1540px',
      },
    },
    extend: {
      maxWidth: {
        // Named alias for the same 1540px ceiling, for cases that need the
        // cap without the `container` utility's centering/padding.
        container: '1540px',
      },
        // borderRadius is deliberately NOT overridden.
        //
        // It used to be, rescaled around `--radius: 2px`, because shadcn's
        // defaults assume 0.5rem and collapsed `rounded-md` to 0 and
        // `rounded-sm` to a negative value — which silently rendered ~110
        // components square.
        //
        // Tailwind v4's stock scale removes the need entirely. Components
        // were remapped md->xs and lg->sm onto it, so the class names mean
        // the same thing here as in any other Tailwind codebase.
        //
        // The VALUES are now set once, in the `@theme` block of
        // src/index.css and src/styles.package.css:
        //
        //   xs 6px  sm 8px  md 10px  lg 12px  xl 16px
        //
        // (raised 2026-09-25 from 2/4/6/8/12 — see docs/foundations/DESIGN.md)
        //
        // That is the ONLY lever. `rounded-xs` and friends dereference
        // `--radius-*` at runtime, so changing the @theme block moves every
        // call site at once. A `borderRadius` override here would go back to
        // rescaling the whole ladder and reintroduce the collapse above;
        // `npm run radius:check` gates the rest.
      // COLOURS LIVE IN src/styles/generated/tailwind.tokens.css.
      //
      // Until 2026-10-22 this block defined 19 shadcn colour names as
      // `hsl(var(--background))` etc., hand-kept in src/styles/token-variables.css
      // and drifting from Figma in Light and Dark. The generated layer now
      // defines the same class names (plus 114 MDS ones) from the Figma export —
      // see docs/tasks/token-pipeline-migration.md step 3.
      //
      // Do NOT re-add a colour here: a `theme.extend.colors` entry and a
      // generated `@utility` of the same name both emit into one rule, and the
      // config's declaration is emitted LAST, so it silently wins and the token
      // pipeline stops being the source of truth. Measured, not theorised.
      //
      // The one thing lost with the theme entries is the `/opacity` modifier
      // (`bg-primary/5`), which a static @utility cannot take. The 15 call sites
      // that used it now write `bg-[var(--mds-color-…)]/5` — same colour, same
      // alpha, MDS as the source. New code should use an `overlay/*` token
      // instead of inventing an alpha.
      //
      // `chart-1..5` went with them: no `bg-chart-*` class was ever used (charts
      // read `getRoleColor('data.N')`), and the `--chart-*` variables themselves
      // stay in token-variables.css, still gated by varsync.
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'linear-indeterminate': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(350%)' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 150ms ease-out',
        'accordion-up': 'accordion-up 150ms ease-out',
        'linear-indeterminate': 'linear-indeterminate 1.2s ease-in-out infinite',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  // tailwindcss-animate used the v3 JS plugin API, which v4 removed.
  // Replaced by `@import "tw-animate-css"` in src/index.css.
  plugins: [],
};
