import {
  isFilterGroup,
  isFilterRule,
  type FilterGroup,
  type FilterNode,
  type FilterQuery,
  type FilterRule,
  type FilterValue,
} from './filters-types';
import { findOperator, isOperatorValidFor, type FilterFieldType } from './filters-operators';

/**
 * Pure query utilities — §59.
 *
 * Every function returns NEW state and touches nothing else: no React, no
 * grid, no network. That is what lets the same query drive a chip row, an
 * advanced builder, a URL and a server request without any of them agreeing
 * on anything but the shape.
 */

let counter = 0;
/**
 * Ids are stable within a session and unique across one.
 *
 * Deliberately not `crypto.randomUUID()`: these end up in URLs (§37), and a
 * 36-character id per rule makes a three-filter link unreadable. They are
 * never persisted as identity — the field PATH is — so a short counter is
 * enough and survives serialisation fine.
 */
function nextId(prefix: string): string {
  counter += 1;
  return `${prefix}-${counter}`;
}

/** Test seam, so id assertions do not depend on execution order. */
export function __resetFilterIds() {
  counter = 0;
}

export function createFilterQuery(rules: FilterNode[] = []): FilterQuery {
  return { id: nextId('group'), type: 'group', combinator: 'and', rules };
}

export function createFilterRule(path: string[], init: Partial<FilterRule> = {}): FilterRule {
  return { id: nextId('rule'), type: 'rule', path, ...init };
}

export function createFilterGroup(
  combinator: 'and' | 'or' = 'and',
  rules: FilterNode[] = []
): FilterGroup {
  return { id: nextId('group'), type: 'group', combinator, rules };
}

/** Depth-first map over the tree, rebuilding only the branches that change. */
function mapNodes(group: FilterGroup, fn: (node: FilterNode) => FilterNode | null): FilterGroup {
  const rules: FilterNode[] = [];
  for (const node of group.rules) {
    const mapped = fn(node);
    if (mapped === null) continue;
    rules.push(isFilterGroup(mapped) ? mapNodes(mapped, fn) : mapped);
  }
  return { ...group, rules };
}

export function getFilterNode(query: FilterQuery, id: string): FilterNode | undefined {
  if (query.id === id) return query;
  for (const node of query.rules) {
    if (node.id === id) return node;
    if (isFilterGroup(node)) {
      const found = getFilterNode(node, id);
      if (found) return found;
    }
  }
  return undefined;
}

export function addFilterNode(query: FilterQuery, node: FilterNode, groupId = query.id): FilterQuery {
  if (query.id === groupId) return { ...query, rules: [...query.rules, node] };
  return mapNodes(query, (n) =>
    isFilterGroup(n) && n.id === groupId ? { ...n, rules: [...n.rules, node] } : n
  );
}

export function updateFilterRule(
  query: FilterQuery,
  id: string,
  patch: Partial<Omit<FilterRule, 'id' | 'type'>>
): FilterQuery {
  return mapNodes(query, (n) => (isFilterRule(n) && n.id === id ? { ...n, ...patch } : n));
}

/**
 * Changing a rule's FIELD resets whatever no longer applies (§14).
 *
 * `Revenue > 1000` becoming `Country > 1000` is nonsense, and §14 forbids
 * silently translating an incompatible operator into a plausible-looking one.
 * The operator survives only if it is valid for the new type; the value never
 * survives an operator change, because `between`'s two bounds mean nothing to
 * `contains`.
 */
export function changeRuleField(
  query: FilterQuery,
  id: string,
  path: string[],
  newType: FilterFieldType
): FilterQuery {
  return mapNodes(query, (n) => {
    if (!isFilterRule(n) || n.id !== id) return n;
    const keepsOperator = n.operator ? isOperatorValidFor(newType, n.operator) : false;
    return {
      ...n,
      path,
      operator: keepsOperator ? n.operator : undefined,
      value: keepsOperator ? n.value : undefined,
    };
  });
}

/** Changing the operator drops a value the new operator cannot accept (§14). */
export function changeRuleOperator(
  query: FilterQuery,
  id: string,
  operator: string,
  type: FilterFieldType
): FilterQuery {
  const def = findOperator(type, operator);
  return mapNodes(query, (n) => {
    if (!isFilterRule(n) || n.id !== id) return n;
    // A value-less operator must not keep a stale value hanging off the rule:
    // it would compile into the adapter as a condition the user never set.
    if (!def?.requiresValue) return { ...n, operator, value: undefined };
    const shapeChanged =
      !!def.isRange !== isRangeValue(n.value) || !!def.supportsMultiple !== Array.isArray(n.value);
    return { ...n, operator, value: shapeChanged ? undefined : n.value };
  });
}

function isRangeValue(v: FilterValue | undefined): boolean {
  return typeof v === 'object' && v !== null && !Array.isArray(v) && ('min' in v || 'from' in v);
}

/**
 * Removes a node, pruning ONLY the groups that THIS removal emptied.
 *
 * Not `pruneEmptyGroups`, which would also delete an unrelated empty group the
 * user had just created and not yet filled in — removing a rule at the top
 * would silently destroy a group being built three rows down. A group that
 * lost its last child to this removal no longer means anything and does go.
 */
export function removeFilterNode(query: FilterQuery, id: string): FilterQuery {
  // The root always survives (§18).
  if (query.id === id) return { ...query, rules: [] };

  const strip = (group: FilterGroup): { group: FilterGroup; removed: boolean } => {
    let removed = false;
    const rules: FilterNode[] = [];
    for (const node of group.rules) {
      if (node.id === id) {
        removed = true;
        continue;
      }
      if (isFilterGroup(node)) {
        const inner = strip(node);
        if (inner.removed) {
          removed = true;
          if (inner.group.rules.length === 0) continue;
        }
        rules.push(inner.group);
        continue;
      }
      rules.push(node);
    }
    return { group: { ...group, rules }, removed };
  };

  return strip(query).group;
}

/** Deep clone with FRESH ids, so the copy is independently editable (§16, §22). */
function cloneNode(node: FilterNode): FilterNode {
  if (isFilterRule(node)) return { ...node, id: nextId('rule') };
  return { ...node, id: nextId('group'), rules: node.rules.map(cloneNode) };
}

export function duplicateFilterNode(query: FilterQuery, id: string): FilterQuery {
  const insert = (group: FilterGroup): FilterGroup => {
    const rules: FilterNode[] = [];
    for (const node of group.rules) {
      rules.push(isFilterGroup(node) ? insert(node) : node);
      // Adjacent to the original, which is where the user is looking.
      if (node.id === id) rules.push(cloneNode(node));
    }
    return { ...group, rules };
  };
  return insert(query);
}

export function negateFilterNode(query: FilterQuery, id: string): FilterQuery {
  if (query.id === id) return { ...query, negated: !query.negated };
  return mapNodes(query, (n) => (n.id === id ? { ...n, negated: !n.negated } : n));
}

export function setGroupCombinator(
  query: FilterQuery,
  id: string,
  combinator: 'and' | 'or'
): FilterQuery {
  if (query.id === id) return { ...query, combinator };
  return mapNodes(query, (n) => (isFilterGroup(n) && n.id === id ? { ...n, combinator } : n));
}

export function moveFilterNode(query: FilterQuery, id: string, delta: number): FilterQuery {
  const reorder = (group: FilterGroup): FilterGroup => {
    const i = group.rules.findIndex((n) => n.id === id);
    if (i !== -1) {
      const j = i + delta;
      if (j < 0 || j >= group.rules.length) return group;
      const rules = [...group.rules];
      [rules[i], rules[j]] = [rules[j], rules[i]];
      return { ...group, rules };
    }
    return { ...group, rules: group.rules.map((n) => (isFilterGroup(n) ? reorder(n) : n)) };
  };
  return reorder(query);
}

/** Empty nested groups are pruned; the root is kept (§18). */
export function pruneEmptyGroups(query: FilterQuery): FilterQuery {
  const prune = (group: FilterGroup): FilterGroup => ({
    ...group,
    rules: group.rules
      .map((n) => (isFilterGroup(n) ? prune(n) : n))
      .filter((n) => !(isFilterGroup(n) && n.rules.length === 0)),
  });
  return prune(query);
}

/**
 * Whether a rule can actually run (§13).
 *
 * Incomplete is not invalid: a half-built rule stays visible and editable,
 * but must never reach an adapter or be counted as an active filter. The
 * distinction matters because showing an error on a rule the user is still
 * constructing is hostile.
 */
export function isFilterRuleComplete(
  rule: FilterRule,
  typeOf: (path: string[]) => FilterFieldType | undefined
): boolean {
  if (!rule.path.length || !rule.operator) return false;
  const type = typeOf(rule.path);
  if (!type) return false;
  const def = findOperator(type, rule.operator);
  if (!def) return false;
  if (!def.requiresValue) return true;
  const v = rule.value;
  if (v === undefined || v === null || v === '') return false;
  if (Array.isArray(v)) return v.length > 0;
  if (def.isRange && typeof v === 'object') {
    const r = v as { min?: number; max?: number; from?: string; to?: string };
    return r.min !== undefined || r.max !== undefined || !!r.from || !!r.to;
  }
  return true;
}

/**
 * How many filters are actually applied (§25).
 *
 * Counts executable RULES only — not groups, not empty groups, not drafts.
 * `A AND (B OR C)` is 3, because the user set three conditions; the group is
 * structure, not a filter.
 */
export function countFilterRules(
  query: FilterQuery,
  typeOf: (path: string[]) => FilterFieldType | undefined,
  { executableOnly = true }: { executableOnly?: boolean } = {}
): number {
  let n = 0;
  const walk = (group: FilterGroup) => {
    for (const node of group.rules) {
      if (isFilterGroup(node)) walk(node);
      else if (!executableOnly || isFilterRuleComplete(node, typeOf)) n += 1;
    }
  };
  walk(query);
  return n;
}

/** Every executable rule, flattened — for a chip row that cannot nest (§24). */
export function flattenFilterConditions(
  query: FilterQuery,
  typeOf: (path: string[]) => FilterFieldType | undefined
): FilterRule[] {
  const out: FilterRule[] = [];
  const walk = (group: FilterGroup) => {
    for (const node of group.rules) {
      if (isFilterGroup(node)) walk(node);
      else if (isFilterRuleComplete(node, typeOf)) out.push(node);
    }
  };
  walk(query);
  return out;
}

/** The group directly containing `id`, or undefined for the root itself. */
export function findParentGroup(query: FilterQuery, id: string): FilterGroup | undefined {
  if (query.rules.some((n) => n.id === id)) return query;
  for (const node of query.rules) {
    if (isFilterGroup(node)) {
      const found = findParentGroup(node, id);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Whether a group can be dissolved into its parent WITHOUT changing meaning.
 *
 * This is §24's problem again, one level down. Lifting `(B OR C)` into an AND
 * parent yields `B AND C` — a different query, and one the user did not ask
 * for. So ungroup is offered only when it is provably safe: a single child
 * cannot change meaning, and matching combinators are associative. A negated
 * group can never be lifted, because the NOT has nowhere to go.
 */
export function canUngroupFilterNode(query: FilterQuery, id: string): boolean {
  const node = getFilterNode(query, id);
  const parent = findParentGroup(query, id);
  if (!node || !parent || !isFilterGroup(node) || node.negated) return false;
  if (node.rules.length <= 1) return true;
  return node.combinator === parent.combinator;
}

/** Dissolves a group into its parent. A no-op unless `canUngroupFilterNode`. */
export function ungroupFilterNode(query: FilterQuery, id: string): FilterQuery {
  if (!canUngroupFilterNode(query, id)) return query;
  const lift = (group: FilterGroup): FilterGroup => {
    const rules: FilterNode[] = [];
    for (const node of group.rules) {
      if (isFilterGroup(node) && node.id === id) {
        rules.push(...node.rules);
        continue;
      }
      rules.push(isFilterGroup(node) ? lift(node) : node);
    }
    return { ...group, rules };
  };
  return lift(query);
}

/**
 * How deeply the tree nests — the root alone is 1.
 *
 * The builder needs this to STOP: indentation runs out of horizontal room
 * around four levels, and a query nobody can read is not a query anyone can
 * trust. §22 asks for a limit that is stated rather than silently enforced,
 * so the builder disables "Add group" and says why instead of no-oping.
 */
export function filterQueryDepth(node: FilterNode): number {
  if (isFilterRule(node)) return 0;
  return 1 + Math.max(0, ...node.rules.map(filterQueryDepth));
}

/**
 * Wraps one existing node in a new group — "group this condition with another".
 *
 * The inverse of dragging a rule into a group, and the only way to build
 * `A AND (B OR C)` from `A AND B` without retyping B: B becomes the first
 * member of a new OR group, keeping its id, operator and value intact.
 */
export function wrapFilterNodeInGroup(
  query: FilterQuery,
  id: string,
  combinator: 'and' | 'or' = 'or'
): FilterQuery {
  const wrap = (group: FilterGroup): FilterGroup => ({
    ...group,
    rules: group.rules.map((node) => {
      if (node.id === id) return createFilterGroup(combinator, [node]);
      return isFilterGroup(node) ? wrap(node) : node;
    }),
  });
  return wrap(query);
}

/**
 * Whether the query is safe to EDIT in a flat chip row — §24.
 *
 * This is the semantic requirement the spec calls critical. `A AND (B OR C)`
 * rendered as three chips reads as `A AND B AND C`, which is a different
 * query. Rather than flatten and lie, the basic presentation asks this first
 * and routes anything nested or OR-combined to the advanced builder.
 */
export function isFlattenable(query: FilterQuery): boolean {
  if (query.combinator !== 'and' || query.negated) return false;
  return query.rules.every((n) => isFilterRule(n) && !n.negated);
}
