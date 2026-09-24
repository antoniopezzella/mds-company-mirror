
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
      // These offsets came from shadcn's defaults, which assume
      // `--radius: 0.5rem` (8px) and yield md=6px / sm=4px. This repo
      // overrides --radius to the Marsh DS standard of 2px but kept the
      // offsets, so `md` collapsed to calc(2px - 2px) = 0 and `sm` went
      // negative — leaving ~110 `rounded-md`/`rounded-sm` usages silently
      // rendering square. Rescaled around the 2px standard so `md` is the
      // DS radius and the steps stay monotonic.
      borderRadius: {
        lg: 'calc(var(--radius) + 2px)',
        md: 'var(--radius)',
        sm: 'calc(var(--radius) - 1px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'var(--ring)', // plain hex custom property now (MDS: focus.ring) — not HSL, no opacity-modifier call sites exist for this utility
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
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
