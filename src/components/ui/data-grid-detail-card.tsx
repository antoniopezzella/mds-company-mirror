"use client"

import * as React from 'react';
import { Icon } from './icon';

import { cn } from '@/lib/utils';
import { DENSITY_VARS, type DataGridDensity } from './data-grid';

/**
 * Figma `Data table/Detail card` and its card parts (MDS V3, page "Table New
 * Component") — the cards an expanded row shows in a `DataGridDetailPanel`.
 *
 * One slot-based component, as in Figma: `header`, content (children) and
 * `footer`, each laid out the way the design's slot is. Anything can go in a
 * slot; the parts below are the ones Figma offers when a designer clicks in.
 *
 * Why not `Card`: Card is a page-level surface with its own title/description
 * hierarchy and 12px corners. This sits INSIDE a table row, takes its padding
 * and gaps from the table's density (16/8 standard, 12/8 compact, 20/12
 * comfortable), and is a flat 8px-corner tile with no shadow.
 */

export interface DataGridDetailCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Top row — a status badge, a priority, an overflow menu. Laid out in a row, centred. */
  header?: React.ReactNode;
  /** Bottom row — spread to both ends (rating left, progress right). */
  footer?: React.ReactNode;
  /**
   * Overrides the table's density for this card. Inside a grid the card
   * already follows the grid's mode; set this for a card used on its own, or
   * to show a mode deliberately (Figma's Compact / Comfortable examples).
   */
  density?: DataGridDensity;
}

/** Figma `Data table/Detail card`. */
export const DataGridDetailCard = React.forwardRef<HTMLDivElement, DataGridDetailCardProps>(
  function DataGridDetailCard({ header, footer, density, className, style, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="data-grid-detail-card"
        className={cn(
          'flex min-w-0 flex-col gap-[var(--dt-gap,0.5rem)] rounded-lg border p-[var(--dt-inset-x,1rem)]',
          'border-[var(--mds-color-border-subtle)] bg-[var(--mds-color-background-default)] text-sm text-[var(--mds-color-foreground-primary-default)]',
          className
        )}
        style={{ ...(density ? (DENSITY_VARS[density] as React.CSSProperties) : null), ...style }}
        {...props}
      >
        {header != null && <div className="flex min-w-0 items-center gap-[var(--dt-gap,0.5rem)]">{header}</div>}
        {children != null && <div className="flex min-w-0 flex-col gap-[var(--dt-gap,0.5rem)]">{children}</div>}
        {footer != null && (
          <div className="flex min-w-0 items-center justify-between gap-[var(--dt-gap,0.5rem)]">{footer}</div>
        )}
      </div>
    );
  }
);
DataGridDetailCard.displayName = 'DataGridDetailCard';

/**
 * The row of cards inside a detail panel — Figma's Content slot: equal-width
 * cards, 16px apart (the density inset), wrapping when the row is narrow.
 */
export function DataGridDetailCards({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="data-grid-detail-cards"
      className={cn(
        'grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-[var(--dt-inset-x,1rem)]',
        className
      )}
      {...props}
    />
  );
}

/** Figma `Card part/Title`: 16/24 medium, wraps. A heading only if you make it one. */
export function DataGridCardTitle({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="data-grid-card-title"
      className={cn('text-base leading-6 font-medium text-[var(--mds-color-foreground-primary-default)]', className)}
      {...props}
    />
  );
}

export interface DataGridCardMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A 24px `Avatar` (size xs) before the text. */
  avatar?: React.ReactNode;
}

/** Figma `Card part/Meta`: optional 24px avatar, 8px, then 14/20 muted text. */
export function DataGridCardMeta({ avatar, className, children, ...props }: DataGridCardMetaProps) {
  return (
    <div
      data-slot="data-grid-card-meta"
      className={cn('flex min-w-0 items-center gap-2 text-sm text-[var(--mds-color-foreground-neutral-subtle)]', className)}
      {...props}
    >
      {avatar != null && <span className="flex shrink-0">{avatar}</span>}
      <span className="truncate">{children}</span>
    </div>
  );
}

export interface DataGridCardRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–5, in halves. Drives the stars AND the score text. */
  value: number;
  /** The score as shown. Defaults to `value` to one decimal. */
  label?: React.ReactNode;
}

/**
 * Figma `Card part/Rating`: five 16px stars (primary filled, disabled for
 * the rest, a half star where it falls) and the score in muted text.
 *
 * The stars follow `value` — rounded to the nearest half. Figma's specimens
 * show 3½ stars beside "2.4" because its Rating instance is not bound to the
 * score; the code does not reproduce that.
 */
export function DataGridCardRating({ value, label, className, ...props }: DataGridCardRatingProps) {
  const v = Math.max(0, Math.min(5, Math.round(value * 2) / 2));
  const text = label ?? value.toFixed(1);
  return (
    <div
      data-slot="data-grid-card-rating"
      className={cn('flex items-center gap-2 text-sm text-[var(--mds-color-foreground-neutral-subtle)]', className)}
      {...props}
    >
      <span role="img" aria-label={`Rated ${v} out of 5`} className="flex">
        {Array.from({ length: 5 }, (_, i) => {
          const fill = v - i;
          // Figma Rating Star (Small): the Marsh `star` glyph filled in a
          // 16px box (so stars sit ~3px apart), `star_half` for a half —
          // half filled, half outline — and a disabled-grey filled star
          // for the rest.
          return (
            <Icon
              key={i}
              name={fill === 0.5 ? 'star_half' : 'star'}
              size={16}
              fill={fill !== 0.5}
              className={
                fill > 0
                  ? 'text-[var(--mds-color-foreground-primary-default)]'
                  : 'text-[var(--mds-color-foreground-disabled)]'
              }
            />
          );
        })}
      </span>
      <span aria-hidden="true">{text}</span>
    </div>
  );
}

export interface DataGridCardKeyValueProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  label: React.ReactNode;
  children: React.ReactNode;
}

/** Figma `Card part/Key value`: 12/16 muted label over a 14/20 value. */
export function DataGridCardKeyValue({ label, children, className, ...props }: DataGridCardKeyValueProps) {
  return (
    <div data-slot="data-grid-card-key-value" className={cn('flex min-w-0 flex-col', className)} {...props}>
      <span className="text-xs text-[var(--mds-color-foreground-neutral-subtle)]">{label}</span>
      <span className="text-sm text-[var(--mds-color-foreground-primary-default)]">{children}</span>
    </div>
  );
}
