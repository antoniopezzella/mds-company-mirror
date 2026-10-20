"use client"

import * as React from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FilterOperatorDefinition } from './filters-operators';
import type { FilterField, FilterOption } from './filters-schema';
import type { FilterValue } from './filters-types';

/**
 * The value editor — §11.
 *
 * Which control renders is decided by the FIELD TYPE and the OPERATOR
 * together, not the type alone: `is` on a select is one option, `is any of`
 * is several, and `between` on a number is two bounds rather than one. The
 * operator is why this cannot be a lookup table keyed on type.
 */

export interface FiltersValueEditorProps {
  field: FilterField;
  operator?: FilterOperatorDefinition;
  value: FilterValue | undefined;
  onChange: (value: FilterValue | undefined) => void;
  /** Close the surrounding popover — single-select closes, multi does not (§26, §27). */
  onDone?: () => void;
  /** Registered custom editors, keyed by `field.editor` (§11). */
  editors?: Record<string, React.ComponentType<FiltersValueEditorProps>>;
}

export function FiltersValueEditor(props: FiltersValueEditorProps) {
  const { field, operator, editors } = props;

  // A registered editor wins, so a product can supply a user picker or a
  // location picker without forking anything (§11, §52).
  const Custom = field.editor ? editors?.[field.editor] : undefined;
  if (Custom) return <Custom {...props} />;

  if (operator?.isRange) {
    return field.type === 'date' || field.type === 'dateRange' || field.type === 'datetime' ? (
      <DateRangeEditor {...props} />
    ) : (
      <NumberRangeEditor {...props} />
    );
  }

  switch (field.type) {
    case 'select':
    case 'multiselect':
      return (
        <OptionsEditor
          {...props}
          multiple={!!operator?.supportsMultiple || field.type === 'multiselect'}
        />
      );
    case 'boolean':
      return <BooleanEditor {...props} />;
    case 'number':
    case 'range':
      return (
        <SingleInput
          {...props}
          inputMode="decimal"
          parse={(s) => (s.trim() === '' ? undefined : Number(s))}
        />
      );
    case 'date':
    case 'dateRange':
    case 'datetime':
      return <SingleInput {...props} type="date" parse={(s) => s || undefined} />;
    default:
      return <SingleInput {...props} parse={(s) => s || undefined} />;
  }
}

/**
 * Roving tabindex + arrow keys for a list of radio/checkbox rows.
 *
 * These were declared `role="radiogroup"` with `role="radio"` children and
 * behaved like neither: every row was a native button with an implicit
 * tabindex of 0, so a three-option Status filter took three Tab presses to
 * cross, and arrow keys did nothing. The APG asks for exactly one tab stop
 * with arrows moving within it, which is also what a user pressing Down
 * already expects.
 */
function useRovingList(length: number, selectedIndex: number) {
  const [active, setActive] = React.useState(() => (selectedIndex >= 0 ? selectedIndex : 0));
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);

  React.useEffect(() => {
    if (active >= length) setActive(Math.max(0, length - 1));
  }, [length, active]);

  const focus = (i: number) => {
    setActive(i);
    requestAnimationFrame(() => refs.current[i]?.focus());
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      focus((active + 1) % length);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      focus((active - 1 + length) % length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focus(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focus(length - 1);
    }
  };

  return { active, setActive, refs, onKeyDown };
}

/** Free text or a single number/date. Commits on Apply, not per keystroke. */
function SingleInput({
  field,
  value,
  onChange,
  onDone,
  inputMode,
  type = 'text',
  parse,
}: FiltersValueEditorProps & {
  inputMode?: 'decimal';
  type?: string;
  parse: (s: string) => FilterValue | undefined;
}) {
  const [draft, setDraft] = React.useState(value === undefined ? '' : String(value));
  const commit = () => {
    const next = parse(draft);
    // Refuse NaN rather than storing it: an unparseable number would compile
    // into a comparison that silently matches nothing.
    if (typeof next === 'number' && !Number.isFinite(next)) return;
    onChange(next);
    onDone?.();
  };
  return (
    <form
      className="flex w-56 flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        commit();
      }}
    >
      <Label htmlFor={`v-${field.id}`} className="text-xs">
        {field.label}
        {field.unit === 'currency' && <span aria-hidden="true"> ($)</span>}
        {field.unit === 'percent' && <span aria-hidden="true"> (%)</span>}
      </Label>
      <Input
        id={`v-${field.id}`}
        type={type}
        inputMode={inputMode}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        aria-label={`${field.label} value`}
        placeholder={field.placeholder}
        className="h-8"
      />
      <Actions onClear={() => { onChange(undefined); onDone?.(); }} />
    </form>
  );
}

function NumberRangeEditor({ field, value, onChange, onDone }: FiltersValueEditorProps) {
  const r = (value ?? {}) as { min?: number; max?: number };
  const [min, setMin] = React.useState(r.min?.toString() ?? '');
  const [max, setMax] = React.useState(r.max?.toString() ?? '');
  const [error, setError] = React.useState<string | null>(null);

  const commit = () => {
    const n = (s: string) => (s.trim() === '' ? undefined : Number(s));
    const lo = n(min);
    const hi = n(max);
    if ([lo, hi].some((v) => v !== undefined && !Number.isFinite(v))) return;
    // §43: a range whose maximum is below its minimum matches nothing, and
    // saying so beats returning an empty table with no explanation.
    if (lo !== undefined && hi !== undefined && hi < lo) {
      setError('Maximum must be greater than or equal to minimum.');
      return;
    }
    setError(null);
    onChange(lo === undefined && hi === undefined ? undefined : { min: lo, max: hi });
    onDone?.();
  };

  const hint = field.unit === 'currency' ? ' ($)' : field.unit === 'percent' ? ' (%)' : '';

  return (
    <form
      className="flex w-64 flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        commit();
      }}
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <Label htmlFor={`min-${field.id}`} className="text-xs">
            Min{hint && <span aria-hidden="true">{hint}</span>}
          </Label>
          <Input
            id={`min-${field.id}`}
            inputMode="decimal"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            aria-label={`Minimum ${field.label}`}
            aria-invalid={!!error || undefined}
            aria-describedby={error ? `err-${field.id}` : undefined}
            className="h-8"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor={`max-${field.id}`} className="text-xs">
            Max{hint && <span aria-hidden="true">{hint}</span>}
          </Label>
          <Input
            id={`max-${field.id}`}
            inputMode="decimal"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            aria-label={`Maximum ${field.label}`}
            aria-invalid={!!error || undefined}
            aria-describedby={error ? `err-${field.id}` : undefined}
            className="h-8"
          />
        </div>
      </div>
      {error && (
        <p id={`err-${field.id}`} role="alert" className="text-xs" style={{ color: getRoleColor('fg.critical') }}>
          {error}
        </p>
      )}
      <Actions onClear={() => { onChange(undefined); onDone?.(); }} />
    </form>
  );
}

function DateRangeEditor({ field, value, onChange, onDone }: FiltersValueEditorProps) {
  const r = (value ?? {}) as { from?: string; to?: string };
  const [from, setFrom] = React.useState(r.from ?? '');
  const [to, setTo] = React.useState(r.to ?? '');
  return (
    <form
      className="flex w-64 flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        // Stored as YYYY-MM-DD, never a Date: a Date does not survive a round
        // trip through a URL, and parsing it back invites the UTC-midnight
        // shift §45 warns about.
        onChange(from || to ? { from: from || undefined, to: to || undefined } : undefined);
        onDone?.();
      }}
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <Label htmlFor={`from-${field.id}`} className="text-xs">From</Label>
          <Input id={`from-${field.id}`} type="date" value={from}
            onChange={(e) => setFrom(e.target.value)} aria-label={`${field.label} from`} className="h-8" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor={`to-${field.id}`} className="text-xs">To</Label>
          <Input id={`to-${field.id}`} type="date" value={to}
            onChange={(e) => setTo(e.target.value)} aria-label={`${field.label} to`} className="h-8" />
        </div>
      </div>
      <Actions onClear={() => { onChange(undefined); onDone?.(); }} />
    </form>
  );
}

function BooleanEditor({ field, value, onChange, onDone }: FiltersValueEditorProps) {
  const options = [true, false];
  const roving = useRovingList(options.length, options.findIndex((v) => v === value));
  const pick = (v: boolean) => {
    onChange(v);
    onDone?.();
  };
  return (
    <div
      className="flex w-40 flex-col gap-1"
      role="radiogroup"
      aria-label={field.label}
    >
      {options.map((v, i) => (
        <button
          key={String(v)}
          type="button"
          role="radio"
          ref={(el) => {
            roving.refs.current[i] = el;
          }}
          aria-checked={value === v}
          tabIndex={roving.active === i ? 0 : -1}
          onFocus={() => roving.setActive(i)}
          // On the radios rather than the group: the group holds a roving
          // tabindex and is never itself focusable, so a handler there would
          // only ever fire by bubbling — and jsx-a11y is right to call an
          // unfocusable element with a key handler a mistake.
          onKeyDown={roving.onKeyDown}
          onClick={() => pick(v)}
          className="flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm"
          style={{ backgroundColor: value === v ? getRoleColor('bg.neutral.subtle') : undefined }}
        >
          {v ? (field.trueLabel ?? 'Yes') : (field.falseLabel ?? 'No')}
          {value === v && <Check className="size-3.5" aria-hidden="true" />}
        </button>
      ))}
    </div>
  );
}

function OptionsEditor({
  field,
  value,
  onChange,
  onDone,
  multiple,
}: FiltersValueEditorProps & { multiple: boolean }) {
  const [term, setTerm] = React.useState('');
  const options = field.options ?? [];
  const shown = term
    ? options.filter((o) => o.label.toLowerCase().includes(term.trim().toLowerCase()))
    : options;

  const selected: Array<string | number> = multiple
    ? ((value as Array<string | number>) ?? [])
    : value === undefined ? [] : [value as string | number];

  const toggle = (option: FilterOption) => {
    if (!multiple) {
      onChange(option.value);
      // Single-select closes on choose (§26); multi stays open so picking
      // three values is not three reopens (§27).
      onDone?.();
      return;
    }
    const next = selected.includes(option.value)
      ? selected.filter((v) => v !== option.value)
      : [...selected, option.value];
    onChange(next.length ? next : undefined);
  };

  const roving = useRovingList(
    shown.length,
    shown.findIndex((o) => selected.includes(o.value))
  );

  return (
    <div className="flex w-56 flex-col gap-2">
      {options.length > 8 && (
        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search…"
          aria-label={`Search ${field.label} options`}
          className="h-8"
        />
      )}
      <div
        role={multiple ? 'group' : 'radiogroup'}
        aria-label={field.label}
        className="max-h-56 overflow-y-auto"
      >
        {shown.length === 0 && (
          <p className="px-2 py-2 text-sm" style={{ color: getRoleColor('fg.neutral.subtle') }}>
            No options
          </p>
        )}
        {shown.map((option, i) => {
          const on = selected.includes(option.value);
          return (
            <button
              key={String(option.value)}
              type="button"
              role={multiple ? 'checkbox' : 'radio'}
              ref={(el) => {
                roving.refs.current[i] = el;
              }}
              aria-checked={on}
              tabIndex={roving.active === i ? 0 : -1}
              onFocus={() => roving.setActive(i)}
              onKeyDown={roving.onKeyDown}
              disabled={option.disabled}
              onClick={() => toggle(option)}
              className={cn(
                'flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm',
                option.disabled && 'cursor-not-allowed opacity-50'
              )}
              style={{ backgroundColor: on ? getRoleColor('bg.neutral.subtle') : undefined }}
            >
              <span className="min-w-0 flex-1 truncate">{option.label}</span>
              {on && <Check className="size-3.5 shrink-0" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      {multiple && <Actions onClear={() => { onChange(undefined); onDone?.(); }} onDone={onDone} />}
    </div>
  );
}

function Actions({ onClear, onDone }: { onClear: () => void; onDone?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <Button type="button" variant="tertiary" size="sm" onClick={onClear}>
        Clear
      </Button>
      {onDone ? (
        <Button type="button" variant="primary" size="sm" onClick={onDone}>
          Done
        </Button>
      ) : (
        <Button type="submit" variant="primary" size="sm">
          Apply
        </Button>
      )}
    </div>
  );
}
