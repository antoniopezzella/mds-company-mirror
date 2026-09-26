import { describe, it, expect, beforeEach } from 'vitest';

import {
  __resetFilterIds,
  addFilterNode,
  changeRuleField,
  changeRuleOperator,
  countFilterRules,
  createFilterGroup,
  createFilterQuery,
  createFilterRule,
  duplicateFilterNode,
  flattenFilterConditions,
  getFilterNode,
  isFilterRuleComplete,
  isFlattenable,
  moveFilterNode,
  negateFilterNode,
  pruneEmptyGroups,
  removeFilterNode,
  setGroupCombinator,
} from './filters-query';
import { isFilterGroup, isFilterRule, type FilterGroup } from './filters-types';
import { defaultOperatorFor, isOperatorValidFor, operatorsFor } from './filters-operators';
import type { FilterFieldType } from './filters-operators';

/** A tiny schema: status is a select, revenue a number, country a select. */
const TYPES: Record<string, FilterFieldType> = {
  status: 'select',
  revenue: 'number',
  country: 'select',
  notes: 'text',
  bound: 'boolean',
};
const typeOf = (path: string[]) => TYPES[path.join('.')];

beforeEach(__resetFilterIds);

describe('operators are data-type aware (§9)', () => {
  it('never offers a numeric comparison on a select field', () => {
    // Offering `>` on Country produces a rule no adapter can compile, which
    // the user meets as a broken result set rather than a disabled option.
    expect(operatorsFor('select').map((o) => o.value)).not.toContain('gt');
    expect(operatorsFor('number').map((o) => o.value)).toContain('gt');
  });

  it('distinguishes contains-any from contains-all (§10.4)', () => {
    const ops = operatorsFor('multiselect').map((o) => o.value);
    expect(ops).toContain('contains_any');
    expect(ops).toContain('contains_all');
  });

  it('marks value-less operators so no editor renders (§9)', () => {
    const empty = operatorsFor('text').find((o) => o.value === 'is_empty');
    expect(empty?.requiresValue).toBe(false);
  });

  it('defaults the operator only where there is one sensible reading', () => {
    // Boolean has exactly one operator; making the user pick it is ceremony.
    expect(defaultOperatorFor('boolean')).toBe('is');
    expect(defaultOperatorFor('text')).toBeUndefined();
  });
});

describe('tree structure (§5)', () => {
  it('builds nested groups and finds any node by id', () => {
    const inner = createFilterGroup('or', [
      createFilterRule(['country'], { operator: 'is', value: 'BR' }),
      createFilterRule(['country'], { operator: 'is', value: 'MX' }),
    ]);
    const q = createFilterQuery([createFilterRule(['status'], { operator: 'is', value: 'active' }), inner]);
    expect(getFilterNode(q, inner.id)).toBe(inner);
    expect(isFilterGroup(getFilterNode(q, inner.id)!)).toBe(true);
  });

  it('adds a rule into a nested group, not only the root', () => {
    const inner = createFilterGroup('or');
    let q = createFilterQuery([inner]);
    q = addFilterNode(q, createFilterRule(['country'], { operator: 'is', value: 'BR' }), inner.id);
    const found = getFilterNode(q, inner.id) as FilterGroup;
    expect(found.rules).toHaveLength(1);
  });

  it('never removes the root group (§18)', () => {
    const q = createFilterQuery([createFilterRule(['status'])]);
    const after = removeFilterNode(q, q.id);
    expect(after.type).toBe('group');
    expect(after.rules).toHaveLength(0);
  });

  it('prunes an empty nested group but keeps the root (§18)', () => {
    const inner = createFilterGroup('or', [createFilterRule(['country'], { operator: 'is', value: 'BR' })]);
    let q = createFilterQuery([inner]);
    q = removeFilterNode(q, inner.rules[0].id);
    expect(q.rules).toHaveLength(0);
    expect(pruneEmptyGroups(q).type).toBe('group');
  });
});

describe('dependency invalidation when the field changes (§14)', () => {
  it('drops an operator the new field cannot support', () => {
    // Revenue > 1000 becoming Country > 1000 is nonsense, and §14 forbids
    // silently translating it into something plausible.
    let q = createFilterQuery([createFilterRule(['revenue'], { operator: 'gt', value: 1000 })]);
    const id = q.rules[0].id;
    q = changeRuleField(q, id, ['country'], 'select');
    const rule = getFilterNode(q, id)!;
    expect(isFilterRule(rule) && rule.operator).toBeUndefined();
    expect(isFilterRule(rule) && rule.value).toBeUndefined();
  });

  it('keeps an operator that is still valid', () => {
    let q = createFilterQuery([createFilterRule(['status'], { operator: 'is', value: 'active' })]);
    const id = q.rules[0].id;
    q = changeRuleField(q, id, ['country'], 'select');
    const rule = getFilterNode(q, id)!;
    expect(isFilterRule(rule) && rule.operator).toBe('is');
  });

  it('drops the value when the operator changes shape', () => {
    // `between` takes two bounds; `gt` takes one. Carrying the old shape over
    // would compile into a condition the user never expressed.
    let q = createFilterQuery([createFilterRule(['revenue'], { operator: 'between', value: { min: 1, max: 9 } })]);
    const id = q.rules[0].id;
    q = changeRuleOperator(q, id, 'gt', 'number');
    const rule = getFilterNode(q, id)!;
    expect(isFilterRule(rule) && rule.value).toBeUndefined();
  });

  it('drops the value entirely for a value-less operator', () => {
    let q = createFilterQuery([createFilterRule(['notes'], { operator: 'contains', value: 'x' })]);
    const id = q.rules[0].id;
    q = changeRuleOperator(q, id, 'is_empty', 'text');
    const rule = getFilterNode(q, id)!;
    expect(isFilterRule(rule) && rule.value).toBeUndefined();
  });
});

describe('duplicate and negate (§16, §17, §22)', () => {
  it('duplicates a rule adjacent to the original with a NEW id', () => {
    let q = createFilterQuery([createFilterRule(['status'], { operator: 'is', value: 'active' })]);
    const id = q.rules[0].id;
    q = duplicateFilterNode(q, id);
    expect(q.rules).toHaveLength(2);
    expect(q.rules[1].id).not.toBe(id);
    expect(isFilterRule(q.rules[1]) && q.rules[1].value).toBe('active');
  });

  it('deep-clones a group, giving every descendant a fresh id', () => {
    const inner = createFilterGroup('or', [
      createFilterRule(['country'], { operator: 'is', value: 'BR' }),
      createFilterRule(['country'], { operator: 'is', value: 'MX' }),
    ]);
    let q = createFilterQuery([inner]);
    q = duplicateFilterNode(q, inner.id);
    const [a, b] = q.rules as FilterGroup[];
    expect(b.id).not.toBe(a.id);
    expect(b.rules.map((r) => r.id)).not.toEqual(a.rules.map((r) => r.id));
    // Semantics preserved — this is a copy, not a reset.
    expect(b.combinator).toBe('or');
    expect(isFilterRule(b.rules[0]) && b.rules[0].value).toBe('BR');
  });

  it('negates explicitly rather than inverting the operator (§17)', () => {
    let q = createFilterQuery([createFilterRule(['revenue'], { operator: 'gt', value: 1000 })]);
    const id = q.rules[0].id;
    q = negateFilterNode(q, id);
    const rule = getFilterNode(q, id)!;
    // NOT (Revenue > 1000) — the operator is untouched, because assuming
    // every custom operator has a valid inverse is unsafe.
    expect(isFilterRule(rule) && rule.negated).toBe(true);
    expect(isFilterRule(rule) && rule.operator).toBe('gt');
  });
});

describe('combinator and reordering (§20, §23)', () => {
  it('changes a nested group combinator without touching the root', () => {
    const inner = createFilterGroup('and', [createFilterRule(['country'], { operator: 'is', value: 'BR' })]);
    let q = createFilterQuery([inner]);
    q = setGroupCombinator(q, inner.id, 'or');
    expect((getFilterNode(q, inner.id) as FilterGroup).combinator).toBe('or');
    expect(q.combinator).toBe('and');
  });

  it('reorders within a group and refuses to run off either end', () => {
    let q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'a' }),
      createFilterRule(['country'], { operator: 'is', value: 'b' }),
    ]);
    const first = q.rules[0].id;
    q = moveFilterNode(q, first, 1);
    expect(q.rules[1].id).toBe(first);
    const unchanged = moveFilterNode(q, first, 5);
    expect(unchanged.rules[1].id).toBe(first);
  });
});

describe('completeness and counting (§13, §25)', () => {
  it('treats a draft as incomplete without calling it invalid', () => {
    const draft = createFilterRule(['status']);
    expect(isFilterRuleComplete(draft, typeOf)).toBe(false);
    const withOp = { ...draft, operator: 'is' };
    expect(isFilterRuleComplete(withOp, typeOf)).toBe(false); // still no value
    expect(isFilterRuleComplete({ ...withOp, value: 'active' }, typeOf)).toBe(true);
  });

  it('counts a value-less operator as complete', () => {
    const rule = createFilterRule(['notes'], { operator: 'is_empty' });
    expect(isFilterRuleComplete(rule, typeOf)).toBe(true);
  });

  it('counts RULES, not groups — A AND (B OR C) is 3 (§25)', () => {
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'active' }),
      createFilterGroup('or', [
        createFilterRule(['country'], { operator: 'is', value: 'BR' }),
        createFilterRule(['country'], { operator: 'is', value: 'MX' }),
      ]),
    ]);
    expect(countFilterRules(q, typeOf)).toBe(3);
  });

  it('excludes drafts from the count, so the badge is not a lie', () => {
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'active' }),
      createFilterRule(['revenue']), // draft
    ]);
    expect(countFilterRules(q, typeOf)).toBe(1);
    expect(countFilterRules(q, typeOf, { executableOnly: false })).toBe(2);
  });

  it('flattens only the executable rules', () => {
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'active' }),
      createFilterRule(['revenue']),
    ]);
    expect(flattenFilterConditions(q, typeOf)).toHaveLength(1);
  });
});

describe('the critical semantic guard (§24)', () => {
  it('refuses to flatten A AND (B OR C) into a chip row', () => {
    // Three chips read as A AND B AND C — a DIFFERENT query. The basic
    // presentation must route this to the advanced builder rather than
    // misrepresent it.
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'active' }),
      createFilterGroup('or', [
        createFilterRule(['country'], { operator: 'is', value: 'BR' }),
        createFilterRule(['country'], { operator: 'is', value: 'MX' }),
      ]),
    ]);
    expect(isFlattenable(q)).toBe(false);
  });

  it('allows a flat AND of plain rules', () => {
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'active' }),
      createFilterRule(['revenue'], { operator: 'gt', value: 1000 }),
    ]);
    expect(isFlattenable(q)).toBe(true);
  });

  it('refuses a negated rule, which a plain chip cannot express', () => {
    const q = createFilterQuery([
      createFilterRule(['status'], { operator: 'is', value: 'active', negated: true }),
    ]);
    expect(isFlattenable(q)).toBe(false);
  });

  it('refuses an OR root', () => {
    const q = setGroupCombinator(
      createFilterQuery([
        createFilterRule(['status'], { operator: 'is', value: 'a' }),
        createFilterRule(['country'], { operator: 'is', value: 'b' }),
      ]),
      'root',
      'or'
    );
    const or = { ...q, combinator: 'or' as const };
    expect(isFlattenable(or)).toBe(false);
  });
});

describe('immutability', () => {
  it('never mutates the input query', () => {
    const q = createFilterQuery([createFilterRule(['status'], { operator: 'is', value: 'active' })]);
    const snapshot = JSON.stringify(q);
    removeFilterNode(q, q.rules[0].id);
    duplicateFilterNode(q, q.rules[0].id);
    negateFilterNode(q, q.rules[0].id);
    expect(JSON.stringify(q)).toBe(snapshot);
  });

  it('is serializable — no functions, no React, no DOM (§5.1)', () => {
    const q = createFilterQuery([
      createFilterRule(['revenue'], { operator: 'between', value: { min: 1, max: 9 } }),
      createFilterGroup('or', [createFilterRule(['country'], { operator: 'is', value: 'BR' })]),
    ]);
    expect(JSON.parse(JSON.stringify(q))).toEqual(q);
  });
});

describe('operator validity helper', () => {
  it('reports compatibility per type', () => {
    expect(isOperatorValidFor('number', 'gt')).toBe(true);
    expect(isOperatorValidFor('select', 'gt')).toBe(false);
  });
});
