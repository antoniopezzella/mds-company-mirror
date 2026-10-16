"use client"

import * as React from 'react';
import { ChevronRight, Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Input } from '@/components/ui/input';
import {
  fieldsAtPath,
  fieldPathLabel,
  isLeafField,
  searchFields,
  type FilterField,
} from './filters-schema';

/**
 * Choosing a field — §7, §8.
 *
 * Two modes in one surface, because a schema can be four fields or four
 * hundred: BROWSE drills through the tree a level at a time, and typing
 * switches to SEARCH, which returns deeply nested matches without the user
 * having to know that Flood lives under Risk › CAT.
 *
 * Keyboard is the primary interaction, not an afterthought (§47.1): arrows
 * move, Right enters a branch, Left returns to the parent, Enter selects,
 * Escape closes. Drilling with a mouse only would make a nested schema
 * unusable without one.
 */

/**
 * Lets the surrounding Popover ask whether Escape was already used.
 *
 * `stopPropagation` in the picker's own keydown is NOT enough: Radix's
 * dismissable layer listens on `document`, so by the time a React handler
 * runs the decision to close has effectively been taken. `onEscapeKeyDown` on
 * `PopoverContent` is the supported way to veto it, and that lives on the
 * parent — hence this handle.
 */
export interface FieldPickerHandle {
  /** True when the picker consumed Escape by backing out a level. */
  handleEscape: () => boolean;
}

export interface FiltersFieldPickerProps {
  fields: FilterField[];
  onSelect: (path: string[]) => void;
  /**
   * Populated by the picker; pass it to `PopoverContent.onEscapeKeyDown`.
   *
   * There is deliberately no `onClose`: the picker no longer closes itself.
   * An Escape it does not consume falls through to Radix, which dismisses the
   * popover and fires `onOpenChange` — the parents already wire that, so a
   * second close path would just be a way for the two to disagree.
   */
  handleRef?: React.MutableRefObject<FieldPickerHandle | null>;
  /** Copy, so nothing user-facing is hardcoded (§53). */
  searchPlaceholder?: string;
  emptyLabel?: (term: string) => string;
  className?: string;
}

export const FiltersFieldPicker = React.forwardRef<HTMLDivElement, FiltersFieldPickerProps>(
  function FiltersFieldPicker(
    {
      fields,
      onSelect,
      handleRef,
      searchPlaceholder: searchPlaceholderProp,
      emptyLabel = (t) => `No filters found for “${t}”`,
      className,
    },
    ref
  ) {
  // Defaulted here rather than in the signature so a parent may forward an
  // undefined `messages.searchPlaceholder` without blanking the label.
  const searchPlaceholder = searchPlaceholderProp ?? 'Search filters…';
  const [term, setTerm] = React.useState('');
  const [path, setPath] = React.useState<string[]>([]);
  const [active, setActive] = React.useState(0);
  const listRef = React.useRef<HTMLDivElement>(null);

  const searching = term.trim().length > 0;

  // Kept in a ref so the handle below always sees current state without the
  // parent re-subscribing on every keystroke.
  const state = React.useRef({ searching, depth: path.length });
  state.current = { searching, depth: path.length };

  React.useImperativeHandle(
    handleRef as React.Ref<FieldPickerHandle>,
    () => ({
      handleEscape: () => {
        const { searching: s, depth } = state.current;
        if (s) {
          setTerm('');
          return true;
        }
        if (depth) {
          setPath((cur) => cur.slice(0, -1));
          return true;
        }
        return false;
      },
    }),
    []
  );
  const results = React.useMemo(() => (searching ? searchFields(fields, term) : []), [fields, term, searching]);
  const browse = React.useMemo(() => (searching ? [] : fieldsAtPath(fields, path)), [fields, path, searching]);
  const count = searching ? results.length : browse.length;

  // Any change of level or term invalidates the highlighted index; leaving it
  // pointing at row 7 of a 3-row list is how Enter selects the wrong field.
  const level = path.join('.');
  React.useEffect(() => setActive(0), [term, level]);

  /**
   * Keep the highlighted option on screen.
   *
   * The list caps at `max-h-64`, so arrowing past the visible window left the
   * highlight invisible while Enter selected something the user could not
   * see. Invisible with a schema small enough to fit — which is exactly why
   * it survived review until someone forced an overflow.
   *
   * `block: 'nearest'` scrolls the minimum needed, so the list does not jump
   * when the option is already visible.
   */
  React.useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`#filters-field-${active}`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active, term, level]);

  const choose = (index: number) => {
    if (searching) {
      const hit = results[index];
      if (hit) onSelect(hit.path);
      return;
    }
    const field = browse[index];
    if (!field || field.disabled) return;
    if (isLeafField(field)) onSelect([...path, field.id]);
    else setPath([...path, field.id]);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (count ? (i + 1) % count : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (count ? (i - 1 + count) % count : 0));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(Math.max(count - 1, 0));
    } else if (e.key === 'ArrowRight' && !searching) {
      const field = browse[active];
      if (field && !isLeafField(field)) {
        e.preventDefault();
        setPath([...path, field.id]);
      }
    } else if (e.key === 'ArrowLeft' && !searching && path.length) {
      e.preventDefault();
      setPath(path.slice(0, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(active);
    }
    // Escape is NOT handled here. Radix's dismissable layer listens on
    // `document`, so a React handler cannot reliably veto the close — the
    // popover owns that decision through `onEscapeKeyDown`, which calls
    // `handleEscape` above. Handling it in both places would back out two
    // levels per keypress.
  };

  const muted = getRoleColor('text.secondary');

  return (
    <div ref={ref} className={cn('flex w-72 flex-col gap-1', className)}>
      <div className="relative">
        <Search
          className="pointer-events-none absolute start-2 top-1/2 size-3.5 -translate-y-1/2"
          style={{ color: muted }}
          aria-hidden="true"
        />
        <Input
          // No autoFocus: Radix moves focus into the popover on open, and
          // autoFocus would fight it while failing jsx-a11y.
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          // The list is a separate element, so the input owns activedescendant
          // rather than roving focus — typing must keep working while the
          // highlight moves.
          role="combobox"
          aria-expanded
          aria-autocomplete="list"
          aria-controls="filters-field-list"
          aria-activedescendant={count ? `filters-field-${active}` : undefined}
          className="h-8 ps-8"
        />
      </div>

      {!searching && path.length > 0 && (
        <button
          type="button"
          onClick={() => setPath(path.slice(0, -1))}
          className="flex items-center gap-1 px-2 py-1 text-left text-xs"
          style={{ color: muted }}
        >
          ← {fieldPathLabel(fields, path)}
        </button>
      )}

      {/* OUTSIDE the listbox. A `role="listbox"` whose only child is a
          paragraph fails axe's aria-required-children — it must contain
          `option` or `group` children and nothing else. The empty list stays
          rendered so `aria-controls` still resolves to a real element. */}
      {count === 0 && (
        <p className="px-2 py-3 text-sm" style={{ color: muted }}>
          {emptyLabel(term)}
        </p>
      )}

      <div
        id="filters-field-list"
        ref={listRef}
        role="listbox"
        aria-label="Filters"
        className="max-h-64 overflow-y-auto"
      >
        {searching
          ? results.map((hit, i) => (
              <Option
                key={hit.path.join('.')}
                id={`filters-field-${i}`}
                active={i === active}
                onSelect={() => choose(i)}
                onHover={() => setActive(i)}
                label={hit.field.label}
                matches={hit.matches}
                // Ancestors disambiguate three branches that each have an
                // "Amount" — without them the results are unreadable.
                context={hit.ancestors.join(' › ')}
                disabled={hit.field.disabled}
              />
            ))
          : browse.map((field, i) => (
              <Option
                key={field.id}
                id={`filters-field-${i}`}
                active={i === active}
                onSelect={() => choose(i)}
                onHover={() => setActive(i)}
                label={field.label}
                branch={!isLeafField(field)}
                disabled={field.disabled}
              />
            ))}
      </div>
    </div>
  );
  }
);
FiltersFieldPicker.displayName = 'FiltersFieldPicker';

function Option({
  id,
  active,
  onSelect,
  onHover,
  label,
  context,
  matches = [],
  branch = false,
  disabled = false,
}: {
  id: string;
  active: boolean;
  onSelect: () => void;
  onHover: () => void;
  label: string;
  context?: string;
  matches?: Array<[number, number]>;
  branch?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      id={id}
      role="option"
      tabIndex={-1}
      aria-selected={active}
      aria-disabled={disabled || undefined}
      onMouseDown={(e) => {
        e.preventDefault();
        if (!disabled) onSelect();
      }}
      onMouseEnter={onHover}
      className={cn(
        'flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm',
        disabled && 'cursor-not-allowed opacity-50'
      )}
      style={{
        backgroundColor: active ? getRoleColor('surface.subtle') : undefined,
        color: getRoleColor('text.primary'),
      }}
    >
      <span className="min-w-0 flex-1 truncate">
        {context && (
          <span className="mr-1 text-xs" style={{ color: getRoleColor('text.secondary') }}>
            {context} ›
          </span>
        )}
        <Highlight text={label} ranges={matches} />
      </span>
      {branch && <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden="true" />}
    </div>
  );
}

/** Marks the matched span, so a hit in a long label is findable (§8). */
function Highlight({ text, ranges }: { text: string; ranges: Array<[number, number]> }) {
  if (!ranges.length) return <>{text}</>;
  const [start, end] = ranges[0];
  return (
    <>
      {text.slice(0, start)}
      {/* No radius: the background is transparent, so there are no corners to
          round — the match is marked by weight and colour alone. */}
      <mark
        className="bg-transparent font-semibold"
        style={{ color: getRoleColor('interactive.primary') }}
      >
        {text.slice(start, end)}
      </mark>
      {text.slice(end)}
    </>
  );
}
