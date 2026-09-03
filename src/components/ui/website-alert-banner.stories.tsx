import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { WebsiteAlertBanner } from './website-alert-banner';

/**
 * # WebsiteAlertBanner (shadcn/ui)
 *
 * `getRoleColor()`-driven counterpart to the MUI `WebsiteAlertBanner`. Same
 * `title`/`message`/`brand`/`variant`/`ctaText`/`ctaUrl`/`onCtaClick`/
 * `onClose`/`fullWidth` API as the MUI twin.
 */
const meta: Meta<typeof WebsiteAlertBanner> = {
  title: 'Components/WebsiteAlertBanner',
  component: WebsiteAlertBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    brand: { control: 'select', options: ['marsh', 'guy-carpenter', 'mercer', 'oliver-wyman', 'mma'] },
    variant: { control: 'select', options: ['standard', 'prominent'] },
  },
};

export default meta;
type Story = StoryObj<typeof WebsiteAlertBanner>;

export const Marsh: Story = {
  args: {
    title: 'Site-wide announcement',
    message: 'We have updated our privacy policy, effective January 1, 2026.',
    ctaText: 'Learn more',
    ctaUrl: '#',
  },
};

export const OliverWyman: Story = {
  args: {
    title: 'Site-wide announcement',
    message: 'New research on AI transformation in financial services is now available.',
    brand: 'oliver-wyman',
    ctaText: 'Read the report',
    ctaUrl: '#',
  },
};

export const Mma: Story = {
  args: {
    title: 'Site-wide announcement',
    message: 'Marsh McLennan named to the Dow Jones Sustainability Index for the 12th year.',
    brand: 'mma',
    ctaText: 'Learn more',
    ctaUrl: '#',
  },
};

export const Prominent: Story = {
  args: {
    title: 'Important notice',
    message: 'Scheduled maintenance this weekend may affect access to the client portal.',
    variant: 'prominent',
    ctaText: 'View details',
    ctaUrl: '#',
  },
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    if (!visible) return <button className="m-4 rounded border px-3 py-1.5 text-sm" onClick={() => setVisible(true)}>Show banner again</button>;
    return (
      <WebsiteAlertBanner
        title="Dismissible announcement"
        message="Click the X to dismiss this banner."
        onClose={() => setVisible(false)}
      />
    );
  },
};

export const NoCta: Story = {
  args: {
    title: 'Simple announcement',
    message: 'This banner has no call-to-action, just a message.',
  },
};
