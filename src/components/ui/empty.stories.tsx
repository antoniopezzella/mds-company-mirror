import type { Meta, StoryObj } from '@storybook/react';
import { InboxIcon, SearchXIcon } from 'lucide-react';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './empty';
import { Button } from './button';

/**
 * # Empty (shadcn/ui)
 *
 * General-purpose empty-state primitives — not chat-specific, but pulled
 * in alongside the chat components for cases like "no messages yet".
 * Fully self-contained, no new dependencies.
 */
const meta: Meta<typeof Empty> = {
  title: 'shadcn-ui/Empty',
  component: Empty,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const NoMessages: Story = {
  name: 'No messages (chat use case)',
  render: () => (
    <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No messages yet</EmptyTitle>
        <EmptyDescription>Start the conversation by sending a message below.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>Try adjusting your filters or search terms.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="secondary" size="sm">
          Clear filters
        </Button>
      </EmptyContent>
    </Empty>
  ),
};
