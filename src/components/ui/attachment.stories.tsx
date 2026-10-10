import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileTextIcon, ImageIcon, XIcon } from 'lucide-react';
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from './attachment';

/**
 * # Attachment
 *
 * File/image chip for chat compose boxes and message attachments — part of
 * shadcn's chat-components family alongside MessageScroller/Message/Bubble/
 * Marker. Self-contained (no headless primitive needed), ported from the
 * upstream `new-york-v4` registry source.
 */
const meta: Meta<typeof Attachment> = {
  title: 'Components/Attachment',
  component: Attachment,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'uploading', 'processing', 'error', 'done'],
    },
    size: { control: 'select', options: ['md', 'sm'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;
type Story = StoryObj<typeof Attachment>;

export const Default: Story = {
  render: () => (
    <Attachment>
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>quarterly-report.pdf</AttachmentTitle>
        <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove attachment">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['idle', 'uploading', 'processing', 'error', 'done'] as const).map((state) => (
        <Attachment key={state} state={state}>
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>document-{state}.pdf</AttachmentTitle>
            <AttachmentDescription>{state === 'error' ? 'Upload failed' : 'PDF · 1.1 MB'}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove attachment">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </div>
  ),
};

export const ImageVariant: Story = {
  name: 'Image media',
  render: () => (
    <Attachment orientation="vertical">
      <AttachmentMedia variant="image">
        <ImageIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>site-photo.jpg</AttachmentTitle>
        <AttachmentDescription>JPG · 3.8 MB</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  ),
};

export const Group: Story = {
  render: () => (
    <AttachmentGroup className="w-[420px]">
      {['claim-form.pdf', 'inspection-report.pdf', 'photo-1.jpg', 'photo-2.jpg'].map((name) => (
        <Attachment key={name} size="sm">
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{name}</AttachmentTitle>
          </AttachmentContent>
        </Attachment>
      ))}
    </AttachmentGroup>
  ),
};
