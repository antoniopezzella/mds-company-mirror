import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';

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
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | false;
}

/**
 * Design System Skeleton — shadcn/ui counterpart for the MDS Skeleton.
 * Same `variant`/`width`/`height`/`animation` API as the MUI twin.
 */
export const Skeleton: React.FC<SkeletonProps> = ({ variant = 'text', animation = 'pulse', width, height, className, style, ...props }) => {
  const defaultHeight = variant === 'text' ? '1em' : variant === 'circular' ? 40 : 20;
  return (
    <div
      className={cn(skeletonVariants({ variant, animation: animation === false ? 'none' : animation }), className)}
      style={{
        backgroundColor: getRoleColor('surface.subtle'),
        width: width ?? (variant === 'circular' ? 40 : '100%'),
        height: height ?? defaultHeight,
        ...style,
      }}
      {...props}
    />
  );
};

export default Skeleton;
