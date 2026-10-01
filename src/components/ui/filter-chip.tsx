"use client"

import * as React from 'react';
import { cva } from 'class-variance-authority';
import { Check, ChevronDown, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';

/**
 * FilterChip — a toggleable control that filters content.
 *
 * Why this exists separately from `Chip`
 * --------------------------------------
 * `Chip` collapses all four of Material's chip types into one component, and
 * the codebase shows what that costs: eight call sites use it as a static
 * label, and because `Chip` always renders a `<button>`, each of those is a
 * focusable control announced as a button with no action behind it. One of
 * them had already been patched with `tabIndex={-1}`, which hides the symptom
 * (the tab stop) and not the cause (the announcement).
 *
 * M3 draws the line by *purpose*, not appearance:
 *
 *   assist      a contextual action        no selection, not removable
 *   FILTER      filters content            SELECTION, removable
 *   input       something the user entered no selection, removable
 *   suggestion  a system-generated hint    no selection, not removable
 *
 * Filter is the only type with selection state, and selection is the whole
 * point of this component. Anything without it is a `Badge`.
 *
 * Selection is carried by a CHECKMARK, not only by colour
 * -------------------------------------------------------
 * `Chip`'s selected state is a 2px inset ring, which reads as focus rather
 * than selection and disappears entirely for anyone who cannot distinguish
 * the tint. M3 puts a leading checkmark on a selected filter chip precisely
 * so the state survives without colour, and `aria-pressed` carries it to
 * assistive tech. Both are non-negotiable here.
 *
 * @see https://m3.material.io/components/chips/guidelines
 */

export type FilterChipSize = 'sm' | 'md' | 'lg';

const filterChipVariants = cva(
  [
    'inline-flex items-center rounded-full',
    'font-[family-name:var(--typo-body2-font-family,_Noto_Sans,_sans-serif)] font-medium',
    'transition-colors',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      // Matches Chip's scale rather than M3's single 32px height: this system
      // has a shared control-size scale and a filter chip sits in toolbars
      // next to Inputs and Buttons, which it has to line up with.
      size: {
        sm: 'h-6 gap-1 px-2.5 text-xs',
        md: 'h-8 gap-1.5 px-3 text-sm',
        lg: 'h-10 gap-2 px-4 text-base',
      },
      interactive: { true: 'cursor-pointer', false: '' },
    },
    defaultVariants: { size: 'md', interactive: true },
  }
);

const ICON: Record<FilterChipSize, string> = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
};

export interface FilterChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect' | 'onChange'> {
  /** The filter's name, e.g. "Active" or "Region: EMEA". */
  label: React.ReactNode;
  /** Whether this filter is applied. Drives the checkmark and `aria-pressed`. */
  selected?: boolean;
  /** Toggle handler. Receives the state the chip is moving TO. */
  onSelectedChange?: (selected: boolean) => void;
  /**
   * Shows a trailing chevron, marking this chip as the trigger for a menu of
   * values rather than an on/off toggle.
   *
   * This renders the AFFORDANCE only — it does not open anything by itself.
   * Either wrap the chip in a `DropdownMenuTrigger asChild`, or use
   * `FilterChipMenu` below, which does that wiring for the common case.
   * A chevron with no menu behind it is worse than no chevron at all.
   */
  hasMenu?: boolean;
  /**
   * Shows a trailing × that clears this filter.
   *
   * Rendered as a SIBLING button, never nested inside the chip's own button:
   * interactive content cannot nest in HTML, and axe flags it as
   * nested-interactive. With this present the chip becomes a `<span>` wrapper
   * holding two real controls.
   */
  onRemove?: () => void;
  /** Accessible name for the remove control. */
  removeLabel?: string;
  /** Leading icon, shown only when the chip is NOT selected (the checkmark takes that slot). */
  icon?: React.ReactNode;
  size?: FilterChipSize;
  disabled?: boolean;
  className?: string;
}

export const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  (
    {
      label,
      selected = false,
      onSelectedChange,
      hasMenu = false,
      onRemove,
      removeLabel,
      icon,
      size = 'md',
      disabled = false,
      className,
      style: styleProp,
      onClick,
      ...rest
    },
    ref
  ) => {
    // Called in the render body, never memoised: getRoleColor reads the `dark`
    // class off documentElement at call time, so a cached value freezes at
    // whatever mode first rendered.
    const style: React.CSSProperties = disabled
      ? {
          backgroundColor: selected ? getRoleColor('surface.disabled') : 'transparent',
          color: getRoleColor('text.disabled'),
          border: `1px solid ${getRoleColor('border.subtle')}`,
        }
      : selected
        ? {
            // Filled tonal when applied — the chip should read as "on" at a
            // glance across a row of filters.
            backgroundColor: getRoleColor('surface.selected'),
            color: getRoleColor('text.primary'),
            border: `1px solid ${getRoleColor('interactive.primary')}`,
          }
        : {
            backgroundColor: 'transparent',
            color: getRoleColor('text.primary'),
            // border.default, not border.subtle: this is the outline of a
            // control the user operates, which WCAG 1.4.11 holds to 3:1.
            // border.subtle is for rules inside a surface.
            border: `1px solid ${getRoleColor('border.default')}`,
          };

    const chipStyle = {
      ...style,
      '--tw-ring-color': getRoleColor('focus.ring'),
      // Tailwind's ring-offset-2 defaults its gap to white, which is wrong on a
      // dark surface. Same fix as Chip and Checkbox.
      '--tw-ring-offset-color': getRoleColor('surface.default'),
      ...styleProp,
    } as React.CSSProperties;

    const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) onSelectedChange?.(!selected);
    };

    const body = (
      <>
        {selected ? (
          <Check className={cn(ICON[size], 'shrink-0')} aria-hidden="true" />
        ) : icon ? (
          <span className={cn(ICON[size], 'flex shrink-0 items-center justify-center')}>{icon}</span>
        ) : null}
        <span className="truncate">{label}</span>
        {hasMenu && <ChevronDown className={cn(ICON[size], 'shrink-0 opacity-70')} aria-hidden="true" />}
      </>
    );

    const shared = {
      type: 'button' as const,
      disabled,
      // aria-pressed, not aria-checked: this is a toggle button, not a
      // checkbox. It is what carries selection to a screen reader when the
      // checkmark cannot be seen.
      //
      // OMITTED for a menu trigger. Radix adds aria-haspopup="menu" and
      // aria-expanded via `asChild`, and a control cannot coherently be both
      // a toggle button and a menu button — a screen reader would announce
      // "pressed, has menu, collapsed", conflating two interaction models.
      // For a menu chip the applied state lives in the accessible NAME
      // instead ("Region: EMEA" vs "Region"), which is where a menu button's
      // current value belongs.
      'aria-pressed': hasMenu ? undefined : selected,
    };

    if (!onRemove) {
      return (
        <button
          ref={ref}
          {...shared}
          onClick={toggle}
          className={cn(filterChipVariants({ size }), className)}
          style={chipStyle}
          {...rest}
        >
          {body}
        </button>
      );
    }

    // Two actions means two controls, side by side inside a non-interactive
    // wrapper that carries the chip styling.
    return (
      <span className={cn(filterChipVariants({ size, interactive: false }), 'pr-1.5', className)} style={chipStyle}>
        <button
          ref={ref}
          {...shared}
          onClick={toggle}
          className="inline-flex items-center gap-1.5 border-0 bg-transparent p-0 text-inherit focus-visible:outline-hidden focus-visible:ring-2"
          style={{ ['--tw-ring-color' as string]: getRoleColor('focus.ring') }}
          {...rest}
        >
          {body}
        </button>
        <button
          type="button"
          disabled={disabled}
          aria-label={removeLabel ?? `Remove ${typeof label === 'string' ? label : 'filter'}`}
          onClick={onRemove}
          className="ml-1 inline-flex shrink-0 items-center justify-center rounded-full border-0 bg-transparent p-0.5 text-inherit opacity-70 hover:opacity-100 focus-visible:outline-hidden focus-visible:ring-2"
          style={{ ['--tw-ring-color' as string]: getRoleColor('focus.ring') }}
        >
          <X className={ICON[size]} aria-hidden="true" />
        </button>
      </span>
    );
  }
);
FilterChip.displayName = 'FilterChip';

export interface FilterChipSetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible name for the group, e.g. "Filter policies". */
  label: string;
  children: React.ReactNode;
}

/**
 * A group of FilterChips sharing ONE tab stop.
 *
 * Without this, a filter bar with fifteen chips costs a keyboard user fifteen
 * Tab presses to get past it. M3's chip set is a `role="toolbar"` with roving
 * focus, which is also what the APG toolbar pattern prescribes: Tab enters the
 * group at the active chip, arrows move within it, Tab leaves.
 *
 * Roving tabindex is managed against the live DOM rather than from a child
 * index, so it keeps working when chips are added, removed or reordered — an
 * applied-filters row changes length constantly.
 */
export function FilterChipSet({ label, children, className, ...rest }: FilterChipSetProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);

  // EVERY button, not just the toggles. This previously selected
  // `button[aria-pressed]`, which silently excluded the remove (×) controls —
  // so a row of three removable filters left its three × buttons at the
  // default tabIndex of 0 and cost FOUR tab stops, not the one this component
  // exists to provide. APG's toolbar pattern puts every control in the group
  // on the roving sequence, which is also what a user expects: arrows walk
  // the row, including the way to clear each filter.
  const chips = React.useCallback(
    () => Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('button') ?? []),
    []
  );

  React.useEffect(() => {
    const list = chips();
    list.forEach((el, i) => {
      el.tabIndex = i === Math.min(active, list.length - 1) ? 0 : -1;
    });
  });

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const list = chips().filter((el) => !el.disabled);
    if (!list.length) return;
    const current = list.indexOf(document.activeElement as HTMLButtonElement);
    let next = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (current + 1) % list.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (current - 1 + list.length) % list.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = list.length - 1;
    if (next === -1) return;
    e.preventDefault();
    list[next].focus();
    setActive(chips().indexOf(list[next]));
  };

  return (
    <div
      ref={ref}
      role="toolbar"
      aria-label={label}
      aria-orientation="horizontal"
      onKeyDown={onKeyDown}
      className={cn('flex flex-wrap items-center gap-2', className)}
      {...rest}
    >
      {children}
    </div>
  );
}


export interface FilterChipOption {
  value: string;
  label: React.ReactNode;
  /** Optional count shown right-aligned, e.g. how many rows match. */
  count?: number;
  disabled?: boolean;
}

export interface FilterChipMenuProps {
  /** The filter's name — "Region". The selected values are appended for you. */
  label: string;
  options: FilterChipOption[];
  /** Currently applied values. */
  value: string[];
  onValueChange: (value: string[]) => void;
  /** Single-select collapses the menu to one choice. Defaults to multi. */
  multiple?: boolean;
  size?: FilterChipSize;
  disabled?: boolean;
  /** Text shown when nothing is applied. Defaults to the label alone. */
  placeholder?: string;
  className?: string;
}

/**
 * A FilterChip that opens a menu of values — the "Region: EMEA ▾" pattern.
 *
 * This exists because `hasMenu` alone renders a chevron and nothing else, and
 * a control that advertises a menu it does not have is a worse defect than a
 * missing feature: the affordance is a promise.
 *
 * Composed from the existing `DropdownMenu` rather than hand-rolled, so it
 * inherits Radix's focus trapping, type-ahead, Escape handling and portal
 * behaviour. The chip itself is the trigger via `asChild`, which keeps the
 * whole thing one control rather than a chip with a button glued to it.
 *
 * The summary line is the chip's label: "Region" when nothing is applied,
 * "Region: EMEA" for one value, "Region: 3" beyond that. A chip that only ever
 * said "Region" would force the user to open it to find out what it is doing.
 */
export function FilterChipMenu({
  label,
  options,
  value,
  onValueChange,
  multiple = true,
  size = 'md',
  disabled = false,
  placeholder,
  className,
}: FilterChipMenuProps) {
  const applied = options.filter((o) => value.includes(o.value));
  const summary =
    applied.length === 0
      ? (placeholder ?? label)
      : applied.length === 1
        ? `${label}: ${typeof applied[0].label === 'string' ? applied[0].label : applied[0].value}`
        : `${label}: ${applied.length}`;

  const toggle = (option: FilterChipOption) => {
    if (!multiple) {
      onValueChange(value.includes(option.value) ? [] : [option.value]);
      return;
    }
    onValueChange(
      value.includes(option.value) ? value.filter((v) => v !== option.value) : [...value, option.value]
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <FilterChip
          label={summary}
          selected={applied.length > 0}
          hasMenu
          size={size}
          disabled={disabled}
          className={className}
          // The chip is a menu trigger here, not a toggle: clicking must open
          // the menu, so the toggle handler is deliberately absent. Radix adds
          // aria-haspopup and aria-expanded on top of aria-pressed.
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-48">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={value.includes(option.value)}
            disabled={option.disabled}
            // Without this the menu closes on every choice, which makes
            // selecting three values a three-times-reopen chore.
            onSelect={(e) => multiple && e.preventDefault()}
            onCheckedChange={() => toggle(option)}
          >
            <span className="flex-1">{option.label}</span>
            {option.count !== undefined && (
              <span className="ml-2 tabular-nums text-xs opacity-60">{option.count}</span>
            )}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FilterChip;
