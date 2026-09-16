import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoIcon } from 'lucide-react';
import { Marker, MarkerContent, MarkerIcon } from './marker';

/**
 * # Marker (shadcn/ui)
 *
 * In-transcript status updates, system notes, and date/thread separators —
 * the smallest of the chat-components family. Pre-existing in this repo,
 * had no Storybook story until now.
 */
const meta: Meta<typeof Marker> = {
  title: 'Components/Marker',
  component: Marker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'separator', 'border'] },
  },
};

export default meta;
type Story = StoryObj<typeof Marker>;

export const SystemNote: Story = {
  render: () => (
    <Marker className="max-w-md">
      <MarkerIcon>
        <InfoIcon />
      </MarkerIcon>
      <MarkerContent>Antonio Pezzella joined the conversation.</MarkerContent>
    </Marker>
  ),
};

export const DateSeparator: Story = {
  name: 'Separator variant',
  render: () => (
    <Marker variant="separator" className="max-w-md">
      <MarkerContent>Today</MarkerContent>
    </Marker>
  ),
};

export const SectionBorder: Story = {
  name: 'Border variant',
  render: () => (
    <div className="max-w-md">
      <Marker variant="border">
        <MarkerContent>Claim CLM-1042 — Property</MarkerContent>
      </Marker>
      <p className="pt-3 text-sm text-muted-foreground">Content following the bordered section marker.</p>
    </div>
  ),
};
