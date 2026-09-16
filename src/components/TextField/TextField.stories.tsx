import type { Meta, StoryObj } from '@storybook/react-vite';
import DSTextField from './TextField';
import { Stack, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircle from '@mui/icons-material/AccountCircle';

const meta = {
  title: 'Components/TextField (MUI)',
  component: DSTextField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# TextField

Standard text input component for gathering user information.

## Features
- ✅ **Validation States**: Default, Error, Success, and Warning tones.
- ✅ **Adornments**: Support for leading and trailing icons via MUI \`InputProps\`.
- ✅ **Typography**: Automatically syncs with Design System typography variables.
- ✅ **Tokens**: Strictly uses role-based colors for focused, hovered, and disabled states.
        `
      }
    }
  },
  argTypes: {
    variant: { control: 'radio', options: ['outlined', 'filled', 'standard'] },
    tone: { control: 'radio', options: ['default', 'error', 'success', 'warning'] },
    size: { control: 'radio', options: ['small', 'medium'] },
    type: { control: 'select', options: ['text', 'password', 'email', 'number', 'tel', 'url'] },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    required: { control: 'boolean' },
    multiline: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    variant: 'outlined',
    tone: 'default',
    size: 'medium',
    fullWidth: false,
    disabled: false,
  },
} satisfies Meta<typeof DSTextField>;

export default meta;
type Story = StoryObj<typeof DSTextField>;

export const Default: Story = {
  args: {
    label: 'First Name',
    placeholder: 'Enter your first name',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    helperText: 'We will never share your email',
    type: 'email',
  },
};

export const Required: Story = {
  args: {
    label: 'Username',
    required: true,
    helperText: 'This field is required',
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    value: 'invalid-email',
    tone: 'error',
    helperText: 'Please enter a valid email address',
    type: 'email',
  },
};

export const Success: Story = {
  args: {
    label: 'Password',
    value: 'SecureP@ssw0rd!',
    tone: 'success',
    helperText: 'Strong password',
    type: 'password',
  },
};

export const Warning: Story = {
  args: {
    label: 'Password',
    value: 'weak',
    tone: 'warning',
    helperText: 'Password is too weak',
    type: 'password',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    value: 'Cannot edit this',
    disabled: true,
  },
};

export const WithAdornments: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for assets...',
    slotProps: {
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      },
    },
  },
};

export const LoginField: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'name@marsh.com',
    slotProps: {
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle fontSize="small" />
          </InputAdornment>
        ),
      },
    },
  },
};

export const PasswordField: Story = {
  args: {
    label: 'Password',
    type: 'password',
    value: '********',
    slotProps: {
      input: {
        endAdornment: (
          <InputAdornment position="end">
            <VisibilityIcon fontSize="small" sx={{ cursor: 'pointer' }} />
          </InputAdornment>
        ),
      },
    },
  },
};

export const FullWidth: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Company Name',
    fullWidth: true,
    placeholder: 'Enter your company name',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Minimum 8 characters',
  },
};

export const Number: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '0',
    helperText: 'Enter your age',
  },
};

export const Multiline: Story = {
  args: {
    label: 'Description',
    multiline: true,
    rows: 4,
    placeholder: 'Enter a detailed description...',
    helperText: 'Maximum 500 characters',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Size',
    size: 'small',
    placeholder: 'Compact field',
  },
};

export const FilledVariant: Story = {
  args: {
    label: 'Filled Input',
    variant: 'filled',
    placeholder: 'Filled variant',
  },
};

export const StandardVariant: Story = {
  args: {
    label: 'Standard Input',
    variant: 'standard',
    placeholder: 'Standard variant',
  },
};

export const FormExample: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 400 }}>
      <DSTextField
        label="First Name"
        required
        placeholder="John"
      />
      <DSTextField
        label="Last Name"
        required
        placeholder="Doe"
      />
      <DSTextField
        label="Email"
        type="email"
        required
        placeholder="john.doe@example.com"
        helperText="We'll never share your email"
      />
      <DSTextField
        label="Password"
        type="password"
        required
        helperText="Minimum 8 characters"
      />
      <DSTextField
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 123-4567"
      />
      <DSTextField
        label="Bio"
        multiline
        rows={4}
        placeholder="Tell us about yourself..."
        helperText="Maximum 500 characters"
      />
    </Stack>
  ),
};
