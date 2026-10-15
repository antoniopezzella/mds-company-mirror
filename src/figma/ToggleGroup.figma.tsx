import figma from '@figma/code-connect';
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';

/**
 * Code Connect — ToggleGroup
 *
 * No MDS/Figma spec exists for this component (see toggle-group.tsx's own
 * docblock) — a Radix ToggleGroup wrapper. `type` ('single'|'multiple')
 * changes Radix's own value shape (string vs string[]), so it is expressed
 * as two literal branches rather than threading a figma.enum into `type`,
 * which would require the `value`/`defaultValue` shape to vary with it too.
 */
const NODE_URL = '${LIB}?node-id=7582-22075';

figma.connect(ToggleGroup, NODE_URL, {
  props: {
    isMultiple: figma.boolean('Is Multiple'),
    variant: figma.enum('Variant', {
      Default: 'default',
      Outline: 'outline',
    }),
  },
  example: (props) =>
    props.isMultiple ? (
      <ToggleGroup type="multiple" defaultValue={['bold']} variant={props.variant}>
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          I
        </ToggleGroupItem>
      </ToggleGroup>
    ) : (
      <ToggleGroup type="single" defaultValue="left" variant={props.variant}>
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    ),
});
