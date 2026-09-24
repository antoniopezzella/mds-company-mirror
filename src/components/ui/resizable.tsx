// No MDS/Figma spec exists for this yet; built matching real shadcn/ui conventions directly.
//
// NOTE: the installed `react-resizable-panels` is v4, which renamed the
// classic shadcn/ui recipe's `PanelGroup` / `Panel` / `PanelResizeHandle`
// exports to `Group` / `Panel` / `Separator` (and `direction` to
// `orientation`). This file re-exports the v4 primitives under the
// shadcn/ui-familiar names so the public API here still matches the real
// reference implementation's component names.
import * as React from 'react';
import { GripVertical } from 'lucide-react';
import { Group, Panel, Separator, type GroupProps, type PanelProps, type SeparatorProps } from 'react-resizable-panels';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';

/**
 * Design System Resizable — shadcn/ui counterpart wrapping
 * `react-resizable-panels`. No MDS twin exists yet; built to match
 * shadcn/ui's reference `ResizablePanelGroup` / `ResizablePanel` /
 * `ResizableHandle` API, re-skinned with `getRoleColor()` role tokens
 * instead of hardcoded hex.
 */
// NOTE: `Group` already applies `flex-direction` internally via inline style
// based on `orientation`, so no `data-[orientation=vertical]:flex-col`
// selector is needed here (there is no such data attribute on its root).
const ResizablePanelGroup = ({ className, ...props }: GroupProps) => (
  <Group className={cn('flex h-full w-full', className)} {...props} />
);
ResizablePanelGroup.displayName = 'ResizablePanelGroup';

// KNOWN A11Y GAP (upstream, react-resizable-panels 4.12.2): each Panel renders
// as an outer div wrapping an inner div that carries `overflow: auto`. The
// inner div is the actual scroll container and the library exposes no way to
// put props on it — its only `tabIndex` is on the resize handle. So a
// scrollable panel can't be made keyboard-focusable from here (WCAG 2.1.1;
// axe: scrollable-region-focusable).
//
// Putting tabIndex on the Panel was tried and reverted: it lands on the OUTER
// div, which adds a tab stop that still cannot scroll the inner container —
// worse than leaving it alone, since it implies keyboard access that doesn't
// exist. The stories scope that one axe rule off with this same explanation;
// the fix belongs upstream, or in replacing the library.
const ResizablePanel = (props: PanelProps) => <Panel {...props} />;
ResizablePanel.displayName = 'ResizablePanel';

export interface ResizableHandleProps extends SeparatorProps {
  withHandle?: boolean;
}

const ResizableHandle = ({ withHandle, className, ...props }: ResizableHandleProps) => (
  <Separator
    className={cn(
      'relative flex w-px items-center justify-center aria-[orientation=vertical]:h-px aria-[orientation=vertical]:w-full after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 aria-[orientation=vertical]:after:inset-x-0 aria-[orientation=vertical]:after:left-0 aria-[orientation=vertical]:after:h-1 aria-[orientation=vertical]:after:w-full aria-[orientation=vertical]:after:translate-x-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--resizable-focus-ring)] focus-visible:ring-offset-1',
      className
    )}
    style={
      {
        backgroundColor: getRoleColor('border.default'),
        '--resizable-focus-ring': getRoleColor('focus.ring'),
      } as React.CSSProperties
    }
    {...props}
  >
    {withHandle && (
      <div
        className="z-10 flex h-4 w-3 items-center justify-center rounded-xs border"
        style={{
          backgroundColor: getRoleColor('surface.default'),
          borderColor: getRoleColor('border.default'),
        }}
      >
        <GripVertical className="h-2.5 w-2.5" style={{ color: getRoleColor('text.secondary') }} />
      </div>
    )}
  </Separator>
);
ResizableHandle.displayName = 'ResizableHandle';

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
