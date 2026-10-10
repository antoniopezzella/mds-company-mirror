"use client"

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';
import { roleVar } from '@/theme/roles';

/**
 * Popover — no MDS/Figma spec exists for this yet, so it's built matching
 * real shadcn/ui conventions directly (Radix Popover), styled with this
 * repo's `roleVar()` role tokens instead of shadcn's default
 * CSS-variable palette. `PopoverContent` renders through a Radix Portal to
 * `document.body`, so an ancestor class (a typography/dashboard scope, a
 * `dir` attribute) does not reach it — reapply it on `PopoverContent`
 * itself if the surface needs it.
 */

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /**
   * Preferred edge alignment relative to the trigger. Defaults to
   * `'center'` here (Radix's own default is `'center'` too, but this
   * component pins it explicitly since it's rendered through a Portal —
   * see the component note above for why that matters for styling scope).
   */
  align?: 'start' | 'center' | 'end';
  /** Gap in pixels between the trigger and the content. Defaults to `8`. */
  sideOffset?: number;
}

const PopoverContent = React.forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, PopoverContentProps>(({ className, align = 'center', sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-[1500] w-72 rounded-lg border p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className
      )}
      style={{ backgroundColor: 'var(--role-surface-default)', borderColor: 'var(--role-border-default)', color: 'var(--role-text-primary)' }}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent };
