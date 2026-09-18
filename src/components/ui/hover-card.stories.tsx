import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { CalendarDays } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

/**
 * # HoverCard
 *
 * No MDS/Figma spec exists for this component — built to standard headless-UI conventions, styled with this repo's `getRoleColor()`
 * role tokens. Useful for lightweight, hover-triggered previews (e.g. a
 * user's profile summary) without committing to a full modal or popover.
 */
const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="text-sm font-medium underline underline-offset-4">@marsh-design</button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-neutral-300" />
            <div>
              <p className="text-sm font-semibold">Marsh Design System</p>
              <p className="text-xs opacity-70">@marsh-design</p>
            </div>
          </div>
          <p className="text-sm">
            The design system platform powering Marsh&apos;s B2B dashboard applications.
          </p>
          <div className="flex items-center gap-1 text-xs opacity-70">
            <CalendarDays className="h-3.5 w-3.5" />
            Joined April 2026
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const UserProfilePreview: StoryObj = {
  render: () => (
    <p className="text-sm">
      Policy last reviewed by{' '}
      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="font-medium underline underline-offset-4">Jordan Blake</button>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Jordan Blake</p>
            <p className="text-xs opacity-70">Senior Underwriter, Aviation</p>
            <p className="mt-1 text-sm">jordan.blake@marsh.com</p>
          </div>
        </HoverCardContent>
      </HoverCard>{' '}
      on July 18, 2026.
    </p>
  ),
};

export const AlignedStart: StoryObj = {
  render: () => (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="outline" size="sm">Hover for details</Button>
      </HoverCardTrigger>
      <HoverCardContent align="start">
        <p className="text-sm">Content aligned to the start of the trigger, with a short open delay.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
