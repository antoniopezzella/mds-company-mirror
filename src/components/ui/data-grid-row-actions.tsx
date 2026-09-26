"use client"

import * as React from 'react';
import type { RowData } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';

import { Button } from './button';
import { Modal } from './dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { getRoleColor } from '@/theme/roles';
import type { DataGridColumnDef } from './data-grid-features';

/**
 * Per-row actions — §11.
 *
 * Most of that section is about restraint rather than capability: do not
 * overload every row with visible buttons, promote at most one common action,
 * move the rest into overflow, separate destructive ones. A column of five
 * buttons per row turns a table into a control panel and makes the data
 * — the reason the table exists — the least prominent thing in it.
 *
 * Shape: an optional `primary` action rendered as a button, everything else
 * behind one overflow menu.
 *
 * Three things that are easy to get wrong here
 * --------------------------------------------
 * - **Names must identify the ROW.** Forty buttons all called "More actions"
 *   are useless to a screen-reader user, which is the same defect the
 *   selection checkboxes had ("Select row 3"). `getRowLabel` is the fix, and
 *   the reason it is not optional in practice.
 * - **Row click must not fire.** `onRowClick` already ignores clicks from
 *   interactive elements — `data-grid-edges.test.tsx` pins that — but this
 *   column is exactly the case that breaks it if the markup drifts, so it has
 *   its own test here too.
 * - **Destructive means confirm, not just colour.** Same rule as bulk
 *   actions, and the same vocabulary (`destructive`, `confirm`,
 *   `confirmTitle`…) so a consumer learns it once.
 */

export interface RowAction<TData> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  /** Danger treatment AND a confirmation step. Colour alone is not a safeguard. */
  destructive?: boolean;
  /** Confirmation without the danger treatment, for heavy but non-destructive actions. */
  confirm?: boolean;
  confirmTitle?: string;
  confirmDescription?: string;
  confirmLabel?: string;
  /** Not permitted, or not applicable to this row. */
  disabled?: boolean | ((row: TData) => boolean);
  /** Why. Surfaced as a title, so the reason is discoverable rather than guessed. */
  disabledReason?: string;
  /**
   * Hides the action entirely for this row.
   *
   * Separate from `disabled` because §31 asks for the distinction: "not
   * permitted" and "not available in this state" are different messages, and
   * which one to show is a product decision, not a component default.
   */
  hidden?: (row: TData) => boolean;
  onAction: (row: TData) => void;
}

export interface ActionsColumnOptions<TData> {
  /**
   * Names each control after its record — "Edit Commercial Auto", "More
   * actions for Commercial Auto".
   *
   * Without it every row's menu is called the same thing, which is the
   * positional-name defect in a different place.
   */
  getRowLabel?: (row: TData) => string;
  /**
   * The one action worth a visible button. §11: promote a single common
   * action, not five.
   */
  primary?: Omit<RowAction<TData>, 'id'> & { id?: string };
  /** Everything else, behind the overflow menu. */
  actions?: RowAction<TData>[];
  /** Column header text. Empty by default — a header over icon buttons is noise. */
  header?: string;
}

function isDisabled<TData>(action: RowAction<TData> | undefined, row: TData) {
  if (!action) return false;
  return typeof action.disabled === 'function' ? action.disabled(row) : !!action.disabled;
}

/**
 * The confirmation, shared in behaviour with bulk actions: `destructive`
 * implies it, the confirm button names the action rather than saying
 * "Confirm", and the description states what will happen.
 */
function ActionConfirm<TData>({
  action,
  row,
  label,
  onClose,
}: {
  action: RowAction<TData>;
  row: TData;
  label: string;
  onClose: () => void;
}) {
  return (
    <Modal
      open
      onClose={onClose}
      size="sm"
      title={action.confirmTitle ?? `${action.label} ${label}?`}
      description={
        action.confirmDescription ??
        (action.destructive ? 'This cannot be undone.' : `This applies to ${label}.`)
      }
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            tone={action.destructive ? 'danger' : 'default'}
            size="sm"
            onClick={() => {
              action.onAction(row);
              onClose();
            }}
          >
            {action.confirmLabel ?? action.label}
          </Button>
        </>
      }
    />
  );
}

function RowActionsCell<TData>({
  row,
  primary,
  actions,
  getRowLabel,
}: {
  row: TData;
  primary?: ActionsColumnOptions<TData>['primary'];
  actions: RowAction<TData>[];
  getRowLabel?: (row: TData) => string;
}) {
  const [confirming, setConfirming] = React.useState<RowAction<TData> | null>(null);
  const label = getRowLabel?.(row) ?? 'this row';

  const visible = actions.filter((a) => !a.hidden?.(row));
  const primaryAction = primary ? ({ id: 'primary', ...primary } as RowAction<TData>) : undefined;

  const activate = (action: RowAction<TData>) => {
    if (action.destructive || action.confirm) setConfirming(action);
    else action.onAction(row);
  };

  return (
    <>
      {/* justify-end: actions belong at the row's trailing edge (§6). */}
      <div className="flex items-center justify-end gap-1">
        {primaryAction && (
          <Button
            variant="ghost"
            size="sm"
            disabled={isDisabled(primaryAction, row)}
            title={isDisabled(primaryAction, row) ? primaryAction.disabledReason : undefined}
            // Named for the record, not just the verb: forty buttons called
            // "View" tell a screen-reader user nothing about which one.
            aria-label={`${primaryAction.label} ${label}`}
            onClick={() => activate(primaryAction)}
          >
            {primaryAction.icon}
            {primaryAction.label}
          </Button>
        )}

        {visible.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                aria-label={`More actions for ${label}`}
              >
                <MoreVertical className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              {visible.map((action, i) => {
                const disabled = isDisabled(action, row);
                // Destructive items are separated from the rest, so "Delete"
                // is never adjacent to the item above it in a list the user
                // is arrowing through quickly.
                const needsSeparator = action.destructive && i > 0 && !visible[i - 1].destructive;
                return (
                  <React.Fragment key={action.id}>
                    {needsSeparator && <DropdownMenuSeparator />}
                    <DropdownMenuItem
                      disabled={disabled}
                      title={disabled ? action.disabledReason : undefined}
                      onSelect={() => activate(action)}
                      style={action.destructive ? { color: getRoleColor('status.danger.fg') } : undefined}
                    >
                      {action.icon}
                      {action.label}
                    </DropdownMenuItem>
                  </React.Fragment>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {confirming && (
        <ActionConfirm action={confirming} row={row} label={label} onClose={() => setConfirming(null)} />
      )}
    </>
  );
}

/**
 * An actions column, mirroring `createSelectColumn`.
 *
 * Not sortable, not hideable, not resizable — it holds controls, not data.
 */
export function createActionsColumn<TData extends RowData>({
  getRowLabel,
  primary,
  actions = [],
  header = '',
}: ActionsColumnOptions<TData>): DataGridColumnDef<TData> {
  return {
    id: 'actions',
    // A visible header over a column of icon buttons is noise, but an EMPTY
    // <th> fails axe's empty-table-header rule — so it carries an accessible
    // name without rendering one. Learnt from the control columns the grid
    // already has.
    header: () => (header ? header : <span className="sr-only">Actions</span>),
    meta: { align: 'right' },
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    cell: ({ row }) => (
      <RowActionsCell
        row={row.original as TData}
        primary={primary}
        actions={actions}
        getRowLabel={getRowLabel}
      />
    ),
  };
}
