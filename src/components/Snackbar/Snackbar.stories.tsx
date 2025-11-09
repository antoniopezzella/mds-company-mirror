import type { Meta, StoryObj } from '@storybook/react';
import DSSnackbar, { useSnackbar } from './Snackbar';
import { Button, Stack } from '@mui/material';

const meta = {
  title: 'Components/Snackbar',
  component: DSSnackbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Design System Snackbar/Toast notification built on MUI. Supports auto-dismiss with customizable duration and position.'
      }
    }
  },
  argTypes: {
    severity: { control: 'radio', options: ['success', 'error', 'warning', 'info'] },
    vertical: { control: 'radio', options: ['top', 'bottom'] },
    horizontal: { control: 'radio', options: ['left', 'center', 'right'] },
    autoHideDuration: { control: 'number' },
  },
  args: {
    open: true,
    message: 'This is a notification message',
    severity: 'info',
    vertical: 'bottom',
    horizontal: 'center',
    autoHideDuration: 6000,
  },
} satisfies Meta<typeof DSSnackbar>;

export default meta;
type Story = StoryObj<typeof DSSnackbar>;

export const Info: Story = {
  args: {
    severity: 'info',
    message: 'This is an informational message',
  },
};

export const Success: Story = {
  args: {
    severity: 'success',
    message: 'Operation completed successfully!',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    message: 'Warning: Please review your input',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    message: 'Error: Something went wrong',
  },
};

export const WithAction: Story = {
  args: {
    severity: 'success',
    message: 'File uploaded successfully',
    actionText: 'VIEW',
    onAction: () => alert('Action clicked!'),
  },
};

export const TopCenter: Story = {
  args: {
    severity: 'info',
    message: 'Notification at top center',
    vertical: 'top',
    horizontal: 'center',
  },
};

export const TopRight: Story = {
  args: {
    severity: 'success',
    message: 'Notification at top right',
    vertical: 'top',
    horizontal: 'right',
  },
};

export const BottomLeft: Story = {
  args: {
    severity: 'warning',
    message: 'Notification at bottom left',
    vertical: 'bottom',
    horizontal: 'left',
  },
};

export const LongDuration: Story = {
  args: {
    severity: 'info',
    message: 'This will stay for 10 seconds',
    autoHideDuration: 10000,
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const { snackbar, hideSnackbar, showSuccess, showError, showWarning, showInfo } = useSnackbar();

    return (
      <Stack spacing={2}>
        <Button variant="contained" color="success" onClick={() => showSuccess('Operation successful!')}>
          Show Success
        </Button>
        <Button variant="contained" color="error" onClick={() => showError('An error occurred!')}>
          Show Error
        </Button>
        <Button variant="contained" color="warning" onClick={() => showWarning('Warning message!')}>
          Show Warning
        </Button>
        <Button variant="contained" color="info" onClick={() => showInfo('Information message!')}>
          Show Info
        </Button>

        <DSSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={hideSnackbar}
        />
      </Stack>
    );
  },
};

export const WithActionExample: Story = {
  render: () => {
    const { snackbar, hideSnackbar, showSnackbar } = useSnackbar();

    const handleUpload = () => {
      showSnackbar('File uploaded successfully', 'success');
    };

    return (
      <>
        <Button variant="contained" onClick={handleUpload}>
          Upload File
        </Button>

        <DSSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={hideSnackbar}
          actionText="VIEW"
          onAction={() => alert('Viewing file...')}
        />
      </>
    );
  },
};
