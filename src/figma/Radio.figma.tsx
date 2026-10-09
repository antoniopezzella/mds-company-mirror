import figma from '@figma/code-connect';
import { DSRadioGroup } from '../components/ui/radio-group';

/**
 * Code Connect — Radio (V3 Forms)
 *
 * Repointed from the deleted `src/components/Radio` (MUI) to
 * `ui/radio-group`'s `DSRadioGroup`. The shadcn/Radix track has no
 * standalone controlled `<Radio checked>` the way MUI did — a Radix radio's
 * checked visuals are derived from its group's `value`, not an own `checked`
 * prop — so the Figma node (a single radio option) is represented here as a
 * one-option `DSRadioGroup`, selected or not via `value`.
 */
const NODE_URL = '${LIB}?node-id=7582-8674';

figma.connect(DSRadioGroup, NODE_URL, {
  props: {
    checked: figma.enum('Is Checked', {
      True: true,
      False: false,
    }),
    invalid: figma.enum('Invalid', {
      Yes: true,
      No: false,
    }),
  },
  example: (props) => (
    <DSRadioGroup
      options={[{ value: 'option-1', label: 'Radio option' }]}
      value={props.checked ? 'option-1' : undefined}
      error={props.invalid}
    />
  ),
});
