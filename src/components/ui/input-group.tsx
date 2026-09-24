"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { getRoleColor } from "@/theme/roles"
import { Button } from "@/components/ui/button"

/**
 * Ported from shadcn/ui's "input-group" registry item
 * (apps/v4/registry/new-york-v4/ui/input-group.tsx) — a chat composer
 * needs it (input/textarea + send/stop buttons sharing one bordered
 * container). Two adaptations from upstream:
 *
 * 1. InputGroupInput/InputGroupTextarea render plain native elements,
 *    not this repo's own Input/Textarea — those set border/background
 *    via inline `style` (getRoleColor), which sits at higher CSS
 *    precedence than the `border-0 bg-transparent` classes this
 *    component needs to make the control blend into the group's own
 *    border instead of drawing its own. Native elements avoid the
 *    conflict outright; color still comes from getRoleColor(), just
 *    applied here directly.
 * 2. InputGroupButton maps onto this repo's actual Button size API
 *    (`sm`/`md`/`lg` + `iconOnly`) instead of upstream's `xs`/`icon-xs`/
 *    `icon-sm`, which don't exist here — same adaptation already made
 *    for AttachmentAction.
 */

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  const borderColor = getRoleColor('border.default');
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        'group/input-group relative flex w-full min-w-0 items-center rounded-xs border shadow-xs transition-colors outline-hidden has-[>textarea]:h-auto',
        'has-[[data-slot=input-group-control]:focus-visible]:ring-2',
        className
      )}
      style={{ borderColor, '--tw-ring-color': getRoleColor('focus.ring') } as React.CSSProperties}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  'flex h-auto cursor-text items-center justify-center gap-2 py-1.5 select-none [&>svg:not([class*="size-"])]:size-4',
  {
    variants: {
      align: {
        'inline-start': 'order-first pl-3 has-[>button]:ml-[-0.3rem]',
        'inline-end': 'order-last pr-3 has-[>button]:mr-[-0.3rem]',
        'block-start': 'order-first w-full justify-start px-3 pt-3',
        'block-end': 'order-last w-full justify-start px-3 pb-3',
      },
    },
    defaultVariants: { align: 'inline-start' },
  }
);

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    // Expands the click target onto the already-focusable sibling input/textarea (same convenience as clicking a <label>) — a keyboard user already reaches the input directly via Tab, no redundant "tab to the addon, then activate it" step needed.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      style={{ color: getRoleColor('text.secondary') }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) return;
        (e.currentTarget.parentElement?.querySelector('input, textarea') as HTMLElement | null)?.focus();
      }}
      {...props}
    />
  )
}

function InputGroupButton({
  className,
  type = 'button',
  variant = 'tertiary',
  size = 'sm',
  iconOnly,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  // `iconOnly` used to default to `true` unconditionally. Button renders
  // `{iconOnly ? iconOnlyNode : children}`, so under that default a text label
  // — `<InputGroupButton>Save</InputGroupButton>` — was silently discarded,
  // producing an empty button with no accessible name and no warning. Every
  // existing call site passes `icon` + `aria-label` and is unaffected, but the
  // default is a trap for the next person.
  //
  // Defaulting from the presence of children keeps the icon-button ergonomics
  // (the common case in an input group) while making a text label work as
  // written. An explicit `iconOnly` prop still wins either way.
  const resolvedIconOnly = iconOnly ?? children == null;
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      iconOnly={resolvedIconOnly}
      className={className}
      {...props}
    >
      {children}
    </Button>
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('flex items-center gap-2 text-sm [&_svg]:pointer-events-none', className)}
      style={{ color: getRoleColor('text.secondary') }}
      {...props}
    />
  )
}

function InputGroupInput({ className, style, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      data-slot="input-group-control"
      className={cn(
        'flex-1 border-0 bg-transparent px-3 py-2 text-sm shadow-none outline-hidden placeholder:opacity-60 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      style={{ color: getRoleColor('text.primary'), ...style }}
      {...props}
    />
  )
}

function InputGroupTextarea({ className, style, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="input-group-control"
      className={cn(
        'flex-1 resize-none border-0 bg-transparent px-3 py-2 text-sm shadow-none outline-hidden placeholder:opacity-60 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      style={{ color: getRoleColor('text.primary'), ...style }}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
