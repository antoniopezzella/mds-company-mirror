import type { Meta, StoryObj } from '@storybook/react-vite';
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
 * # Sheet (shadcn/ui)
 *
 * No MDS/Figma spec exists for this component — built matching real
 * shadcn/ui conventions directly (a side-anchored Dialog variant), reusing
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
        <button className="rounded border px-3 py-1.5 text-sm">Open (right)</button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit filters</SheetTitle>
          <SheetDescription>Adjust the filters applied to the policy list.</SheetDescription>
        </SheetHeader>
        <p className="text-sm">Sheet body content goes here.</p>
        <SheetFooter>
          <SheetClose asChild>
            <button className="rounded border px-3 py-1.5 text-sm">Cancel</button>
          </SheetClose>
          <button className="rounded bg-[#000f47] px-3 py-1.5 text-sm text-white">Apply</button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: StoryObj = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded border px-3 py-1.5 text-sm">Open (left)</button>
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
        <button className="rounded border px-3 py-1.5 text-sm">Open (top)</button>
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
        <button className="rounded border px-3 py-1.5 text-sm">Open (bottom)</button>
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
