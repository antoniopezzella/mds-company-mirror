"use client"

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { roleVar } from '@/theme/roles';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  subtitle?: string;
}

export interface AccordionProps {
  /** The panels to render, in order. Each entry owns its own expand/collapse state via `id`. */
  items: AccordionItem[];
  /** `id`s that start expanded. Ignored after the first render — this is not a controlled-state prop. */
  defaultExpanded?: string[];
  /** Allow more than one panel open at once. When false, opening one panel closes the others. */
  allowMultiple?: boolean;
  variant?: 'default' | 'compact' | 'elevated';
  /** Fires with the full list of currently-expanded `id`s whenever a panel opens or closes. */
  onChange?: (expandedIds: string[]) => void;
  className?: string;
}

const accordionRootVariants = cva('flex flex-col', {
  variants: {
    variant: {
      default: '',
      compact: 'gap-1 px-2',
      elevated: 'gap-2',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionItemVariants = cva('transition-colors', {
  variants: {
    variant: {
      default: 'border-b',
      compact: '',
      elevated: 'rounded-lg overflow-hidden shadow-[0_2px_8px_var(--accordion-shadow-color)]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionTriggerVariants = cva(
  'flex flex-1 items-center gap-3 text-left transition-colors [&[data-state=open]>svg]:rotate-180 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accordion-focus-ring)] focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'min-h-16 px-4 py-4',
        compact: 'min-h-12 px-2 py-3',
        elevated: 'min-h-16 px-4 py-4',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-60',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
      disabled: false,
    },
  }
);

const accordionContentVariants = cva(
  'overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
  {
    variants: {
      variant: {
        default: 'px-4 pb-4',
        compact: 'px-2 pb-2',
        elevated: 'px-4 pb-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Design System Accordion — shadcn/ui/Radix counterpart for the MDS Accordion.
 * Same `items`/`defaultExpanded`/`allowMultiple`/`variant`/`onChange` API as
 * the MUI twin. Forwards to the Radix root `<div>`, so a consumer can scroll
 * the whole panel into view or measure it.
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(({
  items,
  defaultExpanded = [],
  allowMultiple = false,
  variant = 'default',
  onChange,
  className,
}, ref) => {
  const rootStyle = {
    '--accordion-focus-ring': 'var(--role-border-focus)',
    '--accordion-shadow-color': 'var(--role-bg-neutral-subtle)',
    borderColor: 'var(--role-border-default)',
  } as React.CSSProperties;

  const commonRootProps = {
    className: cn(accordionRootVariants({ variant }), className),
    style: rootStyle,
  };

  const renderItem = (item: AccordionItem) => {
    return (
      <AccordionPrimitive.Item
        key={item.id}
        value={item.id}
        disabled={item.disabled}
        className={cn(accordionItemVariants({ variant }))}
        style={{ backgroundColor: 'var(--role-bg-default)' }}
      >
        <AccordionPrimitive.Header className="flex">
          <AccordionPrimitive.Trigger
            className={cn(accordionTriggerVariants({ variant, disabled: item.disabled }))}
          >
            {item.icon && <span className="flex shrink-0">{item.icon}</span>}
            <span className="flex-1">
              <span
                className="block font-sans-productive text-base font-semibold"
                style={{ color: roleVar(item.disabled ? 'fg.disabled' : 'fg.primary') }}
              >
                {item.title}
              </span>
              {item.subtitle && (
                <span
                  className="mt-1 block font-sans-productive text-sm"
                  style={{ color: 'var(--role-fg-neutral-subtle)' }}
                >
                  {item.subtitle}
                </span>
              )}
            </span>
            <ChevronDown
              className="h-5 w-5 shrink-0 transition-transform duration-200"
              style={{ color: 'var(--role-fg-neutral-subtle)' }}
            />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className={cn(accordionContentVariants({ variant }))}>
          <div
            className="border-t pt-4 font-sans-productive text-base"
            style={{ borderColor: 'var(--role-border-default)', color: 'var(--role-fg-primary)' }}
          >
            {item.content}
          </div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    );
  };

  if (allowMultiple) {
    return (
      <AccordionPrimitive.Root
        ref={ref}
        type="multiple"
        defaultValue={defaultExpanded}
        onValueChange={(value) => onChange?.(value)}
        {...commonRootProps}
      >
        {items.map(renderItem)}
      </AccordionPrimitive.Root>
    );
  }

  return (
    <AccordionPrimitive.Root
      ref={ref}
      type="single"
      collapsible
      defaultValue={defaultExpanded[0]}
      onValueChange={(value) => onChange?.(value ? [value] : [])}
      {...commonRootProps}
    >
      {items.map(renderItem)}
    </AccordionPrimitive.Root>
  );
});
Accordion.displayName = 'Accordion';

export default Accordion;
