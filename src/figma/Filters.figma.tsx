import figma from '@figma/code-connect';
import { Filters } from '../components/ui/filters';
import type { FilterField } from '../components/ui/filters/filters-schema';

/**
 * Code Connect — Filters
 *
 * A query system — `FIELD → OPERATOR → VALUE` rendered as segmented button
 * groups, not pills (see filters.tsx's own docblock). `fields` is a schema
 * the host product supplies; the component has no knowledge of policies,
 * assets or claims, so the example uses a representative field set rather
 * than inventing domain data to satisfy an unused prop. `readOnly`/
 * `disabled` are the only boolean toggles this node's variants plausibly
 * carry — `query`/`onQueryChange` are state, not Figma-side variants.
 */
const NODE_URL = '${LIB}?node-id=7582-11681';

const FIELDS: FilterField[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Pending', label: 'Pending' },
    ],
  },
  { id: 'premium', label: 'Premium', type: 'number', unit: 'currency' },
];

figma.connect(Filters, NODE_URL, {
  props: {
    readOnly: figma.boolean('Read Only'),
    disabled: figma.boolean('Disabled'),
  },
  example: (props) => <Filters fields={FIELDS} readOnly={props.readOnly} disabled={props.disabled} />,
});
