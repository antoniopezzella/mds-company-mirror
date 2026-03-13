import type { Meta, StoryObj } from '@storybook/react-vite';
import DSSwitch from './Switch';
import { Stack } from '@mui/material';
import { useState } from 'react';

const meta = {
  title: 'Components/Switch',
  component: DSSwitch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Toggle control for binary on/off states. Use for settings or features that take effect immediately.'
      }
    }
  },
  argTypes: {
    tone: { control: 'radio', options: ['default', 'danger'] },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    labelPlacement: { control: 'radio', options: ['end', 'start', 'top', 'bottom'] },
  },
} satisfies Meta<typeof DSSwitch>;

export default meta;
type Story = StoryObj<typeof DSSwitch>;

export const Default: Story = {
  args: {
    label: 'Enable Notifications',
  },
};

export const Checked: Story = {
  args: {
    label: 'Enabled Feature',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Switch',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled & On',
    disabled: true,
    checked: true,
  },
};

export const DangerTone: Story = {
  args: {
    label: 'Delete on Exit',
    tone: 'danger',
    checked: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
};

export const LabelStart: Story = {
  args: {
    label: 'Label on Left',
    labelPlacement: 'start',
    checked: true,
  },
};

export const LabelTop: Story = {
  args: {
    label: 'Label on Top',
    labelPlacement: 'top',
  },
};

export const LabelBottom: Story = {
  args: {
    label: 'Label on Bottom',
    labelPlacement: 'bottom',
    checked: true,
  },
};

export const FormExample: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [autoSave, setAutoSave] = useState(true);
    const [publicProfile, setPublicProfile] = useState(false);
    const [twoFactor, setTwoFactor] = useState(true);

    return (
      <Stack spacing={2} sx={{ width: 400 }}>
        <DSSwitch
          label="Email Notifications"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
        />
        
        <DSSwitch
          label="Dark Mode"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        />
        
        <DSSwitch
          label="Auto-Save"
          checked={autoSave}
          onChange={(e) => setAutoSave(e.target.checked)}
        />
        
        <DSSwitch
          label="Public Profile"
          checked={publicProfile}
          onChange={(e) => setPublicProfile(e.target.checked)}
        />
        
        <DSSwitch
          label="Two-Factor Authentication"
          checked={twoFactor}
          onChange={(e) => setTwoFactor(e.target.checked)}
        />
      </Stack>
    );
  },
};

export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      autoUpdate: false,
      analytics: true,
      marketing: false,
    });

    const handleChange = (key: keyof typeof settings) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSettings({ ...settings, [key]: event.target.checked });
    };

    return (
      <Stack spacing={3} sx={{ width: 400, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--typo-h4-font-family)' }}>Privacy Settings</h3>
        
        <Stack spacing={2}>
          <DSSwitch
            label="Push Notifications"
            checked={settings.notifications}
            onChange={handleChange('notifications')}
          />
          
          <DSSwitch
            label="Automatic Updates"
            checked={settings.autoUpdate}
            onChange={handleChange('autoUpdate')}
          />
          
          <DSSwitch
            label="Usage Analytics"
            checked={settings.analytics}
            onChange={handleChange('analytics')}
          />
          
          <DSSwitch
            label="Marketing Communications"
            checked={settings.marketing}
            onChange={handleChange('marketing')}
            tone="danger"
          />
        </Stack>
      </Stack>
    );
  },
};
