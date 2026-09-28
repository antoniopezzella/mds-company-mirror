import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, within } from 'storybook/test';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from './menubar';

/**
 * # Menubar
 *
 * Radix-based horizontal application menu bar — File/Edit/View style — with
 * the same real menu semantics as `DropdownMenu` (roving tabindex, arrow-key
 * navigation between top-level menus, submenu support), just laid out as a
 * row of menus instead of a single trigger.
 */
const meta: Meta<typeof Menubar> = {
  title: 'Components/Menubar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem tone="danger">
            Close Window <MenubarShortcut>⌘W</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem>Show Full URLs</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem disabled>Toggle Fullscreen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),  /*
   * OPENS a menu. Without this the story rendered only the bar of triggers,
   * so the component measured 50% statements and 0% FUNCTIONS — no item,
   * separator, shortcut or submenu was ever executed, and axe only ever saw
   * the closed state.
   */
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('open the File menu', async () => {
      await userEvent.click(canvas.getByRole('menuitem', { name: 'File' }));
    });
    await step('its items render', async () => {
      const open = await screen.findByRole('menu');
      await expect(within(open).getAllByRole('menuitem').length).toBeGreaterThan(0);
    });
  },
};

export const WithSubmenuAndRadioGroup: StoryObj = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Workspace</MenubarLabel>
          <MenubarSeparator />
          <MenubarRadioGroup value="benedict">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benedict">Benedict</MenubarRadioItem>
            <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>More Tools</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Save Page As…</MenubarItem>
              <MenubarItem>Create Shortcut…</MenubarItem>
              <MenubarItem>Name Window…</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
