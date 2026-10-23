"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input } from './input';
import { Textarea } from './textarea';

export interface DataGridCellEditorProps {
  /** Seed text, already run through the column's `format`. */
  value: string;
  control?: 'text' | 'textarea';
  /** Announced by a screen reader — the cell alone says nothing useful. */
  ariaLabel: string;
  /** Enter (or blur) with the raw text. The column's `parse` runs upstream. */
  onCommit: (raw: string) => void;
  /** Escape. Must not commit. */
  onCancel: () => void;
  /** The last commit was rejected by `parse`; keep the editor open and say so. */
  invalid?: boolean;
}

/**
 * The in-cell editor for spreadsheet mode.
 *
 * Deliberately dumb: it holds draft text and reports it. Parsing, validation
 * and rejection live in `data-grid-cell-selection.ts` so the *same* rules
 * apply to a typed edit and to a paste — two code paths disagreeing about
 * what a column accepts is how "it worked when I typed it" bugs start.
 *
 * Only `text` and `textarea` exist, matching the `cellEdit.control` contract.
 * A number or date column does not need a different control — it needs a
 * `parse`, which it already has. Adding `<input type="number">` would also
 * quietly reject the paste-friendly formats people actually type ("1,200").
 */
export const DataGridCellEditor = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  DataGridCellEditorProps
>(function DataGridCellEditor(
  { value, control = 'text', ariaLabel, onCommit, onCancel, invalid = false },
  forwardedRef
) {
  const [draft, setDraft] = React.useState(value);

  // Focus on mount via ref rather than autoFocus: entering edit mode has to
  // move focus or a keyboard user is stranded, but autoFocus is the blunt
  // version jsx-a11y rightly rejects. Guarded so re-renders while typing do
  // not re-steal focus or reset the caret.
  //
  // Merged with the forwarded ref: a consumer (e.g. a cell wrapper that wants
  // to measure the editor, or scroll it into view) needs the same node this
  // effect already focuses, not a second, disconnected one.
  const focusOnMount = (el: HTMLInputElement | HTMLTextAreaElement | null) => {
    if (el && document.activeElement !== el) {
      el.focus();
      el.select?.();
    }
    if (typeof forwardedRef === 'function') forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  };

  const keyDown = (e: React.KeyboardEvent) => {
    // Everything is stopped from bubbling: the grid's own handler owns these
    // keys in navigation mode, and an arrow key inside an editor must move
    // the caret, not the selection. This is the navigation/actionable mode
    // split the APG grid pattern describes.
    e.stopPropagation();

    if (e.key === 'Enter' && !(control === 'textarea' && e.shiftKey)) {
      e.preventDefault();
      onCommit(draft);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    }
  };

  const shared = {
    value: draft,
    'aria-label': ariaLabel,
    'aria-invalid': invalid || undefined,
    onKeyDown: keyDown,
    onBlur: () => onCommit(draft),
    className: cn('w-full', invalid && 'ring-2'),
    style: invalid
      ? ({ '--tw-ring-color': 'var(--role-fg-critical)' } as React.CSSProperties)
      : undefined,
  };

  if (control === 'textarea') {
    return (
      <Textarea
        ref={focusOnMount}
        rows={2}
        onChange={(e) => setDraft(e.target.value)}
        {...shared}
      />
    );
  }

  return (
    <Input
      ref={focusOnMount}
      onChange={(e) => setDraft(e.target.value)}
      {...shared}
      className={cn('h-8', shared.className)}
    />
  );
});
DataGridCellEditor.displayName = 'DataGridCellEditor';

export default DataGridCellEditor;
