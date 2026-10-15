import figma from '@figma/code-connect';
import { DSTextField } from '../components/ui/text-field';

/**
 * Code Connect — Input / TextField (V3 Forms)
 *
 * Repointed from the deleted `src/components/TextField` (MUI) to
 * `ui/text-field`'s `DSTextField` — see its own docblock: a `ui/` shim with
 * the same `label`/`helperText`/`error`/`tone`/`size`/`fullWidth` shape as
 * the MUI twin, so most of this mapping ports unchanged. `type`'s enum
 * values (`text`/`file`/`search`/`number`/`textarea`) are all still valid:
 * the first four are real `HTMLInputTypeAttribute`s passed straight to the
 * underlying `<input type>`, and `'textarea'` is the literal that switches
 * rendering to a `<Textarea>`. `size`'s `medium`/`small` values are in
 * `DSTextFieldProps['size']` verbatim.
 *
 * `hasLeftIcon`, `hasRightIcon`, `hasCharacterCount`, and `isOptional` are
 * dropped — `DSTextField`/`Input` have no icon-adornment slot (`input.tsx`'s
 * own docblock says to compose `InputGroup` instead, there is no prop here),
 * no character-counter display, and no "optional" indicator prop to target.
 * `hasLabel` now actually gates `label` in the example, which the previous
 * (MUI) mapping declared but never used.
 */
const NODE_URL = '${LIB}?node-id=7582-15977';

figma.connect(DSTextField, NODE_URL, {
  props: {
    label: figma.string('Label Text'),
    hasHelper: figma.boolean('Has Helper'),
    hasLabel: figma.boolean('Has Label'),
    isRequired: figma.boolean('Is Required'),
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
      label={props.hasLabel ? props.label : undefined}
      type={props.type}
      size={props.size}
      error={props.invalid}
      required={props.isRequired}
      helperText={props.hasHelper ? 'Helper text' : undefined}
    />
  ),
});
