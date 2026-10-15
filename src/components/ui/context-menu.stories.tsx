import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, within } from 'storybook/test';
import { Copy, Pencil, Trash2 } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from './context-menu';

/**
 * # ContextMenu
 *
 * No MDS/Figma spec exists for this component — built directly on Radix ContextMenu, styled with this
 * repo's `getRoleColor()` role tokens. Mirrors `DropdownMenu`'s API shape
 * since both are Radix menu-family primitives.
 */
const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  /*
   * OPENS the menu. Without this the story rendered only the trigger, so the
   * component measured 41% statements and 0% FUNCTIONS — every item, the
   * checkbox and radio groups, the separators and the shortcut rendering were
   * never executed, and axe never saw the surface where the accessibility
   * risk actually lives.
   */
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('right-click the target', async () => {
      await userEvent.pointer({
        keys: '[MouseRight]',
        target: canvas.getByText(/Right-click/i),
      });
    });
    await step('the menu and its items render', async () => {
      const menu = await screen.findByRole('menu');
      await expect(within(menu).getAllByRole('menuitem').length).toBeGreaterThan(0);
    });
  },
};

export const PolicyRowActions: StoryObj = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-14 w-96 items-center justify-between rounded-md border px-4 text-sm">
        <span>Policy #AVI-2026-0417 — Aviation Liability</span>
        <span className="text-xs opacity-60">Right-click for actions</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Policy actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Pencil className="h-4 w-4" /> Edit
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy className="h-4 w-4" /> Duplicate
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem tone="danger">
          <Trash2 className="h-4 w-4" /> Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithCheckboxAndRadio: StoryObj = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm">
        Right-click for view options
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>View</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Show line numbers</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Word wrap</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Zoom</ContextMenuLabel>
        <ContextMenuRadioGroup value="100">
          <ContextMenuRadioItem value="75">75%</ContextMenuRadioItem>
          <ContextMenuRadioItem value="100">100%</ContextMenuRadioItem>
          <ContextMenuRadioItem value="125">125%</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
