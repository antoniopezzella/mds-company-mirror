"use client"

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';
import { type RoleName, roleVar } from '@/theme/roles';

export type ProgressTone = 'default' | 'success' | 'danger';

function getToneColor(tone: ProgressTone): RoleName {
  switch (tone) {
    case 'danger':
      return 'interactive.danger';
    case 'success':
      return 'fg.success';
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
    const color = roleVar(getToneColor(tone));
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
        // role="progressbar" obliges an accessible name (axe:
        // aria-progressbar-name) and there's no visible text to derive one
        // from. Placed BEFORE the spread so a caller's own aria-label or
        // aria-labelledby still wins.
        aria-label="Loading"
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
  /** Fill percentage (0–100). Ignored when `variant` is `'indeterminate'`. */
  value?: number;
  /** `'determinate'` fills to `value`; `'indeterminate'` plays a looping scan animation for an unknown-length wait. */
  variant?: 'determinate' | 'indeterminate';
  tone?: ProgressTone;
  className?: string;
  /**
   * Accessible name for the progress bar. Radix renders the root with
   * `role="progressbar"`, which obliges a name; defaults to "Loading" since
   * there is no visible text to derive one from. Pass something specific
   * ("Upload progress") where the context warrants it.
   */
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const LinearProgress: React.FC<LinearProgressProps> = ({
  value = 0,
  variant = 'determinate',
  tone = 'default',
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}) => {
  const color = roleVar(getToneColor(tone));
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <ProgressPrimitive.Root
      className={cn('relative h-2 w-full overflow-hidden rounded-full', className)}
      style={{ backgroundColor: 'var(--role-bg-neutral-subtle)' }}
      value={variant === 'determinate' ? clamped : undefined}
      aria-label={ariaLabelledBy ? undefined : (ariaLabel ?? 'Loading')}
      aria-labelledby={ariaLabelledBy}
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
