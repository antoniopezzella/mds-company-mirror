import figma from '@figma/code-connect';
import { FilterChip } from '../components/ui/filter-chip';

/**
 * Code Connect — FilterChip
 *
 * A toggleable filter control carrying selection via a leading checkmark +
 * `aria-pressed`, not colour alone (see filter-chip.tsx's own docblock on
 * why this is a separate component from `Chip`). `onRemove` is omitted from
 * the example when the node has no "has remove" variant — passing it always
 * would force the two-button (chip + ×) layout regardless of the Figma
 * variant.
 */
const NODE_URL = '${LIB}?node-id=7582-8362';

figma.connect(FilterChip, NODE_URL, {
  props: {
    label: figma.string('Label'),
    selected: figma.boolean('Selected'),
    hasMenu: figma.boolean('Has Menu'),
    removable: figma.boolean('Removable'),
    disabled: figma.boolean('Disabled'),
  },
  example: (props) => (
    <FilterChip
      label={props.label}
      selected={props.selected}
      hasMenu={props.hasMenu}
      disabled={props.disabled}
      onRemove={props.removable ? () => {} : undefined}
    />
  ),
});
