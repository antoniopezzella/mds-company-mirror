import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

/**
 * # Sheet
 *
 * No MDS/Figma spec exists for this component — built directly on a side-anchored Dialog variant, reusing
 * `@radix-ui/react-dialog` and styled with `getRoleColor()`.
 */
const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Right: StoryObj = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Open (right)</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit filters</SheetTitle>
          <SheetDescription>Adjust the filters applied to the policy list.</SheetDescription>
        </SheetHeader>
        <p className="text-sm">Sheet body content goes here.</p>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" size="sm">Cancel</Button>
          </SheetClose>
          <Button variant="primary" size="sm">Apply</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: StoryObj = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Open (left)</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <p className="text-sm">Useful for a mobile nav drawer.</p>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: StoryObj = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Open (top)</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Announcement</SheetTitle>
        </SheetHeader>
        <p className="text-sm">Slides down from the top.</p>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: StoryObj = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Open (bottom)</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick actions</SheetTitle>
        </SheetHeader>
        <p className="text-sm">Slides up from the bottom — useful for mobile action sheets.</p>
      </SheetContent>
    </Sheet>
  ),
};
