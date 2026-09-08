import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';

/**
 * HoverCard — no MDS/Figma spec exists for this yet, so it's built matching
 * real shadcn/ui conventions directly (Radix HoverCard), styled with this
 * repo's `getRoleColor()` role tokens instead of shadcn's default
 * CSS-variable palette.
 */

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 8, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-[1500] w-64 rounded-lg border p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className
      )}
      style={{ backgroundColor: getRoleColor('surface.default'), borderColor: getRoleColor('border.default'), color: getRoleColor('text.primary') }}
      {...props}
    />
  </HoverCardPrimitive.Portal>
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
