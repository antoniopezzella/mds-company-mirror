"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icon } from './icon';
import { Popover, PopoverAnchor, PopoverContent } from './popover';

/** How an edit ended — the grid moves focus on Enter / Tab (hand-off §5). */
export type DataGridCommitReason = 'enter' | 'tab' | 'shift-tab' | 'blur' | 'option';

export interface DataGridCellEditorProps {
  /** Seed text, already run through the column's `format`. */
  value: string;
  control?: 'text' | 'textarea' | 'select';
  /** Option labels for `control: 'select'`. */
  options?: readonly string[];
  /** Announced by a screen reader — the cell alone says nothing useful. */
  ariaLabel: string;
  /**
   * Enter, Tab, blur or a chosen option, with the raw text. The column's
   * `parse` runs upstream. Return `false` when the editor stays open (the
   * text was rejected on Enter), so a later blur still commits.
   */
  onCommit: (raw: string, reason: DataGridCommitReason) => boolean | void;
  /** Escape. Must not commit. */
  onCancel: () => void;
  /** Every keystroke — the grid re-validates once a value has been rejected. */
  onDraftChange?: (raw: string) => void;
  /** The last commit was rejected by `parse`; keep the editor open and say so. */
  invalid?: boolean;
  /** Id of the element describing the error (the cell's error tooltip). */
  'aria-describedby'?: string;
  /**
   * The Error tooltip is showing. Escape then closes the MESSAGE and leaves
   * the user in the cell (hand-off §5c); the next Escape cancels the edit.
   */
  messageOpen?: boolean;
  onDismissMessage?: () => void;
  /**
   * Select the seed on focus (default). Off when the edit started from a
   * typed character, which must not be replaced by the next keystroke.
   */
  selectOnFocus?: boolean;
  /** A select's listbox opened or closed — the cell flips its arrow. */
  onListOpenChange?: (open: boolean) => void;
}

/**
 * Figma `Content/Editable`: the CELL is the field — it takes the Editing /
 * Error fill and the 1px inside stroke (data-grid-table.tsx) — so the editor
 * itself is bare text: 14/20 `foreground/input/default` with a
 * `foreground/primary/default` caret, no box of its own. A bordered `<Input>`
 * inside a stroked cell drew two frames.
 */
const editableClass = cn(
  'w-full min-w-0 border-0 bg-transparent p-0 text-sm outline-hidden',
  'text-[var(--mds-color-foreground-input-default)] caret-[var(--mds-color-foreground-primary-default)]',
  'placeholder:text-[var(--mds-color-foreground-input-placeholder)]'
);

/**
 * The in-cell editor for spreadsheet mode.
 *
 * Deliberately dumb: it holds draft text and reports it. Parsing, validation
 * and rejection live in `data-grid-cell-selection.ts` so the *same* rules
 * apply to a typed edit and to a paste — two code paths disagreeing about
 * what a column accepts is how "it worked when I typed it" bugs start.
 *
 * `text`, `textarea` and `select` exist, matching the `cellEdit.control`
 * contract. A number or date column does not need a different control — it
 * needs a `parse`, which it already has. Adding `<input type="number">` would
 * also quietly reject the paste-friendly formats people actually type
 * ("1,200").
 *
 * `select` is Figma `Content/Editable` *Dropdown*: an editable combobox
 * (typing filters, so "Residental" can be typed and REJECTED, as the
 * validation specimen 17245:97636 shows) with a listbox under the cell. It is
 * the Popover primitive with menu-styled options rather than DropdownMenu,
 * because a Radix menu takes focus — and focus has to stay in the text.
 */
export const DataGridCellEditor = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  DataGridCellEditorProps
>(function DataGridCellEditor(
  {
    value,
    control = 'text',
    options = [],
    ariaLabel,
    onCommit,
    onCancel,
    onDraftChange,
    invalid = false,
    'aria-describedby': describedBy,
    messageOpen = false,
    onDismissMessage,
    selectOnFocus = true,
    onListOpenChange,
  },
  forwardedRef
) {
  const [draft, setDraft] = React.useState(value);
  // Set once an Enter/Tab/Escape has closed the edit, so the blur that
  // follows the editor's removal does not commit a second time.
  const settled = React.useRef(false);
  const listId = React.useId();
  const isSelect = control === 'select';

  // The list shows every option until the user types, then filters.
  const [filtering, setFiltering] = React.useState(!selectOnFocus);
  const [listOpen, setListOpen] = React.useState(isSelect);
  const shown = React.useMemo(() => {
    if (!isSelect) return [];
    const q = draft.trim().toLowerCase();
    return filtering && q ? options.filter((o) => o.toLowerCase().includes(q)) : [...options];
  }, [isSelect, options, draft, filtering]);
  const [active, setActive] = React.useState(() => Math.max(0, options.indexOf(value)));
  const visible = isSelect && listOpen && shown.length > 0;

  React.useEffect(() => {
    if (isSelect) onListOpenChange?.(visible);
  }, [isSelect, visible, onListOpenChange]);

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
      if (selectOnFocus) el.select?.();
      else el.setSelectionRange?.(el.value.length, el.value.length);
    }
    if (typeof forwardedRef === 'function') forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  };

  const commit = (raw: string, reason: DataGridCommitReason) => {
    if (settled.current) return;
    const closed = onCommit(raw, reason);
    settled.current = closed !== false;
  };

  const change = (next: string) => {
    settled.current = false;
    setDraft(next);
    setFiltering(true);
    setListOpen(true);
    setActive(0);
    onDraftChange?.(next);
  };

  const keyDown = (e: React.KeyboardEvent) => {
    // Everything is stopped from bubbling: the grid's own handler owns these
    // keys in navigation mode, and an arrow key inside an editor must move
    // the caret, not the selection. This is the navigation/actionable mode
    // split the APG grid pattern describes.
    e.stopPropagation();

    if (isSelect && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      if (!visible) {
        setListOpen(true);
        return;
      }
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActive((i) => (i + step + shown.length) % shown.length);
      return;
    }

    if (e.key === 'Enter' && !(control === 'textarea' && e.shiftKey)) {
      e.preventDefault();
      // An open list with a highlighted option commits THAT option; otherwise
      // the typed text goes to parse (and may be rejected).
      if (visible && shown[active] !== undefined) {
        setDraft(shown[active]);
        commit(shown[active], 'option');
      } else {
        commit(draft, 'enter');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      commit(draft, e.shiftKey ? 'shift-tab' : 'tab');
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (invalid && messageOpen && onDismissMessage) {
        onDismissMessage();
        return;
      }
      settled.current = true;
      onCancel();
    }
  };

  const shared = {
    value: draft,
    'aria-label': ariaLabel,
    'aria-invalid': invalid || undefined,
    'aria-describedby': invalid ? describedBy : undefined,
    onKeyDown: keyDown,
    onBlur: () => commit(draft, 'blur'),
    className: editableClass,
  };

  if (control === 'textarea') {
    return (
      <textarea
        ref={focusOnMount}
        rows={2}
        onChange={(e) => change(e.target.value)}
        {...shared}
        className={cn(shared.className, 'resize-none')}
      />
    );
  }

  const input = (
    <input
      ref={focusOnMount}
      onChange={(e) => change(e.target.value)}
      {...shared}
      {...(isSelect
        ? {
            role: 'combobox',
            'aria-expanded': visible,
            'aria-controls': listId,
            'aria-autocomplete': 'list' as const,
            'aria-activedescendant': visible ? `${listId}-${active}` : undefined,
          }
        : null)}
      className={cn(shared.className, 'h-5')}
    />
  );
  if (!isSelect) return input;

  return (
    <Popover open={visible}>
      {/* Anchored to the whole CELL (the nearest positioned ancestor), so
          the list opens under the cell edge at the cell's width, as Figma's
          Dropdown does — not under the 20px text line. */}
      <PopoverAnchor asChild>
        <span aria-hidden className="pointer-events-none absolute inset-0" />
      </PopoverAnchor>
      {input}
      <PopoverContent
        align="start"
        sideOffset={4}
        // Focus stays in the text: typing filters, arrows move the
        // highlight, Enter picks. Radix would otherwise move it into the list.
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        // Radix renders the surface as role=dialog; it must have a name.
        aria-label={ariaLabel}
        className="w-[var(--radix-popover-trigger-width)] rounded-lg p-1 shadow-md"
        style={{
          backgroundColor: 'var(--mds-color-background-default)',
          borderColor: 'var(--mds-color-border-default)',
          color: 'var(--mds-color-foreground-primary-default)',
        }}
      >
        <ul id={listId} role="listbox" aria-label={ariaLabel}>
          {shown.map((label, i) => (
            <li
              key={label}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={label === value}
              // mousedown, not click, and prevented: a click would blur the
              // input first, committing the TYPED text before the choice.
              onMouseDown={(e) => {
                e.preventDefault();
                setDraft(label);
                commit(label, 'option');
              }}
              onMouseEnter={() => setActive(i)}
              className="flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm"
              style={i === active ? { backgroundColor: 'var(--mds-color-background-neutral-subtle)' } : undefined}
            >
              <span className="min-w-0 flex-1 truncate">{label}</span>
              {label === value && <Icon pseudo name="check" size={16} className="shrink-0" />}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
});
DataGridCellEditor.displayName = 'DataGridCellEditor';

export default DataGridCellEditor;
