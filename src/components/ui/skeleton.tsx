import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export type SkeletonVariant = 'text' | 'rectangular' | 'rounded' | 'circular';

const skeletonVariants = cva('block', {
  variants: {
    variant: {
      text: 'rounded-lg',
      rectangular: 'rounded-none',
      rounded: 'rounded-md',
      circular: 'rounded-full',
    },
    animation: {
      pulse: 'animate-pulse',
      wave: 'animate-pulse',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'text',
    animation: 'pulse',
  },
});

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `circular` defaults to a 40px dot; `text`/`rectangular` default to full width. */
  variant?: SkeletonVariant;
  width?: number | string;
  /** Defaults to `1em` for `text`, 40 for `circular`, 20 for `rectangular`. */
  height?: number | string;
  /** Pass `false` to render a static block with no shimmer/pulse — useful inside `prefers-reduced-motion` contexts. */
  animation?: 'pulse' | 'wave' | false;
}

/**
 * Design System Skeleton — shadcn/ui counterpart for the MDS Skeleton.
 * Same `variant`/`width`/`height`/`animation` API as the MUI twin.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', animation = 'pulse', width, height, className, style, ...props }, ref) => {
  const defaultHeight = variant === 'text' ? '1em' : variant === 'circular' ? 40 : 20;
  return (
    <div
      ref={ref}
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant, animation: animation === false ? 'none' : animation }), className)}
      style={{
        backgroundColor: 'var(--role-bg-neutral-subtle)',
        width: width ?? (variant === 'circular' ? 40 : '100%'),
        height: height ?? defaultHeight,
        ...style,
      }}
      {...props}
    />
  );
  }
);
Skeleton.displayName = 'Skeleton';

export default Skeleton;
