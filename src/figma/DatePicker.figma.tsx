import figma from '@figma/code-connect';
import { DatePicker } from '../components/ui/date-picker';

/**
 * Code Connect — DatePicker
 *
 * No MDS/Figma spec exists for this component — built matching every
 * variant on shadcn/ui's own documented date-picker patterns (see
 * date-picker.tsx's own docblock: Popover + Calendar + Button/Input, no
 * standalone primitive exists upstream either). This maps the single-date
 * `DatePicker`; `DateRangePicker`/`DatePickerInput`/`DateTimePicker`/
 * `SmartDatePicker` are separate exports from the same module with no
 * corresponding variant on this node.
 */
const NODE_URL = '${LIB}?node-id=7582-22276';

figma.connect(DatePicker, NODE_URL, {
  props: {
    placeholder: figma.string('Placeholder'),
  },
  example: (props) => <DatePicker placeholder={props.placeholder} />,
});
