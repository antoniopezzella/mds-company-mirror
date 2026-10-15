/**
 * The canonical query model — §5.
 *
 * Why this replaces the value model
 * ---------------------------------
 * The first pass at filters here stored `Record<fieldId, value>`: a field and
 * a value, no operator. That shape cannot express "Premium is NOT between X
 * and Y", cannot express `A AND (B OR C)`, and — the visible symptom — cannot
 * render `[ Status | is | Active | × ]` as three independently editable
 * segments, because there is no operator segment to render. The UI complaint
 * and the architecture problem were the same problem.
 *
 * §72 states the principle: build a query system, with chips as ONE
 * presentation of it. So the state is a TREE, not a list, and every rule is
 * FIELD → OPERATOR → VALUE.
 *
 * Rules this model obeys (§5.1): serializable, stable ids, field PATHS rather
 * than labels, normalized values rather than formatted strings, explicit
 * negation, and incomplete drafts allowed. No React nodes, no DOM, no grid
 * instance.
 */

export type FilterValue =
  | string
  | number
  | boolean
  | null
  | string[]
  | number[]
  // A select's options may mix the two — `{ value: 1 }` beside
  // `{ value: 'all' }` is ordinary in a real schema.
  | Array<string | number>
  | { from?: string; to?: string }
  | { min?: number; max?: number }
  | Record<string, unknown>;

/** Operator ids are open — a product may register its own (§9). */
export type FilterOperator = string;

export interface FilterRule {
  id: string;
  type: 'rule';
  /**
   * The full path to the attribute — `['risk', 'cat', 'flood']` (§7).
   *
   * A path rather than a flat id because nested schemas are required, and a
   * path rather than a label because labels are translated and would break
   * every persisted query the moment someone changes the copy (§61).
   */
  path: string[];
  /** Absent while the user is still choosing — a draft (§13). */
  operator?: FilterOperator;
  value?: FilterValue;
  /**
   * Explicit negation (§17), rather than swapping in an inverse operator.
   * `NOT (Revenue > 1000)` is structurally safe; assuming every custom
   * operator has a valid inverse is not.
   */
  negated?: boolean;
}

export interface FilterGroup {
  id: string;
  type: 'group';
  combinator: 'and' | 'or';
  rules: FilterNode[];
  negated?: boolean;
}

export type FilterNode = FilterRule | FilterGroup;

/** The root is always a group, and can never be removed (§18). */
export type FilterQuery = FilterGroup;

export function isFilterRule(node: FilterNode): node is FilterRule {
  return node.type === 'rule';
}

export function isFilterGroup(node: FilterNode): node is FilterGroup {
  return node.type === 'group';
}

/**
 * Why a change carries a REASON (§34).
 *
 * "The query changed" is not enough for a consumer that wants to debounce a
 * text edit but commit a checkbox immediately, or log which field a user
 * actually removed. Passing the reason costs nothing and cannot be
 * reconstructed afterwards by diffing two trees.
 */
export interface FilterQueryChangeMeta {
  reason:
    | 'add'
    | 'update'
    | 'remove'
    | 'duplicate'
    | 'negate'
    | 'reorder'
    | 'combinator'
    | 'clear'
    | 'group-add'
    | 'group-remove'
    | 'apply'
    | 'reset';
  nodeId?: string;
  fieldPath?: string[];
}
