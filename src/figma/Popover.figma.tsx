import figma from '@figma/code-connect';
import { Button } from '../components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';

/**
 * Code Connect — Popover
 *
 * No MDS/Figma spec exists for this component (see popover.tsx's own
 * docblock) — built on Radix Popover. `align` is the one prop exposed on
 * `PopoverContent`; `Popover`/`PopoverTrigger` themselves take no props this
 * node would plausibly vary.
 */
const NODE_URL = '${LIB}?node-id=7584-33313';

figma.connect(PopoverContent, NODE_URL, {
  props: {
    align: figma.enum('Align', {
      Start: 'start',
      Center: 'center',
      End: 'end',
    }),
  },
  example: (props) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          Open popover
        </Button>
      </PopoverTrigger>
      <PopoverContent align={props.align}>
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">Dimensions</h4>
          <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
});
