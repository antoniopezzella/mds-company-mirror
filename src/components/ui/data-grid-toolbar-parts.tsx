"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
import { CONTROL_RADIUS } from './control-size';

/**
 * The data table's toolbar controls — Figma `Data table/Toolbar button`,
 * `Toolbar group` and `Toolbar segment` (MDS V3, page "Table New Component").
 *
 * Why a file of their own: both the toolbar and `DataGridBulkActions` render
 * them (the selection mode's "3 selected | Assign | Delete" group is bulk
 * actions drawn as segments), and either of those owning them would make the
 * other import it back — a cycle.
 *
 * Why not `Button variant="outline"`: the Figma part is a different control —
 * regular-weight neutral label, a neutral-grey frame, and a count badge — and
 * it stays 32px tall in every density while the bars around it do not.
 *
 * Colour comes from the Figma-named `--mds-color-*` layer, one-to-one with the
 * variables the design binds, so light and dark are the designer's own values.
 *
 * Radius is CONTROL_RADIUS (4px), not Figma's `V3/Small` (2px): every other
 * control in the system is 4px by decision (control-size.ts, 2026-10-01), and a
 * toolbar button sitting next to a `Button` with a different corner is the
 * mismatch that decision exists to prevent. Logged as a token gap in
 * docs/tasks/data-table-v3.md — retuning is the one-line CONTROL_RADIUS edit.
 */

// Hover and pressed are translucent overlays ON TOP of the surface, as Figma
// layers them — not a replacement colour — so the same tokens work over any
// surface and in both themes.
const OVERLAY_HOVER =
  'hover:[background-image:linear-gradient(var(--mds-color-overlay-neutral-hover),var(--mds-color-overlay-neutral-hover))]';
const OVERLAY_PRESSED =
  'active:[background-image:linear-gradient(var(--mds-color-overlay-neutral-pressed),var(--mds-color-overlay-neutral-pressed))]';

// Figma's double focus ring: 2px focus blue with a 2px surface-coloured ring
// between it and the control. Outset on standalone controls, inset on parts
// that sit inside a frame (segments), where an outset ring would be clipped.
// The inner ring uses the surface colour — Figma's `border/focus/inner` has no
// generated variable yet (token gap).
export const DATA_GRID_FOCUS_OUTSET =
  'focus-visible:outline-hidden focus-visible:shadow-[0_0_0_2px_var(--mds-color-background-default),0_0_0_4px_var(--mds-color-border-focus-default)]';
export const DATA_GRID_FOCUS_INSET =
  'focus-visible:outline-hidden focus-visible:shadow-[inset_0_0_0_2px_var(--mds-color-border-focus-default),inset_0_0_0_4px_var(--mds-color-background-default)]';

export interface DataGridToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 16px leading icon. */
  icon?: React.ReactNode;
  /** A count badge after the label — e.g. the number of values a filter holds. */
  count?: number;
  /** Icon only. `aria-label` becomes required in practice: there is no text. */
  iconOnly?: boolean;
  /** What the count counts, for assistive tech: ", 2 selected". Default "selected". */
  countLabel?: string;
}

/**
 * Figma `Data table/Toolbar button`: 32px, 1px `border/default` frame, 16px
 * icon, 14/20 label with 4px extra side space, optional 20px count badge.
 *
 * A forwardRef `<button>` so it can be a `DropdownMenuTrigger asChild`.
 */
export const DataGridToolbarButton = React.forwardRef<HTMLButtonElement, DataGridToolbarButtonProps>(
  function DataGridToolbarButton(
    { icon, count, iconOnly = false, countLabel = 'selected', children, className, type = 'button', ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        data-slot="data-grid-toolbar-button"
        className={cn(
          'inline-flex h-8 shrink-0 items-center gap-1 border text-sm whitespace-nowrap transition-colors motion-reduce:transition-none',
          'border-[var(--mds-color-border-default)] bg-[var(--mds-color-background-default)] text-[var(--mds-color-foreground-neutral-default)]',
          'disabled:pointer-events-none disabled:text-[var(--mds-color-foreground-disabled)]',
          '[&_svg]:size-4 [&_svg]:shrink-0',
          iconOnly ? 'w-8 justify-center' : 'px-2',
          CONTROL_RADIUS,
          OVERLAY_HOVER,
          OVERLAY_PRESSED,
          DATA_GRID_FOCUS_OUTSET,
          className
        )}
        {...props}
      >
        {icon}
        {!iconOnly && children != null && <span className="px-1">{children}</span>}
        {count != null && count > 0 && (
          <span
            // Decorative restatement — the count is also in the accessible
            // name via the visually hidden text below, so it is announced as
            // "Status, 2 selected" rather than "Status 2".
            aria-hidden="true"
            className="inline-flex size-5 items-center justify-center rounded-full text-xs font-bold bg-[var(--mds-color-background-neutral-default)]"
          >
            {count}
          </span>
        )}
        {count != null && count > 0 && (
          <span className="sr-only">
            , {count} {countLabel}
          </span>
        )}
      </button>
    );
  }
);
DataGridToolbarButton.displayName = 'DataGridToolbarButton';

export interface DataGridToolbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Names the group for assistive tech — e.g. "Bulk actions", "Search". */
  'aria-label'?: string;
  /**
   * `full` (default): dividers run the group's height — the selection
   * group's "3 selected | Assign | Delete". `inset`: 20px dividers, centred
   * (6px off the frame) — the query group's "Name | contains | Search… | ⋮". Both as
   * measured from the Figma Toolbar (17279:11510).
   */
  dividers?: 'full' | 'inset';
}

/**
 * Figma `Data table/Toolbar group`: one 32px frame holding joined segments,
 * clipped so a segment's hover fill follows the frame's corners.
 *
 * Never wider than the bar: on a narrow screen a group that outgrows it
 * scrolls sideways inside its own frame (scrollbar hidden — it is one row of
 * buttons, and focus scrolls the next one into view) rather than being cut
 * off at the card edge with its last actions unreachable.
 */
export const DataGridToolbarGroup = React.forwardRef<HTMLDivElement, DataGridToolbarGroupProps>(
  function DataGridToolbarGroup({ className, role = 'group', dividers = 'full', ...props }, ref) {
    return (
      <div
        ref={ref}
        role={role}
        data-slot="data-grid-toolbar-group"
        data-dividers={dividers}
        className={cn(
          'group/tb inline-flex h-8 max-w-full shrink-0 items-stretch overflow-x-auto overflow-y-hidden border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'border-[var(--mds-color-border-default)] bg-[var(--mds-color-background-default)]',
          CONTROL_RADIUS,
          className
        )}
        {...props}
      />
    );
  }
);
DataGridToolbarGroup.displayName = 'DataGridToolbarGroup';

const segmentBase =
  'relative inline-flex shrink-0 items-center gap-2 px-3 text-sm whitespace-nowrap [&_svg]:size-4 [&_svg]:shrink-0';
// The 1px divider sits on the segment's trailing edge; the last one in a group
// drops it so it never doubles the group's own border. In an `inset` group the
// border stays (so widths don't change) but goes transparent, and a 20px rule
// is drawn over it instead.
const segmentDivider = cn(
  'border-e border-[var(--mds-color-border-default)] last:border-e-0',
  'group-data-[dividers=inset]/tb:border-e-transparent',
  'group-data-[dividers=inset]/tb:after:absolute group-data-[dividers=inset]/tb:after:-end-px group-data-[dividers=inset]/tb:after:top-1/2 group-data-[dividers=inset]/tb:after:h-5 group-data-[dividers=inset]/tb:after:-translate-y-1/2 group-data-[dividers=inset]/tb:after:w-px',
  'group-data-[dividers=inset]/tb:after:bg-[var(--mds-color-border-default)] group-data-[dividers=inset]/tb:last:after:hidden'
);

export interface DataGridToolbarSegmentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  /** Critical label and icon, for destructive actions such as Delete. */
  destructive?: boolean;
}

/** Figma `Toolbar segment`, Type=Button: an action inside a group. */
export const DataGridToolbarSegment = React.forwardRef<HTMLButtonElement, DataGridToolbarSegmentProps>(
  function DataGridToolbarSegment({ icon, destructive = false, children, className, type = 'button', ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        data-slot="data-grid-toolbar-segment"
        className={cn(
          segmentBase,
          segmentDivider,
          'transition-colors motion-reduce:transition-none disabled:pointer-events-none disabled:text-[var(--mds-color-foreground-disabled)]',
          destructive
            ? 'text-[var(--mds-color-foreground-critical-default)]'
            : 'text-[var(--mds-color-foreground-neutral-default)]',
          'hover:bg-[var(--mds-color-overlay-neutral-hover)]',
          DATA_GRID_FOCUS_INSET,
          className
        )}
        {...props}
      >
        {icon}
        {children}
      </button>
    );
  }
);
DataGridToolbarSegment.displayName = 'DataGridToolbarSegment';

/**
 * Figma `Toolbar segment`, Type=Text: a non-interactive label inside a group,
 * such as "3 selected". `muted` adds the overlay fill Figma uses to set the
 * count apart from the actions beside it.
 */
export function DataGridToolbarText({
  muted = false,
  strong = false,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  muted?: boolean;
  /** Figma Count *Strong*: bold, `foreground/neutral/default` — the selection count. */
  strong?: boolean;
}) {
  return (
    <span
      data-slot="data-grid-toolbar-text"
      data-strong={strong || undefined}
      className={cn(
        segmentBase,
        segmentDivider,
        strong
          ? 'font-bold text-[var(--mds-color-foreground-neutral-default)]'
          : 'text-[var(--mds-color-foreground-neutral-subtle)]',
        muted && 'bg-[var(--mds-color-overlay-neutral-hover)]',
        className
      )}
      {...props}
    />
  );
}

export interface DataGridToolbarSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: React.ReactNode;
  /** Rendered after the input, inside the segment — a clear button. */
  trailing?: React.ReactNode;
}

/**
 * Figma `Toolbar segment`, Type=Input: icon + text field, 160px by default
 * (the Work queue template widens it to 240 via `className`).
 */
export const DataGridToolbarSearch = React.forwardRef<HTMLInputElement, DataGridToolbarSearchProps>(
  function DataGridToolbarSearch({ icon, trailing, className, ...props }, ref) {
    return (
      <label
        data-slot="data-grid-toolbar-search"
        className={cn(
          segmentBase,
          segmentDivider,
          // Shrinks (to 6rem) before its group overflows: on a narrow bar the
          // search gives up width first, the fixed segments beside it don't.
          'w-40 min-w-24 shrink cursor-text text-[var(--mds-color-foreground-neutral-subtle)]',
          // The segment rings as a whole when its input has focus, so the
          // ring follows the frame rather than hugging the bare text.
          'focus-within:shadow-[inset_0_0_0_2px_var(--mds-color-border-focus-default),inset_0_0_0_4px_var(--mds-color-background-default)]',
          className
        )}
      >
        {icon}
        <input
          ref={ref}
          className={cn(
            'min-w-0 flex-1 bg-transparent text-sm outline-hidden',
            'text-[var(--mds-color-foreground-input-default)] placeholder:text-[var(--mds-color-foreground-neutral-subtle)]'
          )}
          {...props}
        />
        {trailing}
      </label>
    );
  }
);
DataGridToolbarSearch.displayName = 'DataGridToolbarSearch';
