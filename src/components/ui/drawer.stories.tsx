import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';
import { Button } from './button';

/**
 * # Drawer (shadcn/ui, Base UI)
 *
 * Swipe-to-dismiss, snap-point-capable drawer — genuinely different from
 * (not a duplicate of) this repo's Radix-based `Sheet`, which stays the
 * right choice for non-swipe side panels like NotificationsDrawer. The
 * first component in this repo built on Base UI rather than Radix; see the
 * sourcing note in drawer.tsx for why.
 */
const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const BottomSheet: Story = {
  name: 'Bottom sheet (swipeDirection="down")',
  render: () => (
    <Drawer swipeDirection="down">
      <DrawerTrigger render={<Button variant="secondary">Open bottom sheet</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter claims</DrawerTitle>
          <DrawerDescription>Swipe down, or drag the handle, to dismiss.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-2 text-sm text-muted-foreground">Filter controls would go here.</div>
        <DrawerFooter>
          <Button variant="primary">Apply</Button>
          <DrawerClose render={<Button variant="secondary">Cancel</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const SidePanel: Story = {
  name: 'Side panel (swipeDirection="right")',
  render: () => (
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button variant="secondary">Open side panel</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Claim details</DrawerTitle>
          <DrawerDescription>Swipe right to dismiss on touch devices.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-2 text-sm text-muted-foreground">Claim detail content would go here.</div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="secondary">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
