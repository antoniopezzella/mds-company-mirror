export interface GuidanceAvoidEntry {
  /** Leading text; ends right before the linked component's label. */
  text: string;
  /** id of the component this text points to — resolved to a real route by ComponentSection. */
  relatedComponentId?: string;
  /** Visible link text, e.g. "Textarea". Required when relatedComponentId is set. */
  relatedLabel?: string;
}

export interface ComponentGuidance {
  use: string[];
  avoid: GuidanceAvoidEntry[];
}

/**
 * Single source of truth for "use this / not this" guidance, cross-linked
 * between components. Modeled on Savant's `svGuidance` data object, adapted
 * for real React Router links instead of markdown-string anchors.
 * A component with no entry here simply renders no guidance block.
 */
export const guidance: Record<string, ComponentGuidance> = {
  'page-shell': {
    use: [
      'You are starting a dashboard page and need header + sidebar + content.',
      'You want the skip link and the min-w-0 chain handled for you — a single missing min-w-0 makes a wide table scroll the whole page sideways.',
    ],
    avoid: [
      { text: 'The page is a marketing or content page, not an application screen.' },
      { text: 'You only need to stack a few sections — Stack and Inline cover that (see Storybook: Components/Stack).' },
    ],
  },
  'stat-card': {
    use: [
      'A headline number a user scans before anything else.',
      'You have a change versus a comparison period — pass `delta` and let the direction derive from its sign.',
    ],
    avoid: [
      { text: 'The number needs no emphasis and belongs in a table row or list.' },
      { text: 'You are showing a status rather than a metric — use ', relatedComponentId: 'badge', relatedLabel: 'Badge' },
    ],
  },
  'data-state': {
    use: [
      'Any surface that renders fetched data — it must be able to say loading, failed, empty and ready.',
      'You need to distinguish "no data at all" from "a filter excluded everything"; they need different words and different recovery actions.',
    ],
    avoid: [
      { text: 'The content is static and cannot fail to load.' },
      { text: 'You mean form validation — that is `error`/`invalid` on the field, a different axis entirely.' },
    ],
  },
  'filter-bar': {
    use: [
      'Filters that drive the query and narrow the dataset before it reaches the table.',
      'You need date presets, or chips showing the user what is currently narrowing their view.',
    ],
    avoid: [
      { text: 'You are filtering within rows already fetched, per column — use DataTable\'s own faceted filters: ', relatedComponentId: 'data-table', relatedLabel: 'DataTable' },
      { text: 'There is a single control; a lone Select needs no bar around it.' },
    ],
  },
  'data-table': {
    use: [
      'Tabular data needing sorting, column filtering, selection or pagination.',
      'You want server-side pagination — pass `manualPagination` with `pageCount`.',
    ],
    avoid: [
      { text: 'The data is a simple list with no columns — use ', relatedComponentId: 'table', relatedLabel: 'Table' },
      { text: 'You are rendering thousands of unpaginated rows; neither table virtualizes yet.' },
    ],
  },
  sparkline: {
    use: [
      'Showing the shape of a trend beside a number, where the exact values do not matter.',
      'Space is tight — a KPI tile, a table cell, a list row.',
    ],
    avoid: [
      { text: 'The reader needs to read values off the chart — it has no axes, labels or tooltip.' },
      { text: 'You need a real chart with a legend — use the Chart wrapper around Recharts.' },
    ],
  },

  button: {
    use: ['The action is the point of the screen or section: submit, confirm, continue.', 'You can name one primary action and demote the rest to secondary.'],
    avoid: [],
  },
  'text-field': {
    use: ['The answer is short and free-form: a name, an email, a policy number.', 'You cannot predict the set of valid answers.'],
    avoid: [
      { text: 'The answer runs to sentences, which is a ', relatedComponentId: 'textarea', relatedLabel: 'Textarea' },
      { text: 'The answer comes from a known list, which is a ', relatedComponentId: 'select', relatedLabel: 'Select' },
      { text: ' or ', relatedComponentId: 'radio-group', relatedLabel: 'Radio group' },
    ],
  },
  textarea: {
    use: ['The answer is more than one line: a message, a description, a note.', 'The user benefits from seeing what they have written all at once.'],
    avoid: [{ text: 'The value is a single short string, which is a ', relatedComponentId: 'text-field', relatedLabel: 'Text field' }],
  },
  select: {
    use: ['Exactly one answer applies and the option list is long enough (roughly five or more) that radios would crowd the layout.', 'The options are self-explanatory and need no description.'],
    avoid: [
      { text: 'There are only two to four options worth seeing at once, which reads better as a ', relatedComponentId: 'radio-group', relatedLabel: 'Radio group' },
      { text: 'More than one option can apply, which is a ', relatedComponentId: 'checkbox', relatedLabel: 'Checkbox' },
    ],
  },
  checkbox: {
    use: ['Several options can be true at the same time.', 'You need a tri-state value — checked, unchecked, or indeterminate (e.g. "select all" when some items are already selected).'],
    avoid: [
      { text: 'Only one choice is allowed and the list is long, which is a ', relatedComponentId: 'select', relatedLabel: 'Select' },
      { text: 'Only one choice is allowed and every option should stay visible, which is a ', relatedComponentId: 'radio-group', relatedLabel: 'Radio group' },
    ],
  },
  'radio-group': {
    use: ['Exactly one answer applies, and there are few enough options (roughly two to four) to show all of them at once.'],
    avoid: [
      { text: 'The option list is long, which is a ', relatedComponentId: 'select', relatedLabel: 'Select' },
      { text: 'More than one option can apply, which is a ', relatedComponentId: 'checkbox', relatedLabel: 'Checkbox' },
      { text: 'The value takes effect immediately rather than on submit, which is a ', relatedComponentId: 'switch', relatedLabel: 'Switch' },
    ],
  },
  switch: {
    use: ['The change takes effect immediately, with no separate save/submit step.', 'The setting is a clear binary: on or off.'],
    avoid: [{ text: 'The choice is only committed when a form is submitted, which is a ', relatedComponentId: 'checkbox', relatedLabel: 'Checkbox' }],
  },
  slider: {
    use: ['The value is numeric and continuous, and the exact number matters less than the relative position.'],
    avoid: [{ text: 'The exact value needs to be typed precisely, which is a ', relatedComponentId: 'text-field', relatedLabel: 'Text field' }],
  },
  stepper: {
    use: ['A task is broken into a fixed, ordered sequence of steps the user moves through.'],
    avoid: [],
  },
  alert: {
    use: ['The message is persistent and inline — part of the page layout, not a temporary interruption.'],
    avoid: [{ text: 'The message should appear briefly and disappear on its own, which is a ', relatedComponentId: 'toast', relatedLabel: 'Toast' }],
  },
  toast: {
    use: ['Confirming an action just taken (saved, sent, deleted) without blocking the rest of the page.'],
    avoid: [{ text: 'The message needs to stay visible until the user dismisses it, which is an ', relatedComponentId: 'alert', relatedLabel: 'Alert' }],
  },
  tooltip: {
    use: ['A short clarification for an icon-only control or an unfamiliar term.'],
    avoid: [{ text: 'The content is essential to complete the task, which belongs inline or in a ', relatedComponentId: 'dialog', relatedLabel: 'Dialog' }],
  },
  dialog: {
    use: ['The task needs the user’s full attention and blocks interaction with the rest of the page until resolved.'],
    avoid: [{ text: 'The message is a brief confirmation that does not need to block anything, which is a ', relatedComponentId: 'toast', relatedLabel: 'Toast' }],
  },
  progress: {
    use: ['A task has a knowable duration or completion percentage worth communicating.'],
    avoid: [{ text: 'The duration is unknown and brief, which is a ', relatedComponentId: 'spinner', relatedLabel: 'Spinner' }],
  },
  spinner: {
    use: ['A brief, indeterminate wait with no meaningful percentage to show.'],
    avoid: [{ text: 'The task has a real, worth-communicating completion percentage, which is ', relatedComponentId: 'progress', relatedLabel: 'Progress' }],
  },
};
