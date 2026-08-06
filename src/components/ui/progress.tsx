import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';
import { getRoleColor, type RoleName } from '@/theme/roles';

export type ProgressTone = 'default' | 'success' | 'danger';

function getToneColor(tone: ProgressTone): RoleName {
  switch (tone) {
    case 'danger':
      return 'interactive.danger';
    case 'success':
      return 'status.success.fg';
    default:
      return 'interactive.primary';
  }
}

// ── Circular Progress ───────────────────────────────────────────────────
// Radix has no circular-progress primitive, so this is a hand-rolled SVG —
// determinate mode draws an arc via stroke-dasharray, indeterminate mode
// spins a fixed 3/4 arc.

export interface CircularProgressProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'className'> {
  size?: number;
  thickness?: number;
  tone?: ProgressTone;
  value?: number;
  variant?: 'determinate' | 'indeterminate';
  className?: string;
}

export const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  ({ size = 40, thickness = 3.6, tone = 'default', value = 0, variant = 'indeterminate', className, ...props }, ref) => {
    const color = getRoleColor(getToneColor(tone));
    const radius = (size - thickness * 2) / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.min(Math.max(value, 0), 100);
    const offset =
      variant === 'determinate' ? circumference - (clamped / 100) * circumference : circumference * 0.75;

    return (
      <svg
        ref={ref}
        className={cn('shrink-0', variant === 'indeterminate' && 'animate-spin', className)}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="progressbar"
        aria-valuenow={variant === 'determinate' ? clamped : undefined}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
    );
  }
);
CircularProgress.displayName = 'CircularProgress';

// ── Linear Progress ─────────────────────────────────────────────────────

export interface LinearProgressProps {
  value?: number;
  variant?: 'determinate' | 'indeterminate';
  tone?: ProgressTone;
  className?: string;
}

export const LinearProgress: React.FC<LinearProgressProps> = ({
  value = 0,
  variant = 'determinate',
  tone = 'default',
  className,
}) => {
  const color = getRoleColor(getToneColor(tone));
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <ProgressPrimitive.Root
      className={cn('relative h-2 w-full overflow-hidden rounded-full', className)}
      style={{ backgroundColor: getRoleColor('surface.subtle') }}
      value={variant === 'determinate' ? clamped : undefined}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full rounded-full transition-transform duration-300 ease-out',
          variant === 'indeterminate' ? 'w-1/3 animate-linear-indeterminate' : 'w-full'
        )}
        style={{
          backgroundColor: color,
          transform: variant === 'determinate' ? `translateX(-${100 - clamped}%)` : undefined,
        }}
      />
    </ProgressPrimitive.Root>
  );
};

// Default export mirrors the MUI twin's `{ Circular, Linear }` grouping.
const Progress = {
  Circular: CircularProgress,
  Linear: LinearProgress,
};

export default Progress;
