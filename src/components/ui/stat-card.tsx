import * as React from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Main label/title of the metric */
  label: string;
  /** Primary metric value displayed large */
  value: string;
  /** Change percentage/amount (e.g., '+12.5%', '-20%') */
  change?: string;
  /** Trend direction */
  trend?: 'up' | 'down' | 'neutral';
  /** Trend description text */
  trendDescription?: string;
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

    // Trend color classes
    const trendColorClass = trend === 'up'
      ? 'text-green-600 dark:text-green-400'
      : trend === 'down'
        ? 'text-red-600 dark:text-red-400'
        : 'text-muted-foreground';

    const badgeBgClass = trend === 'up'
      ? 'bg-green-50 dark:bg-green-950'
      : trend === 'down'
        ? 'bg-red-50 dark:bg-red-950'
        : 'bg-muted';

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-4',
          'rounded-lg border border-border bg-card p-6',
          'shadow-sm transition-shadow hover:shadow-md',
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
                'text-xs font-semibold',
                badgeBgClass,
                trendColorClass
              )}
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

        {/* Trend Description */}
        {trendDescription && (
          <div className={cn(
            'flex items-center gap-1.5 text-sm font-medium',
            trendColorClass
          )}>
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
