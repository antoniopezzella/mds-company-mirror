/**
 * The stacking scale.
 *
 * Why this exists
 * ---------------
 * There was no scale. `1500` was copied into 16 places across three syntaxes
 * (`z-[1500]`, `zIndex: 1500`), `data-table.tsx` used `zIndex: 1/2/3` for
 * sticky headers while `table.tsx` used `z-10` for the same job, and — the
 * part users actually hit — **`toast.tsx` sat at `z-[100]`, below every
 * overlay at `1500`**. A toast fired while a Dialog, Sheet, Drawer, Popover
 * or Select was open rendered *behind* it. Confirmations, save errors and
 * "copied to clipboard" all silently disappeared at exactly the moment they
 * mattered.
 *
 * The ordering, and why it is this way
 * ------------------------------------
 * Layers are ordered by how much they need to interrupt. The only
 * non-obvious call is **toasts above overlays**: a toast is a response to
 * something the user just did, so it must be visible even when a dialog is
 * open. Tooltips sit above toasts because a tooltip describes the thing
 * under the cursor and is dismissed by moving away — it can never trap
 * anything.
 *
 * Gaps of 100 leave room to insert a layer without renumbering.
 */
export const Z_INDEX = {
  /** Sticky table headers and pinned columns — in-flow, below everything. */
  sticky: 10,
  /** Fixed page chrome: header, side navigation. */
  chrome: 40,
  /** Scrim behind an overlay. */
  scrim: 1400,
  /** Dialog, Sheet, Drawer, Popover, Select, DropdownMenu, ContextMenu, Menubar, HoverCard. */
  overlay: 1500,
  /** Toasts — deliberately ABOVE overlays. See the note above. */
  toast: 1600,
  /** Tooltips — above everything; they cannot trap focus or block input. */
  tooltip: 1700,
} as const;

export type ZIndexLayer = keyof typeof Z_INDEX;

/**
 * Tailwind classes for each layer.
 *
 * Literal strings, not interpolated: Tailwind's scanner is plain text, so a
 * computed `z-[${n}]` generates no CSS at all.
 */
export const Z_CLASS: Record<ZIndexLayer, string> = {
  sticky: 'z-10',
  chrome: 'z-40',
  scrim: 'z-[1400]',
  overlay: 'z-[1500]',
  toast: 'z-[1600]',
  tooltip: 'z-[1700]',
};
