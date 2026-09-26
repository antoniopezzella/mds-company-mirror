"use client"

import * as React from 'react';
import { ChevronDown, FolderPlus, MoreVertical, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Button } from '../button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown-menu';
import { FiltersFieldPicker } from './filters-field-picker';
import { FiltersRule } from './filters-rule';
import type { FilterField } from './filters-schema';
import { isFilterGroup, type FilterGroup } from './filters-types';

/**
 * One level of the query tree — §21, §22.
 *
 * Recursive, because the model is a tree and any presentation that is not
 * recursive can only render a subset of what the model can hold. That is
 * exactly the trap the basic bar declines to fall into (§24): it refuses to
 * flatten, and this is where it refuses TO.
 *
 * The combinator belongs to the GROUP, not to each row
 * -----------------------------------------------------
 * A per-row And/Or dropdown is the common design and it is a lie about this
 * model: it invites setting row 2 to OR and row 3 to AND inside one group,
 * which has no single meaning — is it `(A OR B) AND C` or `A OR (B AND C)`?
 * So the control appears ONCE, on the second row, where the relationship it
 * describes first exists. Row 1 reads "Where". Rows 3+ repeat the word in
 * muted text, so the group reads correctly top to bottom without pretending
 * each row is independently switchable.
 */

export interface FiltersGroupMessages {
  where: string;
  and: string;
  or: string;
  addCondition: string;
  addGroup: string;
  removeGroup: string;
  duplicateGroup: string;
  negateGroup: string;
  ungroup: string;
  groupActions: string;
  combinator: string;
  depthLimit: string;
  ungroupUnsafe: string;
  not: string;
  empty: string;
}

export const FILTERS_GROUP_MESSAGES: FiltersGroupMessages = {
  where: 'Where',
  and: 'And',
  or: 'Or',
  addCondition: 'Add condition',
  addGroup: 'Add group',
  removeGroup: 'Remove group',
  duplicateGroup: 'Duplicate group',
  negateGroup: 'Negate group',
  ungroup: 'Ungroup',
  groupActions: 'Group actions',
  combinator: 'How these conditions combine',
  depthLimit: 'Groups cannot be nested any deeper.',
  ungroupUnsafe: 'Ungrouping would change what this query means.',
  not: 'NOT',
  empty: 'No conditions yet.',
};

export interface FiltersGroupHandlers {
  onAddRule: (groupId: string, path: string[]) => void;
  onAddGroup: (groupId: string) => void;
  onSetCombinator: (groupId: string, combinator: 'and' | 'or') => void;
  onRemoveNode: (id: string) => void;
  onDuplicateNode: (id: string) => void;
  onNegateNode: (id: string) => void;
  onUngroup: (id: string) => void;
  onWrapInGroup: (id: string) => void;
  onChangeField: (id: string, path: string[]) => void;
  onChangeOperator: (id: string, operator: string) => void;
  onChangeValue: (id: string, value: unknown) => void;
  /** Ungroup is hidden, not broken, where it would rewrite the query (§24). */
  canUngroup: (id: string) => boolean;
}

export interface FiltersGroupProps extends FiltersGroupHandlers {
  group: FilterGroup;
  fields: FilterField[];
  /** 1 for the root. */
  depth: number;
  maxDepth: number;
  isRoot?: boolean;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  disabled?: boolean;
  messages?: Partial<FiltersGroupMessages>;
}

export function FiltersGroup({
  group,
  fields,
  depth,
  maxDepth,
  isRoot = false,
  size = 'sm',
  readOnly = false,
  disabled = false,
  messages,
  ...h
}: FiltersGroupProps) {
  const t = { ...FILTERS_GROUP_MESSAGES, ...messages };
  const [addingTo, setAddingTo] = React.useState(false);
  const inert = readOnly || disabled;

  const word = group.combinator === 'and' ? t.and : t.or;
  // Screen readers get the relationship spelled out, because the visual
  // version of it is a word in a rail they cannot see the alignment of.
  const groupLabel = [
    group.negated ? t.not : null,
    group.combinator === 'and' ? 'All of the following' : 'Any of the following',
  ]
    .filter(Boolean)
    .join(' ');

  const atLimit = depth >= maxDepth;

  return (
    <div
      data-slot="filters-group"
      data-combinator={group.combinator}
      data-depth={depth}
      role="group"
      aria-label={groupLabel}
      className={cn(
        'flex flex-col gap-2',
        // A nested group is a visible container, because the whole point of
        // the nesting is that the reader can see where the OR stops.
        !isRoot && 'rounded-lg border p-3'
      )}
      style={
        isRoot
          ? undefined
          : {
              borderColor: group.negated
                ? getRoleColor('status.danger.border')
                : getRoleColor('border.subtle'),
              backgroundColor: getRoleColor('surface.subtle'),
            }
      }
    >
      {group.negated && !isRoot && (
        <p
          className="text-xs font-semibold tracking-wide"
          style={{ color: getRoleColor('status.danger.fg') }}
        >
          {t.not}
        </p>
      )}

      {group.rules.length === 0 && (
        <p className="text-sm" style={{ color: getRoleColor('text.secondary') }}>
          {t.empty}
        </p>
      )}

      {group.rules.map((node, index) => (
        <div key={node.id} className="flex items-start gap-2">
          {/* The rail. Fixed width so every row's content starts on the same
              vertical line — a ragged left edge makes a nested query much
              harder to read than the nesting itself does. */}
          <div className="w-20 shrink-0 pt-1">
            {index === 0 ? (
              <span className="text-sm" style={{ color: getRoleColor('text.secondary') }}>
                {t.where}
              </span>
            ) : index === 1 && !inert ? (
              <CombinatorControl
                combinator={group.combinator}
                onChange={(c) => h.onSetCombinator(group.id, c)}
                label={t.combinator}
                andLabel={t.and}
                orLabel={t.or}
              />
            ) : (
              // Repeated as text, not as another control: the combinator is
              // one property of the group, and three dropdowns showing the
              // same value would imply three independent choices.
              <span
                className="text-sm"
                style={{ color: getRoleColor('text.secondary') }}
                aria-hidden="true"
              >
                {word}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            {isFilterGroup(node) ? (
              <FiltersGroup
                {...h}
                group={node}
                fields={fields}
                depth={depth + 1}
                maxDepth={maxDepth}
                size={size}
                readOnly={readOnly}
                disabled={disabled}
                messages={messages}
              />
            ) : (
              <FiltersRule
                rule={node}
                fields={fields}
                size={size}
                readOnly={readOnly}
                disabled={disabled}
                onChangeField={(path) => h.onChangeField(node.id, path)}
                onChangeOperator={(op) => h.onChangeOperator(node.id, op)}
                onChangeValue={(v) => h.onChangeValue(node.id, v)}
                onDuplicate={() => h.onDuplicateNode(node.id)}
                onNegate={() => h.onNegateNode(node.id)}
                onGroup={atLimit ? undefined : () => h.onWrapInGroup(node.id)}
                onRemove={() => h.onRemoveNode(node.id)}
              />
            )}
          </div>
        </div>
      ))}

      {!inert && (
        <div className={cn('flex items-center gap-2', !isRoot ? 'ps-0' : 'ps-20')}>
          <Popover open={addingTo} onOpenChange={setAddingTo}>
            <PopoverTrigger asChild>
              <Button variant="tertiary" size={size}>
                <Plus className="size-3.5" aria-hidden="true" />
                {t.addCondition}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-2" aria-label={t.addCondition}>
              <FiltersFieldPicker
                fields={fields}
                onSelect={(path) => {
                  h.onAddRule(group.id, path);
                  setAddingTo(false);
                }}
                onClose={() => setAddingTo(false)}
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="tertiary"
            size={size}
            disabled={atLimit}
            onClick={() => h.onAddGroup(group.id)}
            // Disabled controls need a reason attached, or the user concludes
            // the feature is broken rather than bounded (§22).
            title={atLimit ? t.depthLimit : undefined}
            aria-describedby={atLimit ? `depth-${group.id}` : undefined}
          >
            <FolderPlus className="size-3.5" aria-hidden="true" />
            {t.addGroup}
          </Button>

          {atLimit && (
            <span id={`depth-${group.id}`} className="sr-only">
              {t.depthLimit}
            </span>
          )}

          {!isRoot && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* `icon`, not children: Button's iconOnly branch renders
                    `icon ?? startIcon ?? endIcon` and DISCARDS children. */}
                <Button
                  variant="tertiary"
                  size={size}
                  iconOnly
                  icon={<MoreVertical className="size-3.5" aria-hidden="true" />}
                  aria-label={t.groupActions}
                  // Pushed to the group's own right edge. Sitting next to
                  // "Add group" it read as a third add-action, which is a bad
                  // thing to be ambiguous about when "Remove group" is behind
                  // it — at the opposite edge it belongs to the container.
                  className="ms-auto"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-44">
                <DropdownMenuItem onSelect={() => h.onDuplicateNode(group.id)}>
                  {t.duplicateGroup}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => h.onNegateNode(group.id)}>
                  {t.negateGroup}
                </DropdownMenuItem>
                {h.canUngroup(group.id) && (
                  <DropdownMenuItem onSelect={() => h.onUngroup(group.id)}>
                    {t.ungroup}
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => h.onRemoveNode(group.id)}
                  style={{ color: getRoleColor('status.danger.fg') }}
                >
                  {t.removeGroup}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * And / Or for one group.
 *
 * A dropdown rather than a segmented toggle, matching the operator segment in
 * a rule: both answer "which of these words goes here", and using two idioms
 * for the same kind of choice makes the builder read as two designs.
 */
function CombinatorControl({
  combinator,
  onChange,
  label,
  andLabel,
  orLabel,
}: {
  combinator: 'and' | 'or';
  onChange: (c: 'and' | 'or') => void;
  label: string;
  andLabel: string;
  orLabel: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" aria-label={label} className="w-full justify-between">
          {combinator === 'and' ? andLabel : orLabel}
          <ChevronDown className="size-3 opacity-60" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-28">
        <DropdownMenuItem onSelect={() => onChange('and')}>{andLabel}</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onChange('or')}>{orLabel}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
