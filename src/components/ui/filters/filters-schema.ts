import type * as React from 'react';

import type { FilterOperatorDefinition, FilterFieldType } from './filters-operators';

/**
 * The field schema — §6.
 *
 * Filters are generated from this, never hardcoded. A product supplies its
 * own fields; the component knows nothing about policies, assets or claims.
 */

export interface FilterOption {
  value: string | number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Loads options from a server — §28.
 *
 * Takes an AbortSignal because the obvious implementation (fire a request per
 * keystroke, render whatever returns last) shows the results of "Acm" after
 * the results of "Acme" whenever the network reorders them.
 */
export type FilterOptionLoader = (args: {
  search: string;
  cursor?: string;
  signal?: AbortSignal;
}) => Promise<{ options: FilterOption[]; nextCursor?: string }>;

export interface FilterField {
  id: string;
  label: string;
  type: FilterFieldType;
  description?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  /** Overrides the type's default operator set (§9). */
  operators?: FilterOperatorDefinition[];
  options?: FilterOption[];
  /** Remote options. Takes precedence over `options` when present (§28). */
  loadOptions?: FilterOptionLoader;
  /** Child attributes — `Location > Country` (§7). */
  fields?: FilterField[];
  /** Names a registered custom editor (§11). */
  editor?: string;
  /** Unit for numeric display. Not a stored value — formatting only (§44). */
  unit?: 'number' | 'currency' | 'percent';
  /** Domain language for a boolean, per §10.5. */
  trueLabel?: string;
  falseLabel?: string;
  disabled?: boolean;
  hidden?: boolean;
  /**
   * Extra search terms. "TIV" should find "Total insured value" even though
   * the label contains no such word (§8).
   */
  aliases?: string[];
  metadata?: Record<string, unknown>;
}

/** A field plus the path taken to reach it. */
export interface ResolvedField {
  field: FilterField;
  path: string[];
  /** Ancestor labels, for "Risk › CAT › Flood" (§7). */
  ancestors: string[];
}

/** Only leaves are filterable; a branch is a grouping, not a condition. */
export function isLeafField(field: FilterField): boolean {
  return !field.fields?.length;
}

/** Every filterable leaf, depth-first, with its path. */
export function flattenFields(fields: FilterField[], parents: FilterField[] = []): ResolvedField[] {
  const out: ResolvedField[] = [];
  for (const field of fields) {
    if (field.hidden) continue;
    const chain = [...parents, field];
    if (isLeafField(field)) {
      out.push({
        field,
        path: chain.map((f) => f.id),
        ancestors: parents.map((f) => f.label),
      });
    } else {
      out.push(...flattenFields(field.fields!, chain));
    }
  }
  return out;
}

/** Resolve a stored path back to its field. Returns undefined if it is gone (§60). */
export function getFilterField(fields: FilterField[], path: string[]): FilterField | undefined {
  let level = fields;
  let found: FilterField | undefined;
  for (const segment of path) {
    found = level.find((f) => f.id === segment);
    if (!found) return undefined;
    level = found.fields ?? [];
  }
  return found;
}

/**
 * Whether a path names something a user could actually have picked.
 *
 * The picker hides `hidden` fields and refuses `disabled` ones, so a query
 * naming either did not come from this UI — it came from a hand-edited URL or
 * a link made before the field was withdrawn. Honouring it would filter on a
 * field the product has deliberately taken away, which is worse than dropping
 * it and saying so.
 *
 * Checks every ANCESTOR too: hiding a parent hides its children, and checking
 * only the leaf would let `risk.internal.score` through while `risk.internal`
 * is hidden.
 */
export function isFieldAddressable(fields: FilterField[], path: string[]): boolean {
  if (!path.length) return false;
  let level = fields;
  let found: FilterField | undefined;
  for (const segment of path) {
    found = level.find((f) => f.id === segment);
    if (!found || found.hidden || found.disabled) return false;
    level = found.fields ?? [];
  }
  // A branch is a container, not something with a value to compare.
  return !!found && isLeafField(found);
}

/** The type at a path, for the query utilities' `typeOf` callback. */
export function fieldTypeAt(fields: FilterField[], path: string[]): FilterFieldType | undefined {
  return getFilterField(fields, path)?.type;
}

/** "Risk › CAT › Flood" — the readable form of a path (§7). */
export function fieldPathLabel(fields: FilterField[], path: string[]): string {
  const labels: string[] = [];
  let level = fields;
  for (const segment of path) {
    const found: FilterField | undefined = level.find((f) => f.id === segment);
    if (!found) {
      labels.push(segment);
      break;
    }
    labels.push(found.label);
    level = found.fields ?? [];
  }
  return labels.join(' › ');
}

export interface FieldSearchResult extends ResolvedField {
  /** Character ranges in the label that matched, for highlighting (§8). */
  matches: Array<[number, number]>;
}

/**
 * Search the schema — §8.
 *
 * Returns NESTED matches without the user having to walk the tree: typing
 * "flood" finds `Risk › CAT › Flood` from the top level, which is the whole
 * point of search over a hundred-field schema. Parent context is preserved so
 * the result is unambiguous when three branches each have an "Amount".
 *
 * Case-insensitive, whitespace-trimmed, and searches aliases as well as
 * labels so "TIV" finds "Total insured value".
 */
export function searchFields(fields: FilterField[], query: string): FieldSearchResult[] {
  const term = query.trim().toLowerCase();
  const all = flattenFields(fields);
  if (!term) return all.map((r) => ({ ...r, matches: [] }));

  const results: FieldSearchResult[] = [];
  for (const entry of all) {
    const label = entry.field.label;
    const index = label.toLowerCase().indexOf(term);
    if (index !== -1) {
      results.push({ ...entry, matches: [[index, index + term.length]] });
      continue;
    }
    // An alias or an ancestor label still makes this a match — searching
    // "risk" should surface everything under Risk — but with no highlight,
    // because the matched text is not in the label being rendered.
    const aliasHit = entry.field.aliases?.some((a) => a.toLowerCase().includes(term));
    const ancestorHit = entry.ancestors.some((a) => a.toLowerCase().includes(term));
    if (aliasHit || ancestorHit) results.push({ ...entry, matches: [] });
  }
  return results;
}

/** The children at a level, for drilling in rather than searching (§7). */
export function fieldsAtPath(fields: FilterField[], path: string[]): FilterField[] {
  if (!path.length) return fields.filter((f) => !f.hidden);
  const field = getFilterField(fields, path);
  return (field?.fields ?? []).filter((f) => !f.hidden);
}
