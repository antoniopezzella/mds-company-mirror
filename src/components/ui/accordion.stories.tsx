import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, type AccordionItem } from './accordion';

/**
 * # Accordion (shadcn/ui)
 *
 * Radix-based counterpart to the MUI `Accordion`, styled with `getRoleColor()`
 * role tokens rather than hardcoded hex.
 *
 * ## API parity with MUI
 * Same `items`/`defaultExpanded`/`allowMultiple`/`variant`/`onChange` shape
 * as the MUI twin.
 */
const meta: Meta<typeof Accordion> = {
  title: 'shadcn-ui/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Collapsible sections for organizing content hierarchically. Supports single or multiple expansion, with full keyboard navigation via Radix.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'compact', 'elevated'] },
    allowMultiple: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const policyItems: AccordionItem[] = [
  {
    id: 'coverage',
    title: 'What does this policy cover?',
    subtitle: 'General liability terms',
    content: <p>Covers property damage, bodily injury, and legal defense costs up to the policy limit.</p>,
  },
  {
    id: 'exclusions',
    title: 'What is excluded?',
    content: <p>Intentional acts, war, and nuclear incidents are excluded from coverage.</p>,
  },
  {
    id: 'claims',
    title: 'How do I file a claim?',
    content: <p>Contact your broker or submit a claim through the client portal within 30 days of the incident.</p>,
  },
];

export const Default: Story = {
  args: {
    items: policyItems,
    defaultExpanded: ['coverage'],
  },
};

export const AllowMultiple: Story = {
  args: {
    items: policyItems,
    defaultExpanded: ['coverage', 'exclusions'],
    allowMultiple: true,
  },
};

export const Compact: Story = {
  args: {
    items: policyItems,
    variant: 'compact',
    defaultExpanded: ['coverage'],
  },
};

export const Elevated: Story = {
  args: {
    items: policyItems,
    variant: 'elevated',
    defaultExpanded: ['coverage'],
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      ...policyItems,
      { id: 'archived', title: 'Archived policy terms', content: <p>No longer applicable.</p>, disabled: true },
    ],
  },
};

export const NoneExpandedByDefault: Story = {
  args: {
    items: policyItems,
  },
};
