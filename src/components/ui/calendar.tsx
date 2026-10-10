"use client"

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, UI, type ChevronProps, type DayButtonProps, type DayPickerProps } from 'react-day-picker';

import { cn } from '@/lib/utils';

// No MDS/Figma spec exists for this yet; built matching real shadcn/ui
// conventions directly, adapted for react-day-picker v10's actual prop API
// (confirmed against node_modules/react-day-picker/dist/esm/*.d.ts — v10
// restructured `classNames`/`styles` around the `UI` enum and dropped the
// v8-era `IconLeft`/`IconRight` custom-component names in favor of a single
// `Chevron` component, so a copy-pasted v8-era shadcn recipe would not
// compile against this version).
//
// Important v10-specific finding: DayPicker only threads day `modifiers`
// (selected/today/disabled/outside/range_*) into the *grid cell* (`Day`,
// a <td>) className/style computation, via `modifiersClassNames` /
// `modifiersStyles`. The `DayButton` that's actually rendered and clicked
// only receives the *static*, non-modifier-aware `classNames[UI.DayButton]`
// / `styles[UI.DayButton]`. To color the selected/today/disabled button
// states with role tokens, we override `components.DayButton` below and
// read `modifiers` directly — the same conditional-inline-style pattern
// Tabs.tsx uses for its active-tab state — rather than trying to drive it
// through `modifiersStyles` (which would only tint the table cell, not the
// circular button itself).

// `DayPickerProps` is a discriminated union keyed on `mode`
// (single/multiple/range/default), so this is an intersection rather than
// an `interface extends` — an interface cannot extend a union.
export type CalendarProps = DayPickerProps & {
  /**
   * Fills the grid with dimmed days from the adjacent months so every row
   * has 7 cells, rather than leaving the first/last week ragged. Defaults
   * to `true`.
   */
  showOutsideDays?: boolean;
};

function CalendarChevron({ className, orientation, disabled, ...props }: ChevronProps) {
  const Icon = orientation === 'left' ? ChevronLeft : ChevronRight;
  return (
    <Icon
      className={cn('h-4 w-4', disabled && 'opacity-50', className)}
      style={{ color: 'var(--role-text-secondary)' }}
      {...props}
    />
  );
}

function CalendarDayButton({ className, day, modifiers, ...props }: DayButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  // react-day-picker sets modifiers.selected=true for every day in a range
  // (start, middle, end alike — confirmed in DayPicker.js), so range_start/
  // range_middle/range_end must be checked ahead of the plain `selected`
  // fallback to give the connected-range look instead of solid-filling every
  // day in the range like a single selection.
  const isRangeMiddle = Boolean(modifiers.range_middle);
  const isSolidSelected = modifiers.selected && !isRangeMiddle;

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center text-sm font-normal outline-hidden transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed',
        isRangeMiddle ? 'rounded-none' : 'rounded-md',
        className
      )}
      style={
        {
          color: isSolidSelected
            ? 'var(--role-text-onInteractive)'
            : isRangeMiddle
              ? 'var(--role-text-primary)'
              : modifiers.disabled
                ? 'var(--role-text-disabled)'
                : 'var(--role-text-primary)',
          backgroundColor: isSolidSelected
            ? 'var(--role-interactive-primary)'
            : isRangeMiddle
              ? 'var(--role-surface-accent)'
              : 'transparent',
          opacity: modifiers.disabled ? 0.5 : modifiers.outside ? 0.6 : 1,
          boxShadow:
            modifiers.today && !modifiers.selected ? `inset 0 0 0 1px ${'var(--role-border-default)'}` : 'none',
          '--tw-ring-color': 'var(--role-focus-ring)',
        } as React.CSSProperties
      }
      // `{...props}` FIRST, deliberately. JSX later-wins, so when this spread
      // came last a consumer passing their own handler REPLACED the one below
      // and the highlight never fired — while the `props.on*?.(e)` chain-call
      // inside it, written for exactly that case, became dead code.
      {...props}
      onMouseEnter={(e) => {
        if (!modifiers.selected && !modifiers.disabled) {
          (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--role-surface-subtle)';
        }
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (!modifiers.selected) {
          (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
        }
        props.onMouseLeave?.(e);
      }}
    />
  );
}

/**
 * Design System Calendar — shadcn/ui/react-day-picker v10 wrapper.
 * Static layout via Tailwind (`classNames`), dynamic role-token colors via
 * `style` on the custom `DayButton`/`Chevron` components (see file header).
 */
function Calendar({ className, classNames, showOutsideDays = true, components, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('inline-block p-3', className)}
      classNames={{
        [UI.Months]: 'flex flex-col sm:flex-row gap-4 relative',
        [UI.Month]: 'flex flex-col gap-4',
        [UI.MonthCaption]: 'flex h-9 items-center justify-center relative',
        [UI.CaptionLabel]: 'text-sm font-medium',
        [UI.Nav]: 'absolute inset-x-1 top-0 flex h-9 items-center justify-between',
        [UI.PreviousMonthButton]:
          'inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-50',
        [UI.NextMonthButton]:
          'inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-50',
        [UI.MonthGrid]: 'w-full border-collapse',
        [UI.Weekdays]: 'flex',
        [UI.Weekday]: 'w-9 text-[0.8rem] font-normal',
        [UI.Week]: 'mt-2 flex w-full',
        [UI.Day]: 'relative h-9 w-9 p-0 text-center text-sm',
        [UI.DayButton]: '',
        ...classNames,
      }}
      styles={{
        [UI.CaptionLabel]: { color: 'var(--role-text-primary)' },
        [UI.Weekday]: { color: 'var(--role-text-secondary)' },
        [UI.PreviousMonthButton]: { color: 'var(--role-text-secondary)' },
        [UI.NextMonthButton]: { color: 'var(--role-text-secondary)' },
      }}
      components={{
        Chevron: CalendarChevron,
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
export default Calendar;
