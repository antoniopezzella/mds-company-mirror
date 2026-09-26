import { formatCurrency, formatDate, formatNumber, formatPercent } from '@/lib/format';

import type { FilterRule, FilterValue } from './filters-types';
import type { FilterField } from './filters-schema';

/**
 * A rule's VALUE in words — never the whole rule.
 *
 * The segmented UI renders field, operator and value as separate controls, so
 * this describes only the third. Building one sentence here would force the
 * chip to re-split it.
 *
 * Always states the unit. "Premium over 500000" is ambiguous and "over
 * $500,000" is not, and the field already declares which it is — §44 asks for
 * exactly this separation between the stored number and its display.
 */
export function describeRuleValue(rule: FilterRule, field?: FilterField): string {
  return describeValue(rule.value, field);
}

export function describeValue(value: FilterValue | undefined, field?: FilterField): string {
  if (value === undefined || value === null) return '';

  const unit = (n: number) => {
    if (field?.unit === 'currency') return formatCurrency(n, { decimals: 0 });
    if (field?.unit === 'percent') return formatPercent(n);
    return formatNumber(n);
  };

  if (Array.isArray(value)) {
    if (!value.length) return '';
    const label = (v: unknown) =>
      field?.options?.find((o) => o.value === v)?.label ?? String(v);
    // Two labels fit; five are longer than the column being filtered, and
    // §27 asks for a compact form rather than a chip that wraps the toolbar.
    if (value.length <= 2) return value.map(label).join(', ');
    return `${label(value[0])} +${value.length - 1}`;
  }

  if (typeof value === 'object') {
    const r = value as { min?: number; max?: number; from?: string; to?: string };
    if (r.from !== undefined || r.to !== undefined) {
      if (r.from && r.to) return `${formatDate(r.from)} – ${formatDate(r.to)}`;
      if (r.from) return `from ${formatDate(r.from)}`;
      if (r.to) return `until ${formatDate(r.to)}`;
      return '';
    }
    if (r.min !== undefined && r.max !== undefined) return `${unit(r.min)} – ${unit(r.max)}`;
    if (r.min !== undefined) return unit(r.min);
    if (r.max !== undefined) return unit(r.max);
    return '';
  }

  if (typeof value === 'boolean') {
    return value ? (field?.trueLabel ?? 'Yes') : (field?.falseLabel ?? 'No');
  }

  if (typeof value === 'number') return unit(value);

  // A select stores the option value; show the label a human chose.
  const option = field?.options?.find((o) => String(o.value) === String(value));
  if (option) return option.label;

  if (field?.type === 'date' || field?.type === 'datetime') return formatDate(value);
  return String(value);
}
