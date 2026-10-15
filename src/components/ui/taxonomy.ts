/**
 * Component taxonomy — the library's self-description.
 *
 * Why this is a manifest and not a folder structure
 * -------------------------------------------------
 * Atomic design's atom/molecule boundary is genuinely contested (is a Card an
 * atom or a molecule? is a Calendar a molecule or an organism?). Baking a
 * contested answer into *import paths* churns every file's history, breaks
 * deep imports, and buys nothing: what a consumer — human or agent — needs is
 * to KNOW that `DataTable` is an organism, not to find it at a particular
 * path. shadcn/ui, Radix, MUI and Polaris all keep a flat file layout and
 * classify in documentation for exactly this reason.
 *
 * So the files stay flat in `src/components/ui/` and the taxonomy lives here,
 * where docs, Storybook and `scripts/check-composition.js` can all read the
 * same source of truth.
 *
 * The tiers are defined by a testable question, not by vibes — see `TIERS`.
 */

export type Tier = 'atom' | 'molecule' | 'organism' | 'template';

export interface TierDefinition {
  /** The question that decides membership. Answerable by reading the file. */
  test: string;
  /** What this tier is for, in composition terms. */
  role: string;
}

export const TIERS: Record<Tier, TierDefinition> = {
  atom: {
    test: 'Renders no other MDS component. Decomposing it further would leave no meaningful UI.',
    role: 'The smallest styled surface. Always safe to place anywhere.',
  },
  molecule: {
    test: 'Composes atoms into one unit with a single purpose, but owns no page-level or server state.',
    role: 'The level most feature code should reach for first.',
  },
  organism: {
    test: 'Owns behaviour or state of its own (selection, pagination, open/close, portals), or occupies a whole region of a page.',
    role: 'A self-contained section. Expect props for data in and events out.',
  },
  template: {
    test: 'Provides page structure and slots only. Contains no business data and no domain vocabulary.',
    role: 'The scaffold a page is poured into. Layout decisions live here, not in the page.',
  },
};

/**
 * Every component module in `src/components/ui/`, keyed by file basename.
 * A module may export several components (`stack` exports `Stack` and
 * `Inline`; `page-shell` exports `PageShell` and `PageHeading`) — they share
 * the module's tier.
 *
 * Contested calls are annotated so the reasoning is reviewable rather than
 * mysterious. If you disagree with one, change it here — this file is the only
 * place the answer is recorded.
 */
export const TAXONOMY: Record<string, Tier> = {
  // ── Atoms ──────────────────────────────────────────────────────────────
  'aspect-ratio': 'atom',
  avatar: 'atom',
  badge: 'atom',
  'badge-anchor': 'atom',
  button: 'atom',
  checkbox: 'atom',
  chip: 'atom',
  'filter-chip': 'molecule',
  'filter-controls': 'molecule',
  'filter-field-control': 'molecule',
  filters: 'organism',
  icon: 'atom',
  'image-with-fallback': 'atom',
  input: 'atom',
  label: 'atom',
  marker: 'atom',
  progress: 'atom',
  'scroll-area': 'atom',
  separator: 'atom',
  skeleton: 'atom',
  slider: 'atom',
  sparkline: 'atom',
  spinner: 'atom',
  switch: 'atom',
  textarea: 'atom',
  toggle: 'atom',

  // Layout atoms. Same tier as `button` by the test above — they render no
  // other MDS component — but they exist to be composed, never used alone.
  // `stack` covers both `Stack` and `Inline`: this manifest is keyed by
  // module, and a module may export more than one component.
  stack: 'atom',

  // ── Molecules ──────────────────────────────────────────────────────────
  accordion: 'molecule',
  alert: 'molecule',
  attachment: 'molecule',
  breadcrumbs: 'molecule',
  bubble: 'molecule',
  'button-group': 'molecule',
  card: 'molecule',
  collapsible: 'molecule',
  // The four-state contract. Molecules: they compose Empty/ErrorState/Spinner
  // into one unit, but own no page or server state of their own.
  'data-state': 'molecule',
  'error-state': 'molecule',
  combobox: 'molecule',
  empty: 'molecule',
  field: 'molecule',
  // Organism: it owns a filter row's composition and publishes a size cascade,
  // and it occupies a whole region above a data surface.
  'filter-bar': 'organism',
  'hover-card': 'molecule',
  'input-group': 'molecule',
  'input-otp': 'molecule',
  list: 'molecule',
  'metric-card': 'molecule',
  pagination: 'molecule',
  popover: 'molecule',
  'radio-group': 'molecule',
  select: 'molecule',
  'stat-card': 'molecule',
  'status-card': 'molecule',
  stepper: 'molecule',
  tabs: 'molecule',
  'text-field': 'molecule',
  toast: 'molecule',
  'toggle-group': 'molecule',
  tooltip: 'molecule',

  // ── Organisms ──────────────────────────────────────────────────────────
  calendar: 'organism',
  carousel: 'organism',
  chart: 'organism',
  command: 'organism',
  'context-menu': 'organism',
  'data-table': 'organism',
  'data-grid': 'organism',
  'data-grid-cell-edit': 'atom',
  'data-grid-pagination': 'organism',
  'data-grid-rows': 'molecule',
  'data-grid-bulk-actions': 'molecule',
  'data-grid-row-actions': 'molecule',
  'data-grid-selection': 'molecule',
  'data-grid-table': 'organism',
  'data-grid-toolbar': 'organism',
  'data-table-date-filter': 'organism',
  'data-table-faceted-filter': 'organism',
  'data-table-sort-list': 'organism',
  'date-picker': 'organism',
  dialog: 'organism',
  drawer: 'organism',
  'dropdown-menu': 'organism',
  header: 'organism',
  'mega-menu': 'organism',
  menubar: 'organism',
  message: 'organism',
  'message-scroller': 'organism',
  'notifications-drawer': 'organism',
  questionnaire: 'organism',
  resizable: 'organism',
  sheet: 'organism',
  'side-navigation': 'organism',
  table: 'organism',
  'table-primitives': 'atom',
  toaster: 'organism',
  'website-header': 'organism',

  // ── Templates ──────────────────────────────────────────────────────────
  'page-shell': 'template',
};

/** Components in one tier, sorted. */
export function byTier(tier: Tier): string[] {
  return Object.entries(TAXONOMY)
    .filter(([, t]) => t === tier)
    .map(([name]) => name)
    .sort();
}

/** Tier for a component file basename, or `undefined` if unclassified. */
export function tierOf(component: string): Tier | undefined {
  return TAXONOMY[component];
}

/**
 * Contested classifications, recorded so the next person doesn't relitigate
 * them from scratch. Each entry says what else it could plausibly be and why
 * the current call was made.
 */
export const CONTESTED: Record<string, string> = {
  card: "Could be an atom — it is a styled box. Molecule because CardHeader/CardTitle/CardContent are a compositional unit, not one surface.",
  calendar: "Could be a molecule. Organism because it owns month/range/selection state and keyboard navigation.",
  'date-picker': "Organism rather than molecule because it portals a Popover and owns open/close plus the Calendar's state.",
  tooltip: "Molecule despite portalling, because it holds no state a consumer reads or controls.",
  'scroll-area': 'Atom despite wrapping children — it adds a scroll surface, not composition.',
  table: "Organism, not molecule: `table.tsx` holds five pieces of internal state (sort, selection, pagination, ...).",
  'radio-group': 'Molecule: the group plus its items is the unit; neither half is useful alone.',
};

// ─────────────────────────────────────────────────────────────────────────
// Component contracts — the "which component, when" layer
// ─────────────────────────────────────────────────────────────────────────
//
// The Storybook component manifest (features.componentsManifest) emits the
// MECHANICAL contract: props, variants, types. That tells an agent HOW to call
// a component, not WHETHER to. Research on agentic design systems is consistent
// that this second half is what tokens-plus-manifest cannot provide — "which
// component to reach for, and when NOT to use one" — and that it has to be
// machine-readable, not buried in prose.
//
// So each component gets a CONTRACT: one-line purpose, when to use it, when NOT
// to (each pointing at the right alternative), and the gotchas that surprise a
// first-time caller. An agent — or a developer — reads `contractOf('sheet')`
// and learns it is the STATIC side panel, that a swipeable one is `drawer`, and
// that it portals to document.body.
//
// This is populated incrementally and HONESTLY: a contract exists only for a
// component whose real usage boundaries are known, never fabricated to hit a
// number. `contract_coverage` in ds:score tracks the ratio so the gap is
// visible, and taxonomy.test.ts validates every contract names a real
// component for its `instead` pointers.

export interface ComponentContract {
  /** One line: what this component is for. */
  purpose: string;
  /** Situations where this is the right choice. */
  whenToUse: string[];
  /** Situations where it is the WRONG choice — each names the right component. */
  whenNotToUse?: { instead: string; because: string }[];
  /** Behaviour that surprises a first-time caller. The traps, stated plainly. */
  gotchas?: string[];
}

/**
 * Contracts, keyed like TAXONOMY (module basename). PARTIAL on purpose — only
 * components whose boundaries are genuinely understood. Add one when you know
 * the real answer, not to raise coverage.
 */
export const CONTRACTS: Record<string, ComponentContract> = {
  button: {
    purpose: 'The primary interactive action trigger.',
    whenToUse: [
      'Any click/tap action: submit, open, confirm, navigate-as-action.',
      'Pick appearance with `variant` (primary/secondary/outline/ghost) and intent with `tone` (default/danger/success) — never MUI-style `color`.',
    ],
    gotchas: [
      'For navigation to a URL use a native <a>, not a Button — there is no Link component, and a button is not a link semantically or for assistive tech.',
      '`iconOnly` renders ONLY `icon ?? startIcon ?? endIcon` and DISCARDS children. Passing an icon as a child of an iconOnly button renders an empty button. Pass it via `icon`.',
      'A text button needs no accessible-name workaround, but an `iconOnly` button needs `aria-label`.',
    ],
  },
  sheet: {
    purpose: 'A static side panel that slides in from an edge (Radix Dialog variant).',
    whenToUse: [
      'A side-anchored overlay — filters, detail, secondary nav — that opens and closes without a drag gesture.',
    ],
    whenNotToUse: [
      { instead: 'drawer', because: 'When you need swipe/drag-to-dismiss (mobile bottom-sheet behaviour). Sheet has no drag model.' },
      { instead: 'dialog', because: 'For a centred modal that is not edge-anchored.' },
    ],
    gotchas: [
      'Portals to document.body, so it sits outside a page scope. Apply typography/theme scope on the content if it needs one (notifications-drawer does).',
    ],
  },
  drawer: {
    purpose: 'A swipeable drawer with drag-to-dismiss (Base UI, not Radix).',
    whenToUse: [
      'Mobile surfaces where swipe-to-dismiss is the expected gesture — a bottom sheet you can drag closed.',
    ],
    whenNotToUse: [
      { instead: 'sheet', because: 'For a static side panel with no drag — Sheet is lighter and on Radix like the rest of the overlays.' },
    ],
    gotchas: [
      'The one component on @base-ui/react rather than Radix — intentionally, for the swipe model Radix lacks. Keep that in mind for bundle and API consistency.',
    ],
  },
  dialog: {
    purpose: 'A centred modal overlay. Exports both the composable Radix parts and an API-compatible `Modal` shim.',
    whenToUse: [
      'A focused, centred interruption: confirm, form, detail that must be dismissed before continuing.',
    ],
    whenNotToUse: [
      { instead: 'sheet', because: 'For an edge-anchored panel rather than a centred modal.' },
      { instead: 'popover', because: 'For lightweight, non-modal content anchored to a trigger.' },
    ],
    gotchas: [
      '`size` accepts sm/md/lg/fullscreen AND the legacy PascalCase (Small/Medium/…) for Code Connect parity — prefer the lowercase.',
      'For an all-destructive footer, set onOpenAutoFocus to avoid Enter firing a destructive default on open.',
    ],
  },
  'data-table': {
    purpose: 'The TanStack-based data table for sortable, filterable, paginated tabular data.',
    whenToUse: [
      'Rows of structured data needing sort, filter, pagination, selection, or custom cells.',
      'Set `meta.type` (currency/date/percent/number) for right-alignment.',
    ],
    whenNotToUse: [
      { instead: 'table', because: 'For simple static tabular layout with no sorting/filtering/pagination — table-primitives are lighter.' },
    ],
    gotchas: [
      '`meta.type` currently only drives ALIGNMENT, not formatting — the value is rendered as-is. Format in the cell or via FormatProvider.',
      'Takes `loadError`; data-grid-table does not — a failed fetch there renders like empty data.',
    ],
  },
  tooltip: {
    purpose: 'A hover/focus label anchored to a trigger (Radix, portalled).',
    whenToUse: ['A short, non-essential label or hint on hover/focus of an interactive element.'],
    whenNotToUse: [
      { instead: 'popover', because: 'For interactive or essential content — tooltips are not reachable by touch or keyboard reliably.' },
      { instead: 'hover-card', because: 'For richer preview content on hover.' },
    ],
    gotchas: [
      'Takes `title`, NOT `content` — a common mis-call from other libraries.',
    ],
  },
  alert: {
    purpose: 'An inline, persistent status message within page flow.',
    whenToUse: ['Contextual status that should stay on screen — validation summary, info banner, warning in a form.'],
    whenNotToUse: [
      { instead: 'toast', because: 'For a transient, auto-dismissing notification that floats above content.' },
      { instead: 'status-card', because: 'For a standalone status surface with title + message as a card.' },
    ],
  },
  toast: {
    purpose: 'A transient notification that floats above all overlays and auto-dismisses.',
    whenToUse: ['Brief feedback after an action — "Saved", "Copied" — that should not block.'],
    whenNotToUse: [
      { instead: 'alert', because: 'For persistent, inline status that stays until resolved.' },
    ],
    gotchas: [
      'Sits at z-index 1600, deliberately ABOVE overlays (1500), so a toast fired while a dialog is open is still visible.',
      'Render one `Toaster` near the app root; call `toast()`/`showSnackbar()` from anywhere.',
    ],
  },
  input: {
    purpose: 'A single-line text field.',
    whenToUse: ['Single-line text entry. Use `tone` (error/success/warning) for validation state.'],
    whenNotToUse: [
      { instead: 'textarea', because: 'For multi-line input.' },
      { instead: 'input-group', because: 'For an input with an adornment (icon, button, prefix) — Input has no adornment prop.' },
    ],
  },
  stack: {
    purpose: 'Vertical layout with gap on the spacing scale (also exports Inline for horizontal).',
    whenToUse: ['Stacking children vertically (`Stack`) or in a wrapping row (`Inline`). `gap` only accepts scale steps — `gap={7}` is a compile error.'],
    whenNotToUse: [
      { instead: 'page-shell', because: 'For the whole page frame — PageShell owns the min-w-0 chain and sidebar scaffold.' },
    ],
  },
  'page-shell': {
    purpose: 'The dashboard page template — header, sidebar, main, and the min-w-0 chain that stops wide tables scrolling the page.',
    whenToUse: ['Starting any dashboard page. Also provides the skip link and the dashboard typography context.'],
    gotchas: [
      'Emits an <h1> via PageHeading; a stats grid of StatCards (<h3>) placed directly under it skips <h2> and fails axe heading-order. Wrap stats in a <section> with an sr-only <h2>.',
    ],
  },
  attachment: {
    purpose: 'A file attachment chip with media, actions, and upload/processing states.',
    whenToUse: ['Showing an attached or uploading file with remove/retry actions.'],
    gotchas: [
      'AttachmentAction accepts the icon as `icon` OR as children — children are promoted to icon. (Earlier it discarded children and rendered an empty button; fixed.)',
    ],
  },

  // ── Single-choice / value pickers ────────────────────────────────────────
  select: {
    purpose: 'Pick one value from a short, fixed list via a Radix listbox (DSSelect wraps the parts for MUI parity).',
    whenToUse: [
      'Choosing a single persisted VALUE from a known, finite set — status, country, coverage type.',
      'The option count is small enough that scrolling, not searching, is the right way to find one.',
    ],
    whenNotToUse: [
      { instead: 'combobox', because: 'The list is long enough that the user needs to type-to-filter.' },
      { instead: 'radio-group', because: 'There are only a few options and showing them all at once aids the choice.' },
      { instead: 'dropdown-menu', because: 'The items are ACTIONS to run, not a value to store.' },
    ],
    gotchas: [
      'The trigger is `role="combobox"`, which gets NO accessible name from its content — a label-less DSSelect/Combobox needs a visible `label` or `aria-label` or axe fails and the build breaks.',
      'Radix rejects an empty-string item value (reserved for "no selection"); DSSelect maps `value: ""` to a sentinel and back, so an "Unassigned" placeholder option still works.',
      'SelectContent portals to document.body, outside any page typography scope — re-apply scope on the content if it matters.',
    ],
  },
  combobox: {
    purpose: 'Pick one value from a long list with type-to-filter search (Popover + Command).',
    whenToUse: [
      'Single-value selection where the option set is large enough that searching beats scrolling.',
    ],
    whenNotToUse: [
      { instead: 'select', because: 'The list is short and a plain listbox is simpler and lighter.' },
      { instead: 'command', because: 'You want a full command palette of actions, not a form value picker.' },
    ],
    gotchas: [
      'The trigger is `role="combobox"`, which has no name-from-content — pass `aria-label` (it defaults to `placeholder`) or the control fails axe.',
      'Selecting the already-selected option clears it (`onChange` fires with `""`) — it toggles, it does not re-confirm.',
    ],
  },
  'radio-group': {
    purpose: 'Pick exactly one option from a small set, with every option visible at once.',
    whenToUse: [
      'A few mutually-exclusive choices (roughly 2–6) where seeing them all helps the decision.',
    ],
    whenNotToUse: [
      { instead: 'select', because: 'There are many options or the row would get too tall — collapse them behind a trigger.' },
      { instead: 'checkbox', because: 'More than one option can be selected at the same time.' },
      { instead: 'toggle-group', because: 'You want a compact segmented/icon control rather than labelled radio rows.' },
    ],
    gotchas: [
      'A `DSRadio` only tracks checked visuals inside a `DSRadioGroup` (it reads the selected value from context) — a lone `DSRadio` will not light up.',
    ],
  },
  'dropdown-menu': {
    purpose: 'A menu of ACTIONS opened by clicking a trigger (Radix, real menu semantics).',
    whenToUse: [
      'A button that opens a list of commands — row actions, a profile menu, bulk operations.',
      'You need submenus, checkbox/radio items, or typeahead within the menu.',
    ],
    whenNotToUse: [
      { instead: 'select', because: 'The user is choosing a value to persist, not firing an action.' },
      { instead: 'context-menu', because: 'The menu should open on right-click of a surface, not a button press.' },
      { instead: 'menubar', because: 'You want a persistent, always-visible bar of top-level menus (an app menu bar).' },
    ],
    gotchas: [
      'Content portals to document.body, so it sits outside the `mds-dashboard` typography scope — re-apply it on the content if needed.',
    ],
  },
  'context-menu': {
    purpose: 'A menu of actions opened by right-click (or long-press) on a target surface.',
    whenToUse: [
      'Contextual actions tied to right-clicking a specific element — a grid cell, a canvas item.',
    ],
    whenNotToUse: [
      { instead: 'dropdown-menu', because: 'The menu should open from a visible trigger button — a right-click menu is undiscoverable and hard to reach on touch/keyboard, so it must only ever be a shortcut to actions available elsewhere.' },
    ],
    gotchas: [
      'Content portals to document.body, outside the dashboard typography scope.',
    ],
  },
  menubar: {
    purpose: 'A persistent horizontal bar of top-level menus — the desktop-application menu bar pattern.',
    whenToUse: [
      'An always-visible row of menus (File / Edit / View …) where several menus coordinate focus as one widget.',
    ],
    whenNotToUse: [
      { instead: 'dropdown-menu', because: 'There is only one menu, opened from a single trigger button.' },
      { instead: 'side-navigation', because: 'You are navigating between app sections, not invoking menu commands.' },
    ],
  },

  // ── Card family ──────────────────────────────────────────────────────────
  card: {
    purpose: 'A generic surface with composable Header/Title/Content/Footer parts (plus `ContentCard` for the title/image/CTA Figma spec).',
    whenToUse: [
      'Grouping arbitrary content into a bordered surface you lay out yourself.',
      'Use `ContentCard` for the canonical title + category + image + CTA content card.',
    ],
    whenNotToUse: [
      { instead: 'stat-card', because: 'You are showing a KPI metric with a delta/trend/sparkline.' },
      { instead: 'metric-card', because: 'You just need one very large headline number.' },
      { instead: 'status-card', because: 'The card is a success/warning/error/info status message.' },
    ],
    gotchas: [
      'CardTitle renders a fixed `<h3>` — mind heading order when a card sits directly under the page `<h1>`.',
    ],
  },
  'stat-card': {
    purpose: 'The dashboard KPI tile: a labelled value with an optional delta badge, trend caption, comparison and sparkline.',
    whenToUse: [
      'One metric that changes over time — premium, open claims — where the change and its sentiment matter.',
      'Pass a number plus `format`; set `deltaPolarity` so "down is good" metrics colour correctly.',
    ],
    whenNotToUse: [
      { instead: 'metric-card', because: 'You want only a large number with a label, no trend or delta.' },
      { instead: 'card', because: 'The content is arbitrary rather than a single metric.' },
      { instead: 'status-card', because: 'You are conveying a status, not a number.' },
    ],
    gotchas: [
      '`as` defaults to `"p"` — the label is deliberately NOT a heading, so a grid of StatCards no longer breaks heading order (it used to hardcode `<h3>`). Set `as="h3"` only when the tile genuinely is a section heading.',
      'Colour follows sentiment = direction × `deltaPolarity`; the deprecated `trend`/`change` props can contradict the number beside them. Prefer `delta`.',
      'Loading and error states render in place (skeleton / inline error) rather than swapping in a `<DataState>`, so a 4-tile grid does not reflow when data lands.',
    ],
  },
  'metric-card': {
    purpose: 'A single very large, centred headline number with a label beneath — a hero stat.',
    whenToUse: [
      'A standalone showcase figure where visual weight, not trend context, is the point.',
    ],
    whenNotToUse: [
      { instead: 'stat-card', because: 'You need a delta, trend, comparison, sparkline, or number formatting.' },
      { instead: 'card', because: 'The content is richer than one number and a label.' },
    ],
    gotchas: [
      '`value` is a string and is rendered as-is — there is no formatting here; format the number before passing it.',
    ],
  },
  'status-card': {
    purpose: 'A standalone status surface (success/warning/error/info) with an icon, title and message.',
    whenToUse: [
      'A self-contained status block — a card-shaped success/error summary set apart from page flow.',
    ],
    whenNotToUse: [
      { instead: 'alert', because: 'You want an inline status banner that flows with page content.' },
      { instead: 'toast', because: 'The message is transient and should float then auto-dismiss.' },
    ],
    gotchas: [
      'Width is fixed at 360px via inline `style`, so a `className` setting width silently loses — override with `style` if you must.',
      'It is a `role="alert"` and emits an `<h3>` title, so it both announces on mount and participates in heading order.',
    ],
  },

  // ── Binary controls ───────────────────────────────────────────────────────
  checkbox: {
    purpose: 'A single boolean, or one option among several independently-selectable ones.',
    whenToUse: [
      'An on/off value in a form that is submitted later — accept terms, pick several tags.',
      'A list where any number of options may be checked at once (supports an indeterminate state).',
    ],
    whenNotToUse: [
      { instead: 'switch', because: 'The change applies immediately, like a settings toggle, rather than on submit.' },
      { instead: 'radio-group', because: 'The options are mutually exclusive — only one may be chosen.' },
      { instead: 'toggle', because: 'You want a toolbar button that holds a pressed state, not a form field.' },
    ],
  },
  switch: {
    purpose: 'An immediately-applied on/off setting.',
    whenToUse: [
      'Flipping a setting that takes effect at once — enable notifications, dark mode.',
    ],
    whenNotToUse: [
      { instead: 'checkbox', because: 'The value is part of a form submitted later, or several may be selected together.' },
      { instead: 'toggle', because: 'You want a pressed-state toolbar/formatting button, not a labelled setting.' },
    ],
  },
  toggle: {
    purpose: 'A single two-state button that holds a pressed/unpressed state (e.g. bold).',
    whenToUse: [
      'A toolbar/formatting control that stays visibly "on" while active.',
    ],
    whenNotToUse: [
      { instead: 'switch', because: 'It is an on/off setting with a label, not a toolbar button.' },
      { instead: 'checkbox', because: 'It is a form boolean that gets submitted.' },
      { instead: 'toggle-group', because: 'There are several related toggles that behave as one control.' },
    ],
    gotchas: [
      'Sizes are the shadcn stock scale (h-8/h-9/h-10), not the shared CONTROL_HEIGHT control scale — it will not line up pixel-for-pixel with Input/Button/Select.',
    ],
  },
  'toggle-group': {
    purpose: 'A set of toggle buttons behaving as one control — a segmented single-select, or a multi-select button row.',
    whenToUse: [
      'A compact segmented control: alignment, view density, a short icon-based choice.',
    ],
    whenNotToUse: [
      { instead: 'tabs', because: 'You are switching between panels/views, not setting a value.' },
      { instead: 'radio-group', because: 'You want labelled radio rows for an accessible form choice.' },
      { instead: 'toggle', because: 'There is only one independent button.' },
    ],
  },

  // ── Overlays ───────────────────────────────────────────────────────────────
  popover: {
    purpose: 'Click-triggered, non-modal floating content anchored to a trigger (Radix, portalled).',
    whenToUse: [
      'Interactive or essential content on demand — a small form, filter controls, a colour picker — that the user opens by click/tap.',
    ],
    whenNotToUse: [
      { instead: 'tooltip', because: 'You only need a short, non-essential hover/focus hint.' },
      { instead: 'hover-card', because: 'The content is a rich preview shown on hover, not operated by click.' },
      { instead: 'dialog', because: 'The interaction must block the rest of the page until dismissed.' },
    ],
    gotchas: [
      'Content portals to document.body and does NOT inherit the `mds-dashboard` typography scope — re-apply it if the content needs the dashboard type scale.',
    ],
  },
  'hover-card': {
    purpose: 'A rich preview that opens on hover/focus of its trigger (Radix, portalled).',
    whenToUse: [
      'Non-essential supplementary context on hover — a user card, a link preview — that a reader can safely miss.',
    ],
    whenNotToUse: [
      { instead: 'popover', because: 'The content is interactive or essential — hover is not reachable reliably by touch or keyboard.' },
      { instead: 'tooltip', because: 'A short text label is all you need.' },
    ],
    gotchas: [
      'Content portals to document.body, outside the dashboard typography scope.',
      'Because it opens on hover, anything inside must be optional — touch and keyboard users may never trigger it.',
    ],
  },

  // ── Labels / markers ────────────────────────────────────────────────────────
  badge: {
    purpose: 'A static, non-interactive tone-coloured status label (outline/soft/solid).',
    whenToUse: [
      'Labelling state inline — a row status, a count, a category pill — with no click behaviour.',
    ],
    whenNotToUse: [
      { instead: 'chip', because: 'The element is clickable or removable.' },
      { instead: 'filter-chip', because: 'It toggles a filter and carries selection state.' },
      { instead: 'label', because: 'You are captioning a form control (use `htmlFor`).' },
    ],
    gotchas: [
      '`variant` is ignored for the `default` and `disabled` tones, which each have one fixed treatment.',
      'The legacy `soft` boolean is deprecated — `soft` → `variant="soft"`, `soft={false}` → `variant="solid"`.',
    ],
  },
  chip: {
    purpose: 'A compact filled/outlined element that may be clickable (`onClick`) or removable (`onDelete`).',
    whenToUse: [
      'An interactive or deletable token — an entered tag, an input value you can remove.',
    ],
    whenNotToUse: [
      { instead: 'badge', because: 'The token is a static label with no action — a chip with no handler just renders a non-interactive span, so reach for Badge.' },
      { instead: 'filter-chip', because: 'The chip represents a filter that toggles on/off and carries selection.' },
    ],
    gotchas: [
      'The `selectable`/`selected` props are deprecated — their inset-ring selection reads as focus and relies on colour alone. Use `filter-chip`, which carries selection via a checkmark and `aria-pressed`.',
      'With no `onClick`/`onDelete` and not disabled, Chip renders a `<span>` (not a focusable button) on purpose.',
    ],
  },
  'filter-chip': {
    purpose: 'A toggleable filter control carrying selection (leading checkmark + `aria-pressed`), optionally removable or menu-backed.',
    whenToUse: [
      'Applying/clearing a filter in a toolbar — "Active", "Region: EMEA" — where the on state must survive without colour.',
    ],
    whenNotToUse: [
      { instead: 'chip', because: 'The token is an input/assist/suggestion chip with no selection state.' },
      { instead: 'badge', because: 'It is a static, non-interactive label.' },
    ],
    gotchas: [
      'Wrap a row of them in `FilterChipSet` (a `role="toolbar"` with roving tabindex) so the whole group is one tab stop, not fifteen.',
      '`hasMenu` renders the chevron AFFORDANCE only — it opens nothing. Use `FilterChipMenu` (or wrap in a `DropdownMenuTrigger asChild`) to actually back it with a menu.',
    ],
  },
  label: {
    purpose: 'An accessible caption for a form control (Radix Label, wired via `htmlFor`).',
    whenToUse: [
      'Naming an Input/Select/Checkbox so clicking the text focuses the control and screen readers announce it.',
    ],
    whenNotToUse: [
      { instead: 'badge', because: 'You want a status label, not a form caption.' },
      { instead: 'text-field', because: 'You want the whole labelled field (label + input + helper) in one component.' },
    ],
  },

  // ── Form wrappers ───────────────────────────────────────────────────────────
  'text-field': {
    purpose: 'A complete labelled field: Label + Input (or Textarea) + helper/error text in one component.',
    whenToUse: [
      'The common case — a single text input that needs a visible label, helper text and validation tone.',
      'Set `type="textarea"` to switch the control to a multi-line Textarea without changing the API.',
    ],
    whenNotToUse: [
      { instead: 'input', because: 'You want just the bare control with no label/helper scaffolding.' },
      { instead: 'field', because: 'You are laying out a custom or compound form row by hand.' },
      { instead: 'input-group', because: 'The control needs an inline addon (icon/button/prefix).' },
    ],
    gotchas: [
      'Validation state uses `tone="error"` (fields), not `tone="danger"` (which is for actions like Button).',
    ],
  },
  field: {
    purpose: 'Low-level form-layout primitives (FieldSet/FieldGroup/Field/FieldLabel/FieldDescription/FieldError…) for composing custom form rows.',
    whenToUse: [
      'Hand-building a form section — grouping controls, legends, descriptions, error lists, horizontal/responsive field orientation.',
    ],
    whenNotToUse: [
      { instead: 'text-field', because: 'You just need one standard labelled text input — that composition is already done.' },
    ],
  },
  textarea: {
    purpose: 'The bare multi-line text input control, with the same tone-driven validation colouring as Input.',
    whenToUse: [
      'Free-form multi-line entry where you supply the label/helper yourself (or compose it).',
    ],
    whenNotToUse: [
      { instead: 'input', because: 'The entry is a single line.' },
      { instead: 'text-field', because: 'You want the labelled wrapper — pass `type="textarea"`.' },
      { instead: 'input-group', because: 'You need addon buttons/icons inside the control border.' },
    ],
    gotchas: [
      'It takes no fixed height from the control scale — height comes from `rows` and content (min-height 80px). Size only drives padding and text.',
    ],
  },
  'input-group': {
    purpose: 'An input or textarea plus addon buttons/icons/text sharing one bordered, focus-ringed container.',
    whenToUse: [
      'A control with an adornment — a search icon, a trailing send button, a unit suffix, a chat composer.',
    ],
    whenNotToUse: [
      { instead: 'input', because: 'There is no adornment — a plain control is enough.' },
      { instead: 'text-field', because: 'You need a label and helper text, not inline addons.' },
      { instead: 'button-group', because: 'You are grouping buttons only, with no text entry.' },
    ],
    gotchas: [
      'Use `InputGroupInput`/`InputGroupTextarea` inside it, NOT this repo\'s Input/Textarea — the latter set border/background via inline style that beats the borderless classes the group needs.',
      '`InputGroupButton` defaults `iconOnly` from the presence of children; a text label works, but an icon-only button still needs `aria-label`.',
      'The group owns the height and cascades `size` via context — children must not set their own.',
    ],
  },

  // ── Progress / feedback ──────────────────────────────────────────────────────
  progress: {
    purpose: 'A determinate or indeterminate progress indicator — `{ Linear, Circular }`.',
    whenToUse: [
      'Showing how far along a known task is (determinate), or that a bounded operation is running (indeterminate bar/ring).',
    ],
    whenNotToUse: [
      { instead: 'spinner', because: 'You only need a small inline "working" glyph with no track.' },
      { instead: 'skeleton', because: 'You are reserving space for content whose layout you can mimic.' },
    ],
    gotchas: [
      'The root is `role="progressbar"`, which requires an accessible name — it defaults to "Loading"; pass `aria-label` for something specific.',
      'Default export is an object `{ Circular, Linear }`, not a single component.',
    ],
  },
  spinner: {
    purpose: 'A small indeterminate loading glyph (a spinning Loader icon).',
    whenToUse: [
      'A lightweight "working…" indicator inline — inside a button, beside a message, in a cell.',
    ],
    whenNotToUse: [
      { instead: 'progress', because: 'You can show a determinate percentage or want a full bar/ring.' },
      { instead: 'skeleton', because: 'You are loading a block of content and can mimic its shape.' },
    ],
    gotchas: [
      'It renders `role="status"` with `aria-label="Loading"` already — do not wrap it in another live region.',
    ],
  },
  skeleton: {
    purpose: 'A placeholder shape that mimics content while it loads.',
    whenToUse: [
      'Reserving the layout of forthcoming content — text lines, a card, an avatar — to avoid a reflow when data lands.',
    ],
    whenNotToUse: [
      { instead: 'spinner', because: 'A small inline indicator is enough and the layout is unknown.' },
      { instead: 'empty', because: 'There is genuinely no data to show (not a loading state).' },
    ],
    gotchas: [
      'Pass `animation={false}` for a static block inside `prefers-reduced-motion` contexts.',
    ],
  },

  // ── Navigation / sequence ─────────────────────────────────────────────────────
  breadcrumbs: {
    purpose: 'A trail showing the current page\'s position in a hierarchy.',
    whenToUse: [
      'Communicating where the user is within nested sections, with links back up the tree.',
    ],
    whenNotToUse: [
      { instead: 'tabs', because: 'You are switching between sibling views, not showing hierarchy.' },
      { instead: 'stepper', because: 'The items are sequential steps in a process, not ancestors.' },
      { instead: 'pagination', because: 'You are moving through pages of a list.' },
    ],
    gotchas: [
      'There is no Link component — each item navigates via its own `href`/`onClick`.',
      'Collapses middle items to an ellipsis once `items.length` exceeds `maxItems`, keeping first and last.',
    ],
  },
  pagination: {
    purpose: 'Controls for moving through paged data (prev/next, numbered pages, page-size).',
    whenToUse: [
      'Navigating a long list or table that is split into pages.',
      'Pick `variant`: simple (prev/next + readout), compact (what DataTable uses), or advanced (numbers + jump-to-page).',
    ],
    whenNotToUse: [
      { instead: 'stepper', because: 'The movement is through sequential steps of a flow, not data pages.' },
      { instead: 'breadcrumbs', because: 'You are showing hierarchy, not paging.' },
    ],
  },
  stepper: {
    purpose: 'A sequential multi-step process indicator with per-step status (completed/active/pending/error).',
    whenToUse: [
      'A wizard or checkout-style flow, or a read-only progress indicator across ordered steps.',
    ],
    whenNotToUse: [
      { instead: 'tabs', because: 'The views are peers switched in any order, not an ordered sequence.' },
      { instead: 'pagination', because: 'You are moving through data pages, not process steps.' },
      { instead: 'breadcrumbs', because: 'You are showing location in a hierarchy.' },
    ],
    gotchas: [
      'It is interactive (WAI-ARIA tablist, arrow-key nav) only when `onStepClick` is passed; otherwise it stays presentational, since a pure progress indicator has nothing to navigate to.',
    ],
  },
  tabs: {
    purpose: 'Switching between sibling views that occupy the same region, one at a time.',
    whenToUse: [
      'Peer panels in one context — Overview / Activity / Settings — where only one shows at once.',
    ],
    whenNotToUse: [
      { instead: 'accordion', because: 'Several sections may need to be open simultaneously.' },
      { instead: 'stepper', because: 'The panels are ordered steps the user progresses through.' },
      { instead: 'toggle-group', because: 'You are setting a value, not swapping content panels.' },
    ],
  },
  accordion: {
    purpose: 'A set of independently expandable panels (optionally single-open).',
    whenToUse: [
      'Stacked sections the user expands/collapses — an FAQ, grouped settings — possibly several at once (`allowMultiple`).',
    ],
    whenNotToUse: [
      { instead: 'collapsible', because: 'There is only ONE region to show/hide.' },
      { instead: 'tabs', because: 'Exactly one of a set of peer views should show at a time.' },
    ],
    gotchas: [
      '`defaultExpanded` is read once on mount — it is uncontrolled, not a controlled-state prop.',
    ],
  },
  collapsible: {
    purpose: 'A single show/hide region (a thin, unstyled Radix re-export).',
    whenToUse: [
      'Toggling one block of content open and closed — a "show more", an expandable row detail.',
    ],
    whenNotToUse: [
      { instead: 'accordion', because: 'You have a SET of panels to manage together.' },
    ],
    gotchas: [
      'Ships with no styling — compose the trigger/content with role-token classNames at the call site, same as upstream shadcn.',
    ],
  },

  // ── Tabular ────────────────────────────────────────────────────────────────
  table: {
    purpose: 'A config-driven table (columns + data arrays) covering sort, selection, loading, and pagination.',
    whenToUse: [
      'A straightforward table described declaratively, needing basic sort/select/pagination but not faceted filtering or custom cell infrastructure.',
    ],
    whenNotToUse: [
      { instead: 'data-table', because: 'You need TanStack-powered filtering, faceted filters, column typing or custom cells.' },
      { instead: 'data-grid', because: 'You want to own the table instance and compose toolbar/grid/pagination parts yourself.' },
    ],
    gotchas: [
      '`emptyMessage` is deprecated — use `emptyState` (a ReactNode), the name every data surface in the set shares.',
    ],
  },
  'data-grid': {
    purpose: 'The composable grid: the consumer owns the TanStack table instance and assembles Toolbar/Container/Table/Pagination parts.',
    whenToUse: [
      'You need to read or drive grid state from outside (which rows are selected, server-side pagination), or compose non-standard pieces around the grid.',
    ],
    whenNotToUse: [
      { instead: 'data-table', because: 'The one-component preset over this layer covers your case with far less wiring.' },
      { instead: 'table', because: 'A simple declarative table with no owned TanStack instance is enough.' },
    ],
    gotchas: [
      'In server mode the `table` holds only the current page, so `recordCount` must be supplied separately — the footer cannot derive the total.',
    ],
  },

  // ── Date ───────────────────────────────────────────────────────────────────
  'date-picker': {
    purpose: 'A field that opens a Calendar in a Popover to pick a date or range (with natural-language input parsing).',
    whenToUse: [
      'Choosing a date/range in a form or filter row, where the calendar should stay out of the way until opened.',
    ],
    whenNotToUse: [
      { instead: 'calendar', because: 'You want the month grid always visible inline, not behind a trigger.' },
      { instead: 'input', because: 'A plain free-text field (no date semantics) is what you need.' },
    ],
    gotchas: [
      'The trigger is styled as a FIELD (1px `border.default`, CONTROL_RADIUS) so it lines up with Input/Select beside it — set `size` from the shared control scale, not a hardcoded height.',
      'The Popover content portals to document.body, outside the dashboard typography scope.',
    ],
  },
  calendar: {
    purpose: 'An inline, always-visible month grid for date or range selection (react-day-picker v10).',
    whenToUse: [
      'Embedding a calendar directly in the page — a booking view, a date panel — with no popover.',
    ],
    whenNotToUse: [
      { instead: 'date-picker', because: 'You want a compact field that reveals the calendar on demand.' },
    ],
    gotchas: [
      'Built for react-day-picker v10, whose prop API (the `UI` enum, single `Chevron` component) differs from v8-era shadcn recipes — a copy-pasted v8 snippet will not compile.',
    ],
  },

  // ── Misc with a clear purpose ──────────────────────────────────────────────────
  avatar: {
    purpose: 'A user/entity image with an automatic initials fallback, optional status dot and corner badge.',
    whenToUse: [
      'Representing a person or entity — a profile photo that degrades to initials when the image is absent or fails.',
    ],
    whenNotToUse: [
      { instead: 'image-with-fallback', because: 'You are showing a general content image, not a person/entity avatar.' },
      { instead: 'badge', because: 'You only need the standalone status/count marker, not an avatar.' },
    ],
    gotchas: [
      '`alt` defaults to a generic "User Avatar" — pass a real name/role when the identity matters to the page.',
      'Passing `onClick` makes it `role="button"` with keyboard activation — only do so when it is genuinely actionable.',
    ],
  },
  empty: {
    purpose: 'Composable empty-state primitives (Empty/EmptyHeader/EmptyMedia/…) for a "no content" placeholder.',
    whenToUse: [
      'Communicating that a list, search, or inbox has nothing to show, usually with an icon, message and a CTA.',
    ],
    whenNotToUse: [
      { instead: 'skeleton', because: 'Content is still loading rather than genuinely absent.' },
      { instead: 'error-state', because: 'A fetch failed — that is an error, not an empty result.' },
      { instead: 'data-state', because: 'You want the four-state wrapper to pick loading/error/empty/ready for you.' },
    ],
  },
  command: {
    purpose: 'A searchable command palette / filterable list (cmdk), optionally in a dialog.',
    whenToUse: [
      'A ⌘K-style palette of actions, or a filterable list of items with keyboard navigation.',
    ],
    whenNotToUse: [
      { instead: 'combobox', because: 'You are selecting a single VALUE for a form (Combobox is built on this).' },
      { instead: 'dropdown-menu', because: 'A short, fixed menu of actions from a trigger is enough.' },
      { instead: 'select', because: 'A plain value picker over a short list is simpler.' },
    ],
    gotchas: [
      'Use `CommandDialog` to present it as an overlay — it wraps Command in a Dialog and portals to document.body.',
    ],
  },
  carousel: {
    purpose: 'A swipeable/scrollable slide container (Embla), horizontal or vertical.',
    whenToUse: [
      'Stepping through a sequence of slides/cards with prev/next controls or drag/swipe.',
    ],
    whenNotToUse: [
      { instead: 'tabs', because: 'The content is a small set of discrete, labelled views.' },
      { instead: 'scroll-area', because: 'You just need a scrollable region, not slide/snap navigation.' },
    ],
    gotchas: [
      'Children must render inside `<Carousel>` — the parts throw if used outside its context. `setApi` exposes the Embla instance for custom controls.',
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Maturity — how settled a component's API is
// ─────────────────────────────────────────────────────────────────────────
//
// A consumer could not previously tell a settled primitive (Button, Input)
// from one whose API is still moving (the Sept-2026 composable data-grid
// layer). `maturity` makes that legible.
//
//   - stable:       API settled; breaking changes only on a major. The DEFAULT.
//   - beta:         new surface, still settling. Safe to use; may change.
//   - experimental: bespoke or actively-iterated; expect breaking changes.
//
// Like CONTRACTS, this is a PARTIAL OVERRIDE map, not a field on every entry:
// `stable` is the default and is NOT listed, so the map holds only the
// components that are not yet stable. Everything listed here is from the newest
// cohort (git first-add 2026-09+) or is a bespoke/in-flux surface — the call is
// evidence-based, not a vibe. `maturityOf()` resolves 'stable' for anything
// unlisted, so EVERY taxonomy entry has a maturity (taxonomy.test.ts enforces).

export type Maturity = 'stable' | 'beta' | 'experimental';

export const MATURITY_OVERRIDES: Record<string, Exclude<Maturity, 'stable'>> = {
  // Bespoke, actively-iterated surfaces — AI chat and the questionnaire flow.
  // Not general-purpose primitives; their shape still moves with product needs.
  bubble: 'experimental',
  message: 'experimental',
  'message-scroller': 'experimental',
  questionnaire: 'experimental',

  // The composable data-grid layer and its internal parts (added 2026-09-25):
  // the consumer-owns-the-instance API is newer than `table`/`data-table` and
  // still settling. Internals are beta because they are only ever composed
  // inside `data-grid`, never used directly.
  'data-grid': 'beta',
  'data-grid-bulk-actions': 'beta',
  'data-grid-cell-edit': 'beta',
  'data-grid-pagination': 'beta',
  'data-grid-row-actions': 'beta',
  'data-grid-rows': 'beta',
  'data-grid-selection': 'beta',
  'data-grid-table': 'beta',
  'data-grid-toolbar': 'beta',

  // The data-table faceted/date/sort filter internals (added 2026-09).
  'data-table-date-filter': 'beta',
  'data-table-faceted-filter': 'beta',
  'data-table-sort-list': 'beta',

  // The filters module — the first directory-shaped component, added 2026-09.
  filters: 'beta',
  'filter-bar': 'beta',
  'filter-chip': 'beta',
  'filter-controls': 'beta',
  'filter-field-control': 'beta',

  // New data-viz atom (added 2026-09-24).
  sparkline: 'beta',
};

/**
 * Maturity for a component file basename. Returns 'stable' for anything not in
 * MATURITY_OVERRIDES, so every classified component resolves to a maturity.
 */
export function maturityOf(component: string): Maturity {
  return MATURITY_OVERRIDES[component] ?? 'stable';
}

/** Component basenames at a given maturity, sorted. */
export function byMaturity(maturity: Maturity): string[] {
  return Object.keys(TAXONOMY)
    .filter((c) => maturityOf(c) === maturity)
    .sort();
}

/** The contract for a component module, or undefined if none is written yet. */
export function contractOf(component: string): ComponentContract | undefined {
  return CONTRACTS[component];
}

/** Ratio of taxonomy'd modules that carry a contract — feeds ds:score. */
export function contractCoverage(): { withContract: number; total: number } {
  const total = Object.keys(TAXONOMY).length;
  const withContract = Object.keys(CONTRACTS).filter((k) => k in TAXONOMY).length;
  return { withContract, total };
}

// ─────────────────────────────────────────────────────────────────────────
// Code Connect mappability — the honest denominator for coverage
// ─────────────────────────────────────────────────────────────────────────
//
// Figma Code Connect attaches a code snippet to a Figma NODE. A component with
// no Figma node cannot be mapped — so counting it as a coverage "gap" makes the
// metric unreachable by construction. Before this list, the metric's
// denominator was a raw walk of src/components/ui that counted 118 things: 19
// non-component .ts files (hooks, schemas, control-size.ts, taxonomy.ts
// itself), 6 nested internal .tsx parts, and the code-only components below.
// None of those have a Figma counterpart; chasing 118/118 meant fabricating
// node IDs (the StatusCard `// TODO: Update node ID` placeholder is that
// anti-pattern leaking in).
//
// CODE_ONLY names the taxonomy components that are deliberately un-mappable,
// each with the reason. Everything else in TAXONOMY is the mappable set. When
// in doubt a component stays mappable (keeps coverage honest-low), so this list
// holds only the unambiguous cases: internal sub-parts of a larger mapped
// component, headless layout/behaviour primitives, providers, and render-state
// glue. A code-only component can still carry a CONTRACT (stack, page-shell do)
// — being un-mappable in Figma says nothing about being useful in code.
export const CODE_ONLY: Record<string, string> = {
  // Headless layout / behaviour primitives — no visual design to attach to.
  'aspect-ratio': 'Radix layout primitive; constrains ratio, renders nothing of its own.',
  'scroll-area': 'Radix viewport primitive; the scrollbars are the only visual, not a Figma component.',
  resizable: 'Radix panel-group primitive; the drag handles have no standalone Figma node.',
  stack: 'Layout primitive (Stack/Inline) — spacing as a type, no Figma component.',
  'page-shell': 'Template scaffold (header/sidebar/content slots), not a drawable component.',
  // Providers / mounts — infrastructure, not a surface a designer selects.
  toaster: 'The mount point that renders queued `toast`es; `toast` is the mappable surface.',
  'badge-anchor': 'Positioning wrapper that pins a `badge` to a corner; `badge` carries the design.',
  'data-state': 'Render-state slot (loading/empty/error switch) — composition glue, not a surface.',
  'error-state': 'Render-state slot paired with `data-state`; `empty` is the mappable empty-state surface.',
  'table-primitives': 'Internal <thead>/<tbody>/<td> element set used by `table`/`data-table`.',
  // data-grid internals — render inside `data-grid`, never selected alone in Figma.
  'data-grid-bulk-actions': 'Internal part of `data-grid`.',
  'data-grid-cell-edit': 'Internal part of `data-grid`.',
  'data-grid-pagination': 'Internal part of `data-grid`.',
  'data-grid-row-actions': 'Internal part of `data-grid`.',
  'data-grid-rows': 'Internal part of `data-grid`.',
  'data-grid-selection': 'Internal part of `data-grid`.',
  'data-grid-table': 'Internal part of `data-grid`.',
  'data-grid-toolbar': 'Internal part of `data-grid`.',
  // data-table internals — the public surface is `data-table`.
  'data-table-date-filter': 'Internal filter part of `data-table`.',
  'data-table-faceted-filter': 'Internal filter part of `data-table`.',
  'data-table-sort-list': 'Internal sort part of `data-table`.',
  // filter internals — the public surfaces are `filter-bar` and `filter-chip`.
  'filter-controls': 'Internal composition of `filters`/`filter-bar`.',
  'filter-field-control': 'Internal per-field control of `filters`/`filter-bar`.',
};

/** Components eligible for a Figma Code Connect mapping: taxonomy minus CODE_ONLY. */
export function figmaMappable(): string[] {
  return Object.keys(TAXONOMY)
    .filter((c) => !(c in CODE_ONLY))
    .sort();
}
