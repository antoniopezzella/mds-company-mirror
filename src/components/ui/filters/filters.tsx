"use client"

import * as React from 'react';
import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Button } from '../button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { FiltersFieldPicker } from './filters-field-picker';
import { FiltersRule } from './filters-rule';
import {
  addFilterNode,
  countFilterRules,
  createFilterQuery,
  createFilterRule,
  changeRuleField,
  changeRuleOperator,
  duplicateFilterNode,
  isFlattenable,
  negateFilterNode,
  removeFilterNode,
  updateFilterRule,
} from './filters-query';
import { defaultOperatorFor } from './filters-operators';
import { fieldTypeAt, type FilterField } from './filters-schema';
import { isFilterRule, type FilterQuery, type FilterQueryChangeMeta, type FilterRule } from './filters-types';

/**
 * The filter bar — §4.1, §51.
 *
 * The empty state is a single `+ Add filter`. Nothing else: §51 is explicit
 * that a decorative empty container adding no information is worse than
 * nothing, and a toolbar that reserves space for filters nobody has set just
 * pushes the data down.
 *
 * Conditions render as segmented button groups, not pills — see
 * `filters-rule.tsx`.
 */

export interface FiltersProps {
  fields: FilterField[];
  /** Controlled (§32). Supplying this makes the component follow it exactly. */
  query?: FilterQuery;
  /** Uncontrolled starting point (§33). */
  defaultQuery?: FilterQuery;
  onQueryChange?: (query: FilterQuery, meta: FilterQueryChangeMeta) => void;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  /**
   * Opens the advanced builder (§21). Supplying this turns §24's refusal into
   * a ROUTE: "cannot be edited here" is only a fair thing to say when there is
   * a here it can be edited. Without it the bar states the limitation and
   * leaves the query intact, which is still better than flattening it.
   */
  onEditAdvanced?: () => void;
  messages?: Partial<{
    addFilter: string;
    clearAll: string;
    filters: string;
    advancedOnly: string;
    editAdvanced: string;
  }>;
}

const DEFAULTS = {
  addFilter: 'Add filter',
  clearAll: 'Clear all',
  filters: 'Filters',
  advancedOnly:
    'This query uses grouping or OR logic and cannot be edited here without changing its meaning.',
  editAdvanced: 'Edit in advanced builder',
};

export function Filters({
  fields,
  query: controlled,
  defaultQuery,
  onQueryChange,
  size = 'sm',
  readOnly = false,
  disabled = false,
  className,
  onEditAdvanced,
  messages,
}: FiltersProps) {
  const t = { ...DEFAULTS, ...messages };
  const [internal, setInternal] = React.useState<FilterQuery>(() => defaultQuery ?? createFilterQuery());
  const [adding, setAdding] = React.useState(false);
  const addRef = React.useRef<HTMLButtonElement>(null);
  const liveRef = React.useRef<HTMLDivElement>(null);

  // Controlled when `query` is supplied — and then there is NO competing
  // internal copy, which §32 requires: two sources of truth diverge the first
  // time a parent rejects a change.
  const isControlled = controlled !== undefined;
  const query = isControlled ? controlled : internal;

  const typeOf = React.useCallback((path: string[]) => fieldTypeAt(fields, path), [fields]);
  const count = countFilterRules(query, typeOf);
  const flat = isFlattenable(query);

  /** Announces structural changes politely (§47.4). */
  const announce = (text: string) => {
    if (liveRef.current) liveRef.current.textContent = text;
  };

  const commit = (next: FilterQuery, meta: FilterQueryChangeMeta) => {
    if (!isControlled) setInternal(next);
    onQueryChange?.(next, meta);
  };

  const addField = (path: string[]) => {
    const type = typeOf(path);
    const rule = createFilterRule(path, {
      // Pre-select the operator only where there is one sensible reading,
      // so a boolean does not make the user pick from a list of one.
      operator: type ? defaultOperatorFor(type) : undefined,
    });
    commit(addFilterNode(query, rule), { reason: 'add', nodeId: rule.id, fieldPath: path });
    announce(`Filter added: ${path[path.length - 1]}.`);
    setAdding(false);
  };

  const rules = query.rules.filter(isFilterRule) as FilterRule[];

  return (
    <div
      data-slot="filters"
      className={cn('flex flex-wrap items-center gap-2', className)}
      aria-label={t.filters}
    >
      {/* Polite, not assertive: a filter change is worth knowing about but
          must not interrupt what the user is typing (§47.4). */}
      <div ref={liveRef} role="status" aria-live="polite" className="sr-only" />

      {!flat && (
        <>
          <p className="text-sm" style={{ color: getRoleColor('text.secondary') }}>
            {/* §24's critical rule: rendering A AND (B OR C) as three chips
                would read as A AND B AND C — a different query. Rather than
                flatten and lie, say so and hand it to the advanced builder. */}
            {t.advancedOnly}
          </p>
          {onEditAdvanced && !readOnly && (
            <Button variant="outline" size={size} disabled={disabled} onClick={onEditAdvanced}>
              {t.editAdvanced}
            </Button>
          )}
        </>
      )}

      {flat &&
        rules.map((rule) => (
          <FiltersRule
            key={rule.id}
            rule={rule}
            fields={fields}
            size={size}
            readOnly={readOnly}
            disabled={disabled}
            onChangeField={(path) => {
              const type = typeOf(path);
              commit(changeRuleField(query, rule.id, path, type ?? 'text'), {
                reason: 'update',
                nodeId: rule.id,
                fieldPath: path,
              });
            }}
            onChangeOperator={(operator) => {
              const type = typeOf(rule.path);
              commit(changeRuleOperator(query, rule.id, operator, type ?? 'text'), {
                reason: 'update',
                nodeId: rule.id,
                fieldPath: rule.path,
              });
            }}
            onChangeValue={(value) => {
              commit(updateFilterRule(query, rule.id, { value: value as never }), {
                reason: 'update',
                nodeId: rule.id,
                fieldPath: rule.path,
              });
            }}
            onDuplicate={() => {
              commit(duplicateFilterNode(query, rule.id), { reason: 'duplicate', nodeId: rule.id });
              announce('Filter duplicated.');
            }}
            onNegate={() => {
              commit(negateFilterNode(query, rule.id), { reason: 'negate', nodeId: rule.id });
            }}
            onRemove={() => {
              commit(removeFilterNode(query, rule.id), { reason: 'remove', nodeId: rule.id });
              announce('Filter removed.');
              // Focus lands somewhere predictable rather than on <body> (§47.5).
              requestAnimationFrame(() => addRef.current?.focus());
            }}
          />
        ))}

      {!readOnly && (
        <Popover open={adding} onOpenChange={setAdding}>
          <PopoverTrigger asChild disabled={disabled}>
            <Button ref={addRef} variant="outline" size={size} className="border-dashed">
              <Plus className="size-3.5" aria-hidden="true" />
              {t.addFilter}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-2" aria-label={t.addFilter}>
            <FiltersFieldPicker fields={fields} onSelect={addField} onClose={() => setAdding(false)} />
          </PopoverContent>
        </Popover>
      )}

      {count > 0 && !readOnly && (
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
  );
}
