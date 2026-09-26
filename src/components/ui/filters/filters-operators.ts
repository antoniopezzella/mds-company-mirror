import type { FilterOperator } from './filters-types';

/**
 * Operators, per data type — §9–10.
 *
 * Schema-driven and type-aware: an operator invalid for the selected field is
 * never offered. That is not only tidiness — offering `>` on a Country field
 * produces a rule no adapter can compile, and the user discovers it as a
 * broken result set rather than a disabled option.
 */

export interface FilterOperatorDefinition {
  value: FilterOperator;
  label: string;
  /**
   * Whether a value editor should render at all.
   *
   * "Status is empty" takes no value, and §9 is explicit that the UI must not
   * render an editor for one — an empty input beside a complete rule reads as
   * unfinished work.
   */
  requiresValue: boolean;
  /** The value is a collection (`is any of`), not a scalar. */
  supportsMultiple?: boolean;
  /** Two bounds rather than one value (`between`). */
  isRange?: boolean;
}

const EMPTINESS: FilterOperatorDefinition[] = [
  { value: 'is_empty', label: 'is empty', requiresValue: false },
  { value: 'is_not_empty', label: 'is not empty', requiresValue: false },
];

const TEXT: FilterOperatorDefinition[] = [
  { value: 'is', label: 'is', requiresValue: true },
  { value: 'is_not', label: 'is not', requiresValue: true },
  { value: 'contains', label: 'contains', requiresValue: true },
  { value: 'not_contains', label: 'does not contain', requiresValue: true },
  { value: 'starts_with', label: 'starts with', requiresValue: true },
  { value: 'ends_with', label: 'ends with', requiresValue: true },
  ...EMPTINESS,
];

const NUMBER: FilterOperatorDefinition[] = [
  { value: 'eq', label: 'equals', requiresValue: true },
  { value: 'neq', label: 'does not equal', requiresValue: true },
  { value: 'gt', label: 'greater than', requiresValue: true },
  { value: 'gte', label: 'greater than or equal', requiresValue: true },
  { value: 'lt', label: 'less than', requiresValue: true },
  { value: 'lte', label: 'less than or equal', requiresValue: true },
  { value: 'between', label: 'between', requiresValue: true, isRange: true },
  { value: 'not_between', label: 'not between', requiresValue: true, isRange: true },
  ...EMPTINESS,
];

const SELECT: FilterOperatorDefinition[] = [
  { value: 'is', label: 'is', requiresValue: true },
  { value: 'is_not', label: 'is not', requiresValue: true },
  { value: 'any_of', label: 'is any of', requiresValue: true, supportsMultiple: true },
  { value: 'none_of', label: 'is none of', requiresValue: true, supportsMultiple: true },
  ...EMPTINESS,
];

/**
 * Multi-select is a different question from select, and §10.4 insists the
 * difference be explicit: `contains any [A,B]` means A OR B, `contains all`
 * means A AND B. Collapsing them into one "is" operator is how a user ends up
 * with the wrong rows and no way to say what they meant.
 */
const MULTISELECT: FilterOperatorDefinition[] = [
  { value: 'contains_any', label: 'contains any of', requiresValue: true, supportsMultiple: true },
  { value: 'contains_all', label: 'contains all of', requiresValue: true, supportsMultiple: true },
  { value: 'not_contains_any', label: 'does not contain', requiresValue: true, supportsMultiple: true },
  ...EMPTINESS,
];

/**
 * Boolean deliberately has no `is_empty`: a boolean column is true or false,
 * and "unset" is the absence of the RULE rather than a third value. §10.5
 * also asks for domain language over `is true` where the product has it,
 * which the field supplies via trueLabel/falseLabel.
 */
const BOOLEAN: FilterOperatorDefinition[] = [
  { value: 'is', label: 'is', requiresValue: true },
];

const DATE: FilterOperatorDefinition[] = [
  { value: 'is', label: 'is', requiresValue: true },
  { value: 'is_not', label: 'is not', requiresValue: true },
  { value: 'before', label: 'before', requiresValue: true },
  { value: 'after', label: 'after', requiresValue: true },
  { value: 'on_or_before', label: 'on or before', requiresValue: true },
  { value: 'on_or_after', label: 'on or after', requiresValue: true },
  { value: 'between', label: 'between', requiresValue: true, isRange: true },
  { value: 'not_between', label: 'not between', requiresValue: true, isRange: true },
  ...EMPTINESS,
];

export const OPERATORS_BY_TYPE = {
  text: TEXT,
  number: NUMBER,
  range: NUMBER,
  select: SELECT,
  multiselect: MULTISELECT,
  boolean: BOOLEAN,
  date: DATE,
  dateRange: DATE,
  datetime: DATE,
  custom: TEXT,
} as const satisfies Record<string, FilterOperatorDefinition[]>;

export type FilterFieldType = keyof typeof OPERATORS_BY_TYPE;

export function operatorsFor(type: FilterFieldType): FilterOperatorDefinition[] {
  return [...OPERATORS_BY_TYPE[type]];
}

export function findOperator(
  type: FilterFieldType,
  value: FilterOperator | undefined
): FilterOperatorDefinition | undefined {
  if (!value) return undefined;
  return OPERATORS_BY_TYPE[type].find((o) => o.value === value);
}

/**
 * Whether an operator survives a change of field (§14).
 *
 * When the field changes, the operator and value must be re-validated rather
 * than carried over: `Revenue > 1000` becoming `Country > 1000` is nonsense,
 * and §14 is explicit that incompatible operators must be reset rather than
 * silently translated into something that looks plausible.
 */
export function isOperatorValidFor(type: FilterFieldType, operator: FilterOperator): boolean {
  return OPERATORS_BY_TYPE[type].some((o) => o.value === operator);
}

/**
 * The operator a new rule starts on.
 *
 * `undefined` for types where guessing would be presumptuous, and the obvious
 * one where there is only one sensible reading — a boolean field has exactly
 * one operator, so making the user pick it is pure ceremony.
 */
export function defaultOperatorFor(type: FilterFieldType): FilterOperator | undefined {
  const list = OPERATORS_BY_TYPE[type];
  return list.length === 1 ? list[0].value : undefined;
}
