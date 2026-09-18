import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { useEffect, useState } from 'react';
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from './command';

/**
 * # Command
 *
 * No MDS/Figma spec exists for this component — built directly on the `cmdk` library, styled with
 * `getRoleColor()`.
 */
const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Command className="w-[320px] rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem><Calendar className="h-4 w-4" /> Calendar</CommandItem>
          <CommandItem><Smile className="h-4 w-4" /> Search Emoji</CommandItem>
          <CommandItem><Calculator className="h-4 w-4" /> Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="h-4 w-4" /> Profile <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="h-4 w-4" /> Billing <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="h-4 w-4" /> Settings <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const CommandPalette: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((o) => !o);
        }
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, []);

    return (
      <>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Open command palette (⌘K)</Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem>Go to Dashboard</CommandItem>
              <CommandItem>Go to Policies</CommandItem>
              <CommandItem>Go to Claims</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};
