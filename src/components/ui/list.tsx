import * as React from 'react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Checkbox } from './checkbox';

/**
 * Design System List — shadcn/ui counterpart for the MDS List. Built
 * against the actual `List.tsx` API (an `items` array), not the compound
 * `<List.Item>` pattern shown in `List.figma.tsx`'s Code Connect example —
 * that example doesn't match any prop the real MUI component accepts.
 */

export interface ListItemConfig {
  id: string;
  primary: string;
  secondary?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  selectable?: boolean;
  badge?: React.ReactNode;
}

export interface ListProps {
  items: ListItemConfig[];
  subheader?: string;
  selectable?: boolean;
  multiSelect?: boolean;
  dense?: boolean;
  dividers?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  className?: string;
}

export const List: React.FC<ListProps> = ({
  items,
  subheader,
  selectable = false,
  multiSelect = false,
  dense = false,
  dividers = true,
  onSelectionChange,
  className,
}) => {
  const [selected, setSelected] = React.useState<Set<string>>(
    new Set(items.filter((item) => item.selected).map((item) => item.id))
  );
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const handleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      if (!multiSelect) next.clear();
      next.add(id);
    }
    setSelected(next);
    onSelectionChange?.(Array.from(next));
  };

  return (
    <div className={cn('w-full overflow-hidden rounded-md', className)} style={{ backgroundColor: getRoleColor('surface.default') }}>
      {subheader && (
        <div
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wide"
          style={{ backgroundColor: getRoleColor('surface.subtle'), color: getRoleColor('text.primary') }}
        >
          {subheader}
        </div>
      )}
      <ul>
        {items.map((item, index) => {
          const isSelected = selected.has(item.id);
          const isHovered = hoveredId === item.id;
          return (
            <React.Fragment key={item.id}>
              <li
                style={{ backgroundColor: isSelected ? getRoleColor('surface.subtle') : isHovered ? getRoleColor('surface.subtle') : 'transparent' }}
              >
                <button
                  type="button"
                  disabled={item.disabled}
                  onClick={() => (selectable ? handleSelect(item.id) : item.onClick?.())}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={cn(
                    'flex w-full items-center gap-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                    dense ? 'px-3 py-1.5' : 'px-4 py-2.5',
                    selectable ? 'pl-2' : undefined
                  )}
                  style={{ color: item.disabled ? getRoleColor('text.disabled') : getRoleColor('text.primary') }}
                >
                  {selectable && (
                    <Checkbox checked={isSelected} tabIndex={-1} className="pointer-events-none" aria-hidden="true" />
                  )}
                  {item.icon && <span className="flex h-5 w-5 shrink-0 items-center justify-center">{item.icon}</span>}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm">{item.primary}</span>
                    {item.secondary && (
                      <span className="block truncate text-xs" style={{ color: item.disabled ? getRoleColor('text.disabled') : getRoleColor('text.secondary') }}>
                        {item.secondary}
                      </span>
                    )}
                  </span>
                  {item.badge && <span className="shrink-0">{item.badge}</span>}
                </button>
              </li>
              {dividers && index < items.length - 1 && (
                <li aria-hidden="true" className="h-px" style={{ backgroundColor: getRoleColor('border.default') }} />
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
