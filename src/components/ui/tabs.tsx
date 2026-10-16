"use client"

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultActiveId?: string;
  onSelect?: (id: string) => void;
  /** MUI parity — 'scrollable' enables horizontal overflow, 'fullWidth' stretches triggers evenly. */
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  className?: string;
}

const tabsListVariants = cva('flex items-center gap-6 border-b', {
  variants: {
    variant: {
      standard: '',
      scrollable: 'overflow-x-auto',
      fullWidth: 'w-full [&>button]:flex-1',
    },
  },
  defaultVariants: {
    variant: 'standard',
  },
});

const tabTriggerVariants = cva(
  'relative -mb-px inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-1 py-3 font-sans-productive text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--tabs-focus-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed'
);

const tabContentVariants = cva('pt-6 focus-visible:outline-hidden');

function findInitialId(tabs: TabItem[], defaultActiveId?: string): string | undefined {
  if (defaultActiveId && tabs.some((tab) => tab.id === defaultActiveId && !tab.disabled)) {
    return defaultActiveId;
  }
  return (tabs.find((tab) => !tab.disabled) ?? tabs[0])?.id;
}

/**
 * Design System Tabs — shadcn/ui/Radix counterpart for the MDS Tabs.
 * Same `tabs`/`defaultActiveId`/`onSelect`/`variant` API as the MUI twin.
 * Forwards to the Radix root `<div>`, so a consumer can measure it or scroll
 * it into view.
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ tabs, defaultActiveId, onSelect, variant = 'standard', className }, ref) => {
  const [value, setValue] = React.useState<string | undefined>(() => findInitialId(tabs, defaultActiveId));

  // Re-resolve the active tab only when the current one is GONE (removed or
  // disabled). A parent that merely recreates the `tabs` array on re-render —
  // e.g. after a save that updates a tab's content — must not snap the user
  // back to the default tab; that was a real bug on the Team Setup screen.
  React.useEffect(() => {
    setValue((current) =>
      current && tabs.some((tab) => tab.id === current && !tab.disabled)
        ? current
        : findInitialId(tabs, defaultActiveId)
    );
  }, [defaultActiveId, tabs]);

  const handleChange = (id: string) => {
    setValue(id);
    onSelect?.(id);
  };

  return (
    <TabsPrimitive.Root ref={ref} value={value} onValueChange={handleChange} className={cn('w-full', className)}>
      <TabsPrimitive.List
        className={cn(tabsListVariants({ variant }))}
        style={{ borderColor: 'var(--role-border-default)', '--tabs-focus-ring': 'var(--role-focus-ring)' } as React.CSSProperties}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === value;
          return (
            <TabsPrimitive.Trigger
              key={tab.id}
              value={tab.id}
              disabled={tab.disabled}
              className={cn(tabTriggerVariants())}
              style={{
                color: tab.disabled
                  ? 'var(--role-text-disabled)'
                  : isActive
                    ? 'var(--role-interactive-primary)'
                    : 'var(--role-text-secondary)',
                borderBottomColor: isActive ? 'var(--role-interactive-primary)' : 'transparent',
              }}
            >
              {tab.title}
            </TabsPrimitive.Trigger>
          );
        })}
      </TabsPrimitive.List>
      {tabs.map((tab) => (
        <TabsPrimitive.Content key={tab.id} value={tab.id} className={tabContentVariants()}>
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
});
Tabs.displayName = 'Tabs';

export default Tabs;
