"use client"

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const labelVariants = cva(
  'font-sans-productive text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /**
   * Associates this label with a control by id, same as the native
   * attribute. Only needed when the control is NOT nested inside the
   * label — Radix's Label already forwards a click on itself to a nested
   * control without it.
   */
  htmlFor?: string;
}

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(({ className, style, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    style={{ color: 'var(--role-fg-neutral-subtle)', ...style }}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
