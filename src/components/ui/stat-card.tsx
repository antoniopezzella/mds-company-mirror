"use client"

import * as React from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  formatDelta,
  formatValue,
  type CurrencyFormatOptions,
  type DateFormatOptions,
  type Formattable,
  type FormatKind,
} from '@/lib/format';
import { useFormatConfig } from '@/lib/format-context';
import { DataError } from './error-state';
import { resolveDataStatus, type DataStateProps } from './data-state';
import { Skeleton } from './skeleton';
import { Sparkline } from './sparkline';

export type StatCardTrend = 'up' | 'down' | 'neutral';

/**
 * Which direction is good news. Insurance needs this constantly: premium up
 * is good, open claims up is not, and headcount has no valence at all.
 */
export type DeltaPolarity = 'up-is-good' | 'down-is-good' | 'neutral';

export interface StatCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    DataStateProps {
  /** Main label/title of the metric. */
  label: React.ReactNode;

  /**
   * The metric. **Pass a number and let the card format it** — that is the
   * point of `format`.
   *
   * Widened from `string`, which was the root cause of this repo shipping
   * `$1,250.00`, `$12,400`, `$2.4M` and `$13.362B` side by side: the type
   * pushed formatting onto every consumer, so every consumer invented its
   * own. Strings still pass through untouched, so existing call sites are
   * unaffected.
   */
  value: Formattable;

  /** How to render `value`. Omit for strings; pass a name or a function for numbers. */
  format?: FormatKind | ((value: Formattable) => string);
  /** Per-card overrides of locale/currency/decimals. */
  formatOptions?: CurrencyFormatOptions & DateFormatOptions;

  /**
   * Change versus the comparison period. **Direction is derived from the
   * sign** — there is no way to state a delta that disagrees with its arrow.
   *
   * Percentage *points*, not a ratio: `delta={12.5}` renders "+12.5%",
   * matching `formatPercent`.
   */
  delta?: number;
  /** How to render `delta`. Defaults to a percentage. */
  deltaFormat?: 'percent' | 'number' | 'currency';
  /** Which direction is good news. Defaults to up-is-good. */
  deltaPolarity?: DeltaPolarity;

  /**
   * Pre-formatted change string.
   * @deprecated since 0.7.0; remove after 0.8.0 / 2026-12-23.
   *  Use `delta` — it derives direction from the sign.
   */
  change?: string;
  /**
   * Explicit trend direction.
   * @deprecated since 0.7.0; remove after 0.8.0 / 2026-12-23.
   *  Use `delta` (direction is derived) with `deltaPolarity`.
   * Kept because it can contradict the number it sits beside, which is a bug
   * this component has shipped — see the note on `deltaSentiment` below.
   */
  trend?: StatCardTrend;

  /** Trend description text, e.g. "faster than last quarter". */
  trendDescription?: string;
  /** Label for a secondary comparison value, e.g. "At Renewal". */
  comparisonLabel?: string;
  /** Value for the secondary comparison. Formatted with the same `format`. */
  comparisonValue?: Formattable;
  /** Secondary description below trend. */
  description?: string;

  /** Series for an inline trend line. Colour follows the delta's sentiment. */
  sparkline?: number[];

  /**
   * Element for `label`. Defaults to `'p'` — **a KPI label is not a section
   * heading**, and the section containing the row of tiles is. This used to be
   * a hardcoded `<h3>`, which broke heading order under a page `<h1>` and
   * forced callers to add a visually-hidden `<h2>` to compensate.
   */
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

  className?: string;
}

/** Arrow follows direction. */
function deltaDirection(delta: number): StatCardTrend {
  if (delta > 0) return 'up';
  if (delta < 0) return 'down';
  return 'neutral';
}

/**
 * Colour follows *sentiment*, which is direction × polarity — a different
 * function from direction, and collapsing the two is a live bug in this
 * repo today:
 *
 *   DashboardDemo.tsx:268
 *   <StatCard value="14 days" change="-2 days" trend="down"
 *             trendDescription="faster than last quarter" />
 *
 * `trend="down"` maps to the danger role, so an improvement the caption
 * itself calls "faster" renders red. With `delta={-2}` and
 * `deltaPolarity="down-is-good"` the arrow still points down and the colour
 * is green, which is what was meant.
 */
function deltaSentiment(direction: StatCardTrend, polarity: DeltaPolarity): StatCardTrend {
  if (direction === 'neutral' || polarity === 'neutral') return 'neutral';
  if (polarity === 'down-is-good') return direction === 'down' ? 'up' : 'down';
  return direction;
}

/**
 * StatCard — the dashboard KPI tile.
 *
 * @example
 * ```tsx
 * <StatCard
 *   label="Total premium"
 *   value={1250000}
 *   format="currency"
 *   formatOptions={{ compact: true }}
 *   delta={12.5}
 *   trendDescription="vs last quarter"
 *   sparkline={[8, 12, 10, 14, 16]}
 * />
 *
 * // Down is good here — fewer open claims.
 * <StatCard label="Open claims" value={3} delta={-2} deltaFormat="number"
 *           deltaPolarity="down-is-good" />
 * ```
 */
const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      label,
      value,
      format,
      formatOptions,
      delta,
      deltaFormat = 'percent',
      deltaPolarity = 'up-is-good',
      change,
      trend,
      trendDescription,
      comparisonLabel,
      comparisonValue,
      description,
      sparkline,
      as: As = 'p',
      loading,
      loadError,
      onRetry,
      className,
      ...props
    },
    ref
  ) => {
    const status = resolveDataStatus({ loading, loadError }, 'StatCard');

    // Locale and currency come from the ambient FormatProvider, with this
    // card's own `formatOptions` winning over it — the usual precedence, and
    // the reason the provider exists at all. Passing `formatOptions` straight
    // through (as this did) meant `<FormatProvider currency="EUR">` had no
    // effect on the one component in the set that formats anything, so the
    // provider was exported and inert.
    const ambient = useFormatConfig();
    const opts: CurrencyFormatOptions & DateFormatOptions = {
      locale: ambient.locale,
      currency: ambient.currency,
      placeholder: ambient.placeholder,
      ...formatOptions,
    };

    // `delta` derives its own direction; `trend` is the deprecated override.
    const direction: StatCardTrend =
      delta !== undefined ? deltaDirection(delta) : (trend ?? 'neutral');
    const sentiment = delta !== undefined ? deltaSentiment(direction, deltaPolarity) : direction;

    const deltaText =
      delta !== undefined ? formatDelta(delta, deltaFormat, opts) : change;

    const DirectionIcon =
      direction === 'up' ? TrendingUp : direction === 'down' ? TrendingDown : ArrowRight;

    // Status roles, not raw Tailwind palette classes: those were text-green-600
    // on bg-green-50 (3.14:1) and text-red-600 on bg-red-50 (4.41:1) — both
    // under AA, and 39 axe violations in this component's stories alone. The
    // status roles ARE contrast-validated against their own backgrounds and
    // follow the theme without a separate `dark:` variant.
    const badgeStyle: React.CSSProperties =
      sentiment === 'up'
        ? { color: 'var(--role-fg-success)', backgroundColor: 'var(--role-bg-success-subtle)' }
        : sentiment === 'down'
          ? { color: 'var(--role-fg-critical)', backgroundColor: 'var(--role-bg-critical-subtle)' }
          : { color: 'var(--role-fg-neutral-subtle)', backgroundColor: 'var(--role-bg-neutral-subtle)' };

    const shell = cn(
      'flex flex-col gap-4',
      'rounded-lg border border-border bg-card p-6',
      'shadow-xs transition-shadow hover:shadow-md',
      className
    );

    // Loading and error render IN PLACE rather than through <DataState>: an
    // icon-and-headline block inside a 120px tile is absurd, and swapping the
    // subtree would make a 4-tile grid reflow the moment data lands.
    if (status === 'loading') {
      return (
        <div ref={ref} className={shell} aria-busy="true" {...props}>
          <Skeleton height={14} width="45%" />
          <Skeleton height={32} width="70%" />
          {sparkline && <Skeleton height={40} width="100%" />}
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div ref={ref} className={shell} {...props}>
          <As className="text-sm font-medium text-muted-foreground">{label}</As>
          <DataError variant="inline" onRetry={onRetry} description={undefined} />
        </div>
      );
    }

    return (
      <div ref={ref} className={shell} {...props}>
        {/* Header: label + delta badge */}
        <div className="flex items-start justify-between gap-2">
          <As className="text-sm font-medium text-muted-foreground">{label}</As>
          {deltaText && (
            <div
              className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
              style={badgeStyle}
            >
              {/* The sign and the arrow both carry the meaning, so colour is
                  never the only signal (WCAG 1.4.1). */}
              <DirectionIcon className="h-3 w-3" aria-hidden="true" />
              <span>{deltaText}</span>
            </div>
          )}
        </div>

        {/* The metric. `tabular-nums` so digits line up across a row of tiles. */}
        <div className="text-3xl font-bold tracking-tight text-foreground tabular-nums">
          {formatValue(value, format, opts)}
        </div>

        {sparkline && (
          <Sparkline
            data={sparkline}
            sentiment={
              sentiment === 'up' ? 'positive' : sentiment === 'down' ? 'negative' : 'neutral'
            }
          />
        )}

        {(comparisonLabel || comparisonValue !== undefined) && (
          <div className="text-sm text-muted-foreground">
            {comparisonLabel}
            {comparisonLabel && comparisonValue !== undefined ? ': ' : ''}
            <span className="font-medium text-foreground tabular-nums">
              {formatValue(comparisonValue, format, opts)}
            </span>
          </div>
        )}

        {trendDescription && (
          <div
            className="flex items-center gap-1.5 text-sm font-medium"
            style={{ color: badgeStyle.color }}
          >
            <DirectionIcon className="h-4 w-4" aria-hidden="true" />
            <span>{trendDescription}</span>
          </div>
        )}

        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    );
  }
);

StatCard.displayName = 'StatCard';

export { StatCard };
