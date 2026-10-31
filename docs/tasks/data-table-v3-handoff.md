# Data table — design hand-off for implementation

> **For:** the coding agent working in `MDS-Platform` (React 18, Tailwind v4, TanStack Table v9, shadcn/Radix).
> **From:** MDS design system (Antonio), 30 Oct 2026. **Source of truth:** Figma branch `EWYkndq17wpDP3pwcz1zM4`, page *Table New Component (WIP)* (`17066:73303`).
> **Status:** Figma spec is complete and described. Code already has a `DataGrid` family that is close. This document says exactly what the design is, what code already does, and what to change.

---

## 0. How to use this document

1. **Build on the existing `DataGrid` family**: `src/components/ui/data-grid*.tsx`, `data-table.tsx`, `use-data-grid-table.ts`.
   - Do **not** start a new table.
   - Do **not** touch the legacy `table.tsx` or `src/components/DataGrid` (MUI).
2. **Colours:** use the generated `--mds-color-*` variables (section 3.1). Never use hex. Do not add new `--role-*` usages.
3. **Spacing and sizes:** use the density variables (section 3.2). Use the Tailwind 4-px scale only for fixed geometry listed in this doc.
4. **Precedence:**
   - Where this doc and the code disagree, this doc wins, **unless** the item is listed in section 12, *Open decisions*.
   - For those items, keep the current code behaviour and leave a `// DECISION:` comment.
5. **Work order:** follow section 13, *Implementation tasks*. Each task has acceptance criteria. Run `npm test`, `npm run tokens:check` and `npm run dark:check` after each task.
6. **Off-limits:** do not change `figma.config.json` or `src/figma/*.figma.tsx` (Code Connect). They are being re-mapped separately.
7. **Secrets:** no secrets in tracked files.
8. **Figma vs proposed:** sections 2–4 and 10 are measured from Figma. Items marked **(proposed)** are DS recommendations that Figma doesn't show. They include motion timings, the keyboard map, responsive rules, minimum widths and debounce. Treat them as the default; they can change after review.

---

## 1. What the component is

A data table for application screens. It lets people scan, compare, sort, filter, select and act on records. It has one API and is used in many layouts. The layouts are **templates**, which are Storybook recipes, not separate components.

| Layer | Figma | Code |
|---|---|---|
| Atoms | `Data table/Cell`, `Header cell`, `Content/*`, `Control/*`, `Cell message`, `Page item`, `Count` | `data-grid-cells.tsx`, `data-grid-table.tsx`, `data-grid-pagination.tsx` |
| Molecules | `Title bar`, `Toolbar` (+ button / segment / group), `Header row`, `Row`, `Detail row`, `Detail card`, `Footer`, `Pagination`, `Rows per page` | `data-grid-toolbar.tsx`, `data-grid-toolbar-parts.tsx`, `data-grid-rows.tsx`, `data-grid-detail-card.tsx`, `data-grid-pagination.tsx` |
| Organism | `Data table` (`17280:11036`) with slots **Header / Columns / Body / Footer** | `DataGrid` + `DataGridContainer` + `DataGridScrollArea` + `DataGridTable`; `DataTable` is the convenience wrapper |
| Templates | `Templates/Data table/*` (7), section `17988:39949` | `data-table.templates.stories.tsx` (*Components/DataTable/Templates*) |

---

## 2. Anatomy

```
Data table (container)               r 8 · fill background/default · 1px border/subtle (inside) · clips content
├─ Header slot            (optional, "Has header")
│  ├─ Title bar           p 16/16/8/16 (top/right/bottom/left) · gap 8
│  │  ├─ Heading: Title (H4 app, 18/24 bold, fg/neutral/default) + Meta (14/20, fg/neutral/subtle) · gap 2
│  │  ├─ Actions slot (hidden by default; Button Small)
│  │  └─ Tabs slot (hidden by default)
│  └─ Toolbar             Mode = Default | Selection
│     ├─ Bar              min-h 48 · p 8/16 (bar-inset-y / inset-x) · gap 8 · space-between
│     │  ├─ Filters slot  (Toolbar group, Toolbar button)     ← left
│     │  └─ Controls slot (search segment, view/density/columns buttons) ← right
│     │     Selection mode: left = "N selected" Count + bulk actions; right = "Clear selection"
│     └─ Notice slot      (hidden; inline Alert, p 0/16/8/16)
├─ Grid (horizontal scroll)   overflow-x auto; sticky header
│  └─ Grid content
│     ├─ Columns slot → Header row → Header cell × n
│     └─ Body slot    → Row × n → Cells slot → Cell × n
│                       (+ Detail row under an expanded row)
└─ Footer slot            (optional, "Has footer")
   └─ Footer              p 8/16 · gap 8 · top border 1px border/subtle · space-between
      ├─ Left:  Rows per page
      └─ Right: Pagination (Compact | Pages | Jump)
```

---

## 3. Tokens

### 3.1 Colour (all already generated as CSS variables)

| Figma token | CSS variable | Light | Dark | Inverse |
|---|---|---|---|---|
| `background/default` | `--mds-color-background-default` | `#fdfcfa` | `#1f1e1b` | `#000f47` |
| `background/neutral/subtle` | `--mds-color-background-neutral-subtle` | `#faf7f4` | `#191816` | `#494843` |
| `background/neutral/default` | `--mds-color-background-neutral-default` | `#ebe7e2` | `#3d3c37` | `#62615c` |
| `background/hover` | `--mds-color-background-hover` | `#ebf7ff` | `#ffffff@5` | `#ffffff@20` |
| `background/selected` | `--mds-color-background-selected` | `#ceecff` | `#262522` | `#ffffff@10` |
| `background/critical/subtle` | `--mds-color-background-critical-subtle` | `#ffe8e8` | `#472625` | `#472625` |
| `background/success/subtle` | `--mds-color-background-success-subtle` | `#f0f6ed` | `#294030` | `#294030` |
| `background/warning/subtle` | `--mds-color-background-warning-subtle` | `#f8ebe0` | `#4b3a27` | `#4b3a27` |
| `background/info/subtle` | `--mds-color-background-info-subtle` | `#ebf7ff` | `#263854` | `#263854` |
| `background/input/default` | `--mds-color-background-input-default` | `#ffffff` | `#191816` | `#ffffff` |
| `background/primary/default` | `--mds-color-background-primary-default` | `#000f47` | `#3d7aff` | `#ceecff` |
| `background/critical/default` | `--mds-color-background-critical-default` | `#c63431` | `#ec4540` | `#ec4540` |
| `foreground/primary/default` | `--mds-color-foreground-primary-default` | `#000f47` | `#ceecff` | `#ceecff` |
| `foreground/neutral/default` | `--mds-color-foreground-neutral-default` | `#3d3c37` | `#f7f3ee` | `#f7f3ee` |
| `foreground/neutral/subtle` | `--mds-color-foreground-neutral-subtle` | `#56544f` | `#c5c2bd` | `#dedbd6` |
| `foreground/disabled` | `--mds-color-foreground-disabled` | `#878580` | `#7b7974` | `#878580` |
| `foreground/success/default` | `--mds-color-foreground-success-default` | `#2f7500` | `#c3e3ae` | `#c3e3ae` |
| `foreground/warning/default` | `--mds-color-foreground-warning-default` | `#8f5400` | `#ffd98a` | `#ffd98a` |
| `foreground/critical/default` | `--mds-color-foreground-critical-default` | `#af2625` | `#ff9d9d` | `#ff9d9d` |
| `foreground/link/default` | `--mds-color-foreground-link-default` | `#0b4bff` | `#95caff` | `#95caff` |
| `foreground/input/default` | `--mds-color-foreground-input-default` | `#000f47` | `#f7f3ee` | `#000f47` |
| `foreground/on-critical` | `--mds-color-foreground-on-critical` | `#ffffff` | `#000f47` | `#000f47` |
| `border/subtle` | `--mds-color-border-subtle` | `#dedbd6` | `#494843` | `#62615c` |
| `border/default` | `--mds-color-border-default` | `#7b7974` | `#94918c` | `#94918c` |
| `border/focus/default` | `--mds-color-border-focus-default` | `#3d7aff` | `#5e9aff` | `#5e9aff` |
| `border/input/hover` | `--mds-color-border-input-hover` | `#000f47` | `#ceecff` | `#000f47` |
| `border/critical/default` | `--mds-color-border-critical-default` | `#c63431` | `#ec4540` | `#ec4540` |
| `border/success/default` | `--mds-color-border-success-default` | `#2f7500` | `#57c67a` | `#57c67a` |
| `border/warning/default` | `--mds-color-border-warning-default` | `#c25600` | `#ffab4a` | `#ffab4a` |
| `border/info/default` | `--mds-color-border-info-default` | `#0a3acc` | `#95caff` | `#95caff` |
| `overlay/neutral/hover` | `--mds-color-overlay-neutral-hover` | `#000000@8` | `#ffffff@10` | `#ffffff@10` |
| `overlay/neutral/pressed` | `--mds-color-overlay-neutral-pressed` | `#000000@12` | `#ffffff@15` | `#ffffff@15` |

Notes:

- `@N` means alpha N%. The generated CSS already carries the alpha. Never add `opacity`.
- **State layers:** `overlay/neutral/hover` and `/pressed` are painted *over* the element's own fill: `background-image: linear-gradient(var(--layer), var(--layer))` on top of `background-color`. This is the MDS state-layer rule. Code already uses this pattern for row hover. Use it for toolbar buttons, segments, page items and header-cell hover too.
- **Modes:**
  - Light and Dark come from `<html data-theme>`.
  - Inverse comes from an ancestor `data-surface="inverse"`.
  - The table needs **no** mode-specific code: every colour above flips by itself.

### 3.2 Density

Figma collection `DENSITY`; the default mode is **Standard**.

| Figma token (code name in Figma Dev Mode) | Compact | **Standard** | Comfortable | Current code var |
|---|---|---|---|---|
| `size/table-row/height` (`--mds-size-table-row-height`) | 40 | **48** | 64 | `--dt-row-h` ✅ values match |
| `size/table-header/height` (`--mds-size-table-header-height`) | 32 | **40** | 48 | `--dt-header-h` ✅ |
| `space/table-cell/inset-x` (`--mds-space-table-cell-inset-x`) | 12 | **16** | 20 | `--dt-inset-x` ✅ |
| `space/table-cell/inset-y` (`--mds-space-table-cell-inset-y`) | 4 | **4** | 12 | `--dt-inset-y` ✅ |
| `space/table-cell/gap` (`--mds-space-table-cell-gap`) | 8 | **8** | 12 | `--dt-gap` ✅ |
| `space/table-cell/gap-sm` (`--mds-space-table-cell-gap-sm`) | 4 | **4** | 4 | — missing (use 4px / `gap-1`) |
| `space/table-bar/inset-y` (`--mds-space-table-bar-inset-y`) | 4 | **8** | 12 | `--dt-bar-inset-y` ✅ |

**Rules:**

- Density applies only to the table: toolbar bar insets, header, rows and footer.
- Density never changes buttons, inputs or badges. Controls inside cells are always **Small (32px)**.
- Set density once, on the grid root.
- **Row height is a minimum.** Row height is `min-height`, not a fixed `height`, and rows grow when content is taller. Figma decision of 22 Oct:
  - Compact fits one line or a Small control.
  - Standard and Comfortable fit two lines (a 36px two-line cell plus 2 × 4 inset).
  - See open decision **D1**, because current code uses a fixed `h-[var(--dt-row-h)]`.

### 3.3 Typography

Fonts: Noto Sans, already loaded.

| Figma text style | Size / line height / weight | Tailwind | Used by |
|---|---|---|---|
| Headings – Small – Application platform / Heading 4 | 18 / 24 / 700 | `text-lg leading-6 font-bold` | Title bar title |
| Body / Small / Regular | 14 / 20 / 400 | `text-sm leading-5` | cell primary text, toolbar labels, meta, pagination range, page item |
| Body / Small / Bold | 14 / 20 / 700 | `text-sm leading-5 font-bold` | header-cell label, Text *Strong*, Count *Strong*, selected page item, Detail row title |
| Body / Extra Small / Regular | 12 / 16 / 400 | `text-xs leading-4` | secondary line, caption, relative date, cell message, tag overflow |
| Body / Extra Small / Bold | 12 / 16 / 700 | `text-xs leading-4 font-bold` | Trend value, toolbar count pill |

Numbers in any cell use `tabular-nums`.

### 3.4 Shape, stroke, elevation, focus

| Thing | Value |
|---|---|
| Container radius | 8px; content clipped (`overflow-hidden`) |
| Toolbar button and toolbar group radius | 2px (see **D2**, radius decision) |
| Page item, focus ring radius | 4px |
| Detail card, badge/tag radius | 8px |
| Count pill (toolbar button) | fully rounded, 20 × 20, min side padding 6 |
| Strokes | 1px. Container border is inside. Row and header dividers are 1px bottom lines. Footer has a 1px top line. |
| Done check circle | 18px, stroke 1.5px `border/default`; done = fill `foreground/primary/default` + 14px check |
| Error tooltip on a cell | Tooltip *Top right*, p 8, r 4, `background/default`, shadow **Elevation/Small/Bottom** = `0 4px 6px -1px rgb(0 0 0/.1), 0 2px 4px -2px rgb(0 0 0/.1)` (Tailwind `shadow-md`) |
| Focus ring | 2px `border/focus/default`, 2px **outside** the element (`outline-2 outline-offset-2`), radius 4. Every interactive part has one: header cell, row, cell (grid mode), expand, done check, drag handle, toolbar button/segment, page item. |

---

## 4. Part specs

Dimensions are in px. **p** = padding (top/right/bottom/left). **g** = gap. *Hug* = size to content. *Fill* = stretch.

### 4.1 Container — `Data table`

| Property | Value |
|---|---|
| Fill | `background/default` |
| Border | 1px `border/subtle`, inside |
| Radius | 8 |
| Layout | vertical. Header slot, then Grid, then Footer slot. No gaps. |
| Booleans | `Has header` (default on), `Has footer` (default on) |
| Grid | `overflow-x: auto` for horizontal scroll. The header row stays visible on vertical scroll (sticky) when a max height is set. |

### 4.2 Title bar

| Property | Value |
|---|---|
| Padding | 16 / inset-x / 8 / inset-x (Standard 16/16/8/16) |
| Gap | `--dt-gap` |
| Title | H4 app (18/24 bold), `foreground/neutral/default`, one line |
| Meta | 14/20, `foreground/neutral/subtle`. Example: "11 visible • 2 unassigned • …" (bullet-separated facts). |
| Actions slot | right side, centred vertically, gap 8. Holds Buttons Small (32). Hidden by default. |
| Tabs slot | below the heading. Tabs component with gap 24. Hidden by default. |

### 4.3 Toolbar

| Part | Spec |
|---|---|
| Bar | min-h 48. p `--dt-bar-inset-y` / `--dt-inset-x`. g 8. `justify-between`, items centred. |
| Filters slot (left) | Toolbar groups and toolbar buttons, g 8 |
| Controls slot (right) | search segment, menu segment, view buttons, g 8 |
| **Mode = Selection** | Replaces the bar content while ≥1 row is selected. Left: `Count` *Strong* ("3 selected") + bulk-action buttons, g 8. Right: **Clear selection** (Toolbar button). |
| Notice slot | Optional inline Alert (Tone = Critical by default) under the bar. p 0/16/8/16. Use it for load errors or partial data. |

**Toolbar button** (`DataGridToolbarButton`): h 32, p 0/8, g 4, r 2, fill `background/default`, 1px `border/default` inside.

- **Parts:**
  - icon 16;
  - label (14/20, `foreground/neutral/default`, wrapper p 0/4);
  - optional count pill (20×20, r full, `background/neutral/default`, 12/16 bold).
- **States:**
  - Hover: fill + `overlay/neutral/hover`.
  - Pressed: fill + `overlay/neutral/pressed`.
  - Disabled: label and count become `foreground/disabled`, and there is no overlay.
  - Focus: ring.

**Toolbar group** (`DataGridToolbarGroup`): h 32, r 2, fill `background/default`, 1px `border/default` inside. Segments sit flush, with no gap.

**Toolbar segment** (`DataGridToolbarSegment`):

| Property | Spec |
|---|---|
| Height | 32 |
| Padding | 0/12. The *Menu* type is icon only, with p 0/8. |
| Gap | 8 |
| Content | icon 16 + label 14/20 `foreground/neutral/default` |
| Divider | a 1px `border/default` divider on the right edge |
| Types | Field, Text, Input, Button, Menu |
| *Input* type | fills the available width. Placeholder in `foreground/neutral/subtle`. One line, truncated. |
| Hover / Pressed | overlay hover / pressed |
| `Muted` | adds a permanent `overlay/neutral/hover` layer, used for the non-interactive "field" label |
| Focus | ring inset by 2 |

### 4.4 Header row and header cell

| Property | Value |
|---|---|
| Header row | horizontal, no gap. Cells have fixed widths per column. |
| Header cell | min-h `--dt-header-h`. p `--dt-inset-y` / `--dt-inset-x`. g `--dt-gap`. Items centred vertically. Fill `background/neutral/subtle`. |
| Bottom divider | 1px `border/subtle` (`Divider` boolean, on by default) |
| Column divider | 1px `border/subtle` on the right edge (`Column divider` boolean, off by default) |
| Label | 14/20 **bold**, `foreground/primary/default`, one line |
| Label group | label + sort icon, g 4 (`gap-sm`) |
| Sort icon (16) | `None` = unfold_more (both arrows, `foreground/neutral/subtle`); `Ascending` = arrow up; `Descending` = arrow down |
| Align | `Start` / `Center` / `End`. Must match the column's cells. Numbers use End. |
| Leading checkbox (`Checkbox`) | 20px select-all. States: unchecked, checked, mixed (some rows selected). |
| Trailing | `Pin` icon 16 (keep_off), `Menu` 16 (more_vert), `Resize handle` (2×16, r full, `border/default`, visible on hover of the column edge) |
| `Pinned` | the column sticks to the left. A 1px `border/default` edge sits on its right side. |
| States | Hover adds `overlay/neutral/hover` on the cell (sortable columns only). Focus shows the ring. |

### 4.5 Row

| State | Row fill (Figma) | Notes |
|---|---|---|
| Default | `background/default` | |
| Banded | `background/neutral/subtle` | even rows when `striped` is set. See **D3** on the name. |
| Hover | `background/default` + `background/hover` layer | the pointer is over the row. Banded rows keep their band under the layer. |
| Selected | `background/selected` | the row checkbox is checked. See **D4**. |
| Error | `background/critical/subtle` | row-level validation failed |
| Disabled | `background/default` | all text uses `foreground/disabled`. Controls are disabled, and the row cannot be selected. |

- **Cells inside a row:** a Cell's `Row state` is a design-only property. In a row, cells are **Transparent** (no fill), so the row owns the background.
- **Row focus:** a ring inset 2px inside the row (keyboard row navigation).

### 4.6 Cell

| Property | Value |
|---|---|
| Size | min-h `--dt-row-h`. p `--dt-inset-y` / `--dt-inset-x`. g `--dt-gap`. Items centred vertically. Width fixed per column. |
| Content slot | one content part (4.7). Fills the width. |
| Bottom divider | 1px `border/subtle` (`Divider` boolean; off on the last row when there is no footer) |
| Column divider | off by default |
| `Pinned` edge | 1px `border/default` on the right edge |

**Cell state** applies to one cell. It is independent of the row state.

| Cell state | Fill | Stroke (1px inside) | Divider colour | Content |
|---|---|---|---|---|
| None | (row) | — | `border/subtle` | normal |
| Editing | `background/input/default` | `border/input/hover` | `border/input/hover` | `Content/Editable` *Editing*: text in `foreground/input/default`, 1×16 caret in `foreground/primary/default` |
| Error | `background/critical/subtle` | `border/critical/default` | `border/critical/default` | `Editable` *Error* + 16px critical icon. Message as a tooltip (default) or an inline `Cell message`. |
| Success | `background/success/subtle` | `border/success/default` | `border/success/default` | `Editable` *Success* + 16px success icon (show after a save, then return to None) |

### 4.7 Cell content types

All content parts fill the cell width and truncate to one line with an ellipsis.

| Figma part | Code | Spec |
|---|---|---|
| **Text** | `DataGridCellText` | Primary 14/20. Optional secondary line 12/16 `foreground/neutral/subtle`. Each line truncates to one line.<br>**Styles:**<ul><li>Default: `foreground/primary/default`</li><li>Strong: bold</li><li>Muted: `foreground/neutral/subtle`</li><li>Done: muted + strikethrough</li><li>Success / Warning / Critical: `foreground/{tone}/default`</li></ul>Align Start or End. |
| **Number** | (Text + Trend; `TypedColumnFormatting`) | Right-aligned by default. Value 14/20 `foreground/primary/default`, `tabular-nums`. Optional caption above (12/16 muted). Optional Trend below. Styles Default / Strong. |
| **Trend** | `DataGridCellTrend` | 16 icon + value 12/16 **bold**, g 4. Up = trending_up in `foreground/success/default`. Down = trending_down in `foreground/critical/default`. Neutral = "–" in `foreground/neutral/subtle`. Show the sign ("+5.2%", "−0.4%"). |
| **Entity** | `DataGridCellEntity` (+ `DataGridCellLogo`) | Leading slot + text block (primary 14/20 and secondary 12/16 muted), g 8.<br>**Leading by type:**<ul><li>Person: Avatar Small 32 (initials)</li><li>Company: logo tile 24×24, r 4, `background/neutral/default`, initial letter</li><li>Location: flag 21×15. Secondary line = time zone.</li></ul> |
| **Progress** | `DataGridCellProgress` | Bar or Ring, plus a value label 14/20, g 8.<br>**Bar:** Progression bar XSmall, 4px tall.<br>**Ring:** 20px, track `background/neutral/default`, value arc `foreground/primary/default`.<br>**Tones:** Primary (the default), Success, Warning, Critical. Values 0–100%. |
| **Sparkline** | `Sparkline` (`sparkline.tsx`) | 80×24, no axes. Line colour by trend: Up = `foreground/success/default`, Down = `foreground/critical/default`, Neutral = `foreground/neutral/subtle`. Decorative: the value must also exist elsewhere in the row, or in an `aria-label`. |
| **Link** | `DataGridCellLink` | Label 14/20 underlined, `foreground/primary/default`. On hover it becomes `foreground/link/default`. Optional secondary line. One line, truncated. |
| **Date** | `DataGridCellDate` | Date 14/20 ("Mar 10, 2026") + relative 12/16 muted ("3 days ago"). Optional 16px calendar icon. |
| **Tags** | (Badge row) | Badges *Subtle*, h 24, r 8, g 4. Shows up to 3, then "+N" (12/16 muted). |
| **Alerts** | — (missing) | Counts per severity: 16 critical-filled icon + count 14/20, then 16 warning-filled icon + count; groups g 8, inner g 4. "None" in muted text when both are 0. |
| **Actions** | `createActionsColumn` | Up to 2 Icon Buttons *Tertiary Small* (32, p 6, r 2) + a **More** (more_horiz) menu, g 4. Right-aligned. |
| **Editable** | `data-grid-cell-edit.tsx` | Value 14/20 + optional dropdown arrow 16 (for select editors). Error and Success add a 16px status icon. |
| **Tree** | `createExpandColumn` + indent | Indent steps of 24 per level, then a toggle (Expand control, 24 box, 16 chevron) or an empty 24 spacer, then optional leading (Done check), then the label (Text), then optional trailing (Progress ring). g 8. `Indent = Aligned` reserves the toggle space on leaf rows; `Compact` does not. |

**Controls:** each is a 24×24 hit box, centred, with a 16px icon and a focus ring.

- **Expand:** chevron_right (No) / chevron_down (Yes).
- **Done check:** see 3.4.
- **Drag handle:** drag_indicator.
- **Indent:** a 24px spacer per level (1–3).

**Cell message (inline):**

| Property | Value |
|---|---|
| Spacing and shape | p 2/6, r 2 |
| Critical tone | fill `background/critical/default`, text 12/16 `foreground/on-critical` (for example "Enter a valid value") |
| Success tone | same layout with success colours |
| Position | below the value inside the cell; the row grows |

### 4.8 Detail row and detail card (expandable row)

| Part | Spec |
|---|---|
| Detail row | Full width under its row. p 16 (`--dt-inset-x` on all sides). g 16. Fill `background/default`. Bottom divider `border/subtle`. |
| Detail row header | title 14/20 bold `foreground/primary/default` + summary 14/20 muted, g 8 |
| Detail row content | Detail cards in a row, g 16. Cards wrap on narrow widths. |
| Detail card (`DataGridDetailCard`) | Fixed width 360 in Figma (use `min-w-72 flex-1`). p 16, g 8, r 8, fill `background/default`, 1px `border/subtle`. |
| Detail card slots | Header (Badge), Content (Card part *Title* + *Meta*), Footer (*Rating* + Progress ring, `justify-between`) |
| Card parts | `DataGridCardTitle`, `DataGridCardMeta` (avatar + text), `DataGridCardRating`, `DataGridCardKeyValue` |

### 4.9 Footer and pagination

| Part | Spec |
|---|---|
| Footer | p `--dt-bar-inset-y` / `--dt-inset-x`. g 8. `justify-between`. 1px top `border/subtle`. Left slot: Rows per page. Right slot: Pagination. |
| Rows per page | label "Rows per page" 14/20 muted + Input Small (w 80, h 32), g 8 |
| Pagination *Compact* | range "1–10 of 248" (14/20 muted) + First / Previous / Next / Last (Icon Button Tertiary Small 32), g 8, nav g 4. Disable First and Previous on page 1, and Next and Last on the last page. |
| Pagination *Pages* | range + Previous + page items (max 7, with an ellipsis item) + Next |
| Pagination *Jump* | range + "Page" + Input Small (w 56) + "of 25" + First / Previous / Next / Last |
| Page item | 32×32, p 0/8, r 4, label 14/20 `foreground/neutral/default`<br>**States:**<ul><li>Hover: `overlay/neutral/hover`</li><li>Selected: fill `background/neutral/default`, label bold, `aria-current="page"`</li><li>Disabled: `foreground/disabled`</li><li>Focus: ring</li></ul> |
| Count | "3 selected" 14/20. Default = muted. Strong = bold, `foreground/neutral/default`. |

---

## 5. States and interactions (visual states from Figma; behaviour proposed)

| Element | Trigger | Behaviour |
|---|---|---|
| Header cell (sortable) | click / Enter / Space | Cycles None → Ascending → Descending → None. Only one sorted column, unless multi-sort is enabled (Shift+click). Update `aria-sort`. |
| Header cell | hover | overlay hover layer. Shows the resize handle on the right edge if resizable. |
| Resize handle | drag / ← → when focused | Changes the column width. Minimum width = the content's minimum (section 8). Double-click auto-fits. |
| Pin icon / header menu | click | Pin to the left (or unpin). The menu offers sort, pin, hide column. |
| Row | pointer over | `background/hover` layer, no transition delay (≤100 ms colour transition allowed) |
| Row checkbox | click / Space | Toggles selection, and the toolbar switches to Selection mode. Shift+click selects a range. |
| Header checkbox | click | Selects all rows on the page. Show "Select all N results" in the Selection toolbar for server data. Mixed when some rows are selected. |
| Expand control | click / Enter / Space / → ← | Opens or closes the Detail row (or tree children). Update `aria-expanded`. |
| Cell (editable) | double-click / Enter / F2 / start typing | Enters Editing. Enter = commit and move down. Tab = commit and move right. Esc = cancel. Invalid → Error state + message; the value is kept so the user can fix it. Success state shows for about 2 s after the save resolves. |
| Done check | click / Space | Toggles done. The Text style changes to *Done* (muted + strikethrough). |
| Toolbar search segment | type | Filters with a 250 ms debounce. Shows a clear (×) button when it has a value. |
| Clear selection | click | Clears all selection and returns to Default mode. |
| Pagination | click | Changes page, keeps the sort and filters, and moves focus to the table body's first row. |
| Rows per page | change | Resets to page 1 |

**Motion (proposed; Figma has no motion spec):**

| Element | Trigger | Animation | Duration | Easing |
|---|---|---|---|---|
| Row hover layer | enter or leave | colour fade | 100 ms | ease-out |
| Detail row | open or close | height plus opacity | 150 ms | ease-out |
| Expand chevron | toggle | rotate 90° | 150 ms | ease-out |
| Toolbar | mode change | crossfade | 120 ms | ease-out |

Disable all of them under `prefers-reduced-motion: reduce`.

---

## 6. Loading, empty and error (proposed, using existing MDS components)

| Situation | Spec (current code prop) |
|---|---|
| Loading (`loading`) | Keep the header. Show skeleton rows using the current density height: page size, max 10. Toolbar controls disabled. `aria-busy="true"` on the table. |
| Empty, no data (`emptyState`) | The header stays. A body row spans all columns with Empty state *Component level* (No data), centred, min-h 240. |
| Empty, filtered | The same block with the "No search result" type: "No results for '…'", plus a **Clear filters** action. |
| Load error (`loadError`, `onRetry`) | Toolbar *Notice* slot shows an inline Alert, Tone Critical, with a **Retry** action. The body keeps the last good data if there is any; otherwise the empty block shows "Couldn't load data". |
| Partial row error | Row state Error, plus Cell message or tooltip on the failing cell(s) |

---

## 7. Responsive (proposed)

| Width | Behaviour |
|---|---|
| ≥1024 | Full layout. Columns at their set widths; extra width goes to the first flexible text column. |
| 768–1023 | Same layout, with the grid scrolling horizontally. Pin the first column (selection + primary entity) so the row stays identifiable. The Title bar actions wrap under the title. |
| <768 | Horizontal scroll stays. Do **not** turn rows into cards in this component (a card list is a different pattern). The toolbar wraps: Filters on one line, Controls on the next. The footer stacks: range and nav on one line, rows per page hidden. Suggested density: Compact. |

The table never makes the page body scroll sideways. Only the Grid area scrolls (`overflow-x: auto`, `min-w-0` on its parent).

---

## 8. Content rules and edge cases (truncation from Figma; the rest proposed)

- **Truncation:** every text line is one line with an ellipsis. The full text goes in the `title` attribute and in the accessible name. The exception is Text *Done* and two-line cells, which wrap only by design (primary + secondary).
- **Minimum column widths by content:**
  - Checkbox: 48.
  - Actions: 72.
  - Trend / Sparkline: 112.
  - Status badge: 104.
  - Progress ring: 96.
  - Progress bar: 160.
  - Entity: 200.
  - Number: 120.
  - Date: 140.
  - Text: 120.
- **Numbers:** right aligned, `tabular-nums`, locale formatting from `Intl.NumberFormat`. Negative values use a real minus (−).
- **Long strings:** test with 2× length (German, Portuguese). Headers truncate before their sort icon is pushed out.
- **Missing data:** show "—" (em dash) in `foreground/neutral/subtle`, never empty. Tags with no items show "—".
- **Large data:** use virtualisation (`Virtualized` story) above 200 rows. Keep the header sticky.
- **RTL:** start/end aligned with logical properties (`ps-`, `pe-`, `text-start`, `text-end`).

---

## 9. Accessibility

- **Semantics:**
  - Use `<table>` semantics by default.
  - Use `role="grid"` **only** when cell-level keyboard navigation is enabled (`enableCellSelection` / editing). Code already follows this rule.
- **Sorting:** `aria-sort` on sortable header cells: `none` / `ascending` / `descending`. The sort control is a `<button>` inside `th`.
- **Selection:**
  - Row checkbox `aria-label="Select {primary text}"`.
  - Header checkbox `aria-label="Select all rows on this page"`, `aria-checked="mixed"` when partial.
  - Selected rows get `aria-selected="true"` (grid mode).
  - Announce "3 selected" in a polite live region when selection changes.
- **Expand:** the button has `aria-expanded` and `aria-controls` pointing at the detail row id.
- **Editable cells:**
  - Label the editor with the column header and row name.
  - On error, set `aria-invalid="true"` and `aria-describedby` to the message.
- **Sparkline and Progress:** `role="img"` with an `aria-label` that includes the value ("Trend up 12.7% over 30 days", "Progress 75%").
- **Focus order:**
  1. Title bar actions
  2. Toolbar (Filters → Controls)
  3. Header cells
  4. Body
  5. Footer (Rows per page → Pagination)

  In grid mode, one Tab stop enters the grid and arrow keys move. Home/End go to the row's first/last cell. Ctrl+Home/End go to the grid's first/last cell. PageUp/PageDown move by a viewport.
- **Contrast:**
  - All text pairs above pass AA in Light, Dark and Inverse (token bench).
  - Don't put muted text on `background/selected` in Dark.
  - Disabled text is exempt.

---

## 10. Templates → Storybook recipes

Story file: `data-table.templates.stories.tsx`, title *Components/DataTable/Templates*. One story per Figma template, with the same name. Each recipe uses `<DataTable>` with columns and fictional sample data. No new component per template.

| Figma template | Node | Story status |
|---|---|---|
| Work queue | `17988:39950` | ✅ `WorkQueue` (+ `WorkQueueSelection`) |
| Directory | `17992:15767` | ❌ add `Directory` |
| Review list with detail | `17992:18180` | ✅ `ReviewListWithDetail` |
| Grouped summary | `17992:20221` | ❌ add `GroupedSummary` |
| Task list | `17992:192036` | ❌ add `TaskList` |
| Editable grid ("Property schedule") | `17992:195732` | ❌ add `EditableGrid` (see the `InlineEditing` story in data-table.stories) |
| **Client portfolio** (new) | `18226:48695` | ❌ add `ClientPortfolio` (spec below) |

### 10.1 `ClientPortfolio` recipe

Settings:

- Standard density.
- No title bar and no footer, as in Figma. Add a variant story with both turned on.
- 4 sample rows.
- Initial sort: Customer ascending.

| # | Column id | Header | Width | Align | Sortable | Content | Sample (row 1) |
|---|---|---|---|---|---|---|---|
| 0 | `select` | (checkbox) | inside Customer cell, as in Figma, or a 48 column | — | — | Checkbox | — |
| 1 | `customer` | Customer | 260 | Start | ✅ (initial ↑) | Entity *Person*: Avatar initials + name + email | Alex Johnson · alex@marsh.com |
| 2 | `company` | Company | 180 | Start | ✅ | Entity *Company*: logo tile with initial + name | Marsh McLennan |
| 3 | `role` | Role | 160 | Start | ✅ | Text + secondary | CEO · Executive |
| 4 | `location` | Location | 190 | Start | ✅ | Entity *Location*: flag + country + time zone | United States · EST (UTC−5) |
| 5 | `balance` | Balance ($) | 150 | End | ✅ | Number + Trend | $5,143.03 · ↑ +5.2% |
| 6 | `status` | Status | 120 | Start | ✅ | Badge *Subtle*: Active = Success, Pending = Warning, Inactive = Neutral | Active |
| 7 | `progress` | Progress | 120 | Start | ✅ | Progress *Ring*, Primary | 75% |
| 8 | `trend` | Trend | 130 | Start | ❌ | Sparkline, coloured by direction | up |
| 9 | `actions` | (none) | 72 | End | ❌ | Actions: More menu only | ⋯ |

Sample rows:

1. Alex Johnson · Marsh McLennan · CEO/Executive · United States EST (UTC−5) · $5,143.03 +5.2% · Active · 75% · up
2. Aron Thompson · Guy Carpenter · Director/GTM · Malaysia MYT (UTC+8) · $6,214.22 +1.2% · Pending · 50% · flat
3. David Kim · Mercer · Lawyer/Legal · Counsel · Germany CET (UTC+1) · $9,876.54 +12.7% · Active · 100% · up
4. Emma Wilson · Oliver Wyman · Developer/Platform · IC3 · Spain CET (UTC+1) · $3,456.45 −0.4% · Inactive · 25% · down

---

## 11. Current code vs this spec (verified 30 Oct, commit `b55258a`)

**Already aligned — keep:**

- Density variables and values (`DENSITY_VARS`).
- Header and row heights driven by them.
- Row hover via the `background/hover` layer over the row surface.
- Header fill `background/neutral/subtle`.
- `aria-sort`.
- `role="grid"` only in cell-selection mode.
- Detail cards and card parts.
- Toolbar button, group, segment and search parts.
- Compact pagination with jump.
- Skeleton loading, empty and load-error props.
- The template stories that exist.

**Differs — fix (detailed in section 13):**

1. **Row height:** fixed `h-[var(--dt-row-h)]` in code vs a minimum height in Figma (decision **D1**).
2. **Selection colour:** code uses `--role-bg-selected-subtle` + a 3px left edge in `--role-interactive-primary`; Figma uses `background/selected` with no edge (decision **D4**).
3. **`--role-*` leftovers:** `--role-interactive-primary` (active colour, selection edge), `--role-border-focus` (focus ring colour), `--role-fg-neutral-subtle`, `--role-bg-selected-subtle`. Replace them with `--mds-color-*`.
4. **Density code names:** Figma Dev Mode shows `--mds-size-table-row-height` and others, but code defines `--dt-*`. Add the `--mds-*` names (section 13, T2).
5. **`gap-sm`** has no variable.
6. **Missing content types:** *Alerts*, *Tags* (as a cell part), *Done check*, *Cell message* (inline), *Tree* indent spacer, and the `Indent = Aligned / Compact` option.
7. **Missing template stories:** 5 (section 10).
8. **Tone words:** the Figma Progress tone `Primary` is code `'default'`; status words follow the contract (section 12, **D5**).

---

## 12. Open decisions

Don't decide these in code. Keep current behaviour and leave a `// DECISION: Dn` comment.

| ID | Question | Figma | Code today | Recommendation |
|---|---|---|---|---|
| D1 | Fixed row height or minimum height? | min-height 48, rows grow with content (decision of 22 Oct) | fixed `h-[--dt-row-h]` | Figma: `min-h-[var(--dt-row-h)]`, so two-line and Cell message cases don't clip |
| D2 | Control radius | 2px toolbar controls | 4px (`CONTROL_RADIUS`) | Waits on the system-wide radius decision; use `CONTROL_RADIUS` |
| D3 | Banded or striped? | Row state `Banded` | `striped` prop | Keep the `striped` prop; Figma may rename |
| D4 | Selected row look | `background/selected`, no edge | `role-bg-selected-subtle` + 3px primary edge | Figma colour. Keep the edge only if research shows it is needed for scanning. |
| D5 | Tone vocabulary | `Critical`, `Primary` (progress) | `danger` / `error`, `default` | Accept `critical` as canonical, with `danger`/`error` as deprecated aliases (contract of 22 Oct) |

---

## 13. Implementation tasks (in order)

**T1 — Token cleanup in `data-grid-table.tsx` and toolbar/pagination parts**

- **Change:** replace every `var(--role-*)`:

  | From | To |
  |---|---|
  | `--role-border-focus` | `--mds-color-border-focus-default` |
  | `--role-interactive-primary` | `--mds-color-background-primary-default` (selection indicators) or `--mds-color-foreground-primary-default` (icons / text) |
  | `--role-fg-neutral-subtle` | `--mds-color-foreground-neutral-subtle` |
  | `--role-bg-selected-subtle` | `--mds-color-background-selected` (D4) |

- **Accept when:**
  - `grep -n "role-" src/components/ui/data-grid*.tsx` shows 0 hits.
  - `dark:check` passes.

**T2 — Density variables under their Figma code names**

- **Change:**
  - Emit `--mds-size-table-row-height`, `--mds-size-table-header-height`, `--mds-space-table-cell-inset-x`, `--mds-space-table-cell-inset-y`, `--mds-space-table-cell-gap`, `--mds-space-table-cell-gap-sm` and `--mds-space-table-bar-inset-y` from `DENSITY_VARS`.
  - Keep `--dt-*` as aliases of the new names, or migrate usages.
  - Expose `data-density="compact|standard|comfortable"` on the grid root.
- **Accept when:**
  - Dev Mode code names resolve in the browser.
  - The density story shows 40 / 48 / 64 rows and 32 / 40 / 48 headers.

**T3 — Row height as a minimum (D1)**

- **Change:** cells use `min-h-[var(--dt-row-h)]` and `items-center`. Virtualisation keeps an estimate equal to the row height.
- **Accept when:**
  - A two-line Entity cell and a Cell message both fit without clipping.
  - One-line rows stay at exactly 48 in Standard.

**T4 — Missing content parts in `data-grid-cells.tsx`**

- **Add** `DataGridCellAlerts`, `DataGridCellTags` (max 3 + "+N"), `DataGridDoneCheck` (button, `aria-pressed`), `DataGridCellMessage` (tone critical | success) and a tree `indent` helper (24/level, `aligned | compact`).
- **Accept when:**
  - Each part has a story with every option.
  - Each has a unit test for its accessible name.

**T5 — Template recipes**

- **Add** the stories `Directory`, `GroupedSummary`, `TaskList`, `EditableGrid` and `ClientPortfolio` (section 10). Same names and content as Figma.
- **Accept when:** each story renders in Light, Dark and Inverse (`data-surface="inverse"` decorator) and passes axe.

**T6 — States audit**

- **Check** every state in section 5 against code. Add what is missing:
  - header-cell hover layer;
  - page item hover layer;
  - toolbar Selection mode with Count *Strong*;
  - Success cell state auto-clearing after 2 s;
  - live region for selection count.
- **Accept when:** a keyboard-only run of the `FullFeatured` story reaches every control, with a visible focus ring.

**T7 — Tests**

- **Add** test files for `data-grid`, `data-grid-table`, `data-grid-toolbar`, `data-grid-pagination` and `data-grid-cell-edit`. These are currently untested.
- **Cover:** sorting announces through `aria-sort`; selection toggles the toolbar mode; Esc cancels an edit; the expand button toggles `aria-expanded`; density changes the row height.
- **Accept when:** the coverage threshold is not lowered.

**Definition of done (whole hand-off):**

- No hex values.
- No `--role-*` in `data-grid*`.
- All stories pass `dark:check` and axe in the three modes.
- Visual check against the Figma node ids in the appendix at 100%:
  - heights;
  - paddings;
  - colours per state;
  - focus rings.
- `CHANGELOG.md` entry under *Unreleased*.

---

## Appendix — Figma node ids (branch `EWYkndq17wpDP3pwcz1zM4`)

| Part | Node |
|---|---|
| Data table (organism) | `17280:11036` |
| Title bar | `17277:10785` |
| Toolbar (Default / Selection) | `17279:11510` |
| Toolbar button / segment / group | `17298:23958` / `17298:24026` / `17298:24031` |
| Header row / Header cell | `17280:10982` / `17228:2863` |
| Row / Cell | `17234:5191` / `17228:2516` |
| Content: Text / Number / Entity / Progress / Trend / Sparkline / Link / Date / Tags / Alerts / Actions | `17224:2232` / `17224:2247` / `17227:2286` / `17227:2377` / `17224:2225` / `17227:2387` / `17362:2520` / `17224:2248` / `17227:2287` / `17227:2295` / `17227:2388` |
| Content: Editable / Tree | `17228:2358` / `17234:5130` |
| Control: Expand / Indent / Done check / Drag handle | `17228:2300` / `17228:2308` / `17234:4928` / `17228:2301` |
| Cell message | `17228:2363` |
| Detail row / Detail card | `17263:9037` / `17263:8939` |
| Footer / Pagination / Page item / Rows per page / Count | `17277:10853` / `17278:10958` / `17278:10838` / `17276:10737` / `17276:10736` |
| Templates section | `17988:39949` |
| Template: Client portfolio | `18226:48695` |

Read-only Figma access for the agent (if it has the Figma MCP): `get_design_context` / `get_screenshot` on the node ids above, file key `EWYkndq17wpDP3pwcz1zM4`. Never use the main file key.
