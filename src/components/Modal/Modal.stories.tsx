import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Modal from './Modal';
import Button from '../Button/Button';
import { Typography, Box } from '@mui/material';
import '../../index.css';
import '../../styles/_typography.scss';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs', '!dev'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Modal

A dialog component used to display content in a layer above the current page.

## Features

- ✅ **Sizes**: Small, Medium, Large, and FullScreen
- ✅ **Accessibility**: ARIA labels, focus management (via MUI), and optional hidden descriptions
- ✅ **Customization**: Optional header, footer, and scrollbar
- ✅ **Consistency**: Uses role-based tokens for backgrounds, text, and interactive elements
        `
      }
    }
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the modal is visible',
    },
    size: {
      control: 'select',
      options: ['Small', 'Medium', 'Large', 'FullScreen'],
      description: 'Size of the modal window',
    },
    title: {
      control: 'text',
      description: 'Title text shown in the header',
    },
    description: {
      control: 'text',
      description: 'Accessibility description (hidden from UI)',
    },
    hasHeader: {
      control: 'boolean',
      description: 'Whether to show the header section',
    },
    hasFooter: {
      control: 'boolean',
      description: 'Whether to show the footer section',
    },
    hasScrollbar: {
      control: 'boolean',
      description: 'Whether to enable scrolling within the content area',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWithState = (args: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal 
        {...args} 
        open={open} 
        onClose={() => setOpen(false)}
        footer={
          args.footer || (
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
            </>
          )
        }
      >
        <Typography variant="body1">
          This is the content of the modal. You can place any components or text here.
          The modal uses standardized padding and role-based colors from the Marsh Design System.
        </Typography>
      </Modal>
    </Box>
  );
};

export const Default: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    title: 'Standard Modal',
    description: 'This is an example modal description for screen readers.',
    size: 'Medium',
    hasHeader: true,
    hasFooter: true,
    hasScrollbar: true,
  },
};

export const Small: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    ...Default.args,
    title: 'Small Modal',
    size: 'Small',
  },
};

export const Large: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    ...Default.args,
    title: 'Large Modal',
    size: 'Large',
  },
};

export const FullScreen: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    ...Default.args,
    title: 'Full Screen Modal',
    size: 'FullScreen',
  },
};

export const NoHeader: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    ...Default.args,
    title: undefined,
    hasHeader: false,
  },
};

export const LongContent: Story = {
  render: (args) => (
    <ModalWithState {...args}>
      <Box sx={{ height: '150vh', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Scrollable Content Area</Typography>
      </Box>
    </ModalWithState>
  ),
  args: {
    ...Default.args,
    title: 'Scrollable Modal',
    hasScrollbar: true,
  },
};
