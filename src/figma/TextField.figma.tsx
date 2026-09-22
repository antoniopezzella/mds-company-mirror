import figma from '@figma/code-connect';
import DSTextField from '../components/TextField/TextField';

/** Code Connect — Input / TextField (V3 Forms) */
const NODE_URL = '${LIB}?node-id=7582-15977';

figma.connect(DSTextField, NODE_URL, {
  props: {
    label: figma.string('Label Text'),
    hasHelper: figma.boolean('Has Helper'),
    hasLabel: figma.boolean('Has Label'),
    hasCharacterCount: figma.boolean('Has Character Count'),
    hasLeftIcon: figma.boolean('Has left Icon'),
    hasRightIcon: figma.boolean('Has Right Icon'),
    isRequired: figma.boolean('Is Required'),
    isOptional: figma.boolean('Is Optional'),
    type: figma.enum('Type', {
      Input: 'text',
      'File Upload': 'file',
      'Filter Search': 'search',
      Numerical: 'number',
      'Text Field': 'textarea',
    }),
    invalid: figma.enum('Invalid', {
      Yes: true,
      No: false,
    }),
    size: figma.enum('Size', {
      Default: 'medium',
      Small: 'small',
    }),
  },
  example: (props) => (
    <DSTextField
      label={props.label}
      type={props.type}
      size={props.size}
      error={props.invalid}
      required={props.isRequired}
      helperText={props.hasHelper ? 'Helper text' : undefined}
    />
  ),
});
