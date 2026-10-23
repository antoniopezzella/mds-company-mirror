import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';
import { type RoleName, roleVar } from '@/theme/roles';
import { Z_INDEX } from './z-index';

export type TooltipPlacement =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top';

export type TooltipTone = 'default' | 'dark' | 'info' | 'warning' | 'danger' | 'success';

export interface TooltipProps {
  /**
   * The tooltip's body content. Named `title` (matching the MUI Tooltip
   * this wraps conceptually), NOT `content` — there is no `content`
   * prop, and passing one is silently ignored rather than erroring.
   */
  title: React.ReactNode;
  /** The single element the tooltip is anchored to */
  children: React.ReactElement;
  /** Tooltip position, MUI-style combined placement (mapped to Radix side + align) */
  placement?: TooltipPlacement;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color tone */
  tone?: TooltipTone;
  /** Enable arrow pointing to trigger */
  arrow?: boolean;
  /** Delay before showing tooltip (ms) */
  enterDelay?: number;
  /** Additional class name for the tooltip content */
  contentClassName?: string;
}

function placementToSideAlign(placement: TooltipPlacement): {
  side: 'top' | 'right' | 'bottom' | 'left';
  align: 'start' | 'center' | 'end';
} {
  const [side, align] = placement.split('-') as [
    'top' | 'right' | 'bottom' | 'left',
    'start' | 'end' | undefined,
  ];
  return { side, align: align ?? 'center' };
}

function getToneColors(tone: TooltipTone): { bg: RoleName; fg: RoleName } {
  switch (tone) {
    case 'dark':
      return { bg: 'bg.disabled', fg: 'fg.primary' };
    case 'info':
      // Was status.warning.fg (copy/paste from the 'warning' case below) —
      // also switched bg to surface.subtle to match: surface.accent's dark
      // value (#6a6e6b) only gives 4.21:1 against fgInfo, just under
      // 4.5; surface.subtle's dark value (#252525) gives 12.46:1.
      return { bg: 'bg.neutral.subtle', fg: 'fg.info' };
    case 'warning':
      // text.primary, not status.warning.fg. Gold on the light subtle surface
      // is 3.21:1 — fine as an accent, unreadable as the label. This is the
      // same call badge.tsx makes for its warning outline, and for the same
      // reason: gold1000 is the darkest gold there is. 17.06 / 15.33.
      return { bg: 'bg.neutral.subtle', fg: 'fg.primary' };
    case 'danger':
      return { bg: 'bg.critical.subtle', fg: 'fg.critical' };
    case 'success':
      return { bg: 'bg.success.subtle', fg: 'fg.success' };
    default:
      return { bg: 'bg.disabled', fg: 'fg.primary' };
  }
}

const SIZE_STYLES: Record<'sm' | 'md' | 'lg', React.CSSProperties> = {
  sm: { fontSize: '0.7rem', padding: '4px 8px' },
  md: { fontSize: '0.875rem', padding: '8px 12px' },
  lg: { fontSize: '1rem', padding: '12px 16px' },
};

/**
 * Design System Tooltip — shadcn/ui/Radix counterpart for the MDS Tooltip.
 * Wraps Radix's Provider/Root/Trigger/Content/Arrow into a single component
 * with the same `title`/`placement`/`size`/`tone`/`arrow`/`enterDelay` API
 * as the MUI twin, for drop-in parity.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  placement = 'top',
  size = 'md',
  tone = 'default',
  arrow = true,
  enterDelay = 200,
  contentClassName,
}) => {
  const { side, align } = placementToSideAlign(placement);
  const { bg, fg } = getToneColors(tone);
  const bgColor = roleVar(bg);
  const fgColor = roleVar(fg);

  return (
    <TooltipPrimitive.Provider delayDuration={enterDelay}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={arrow ? 8 : 4}
            className={contentClassName}
            style={{
              backgroundColor: bgColor,
              color: fgColor,
              borderRadius: '6px',
              fontWeight: 500,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              // Above overlays AND toasts. A tooltip cannot trap focus or
              // block input, so nothing is hidden behind it. At the overlay
              // layer it tied with the dialog containing it (DOM order
              // silently deciding) and rendered behind any toast. A bare 50
              // would lose to any MUI Paper/Modal/Drawer, whose own scale
              // runs to 1500.
              zIndex: Z_INDEX.tooltip,
              ...SIZE_STYLES[size],
            }}
          >
            {title}
            {arrow && <TooltipPrimitive.Arrow style={{ fill: bgColor }} />}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * The composable Radix Root, completing the shadcn/ui shape
 * (`TooltipProvider` → `TooltipRoot` → `TooltipTrigger` → `TooltipContent`)
 * for anyone composing the primitives with their own provider/root:
 *
 * ```tsx
 * <TooltipProvider>
 *   <TooltipRoot>
 *     <TooltipTrigger asChild><button>Hover</button></TooltipTrigger>
 *     <TooltipContent>Label</TooltipContent>
 *   </TooltipRoot>
 * </TooltipProvider>
 * ```
 *
 * It is deliberately NOT named `Tooltip`: that name belongs to the convenience
 * wrapper above, which bundles Provider+Root+Trigger+Content into one
 * component with the MUI-parity `title`/`placement`/`tone` API. Renaming the
 * wrapper to expose the Root would break every existing `<Tooltip title=…>`
 * call site, so the Root is added alongside under a clear name instead.
 */
export const TooltipRoot = TooltipPrimitive.Root;

/**
 * Styled tooltip content for the composable shape
 * (`TooltipProvider`/`Root`/`Trigger`/`Content`), which is what anyone
 * arriving from shadcn/ui will reach for.
 *
 * This used to be `export const TooltipContent = TooltipPrimitive.Content` —
 * the raw Radix primitive, with no background, no radius and no z-index. It
 * rendered as unstyled text at the default stacking level, i.e. invisible
 * against the page and behind every overlay. The `Tooltip` wrapper above
 * looked fine, so the defect only appeared for consumers composing the
 * primitives, which is the idiomatic usage.
 *
 * Styling is kept in sync with that wrapper deliberately: same surface, same
 * radius, same shadow, and the same `Z_INDEX.tooltip` layer — above overlays
 * and toasts, because a tooltip can never trap anything. A bare `z-50` would
 * lose to any MUI Paper/Modal/Drawer, whose own scale runs to 1500.
 */
export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, style, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-[1700] overflow-hidden px-3 py-1.5 text-sm font-medium', // Z_INDEX.tooltip
        'data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0',
        className
      )}
      style={{
        backgroundColor: 'var(--role-bg-disabled)',
        color: 'var(--role-fg-primary)',
        borderRadius: '6px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        ...style,
      }}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export default Tooltip;
