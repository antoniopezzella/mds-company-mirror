import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { getRoleColor, type RoleName } from '@/theme/roles';

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
  /** Tooltip content/text */
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
      return { bg: 'surface.disabled', fg: 'text.primary' };
    case 'info':
      // Was status.warning.fg (copy/paste from the 'warning' case below) —
      // also switched bg to surface.subtle to match: surface.accent's dark
      // value (#6a6e6b) only gives 4.21:1 against statusInfoText, just under
      // 4.5; surface.subtle's dark value (#252525) gives 12.46:1.
      return { bg: 'surface.subtle', fg: 'status.info.fg' };
    case 'warning':
      return { bg: 'surface.subtle', fg: 'status.warning.fg' };
    case 'danger':
      return { bg: 'status.danger.bg', fg: 'status.danger.fg' };
    case 'success':
      return { bg: 'status.success.bg', fg: 'status.success.fg' };
    default:
      return { bg: 'surface.disabled', fg: 'text.primary' };
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
  const bgColor = getRoleColor(bg);
  const fgColor = getRoleColor(fg);

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
              // Matches the other portal-based shadcn components (select,
              // dialog, dropdown-menu, etc.) — MUI's own z-index scale runs
              // up to 1500 (Tooltip), and a bare 50 loses to any MUI Paper/
              // Modal/Drawer with an explicit z-index, rendering this
              // correctly-positioned but fully hidden behind it.
              zIndex: 1500,
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
export const TooltipContent = TooltipPrimitive.Content;

export default Tooltip;
