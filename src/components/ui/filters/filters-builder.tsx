"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Button } from '../button';
import { FiltersGroup, type FiltersGroupMessages } from './filters-group';
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
import { defaultOperatorFor } from './filters-operators';
import { fieldTypeAt, type FilterField } from './filters-schema';
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
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  messages?: Partial<
    FiltersGroupMessages & {
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
      announce(`Condition added: ${path[path.length - 1]}.`);
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
      aria-label={t.builder}
    >
      <div ref={liveRef} role="status" aria-live="polite" className="sr-only" />

      <FiltersGroup
        {...handlers}
        group={query}
        fields={fields}
        depth={1}
        maxDepth={maxDepth}
        isRoot
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
