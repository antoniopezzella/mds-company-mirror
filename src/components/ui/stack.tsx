import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

/**
 * Stack / Inline — the layout atoms.
 *
 * Why these exist
 * ---------------
 * Before these, every page hand-rolled `flex flex-col gap-6`: 246 raw `gap-*`
 * utilities across the component set, with nothing checking that the value
 * sits on the design system's spacing scale. `gap-7` (28px) is not a DS step,
 * compiles perfectly, and looks almost right — which is exactly the kind of
 * drift a design system is supposed to prevent.
 *
 * `Stack` makes the scale the *type*: `gap` only accepts steps that exist in
 * `src/spacing.ts`. `gap-7` is now a TypeScript error rather than a silent
 * 4px-off layout.
 *
 * These are intentionally thin. They add no colour, no border, no padding —
 * a Stack is a flex container and nothing else, so it composes with anything
 * and never fights a child's styling.
 *
 * When NOT to use them
 * --------------------
 * For two-dimensional page layout use the grid utilities documented in
 * `src/docs/35-Grid.mdx` — a Stack is one-dimensional by design and nesting
 * three of them to fake a grid is worse than `grid-cols-*`.
 */

/**
 * Gap steps, keyed by Tailwind's scale number.
 *
 * Every value here maps to a step in `src/spacing.ts`; the gaps in the
 * sequence (7, 9, 11, …) are deliberate — those are off-scale and rejected by
 * the type. The class strings MUST stay literal: Tailwind's scanner is plain
 * text, so a computed `gap-${n}` would generate no CSS at all.
 */
const GAP = {
  0: 'gap-0',
  1: 'gap-1', // 4px
  2: 'gap-2', // 8px
  3: 'gap-3', // 12px
  4: 'gap-4', // 16px
  5: 'gap-5', // 20px
  6: 'gap-6', // 24px
  8: 'gap-8', // 32px
  10: 'gap-10', // 40px
  12: 'gap-12', // 48px
  14: 'gap-14', // 56px
  16: 'gap-16', // 64px
  20: 'gap-20', // 80px
  24: 'gap-24', // 96px
  28: 'gap-28', // 112px
  32: 'gap-32', // 128px
} as const;

export type StackGap = keyof typeof GAP;

const ALIGN = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

const JUSTIFY = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spacing between children, on the DS scale. Off-scale values are a type error. */
  gap?: StackGap;
  /** Cross-axis alignment. */
  align?: keyof typeof ALIGN;
  /** Main-axis distribution. */
  justify?: keyof typeof JUSTIFY;
  /** Render as the single child element instead of a `div`. */
  asChild?: boolean;
}

/**
 * Vertical stack. The default container for "these things sit one above the
 * other with consistent spacing" — which is most of a dashboard page.
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ gap = 4, align, justify, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        data-slot="stack"
        className={cn(
          'flex flex-col',
          GAP[gap],
          align && ALIGN[align],
          justify && JUSTIFY[justify],
          className
        )}
        {...props}
      />
    );
  }
);
Stack.displayName = 'Stack';

export interface InlineProps extends StackProps {
  /** Allow children to wrap onto multiple lines. Defaults to `true`. */
  wrap?: boolean;
}

/**
 * Horizontal stack. Wraps by default, because a row of chips, filters or
 * buttons that cannot wrap is an overflow bug waiting for a narrow viewport.
 */
export const Inline = React.forwardRef<HTMLDivElement, InlineProps>(
  ({ gap = 2, align = 'center', justify, wrap = true, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        data-slot="inline"
        className={cn(
          'flex flex-row',
          wrap ? 'flex-wrap' : 'flex-nowrap',
          GAP[gap],
          ALIGN[align],
          justify && JUSTIFY[justify],
          className
        )}
        {...props}
      />
    );
  }
);
Inline.displayName = 'Inline';
