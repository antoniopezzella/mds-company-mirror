"use client"

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/lib/utils';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = 'horizontal', decorative = true, style, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn('shrink-0', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className)}
    style={{ backgroundColor: 'var(--role-border-default)', ...style }}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

// ── Divider: MUI-parity convenience wrapper ────────────────────────────────
// Same `orientation`/`variant`/`label`/`labelPosition`/`dashed` API as the
// MUI twin; adds an optional centered/start/end label (Separator alone has
// no label concept).

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  /** `inset` indents from the leading edge, `middle` indents both edges — same semantics as the MUI Divider twin. */
  variant?: 'fullWidth' | 'inset' | 'middle';
  /** Breaks the line to show inline text, e.g. "OR" — works on both orientations. */
  label?: React.ReactNode;
  /** Where `label` sits along the line. Has no effect without `label`. */
  labelPosition?: 'start' | 'center' | 'end';
  dashed?: boolean;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'fullWidth',
  label,
  labelPosition = 'center',
  dashed = false,
  className,
}) => {
  const borderColor = 'var(--role-border-default)';
  const lineStyle: React.CSSProperties = {
    flex: 1,
    borderStyle: dashed ? 'dashed' : 'solid',
    borderColor,
    borderWidth: 0,
    ...(orientation === 'horizontal' ? { borderTopWidth: 1 } : { borderLeftWidth: 1 }),
  };

  if (label) {
    return (
      <div
        className={cn(
          orientation === 'vertical' ? 'my-0 mx-3 flex flex-col items-center' : 'my-3 flex items-center gap-3',
          className
        )}
      >
        {(labelPosition === 'start' || labelPosition === 'center') && <div style={lineStyle} />}
        <span className="whitespace-nowrap text-sm" style={{ color: 'var(--role-fg-neutral-subtle)' }}>
          {label}
        </span>
        {(labelPosition === 'end' || labelPosition === 'center') && <div style={lineStyle} />}
      </div>
    );
  }

  const insetClass = variant === 'inset' ? (orientation === 'horizontal' ? 'ms-4' : 'mt-0') : '';
  const middleClass = variant === 'middle' ? (orientation === 'horizontal' ? 'my-3' : 'mx-3') : '';

  // Rendered as a bordered (not background-filled) element so `dashed` can
  // actually render — a 1px background-filled bar can't show a dash pattern.
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        orientation === 'horizontal' ? 'my-3 w-full' : 'mx-3 h-full',
        insetClass,
        middleClass,
        className
      )}
      style={orientation === 'horizontal' ? { ...lineStyle, borderTopWidth: 1 } : { ...lineStyle, borderLeftWidth: 1 }}
    />
  );
};

export default Divider;
