"use client"

import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { toggleVariants } from './toggle';

/**
 * ToggleGroup — no MDS/Figma spec exists for this yet; built matching real
 * shadcn/ui conventions (Radix ToggleGroup), styled with `getRoleColor()`.
 */

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({ size: 'default', variant: 'default' });
/** Mirrors the pattern used by shadcn RadioGroup in this repo: the item needs
 *  to know the group's current value to compute its own pressed-state color. */
const ToggleGroupValueContext = React.createContext<string | string[] | undefined>(undefined);

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, value, ...props }, ref) => (
  <ToggleGroupPrimitive.Root ref={ref} value={value as never} className={cn('flex items-center gap-1', className)} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <ToggleGroupValueContext.Provider value={value}>{children}</ToggleGroupValueContext.Provider>
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, value, style, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);
  const groupValue = React.useContext(ToggleGroupValueContext);
  const [hover, setHover] = React.useState(false);
  const pressed = Array.isArray(groupValue) ? groupValue.includes(value as string) : groupValue === value;

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      value={value}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(toggleVariants({ variant: context.variant ?? variant, size: context.size ?? size }), className)}
      style={{
        backgroundColor: pressed ? 'var(--role-surface-accent)' : hover ? 'var(--role-surface-subtle)' : 'transparent',
        color: 'var(--role-text-primary)',
        borderColor: (context.variant ?? variant) === 'outline' ? 'var(--role-border-default)' : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
