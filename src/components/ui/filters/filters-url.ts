import { findOperator } from './filters-operators';
import {
  createFilterGroup,
  createFilterQuery,
  createFilterRule,
  filterValueShapeMatches,
  isFilterRuleComplete,
} from './filters-query';
import {
  fieldTypeAt,
  getFilterField,
  isFieldAddressable,
  type FilterField,
} from './filters-schema';
import {
  isFilterGroup,
  type FilterGroup,
  type FilterNode,
  type FilterQuery,
  type FilterValue,
} from './filters-types';

/**
 * The query as a URL — §37.
 *
 * A filtered view that cannot be linked is a filtered view nobody can send to
 * a colleague, and "here, apply these six filters yourself" is how people end
 * up looking at different numbers in the same meeting. The model was built for
 * this: short ids, field PATHS rather than translated labels, and normalized
 * values rather than formatted strings (§5.1).
 *
 * Format
 * ------
 *     status:is:"Active",(location.country:is:"BR"|location.country:is:"MX")
 *
 * `,` is AND, `|` is OR, parentheses group, and a leading `!` negates. This is
 * the form you see in a log, a test, or a stored query — readable, which
 * matters when someone has to work out why a shared link shows the wrong rows.
 * The URL plumbing percent-encodes it exactly once on the way into the address
 * bar; nothing here encodes it a second time.
 *
 * Field ids and operator ids travel RAW, so they must be identifier-like. They
 * already are: paths are dot-joined, so an id containing a dot was never
 * addressable in the first place.
 *
 * Values are JSON. The two quote characters per string buy the one thing raw
 * values cannot give: a text field holding "123" survives as the string "123"
 * rather than coming back as the number 123. Guessing the type back from the
 * text is exactly the silent corruption §14 is about, and two characters is a
 * cheap price for not doing it.
 *
 * Ids are NOT serialized. They are session-local (see `nextId`), so parsing
 * mints fresh ones — the field path is the identity that persists.
 *
 * Two NORMALIZATIONS, both lossless
 * ---------------------------------
 * A single-child group's combinator is dropped, because `(A)` means the same
 * under either. And `!(A|B)` parses as a negated ROOT rather than as a root
 * whose only child is a negated group: those two trees are the same query, so
 * the parser picks one instead of inventing a character to tell them apart.
 * In both cases the shape changes and the meaning does not — which is the
 * only trade this file is willing to make.
 */

/**
 * Values carry NO escaping of their own — see `splitTop`.
 *
 * The obvious design percent-encodes each value so the delimiters cannot leak.
 * It works, and it is wrong: `URLSearchParams.toString()` then encodes the
 * result a second time, and `status:is:%22Active%22` reaches the address bar
 * as `status%3Ais%3A%2522Active%2522` — 40% longer and unreadable, which
 * defeats the only reason to have a structured format rather than a blob.
 *
 * So the value is plain JSON, and the SPLITTER is taught to respect JSON
 * instead: a `,` inside a quoted string or an object is not a separator. One
 * layer of encoding, applied by the URL plumbing that owns that job.
 */
function encodeValue(v: FilterValue): string {
  return JSON.stringify(v);
}

// ---------------------------------------------------------------- serialize

/**
 * @param fields Optional, and worth passing. Without the schema this cannot
 * tell `status:is_empty` (complete) from `status:is` (a draft missing its
 * value), so it emits both — and the reader then reports the draft as a
 * dropped filter. Pass the schema and drafts are left out, which is what
 * §13 wants: the recipient should not open a half-built condition they did
 * not build. `useFilterQuery` always passes it.
 */
export function serializeFilterQuery(query: FilterQuery, fields?: FilterField[]): string {
  const body = serializeBody(query, fields);
  if (!body) return '';
  return query.negated ? `!(${body})` : body;
}

function serializeBody(group: FilterGroup, fields?: FilterField[]): string {
  const sep = group.combinator === 'or' ? '|' : ',';
  // Empties are FILTERED, not joined: a dropped draft left as an empty part
  // would emit `a:is:1,,b:is:2`, which no longer parses.
  return group.rules
    .map((n) => serializeNode(n, fields))
    .filter(Boolean)
    .join(sep);
}

function serializeNode(node: FilterNode, fields?: FilterField[]): string {
  if (isFilterGroup(node)) {
    const body = serializeBody(node, fields);
    // A group whose children were all drafts carries nothing.
    if (!body) return '';
    return `${node.negated ? '!' : ''}(${body})`;
  }
  // A rule with no operator is a DRAFT (§13) and has no place in a link.
  if (!node.operator) return '';
  // With the schema, a rule still missing its value is a draft too — the
  // builder is in that state after every field-then-operator selection, so
  // without this any reload mid-edit showed a spurious "filters were
  // dropped" notice for a filter the user was still writing.
  if (fields && !isFilterRuleComplete(node, (p) => fieldTypeAt(fields, p))) return '';
  const head = `${node.negated ? '!' : ''}${node.path.join('.')}`;
  const body = `${head}:${node.operator}`;
  return node.value === undefined ? body : `${body}:${encodeValue(node.value)}`;
}

/**
 * True when the leading `(` is closed only by the final character.
 *
 * String-aware for the same reason as `splitTop`: a value of `")"` must not
 * look like the end of a group.
 */
function parensWrapAll(s: string): boolean {
  if (!s.startsWith('(') || !s.endsWith(')')) return false;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = 0; i < s.length; i += 1) {
    const c = s[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') inString = true;
    else if (c === '(') depth += 1;
    else if (c === ')') {
      depth -= 1;
      if (depth === 0) return i === s.length - 1;
    }
  }
  return false;
}

// -------------------------------------------------------------------- parse

export type FilterQueryDropReason =
  | 'unknown-field'
  | 'not-filterable'
  | 'invalid-operator'
  | 'invalid-value'
  | 'malformed';

export interface FilterQueryDropped {
  /** The fragment that could not be used, as it appeared in the URL. */
  raw: string;
  reason: FilterQueryDropReason;
}

export interface FilterQueryParseResult {
  query: FilterQuery;
  /** Everything discarded, so a caller can TELL the user rather than guess. */
  dropped: FilterQueryDropped[];
  /** True only when the whole input was understood. */
  ok: boolean;
}

/**
 * Reads a query from a URL fragment, validated against the live schema.
 *
 * A URL is untrusted input in the ordinary sense — hand-edited, truncated by a
 * chat client — and in a subtler one: a link made last quarter may name a
 * field that has since been removed, renamed or retyped. So every rule is
 * re-checked against `fields`, and whatever fails is DROPPED AND REPORTED
 * rather than repaired. Repairing it would show the recipient a different
 * query than the sender saw, which is worse than showing them fewer filters
 * and saying so.
 */
export function parseFilterQuery(
  input: string,
  fields: FilterField[]
): FilterQueryParseResult {
  const dropped: FilterQueryDropped[] = [];
  const trimmed = input.trim();
  if (!trimmed) return { query: createFilterQuery(), dropped, ok: true };

  try {
    // A negated ROOT round-trips as `!(...)` wrapping the entire input. The
    // check that the parens span the WHOLE string matters: `!(a),(b)` is a
    // negated group beside another, not a negated root.
    const negatedRoot = trimmed.startsWith('!') && parensWrapAll(trimmed.slice(1));
    const src = negatedRoot ? trimmed.slice(2, -1) : trimmed;
    const group = parseBody(src, fields, dropped);
    return {
      query: negatedRoot ? { ...group, negated: true } : group,
      dropped,
      ok: dropped.length === 0,
    };
  } catch {
    // An ambiguous query has no safe reading, so none is chosen. Returning
    // empty filters shows MORE rows than intended, which the user can see;
    // guessing a combinator would show the wrong rows, which they cannot.
    return {
      query: createFilterQuery(),
      dropped: [{ raw: trimmed, reason: 'malformed' }],
      ok: false,
    };
  }
}

/**
 * Splits on separators that are actually separators.
 *
 * A separator counts only outside parentheses AND outside a JSON value, which
 * is what lets a city called "Rio, Brazil" and a range of `{"min":1,"max":9}`
 * travel unescaped. Tracks quoting (with backslash escapes), objects and
 * arrays as well as the grammar's own parentheses.
 */
function splitTop(src: string): { parts: string[]; seps: string[] } {
  const parts: string[] = [];
  const seps: string[] = [];
  let paren = 0;
  let curly = 0;
  let square = 0;
  let inString = false;
  let escaped = false;
  let start = 0;

  for (let i = 0; i < src.length; i += 1) {
    const c = src[i];

    if (inString) {
      // A backslash escapes the next character, so `\"` does not close.
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '"') inString = false;
      continue;
    }

    if (c === '"') inString = true;
    else if (c === '(') paren += 1;
    else if (c === ')') paren -= 1;
    else if (c === '{') curly += 1;
    else if (c === '}') curly -= 1;
    else if (c === '[') square += 1;
    else if (c === ']') square -= 1;
    else if (paren === 0 && curly === 0 && square === 0 && (c === ',' || c === '|')) {
      parts.push(src.slice(start, i));
      seps.push(c);
      start = i + 1;
    }

    if (paren < 0 || curly < 0 || square < 0) throw new Error('unbalanced');
  }

  if (paren !== 0 || curly !== 0 || square !== 0 || inString) throw new Error('unbalanced');
  parts.push(src.slice(start));
  return { parts, seps };
}

function parseBody(
  src: string,
  fields: FilterField[],
  dropped: FilterQueryDropped[]
): FilterGroup {
  const { parts, seps } = splitTop(src);

  // Mixed separators at one level have no single meaning: `a,b|c` could be
  // `(a AND b) OR c` or `a AND (b OR c)`. The model holds one combinator per
  // group, so rather than pick one, refuse the query (§24's rule, applied to
  // input rather than to output).
  const unique = new Set(seps);
  if (unique.size > 1) throw new Error('mixed combinators');
  // A single child carries no combinator, and none is needed: `(A)` means the
  // same under either. Defaulting to AND loses nothing.
  const combinator: 'and' | 'or' = seps[0] === '|' ? 'or' : 'and';

  const nodes: FilterNode[] = [];
  for (const raw of parts) {
    const node = parseNode(raw.trim(), fields, dropped);
    if (node) nodes.push(node);
  }
  return createFilterGroup(combinator, nodes);
}

function parseNode(
  raw: string,
  fields: FilterField[],
  dropped: FilterQueryDropped[]
): FilterNode | null {
  if (!raw) throw new Error('empty node');

  const negated = raw.startsWith('!');
  const body = negated ? raw.slice(1) : raw;

  if (body.startsWith('(')) {
    if (!parensWrapAll(body)) throw new Error('unbalanced');
    const group = parseBody(body.slice(1, -1), fields, dropped);
    // An empty group after its children were dropped means nothing.
    if (!group.rules.length) return null;
    return negated ? { ...group, negated: true } : group;
  }

  // Only the first two colons are structural; a JSON value may contain more.
  const first = body.indexOf(':');
  if (first === -1) {
    dropped.push({ raw, reason: 'malformed' });
    return null;
  }
  const second = body.indexOf(':', first + 1);
  const pathText = body.slice(0, first);
  const opText = second === -1 ? body.slice(first + 1) : body.slice(first + 1, second);
  const valueText = second === -1 ? undefined : body.slice(second + 1);

  const path = pathText.split('.');
  const field = getFilterField(fields, path);
  if (!field) {
    // A field removed or renamed since the link was made.
    dropped.push({ raw, reason: 'unknown-field' });
    return null;
  }
  if (!isFieldAddressable(fields, path)) {
    // A branch, or a field the product has hidden or disabled — the picker
    // cannot produce any of these, so a link naming one is stale or forged.
    dropped.push({ raw, reason: 'not-filterable' });
    return null;
  }

  const type = fieldTypeAt(fields, path);
  const operator = opText;
  const def = type ? findOperator(type, operator) : undefined;
  if (!def) {
    // The operator may have been valid when the link was made and the field
    // retyped since — `contains` on what is now a number.
    dropped.push({ raw, reason: 'invalid-operator' });
    return null;
  }

  let value: FilterValue | undefined;
  if (valueText !== undefined) {
    try {
      value = JSON.parse(valueText) as FilterValue;
    } catch {
      dropped.push({ raw, reason: 'invalid-value' });
      return null;
    }
    // `JSON.stringify(Infinity)` is `"null"`, so a non-finite number that got
    // in here would re-serialize to `null` and the NEXT parse would read it
    // as a rule matching every row — a filter silently inverting itself
    // across one round trip.
    if (!isFinite(value)) {
      dropped.push({ raw, reason: 'invalid-value' });
      return null;
    }
  } else if (def.requiresValue) {
    // Field and operator both valid, value not chosen yet: that is a DRAFT
    // (§13), which the model explicitly supports. It is restored as one —
    // visible, editable, skipped by the predicate — rather than reported as
    // a dropped filter, which would blame the user for their own unfinished
    // work.
    return createFilterRule(path, { operator, ...(negated ? { negated: true } : {}) });
  }

  if (!filterValueShapeMatches(def, value)) {
    // `between` arriving with one number, or `is` with an array.
    dropped.push({ raw, reason: 'invalid-value' });
    return null;
  }

  return createFilterRule(path, { operator, value, ...(negated ? { negated: true } : {}) });
}

/** Deep check: any non-finite number anywhere in the value. */
function isFinite(value: FilterValue | undefined): boolean {
  if (typeof value === 'number') return Number.isFinite(value);
  if (Array.isArray(value)) return value.every((v) => isFinite(v as FilterValue));
  if (value && typeof value === 'object') {
    return Object.values(value).every((v) => isFinite(v as FilterValue));
  }
  return true;
}

// ------------------------------------------------------------- URL plumbing

/** The query-string key a filter query lives under by default. */
export const FILTER_QUERY_PARAM = 'filter';

/**
 * Writes the query into search params, REMOVING the key when empty.
 *
 * A trailing `?filter=` on an unfiltered page is noise that survives copy and
 * paste and makes two identical views look like different URLs.
 */
export function filterQueryToSearchParams(
  query: FilterQuery,
  params: URLSearchParams = new URLSearchParams(),
  key: string = FILTER_QUERY_PARAM
): URLSearchParams {
  const next = new URLSearchParams(params);
  const text = serializeFilterQuery(query);
  if (text) next.set(key, text);
  else next.delete(key);
  return next;
}

export function filterQueryFromSearchParams(
  params: URLSearchParams | string,
  fields: FilterField[],
  key: string = FILTER_QUERY_PARAM
): FilterQueryParseResult {
  const p = typeof params === 'string' ? new URLSearchParams(params) : params;
  return parseFilterQuery(p.get(key) ?? '', fields);
}
