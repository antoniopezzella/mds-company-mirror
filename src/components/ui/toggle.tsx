"use client"

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Toggle — no MDS/Figma spec exists for this yet; built matching real
 * shadcn/ui conventions (Radix Toggle), styled with `roleVar()`.
 */

const toggleVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:opacity-90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border border-transparent',
        outline: 'border',
      },
      size: {
        default: 'h-9 px-3',
        sm: 'h-8 px-2',
        lg: 'h-10 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  /**
   * Controlled pressed state — pair with `onPressedChange`. Omit both
   * (use `defaultPressed` instead, if anything) for an uncontrolled
   * toggle that tracks its own state internally.
   */
  pressed?: boolean;
}

const Toggle = React.forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, variant, size, pressed, defaultPressed, onPressedChange, style, ...props }, ref) => {
    const [internalHover, setHover] = React.useState(false);
    const isControlled = pressed !== undefined;
    const [uncontrolledPressed, setUncontrolledPressed] = React.useState(defaultPressed ?? false);
    const currentPressed = isControlled ? pressed : uncontrolledPressed;

    return (
      <TogglePrimitive.Root
        ref={ref}
        pressed={currentPressed}
        onPressedChange={(next) => {
          if (!isControlled) setUncontrolledPressed(next);
          onPressedChange?.(next);
        }}
        className={cn(toggleVariants({ variant, size }), className)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          backgroundColor: currentPressed ? 'var(--role-surface-accent)' : internalHover ? 'var(--role-surface-subtle)' : 'transparent',
          color: 'var(--role-text-primary)',
          borderColor: variant === 'outline' ? 'var(--role-border-default)' : undefined,
          ...style,
        }}
        {...props}
      />
    );
  }
);
Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
