"use client"

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Large number/metric value */
  value: string;
  /** Metric label/description */
  label: string;
  /** Custom className for additional styling */
  className?: string;
}

/**
 * MetricCard - Displays large metrics with labels
 * 
 * shadcn/ui implementation maintaining API parity with MUI version
 * Design from Figma node 2885:48269
 * - Large responsive number display
 * - Label underneath
 * - Centered text alignment
 */
const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ value, label, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center',
          'p-6',
          className
        )}
        {...props}
      >
        {/* Large metric value - responsive sizing */}
        <div
          className={cn(
            'font-bold leading-none text-center',
            'text-[64px] md:text-[96px] lg:text-[112px]',
            'text-foreground',
            // Tabular numbers for consistent alignment
            'tabular-nums'
          )}
        >
          {value}
        </div>
        
        {/* Metric label */}
        <div
          className={cn(
            'text-center mt-2',
            'text-lg font-normal',
            'text-muted-foreground'
          )}
        >
          {label}
        </div>
      </div>
    );
  }
);

MetricCard.displayName = 'MetricCard';

export { MetricCard };
