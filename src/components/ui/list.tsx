"use client"

import * as React from 'react';

import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { DataState, resolveDataStatus, type DataStateProps } from './data-state';
import { getRoleColor } from '@/theme/roles';

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

export interface ListProps extends DataStateProps {
  items: ListItemConfig[];
  subheader?: string;
  /** Items become clickable/checkable rows with selected-state styling. Required for `onSelectionChange` to do anything. */
  selectable?: boolean;
  /** Allow more than one row selected at once. Ignored when `selectable` is false. */
  multiSelect?: boolean;
  dense?: boolean;
  dividers?: boolean;
  /** Fires with the full set of selected `id`s on every selection change, not just the item that was toggled. */
  onSelectionChange?: (selectedIds: string[]) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const List: React.FC<ListProps> = ({
  items,
  loading,
  loadError,
  onRetry,
  emptyReason,
  onClearFilters,
  emptyState,
  emptyTitle,
  emptyDescription,
  subheader,
  selectable = false,
  multiSelect = false,
  dense = false,
  dividers = true,
  onSelectionChange,
  className,
  style,
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

  const status = resolveDataStatus(

    { loading, loadError, isEmpty: items.length === 0 },

    'List'

  );


  return (
    <div className={cn('w-full overflow-hidden rounded-md', className)} style={{ backgroundColor: getRoleColor('surface.default'), ...style }}>
      {subheader && (
        <div
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wide"
          style={{ backgroundColor: getRoleColor('surface.subtle'), color: getRoleColor('text.primary') }}
        >
          {subheader}
        </div>
      )}
      {/* The subheader stays above the state, so a list keeps its identity
          while empty — "Recent claims: none" reads better than a bare block. */}
      <DataState
        status={status}
        loadError={loadError}
        onRetry={onRetry}
        emptyReason={emptyReason}
        onClearFilters={onClearFilters}
        emptyState={emptyState}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
        name="List"
      >
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
                  // On a selectable list the row IS the control, so its
                  // pressed state is what conveys selection to assistive tech.
                  aria-pressed={selectable ? isSelected : undefined}
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
                    // Purely presentational. This used to render the real
                    // Checkbox component, which is itself a
                    // <button role="checkbox"> — a nested interactive control
                    // inside the row's own <button>, which axe flags
                    // (nested-interactive) and HTML5 forbids. It was already
                    // decorative in intent (tabIndex={-1}, pointer-events-none,
                    // aria-hidden), so it is now a plain visual and the row's
                    // aria-pressed carries the state instead.
                    <span
                      aria-hidden="true"
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-md border"
                      style={{
                        borderColor: isSelected ? getRoleColor('interactive.primary') : getRoleColor('border.default'),
                        backgroundColor: isSelected ? getRoleColor('interactive.primary') : 'transparent',
                        color: getRoleColor('text.onInteractive'),
                      }}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </span>
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
      </DataState>
    </div>
  );
};

export default List;
