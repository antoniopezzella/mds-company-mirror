import { isFilterGroup, type FilterGroup, type FilterQuery, type FilterRule } from '../filters-types';
import { isFilterRuleComplete } from '../filters-query';
import { fieldTypeAt, type FilterField } from '../filters-schema';

/**
 * Compiles a query into a local predicate — §31.
 *
 * A pure adapter, deliberately outside the visual components: the same query
 * must also compile to REST parameters, a GraphQL variable set or an
 * Elasticsearch DSL, and none of those belong in a React tree.
 *
 * Two rules it must never break:
 *
 *  - **Incomplete and invalid rules are skipped**, never guessed at. A draft
 *    that compiled to "match everything" would quietly widen the result set
 *    while the user is still typing.
 *  - **Negation is applied to the NODE**, not by inverting the operator. `NOT
 *    (Revenue > 1000)` and `Revenue <= 1000` differ the moment revenue is
 *    null, and only the first is what the user asked for.
 */

/** Reads a value from a row by field path — `['risk','cat']` → row.risk.cat. */
function valueAt(row: unknown, path: string[]): unknown {
  let current: unknown = row;
  for (const segment of path) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

const isEmpty = (v: unknown) =>
  v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0);

const text = (v: unknown) => String(v ?? '').toLowerCase();

/**
 * ABSENT IS NOT ZERO.
 *
 * `Number(null)`, `Number('')`, `Number(false)` and `Number([])` are all `0`,
 * so a bare `Number()` here made "Premium under $100k" return every policy
 * with no premium recorded — a wrong answer presented as fact. Anything that
 * is not a number and not a numeric string becomes NaN, and the comparisons
 * below refuse NaN outright.
 */
const num = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (v === null || v === undefined || typeof v === 'boolean' || Array.isArray(v)) return NaN;
  if (typeof v === 'string' && v.trim() === '') return NaN;
  return Number(v);
};

/**
 * The loose comparison `is` uses, shared with the set operators.
 *
 * A select option may hold the number `1` while the grid row holds `"1"` —
 * `FilterValue`'s own doc calls that ordinary, and a URL turns one into the
 * other. `is` was loose and `any_of` strict, so the same intent gave opposite
 * answers on the same data.
 */
const same = (a: unknown, b: unknown): boolean => a == b;

const hasSame = (haystack: unknown[], needle: unknown): boolean =>
  haystack.some((v) => same(v, needle));

const DATE_TYPES = new Set(['date', 'datetime', 'dateRange']);

/**
 * Dates compare at DAY granularity, from a `YYYY-MM-DD` string parsed as
 * LOCAL midnight.
 *
 * `new Date('2026-07-09')` is UTC midnight per spec, so in any timezone
 * behind UTC that row lands on the 8th and a range starting the 9th silently
 * drops it — §45 calls this out, and the grid's own date filter already
 * carries the same note.
 */
function day(v: unknown): number | undefined {
  if (v instanceof Date) return new Date(v.getFullYear(), v.getMonth(), v.getDate()).getTime();
  if (typeof v !== 'string') return undefined;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])).getTime();
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

function matchRule(rule: FilterRule, row: unknown, type?: string): boolean {
  const actual = valueAt(row, rule.path);
  const expected = rule.value;
  const isDate = type !== undefined && DATE_TYPES.has(type);

  switch (rule.operator) {
    case 'is_empty':
      return isEmpty(actual);
    case 'is_not_empty':
      return !isEmpty(actual);

    case 'is':
    case 'is_not': {
      // On a DATE field, compare the day — every other date operator does,
      // and comparing raw values meant a `datetime` column could never match
      // `is` at all, while `on_or_before` matched the same row happily.
      const equal = isDate
        ? day(actual) !== undefined && day(actual) === day(expected)
        // Loose on purpose for booleans and numbers arriving as strings from
        // a URL; strict comparison there would silently match nothing.
        : same(actual, expected);
      return rule.operator === 'is' ? equal : !equal;
    }

    case 'contains':
      return text(actual).includes(text(expected));
    case 'not_contains':
      return !text(actual).includes(text(expected));
    case 'starts_with':
      return text(actual).startsWith(text(expected));
    case 'ends_with':
      return text(actual).endsWith(text(expected));

    case 'eq':
    case 'neq':
    case 'gt':
    case 'gte':
    case 'lt':
    case 'lte': {
      const a = num(actual);
      const b = num(expected);
      // A row with nothing in the column is not "under 100", and it is not
      // "not equal to 100" either — it has nothing to compare. Letting NaN
      // fall through would put every blank row into `neq`'s results, since
      // `NaN !== NaN` is true.
      if (Number.isNaN(a) || Number.isNaN(b)) return false;
      if (rule.operator === 'eq') return a === b;
      if (rule.operator === 'neq') return a !== b;
      if (rule.operator === 'gt') return a > b;
      if (rule.operator === 'gte') return a >= b;
      if (rule.operator === 'lt') return a < b;
      return a <= b;
    }

    case 'between':
    case 'not_between': {
      const r = (expected ?? {}) as { min?: number; max?: number; from?: string; to?: string };
      let within: boolean;
      if (r.from !== undefined || r.to !== undefined) {
        const d = day(actual);
        // Inclusive on both ends — §45 requires this be deterministic and
        // documented, and inclusive is what "between the 1st and the 30th"
        // means to everyone outside a database.
        within =
          d !== undefined &&
          (r.from === undefined || d >= (day(r.from) ?? -Infinity)) &&
          (r.to === undefined || d <= (day(r.to) ?? Infinity));
      } else {
        const n = num(actual);
        within =
          !Number.isNaN(n) &&
          (r.min === undefined || n >= r.min) &&
          (r.max === undefined || n <= r.max);
      }
      return rule.operator === 'between' ? within : !within;
    }

    case 'any_of':
      return Array.isArray(expected) && hasSame(expected as unknown[], actual);
    case 'none_of':
      return Array.isArray(expected) && !hasSame(expected as unknown[], actual);

    /**
     * §10.4 insists these stay distinct: `contains any [A,B]` is A OR B,
     * `contains all [A,B]` is A AND B. Collapsing them gives the user the
     * wrong rows with no way to say what they meant.
     */
    case 'contains_any': {
      const have = Array.isArray(actual) ? actual : [actual];
      return Array.isArray(expected) && (expected as unknown[]).some((v) => hasSame(have, v));
    }
    case 'contains_all': {
      const have = Array.isArray(actual) ? actual : [actual];
      return Array.isArray(expected) && (expected as unknown[]).every((v) => hasSame(have, v));
    }
    case 'not_contains_any': {
      const have = Array.isArray(actual) ? actual : [actual];
      return Array.isArray(expected) && !(expected as unknown[]).some((v) => hasSame(have, v));
    }

    case 'before':
      return (day(actual) ?? Infinity) < (day(expected) ?? -Infinity);
    case 'after':
      return (day(actual) ?? -Infinity) > (day(expected) ?? Infinity);
    case 'on_or_before':
      return (day(actual) ?? Infinity) <= (day(expected) ?? -Infinity);
    case 'on_or_after':
      return (day(actual) ?? -Infinity) >= (day(expected) ?? Infinity);

    default:
      // Defence in depth only — `isFilterRuleComplete` rejects an unknown
      // operator before `matchNode` gets here, so an unrecognised rule is
      // SKIPPED (constraining nothing) rather than reaching this line. Worth
      // knowing: the skip is what a custom `field.operators` entry currently
      // hits, and it looks like the filter is set while it does nothing.
      return false;
  }
}

function matchNode(node: FilterGroup | FilterRule, row: unknown, fields: FilterField[]): boolean | null {
  if (isFilterGroup(node)) {
    const results = node.rules
      .map((child) => matchNode(child as FilterGroup | FilterRule, row, fields))
      .filter((r): r is boolean => r !== null);
    // An empty group constrains nothing, rather than excluding everything.
    if (!results.length) return null;
    const combined =
      node.combinator === 'and' ? results.every(Boolean) : results.some(Boolean);
    return node.negated ? !combined : combined;
  }

  if (!isFilterRuleComplete(node, (p) => fieldTypeAt(fields, p))) return null;
  const result = matchRule(node, row, fieldTypeAt(fields, node.path));
  return node.negated ? !result : result;
}

/**
 * The query as a row predicate.
 *
 * Returns a function rather than filtered rows so a consumer can use it with
 * a grid, an array, or nothing at all.
 */
export function compilePredicate<TRow>(
  query: FilterQuery,
  fields: FilterField[]
): (row: TRow) => boolean {
  return (row: TRow) => matchNode(query, row, fields) ?? true;
}

/** Convenience for the common case. */
export function applyFilterQuery<TRow>(
  rows: TRow[],
  query: FilterQuery,
  fields: FilterField[]
): TRow[] {
  const predicate = compilePredicate<TRow>(query, fields);
  return rows.filter(predicate);
}
