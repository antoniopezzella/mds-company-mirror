import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Separator } from './separator';

/**
 * Design System ButtonGroup — shadcn/ui counterpart, ported from the upstream
 * `button-group` registry item. No MDS/MUI twin exists; this is a new
 * component rather than a migration.
 *
 * Differences from upstream, both required by this repo's rules:
 *  - `ButtonGroupText` takes its surface, border and text from role tokens
 *    (`surface.subtle` / `border.default` / `text.primary`) instead of the
 *    Tailwind `bg-muted` / `border` / `text-sm` defaults, which aren't wired to
 *    MDS tokens and get no contrast validation.
 *  - `ButtonGroupSeparator` drops upstream's `bg-input` entirely: this repo's
 *    `Separator` already defaults its background to `border.default`, so
 *    restating it here would just be a second place to keep in sync.
 *
 * Note on radius: MDS buttons are square (the base `buttonVariants` sets no
 * `rounded-*`), so the corner-flattening classes below are inert today. They're
 * kept because they cost nothing and are exactly what's needed the moment a
 * radius is introduced — which is what `--radius: 2px` in index.css anticipates.
 * The classes that actually matter now are the `border-*-0` ones, which collapse
 * the doubled border between adjacent outlined buttons into a single rule.
 */
const buttonGroupVariants = cva(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none',
        vertical:
          'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export interface ButtonGroupProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof buttonGroupVariants> {}

/**
 * Groups related buttons into a single visual unit.
 *
 * `role="group"` is deliberate: it tells assistive tech these controls belong
 * together. Pair it with `aria-label` whenever the grouping isn't obvious from
 * the buttons alone — a bare group announces nothing about what it groups.
 */
function ButtonGroup({ className, orientation, ...props }: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation ?? 'horizontal'}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

export interface ButtonGroupTextProps extends React.ComponentProps<'div'> {
  /** Render as the child element instead of a `div` (e.g. a `<label>`). */
  asChild?: boolean;
}

/**
 * A non-interactive label or affix inside a ButtonGroup — a unit, a prefix, a
 * count. Styled to match the buttons it sits beside without being clickable.
 */
function ButtonGroupText({ className, asChild = false, style, ...props }: ButtonGroupTextProps) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="button-group-text"
      className={cn(
        "flex items-center gap-2 border px-4 text-sm font-medium shadow-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      )}
      style={{
        backgroundColor: getRoleColor('surface.subtle'),
        borderColor: getRoleColor('border.default'),
        color: getRoleColor('text.primary'),
        ...style,
      }}
      {...props}
    />
  );
}

export type ButtonGroupSeparatorProps = React.ComponentProps<typeof Separator>;

/**
 * A divider between buttons in a group. Defaults to `vertical`, matching the
 * group's default horizontal orientation.
 */
function ButtonGroupSeparator({ className, orientation = 'vertical', ...props }: ButtonGroupSeparatorProps) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn('relative !m-0 self-stretch data-[orientation=vertical]:h-auto', className)}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
