"use client"

import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Dialog, DialogContent } from './dialog';

/**
 * Command — no MDS/Figma spec exists for this yet; built matching real
 * shadcn/ui conventions directly (the `cmdk` library), styled with
 * `getRoleColor()`. A searchable command palette / filterable list.
 */

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, style, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn('flex h-full w-full flex-col overflow-hidden rounded-md', className)}
    style={
      {
        backgroundColor: getRoleColor('surface.default'),
        color: getRoleColor('text.primary'),
          // Referenced by CommandItem's data-selected background utility. The
          // class is described in prose, not written out: Tailwind's content
          // scanner is a plain text scan with no awareness of comments, so a
          // class-shaped string in a comment gets compiled like real code —
          // spelling it out emitted an invalid rule and a parse warning on
          // every build. It is still a
        // static Tailwind class naming a CSS var it can generate at build
        // time, with the actual color supplied here at runtime. Sidesteps
        // the "Tailwind JIT can't see a dynamic getRoleColor() value" issue
        // for cmdk's own internal `data-selected` (keyboard nav) styling,
        // which we can't otherwise hook into from JS.
        '--cmdk-selected-bg': getRoleColor('surface.subtle'),
        ...style,
      } as React.CSSProperties
    }
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

export type CommandDialogProps = React.ComponentPropsWithoutRef<typeof Dialog>;

const CommandDialog: React.FC<CommandDialogProps> = ({ children, ...props }) => (
  <Dialog {...props}>
    <DialogContent className="overflow-hidden p-0" hideCloseButton>
      <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium">{children}</Command>
    </DialogContent>
  </Dialog>
);

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center gap-2 border-b px-3" style={{ borderColor: getRoleColor('border.default') }}>
    <Search className="h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-11 w-full bg-transparent py-3 text-sm outline-hidden placeholder:opacity-60 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List ref={ref} className={cn('max-h-80 overflow-y-auto overflow-x-hidden p-1', className)} {...props} />
));
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" style={{ color: getRoleColor('text.secondary') }} {...props} />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, style, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn('overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold', className)}
    style={{ color: getRoleColor('text.primary'), ...style } as React.CSSProperties}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  // aria-hidden because CommandList is a role="listbox", and a listbox may
  // only contain options and groups — a role="separator" child makes the
  // listbox invalid (axe: aria-required-children). The separator is purely
  // visual grouping; the CommandGroup headings already convey the structure to
  // assistive tech, so hiding it loses nothing and makes the listbox valid.
  <CommandPrimitive.Separator
    ref={ref}
    aria-hidden="true"
    className={cn('-mx-1 my-1 h-px', className)}
    style={{ backgroundColor: getRoleColor('border.default') }}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-[var(--cmdk-selected-bg)]',
      className
    )}
    style={{ color: getRoleColor('text.primary') }}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
);
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
