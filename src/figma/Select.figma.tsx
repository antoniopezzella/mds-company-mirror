import figma from '@figma/code-connect';
import { DSSelect } from '../components/ui/select';

/** Code Connect — Dropdown / Select (V3 Forms) */
const NODE_URL = '${LIB}?node-id=7582-10463';

figma.connect(DSSelect, NODE_URL, {
  props: {
    hasDropdownList: figma.enum('Has Dropdown list', {
      Yes: true,
      No: false,
    }),
  },
  example: (_props: any) => (
    <DSSelect
      label="Select option"
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]}
    />
  ),
});
