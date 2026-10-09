import figma from '@figma/code-connect';
import { User, Settings, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

/**
 * Code Connect — DropdownMenu
 *
 * Radix-based menu primitive with roving tabindex, arrow-key navigation and
 * type-ahead (see dropdown-menu.tsx's own docblock) — what `Header`'s
 * profile menu is built on in place of a hand-rolled Popover + MenuItem
 * list. `align` is the one prop `DropdownMenuContent` exposes that this
 * node's variants plausibly target; menu item content is composed, not
 * data-driven, so it is rendered statically in the example.
 */
const NODE_URL = '${LIB}?node-id=13678-10461';

figma.connect(DropdownMenuContent, NODE_URL, {
  props: {
    align: figma.enum('Align', {
      Start: 'start',
      Center: 'center',
      End: 'end',
    }),
  },
  example: (props) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Open menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={props.align}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="h-4 w-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="h-4 w-4" /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem tone="danger">
          <LogOut className="h-4 w-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
});
