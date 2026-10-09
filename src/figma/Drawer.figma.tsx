import figma from '@figma/code-connect';
import { Button } from '../components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../components/ui/drawer';

/**
 * Code Connect — Drawer (Base UI)
 *
 * Built on `@base-ui/react/drawer`, not Radix — see drawer.tsx's own
 * docblock. Trigger/Close use Base UI's `render` prop (not `asChild`) to
 * swap in the real `Button`, which is the pattern drawer.stories.tsx uses
 * throughout. `swipeDirection` is the one prop this node's variants map to;
 * `showSwipeHandle` exists on `DrawerContent` but has no corresponding Figma
 * variant on this node, so it is left at its default.
 */
const NODE_URL = '${LIB}?node-id=7592-24187';

figma.connect(Drawer, NODE_URL, {
  props: {
    swipeDirection: figma.enum('Direction', {
      Up: 'up',
      Down: 'down',
      Left: 'left',
      Right: 'right',
    }),
  },
  example: (props) => (
    <Drawer swipeDirection={props.swipeDirection}>
      <DrawerTrigger render={<Button variant="secondary">Open drawer</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter claims</DrawerTitle>
          <DrawerDescription>Swipe, or drag the handle, to dismiss.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="primary">Apply</Button>
          <DrawerClose render={<Button variant="secondary">Cancel</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
});
