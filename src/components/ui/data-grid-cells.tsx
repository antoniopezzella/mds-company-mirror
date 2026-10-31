"use client"

import * as React from 'react';

import type { RowData } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { Icon } from './icon';
import { Badge, type BadgeTone } from './badge';
import type { DataGridRow } from './data-grid-rows';

/**
 * Cell content for the data table — Figma `Data table/Content/*` (MDS V3,
 * page "Table New Component"). Pass these from a column's `cell`.
 *
 * Every part shares one shape: a primary line (Body/Small 14/20) and an
 * optional secondary line (Body/Extra Small 12/16, neutral/subtle), both
 * single-line with an ellipsis, so a row of mixed content stays on the
 * table's 48px rhythm. `min-w-0` throughout is what lets the ellipsis happen
 * inside a table cell instead of the column growing.
 *
 * Why a module and not ad-hoc markup per column: the specimens use these same
 * six shapes in every template, and five tables hand-writing "two lines,
 * second one muted" is five slightly different line-heights.
 */

export type DataGridCellTone = 'default' | 'strong' | 'muted' | 'done' | 'success' | 'warning' | 'critical';

// Figma Content/Text Style → primary-line treatment. Secondary never changes.
const TONE_CLASS: Record<DataGridCellTone, string> = {
  default: 'text-[var(--mds-color-foreground-primary-default)]',
  strong: 'font-bold text-[var(--mds-color-foreground-primary-default)]',
  muted: 'text-[var(--mds-color-foreground-neutral-subtle)]',
  // Figma draws the strike as a 1px rule in the label colour, centred on the
  // 20px line — what `line-through` in that colour renders.
  done: 'text-[var(--mds-color-foreground-neutral-subtle)] line-through',
  success: 'text-[var(--mds-color-foreground-success-default)]',
  warning: 'text-[var(--mds-color-foreground-warning-default)]',
  critical: 'text-[var(--mds-color-foreground-critical-default)]',
};

const secondaryClass = 'truncate text-xs text-[var(--mds-color-foreground-neutral-subtle)]';

export interface DataGridCellTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Second line, 12/16 neutral/subtle — an id, a segment, a relative time. */
  secondary?: React.ReactNode;
  tone?: DataGridCellTone;
  /** `end` right-aligns both lines — numbers and dates in a numeric column. */
  align?: 'start' | 'end';
}

/** Figma `Content/Text`: primary + optional secondary line. */
export function DataGridCellText({
  secondary,
  tone = 'default',
  align = 'start',
  className,
  children,
  ...props
}: DataGridCellTextProps) {
  return (
    <div
      data-slot="data-grid-cell-text"
      className={cn('flex min-w-0 flex-col', align === 'end' ? 'items-end text-right' : 'items-start text-left', className)}
      {...props}
    >
      <span className={cn('max-w-full truncate text-sm', TONE_CLASS[tone])}>{children}</span>
      {secondary != null && <span className={cn('max-w-full', secondaryClass)}>{secondary}</span>}
    </div>
  );
}

export interface DataGridCellNumberProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Small label ABOVE the value, 12/16 neutral/subtle — "End of month". */
  caption?: React.ReactNode;
  /** Below the value — a `DataGridCellTrend`. */
  trend?: React.ReactNode;
  /** Figma Style=Strong (bold) — group and total rows. */
  strong?: boolean;
  /** `end` (default) for amounts; `start` for a number read as a label. */
  align?: 'start' | 'end';
}

/**
 * Figma `Content/Number` (17224:2247): an optional caption above, the value
 * (14/20, `tabular-nums` so digits line up down the column, Strong = bold),
 * an optional Trend below — one column, End-aligned by default. 20px tall
 * alone, 36 with a caption or a trend.
 */
export function DataGridCellNumber({
  caption,
  trend,
  strong = false,
  align = 'end',
  className,
  children,
  ...props
}: DataGridCellNumberProps) {
  return (
    <div
      data-slot="data-grid-cell-number"
      className={cn('flex min-w-0 flex-col', align === 'end' ? 'items-end text-right' : 'items-start text-left', className)}
      {...props}
    >
      {/* font-normal: the caption stays Regular inside a bold context (a
          footer/summary cell is font-bold) — Figma draws it Regular. */}
      {caption != null && <span className={cn('max-w-full font-normal', secondaryClass)}>{caption}</span>}
      <span
        className={cn(
          'max-w-full truncate text-sm tabular-nums text-[var(--mds-color-foreground-primary-default)]',
          strong && 'font-bold'
        )}
      >
        {children}
      </span>
      {trend}
    </div>
  );
}

export interface DataGridCountProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Figma Style=Strong: bold, foreground/neutral/default. Default: muted. */
  strong?: boolean;
}

/**
 * Figma `Data table/Count` (17276:10736): a 14/20 count or meta line —
 * "3 selected", the footer's "5 groups • 11 line items • Values in USD" and
 * "Forecast updated 17 Oct 2026". Default is foreground/neutral/subtle;
 * Strong is bold foreground/neutral/default.
 */
export function DataGridCount({ strong = false, className, ...props }: DataGridCountProps) {
  return (
    <span
      data-slot="data-grid-count"
      className={cn(
        'text-sm whitespace-nowrap',
        strong
          ? 'font-bold text-[var(--mds-color-foreground-neutral-default)]'
          : 'text-[var(--mds-color-foreground-neutral-subtle)]',
        className
      )}
      {...props}
    />
  );
}

export interface DataGridCellLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  secondary?: React.ReactNode;
}

/**
 * Figma `Content/Link`: an underlined primary-colour label that turns link
 * blue on hover, with an optional secondary line. A real `<a>`: rows stay
 * rows, and the link is its own focus stop (onRowClick ignores clicks that
 * start on it).
 */
export const DataGridCellLink = React.forwardRef<HTMLAnchorElement, DataGridCellLinkProps>(
  function DataGridCellLink({ secondary, className, children, ...props }, ref) {
    return (
      <div data-slot="data-grid-cell-link" className="flex min-w-0 flex-col items-start">
        <a
          ref={ref}
          className={cn(
            // Plain at rest, underlined link-blue on hover — as the specimens
            // render it (the component's own default shows an underline; every
            // table instance overrides it off).
            'max-w-full truncate rounded-sm text-sm hover:underline',
            'text-[var(--mds-color-foreground-primary-default)] hover:text-[var(--mds-color-foreground-link-default)]',
            'focus-visible:outline-hidden focus-visible:shadow-[0_0_0_2px_var(--mds-color-border-focus-default)]',
            className
          )}
          {...props}
        >
          {children}
        </a>
        {secondary != null && <span className={cn('max-w-full', secondaryClass)}>{secondary}</span>}
      </div>
    );
  }
);
DataGridCellLink.displayName = 'DataGridCellLink';

export interface DataGridCellEntityProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The leading visual: an `Avatar` (Person, 32px), a `DataGridCellLogo`
   * (Company, 24px) or a flag (Location).
   */
  leading?: React.ReactNode;
  secondary?: React.ReactNode;
}

/** Figma `Content/Entity`: leading visual, 8px gap, two lines. */
export function DataGridCellEntity({ leading, secondary, className, children, ...props }: DataGridCellEntityProps) {
  return (
    // Gap is the density's cell gap (8 / 8 / 12), as Figma binds it — the
    // Owner summary card in Comfortable sets the avatar 12px from the name.
    <div
      data-slot="data-grid-cell-entity"
      className={cn('flex min-w-0 items-center gap-[var(--dt-gap,0.5rem)]', className)}
      {...props}
    >
      {leading != null && <span className="flex shrink-0 items-center">{leading}</span>}
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm text-[var(--mds-color-foreground-primary-default)]">{children}</span>
        {secondary != null && <span className={secondaryClass}>{secondary}</span>}
      </div>
    </div>
  );
}

export interface DataGridCellLogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** One or two letters — the organisation's mark when there is no image. */
  children: React.ReactNode;
}

/**
 * Figma Entity Type=Company leading tile: 24px, radius 4, neutral/default
 * fill, 12/16 bold letter. Decorative — the name beside it is the label.
 */
export function DataGridCellLogo({ className, ...props }: DataGridCellLogoProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex size-6 items-center justify-center rounded-sm text-xs font-bold',
        'bg-[var(--mds-color-background-neutral-default)] text-[var(--mds-color-foreground-neutral-default)]',
        className
      )}
      {...props}
    />
  );
}

export interface DataGridCellDateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The date as displayed — format it with `useFormat()` for the locale. */
  children: React.ReactNode;
  /** "2m ago", "Yesterday" — the second line. */
  relative?: React.ReactNode;
  /** Machine-readable value for `<time dateTime>`. */
  dateTime?: string;
  align?: 'start' | 'end';
  /**
   * Figma `Show icon`: a 16px calendar glyph in foreground/neutral/subtle,
   * the density gap before the text. Decorative — the date says it.
   */
  showIcon?: boolean;
}

/** Figma `Content/Date`: optional calendar icon, then date over relative time. */
export function DataGridCellDate({
  children,
  relative,
  dateTime,
  align = 'start',
  showIcon = false,
  className,
  ...props
}: DataGridCellDateProps) {
  const stack = cn('flex min-w-0 flex-col', align === 'end' ? 'items-end text-right' : 'items-start');
  const lines = (
    <>
      <time dateTime={dateTime} className="max-w-full truncate text-sm text-[var(--mds-color-foreground-primary-default)]">
        {children}
      </time>
      {relative != null && <span className={cn('max-w-full', secondaryClass)}>{relative}</span>}
    </>
  );
  if (!showIcon) {
    return (
      <div data-slot="data-grid-cell-date" className={cn(stack, className)} {...props}>
        {lines}
      </div>
    );
  }
  return (
    <div
      data-slot="data-grid-cell-date"
      className={cn('flex min-w-0 items-center gap-[var(--dt-gap,0.5rem)]', align === 'end' && 'justify-end', className)}
      {...props}
    >
      <Icon pseudo name="calendar_month" size={16} className="shrink-0 text-[var(--mds-color-foreground-neutral-subtle)]" />
      <div className={stack}>{lines}</div>
    </div>
  );
}

export type DataGridCellProgressTone = 'primary' | 'success' | 'warning' | 'critical';

const PROGRESS_TONE: Record<DataGridCellProgressTone, string> = {
  primary: 'var(--mds-color-foreground-primary-default)',
  success: 'var(--mds-color-foreground-success-default)',
  warning: 'var(--mds-color-foreground-warning-default)',
  critical: 'var(--mds-color-foreground-critical-default)',
};

export interface DataGridCellProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 0–100. */
  value: number;
  /** `ring` (20px donut) or `bar` (4px track that fills the cell). */
  type?: 'ring' | 'bar';
  /** Colour of the filled part. The label never changes colour. Bar is primary only in Figma. */
  tone?: DataGridCellProgressTone;
  /** Visible label after the graphic. Defaults to "N%". Pass `null` for none. */
  label?: React.ReactNode;
}

/**
 * Figma `Content/Progress`.
 *
 * Not `CircularProgress`/`LinearProgress`: those are loading indicators —
 * they name themselves "Loading", have no track, and have no warning tone.
 * This is a static readout whose VISIBLE label is the value, so the graphic
 * is decorative and the label carries it for assistive tech.
 *
 * Ring: 20px, 3px thick, starts at 12 o'clock, square ends, neutral/default
 * track. Bar: 4px, no radius, primary fill with a 2px surface-coloured gap
 * where the fill meets the track.
 */
export function DataGridCellProgress({
  value,
  type = 'ring',
  tone = 'primary',
  label,
  className,
  ...props
}: DataGridCellProgressProps) {
  const v = Math.max(0, Math.min(100, value));
  const text = label === undefined ? `${Math.round(v)}%` : label;
  // r = 8.5 keeps a 3px stroke inside the 20px box: 20/2 - 3/2.
  const c = 2 * Math.PI * 8.5;
  return (
    <div
      data-slot="data-grid-cell-progress"
      className={cn('flex min-w-0 items-center gap-[var(--dt-gap,0.5rem)]', type === 'bar' && 'w-full', className)}
      {...props}
    >
      {type === 'ring' ? (
        <svg aria-hidden="true" width={20} height={20} viewBox="0 0 20 20" className="shrink-0 -rotate-90">
          <circle cx={10} cy={10} r={8.5} fill="none" strokeWidth={3} stroke="var(--mds-color-background-neutral-default)" />
          {v > 0 && (
            <circle
              cx={10}
              cy={10}
              r={8.5}
              fill="none"
              strokeWidth={3}
              strokeLinecap="butt"
              stroke={PROGRESS_TONE[tone]}
              strokeDasharray={`${(v / 100) * c} ${c}`}
            />
          )}
        </svg>
      ) : (
        <span aria-hidden="true" className="relative flex h-1 min-w-0 flex-1 bg-[var(--mds-color-background-neutral-default)]">
          {v > 0 && (
            <span
              className={cn(
                'h-full',
                // The 2px surface gap between fill and track — absent at 100%.
                v < 100 && 'border-e-2 border-[var(--mds-color-background-default)]'
              )}
              style={{ width: `${v}%`, backgroundColor: PROGRESS_TONE[tone] }}
            />
          )}
        </span>
      )}
      {text != null && (
        <span className="shrink-0 text-sm whitespace-nowrap text-[var(--mds-color-foreground-primary-default)]">{text}</span>
      )}
    </div>
  );
}

export interface DataGridCellTrendProps extends React.HTMLAttributes<HTMLSpanElement> {
  direction: 'up' | 'down' | 'neutral';
  /** "+12.7%" — the sign is the author's; the colour follows `direction`. */
  children: React.ReactNode;
}

const TREND_COLOR = {
  up: 'text-[var(--mds-color-foreground-success-default)]',
  down: 'text-[var(--mds-color-foreground-critical-default)]',
  neutral: 'text-[var(--mds-color-foreground-neutral-subtle)]',
} as const;

/**
 * Figma `Content/Trend`: 16px trending icon (an en dash when neutral) and a
 * 12/16 bold value, 4px apart, both in the direction's colour. The direction
 * is also in the text for assistive tech — colour and an icon alone do not
 * say "up".
 */
export function DataGridCellTrend({ direction, className, children, ...props }: DataGridCellTrendProps) {
  // Figma: Material trending_up / trending_down at 16px.
  const glyph = direction === 'up' ? 'trending_up' : direction === 'down' ? 'trending_down' : null;
  return (
    <span
      data-slot="data-grid-cell-trend"
      className={cn('inline-flex items-center gap-1 text-xs font-bold whitespace-nowrap', TREND_COLOR[direction], className)}
      {...props}
    >
      {glyph ? <Icon pseudo name={glyph} size={16} className="shrink-0" /> : <span aria-hidden="true">–</span>}
      <span className="sr-only">{direction === 'up' ? 'Up' : direction === 'down' ? 'Down' : 'No change'} </span>
      {children}
    </span>
  );
}

// ── Alerts ───────────────────────────────────────────────────────────────

// Filled 16px severity marks: lucide strokes every path in one colour, so a
// filled shape with a contrasting glyph is drawn here instead.
function CriticalMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0">
      <circle cx="8" cy="8" r="7" fill="var(--mds-color-foreground-critical-default)" />
      <path d="M5.5 5.5l5 5m0-5l-5 5" stroke="var(--mds-color-background-default)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WarningMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0">
      <path d="M8 1.5L15 14H1L8 1.5z" fill="var(--mds-color-foreground-warning-default)" strokeLinejoin="round" />
      <path d="M8 6v3.5" stroke="var(--mds-color-background-default)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11.75" r="0.9" fill="var(--mds-color-background-default)" />
    </svg>
  );
}

export interface DataGridCellAlertsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  critical: number;
  warning: number;
  /** Shown when both counts are 0. */
  noneLabel?: React.ReactNode;
}

/**
 * Figma `Content/Alerts`: a count per severity — filled critical mark + count,
 * then filled warning mark + count (groups 8 apart, 4 inside). "None" in muted
 * text when both are 0. A group with a zero count is dropped. The marks are
 * decorative; the severity is spelled out for assistive tech.
 */
export function DataGridCellAlerts({ critical, warning, noneLabel = 'None', className, ...props }: DataGridCellAlertsProps) {
  if (critical === 0 && warning === 0) {
    return (
      <div data-slot="data-grid-cell-alerts" className={cn('text-sm text-[var(--mds-color-foreground-neutral-subtle)]', className)} {...props}>
        {noneLabel}
      </div>
    );
  }
  return (
    <div data-slot="data-grid-cell-alerts" className={cn('flex items-center gap-2 text-sm tabular-nums', className)} {...props}>
      {critical > 0 && (
        <span className="inline-flex items-center gap-1 text-[var(--mds-color-foreground-primary-default)]">
          <CriticalMark />
          {critical}
          <span className="sr-only"> critical</span>
        </span>
      )}
      {warning > 0 && (
        <span className="inline-flex items-center gap-1 text-[var(--mds-color-foreground-primary-default)]">
          <WarningMark />
          {warning}
          <span className="sr-only"> {warning === 1 ? 'warning' : 'warnings'}</span>
        </span>
      )}
    </div>
  );
}

// ── Tags ─────────────────────────────────────────────────────────────────

export interface DataGridCellTag {
  label: string;
  tone?: BadgeTone;
}

export interface DataGridCellTagsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  tags: DataGridCellTag[];
  /** Badges shown before the rest collapse into "+N". Figma: 3. */
  max?: number;
}

/**
 * Figma `Content/Tags`: Subtle badges 4 apart, up to `max`, then "+N" in
 * 12/16 muted. The hidden tags are named in the "+N" element's title and
 * accessible text. No tags renders the missing-data dash.
 */
export function DataGridCellTags({ tags, max = 3, className, ...props }: DataGridCellTagsProps) {
  if (tags.length === 0) {
    return (
      <div data-slot="data-grid-cell-tags" className={cn('text-sm text-[var(--mds-color-foreground-neutral-subtle)]', className)} {...props}>
        —
      </div>
    );
  }
  const shown = tags.slice(0, max);
  const rest = tags.slice(max);
  return (
    <div data-slot="data-grid-cell-tags" className={cn('flex min-w-0 items-center gap-1', className)} {...props}>
      {shown.map((t) => (
        <Badge key={t.label} variant="soft" tone={t.tone} className="shrink-0">
          {t.label}
        </Badge>
      ))}
      {rest.length > 0 && (
        <span className="shrink-0 text-xs text-[var(--mds-color-foreground-neutral-subtle)]" title={rest.map((t) => t.label).join(', ')}>
          <span aria-hidden="true">+{rest.length}</span>
          <span className="sr-only">and {rest.length} more: {rest.map((t) => t.label).join(', ')}</span>
        </span>
      )}
    </div>
  );
}

// ── Done check ───────────────────────────────────────────────────────────

export interface DataGridDoneCheckProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  done: boolean;
  onDoneChange?: (done: boolean) => void;
  /** e.g. "Mark Draft summary done" — required: the control has no visible text. */
  'aria-label': string;
}

/**
 * Figma `Control/Done check`: a 24px hit box holding an 18px circle (1.5px
 * border/default); done = filled foreground/primary with a 14px check. A
 * toggle button (`aria-pressed`), not a checkbox — it marks a task done, it
 * does not select the row. Pair it with `DataGridCellText tone="done"`.
 */
export const DataGridDoneCheck = React.forwardRef<HTMLButtonElement, DataGridDoneCheckProps>(
  function DataGridDoneCheck({ done, onDoneChange, onClick, className, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={done}
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented) onDoneChange?.(!done);
        }}
        className={cn(
          'flex size-6 shrink-0 items-center justify-center rounded-sm',
          'focus-visible:outline-hidden focus-visible:shadow-[0_0_0_2px_var(--mds-color-border-focus-default)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            'flex size-[18px] items-center justify-center rounded-full border-[1.5px]',
            done
              ? 'border-[var(--mds-color-foreground-primary-default)] bg-[var(--mds-color-foreground-primary-default)] text-[var(--mds-color-background-default)]'
              : 'border-[var(--mds-color-border-default)]'
          )}
        >
          {/* Figma Control/Done check: Material `check` at 14px. */}
          {done && <Icon pseudo name="check" size={14} />}
        </span>
      </button>
    );
  }
);
DataGridDoneCheck.displayName = 'DataGridDoneCheck';

// ── Cell message ─────────────────────────────────────────────────────────

export interface DataGridCellMessageProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'critical' | 'success';
}

const MESSAGE_TONE = {
  critical: 'bg-[var(--mds-color-background-critical-default)] text-[var(--mds-color-foreground-on-critical)]',
  success: 'bg-[var(--mds-color-background-success-default)] text-[var(--mds-color-foreground-on-success)]',
} as const;

/**
 * Figma `Cell message`: an inline 12/16 message under a cell's value, p 2/6,
 * on the tone's solid fill. The row grows to fit it (rows are a minimum
 * height). Give it an `id` and point the editor's `aria-describedby` at it.
 *
 * DECISION: D2 — Figma draws r 2; controls use CONTROL_RADIUS (4) until the
 * system-wide radius decision.
 */
export function DataGridCellMessage({ tone = 'critical', className, ...props }: DataGridCellMessageProps) {
  return (
    <span
      data-slot="data-grid-cell-message"
      className={cn('inline-flex max-w-full rounded-sm px-1.5 py-0.5 text-xs', MESSAGE_TONE[tone], className)}
      {...props}
    />
  );
}

// ── Tree ─────────────────────────────────────────────────────────────────

export interface DataGridCellTreeProps<TData extends RowData> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  row: DataGridRow<TData>;
  /** The label — usually a `DataGridCellText`. */
  children: React.ReactNode;
  /** Before the label, after the toggle — e.g. a `DataGridDoneCheck`. */
  leading?: React.ReactNode;
  /** After the label — e.g. a progress ring. */
  trailing?: React.ReactNode;
  /**
   * `aligned` (default) reserves the toggle's 24px on leaf rows so labels at
   * one depth line up; `compact` drops it.
   */
  indent?: 'aligned' | 'compact';
  /** Toggle label; `{label}` is replaced with `toggleName`. */
  toggleLabel?: string;
  /** The row's name for the toggle's accessible label. */
  toggleName?: string;
}

/**
 * Figma `Content/Tree`: one 24px step per level, the Expand toggle (or a 24px
 * spacer), optional leading, the label, optional trailing — all 8 apart, in
 * ONE cell. Use it as the first column's cell with `getSubRows` on the table;
 * it replaces `createExpandColumn` for hierarchy (that column's fixed width
 * cannot hold a growing indent).
 *
 * For consumer-shaped hierarchy (`getSubRows`). Grouped data — flat rows
 * grouped by the engine (`useDataGridTable({ grouping })`) — renders its
 * group rows through {@link DataGridGroupCell}, which builds on this. Not
 * `role="treegrid"` — see docs/tasks/data-table-v3.md.
 */
export function DataGridCellTree<TData extends RowData>({
  row,
  children,
  leading,
  trailing,
  indent = 'aligned',
  toggleLabel = 'Toggle {label}',
  toggleName,
  className,
  ...props
}: DataGridCellTreeProps<TData>) {
  const canExpand = row.getCanExpand();
  const expanded = row.getIsExpanded();
  return (
    <div data-slot="data-grid-cell-tree" className={cn('flex min-w-0 items-center gap-[var(--dt-gap,0.5rem)]', className)} {...props}>
      {Array.from({ length: row.depth }, (_, i) => (
        <span key={i} aria-hidden="true" className="size-6 shrink-0" />
      ))}
      {canExpand ? (
        <button
          type="button"
          onClick={row.getToggleExpandedHandler()}
          // Hand-off §5 Interaction: the Expand control also opens on → and
          // closes on ← — tree children as well as a Detail row. Only the
          // key that changes something is swallowed.
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight' && !expanded) {
              e.preventDefault();
              e.stopPropagation();
              row.toggleExpanded(true);
            } else if (e.key === 'ArrowLeft' && expanded) {
              e.preventDefault();
              e.stopPropagation();
              row.toggleExpanded(false);
            }
          }}
          aria-expanded={expanded}
          aria-label={toggleLabel.replace('{label}', toggleName ?? `row ${row.index + 1}`)}
          className={cn(
            'flex size-6 shrink-0 items-center justify-center rounded-sm text-[var(--mds-color-foreground-neutral-subtle)]',
            'hover:bg-[var(--mds-color-overlay-neutral-hover)]',
            'focus-visible:outline-hidden focus-visible:shadow-[0_0_0_2px_var(--mds-color-border-focus-default)]'
          )}
        >
          {/* Hand-off §5 Motion: rotate 90° in 150 ms ease-out; none under reduced motion. */}
          <Icon
            name="chevron_right"
            size={16}
            className={cn(
              'transition-transform duration-150 ease-out motion-reduce:transition-none motion-reduce:duration-0',
              expanded && 'rotate-90'
            )}
          />
        </button>
      ) : (
        indent === 'aligned' && <span aria-hidden="true" className="size-6 shrink-0" />
      )}
      {leading}
      <div className="min-w-0 flex-1">{children}</div>
      {trailing}
    </div>
  );
}

// ── Group row label ──────────────────────────────────────────────────────

export interface DataGridGroupCellProps<TData extends RowData>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** A grouped row — `row.getIsGrouped()`. */
  row: DataGridRow<TData>;
  /** The group's label. Defaults to the row's grouping value. */
  label?: React.ReactNode;
  /**
   * Text muted count after the label. Defaults to "N item(s)" from the
   * group's leaf rows — after filtering, so it follows the search. `false`
   * hides it.
   */
  count?: React.ReactNode | false;
  /** After the label — e.g. a confidence ring. */
  trailing?: React.ReactNode;
  /** See {@link DataGridCellTree}. */
  indent?: 'aligned' | 'compact';
}

/**
 * The label cell of a group row (hand-off §5b#21, T8): the Expand toggle
 * (`aria-expanded`; Enter/Space — it is a real <button>), the label in Text
 * *Strong* and the item count in Text *Muted*. The grid renders this by
 * default for the grouping column's cell on a group row; render it yourself
 * from the column's `aggregatedCell` to add `trailing` content.
 */
export function DataGridGroupCell<TData extends RowData>({
  row,
  label,
  count,
  trailing,
  indent = 'compact',
  ...props
}: DataGridGroupCellProps<TData>) {
  const resolvedLabel = label ?? String(row.groupingValue ?? '');
  const leafCount = row.getLeafRows().length;
  const resolvedCount = count ?? `${leafCount} ${leafCount === 1 ? 'item' : 'items'}`;
  return (
    <DataGridCellTree
      row={row}
      indent={indent}
      toggleName={typeof resolvedLabel === 'string' ? resolvedLabel : undefined}
      trailing={trailing}
      data-slot="data-grid-group-cell"
      {...props}
    >
      <div className="flex min-w-0 items-baseline gap-[var(--dt-gap,0.5rem)]">
        <DataGridCellText tone="strong" className="min-w-0 shrink">
          {resolvedLabel}
        </DataGridCellText>
        {resolvedCount !== false && (
          <DataGridCellText tone="muted" className="shrink-0">
            {resolvedCount}
          </DataGridCellText>
        )}
      </div>
    </DataGridCellTree>
  );
}
