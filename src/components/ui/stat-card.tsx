"use client"

import * as React from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Main label/title of the metric. Widened from `string` to `ReactNode`
   *  (backward compatible — a string is a valid ReactNode) so callers can
   *  carry an inline icon/tooltip alongside the text. */
  label: React.ReactNode;
  /** Primary metric value displayed large */
  value: string;
  /** Change percentage/amount (e.g., '+12.5%', '-20%') */
  change?: string;
  /** Trend direction */
  trend?: 'up' | 'down' | 'neutral';
  /** Trend description text */
  trendDescription?: string;
  /** Label for a secondary comparison value, e.g. "At Renewal" */
  comparisonLabel?: string;
  /** Value for the secondary comparison, e.g. "394" */
  comparisonValue?: string;
  /** Secondary description below trend */
  description?: string;
  /** Custom className for additional styling */
  className?: string;
}

/**
 * StatCard - Advanced KPI card with trend indicators and descriptions
 * 
 * Features:
 * - Header with label and trend badge
 * - Large metric value display
 * - Trend indicator with icon and text
 * - Secondary description text
 * - Automatic color coding based on trend direction
 * 
 * @example
 * ```tsx
 * <StatCard
 *   label="Total Revenue"
 *   value="$1,250.00"
 *   change="+12.5%"
 *   trend="up"
 *   trendDescription="Trending up this month"
 *   description="Visitors for the last 6 months"
 * />
 * ```
 */
const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({
    label,
    value,
    change,
    trend = 'neutral',
    trendDescription,
    comparisonLabel,
    comparisonValue,
    description,
    className,
    ...props
  }, ref) => {
    // Determine trend icon
    const TrendIcon = trend === 'up' 
      ? TrendingUp 
      : trend === 'down' 
        ? TrendingDown 
        : ArrowRight;

    // These were raw Tailwind palette classes — text-green-600 on bg-green-50
    // (3.14:1) and text-red-600 on bg-red-50 (4.41:1), both under AA, and 39
    // axe violations in this component's stories alone. They also bypassed the
    // role system entirely, which is exactly what CLAUDE.md's "no hardcoded
    // colours" rule exists to prevent: Tailwind's palette has no relationship
    // to MDS tokens and gets no contrast validation.
    //
    // Now driven by the status roles, which ARE contrast-validated against
    // their own backgrounds (see the status pairs in check-contrast.js) and
    // follow the theme without a separate `dark:` variant.
    const trendStyle: React.CSSProperties =
      trend === 'up'
        ? { color: getRoleColor('status.success.fg'), backgroundColor: getRoleColor('status.success.bg') }
        : trend === 'down'
          ? { color: getRoleColor('status.danger.fg'), backgroundColor: getRoleColor('status.danger.bg') }
          : { color: getRoleColor('text.secondary'), backgroundColor: getRoleColor('surface.subtle') };

    // The trend description sits on the card surface, not inside the badge, so
    // it takes the foreground colour only.
    const trendTextStyle: React.CSSProperties = { color: trendStyle.color };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-4',
          'rounded border border-border bg-card p-6', // 4px radius by default
          'shadow-xs transition-shadow hover:shadow-md',
          className
        )}
        {...props}
      >
        {/* Header: Label + Trend Badge */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            {label}
          </h3>
          {change && (
            <div
              className={cn(
                'flex items-center gap-1 rounded-full px-2 py-0.5',
                'text-xs font-semibold'
              )}
              style={trendStyle}
            >
              <TrendIcon className="h-3 w-3" />
              <span>{change}</span>
            </div>
          )}
        </div>

        {/* Main Metric Value */}
        <div className="text-3xl font-bold tracking-tight text-foreground tabular-nums">
          {value}
        </div>

        {/* Secondary Comparison Value (e.g. "At Renewal: 394") */}
        {(comparisonLabel || comparisonValue) && (
          <div className="text-sm text-muted-foreground">
            {comparisonLabel}
            {comparisonLabel && comparisonValue ? ': ' : ''}
            <span className="font-medium text-foreground">{comparisonValue}</span>
          </div>
        )}

        {/* Trend Description */}
        {trendDescription && (
          <div
            className="flex items-center gap-1.5 text-sm font-medium"
            style={trendTextStyle}
          >
            <TrendIcon className="h-4 w-4" />
            <span>{trendDescription}</span>
          </div>
        )}

        {/* Secondary Description */}
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    );
  }
);

StatCard.displayName = 'StatCard';

export { StatCard };
