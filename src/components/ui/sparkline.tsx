"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
import { roleVar } from '@/theme/roles';

/**
 * A tiny trend line for inside a KPI tile, table cell or list row.
 *
 * Deliberately a hand-rolled `<svg>` rather than Recharts, which is already a
 * dependency, for three reasons:
 *
 * 1. Recharts' `ResponsiveContainer` mounts a `ResizeObserver` per instance.
 *    Four to eight KPI tiles in a grid each doing that produces measurable
 *    mount flicker, for a line that needs no axes, tooltip or legend.
 * 2. `ChartMetricCard` — the existing sparkline card — builds a gradient id
 *    from the label: ``id={`grad-${label.replace(/\s/g,'')}`}``. Two tiles
 *    with the same label collide, and a label with punctuation produces an
 *    invalid DOM id. Not reproducing that.
 * 3. A standalone atom can be used in a table cell, which a card-shaped
 *    chart component cannot.
 *
 * Always `aria-hidden`: the trend is already stated in the delta text beside
 * it, and a screen reader cannot usefully consume a polyline anyway.
 */

export type SparklineSentiment = 'positive' | 'negative' | 'neutral';

export interface SparklineProps extends Omit<React.ComponentProps<'svg'>, 'children'> {
  /** The series. Fewer than two points renders nothing — a line needs two. */
  data: number[];
  /** Drives the stroke colour via the status roles. */
  sentiment?: SparklineSentiment;
  /** Rendered height in px. Width always fills the container. */
  height?: number;
  /** Explicit stroke colour, overriding `sentiment`. */
  color?: string;
}

const SENTIMENT_ROLE = {
  positive: 'fg.success',
  negative: 'fg.critical',
  neutral: 'fg.neutral.subtle',
} as const;

export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(
  ({ data, sentiment = 'neutral', height = 40, color, className, ...props }, ref) => {
    const points = React.useMemo(() => {
      if (!data || data.length < 2) return null;

      const min = Math.min(...data);
      const max = Math.max(...data);
      const span = max - min;

      // A flat series has zero span; dividing by it yields NaN and the path
      // silently disappears. Draw it down the middle instead — "no change" is
      // a real and common answer for a KPI.
      return data
        .map((v, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = span === 0 ? 50 : 100 - ((v - min) / span) * 100;
          return `${x},${y}`;
        })
        .join(' ');
    }, [data]);

    if (!points) return null;

    return (
      <svg
        ref={ref}
        // `preserveAspectRatio="none"` lets the 0-100 viewBox stretch to any
        // container width; `vector-effect` keeps the stroke 1.5px regardless,
        // so the line does not get fat when the tile is wide.
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        height={height}
        aria-hidden="true"
        focusable="false"
        className={cn('w-full', className)}
        style={{ height }}
        {...props}
      >
        <polyline
          points={points}
          fill="none"
          stroke={color ?? roleVar(SENTIMENT_ROLE[sentiment])}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }
);
Sparkline.displayName = 'Sparkline';
