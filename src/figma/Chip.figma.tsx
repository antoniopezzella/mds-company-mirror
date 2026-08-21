import figma from '@figma/code-connect';
import { Chip } from '../components/ui/chip';

/** Code Connect — Chip (V3 Forms) */
const NODE_URL = '${LIB}?node-id=7582-8362';

figma.connect(Chip, NODE_URL, {
  props: {
    label: figma.string('Label'),
    type: figma.enum('Type', {
      Filter: 'filter',
      Input: 'input',
    }),
    selected: figma.enum('Selected', {
      True: true,
      False: false,
    }),
    isRemovable: figma.boolean('Is removable'),
    hasAvatar: figma.boolean('Has Avatar'),
    hasLeftIcon: figma.boolean('Has Left Icon'),
    hasBadgeNumber: figma.boolean('Has badge number'),
  },
  example: (props: any) => (
    <Chip
      label={props.label}
      variant="filled"
      selected={props.selected}
      onDelete={props.isRemovable ? () => {} : undefined}
    />
  ),
});
