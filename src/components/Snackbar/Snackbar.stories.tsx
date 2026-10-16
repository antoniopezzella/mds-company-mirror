import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import DSSnackbar from './Snackbar';
import { Button, Stack } from '@mui/material';
import { getRoleColor } from '../../theme/roles';

const meta = {
  title: 'Legacy (MUI)/Snackbar',
  component: DSSnackbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '**Legacy (MUI).** Not the canonical Snackbar — new work should use `Toast` from `@/components/ui/toast`. Kept because code still imports this one; its stories are also its only test coverage, so they stay rather than being hidden. Brief notification message that appears at screen edge. Use for non-critical feedback with optional actions.'
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
    severity: "info",
    message: 'Operation completed successfully!',
    horizontal: "right",
    actionText: "test\n"
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
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');

    const show = (msg: string, sev: 'success' | 'error' | 'warning' | 'info') => {
      setSeverity(sev);
      setMessage(msg);
      setOpen(true);
    };

    const showSuccess = (msg: string) => show(msg, 'success');
    const showError = (msg: string) => show(msg, 'error');
    const showWarning = (msg: string) => show(msg, 'warning');
    const showInfo = (msg: string) => show(msg, 'info');
    const hideSnackbar = () => setOpen(false);

    return (
      <Stack spacing={2}>
        <Button variant="contained" color="success" onClick={() => showSuccess('Operation successful!')}>
          Show Success
        </Button>
        <Button variant="contained" color="error" onClick={() => showError('An error occurred!')}>
          Show Error
        </Button>
        {/* MUI's default `color="warning"` is white on #ed6c02 = 3.98:1 (fails AA).
            White on the DS warning (#c25600) is still only 4.29:1, so warning takes
            the system's dark-text-on-pale pattern instead — the same treatment the
            Snackbar itself uses for the warning severity. */}
        <Button
          variant="contained"
          onClick={() => showWarning('Warning message!')}
          sx={{
            backgroundColor: getRoleColor('status.warning.bg'),
            color: getRoleColor('text.onLight'),
            '&:hover': { backgroundColor: getRoleColor('status.warning.bg') },
          }}
        >
          Show Warning
        </Button>
        <Button variant="contained" color="info" onClick={() => showInfo('Information message!')}>
          Show Info
        </Button>

        <DSSnackbar
          open={open}
          message={message}
          severity={severity}
          onClose={hideSnackbar}
        />
      </Stack>
    );
  },
};

export const WithActionExample: Story = {
  render: () => {
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'info' as 'success' | 'error' | 'warning' | 'info',
    });

    const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
      setSnackbar({ open: true, message, severity });
    };

    const hideSnackbar = () => {
      setSnackbar(prev => ({ ...prev, open: false }));
    };

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
