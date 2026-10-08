"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from './button';
import { Modal } from './dialog';
import { Spinner } from './spinner';
import type { SelectionState } from './data-grid-selection';

/**
 * Actions applied to a selection.
 *
 * Why this is not just a row of buttons
 * -------------------------------------
 * Selection existed here with nothing to do afterwards: you could pick rows,
 * escalate the scope, read it through a callback — and then stop. This is the
 * operation half.
 *
 * The parts that are easy to leave out, and are the reason a bulk bar is worth
 * a component rather than a `<div>` of buttons:
 *
 * - **Scope in the confirmation.** "Delete 18 assets?" and "Delete all 12,482
 *   matching your filters?" are different sentences, and the second one is the
 *   dangerous one. The copy is generated from the live selection, so it cannot
 *   drift from what will actually happen.
 * - **Partial success.** Bulk operations half-fail routinely — permissions,
 *   validation, a record someone else locked. "8 updated, 2 could not be"
 *   is the truthful report; a success toast is not.
 * - **A running state that blocks re-entry.** Without it the user presses
 *   Delete twice on a slow network.
 * - **Selection survives.** Clearing it on completion looks tidy and destroys
 *   the user's ability to retry the two that failed.
 */

export interface BulkActionFailure {
  /** Row id, or whatever identifier the consumer reports back. */
  id: string;
  reason: string;
}

export interface BulkActionResult {
  succeeded: number;
  /** The ones that did not apply. Presence of any switches the report to partial. */
  failed?: BulkActionFailure[];
}

export interface BulkAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  /**
   * Marks the action as destructive: it gets the danger treatment AND a
   * confirmation step. Both, not either — colour alone is not a safeguard,
   * and the spec says so explicitly.
   */
  destructive?: boolean;
  /**
   * Requires confirmation. Implied by `destructive`; set it directly for a
   * non-destructive action with heavy consequences (an irreversible export, a
   * notification to every selected client).
   */
  confirm?: boolean;
  /** Overrides the generated confirmation copy. */
  confirmTitle?: string;
  confirmDescription?: string;
  confirmLabel?: string;
  /**
   * Not permitted, or not applicable to this selection. A function receives
   * the live selection so "cannot delete a locked record" is expressible.
   */
  disabled?: boolean | ((selection: SelectionState) => boolean);
  /** Why it is disabled — shown as a title so the reason is discoverable. */
  disabledReason?: string;
  /**
   * Performs the action.
   *
   * Return a `BulkActionResult` to report partial success. Returning nothing
   * is treated as "all of them worked", which is right for an action that
   * throws on failure.
   */
  onAction: (selection: SelectionState) => void | BulkActionResult | Promise<void | BulkActionResult>;
}

export interface DataGridBulkActionsProps {
  actions: BulkAction[];
  selection: SelectionState;
  /** Noun for the records. Used to build confirmation copy. */
  itemNoun?: string;
  itemNounPlural?: string;
  className?: string;
}

type RunState =
  | { phase: 'idle' }
  | { phase: 'confirming'; action: BulkAction }
  | { phase: 'running'; action: BulkAction }
  | { phase: 'reported'; action: BulkAction; result: BulkActionResult };

export function DataGridBulkActions({
  actions,
  selection,
  itemNoun = 'row',
  itemNounPlural,
  className,
}: DataGridBulkActionsProps) {
  const [state, setState] = React.useState<RunState>({ phase: 'idle' });

  const many = itemNounPlural ?? `${itemNoun}s`;
  const count = selection.allFilteredRowsSelected
    ? selection.totalFilteredCount
    : selection.selectedVisibleRows;
  const noun = count === 1 ? itemNoun : many;

  /**
   * The scope, in words, for the confirmation.
   *
   * Generated rather than passed so it cannot disagree with what the action
   * will receive — the failure mode being a dialog that says "18" while the
   * handler deletes 12,482.
   */
  const scopePhrase = selection.allFilteredRowsSelected
    ? `all ${count.toLocaleString()} ${noun} matching the current filters`
    : `${count.toLocaleString()} selected ${noun}`;

  const run = async (action: BulkAction) => {
    setState({ phase: 'running', action });
    try {
      const result = (await action.onAction(selection)) ?? { succeeded: count };
      if (result.failed?.length) {
        setState({ phase: 'reported', action, result });
      } else {
        setState({ phase: 'idle' });
      }
    } catch (e) {
      setState({
        phase: 'reported',
        action,
        result: { succeeded: 0, failed: [{ id: '—', reason: e instanceof Error ? e.message : String(e) }] },
      });
    }
  };

  const activate = (action: BulkAction) => {
    if (action.destructive || action.confirm) setState({ phase: 'confirming', action });
    else void run(action);
  };

  if (count === 0) return null;

  const running = state.phase === 'running' ? state.action : null;

  return (
    <>
      <div
        data-slot="data-grid-bulk-actions"
        className={cn('flex flex-wrap items-center gap-2', className)}
      >
        {actions.map((action) => {
          const isDisabled =
            typeof action.disabled === 'function' ? action.disabled(selection) : !!action.disabled;
          const isRunning = running?.id === action.id;
          return (
            <Button
              key={action.id}
              size="sm"
              variant="outline"
              tone={action.destructive ? 'danger' : 'default'}
              // Every action is blocked while one runs: a second Delete on a
              // slow network is the classic way to act on a stale selection.
              disabled={isDisabled || !!running}
              title={isDisabled ? action.disabledReason : undefined}
              onClick={() => activate(action)}
            >
              {isRunning ? <Spinner className="size-3.5" aria-hidden="true" /> : action.icon}
              {isRunning ? 'Working…' : action.label}
            </Button>
          );
        })}
      </div>

      {state.phase === 'confirming' && (
        <Modal
          open
          onClose={() => setState({ phase: 'idle' })}
          size="sm"
          title={state.action.confirmTitle ?? `${state.action.label} ${scopePhrase}?`}
          description={
            state.action.confirmDescription ??
            (state.action.destructive
              ? `This cannot be undone.`
              : `This applies to ${scopePhrase}.`)
          }
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setState({ phase: 'idle' })}>
                Cancel
              </Button>
              <Button
                variant="primary"
                tone={state.action.destructive ? 'danger' : 'default'}
                size="sm"
                onClick={() => void run(state.action)}
              >
                {/* Names the action, never just "Confirm": the button the user
                    is about to press should say what it does. */}
                {state.action.confirmLabel ?? `${state.action.label} ${noun === itemNoun ? itemNoun : many}`}
              </Button>
            </>
          }
        />
      )}

      {state.phase === 'reported' && (
        <Modal
          open
          onClose={() => setState({ phase: 'idle' })}
          size="sm"
          title={
            state.result.succeeded === 0
              ? `${state.action.label} failed`
              : `${state.action.label} partly applied`
          }
          description={
            state.result.succeeded === 0
              ? `No ${many} were changed.`
              : `${state.result.succeeded.toLocaleString()} ${state.result.succeeded === 1 ? itemNoun : many} updated. ${state.result.failed?.length.toLocaleString()} could not be.`
          }
          footer={
            <Button variant="outline" size="sm" onClick={() => setState({ phase: 'idle' })}>
              Close
            </Button>
          }
        >
          <ul className="max-h-48 overflow-auto text-sm" style={{ color: 'var(--role-text-secondary)' }}>
            {state.result.failed?.map((f) => (
              <li key={f.id} className="flex gap-2 py-0.5">
                <span className="font-medium" style={{ color: 'var(--role-text-primary)' }}>
                  {f.id}
                </span>
                <span>{f.reason}</span>
              </li>
            ))}
          </ul>
          {/* The selection is deliberately NOT cleared. Clearing it after a
              partial failure looks tidy and removes the user's ability to
              retry the ones that failed. */}
        </Modal>
      )}
    </>
  );
}
