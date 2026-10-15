import { formatCurrency, formatDate, formatNumber, formatPercent } from '@/lib/format';

/**
 * One definition of what a filter IS.
 *
 * Why this exists
 * ---------------
 * Six filter field types were already implemented here, three of them twice,
 * across two systems that share nothing: `FilterBar` (page-level, used by the
 * dashboard demos) and `DataGridToolbar` (every DataTable and DataGrid). A
 * product using both defines "Region" in two places, clears it two ways, and
 * can serialise neither — because there is no canonical shape to serialise.
 *
 * This is that shape. One `FilterField` drives all of:
 *
 *   - which control renders;
 *   - the TanStack `filterFn` that matches rows;
 *   - the applied-filter chip's label;
 *   - the URL parameter, when that lands;
 *   - the query sent to a server in manual mode.
 *
 * Each of those is currently derived independently, which is how they drift.
 *
 * Deliberately NOT a validation library. reui validates filter values with
 * Zod; this repo has no Zod dependency, and these values come from our own
 * controls rather than free text, so the validation surface is a discriminated
 * union the compiler already checks. Adding a schema library for that would
 * fail the repo's own "inspect before adding dependencies" rule.
  * @deprecated since 0.7.0; remove after 0.8.0 / 2026-12-23. Use
 * `components/ui/filters` — the query system.
 *
 * This is a VALUE model: a field and a value, with no operator. It therefore
 * cannot express "is not", "is any of" or "between", and cannot represent
 * `A AND (B OR C)` at all. The query system carries an operator per condition
 * and holds a tree, which is also what lets it serialise to a URL.
 *
 * Still live because `DataGridToolbar.fields` and `DataTable.filterFields`
 * consume it; both carry the same removal promise. `FilterBar` and
 * `FilterChip` are NOT deprecated — the first is layout primitives and the
 * second is a toggle, and neither is superseded by a query builder.
 */

export interface FilterOption {
  value: string;
  label: string;
  /** How many records match. Shown right-aligned in the menu when present. */
  count?: number;
  disabled?: boolean;
}

/** How a numeric filter's values should read. Mirrors `meta.type` on a column. */
export type FilterUnit = 'number' | 'currency' | 'percent';

interface FieldBase {
  id: string;
  label: string;
  /** Hides the field from the bar without removing its definition. */
  hidden?: boolean;
}

export type FilterField =
  | (FieldBase & { type: 'text'; placeholder?: string })
  | (FieldBase & { type: 'select'; options: FilterOption[] })
  | (FieldBase & { type: 'multi'; options: FilterOption[] })
  | (FieldBase & { type: 'dateRange' })
  | (FieldBase & { type: 'numberRange'; unit?: FilterUnit; min?: number; max?: number })
  | (FieldBase & { type: 'boolean'; trueLabel?: string; falseLabel?: string });

export type FilterFieldType = FilterField['type'];

/** The value shape each type stores. This is what gets serialised. */
export type FilterValueFor<T extends FilterFieldType> = T extends 'text'
  ? string
  : T extends 'select'
    ? string
    : T extends 'multi'
      ? string[]
      : T extends 'dateRange'
        ? { from?: string; to?: string }
        : T extends 'numberRange'
          ? { min?: number; max?: number }
          : T extends 'boolean'
            ? boolean
            : never;

/**
 * The registered filter function for a field.
 *
 * These names are not free-form: v9 makes an unregistered `filterFn` a type
 * error rather than a filter that silently matches nothing, and every name
 * here is registered on the feature set in `data-grid-features.ts`.
 */
export function resolveFilterFn(field: FilterField) {
  switch (field.type) {
    case 'text':
      return 'includesString' as const;
    case 'multi':
      // `arrHas`, not `arrIncludesSome`. v9 narrowed the latter to
      // array-valued columns — it early-returns false unless the CELL is an
      // array, so a faceted filter over a plain string column matched zero
      // rows. That bug shipped once already.
      return 'arrHas' as const;
    case 'dateRange':
      return 'dateRange' as const;
    case 'numberRange':
      return 'inNumberRange' as const;
    case 'select':
    case 'boolean':
      return 'equals' as const;
  }
}

/** Whether a stored value actually narrows anything. */
export function isFilterActive(field: FilterField, value: unknown): boolean {
  if (value === undefined || value === null || value === '') return false;
  switch (field.type) {
    case 'multi':
      return Array.isArray(value) && value.length > 0;
    case 'dateRange': {
      const v = value as { from?: string; to?: string };
      return !!(v.from || v.to);
    }
    case 'numberRange': {
      const v = value as { min?: number; max?: number };
      return v.min !== undefined || v.max !== undefined;
    }
    default:
      return true;
  }
}

function formatBound(n: number, unit: FilterUnit | undefined): string {
  if (unit === 'currency') return formatCurrency(n);
  if (unit === 'percent') return formatPercent(n);
  return formatNumber(n);
}

/**
 * The applied filter, in words.
 *
 * States the UNIT, always. "Premium > 500" is ambiguous and
 * "Premium > $500,000" is not — and the column already declares it is currency
 * via `meta.type`, so there is no excuse for the chip not to say so. Same for
 * dates: a bare "1/3" is a different day in two countries.
 *
 * Returns the value half only; the caller prefixes the field label, so a chip
 * can render "Region: " in a muted colour and "EMEA" in the body colour.
 */
export function describeFilterValue(field: FilterField, value: unknown): string {
  switch (field.type) {
    case 'text':
      return String(value);

    case 'select': {
      const match = field.options.find((o) => o.value === value);
      return match?.label ?? String(value);
    }

    case 'multi': {
      const values = (value as string[]) ?? [];
      if (values.length === 0) return '';
      if (values.length === 1) {
        return field.options.find((o) => o.value === values[0])?.label ?? values[0];
      }
      // A list of five labels is longer than the table column it filters.
      // The count is the useful summary; the menu shows which.
      return `${values.length} selected`;
    }

    case 'dateRange': {
      const { from, to } = (value as { from?: string; to?: string }) ?? {};
      if (from && to) return `${formatDate(from)} – ${formatDate(to)}`;
      if (from) return `from ${formatDate(from)}`;
      if (to) return `until ${formatDate(to)}`;
      return '';
    }

    case 'numberRange': {
      const { min, max } = (value as { min?: number; max?: number }) ?? {};
      if (min !== undefined && max !== undefined) {
        return `${formatBound(min, field.unit)} – ${formatBound(max, field.unit)}`;
      }
      if (min !== undefined) return `over ${formatBound(min, field.unit)}`;
      if (max !== undefined) return `under ${formatBound(max, field.unit)}`;
      return '';
    }

    case 'boolean':
      return value ? (field.trueLabel ?? 'Yes') : (field.falseLabel ?? 'No');
  }
}

/** Field + value, for the applied-filter row. */
export interface AppliedFilter {
  field: FilterField;
  value: unknown;
  /** The value in words, unit included. */
  description: string;
}

/**
 * The active filters, in field order.
 *
 * Field order rather than the order the user applied them: a row that
 * reshuffles itself as filters are added is harder to scan, and the user
 * already knows the field order from the bar above it.
 */
export function collectApplied(
  fields: FilterField[],
  values: Record<string, unknown>
): AppliedFilter[] {
  return fields
    .filter((f) => isFilterActive(f, values[f.id]))
    .map((field) => ({
      field,
      value: values[field.id],
      description: describeFilterValue(field, values[field.id]),
    }));
}
