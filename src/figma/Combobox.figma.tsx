import figma from '@figma/code-connect';
import { Combobox } from '../components/ui/combobox';

/**
 * Code Connect — Combobox
 *
 * No MDS/Figma spec exists for this component (see combobox.tsx's own
 * docblock) — a Popover + Command composition, unlike `Select`, letting the
 * user type to filter a long option list. `role="combobox"` has no
 * name-from-content per ARIA, so `aria-label` is required in the example —
 * omitting it fails axe's `button-name` check (see the prop's own JSDoc).
 */
const NODE_URL = '${LIB}?node-id=7582-10463';

figma.connect(Combobox, NODE_URL, {
  props: {
    placeholder: figma.string('Placeholder'),
    disabled: figma.boolean('Disabled'),
  },
  example: (props) => (
    <Combobox
      aria-label="Select a client"
      placeholder={props.placeholder}
      disabled={props.disabled}
      options={[
        { value: 'beacon', label: 'Beacon Capital Partners' },
        { value: 'northwind', label: 'Northwind Insurance' },
        { value: 'globex', label: 'Globex Corporation' },
      ]}
    />
  ),
});
