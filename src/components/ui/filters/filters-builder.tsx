"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Button } from '@/components/ui/button';
import { FiltersGroup, type FiltersGroupMessages } from './filters-group';
import type { FiltersRuleProps } from './filters-rule';
import type { FiltersValueEditorProps } from './filters-value-editor';
import {
  addFilterNode,
  canUngroupFilterNode,
  changeRuleField,
  changeRuleOperator,
  countFilterRules,
  createFilterGroup,
  createFilterQuery,
  createFilterRule,
  duplicateFilterNode,
  negateFilterNode,
  removeFilterNode,
  setGroupCombinator,
  ungroupFilterNode,
  updateFilterRule,
  wrapFilterNodeInGroup,
} from './filters-query';
import { defaultOperatorFor, findOperator } from './filters-operators';
import { fieldPathLabel, fieldTypeAt, type FilterField } from './filters-schema';
import type { FilterQuery, FilterQueryChangeMeta } from './filters-types';

/**
 * The advanced builder — §21, §22.
 *
 * This is where the flat bar's §24 refusal lands. The bar declines to edit
 * `A AND (B OR C)` because three chips in a row read as `A AND B AND C`; that
 * refusal is only honest if somewhere can actually edit it. This is that
 * somewhere, and it is the same query model — not a second representation that
 * has to be kept in sync.
 *
 * Depth is BOUNDED and the bound is visible (§22): indentation runs out of
 * horizontal room around four levels, and past that the query stops being
 * readable, which defeats the purpose of showing it as a tree at all. So "Add
 * group" disables at the limit and carries the reason, rather than silently
 * doing nothing.
 */

export interface FiltersBuilderProps {
  fields: FilterField[];
  /** Controlled (§32). */
  query?: FilterQuery;
  /** Uncontrolled starting point (§33). */
  defaultQuery?: FilterQuery;
  onQueryChange?: (query: FilterQuery, meta: FilterQueryChangeMeta) => void;
  /** Nesting levels allowed, root included. Default 3. */
  maxDepth?: number;
  /**
   * Custom value editors, keyed by a field's `editor` name (§11).
   *
   * The mechanism existed in `FiltersValueEditor` and was unreachable: no
   * component threaded it, so `field.editor` was inert unless a consumer
   * bypassed the whole component and rendered the editor themselves.
   */
  editors?: Record<string, React.ComponentType<FiltersValueEditorProps>>;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  messages?: Partial<
    FiltersGroupMessages &
      NonNullable<FiltersRuleProps['messages']> & {
      clearAll: string;
      summaryOne: string;
      /** `{count}` is substituted. */
      summaryMany: string;
      builder: string;
    }
  >;
}

const DEFAULTS = {
  clearAll: 'Clear all',
  summaryOne: '1 condition',
  summaryMany: '{count} conditions',
  builder: 'Advanced filters',
};

export function FiltersBuilder({
  fields,
  query: controlled,
  defaultQuery,
  onQueryChange,
  maxDepth = 3,
  editors,
  size = 'sm',
  readOnly = false,
  disabled = false,
  className,
  messages,
}: FiltersBuilderProps) {
  const t = { ...DEFAULTS, ...messages };
  const [internal, setInternal] = React.useState<FilterQuery>(
    () => defaultQuery ?? createFilterQuery()
  );
  const liveRef = React.useRef<HTMLDivElement>(null);
  /** "Clear all" unmounts itself, so focus needs somewhere to land. */
  const rootAddRef = React.useRef<HTMLButtonElement>(null);

  const isControlled = controlled !== undefined;
  const query = isControlled ? controlled : internal;

  const typeOf = React.useCallback((path: string[]) => fieldTypeAt(fields, path), [fields]);
  const count = countFilterRules(query, typeOf);

  const announce = (text: string) => {
    if (liveRef.current) liveRef.current.textContent = text;
  };

  const commit = (next: FilterQuery, meta: FilterQueryChangeMeta) => {
    if (!isControlled) setInternal(next);
    onQueryChange?.(next, meta);
  };

  const handlers = {
    onAddRule: (groupId: string, path: string[]) => {
      const type = typeOf(path);
      const rule = createFilterRule(path, {
        operator: type ? defaultOperatorFor(type) : undefined,
      });
      commit(addFilterNode(query, rule, groupId), {
        reason: 'add',
        nodeId: rule.id,
        fieldPath: path,
      });
      // The label, not the raw id — this said "Condition added: status."
      announce(`Condition added: ${fieldPathLabel(fields, path)}.`);
    },

    onAddGroup: (groupId: string) => {
      // An OR group by default: a new AND group inside an AND parent means
      // exactly what the parent already meant, so it would be structure with
      // no effect — the reason to nest at all is to change the combinator.
      const group = createFilterGroup('or');
      commit(addFilterNode(query, group, groupId), { reason: 'group-add', nodeId: group.id });
      announce('Group added.');
    },

    onSetCombinator: (groupId: string, combinator: 'and' | 'or') => {
      commit(setGroupCombinator(query, groupId, combinator), {
        reason: 'combinator',
        nodeId: groupId,
      });
      announce(combinator === 'and' ? 'Matching all conditions.' : 'Matching any condition.');
    },

    onRemoveNode: (id: string) => {
      commit(removeFilterNode(query, id), { reason: 'remove', nodeId: id });
      announce('Removed.');
    },

    onDuplicateNode: (id: string) => {
      commit(duplicateFilterNode(query, id), { reason: 'duplicate', nodeId: id });
      announce('Duplicated.');
    },

    onNegateNode: (id: string) => {
      commit(negateFilterNode(query, id), { reason: 'negate', nodeId: id });
      announce('Negation toggled.');
    },

    onUngroup: (id: string) => {
      commit(ungroupFilterNode(query, id), { reason: 'group-remove', nodeId: id });
      announce('Group dissolved.');
    },

    onWrapInGroup: (id: string) => {
      commit(wrapFilterNodeInGroup(query, id, 'or'), { reason: 'group-add', nodeId: id });
      announce('Condition moved into a new group.');
    },

    onChangeField: (id: string, path: string[]) => {
      const type = typeOf(path);
      commit(changeRuleField(query, id, path, type ?? 'text'), {
        reason: 'update',
        nodeId: id,
        fieldPath: path,
      });
    },

    onChangeOperator: (id: string, operator: string) => {
      // The rule's own path decides which operator set applies, so this reads
      // the tree rather than trusting the caller to pass a type.
      const rule = findRulePath(query, id);
      const type = rule ? typeOf(rule) : undefined;
      commit(changeRuleOperator(query, id, operator, type ?? 'text'), {
        reason: 'update',
        nodeId: id,
        fieldPath: rule,
      });
      if (rule) {
        announce(
          `${fieldPathLabel(fields, rule)} condition changed to ${
            findOperator(type ?? 'text', operator)?.label ?? operator
          }.`
        );
      }
    },

    onChangeValue: (id: string, value: unknown) => {
      commit(updateFilterRule(query, id, { value: value as never }), {
        reason: 'update',
        nodeId: id,
      });
    },

    canUngroup: (id: string) => canUngroupFilterNode(query, id),
  };

  return (
    <div
      data-slot="filters-builder"
      className={cn('flex flex-col gap-3', className)}
      // `role` is required for the label to exist at all: the implicit role
      // of a bare div is `generic`, which prohibits naming, so assistive tech
      // skipped this region entirely and nothing announced that a filter area
      // was present. axe does not flag it.
      //
      // `search` rather than `group`, matching `FilterBar`: this IS a filter
      // region, and `group` collided with the `role="group"` each condition
      // already uses, which would have made "find the conditions" ambiguous
      // for both tests and screen readers. Each instance needs a DISTINCT
      // label or axe's landmark-unique rule fires.
      role="search"
      aria-label={t.builder}
    >
      <div ref={liveRef} role="status" aria-live="polite" className="sr-only" />

      <FiltersGroup
        {...handlers}
        group={query}
        fields={fields}
        addRef={rootAddRef}
        depth={1}
        maxDepth={maxDepth}
        isRoot
        editors={editors}
        size={size}
        readOnly={readOnly}
        disabled={disabled}
        messages={messages}
      />

      {count > 0 && (
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm" style={{ color: getRoleColor('text.secondary') }}>
            {/* Counts executable RULES, not groups: the group is structure,
                and a user who set three conditions expects to be told 3 (§25). */}
            {count === 1 ? t.summaryOne : t.summaryMany.replace('{count}', String(count))}
          </p>
          {!readOnly && (
            <Button
              variant="tertiary"
              size={size}
              disabled={disabled}
              onClick={() => {
                commit(createFilterQuery(), { reason: 'clear' });
                announce('All filters cleared.');
                requestAnimationFrame(() => rootAddRef.current?.focus());
              }}
            >
              {t.clearAll}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

/** The field path of one rule, wherever it sits in the tree. */
function findRulePath(query: FilterQuery, id: string): string[] | undefined {
  for (const node of query.rules) {
    if (node.id === id && node.type === 'rule') return node.path;
    if (node.type === 'group') {
      const found = findRulePath(node, id);
      if (found) return found;
    }
  }
  return undefined;
}
