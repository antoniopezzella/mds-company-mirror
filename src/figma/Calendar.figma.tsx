import figma from '@figma/code-connect';
import { Calendar } from '../components/ui/calendar';

/**
 * Code Connect — Calendar
 *
 * `react-day-picker` v10's `DayPickerProps` is a discriminated union keyed on
 * `mode` — passing a variable string as `mode` does not type-check, so the
 * "Is Range" variant branches to two literal `mode="single"` / `mode="range"`
 * usages instead of threading a figma.enum value into the prop.
 */
const NODE_URL = '${LIB}?node-id=7581-6168';

figma.connect(Calendar, NODE_URL, {
  props: {
    isRange: figma.boolean('Is Range'),
  },
  example: (props) =>
    props.isRange ? (
      <Calendar mode="range" numberOfMonths={2} />
    ) : (
      <Calendar mode="single" />
    ),
});
