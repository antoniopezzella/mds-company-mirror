"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  CONTROL_HEIGHT,
  ControlSizeContext,
  useControlSize,
  type ControlSize,
} from "./control-size"
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
 *    conflict outright; color still comes from roleVar(), just
 *    applied here directly.
 * 2. InputGroupButton maps onto this repo's actual Button size API
 *    (`sm`/`md`/`lg` + `iconOnly`) instead of upstream's `xs`/`icon-xs`/
 *    `icon-sm`, which don't exist here — same adaptation already made
 *    for AttachmentAction.
 */

export interface InputGroupProps extends React.ComponentProps<'div'> {
  /**
   * Size for every control in the group. Cascades via context, matching
   * ButtonGroup — an addon button and the input it sits against must be the
   * same height, and requiring the author to keep two props in sync is how
   * they drift.
   */
  size?: ControlSize;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, size, ...props }, ref) => {
    const borderColor = 'var(--role-border-default)';
    const resolved = useControlSize(size);
    return (
      <ControlSizeContext.Provider value={resolved}>
        <div
          ref={ref}
          data-slot="input-group"
          role="group"
          data-size={resolved}
          className={cn(
            'group/input-group relative flex w-full min-w-0 items-center rounded-md border shadow-xs transition-colors outline-hidden has-[>textarea]:h-auto',
            'has-[[data-slot=input-group-control]:focus-visible]:ring-2',
            // The group owns the height; the inner control is borderless and
            // fills it, so the two cannot disagree.
            CONTROL_HEIGHT[resolved],
            className
          )}
          style={{ borderColor, '--tw-ring-color': 'var(--role-focus-ring)' } as React.CSSProperties}
          {...props}
        />
      </ControlSizeContext.Provider>
    )
  }
);
InputGroup.displayName = 'InputGroup';

const inputGroupAddonVariants = cva(
  'flex h-auto cursor-text items-center justify-center gap-2 py-1.5 select-none [&>svg:not([class*="size-"])]:size-4',
  {
    variants: {
      align: {
        /* The -0.3rem below is an optical nudge pulling a nested button back
           over the addon's own padding so the button's edge aligns with the
           input's. It is not a spacing decision — there is no scale step for
           "half a border plus the button's transparent hit area". */
        'inline-start': 'order-first pl-3 has-[>button]:ml-[-0.3rem]', // spacing-allow
        'inline-end': 'order-last pr-3 has-[>button]:mr-[-0.3rem]', // spacing-allow
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
      style={{ color: 'var(--role-text-secondary)' }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) return;
        (e.currentTarget.parentElement?.querySelector('input, textarea') as HTMLElement | null)?.focus();
      }}
      {...props}
    />
  )
}

const InputGroupButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({
    className,
    type = 'button',
    variant = 'tertiary',
    size = 'sm',
    iconOnly,
    children,
    ...props
  }, ref) => {
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
        ref={ref}
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
);
InputGroupButton.displayName = 'InputGroupButton';

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('flex items-center gap-2 text-sm [&_svg]:pointer-events-none', className)}
      style={{ color: 'var(--role-text-secondary)' }}
      {...props}
    />
  )
}

/** Plain native `<input>` (not this repo's own `Input`, see the file header) — forwards straight to it, same as every other field. */
const InputGroupInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, style, ...props }, ref) => (
    <input
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        'flex-1 border-0 bg-transparent px-3 py-2 text-sm shadow-none outline-hidden placeholder:opacity-60 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      style={{ color: 'var(--role-text-primary)', ...style }}
      {...props}
    />
  )
);
InputGroupInput.displayName = 'InputGroupInput';

const InputGroupTextarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, style, ...props }, ref) => (
    <textarea
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        'flex-1 resize-none border-0 bg-transparent px-3 py-2 text-sm shadow-none outline-hidden placeholder:opacity-60 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      style={{ color: 'var(--role-text-primary)', ...style }}
      {...props}
    />
  )
);
InputGroupTextarea.displayName = 'InputGroupTextarea';

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
