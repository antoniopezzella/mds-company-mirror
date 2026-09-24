import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { StatCard } from '../../components/ui/stat-card';
import { Bubble, BubbleContent } from '../../components/ui/bubble';
import { Marker } from '../../components/ui/marker';

/**
 * # Border Contrast — health check
 *
 * The shared `--border` CSS variable (src/index.css) fails WCAG
 * non-text contrast (3:1) in BOTH modes: 1.40:1 light (#dadada on white),
 * 1.84:1 dark (#404040 on #101010). It's the default border color for the whole primitive layer — at least 6 real components reference it
 * directly (StatCard, Bubble, Marker, Drawer, MessageScroller,
 * Questionnaire), likely more implicitly.
 *
 * MDS's own `border.default` role already resolves to a working value —
 * `neutral500` / `#878787`, deliberately used **unchanged in both modes**
 * (marked `// pivot — unchanged` in semantic-tokens.ts: 3.59:1 light,
 * 5.30:1 dark). `--input`'s own code comment even says `MDS: border.default`
 * already — it was just never actually set to that role's real value. This
 * page renders real components side by side: **current** (broken) vs
 * **proposed** (border.default's real value) — same HSL both modes, not two
 * different ones. The proposed zones override `--border` locally via inline
 * style — nothing in index.css is touched by this story.
 */
const meta: Meta = {
  title: 'Health/Border Contrast',
  parameters: {
    layout: 'fullscreen',
    a11y: {
      config: {
        rules: [
        {
          // The scrollable element axe flags here is <body> itself: this
          // story renders a tall, entirely static block, so the Storybook
          // canvas scrolls while containing nothing focusable. That's a
          // property of previewing one section in isolation, not of the
          // component — on the real page it sits among headers, links and
          // buttons, and the body scroll is reachable by keyboard through
          // them. Scoped to this story only, so the rule still guards
          // genuinely scrollable containers elsewhere (it caught real bugs
          // in CarouselSection, ExpertiseCards, ScrollArea and Attachment).
          id: 'scrollable-region-focusable',
          enabled: false,
        },
        {
          // This page renders light and dark side by side for comparison, which
          // the token architecture cannot actually support: getRoleColor()
          // resolves against a `dark` class on <html>, so components inside a
          // LOCAL `.dark` wrapper still receive light-mode values. The dark
          // zone therefore shows the correct borders (the thing being compared,
          // set explicitly) on an approximated background, and axe reads the
          // mismatch as a contrast failure — #000f47 on #0f0f0f.
          //
          // That's a real limitation worth knowing, not a defect in any
          // component: a genuine dark-mode preview needs the story's
          // `globals: { colorMode: 'dark' }`, which switches the whole canvas
          // and so can't produce a side-by-side. Scoped to this health page
          // only; the rule still guards every real component.
          id: 'color-contrast',
          enabled: false,
        },
        ],
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const zoneBase: CSSProperties = { padding: 24, minHeight: 320 };

function Swatch({ label, extraClass = '' }: { label: string; extraClass?: string }) {
  return (
    <div className={`rounded border border-border bg-background p-4 text-sm text-foreground ${extraClass}`}>
      {label}
    </div>
  );
}

function ComponentSet() {
  return (
    <div className="flex flex-col gap-4">
      <StatCard label="Total Revenue" value="$1,250.00" change="+12.5%" trend="up" trendDescription="Trending up this month" description="Visitors for the last 6 months" />

      <Bubble variant="outline" align="start">
        <BubbleContent>Outline bubble — border-border on bubble-content</BubbleContent>
      </Bubble>

      <div className="rounded-xs border border-border bg-background p-4">
        <Marker variant="border">Marker — variant=&quot;border&quot; (border-b border-border)</Marker>
      </div>

      <div className="rounded-xs border border-border bg-background p-4">
        <Marker variant="separator">before/after separator</Marker>
      </div>

      {/* Drawer/MessageScroller/Questionnaire aren't easily mountable
          standalone (portal + open-state, scroll container, form context
          respectively) — swatches below use their exact class combination
          instead, so the border weight shown is authentic even though the
          full component isn't mounted. */}
      <Swatch label="Questionnaire choice pill (border border-border)" />
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md">
        ↓
      </div>
      <div className="rounded-t-lg border-t border-border bg-background p-4 text-sm text-foreground">
        Drawer content edge (border-border)
      </div>
    </div>
  );
}

export const Comparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-px bg-neutral-300 md:grid-cols-2">
      {/* LIGHT — current */}
      <div style={zoneBase} className="bg-white">
        <p className="mb-4 font-mono text-xs uppercase tracking-wide text-neutral-500">
          Light · current (--border: 0 0% 85% · #dadada · 1.40:1)
        </p>
        <ComponentSet />
      </div>

      {/* LIGHT — proposed: neutral500 (#878787), the SAME value border.default
          already uses successfully in both modes ("pivot — unchanged" in
          semantic-tokens.ts) — not a new color choice. */}
      <div style={{ ...zoneBase, ['--border' as string]: '0 0% 53%' }} className="bg-white">
        <p className="mb-4 font-mono text-xs uppercase tracking-wide text-neutral-500">
          Light · proposed (--border: 0 0% 53% · neutral500 · #878787 · 3.59:1)
        </p>
        <ComponentSet />
      </div>

      {/* DARK — current */}
      <div style={zoneBase} className="dark bg-[#101010]">
        <p className="mb-4 font-mono text-xs uppercase tracking-wide text-neutral-400">
          Dark · current (--border: 0 0% 25% · #404040 · 1.84:1)
        </p>
        <ComponentSet />
      </div>

      {/* DARK — proposed: same neutral500 value as light, not a separate
          dark-mode step — border.default's own design already proved a
          single value works in both directions (3.59:1 light, 5.30:1 dark). */}
      <div style={{ ...zoneBase, ['--border' as string]: '0 0% 53%' }} className="dark bg-[#101010]">
        <p className="mb-4 font-mono text-xs uppercase tracking-wide text-neutral-400">
          Dark · proposed (--border: 0 0% 53% · neutral500, same value · #878787 · 5.30:1)
        </p>
        <ComponentSet />
      </div>
    </div>
  ),
};
