import figma from '@figma/code-connect';
import { Slider } from '../components/ui/slider';

/**
 * Code Connect — Slider
 *
 * No MDS/Figma spec exists for this component (see slider.tsx's own
 * docblock) — a Radix `Slider` wrapper. `disabled` is a real prop; `value`/
 * `defaultValue` take an array, so "Range" is represented by rendering a
 * two-thumb slider rather than threading a figma.enum into a tuple shape.
 */
const NODE_URL = '${LIB}?node-id=7582-21784';

figma.connect(Slider, NODE_URL, {
  props: {
    disabled: figma.boolean('Disabled'),
    isRange: figma.boolean('Is Range'),
  },
  example: (props) =>
    props.isRange ? (
      <Slider defaultValue={[25, 75]} max={100} step={1} disabled={props.disabled} aria-label="Range" />
    ) : (
      <Slider defaultValue={[50]} max={100} step={1} disabled={props.disabled} aria-label="Value" />
    ),
});
