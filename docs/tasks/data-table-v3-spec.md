# Data Table V3 — Figma build spec

**Status:** reference · **Extracted:** 2026-10-30 (read-only, Plugin API) · **Used by:** [`data-table-v3.md`](data-table-v3.md)

Measurements read from the Figma branch `EWYkndq17wpDP3pwcz1zM4`, page *Table New Component (WIP)*. Part 1 is the shell (frame, title bar, toolbar, header, rows, cells, footer); part 2 is cell content. If the Figma file changes, re-extract — do not hand-edit numbers here.

---

# Part 1 — Shell

Every value below was read from the node. Where a value couldn't be read, the entry says so.

Conventions in this doc
- Sizing: `FIXED` = explicit px, `HUG` = fit-content, `FILL` = flex:1 / stretch.
- Padding is listed T,R,B,L.
- **SIL** = Figma "strokes included in layout". It is ON for every container in this set (Data table, Footer, Toolbar button, Toolbar group, Cell, Row, Header row). So a 1px stroke **takes up layout space**, the same way `box-sizing: border-box` + `border: 1px` does in CSS. Use real borders, not box-shadow, for these strokes and the numbers below match 1:1.
- Colour is given as `variable name (Light hex)`. Every colour in these components is bound to a variable. The only unbound colours found are inside icon instances whose vectors have no fills (Pin and Menu icons; see Header cell).
- Light is the default (unset) colour mode. The specimen sets only an explicit **DENSITY = Standard** mode.

---

## 0. Tokens used

### 0.1 Density collection (`DENSITY`; modes Standard / Compact / Comfortable)

| Variable | Standard | Compact | Comfortable | Used by |
|---|---|---|---|---|
| `space/table-cell/inset-x` | 16 | 12 | 20 | cell/header L/R padding; title bar / toolbar / footer L/R padding; title bar top padding |
| `space/table-cell/inset-y` | 4 | 4 | 12 | cell/header T/B padding |
| `space/table-cell/gap` | 8 | 8 | 12 | gaps in cells, title bar, toolbar, footer, pagination |
| `space/table-cell/gap-sm` | 4 | 4 | 4 | header label↔sort icon; pagination nav; query field |
| `space/table-bar/inset-y` | 8 | 4 | 12 | toolbar / footer T/B padding; title bar bottom padding; notice bottom padding |
| `size/table-row/height` | 48 | 40 | 64 | Cell `minHeight` |
| `size/table-header/height` | 40 | 32 | 48 | Header cell `minHeight` |

All of these alias `Space-N` primitives, e.g. `Space-16`.

### 0.2 Static spacing (collection `DEVICE LAYOUT`; same value at every breakpoint)
`Spacing/3xs (static)` = 4 · `Spacing/2xs (static)` = 8 · `Spacing/xs (static)` = 12. The toolbar button, toolbar segment and tooltip use these. **They do not change with density.**

### 0.3 Radius (collection `BORDER RADIUS`)
`V3/Small` = 2 · `V3/Medium` = 4 · `V3/Large` = 8 · `V3/Full` = 1000.

### 0.4 Colour variables (collection `COLOR`; modes Light / Dark / Inverse)

| Variable | Light | Dark |
|---|---|---|
| `color/background/default` | #fdfcfa (neutral/50) | #1f1e1b |
| `color/background/neutral/subtle` | #faf7f4 (neutral/150) | #191816 |
| `color/background/neutral/default` | #ebe7e2 (neutral/300) | #3d3c37 |
| `color/background/hover` | #ebf7ff (blue/100) | #ffffff @5% |
| `color/background/selected` | #ceecff (blue/250) | #262522 |
| `color/background/critical/subtle` | #ffe8e8 (red/250) | #472625 |
| `color/background/critical/default` | #c63431 (red/850) | #ec4540 |
| `color/background/success/subtle` | #f0f6ed (green/100) | #294030 |
| `color/background/input/default` | #ffffff (neutral/0) | #191816 |
| `color/background/primary/default` | #000f47 (blue/1000) | #3d7aff |
| `color/overlay/neutral/hover` | #000000 @8% (alpha/black/8) | #ffffff @10% |
| `color/overlay/neutral/pressed` | #000000 @12% (alpha/black/12) | #ffffff @15% |
| `color/border/subtle` | #dedbd6 (neutral/350) | #494843 |
| `color/border/default` | #7b7974 (neutral/750) | #94918c |
| `color/border/input/default` | #62615c (neutral/850) | #adaaa5 |
| `color/border/input/hover` | #000f47 (blue/1000) | #ceecff |
| `color/border/critical/default` | #c63431 | #ec4540 |
| `color/border/success/default` | #2f7500 (green/1000) | #57c67a |
| `color/border/focus/default` | #3d7aff (blue/650) | #5e9aff |
| `color/border/focus/inner` | #ffffff | #000000 |
| `color/foreground/primary/default` | #000f47 | #ceecff |
| `color/foreground/neutral/default` | #3d3c37 (neutral/1000) | #f7f3ee |
| `color/foreground/neutral/subtle` | #56544f (neutral/900) | #c5c2bd |
| `color/foreground/disabled` | #878580 (neutral/700) | #7b7974 |
| `color/foreground/input/default` | #000f47 | #f7f3ee |
| `color/foreground/input/placeholder` | #6f6d68 | (not resolved) |
| `color/foreground/critical/default` | #af2625 (red/900) | #ff9d9d |
| `color/foreground/success/default` | #2f7500 | #c3e3ae |
| `color/foreground/warning/default` | #8f5400 | (not resolved) |
| `color/foreground/on-critical` / `on-success` | #ffffff | (not resolved) |

### 0.5 Typography

The family is **Noto Sans**, bound to `Typography/Family/Body`. Letter-spacing is 0 everywhere.

| Text style name | Size / line-height | Weight | Variables |
|---|---|---|---|
| `Headings - Small - Application platform/Heading 4` | 18 / 24 | Bold | `Typography/Size/lg`, `Line height/md`, `Style/Bold` |
| `Body/Small/Regular` | 14 / 20 | Regular | `Typography/Size/sm`, `Line height/sm` |
| `Body/Small/Bold` | 14 / 20 | Bold | same, `Style/Bold` |
| `Body/Extra Small/Regular` | 12 / 16 | Regular | `Typography/Size/xs`, `Line height/xs` |
| (no style) count badge | 12 / 16 | Bold | **unbound**: raw Noto Sans Bold 12/16 |

### 0.6 Focus ring (`Focus border` component, Rounded=No)

It is a double ring:
- **Outer:** 2px `color/border/focus/default` (#3d7aff), radius 4.
- **Inner:** 2px `color/border/focus/inner` (#ffffff), radius 2. It sits immediately inside the blue ring.

Each component places the ring in one of two ways:

| Placement | Used by | CSS equivalent |
|---|---|---|
| **Outset**: ring frame at −2,−2 | Toolbar button, Page item | `box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3d7aff` (white 0–2px outside the edge, blue 2–4px outside) |
| **Inset 0**: frame at +2,+2 | Header cell, Row, Toolbar segment | blue from 0–2px inside the edge, white from 2–4px inside. `box-shadow: inset 0 0 0 2px #3d7aff, inset 0 0 0 4px #fff` |
| **Inset 1**: frame at +3,+3 | Cell | blue 1–3px inside, white 3–5px inside |

The Toolbar button "Disabled" variant has no focus-ring layer.

---

## 1. Data table (outer) — `17280:11036`

| Prop | Value |
|---|---|
| Size | 1040×480, FIXED/FIXED (specimen: 1262×494) |
| Layout | vertical, gap 0, padding 0 |
| Radius | 8, bound to `V3/Large` (all 4 corners) |
| Fill | `color/background/default` #fdfcfa |
| Stroke | 1px all sides, inside, SIL → content inset 1px. Colour `color/border/subtle` #dedbd6 |
| Clip content | **false** on the outer frame. Slots Header/Footer and the Grid frame each clip. |
| Children | `Header` slot (FILL/HUG, vertical, clip) → `Grid (horizontal scroll)` frame (FILL/FILL, clip) → `Grid content` (vertical) → `Columns` slot (FILL/HUG) + `Body` slot (FILL/FILL, clip) → `Footer` slot (FILL/HUG, clip) |
| Props | Header/Columns/Body/Footer = SLOT; `Has header` = true; `Has footer` = true |

---

## 2. Title bar — `17277:10785`

| Part | Value |
|---|---|
| Root | width FIXED 1040 (FILL when used), height HUG = 70. Vertical, gap 8 (`table-cell/gap`), padding **16,16,8,16** (T/L/R = `table-cell/inset-x`; B = `table-bar/inset-y`). No fill, no stroke. |
| Top | horizontal, gap 8, cross-axis centre, FILL/HUG |
| Heading | vertical, gap **2** (unbound), FILL/HUG |
| Title | `Heading 4`: Noto Sans Bold 18/24, `color/foreground/neutral/default` #3d3c37 |
| Meta | `Body/Small/Regular` 14/20, `color/foreground/neutral/subtle` #56544f |
| Actions slot | hidden by default. Horizontal, gap 8. Holds the MDS `Button` (Primary, Small; 32h, pad 4,8,4,8, r=2). |
| Tabs slot | hidden by default. Horizontal, gap 8. Holds the `Tabs` instance (48h, gap 24). |
| Props | Title (text), Meta (text), Has meta = true, Has actions = false, Has tabs = false |

Specimen measurements: title top at y=17 (1px border + 16 padding), meta top at y=43 (17 + 24 + 2). The title bar is 70 tall: 16 + 24 + 2 + 20 + 8.

---

## 3. Toolbar — `17279:11510` (Mode = Default | Selection)

| Part | Value |
|---|---|
| Root | width FIXED (FILL when used), vertical, gap 0, no fill, **no stroke** (there is no divider under the toolbar) |
| Bar | horizontal, **space-between**, cross-axis centre, gap 8, padding **8,16,8,16** (`table-bar/inset-y`, `table-cell/inset-x`), clip. Height 48 (8+32+8). |
| Default: `Filters` slot | horizontal, gap 8, centre. Example content: Toolbar group (query), Toolbar button "Filters" |
| Default: `Controls` slot | horizontal, gap 8, centre. Example content: Toolbar buttons "Columns" (icon-only, 34w) and "Actions"; MDS `Button` Primary Small "Add" |
| Selection: `Selection` frame → `Bulk actions` slot | gap 8. Content: a Toolbar group made of segments: Text "3 selected" → Button "Assign" → Button "Change status" → Button "Delete" |
| Selection: right side | Toolbar button "Clear selection" with the `close` icon |
| `Notice` slot | hidden by default (`Has notice` = false). Vertical, padding **0,16,8,16**. Holds `Alert` (Type=Inline, Tone=Critical), 56h. |
| Mode diff | **No fill or stroke difference between Default and Selection.** Only the slot contents change. |

Specimen: 48h. Filters = Search group 242w, then "All queues" 115w, then "Status" 112w with count "2". Controls = Columns 34w, Export 34w, Actions 95w, Primary button "New ticket" 135w.

---

## 4. Toolbar button — `17298:23958`

| Prop | Value |
|---|---|
| Size | width HUG, height FIXED **32** |
| Layout | horizontal, gap **4** (`Spacing/3xs`), padding **0,8,0,8** (`Spacing/2xs`), cross-axis centre |
| Effective inset | SIL plus a 1px border, so it is 9px from the outer edge to the icon. CSS: `border:1px; padding:0 8px`. |
| Radius | 2 (`V3/Small`) |
| Stroke | 1px inside, `color/border/default` #7b7974 |
| Fill | `color/background/default` #fdfcfa |
| Icon | 16×16 instance (default `filter`; swappable). Vector fill `color/foreground/neutral/default` #3d3c37 |
| Label wrap | horizontal, padding **0,4,0,4** (unbound), so the label has 4px of extra side space |
| Label | `Body/Small/Regular` 14/20, `color/foreground/neutral/default` #3d3c37 |
| Count badge | 20×20 FIXED, radius 10, padding 0,6, centred. Fill `color/background/neutral/default` #ebe7e2. Text Noto Sans **Bold 12/16**, `color/foreground/neutral/default`. Font and size are unbound (no text style). |
| Width check | 1+8+16+4+(4+40+4)+8+1 = 86 ✓ |
| Props | Label, Has label, Has icon, Icon (swap), Has count = false, Count, Focus ring = false, State |

| State | Diff from Default |
|---|---|
| Default | — |
| Hover | adds a second fill layer `color/overlay/neutral/hover` (#000 @8%) on top of the background |
| Pressed | adds the overlay `color/overlay/neutral/pressed` (#000 @12%) |
| Disabled | label, icon and count text → `color/foreground/disabled` #878580. Fill and stroke are unchanged. No focus-ring layer. |
| Focus | ring is **outset** (−2,−2; 90×36 for an 86×32 button). See 0.6. |

---

## 5. Toolbar segment — `17298:24026` (Type Field/Text/Input/Button/Menu × State Default/Hover)

This is a segment *inside* a Toolbar group. It has no stroke, radius or fill of its own; the group provides those.

| Prop | Value |
|---|---|
| Size | height FIXED 32. Width HUG; Input type is FIXED 160. |
| Layout | horizontal, gap **8** (`Spacing/2xs`), padding **0,12,0,12** (`Spacing/xs`); Menu type is **0,8,0,8**. Cross-axis centre. |
| Divider | absolute rectangle, 1px wide, full height, pinned right (x = w−1). `color/border/default` #7b7974. Prop `Divider` = true. In the query group, the last (Menu) segment has no divider. |
| Muted fill | absolute rectangle stretched to the full segment, `color/overlay/neutral/hover`. Hidden unless `Muted` = true. |
| Icon | 16×16. Field = `person`, Input = `search`, Menu = `More_vert`. Vector `color/foreground/neutral/default`. |
| Label | `Body/Small/Regular` 14/20 |

| Type | Label colour | Notes |
|---|---|---|
| Field | `color/foreground/neutral/default` #3d3c37 | icon + label, 88w |
| Text | `color/foreground/neutral/subtle` #56544f | label only, no icon, no focus ring, no Hover variant |
| Input | `color/foreground/neutral/subtle` #56544f (placeholder) | FIXED 160w; label is FILL |
| Button | `color/foreground/neutral/default` | icon + label |
| Menu | — | icon only, 32×32 |

| State | Diff |
|---|---|
| Hover | the segment's own fill becomes `color/overlay/neutral/hover` (#000 @8%) |
| Focus | ring is **inset** (+2,+2). See 0.6. |

## 6. Toolbar group — `17298:24031`

| Prop | Value |
|---|---|
| Size | width HUG, height FIXED 32 |
| Layout | horizontal, gap 0, padding 0, centre, **clip** (the segment hover fill is clipped to the radius) |
| Radius | 2 (`V3/Small`) |
| Stroke | 1px inside (SIL), `color/border/default` #7b7974 |
| Fill | `color/background/default` #fdfcfa |
| Slot | `Segments`: horizontal, gap 0 |
| Main-component example | Field "Name" (88) → Text "contains" (80) → Input "Search…" (160) → Menu (32) = 362 total |
| Specimen use | a "Search tickets" group holding one Input segment (240×32); group is 242×32 |

Anomaly: inside the main component the Segments slot measures 360×20 (the segments render 20 tall). In the specimen they render 32 tall. Treat **32** as correct.

## 7. Query (deprecated) — `17276:10730` (brief)

- 360×32 FIXED, r=2. Fill `color/background/input/default` #fff. Stroke 1px `color/border/input/default` #62615c.
- Sub-frames Field and Operator: pad 0,8 (`table-cell/gap`), gap 4, 1px right stroke `border/input/default`, with a `keyboard_arrow_down` 16px icon.
- Value frame: FILL, pad 0,8, gap 8, `search` icon. Placeholder colour `color/foreground/input/placeholder` #6f6d68. Field and operator text use `color/foreground/input/default` #000f47.
- Focus state: root stroke becomes 2px `color/border/focus/default`.
- Toolbar group + segments replace this component. **Do not build it.**

## 8. Count — `17276:10736`

| Style | Text |
|---|---|
| Default | `Body/Small/Regular` 14/20, `color/foreground/neutral/subtle` #56544f |
| Strong | `Body/Small/Bold` 14/20, `color/foreground/neutral/default` #3d3c37 |

Root: horizontal, HUG/HUG, no padding.

---

## 9. Footer — `17277:10853`

| Prop | Value |
|---|---|
| Size | width FIXED 1040 (FILL when used), height HUG = **49** |
| Layout | horizontal, gap 8, padding **8,16,8,16** (`table-bar/inset-y`, `table-cell/inset-x`), cross-axis centre |
| Main-axis alignment | the main component says `MIN`; the instance inside Data table overrides it to **space-between**. Build it as space-between. |
| Stroke | **top only, 1px**, inside, SIL, `color/border/subtle` #dedbd6. Height = 1+8+32+8 = 49 ✓ (specimen Left slot at y=9). |
| Fill | none (the outer table bg shows through) |
| Slots | `Left` (gap 8) holds Rows per page. `Right` (gap 8) holds Pagination. Has left / Has right = true. |

## 10. Rows per page — `17276:10737`

- Horizontal, gap 8, centre, HUG (186×32).
- Label "Rows per page": `Body/Small/Regular`, `color/foreground/neutral/subtle` #56544f.
- MDS `Input` (Type=Input, Size=Small), **FIXED width 80**, height 32:
  - frame r=2, fill `color/background/input/default` #fff, stroke 1px `color/border/input/default` #62615c;
  - padding 0,4,0,8 (`Spacing/3xs` right, `Spacing/2xs` left);
  - the trailing dropdown is a Tertiary Small Icon Button.

## 11. Pagination — `17278:10958`

Root: horizontal, gap 8, centre, HUG. `Range` text: `Body/Small/Regular`, `color/foreground/neutral/subtle`, e.g. "1–10 of 248".

| Type | Structure |
|---|---|
| Compact (224w) | Range + Nav (gap 4, `table-cell/gap-sm`) with First, Prev, Next, Last |
| Pages (368w) | Range + Nav: Prev, page items 1,2,3(selected),4,"…"(Disabled),25, Next |
| Jump (370w) | Range + "Page" label + `Input` (FIXED 56×32) + "of 25" label, all gap 8, then Nav: First, Prev, Next, Last |

Nav buttons are MDS **Icon Button, Tertiary, Small**:
- 32×32 FIXED, padding 6 (`Space-6`), r=2 (`V3/Small`), no fill, no stroke;
- icon 20×20 (`Marsh Icon Placeholder/Size=20px`) wrapping `first-page`, `keyboard_arrow_left`, `keyboard_arrow_right` or `last-page`;
- enabled icon colour `color/foreground/primary/default` #000f47;
- Disabled (State=Disabled) icon colour `color/foreground/disabled` #878580.

Props: Range (text), Has range, Has first/last, Total pages (text).

## 12. Page item — `17278:10838`

| Prop | Value |
|---|---|
| Size | 32×32 FIXED |
| Layout | horizontal, padding 0,8,0,8 (unbound), centre/centre |
| Radius | **4** (`V3/Medium`). Note: this is not 2. |
| Label | `Body/Small/Regular` 14/20, `color/foreground/neutral/default` |

| State | Diff |
|---|---|
| Default | no fill |
| Hover | fill `color/overlay/neutral/hover` (#000 @8%) |
| Selected | fill `color/background/neutral/default` #ebe7e2; label `Body/Small/Bold` |
| Disabled | label `color/foreground/disabled` #878580; no focus-ring layer. Used for the "…" item. |
| Focus | ring **outset** (−2,−2) |

---

## 13. Header row — `17280:10982`

- Horizontal, gap 0, padding 0, FIXED width / HUG height = **40**.
- No fill and no stroke of its own; the header cells provide both.
- One slot, `Cells` (horizontal, gap 0).

## 14. Header cell — `17228:2863` (Align Start/End/Center × Sort None/Asc/Desc × State Default/Hover)

| Prop | Value |
|---|---|
| Size | width FIXED (200 default; per-column in use). Height HUG with **minHeight 40** (`size/table-header/height`). |
| Layout | horizontal, gap **8** (`table-cell/gap`), padding **4,16,4,16** (`table-cell/inset-y`, `table-cell/inset-x`), cross-axis centre |
| Fill | `color/background/neutral/subtle` #faf7f4 |
| Children, in order | Checkbox (20×20, hidden by default) → Content (FILL) → Pin icon (16, hidden) → Menu icon (16, `More_vert`, hidden) |
| Content | horizontal, gap 0. Main-axis alignment: Start = flex-start, End = flex-end, Center = center. It holds the `Label group`. |
| Label group | horizontal, gap **4** (`table-cell/gap-sm`): Label then Sort icon. **The icon is after the label in all three aligns, End included.** |
| Label | `Body/Small/Bold` 14/20, `color/foreground/primary/default` #000f47, text-align left in every variant |
| Sort icon 16×16 | None: `unfold_more`, `color/foreground/neutral/subtle` #56544f. Ascending: `nav-arrow-up`, `color/foreground/primary/default` #000f47. Descending: `nav-arrow-down`, `color/foreground/primary/default`. It is shown when `Sortable` = true. |
| Bottom divider | absolute rect, full width × 1, at bottom (y = h−1). `color/border/subtle` #dedbd6. `Divider` = true by default. |
| Column divider | absolute rect, 1 × full height, at right (x = w−1). `color/border/subtle`. Hidden (`Column divider` = false). |
| Pinned edge | absolute rect, 1 × full height, at right. **`color/border/default` #7b7974.** Shown when `Pinned` = true. |
| Resize handle | absolute rect **2×16**, at x = w−3, vertically centred (y=12 in 40). Radius full (`V3/Full`). `color/border/default` #7b7974. Hidden by default. |
| Checkbox | MDS Checkbox 20×20: box fill `color/background/input/default` #fff, stroke `color/border/input/default` #62615c |
| Pin / Menu icons | 16×16. Pin = `keep_off`, Menu = `More_vert`. **The icon colour can't be read**: these icon instances have no filled vectors in this file. |
| Focus | ring **inset** (+2,+2) |
| Props | Label, Sortable = true, Checkbox = false, Menu = false, Resize handle = false, Divider = true, Column divider = false, Focus ring = false, Pinned = false, Pin icon = false |

| State | Diff |
|---|---|
| Hover | adds a second fill layer `color/overlay/neutral/hover` (#000 @8%) over #faf7f4 |
| Sort Asc/Desc | the icon swaps and turns `foreground/primary/default`. The label is unchanged. |

---

## 15. Row — `17234:5191`

| Prop | Value |
|---|---|
| Size | HUG/HUG (640×48 in the component; FILL width when used). Height is driven by the cells: **48** in Standard density. |
| Layout | horizontal, gap 0, padding 0. Slot `Cells` (gap 0). |
| Stroke | none. Row separators are the cells' bottom dividers. |
| Cells inside | use **`Row state = Transparent`** (no fill), so the **Row fill is what you see** |
| Focus | ring **inset** (+2,+2), across the whole row |

| State | Row fill |
|---|---|
| Default | `color/background/default` #fdfcfa |
| Banded | `color/background/neutral/subtle` #faf7f4 |
| Hover | `color/background/default` + a second layer `color/background/hover` #ebf7ff. The hover colour is opaque in Light and white @5% in Dark. |
| Selected | `color/background/selected` #ceecff |
| Error | `color/background/critical/subtle` #ffe8e8 |
| Disabled | `color/background/default` #fdfcfa. **Identical to Default**: there is no opacity, text-colour or fill change on the Row. The disabled treatment can't be read from this component. |

## 16. Cell — `17228:2516` (Row state × Cell state)

| Prop | Value |
|---|---|
| Size | width FIXED (200 default). Height HUG with **minHeight 48** (`size/table-row/height`). |
| Layout | horizontal, gap 8, padding **4,16,4,16** (`table-cell/inset-y`, `table-cell/inset-x`), cross-axis centre |
| Content slot | horizontal, gap 8, FILL. Holds Content/Text, Checkbox, Badge, Entity, Link, Date, Editable and so on. |
| Bottom divider | absolute rect, full width × 1 at y = h−1, `color/border/subtle` #dedbd6. `Divider` = true. |
| Column divider | absolute rect, 1 × h at right, `color/border/subtle`. Hidden by default. |
| Pinned edge | absolute rect, 1 × h at right, **`color/border/default` #7b7974**. Shown when `Pinned`. |
| Focus | ring **inset 1px** (+3,+3; 194×42 for 200×48). Not present on Row state = Disabled. |
| Props | Content (slot), Divider = true, Column divider = false, Error message = false, Error tooltip = true, Focus ring = false, Pinned = false |

**Row-state fill when Cell state = None** (this matches the Row table above):
Default #fdfcfa `background/default` · Banded #faf7f4 `background/neutral/subtle` · Hover `background/default` + `background/hover` #ebf7ff · Selected #ceecff `background/selected` · Error #ffe8e8 `background/critical/subtle` · Disabled #fdfcfa `background/default` · Transparent = no fill.

**Cell-state overrides** apply on top of any row state. The fill and the 1px inside stroke (SIL, so content shrinks by 2px: 168 → 166) are the same whatever the row state:

| Cell state | Fill | Stroke (1px all sides, inside) | Bottom / column divider colour |
|---|---|---|---|
| None | (row state) | none | `color/border/subtle` |
| Editing | `color/background/input/default` #ffffff | `color/border/input/hover` #000f47 | `color/border/input/hover` |
| Error | `color/background/critical/subtle` #ffe8e8 | `color/border/critical/default` #c63431 | `color/border/critical/default` |
| Success | `color/background/success/subtle` #f0f6ed | `color/border/success/default` #2f7500 | `color/border/success/default` |

**Editable content** (`Data table/Content/Editable`, used in the Editing, Error and Success states):
- Value text `Body/Small/Regular`, `color/foreground/primary/default`.
- Caret: a 1×16 rect, `color/foreground/primary/default`.
- Status icon 16×16 (Error = `alert/critical-filled`, `color/foreground/critical/default` #af2625).
- Gap 8.

**Error message** (`Data table/Cell message`, Tone=Critical | Success): absolutely positioned at **x 0, y = h** (directly below the cell). Hidden by default.

| Part | Value |
|---|---|
| Size | HUG |
| Padding | 2,6,2,6 (`Space-2`, `Space-6`) |
| Radius | 2 (`V3/Small`) |
| Fill | Critical: `color/background/critical/default` #c63431. Success: `color/background/success/default` #2f7500. |
| Text | `Body/Extra Small/Regular` 12/16. Colour `color/foreground/on-critical` or `on-success`, both #ffffff. |

**Error tooltip** (MDS `Tooltip`, Arrow Position = Top right): absolutely positioned at x 60, y 52 (4px below a 48 cell). Visible by default in the Error states.

| Part | Value |
|---|---|
| Padding | 8 all sides (`Spacing/2xs`) |
| Radius | 4 (`V3/Medium`) |
| Fill | `color/background/default` #fdfcfa |
| Shadow | `0 4px 6px -1px #000 @10%`, `0 2px 4px -2px #000 @10%` |
| Text | `Body/Small/Regular`, `color/foreground/primary/default`, "Enter a valid value" |
| Caret | vector 12×6 at the top right (x 118, y −6), same fill as the tooltip |

**Content/Text** (default cell content; for reference):
- Primary text: `Body/Small/Regular`, `color/foreground/primary/default`, single line with ellipsis (maxLines 1).
- Optional Secondary text: `Body/Extra Small/Regular` 12/16, `foreground/neutral/subtle`.
- Style variants:

| Style | Treatment |
|---|---|
| Strong | Bold |
| Muted | `neutral/subtle` |
| Done | `neutral/subtle` + a 1px strike line |
| Success | `foreground/success/default` #2f7500 |
| Warning | `foreground/warning/default` #8f5400 |
| Critical | `foreground/critical/default` #af2625 |

End align = right-aligned text.

---

## 17. Specimen measurements

### Support queue — `17282:11238`, Light, DENSITY = Standard
Screenshot: `(screenshot not kept)`

| Measure | Value |
|---|---|
| Whole table | 1262×494. Radius 8 (`V3/Large`). 1px inside border `color/border/subtle` #dedbd6. Fill `color/background/default` #fdfcfa. Not clipped. |
| Title bar | 70h. Title "Support queue": Noto Sans Bold 18/24 `Heading 4`, `foreground/neutral/default`, top at y=17. Meta: 14/20 Regular `foreground/neutral/subtle`, top at y=43. |
| Toolbar | **48h** (y 71–119), padding 8/16, no divider below it |
| Header row | **40h**. Bg #faf7f4. Bottom 1px `border/subtle`. Column widths 380 (checkbox + "Ticket"), 210, 110, 130, 180, 130, 120. "Updated" is sorted Descending. |
| Body row | **48h**. Row 2 is in Hover state (#ebf7ff). Bottom divider 1px `border/subtle`. The body is clipped to 285 (6 visible rows of 48 = 288, the last row cut off). |
| Footer | **49h**: 1px top `border/subtle` + 8 + 32 + 8. Left "Rows per page" + 80w select. Right Compact pagination "1–15 of 48" (216w). |
| Vertical sum | 1 + 70 + 48 + 40 + 285 + 49 + 1 = 494 ✓ |

### Contacts — `17282:13181` (pinned column)
- 1268×494.
- Pinned first column is 280w. 16 cells have `Pinned` = true: the header plus every body cell.
- **Pinned divider: a 1px vertical rect on the cell's right edge (x=279), `color/border/default` #7b7974.** That is darker than the normal column divider (`border/subtle` #dedbd6).
- **No shadow.** The pinned edge has no effects.
- Visible column dividers elsewhere in the specimen: 0.
- Pinned body cells have **no fill** (Row state = Transparent). If the column is sticky, the engineer must paint the row's background colour onto the sticky cell, or scrolled content will show through.

---

## 18. Open points / can't-read list

1. **Row Disabled** looks identical to Row Default. There is no fill, opacity or text colour change to read.
2. **Pin (`keep_off`) and Menu (`More_vert`) icon colour** in the header cell can't be read: the instances have no filled vectors.
3. **Count badge text** is not bound to any typography variable or text style (raw Noto Sans Bold 12/16).
4. The **Footer** main component is aligned `MIN`. Only the instance inside Data table is space-between.
5. **Toolbar group** main component renders its segments 20 tall inside the slot; the specimen renders them 32 tall.
6. **Toolbar segment Text** type has no Hover variant and no focus ring.
7. The **last row's bottom divider and the Footer top border** both exist, so a 2px line appears when the body isn't scrolled or clipped. Whether to suppress one is not specified.
8. **Toolbar button and segment** spacing uses `Spacing/*(static)` tokens, not DENSITY tokens. They stay 32h with 8/12 padding in Compact and Comfortable. Bar paddings and row heights do change with density.


---

# Part 2 — Cell content


Source: Figma `EWYkndq17wpDP3pwcz1zM4` (branch), page "Table New Component (WIP)". Extracted read-only via Plugin API on 2026-10-30.
Colours are given as `bound variable name = Light resolved hex` (the collection's mode whose name matches /light/, otherwise its default mode). Everything here is from node properties; nothing was estimated from screenshots.

Legend: **Sizing** = horizontal/vertical: `Fixed`, `Hug`, `Fill`. **AL** = auto-layout. Padding order is T,R,B,L. "abs" = absolutely positioned inside an auto-layout parent.

---

## 0. Shared foundations (they recur everywhere)

### Type styles used
| Text style | Family / weight | Size / line height | Letter spacing | Bound vars |
|---|---|---|---|---|
| `Body/Small/Regular` | Noto Sans Regular (400) | 14 / 20 | 0 | `Typography/Size/sm`=14, `Typography/Line height/sm`=20, `Typography/Family/Body`=Noto Sans, `Typography/Style/Regular` |
| `Body/Small/Bold` | Noto Sans Bold (700) | 14 / 20 | 0 | same size/lh vars |
| `Body/Extra Small/Regular` | Noto Sans Regular | 12 / 16 | 0 | `Typography/Size/xs`=12, `Typography/Line height/xs`=16 |
| `Body/Extra Small/Bold` | Noto Sans Bold | 12 / 16 | 0 | xs vars |
| `Body/Base/Regular` | Noto Sans Regular | 16 / 24 | 0 | `Typography/Size/md`=16, `Typography/Line height/md`=24 |
| `Body/Base/Medium` | Noto Sans Medium (500) | 16 / 24 | 0 | md vars |
| `Body/Base/Bold` | Noto Sans Bold | 16 / 24 | 0 | (Button label only) |
| `Platform/Body/md/Regular` | Noto Sans Regular | 14 / **18** | unreadable (not dumped) | (task-status label only — different ramp from everything else) |

No OpenType features (e.g. `tnum`) are set on any text node, including Number values.
Text case is ORIGINAL everywhere. Truncation: nodes marked "truncate" below have `textTruncation = ENDING` (single-line ellipsis).

**Primary text** = `Body/Small/Regular` 14/20, `color/foreground/primary/default` = #000f47.
**Secondary text** = `Body/Extra Small/Regular` 12/16, `color/foreground/neutral/subtle` = #56544f.

### Colour variables seen (Light)
| Variable | Hex |
|---|---|
| color/foreground/primary/default | #000f47 |
| color/foreground/neutral/subtle | #56544f |
| color/foreground/neutral/default | #3d3c37 |
| color/foreground/success/default | #2f7500 |
| color/foreground/warning/default | #8f5400 |
| color/foreground/critical/default | #af2625 |
| color/foreground/info/default | #000f47 |
| color/foreground/link/default | #0b4bff |
| color/foreground/input/default | #000f47 |
| color/foreground/disabled | #878580 |
| color/foreground/on-avatar | #ceecff |
| color/foreground/on-critical | #ffffff |
| color/foreground/on-success | #ffffff |
| color/foreground/on-primary | #ceecff |
| color/background/default | #fdfcfa |
| color/background/neutral/default | #ebe7e2 |
| color/background/primary/default | #000f47 |
| color/background/avatar/default | #000f47 |
| color/background/critical/default | #c63431 |
| color/background/success/default | #2f7500 |
| color/background/info/default | #0a3acc |
| color/background/input/default | #ffffff |
| color/background/{warning,info,critical,success}/subtle | #f8ebe0 / #ebf7ff / #ffe8e8 / #f0f6ed |
| color/border/default | #7b7974 |
| color/border/subtle | #dedbd6 |
| color/border/input/default | #62615c |
| color/border/focus/default | #3d7aff |
| color/border/{warning,info,critical,success}/default | #c25600 / #0a3acc / #c63431 / #2f7500 |

### Spacing / radius variables seen
| Variable | Value | Used for |
|---|---|---|
| space/table-cell/gap-sm | 4 | icon-to-text gaps (Trend, Alerts item, Tags, Actions, Tree trailing slot) |
| space/table-cell/gap | 8 | lead-to-text gaps (Entity, Date, Progress, Editable, Tree, Alerts groups, card parts) |
| space/table-cell/inset-x | 16 | Detail row padding + gap, Detail card padding |
| Space-2 / Space-6 | 2 / 6 | Cell message padding, Icon Button padding |
| V3/None, V3/Small, V3/Medium, V3/Large, V3/Full | 0 / 2 / 4 / 8 / 1000 | radii |

### Icons
All icons are 16×16 instances (Material-symbol names), glyph inside a ~13.3×13.3 container, unless noted. Glyph colour is a fill on the inner vector.

---

## 1. Content/Text — `17224:2232` (component set, 14 variants: Style × Align)

Props: `Primary text` (TEXT, "Text"), `Secondary text` (TEXT, "Secondary"), `Show secondary` (BOOL, false).

| Part | Spec |
|---|---|
| Root | 160×20 default; Sizing **Fill / Hug**; AL vertical, gap 0, padding 0; cross-axis align: Align=Start → MIN (left), Align=End → MAX (right). No fill, no stroke, no radius. |
| Primary | Fill/Hug, `textAutoResize=HEIGHT`, truncate. `Body/Small/Regular` 14/20, colour per Style (below). `textAlign` LEFT (Start) / RIGHT (End). |
| Secondary (hidden by default) | Fill width, 16 high. `Body/Extra Small/Regular` 12/16, `color/foreground/neutral/subtle` #56544f, truncate, same alignment as primary. |

Per-Style diff (Primary only; Secondary never changes):
| Style | Weight / style | Primary colour |
|---|---|---|
| Default | Regular, `Body/Small/Regular` | color/foreground/primary/default #000f47 |
| Strong | **Bold**, `Body/Small/Bold` | color/foreground/primary/default #000f47 |
| Muted | Regular | color/foreground/neutral/subtle #56544f |
| Success | Regular | color/foreground/success/default #2f7500 |
| Warning | Regular | color/foreground/warning/default #8f5400 |
| Critical | Regular | color/foreground/critical/default #af2625 |
| Done | Regular, colour color/foreground/neutral/subtle #56544f, **strikethrough drawn as a rectangle**, not text-decoration (see below) |

Done structure: root gets `clipsContent=true`; Primary is wrapped in frame "Strike" (Hug/Hug, AL horizontal, gap 0) and the text becomes Hug width (`WIDTH_AND_HEIGHT`, **no truncation**). A 1px-high rectangle "Strike line", abs at y=10 (vertical centre of the 20px line), Fill width of the text, fill `color/foreground/neutral/subtle` #56544f. In code: `line-through` in #56544f gets the same result; the rectangle sits at exactly 10px from the top.

## 2. Content/Number — `17224:2247` (4 variants: Style Default/Strong × Align End/Start)

Props: `Value` (TEXT "$5,143.03"), `Show trend` (BOOL false), `Caption` (TEXT "End of month"), `Show caption` (BOOL false).

| Part | Spec |
|---|---|
| Root | 160×20; Fill/Hug; AL vertical gap 0 pad 0; cross-align End=MAX, Start=MIN. |
| Caption (hidden, child **1**, i.e. ABOVE the value) | 12/16 `Body/Extra Small/Regular`, #56544f (`neutral/subtle`), Fill width, align RIGHT/LEFT per Align. Not truncated. |
| Value | Fill/Hug, truncate, 14/20; Default = `Body/Small/Regular`, Strong = `Body/Small/Bold`; colour `color/foreground/primary/default` #000f47; text-align RIGHT (End) / LEFT (Start). No tabular-figures feature set. |
| Trend (hidden, child 3, BELOW value) | instance of Content/Trend {Direction=Up}, Hug/Hug (55×16). |

## 3. Content/Trend — `17224:2225` (Direction = Up / Down / Neutral)

Prop: `Value` (TEXT "+5.2%").

| Part | Spec |
|---|---|
| Root | Hug/Hug (55×16 Up/Down; 45×16 Neutral). AL horizontal, gap **4** (`space/table-cell/gap-sm`), pad 0, cross-align CENTER. |
| Icon (Up/Down) | 16×16 instance `trending_up` / `trending_down`; glyph 12.7×7.3. |
| Icon (Neutral) | not an icon: a TEXT "–" (en dash), 12/16 `Body/Extra Small/Bold`, Hug (6×16). |
| Value | Hug, 12/16 **`Body/Extra Small/Bold`**. |

| Direction | Icon + value colour |
|---|---|
| Up | color/foreground/success/default #2f7500 |
| Down | color/foreground/critical/default #af2625 |
| Neutral | color/foreground/neutral/subtle #56544f |

## 4. Content/Entity — `17227:2286` (Type = Person / Company / Location)

Props: `Leading` (SLOT), `Primary text` (TEXT "Alex Johnson"), `Secondary text` (TEXT "alex@marsh.com"), `Show secondary` (BOOL **true**).

| Part | Spec |
|---|---|
| Root | 200×36; Fill/Hug; AL horizontal, gap **8** (`space/table-cell/gap`), pad 0, cross-align CENTER. |
| Leading slot | Hug/Hug, AL horizontal gap 0, clips content. |
| Text column | Fill/Hug, AL vertical gap 0, clips. Primary 14/20 `Body/Small/Regular` #000f47 truncate; Secondary 12/16 `Body/Extra Small/Regular` #56544f truncate. Height 20+16 = 36. |

Leading content per Type:
| Type | Leading | Size | Details |
|---|---|---|---|
| Person | `Avatar {Size=Small, Content=Initials}` | **32×32** | radius 1000 (`V3/Full`); fill `color/background/avatar/default` #000f47; initials "AB" `Body/Base/Regular` 16/24 colour `color/foreground/on-avatar` #ceecff, centred (text node is fixed 28×12 inside a 32×32 container — rendering detail of the Avatar component). Text column = 160 wide. |
| Company | frame "Logo" (not a library component) | **24×24** | radius **4** (`V3/Medium`), fill `color/background/neutral/default` #ebe7e2, AL centred both axes, clips. Letter "M" `Body/Extra Small/Bold` 12/16, colour `color/foreground/neutral/default` #3d3c37. Text column = 168. |
| Location | instance `flags / US` (raster-like vector flag, hard-coded hexes, no variables) | **21×15** | no radius. Specimens also use `flags / DE`, `flags / ES`, `flags / MY`. Text column = 171. |

## 5. Content/Progress — `17227:2377` (Type Bar/Ring × Value 0/25/50/75/100% × Tone)

Props: `Show label` (BOOL true), `Label` (TEXT "50%"). Bar only exists in Tone=Primary; Ring exists in Primary/Success/Warning/Critical.

Common: root AL horizontal, gap **8** (`space/table-cell/gap`), pad 0, cross-align CENTER. Label = Hug, `Body/Small/Regular` 14/20, `color/foreground/primary/default` #000f47 (label colour does NOT change with tone).

### Bar
| Part | Spec |
|---|---|
| Root | 160×20, **Fill/Hug**. |
| Bar | instance `Progression bar {Percent %=<value>, Size=XSmall}`, Fill/Fixed, **height 4**, width = root − 8 − label (124 at 160 root). Radius **0** (`V3/None`) on all parts. |
| Track | fill `color/background/neutral/default` #ebe7e2. |
| Value segment | fill `color/background/primary/default` #000f47, width = value % of bar; **2px right stroke** (inside) in `color/background/default` #fdfcfa, i.e. a 2px light gap between filled part and track. At 100% the gap stroke is absent (full #000f47). At 0% only the track renders. |

### Ring
| Part | Spec |
|---|---|
| Root | 56×20, **Hug/Hug**. |
| Ring frame | **20×20** fixed. |
| Track | full ellipse 20×20, `innerRadius 0.7` → ring thickness **3px** (outer Ø20, inner Ø14), fill `color/background/neutral/default` #ebe7e2. |
| Value arc | same ellipse geometry on top, arc starts at −90° (12 o'clock) and runs clockwise: 25% → end 0°, 50% → 90°, 75% → 180°, 100% → 270°. Ends are square (it is an arc segment of a donut, not a stroked path with round caps). Absent at 0%. |

| Tone | Value arc fill |
|---|---|
| Primary | color/foreground/primary/default #000f47 |
| Success | color/foreground/success/default #2f7500 |
| Warning | color/foreground/warning/default #8f5400 |
| Critical | color/foreground/critical/default #af2625 |

(SVG equivalent: circle r=8.5, stroke-width 3, `stroke-dasharray` on a 53.4 circumference, rotate −90°, `stroke-linecap: butt`.)

## 6. Content/Sparkline — `17227:2387` (Trend = Up / Down / Neutral)

No props.

| Part | Spec |
|---|---|
| Root | 80×24, Hug/Hug, AL horizontal gap 0, cross-align CENTER. |
| Chart frame | 80×24 fixed. |
| Line | vector, stroke **1.5**, centre-aligned, cap ROUND, join ROUND, no fill. Vector is vertically centred in the 24px frame (height 17 / 16 / 5). |

| Trend | Stroke colour | Path (vector-local coords, 80 wide) |
|---|---|---|
| Up | color/foreground/success/default #2f7500 | `M0 17 L10 11 L20 14 L30 6 L40 9 L50 3 L60 5 L70 0 L80 1` |
| Down | color/foreground/critical/default #af2625 | `M0 0 L10 4 L20 1 L30 8 L40 6 L50 11 L60 9 L70 15 L80 16` |
| Neutral | color/foreground/neutral/subtle #56544f | `M0 3 L10 0 L20 5 L30 2 L40 4 L50 1 L60 4 L70 2 L80 3` |

(9 points, 10px x-step, sample data — no area fill, no end dot.)

## 7. Content/Date — `17224:2248` (single component)

Props: `Date` (TEXT "Mar 10, 2026"), `Relative` (TEXT "3 days ago"), `Show relative` (BOOL true), `Show icon` (BOOL false).

| Part | Spec |
|---|---|
| Root | 160×36, Fill/Hug, AL horizontal gap **8** (`space/table-cell/gap`), pad 0, cross-align CENTER. |
| Calendar icon (hidden) | `calendar_month` 16×16; glyph colour unreadable (no vector fill resolved while hidden). |
| Text column | Fill/Hug, AL vertical gap 0, clips. Date = `Body/Small/Regular` 14/20 #000f47 truncate; Relative = `Body/Extra Small/Regular` 12/16 #56544f truncate. |

## 8. Content/Tags — `17227:2287` (single component)

Props: `Tag 2` (BOOL true), `Tag 3` (BOOL false), `Overflow count` (BOOL false), `Overflow text` (TEXT "+2").

| Part | Spec |
|---|---|
| Root | Hug/Hug (147×24 with 2 tags), AL horizontal gap **4** (`space/table-cell/gap-sm`), pad 0, cross-align CENTER. No wrap. |
| Tag 1/2/3 | library **`Badge`** instances (Emphasis=Subtle; specimen tones: Tag 1 Warning, Tag 2 Info, Tag 3 Critical). See §20 for Badge spec. Each Hug width × **24** fixed height. |
| Overflow (hidden) | TEXT "+2", `Body/Extra Small/Regular` 12/16, `color/foreground/neutral/subtle` #56544f. Plain text, not a badge. |

## 9. Content/Alerts — `17227:2295` (single component)

Props: `Critical` (BOOL true), `Warning` (BOOL true), `None` (BOOL false), `Critical count` (TEXT "2"), `Warning count` (TEXT "1").

| Part | Spec |
|---|---|
| Root | Hug/Hug (66×20), AL horizontal gap **8**, pad 0, cross-align CENTER. |
| Critical group | Hug, AL horizontal gap **4**, clips. Icon `alert/critical-filled` 16×16 glyph #af2625 (`color/foreground/critical/default`); count `Body/Small/Regular` 14/20 #000f47. |
| Warning group | same, icon `alert/warning-filled` 16×16 glyph #8f5400 (`color/foreground/warning/default`); count 14/20 #000f47. |
| None (hidden) | TEXT "None" `Body/Small/Regular` 14/20 #56544f. |

## 10. Content/Actions — `17227:2388` (the "···" row action)

Props: `Action 1` (BOOL false), `Action 2` (BOOL false).

| Part | Spec |
|---|---|
| Root | Hug/Hug (32×32), AL horizontal gap **4**, pad 0, **main-axis align MAX (right)**, cross CENTER. |
| Action 1 / Action 2 (hidden) / More | library **`Icon Button {Type=Tertiary, State=Default, Size=Small, Destructive=No}`**, **32×32**, padding 6 all sides (`Space-6`), radius **2** (`V3/Small`), no fill/stroke in Default. |
| More icon | `Marsh Icon Placeholder {Size=20px}` → `more_horiz`, **20×20**; glyph colour `color/foreground/primary/default` #000f47. |

## 11. Content/Link — `17362:2520` (State = Default / Hover)

Props: `Label` (TEXT "Link text"), `Secondary text` (TEXT), `Show secondary` (BOOL true).

| Part | Spec |
|---|---|
| Root | 160×36, Fill/Hug, AL vertical gap 0, pad 0. |
| Label | `Body/Small/Regular` 14/20, **text-decoration UNDERLINE**, truncate. |
| Secondary | `Body/Extra Small/Regular` 12/16 #56544f truncate. |

| State | Label colour |
|---|---|
| Default | color/foreground/primary/default #000f47 (underlined) |
| Hover | color/foreground/link/default #0b4bff (underlined) |

Underline offset/thickness: not set (Figma default) — unreadable as explicit values.

## 12. Content/Editable — `17228:2358` (State = Default / Editing / Error / Success)

Props: `Value` (TEXT "Residential"), `Dropdown` (BOOL false), `Caret` (BOOL true).

| Part | Spec |
|---|---|
| Root | 200×20, **Fill/Fill**, AL horizontal gap **8**, pad 0, cross CENTER. No fill, stroke or radius on the content itself (any editing outline belongs to the cell, not this component). |
| Value group | Fill/Hug, AL horizontal gap 0, clips. Value = Hug text `Body/Small/Regular` 14/20. |
| Dropdown arrow (hidden unless `Dropdown`) | 16×16 `keyboard_arrow_down` (`keyboard_arrow_up` in Editing). |

| State | Diff |
|---|---|
| Default | Value colour color/foreground/primary/default #000f47. No caret. |
| Editing | Value colour **color/foreground/input/default** #000f47; adds "Caret" rect **1×16** fill #000f47 (`foreground/primary/default`) immediately after the text (gap 0). Arrow swaps to `keyboard_arrow_up`. |
| Error | Caret present (1×16 #000f47); Value colour primary #000f47; adds trailing **status icon `alert/critical-filled` 16×16** glyph #af2625; Value group shrinks to 176 (200 − 8 − 16). |
| Success | No caret; trailing **`alert/success-filled` 16×16** glyph #2f7500; Value group 176. |

## 13. Cell message — `17228:2363` (Tone = Critical / Success)

Prop: `Message` (TEXT "Enter a valid value").

| Part | Spec |
|---|---|
| Root | Hug/Hug (115×20); AL horizontal gap 0; padding **2,6,2,6** (`Space-2` / `Space-6`); radius **2** (`V3/Small`). |
| Message | Hug, `Body/Extra Small/Regular` 12/16. |

| Tone | Fill | Text |
|---|---|---|
| Critical | color/background/critical/default #c63431 | color/foreground/on-critical #ffffff |
| Success | color/background/success/default #2f7500 | color/foreground/on-success #ffffff |

## 14. Content/Tree — `17234:5130` (Level 0–3 × Toggle Collapsed/Expanded/None × Indent Aligned/Compact; 24 variants)

Props: `Leading` (SLOT), `Trailing` (SLOT), `Has leading` (BOOL false), `Has trailing` (BOOL false).

| Part | Spec |
|---|---|
| Root | **320×24** in every variant; Fill/Fixed; AL horizontal gap **8** (`space/table-cell/gap`), pad 0, cross CENTER. |
| Indent N | one empty 24×24 frame per level (Level 1 = 1 frame, Level 3 = 3 frames). With the 8 gap, **each level indents 32px**. (Does not use the Control/Indent component.) |
| Toggle | Collapsed/Expanded: instance `Data table/Control/Expand {Expanded=No/Yes}` 24×24. None + Aligned: empty 24×24 spacer frame named "Toggle" (keeps labels aligned with siblings that have a toggle). None + Compact: **no spacer**. |
| Leading slot (hidden by default) | Hug, 24×24, clips; default content `Data table/Control/Done check {Done=No}`. |
| Label | instance `Data table/Content/Text {Style=Default, Align=Start}`, Fill/Hug (14/20 #000f47 truncate). |
| Trailing slot (hidden) | Hug, AL horizontal gap **4**, clips; default content `Content/Progress {Ring, 75%, Success}` (56×20). |

Label width check (320 root): L0 w/ toggle = 288; L1 None Aligned = 256 (indent 24 + spacer 24 + 2 gaps); L3 Collapsed Aligned = 192; L3 None Compact = 224; L2 Collapsed Compact = 224.

---

## 15. Control/Expand — `17228:2300` (Expanded = No / Yes)

| Part | Spec |
|---|---|
| Root | **24×24** fixed, AL centred both axes, no fill. |
| Chevron | 16×16; No = `keyboard_arrow_right`, Yes = `keyboard_arrow_down` (glyph 7.5×4.5; in the No variant the glyph is rotated 90°). Colour `color/foreground/neutral/subtle` #56544f. |
| Focus ring (hidden) | `Focus border {Rounded=No}` 28×28, abs at −2,−2, radius **4**, stroke **2px OUTSIDE** `color/border/focus/default` #3d7aff. |

## 16. Control/Indent — `17228:2308` (Level = 1/2/3)
Empty fixed frames: **24×24, 48×24, 72×24**. No fill, no children. (Note: Tree does not use it; Tree indents with 24px frames + 8px gaps = 32px per level.)

## 17. Control/Done check — `17234:4928` (Done = No / Yes)

| Part | Spec |
|---|---|
| Root | 24×24, AL centred. |
| Circle | **18×18**, radius 9 (full circle), clips. |
| Done=No | no fill; stroke **1.5px INSIDE** `color/border/default` #7b7974. |
| Done=Yes | fill `color/foreground/primary/default` #000f47, no stroke; contains `check` icon **14×14** (glyph 9.1×6.6) in `color/background/default` #fdfcfa. |
| Focus ring (hidden) | same as Expand (28×28, −2,−2, r4, 2px outside #3d7aff). |

## 18. Control/Drag handle — `17228:2301`
24×24, AL centred. Icon `drag_indicator` 16×16 (glyph 6.2×10.2) colour `color/foreground/neutral/subtle` #56544f. Same hidden focus ring as Expand.

---

## 19. Expansion

### Detail row — `17263:9037`
Props: `Content` (SLOT), `Title` (TEXT "Checklist"), `Summary` (TEXT "3 of 5 items • 3 open • +2 more"), `Has header` (BOOL true), `Divider` (BOOL true).

| Part | Spec |
|---|---|
| Root | 1200×218, Fill/Hug; AL vertical, gap **16**, padding **16** all sides (all bound to `space/table-cell/inset-x`); fill `color/background/default` #fdfcfa; no radius. |
| Header | Hug/Hug, AL horizontal gap **8**, cross CENTER. Title `Body/Small/Bold` 14/20 #000f47; Summary `Body/Small/Regular` 14/20 #56544f. |
| Content slot | Fill/Hug, AL horizontal, **wrap**, gap 16 and row-gap 16 (`inset-x`), clips. Holds Detail cards (3 × 360 wide in the default). |
| Divider | 1px rect, abs at bottom (y = height − 1), full width, fill `color/border/subtle` #dedbd6. |

### Detail card — `17263:8939`
Props: `Header`/`Content`/`Footer` (SLOTs), `Has header` (BOOL true), `Has footer` (BOOL true).

| Part | Spec |
|---|---|
| Root | 360×150, Fill/Hug; AL vertical gap **8** (`space/table-cell/gap`), padding **16** all sides (`inset-x`); radius **8** (`V3/Large`); fill `color/background/default` #fdfcfa; stroke **1px INSIDE** `color/border/subtle` #dedbd6. No shadow. |
| Header slot | Fill/Hug (326×24), AL horizontal gap 8, cross CENTER. Default content: `Badge {Tone=Critical, Emphasis=Subtle}` "Flagged". |
| Content slot | Fill/Hug, AL vertical gap 8. Default: Card part/Title + Card part/Meta. |
| Footer slot | Fill/Hug (326×20), AL horizontal gap 8, **SPACE_BETWEEN**, cross CENTER. Default: Card part/Rating (left) + `Content/Progress {Ring, 50%, Critical}` label "42%" (right). |

### Card part/Title — `17268:10302`
320×24, Fill/Fixed, AL vertical. Text: `Body/Base/Medium` **16/24 Medium (500)**, #000f47, Fill/Hug (wraps; no truncation set). Prop `Title`.

### Card part/Meta — `17268:10304`
Hug/Hug (183×24), AL horizontal gap **8**, cross CENTER. `Avatar {Size=XSmall, Content=Man}` **24×24** (photo, radius 1000) + text `Body/Small/Regular` 14/20 #56544f. Props: `Meta` (TEXT "Jonah Lee • Due Apr 18"), `Has avatar` (BOOL true).

### Card part/Rating — `17268:10335`
Hug/Hug (108×20), AL horizontal gap **8**, cross CENTER.
- library `Rating {Size=Small, Rated=Yes}` 80×16: 5 × `.Rating/Star` 16×16, gap 0. Stars: 3 × `Variant=Full, State=Pressed` (`star-filled`), 1 × `Variant=Half Full` (`star-half`), all #000f47 (`color/foreground/primary/default`); last star `Variant=Full, State=Default` in `color/foreground/disabled` #878580.
- Score text `Body/Small/Regular` 14/20 #56544f. Prop `Score` (TEXT "2.4").
Note the 2.4 score shows 3.5 stars — the rating instance is not data-bound.

### Card part/Key value — `17268:10363`
Hug/Hug (83×36), AL vertical gap 0. Label `Body/Extra Small/Regular` 12/16 #56544f; Value `Body/Small/Regular` 14/20 #000f47. Props `Label`, `Value`.

---

## 20. Nested library components found in specimens

All main components resolve to **local** components in this branch file (`remote = false` for every one); none come from an external library. The `Data table/*` chrome (Title bar, Toolbar, Footer, Pagination, Count, Page item, Toolbar segment/button/group) is outside this spec.

| Seen as | Main component set | Variant props | Where | Spec read from instance |
|---|---|---|---|---|
| "Urgent" pill (Support queue) | `Badge` | Tone=Critical, Emphasis=**Strong** | 17282:11238 ×3 | Hug×**24** fixed; padding 10,8,10,8 (vertical padding exceeds 24−20, so height is clamped to 24 and the text is centred); radius **8**; fill `color/background/critical/default` #c63431; no stroke; text `Body/Small/Regular` 14/20 `color/foreground/on-critical` #ffffff |
| "Escalated", "Critical", "Broker", "Urgent" (task list), "Flagged" | `Badge` | Tone=Critical, Emphasis=Subtle | all | fill `background/critical/subtle` #ffe8e8; stroke 1px inside `border/critical/default` #c63431; text `foreground/critical/default` #af2625 |
| "High", "Renewal", "Needs approval", "Enterprise" | `Badge` | Tone=Warning, Emphasis=Subtle | all | fill #f8ebe0 (`background/warning/subtle`); stroke #c25600 (`border/warning/default`); text #8f5400 |
| "Open", "Key account", "Digital", "Medium" | `Badge` | Tone=Info, Emphasis=Subtle | all | fill #ebf7ff; stroke #0a3acc; text `foreground/info/default` #000f47 |
| "Normal", "Registry API", "Open" (review) | `Badge` | Tone=Neutral, Emphasis=Subtle | 11238, 18180, 192036 | fill `background/neutral/default` #ebe7e2; stroke `border/default` #7b7974; text `foreground/neutral/default` #3d3c37 |
| "Resolved", "Done" | `Badge` | Tone=Success, Emphasis=Subtle | 11238, 18180 | fill #f0f6ed; stroke #2f7500; text #2f7500 |
| Row checkbox | `Checkbox` | Checked=False, State=Default, Invalid=No | 11238 ×16, 13181 ×16 | **20×20**; radius 2; fill `background/input/default` #ffffff; stroke 1px inside `border/input/default` #62615c |
| Person avatar (cells) | `Avatar` | Size=Small, Content=Initials | 11238 ×11, 13181 ×15 | 32×32 (see §4) |
| Person avatar (review list) | `Avatar` | Size=Small, Content=Woman / Man | 18180 | 32×32 photo, r 1000 |
| Card meta avatar | `Avatar` | Size=XSmall, Content=Man / Woman | 18180 | 24×24 photo |
| Assignee avatar (task list) | `Avatar` | Size=XSmall, Content=Initials | 192036 ×16 | 24×24, fill #000f47; initials text still `Body/Base/Regular` 16/24 #ceecff |
| "New ticket" / "Add contact" / "New review" / "Add line item" | `Button` | Type=Primary, State=Default, Size=Small, Destructive=No | all 5 | Hug×**32**; padding 4,8,4,8; gap 8; radius **2**; fill `background/primary/default` #000f47; left icon `Add` 24×24 (via Marsh Icon Placeholder 24px); label `Body/Base/Bold` 16/24 `foreground/on-primary` #ceecff |
| Rows-per-page select "15" / "25" | `Input` | Type=Input, Invalid=No, State=Default, Size=Small | footers | 80×**32**; inner frame padding 0,4,0,8, radius 2, fill #ffffff, stroke 1px inside #62615c; trailing `.Input/Icon_selection {Input Icons=Drop down}` 24×24 (`Arrow_drop_down`); value via `.Input/text fullfilled {Text status=Fulfilled}`. It is an **Input** with a dropdown icon, not a Select component. |
| Row "···" | `Icon Button` | Type=Tertiary, State=Default, Size=Small, Destructive=No | via Content/Actions | 32×32 (see §10) |
| Pagination first/prev | `Icon Button` | Type=Tertiary, State=**Disabled**, Size=Small | footers | 32×32 |
| Star rating | `Rating` → `.Rating/Star` | Size=Small, Rated=Yes; stars Variant=Full/Half Full, State=Pressed/Default | 18180 | see Card part/Rating |
| Task status | `task-status` | Kind=Progress, Status=Incomplete / Completed / Draft | 192036 | Hug×18; AL horizontal gap 4; symbol frame 16×16 with a **12×12** circle; label `Platform/Body/md/Regular` 14/**18** `foreground/neutral/default` #3d3c37. Incomplete: 1px inside ring `border/info/default` #0a3acc + bottom half-disc fill `background/info/default` #0a3acc. Completed: filled circle `foreground/success/default` #2f7500 + check stroke 1.5 `foreground/on-success` #ffffff. Draft: 1px ring `foreground/neutral/subtle` #56544f. |
| Country flags | `flags / US`, `flags / DE`, `flags / ES`, `flags / MY` (standalone components, not a set) | — | 13181 | 21×15, hard-coded colours |

### Which content components each specimen uses (visible instances)
- **Support queue 17282:11238** — Link{Default}×15, Entity{Company}×15, Entity{Person}×11, Date×15, Text{Default}×9, {Muted}×4, {Critical}×3, {Success}×2, {Warning}×1; plus Badges directly in cells (Urgent/Escalated/High/Open/Normal/Resolved), Checkbox×16.
- **Contacts 17282:13181** — Entity{Person}×15, {Company}×15, {Location}×15, Text{Default}×15, Tags×15, Date×15, Actions×15; Checkbox×16.
- **Review list with detail 17992:18180** — Tree{L0 Collapsed Aligned}×11 + {L0 Expanded Aligned}×1, Text{Default}×24, Entity{Person}×12, Progress Ring {50% Critical}×7, {50% Warning}×4, {25% Critical}×3, {100% Success}×1, Actions×12; one Detail row with 3 Detail cards.
- **Grouped summary / Treasury waterfall 17992:20221** — Tree{L0 Expanded Compact}×2, {L0 Collapsed Compact}×3, {L1 None Compact}×5, Number{Default End}×35, {Strong End}×25, {Default Start}×2, Text{Strong}×5, {Muted}×5, {Warning End}×3, {Critical End}×2, Progress Ring {75% Success}×1, {100% Success}×2, {75% Warning}×1, {50% Warning}×1; footer `Data table/Count`.
- **Task list 17992:192036** — Tree{L0 Expanded Aligned}×2, {L0 Collapsed Aligned}×4, {L0 None Aligned}×2, {L1 None Aligned}×8, Done check{No}×12 / {Yes}×4, Text{Default}×12, Text{Done}×4, Entity{Person}×16 (XSmall initials avatars), Actions×16, task-status×16, Badges.

## Unreadable / caveats
- Date's hidden calendar icon colour: not resolved.
- Underline thickness/offset on Link: Figma defaults, no explicit values.
- `Platform/Body/md/Regular` letter-spacing: not dumped.
- Badge vertical padding (10 top / 10 bottom) is larger than its fixed 24 height allows; the rendered result is 24px tall with the 20px text centred. In code, use `h-6 px-2` (24 high, 8 horizontal) rather than copying the padding.
- Dark-mode values were not extracted (Light only, as requested).
