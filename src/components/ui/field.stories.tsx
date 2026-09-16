import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from './field';
import { Input } from './input';

/**
 * # Field (shadcn/ui)
 *
 * General-purpose form-layout primitives — not chat-specific, but pulled
 * in alongside the chat components since a compose box is itself a form.
 * Wraps this repo's existing Label/Separator; no new dependencies.
 */
const meta: Meta<typeof Field> = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal', 'responsive'] },
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const ProfileForm: Story = {
  render: () => (
    <FieldSet className="max-w-md">
      <FieldLegend>Profile information</FieldLegend>
      <FieldDescription>Update your account details.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="story-name">Full name</FieldLabel>
          <Input id="story-name" placeholder="Jordan Rivera" />
          <FieldDescription>Your legal name.</FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor="story-email">Email</FieldLabel>
          <Input id="story-email" tone="error" defaultValue="not-an-email" />
          <FieldError>Enter a valid email address.</FieldError>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

export const Orientations: Story = {
  render: () => (
    <FieldGroup className="max-w-md gap-6">
      <Field orientation="vertical">
        <FieldLabel htmlFor="story-vertical">Vertical (default)</FieldLabel>
        <Input id="story-vertical" placeholder="Label above the input" />
      </Field>
      <FieldSeparator />
      <Field orientation="horizontal">
        <FieldLabel htmlFor="story-horizontal">Horizontal</FieldLabel>
        <Input id="story-horizontal" placeholder="Label beside the input" />
      </Field>
    </FieldGroup>
  ),
};

export const WithContent: Story = {
  name: 'With FieldContent (title + description grouping)',
  render: () => (
    <Field className="max-w-md">
      <FieldContent>
        <span className="text-sm font-medium">Notify me by email</span>
        <FieldDescription>Receive a summary of activity once a day.</FieldDescription>
      </FieldContent>
    </Field>
  ),
};
