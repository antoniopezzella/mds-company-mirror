"use client"

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  subtitle?: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultExpanded?: string[];
  allowMultiple?: boolean;
  variant?: 'default' | 'compact' | 'elevated';
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
 * the MUI twin.
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultExpanded = [],
  allowMultiple = false,
  variant = 'default',
  onChange,
  className,
}) => {
  const rootStyle = {
    '--accordion-focus-ring': getRoleColor('focus.ring'),
    '--accordion-shadow-color': getRoleColor('surface.subtle'),
    borderColor: getRoleColor('border.default'),
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
        style={{ backgroundColor: getRoleColor('surface.default') }}
      >
        <AccordionPrimitive.Header className="flex">
          <AccordionPrimitive.Trigger
            className={cn(accordionTriggerVariants({ variant, disabled: item.disabled }))}
          >
            {item.icon && <span className="flex shrink-0">{item.icon}</span>}
            <span className="flex-1">
              <span
                className="block font-[family-name:var(--typo-body1-font-family,_Noto_Sans,_sans-serif)] text-base font-semibold"
                style={{ color: getRoleColor(item.disabled ? 'text.disabled' : 'text.primary') }}
              >
                {item.title}
              </span>
              {item.subtitle && (
                <span
                  className="mt-1 block font-[family-name:var(--typo-body2-font-family,_Noto_Sans,_sans-serif)] text-sm"
                  style={{ color: getRoleColor('text.secondary') }}
                >
                  {item.subtitle}
                </span>
              )}
            </span>
            <ChevronDown
              className="h-5 w-5 shrink-0 transition-transform duration-200"
              style={{ color: getRoleColor('text.secondary') }}
            />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className={cn(accordionContentVariants({ variant }))}>
          <div
            className="border-t pt-4 font-[family-name:var(--typo-body1-font-family,_Noto_Sans,_sans-serif)] text-base"
            style={{ borderColor: getRoleColor('border.default'), color: getRoleColor('text.primary') }}
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
      type="single"
      collapsible
      defaultValue={defaultExpanded[0]}
      onValueChange={(value) => onChange?.(value ? [value] : [])}
      {...commonRootProps}
    >
      {items.map(renderItem)}
    </AccordionPrimitive.Root>
  );
};

export default Accordion;
