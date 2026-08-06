import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';

/**
 * Design System MegaMenu — shadcn/ui counterpart for the MDS MegaMenu.
 *
 * NOTE on scope: the existing MUI `MegaMenu.tsx` is page-specific marketing
 * content (hardcoded Marsh solution-pillar copy, manual `createPortal` +
 * overlay-div open/close state) rather than a reusable design-system
 * primitive — and it doesn't consistently use role tokens itself (several
 * hardcoded hex values throughout). Its own Code Connect mapping already
 * describes something more generic (`sections`/`description`), which this
 * component builds against instead, using Radix `NavigationMenu` — the
 * idiomatic primitive for exactly this pattern (hover/focus-driven panels,
 * keyboard nav, viewport-aware positioning) rather than hand-rolling it.
 */

export interface MegaMenuLink {
  label: string;
  href?: string;
  onClick?: () => void;
  badge?: string;
}

export interface MegaMenuSection {
  title: string;
  subtitle?: string;
  items: MegaMenuLink[];
}

export interface MegaMenuItem {
  label: string;
  sections: MegaMenuSection[];
  description?: string;
}

export interface MegaMenuProps {
  items: MegaMenuItem[];
  className?: string;
}

const triggerClass =
  'group flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 data-[state=open]:font-semibold';

/**
 * Design System MegaMenu — top-level nav with hover/focus-activated
 * multi-column panels. Pass `items` as `{ label, sections, description? }`.
 */
export const MegaMenu: React.FC<MegaMenuProps> = ({ items, className }) => {
  const textColor = getRoleColor('text.primary');
  const mutedColor = getRoleColor('text.secondary');
  const linkColor = getRoleColor('interactive.primary');
  const borderColor = getRoleColor('border.default');
  const focusRing = getRoleColor('focus.ring');

  return (
    <NavigationMenuPrimitive.Root className={cn('relative z-40', className)}>
      <NavigationMenuPrimitive.List className="flex items-center gap-1">
        {items.map((item) => (
          <NavigationMenuPrimitive.Item key={item.label}>
            <NavigationMenuPrimitive.Trigger
              className={triggerClass}
              style={{ color: textColor, '--tw-ring-color': focusRing } as React.CSSProperties}
            >
              {item.label}
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" />
            </NavigationMenuPrimitive.Trigger>
            <NavigationMenuPrimitive.Content
              className="data-[motion=from-start]:animate-in data-[motion=from-end]:animate-in data-[motion=to-start]:animate-out data-[motion=to-end]:animate-out data-[motion=from-start]:slide-in-from-left-16 data-[motion=from-end]:slide-in-from-right-16 data-[motion=to-start]:slide-out-to-left-16 data-[motion=to-end]:slide-out-to-right-16"
            >
              <div
                className="w-[min(90vw,900px)] rounded-lg border p-6 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                style={{ backgroundColor: getRoleColor('surface.default'), borderColor }}
              >
                {item.description && (
                  <p className="mb-4 text-sm" style={{ color: mutedColor }}>
                    {item.description}
                  </p>
                )}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {item.sections.map((section) => (
                    <div key={section.title}>
                      <h4 className="text-sm font-semibold" style={{ color: textColor }}>
                        {section.title}
                      </h4>
                      {section.subtitle && (
                        <p className="mb-2 mt-0.5 text-xs" style={{ color: mutedColor }}>
                          {section.subtitle}
                        </p>
                      )}
                      <ul className="mt-2 flex flex-col gap-2">
                        {section.items.map((link) => (
                          <li key={link.label}>
                            <NavigationMenuPrimitive.Link asChild>
                              <a
                                href={link.href ?? '#'}
                                onClick={(e) => {
                                  if (link.onClick) {
                                    e.preventDefault();
                                    link.onClick();
                                  }
                                }}
                                className="flex items-center gap-2 text-sm hover:underline"
                                style={{ color: linkColor }}
                              >
                                {link.label}
                                {link.badge && (
                                  <span
                                    className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                                    style={{ backgroundColor: getRoleColor('surface.accent'), color: getRoleColor('text.inverse') }}
                                  >
                                    {link.badge}
                                  </span>
                                )}
                              </a>
                            </NavigationMenuPrimitive.Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </NavigationMenuPrimitive.Content>
          </NavigationMenuPrimitive.Item>
        ))}
        <NavigationMenuPrimitive.Indicator className="top-full z-10 flex h-2 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in">
          <div className="relative top-[60%] h-2.5 w-2.5 rotate-45 rounded-tl-sm" style={{ backgroundColor: getRoleColor('surface.default'), border: `1px solid ${borderColor}` }} />
        </NavigationMenuPrimitive.Indicator>
      </NavigationMenuPrimitive.List>
      <div className="absolute left-0 top-full flex justify-center">
        <NavigationMenuPrimitive.Viewport className="mt-2 origin-top-center overflow-hidden rounded-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90" />
      </div>
    </NavigationMenuPrimitive.Root>
  );
};

export default MegaMenu;
