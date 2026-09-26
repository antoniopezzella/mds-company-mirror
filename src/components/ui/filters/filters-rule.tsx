"use client"

import * as React from 'react';
import { ChevronDown, MoreVertical, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Button } from '../button';
import { ButtonGroup } from '../button-group';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown-menu';
import { FiltersFieldPicker } from './filters-field-picker';
import { FiltersValueEditor } from './filters-value-editor';
import { findOperator, operatorsFor } from './filters-operators';
import { fieldPathLabel, getFilterField, type FilterField } from './filters-schema';
import { describeRuleValue } from './filters-describe';
import type { FilterRule } from './filters-types';

/**
 * One condition, as a SEGMENTED BUTTON GROUP — §3, §14.
 *
 *     [ Status │ is │ Active │ × ]
 *
 * Not a pill. Each segment is an independently editable control sharing one
 * outline, which is what makes the model visible: clicking the field edits
 * the field, the operator edits the operator, the value edits the value. A
 * single chip reading "Status: 2 selected" cannot offer that, and hiding the
 * operator behind a colon is why the earlier version could not express
 * "is not" or "is any of" at all.
 *
 * Built on `ButtonGroup` rather than a hand-rolled row so the segments share
 * this system's joined-border treatment and one cascaded size.
 */

export interface FiltersRuleProps {
  rule: FilterRule;
  fields: FilterField[];
  onChangeField: (path: string[]) => void;
  onChangeOperator: (operator: string) => void;
  onChangeValue: (value: unknown) => void;
  onRemove: () => void;
  onDuplicate?: () => void;
  onNegate?: () => void;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  disabled?: boolean;
  /** Copy (§53). */
  messages?: Partial<{
    selectCondition: string;
    selectValue: string;
    remove: string;
    duplicate: string;
    negate: string;
    more: string;
    not: string;
  }>;
}

const DEFAULTS = {
  selectCondition: 'Select condition',
  selectValue: 'Select value',
  remove: 'Remove',
  duplicate: 'Duplicate',
  negate: 'Negate',
  more: 'More actions',
  not: 'NOT',
};

export function FiltersRule({
  rule,
  fields,
  onChangeField,
  onChangeOperator,
  onChangeValue,
  onRemove,
  onDuplicate,
  onNegate,
  size = 'sm',
  readOnly = false,
  disabled = false,
  messages,
}: FiltersRuleProps) {
  const t = { ...DEFAULTS, ...messages };
  const [fieldOpen, setFieldOpen] = React.useState(false);
  const [valueOpen, setValueOpen] = React.useState(false);

  const field = getFilterField(fields, rule.path);
  const label = field ? fieldPathLabel(fields, rule.path) : rule.path.join(' › ');
  const operators = field ? (field.operators ?? operatorsFor(field.type)) : [];
  const operatorDef = field ? findOperator(field.type, rule.operator) : undefined;
  const needsValue = operatorDef?.requiresValue ?? false;

  const inert = readOnly || disabled;
  // A whole-rule accessible name, so the group announces as one condition
  // rather than three unrelated buttons.
  const summary = [
    rule.negated ? t.not : null,
    label,
    operatorDef?.label,
    needsValue ? describeRuleValue(rule, field) : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ButtonGroup
      size={size}
      role="group"
      aria-label={summary}
      data-slot="filters-rule"
      data-incomplete={!operatorDef || (needsValue && rule.value === undefined) || undefined}
      className={cn(inert && 'opacity-70')}
    >
      {rule.negated && (
        <Button
          variant="outline"
          disabled={inert}
          onClick={onNegate}
          aria-label={`${t.negate} ${label}`}
          className="font-semibold"
          style={{ color: getRoleColor('status.danger.fg') }}
        >
          {t.not}
        </Button>
      )}

      {/* FIELD */}
      <Popover open={fieldOpen} onOpenChange={setFieldOpen}>
        <PopoverTrigger asChild disabled={inert}>
          <Button variant="outline" aria-label={`Field: ${label}`}>
            {label}
            <ChevronDown className="size-3 opacity-60" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-2" aria-label="Choose a field">
          <FiltersFieldPicker
            fields={fields}
            onSelect={(path) => {
              onChangeField(path);
              setFieldOpen(false);
            }}
            onClose={() => setFieldOpen(false)}
          />
        </PopoverContent>
      </Popover>

      {/* OPERATOR */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={inert || !field}>
          <Button
            variant="outline"
            aria-label={operatorDef ? `Condition: ${operatorDef.label}` : t.selectCondition}
            // A draft reads as unfinished, not as an error — §13 is explicit
            // that alarming styling on a half-built rule is hostile.
            style={operatorDef ? undefined : { color: getRoleColor('text.secondary') }}
          >
            {operatorDef?.label ?? t.selectCondition}
            <ChevronDown className="size-3 opacity-60" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-44">
          {operators.map((op) => (
            <DropdownMenuItem key={op.value} onSelect={() => onChangeOperator(op.value)}>
              {op.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* VALUE — omitted entirely for a value-less operator (§9). */}
      {needsValue && field && (
        <Popover open={valueOpen} onOpenChange={setValueOpen}>
          <PopoverTrigger asChild disabled={inert}>
            <Button
              variant="outline"
              aria-label={
                rule.value === undefined ? t.selectValue : `Value: ${describeRuleValue(rule, field)}`
              }
              style={rule.value === undefined ? { color: getRoleColor('text.secondary') } : undefined}
              className="max-w-48"
            >
              <span className="truncate">
                {rule.value === undefined ? t.selectValue : describeRuleValue(rule, field)}
              </span>
              <ChevronDown className="size-3 shrink-0 opacity-60" aria-hidden="true" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-2" aria-label={`Value for ${label}`}>
            <FiltersValueEditor
              field={field}
              operator={operatorDef}
              value={rule.value}
              onChange={(v) => onChangeValue(v)}
              onDone={() => setValueOpen(false)}
            />
          </PopoverContent>
        </Popover>
      )}

      {/* ACTIONS */}
      {!inert && (onDuplicate || onNegate) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* `icon`, not children: Button's iconOnly branch renders
                `icon ?? startIcon ?? endIcon` and DISCARDS children, so an
                icon passed as a child renders an empty box with no error. */}
            <Button
              variant="outline"
              iconOnly
              icon={<MoreVertical className="size-3.5" aria-hidden="true" />}
              aria-label={`${t.more} for ${label}`}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-36">
            {onDuplicate && <DropdownMenuItem onSelect={onDuplicate}>{t.duplicate}</DropdownMenuItem>}
            {onNegate && <DropdownMenuItem onSelect={onNegate}>{t.negate}</DropdownMenuItem>}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onRemove} style={{ color: getRoleColor('status.danger.fg') }}>
              {t.remove}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {!inert && (
        <Button
          variant="outline"
          iconOnly
          icon={<X className="size-3.5" aria-hidden="true" />}
          onClick={onRemove}
          // Named for the condition it clears — eight buttons all called
          // "Remove" tell a screen-reader user nothing (§47.3).
          aria-label={`${t.remove} ${label} filter`}
        />
      )}
    </ButtonGroup>
  );
}
