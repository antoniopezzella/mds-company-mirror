import figma from '@figma/code-connect';
import { Button } from '../components/ui/button';
import { ButtonGroup } from '../components/ui/button-group';

/**
 * Code Connect — ButtonGroup
 *
 * `ButtonGroup` has no `size` prop of its own — size is set on the child
 * `Button`s and cascades through `ControlSizeContext` (see button-group.tsx's
 * own docblock and its Storybook "Sizes" story). Only `orientation` is a real
 * prop on the group itself, so that is all that is mapped; a Figma "Size"
 * variant, if one exists on this node, would have no code-side target here.
 */
const NODE_URL = '${LIB}?node-id=7580-3329';

figma.connect(ButtonGroup, NODE_URL, {
  props: {
    orientation: figma.enum('Orientation', {
      Horizontal: 'horizontal',
      Vertical: 'vertical',
    }),
  },
  example: (props) => (
    <ButtonGroup aria-label="Actions" orientation={props.orientation}>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
});
