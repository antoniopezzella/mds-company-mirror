import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { List } from './List';
import { Box } from '@mui/material';
import PolicyIcon from '@mui/icons-material/Description';
import ClaimIcon from '@mui/icons-material/ReceiptLong';
import UserIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Vertical list of items with optional icons, actions, and dividers. Supports interactive and non-interactive modes.'
      }
    }
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    items: [
      { id: '1', primary: 'Item 1', secondary: 'Description' },
      { id: '2', primary: 'Item 2', secondary: 'Description' },
      { id: '3', primary: 'Item 3', secondary: 'Description' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { id: '1', primary: 'Policies', icon: <PolicyIcon />, secondary: 'Manage your policies' },
      { id: '2', primary: 'Claims', icon: <ClaimIcon />, secondary: 'View claim status' },
      { id: '3', primary: 'Profile', icon: <UserIcon />, secondary: 'Account settings' },
      { id: '4', primary: 'Settings', icon: <SettingsIcon />, secondary: 'Preferences' },
    ],
  },
};

export const Selectable: Story = {
  args: {
    items: [
      { id: '1', primary: 'Policy #POL-2024-001', secondary: 'Commercial Liability' },
      { id: '2', primary: 'Policy #POL-2024-002', secondary: 'Professional Indemnity' },
      { id: '3', primary: 'Policy #POL-2024-003', secondary: 'Property Insurance' },
    ],
    selectable: true,
    multiSelect: true,
  },
};

export const Dense: Story = {
  args: {
    items: [
      { id: '1', primary: 'Policy 1' },
      { id: '2', primary: 'Policy 2' },
      { id: '3', primary: 'Policy 3' },
      { id: '4', primary: 'Policy 4' },
      { id: '5', primary: 'Policy 5' },
    ],
    dense: true,
  },
};

export const WithSubheader: Story = {
  args: {
    subheader: 'Active Policies',
    items: [
      {
        id: '1',
        primary: 'Commercial Liability',
        secondary: 'Policy #POL-2024-001',
        icon: <PolicyIcon />,
      },
      {
        id: '2',
        primary: 'Professional Indemnity',
        secondary: 'Policy #POL-2024-002',
        icon: <PolicyIcon />,
      },
      {
        id: '3',
        primary: 'Property Insurance',
        secondary: 'Policy #POL-2024-003',
        icon: <PolicyIcon />,
      },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    items: [
      {
        id: '1',
        primary: 'Active Policy',
        secondary: 'Expires Dec 31, 2025',
        icon: <PolicyIcon />,
      },
      {
        id: '2',
        primary: 'Archived Policy',
        secondary: 'No longer active',
        icon: <PolicyIcon />,
        disabled: true,
      },
      {
        id: '3',
        primary: 'Pending Renewal',
        secondary: 'Action required',
        icon: <PolicyIcon />,
      },
    ],
  },
};

export const PolicyList: Story = {
  args: {
    subheader: 'Your Policies',
    items: [
      {
        id: '1',
        primary: 'Business Liability Insurance',
        secondary: 'Policy #POL-2024-001 • Active',
        icon: <PolicyIcon />,
      },
      {
        id: '2',
        primary: 'Professional Indemnity',
        secondary: 'Policy #POL-2024-002 • Active',
        icon: <PolicyIcon />,
      },
      {
        id: '3',
        primary: 'Property Insurance',
        secondary: 'Policy #POL-2024-003 • Active',
        icon: <PolicyIcon />,
      },
      {
        id: '4',
        primary: 'Workers Compensation',
        secondary: 'Policy #POL-2024-004 • Expired',
        icon: <PolicyIcon />,
        disabled: true,
      },
    ],
    dividers: true,
  },
};

export const ClaimsActivity: Story = {
  args: {
    subheader: 'Recent Claims',
    items: [
      {
        id: '1',
        primary: 'Water Damage Claim',
        secondary: 'Claim #CLM-2024-567 • Settled',
        icon: <ClaimIcon />,
      },
      {
        id: '2',
        primary: 'Equipment Theft',
        secondary: 'Claim #CLM-2024-123 • Pending',
        icon: <ClaimIcon />,
      },
      {
        id: '3',
        primary: 'Liability Claim',
        secondary: 'Claim #CLM-2024-234 • Closed',
        icon: <ClaimIcon />,
      },
    ],
  },
};

export const MultiSelect: Story = {
  args: {
    selectable: true,
    multiSelect: true,
    subheader: 'Documents',
    items: [
      {
        id: '1',
        primary: 'Policy Document',
        secondary: 'PDF • 2.5 MB',
      },
      {
        id: '2',
        primary: 'Coverage Summary',
        secondary: 'PDF • 1.2 MB',
      },
      {
        id: '3',
        primary: 'Claims Guide',
        secondary: 'PDF • 3.1 MB',
      },
      {
        id: '4',
        primary: 'Renewal Notice',
        secondary: 'PDF • 890 KB',
      },
    ],
  },
};

export const SingleSelect: Story = {
  args: {
    selectable: true,
    multiSelect: false,
    subheader: 'Choose Coverage',
    items: [
      {
        id: '1',
        primary: 'Basic Coverage',
        secondary: '$500 deductible',
      },
      {
        id: '2',
        primary: 'Standard Coverage',
        secondary: '$1,000 deductible',
      },
      {
        id: '3',
        primary: 'Premium Coverage',
        secondary: '$250 deductible',
      },
    ],
  },
};

export const NavigationMenu: Story = {
  render: () => (
    <Box sx={{ maxWidth: '300px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <List
        items={[
          { id: '1', primary: 'Dashboard', icon: <SettingsIcon />, onClick: () => alert('Dashboard') },
          { id: '2', primary: 'My Policies', icon: <PolicyIcon />, onClick: () => alert('Policies') },
          { id: '3', primary: 'Claims', icon: <ClaimIcon />, onClick: () => alert('Claims') },
          { id: '4', primary: 'Profile', icon: <UserIcon />, onClick: () => alert('Profile') },
        ]}
        dividers={true}
      />
    </Box>
  ),
};

// Interactive story - users can select/deselect multiple items
export const InteractiveMultiSelect: Story = {
  render: function InteractiveListDemo() {
    const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set(['POL001', 'POL002']));

    const policies = [
      {
        id: 'POL001',
        primary: 'Commercial Liability',
        secondary: 'Policy #POL-2024-001 • Expires Dec 31, 2025',
        icon: <PolicyIcon />,
      },
      {
        id: 'POL002',
        primary: 'Professional Indemnity',
        secondary: 'Policy #POL-2024-002 • Expires June 30, 2025',
        icon: <PolicyIcon />,
      },
      {
        id: 'POL003',
        primary: 'Property Insurance',
        secondary: 'Policy #POL-2024-003 • Expires March 15, 2025',
        icon: <PolicyIcon />,
      },
      {
        id: 'POL004',
        primary: 'Cyber Insurance',
        secondary: 'Policy #POL-2024-004 • Expires Sept 1, 2025',
        icon: <PolicyIcon />,
      },
    ];

    const toggleItem = (itemId: string) => {
      const newSelected = new Set(selectedItems);
      if (newSelected.has(itemId)) {
        newSelected.delete(itemId);
      } else {
        newSelected.add(itemId);
      }
      setSelectedItems(newSelected);
    };

    return (
      <div style={{ padding: '24px', maxWidth: '500px' }}>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ margin: 0, fontWeight: 500 }}>Select policies to renew: {selectedItems.size}</p>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#999' }}>Click items to select/deselect</p>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
          {policies.map((policy, index) => (
            <div
              key={policy.id}
              onClick={() => toggleItem(policy.id)}
              style={{
                padding: '16px',
                backgroundColor: selectedItems.has(policy.id) ? '#e3f2fd' : 'white',
                borderBottom: index < policies.length - 1 ? '1px solid #ddd' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'background-color 0.2s',
              }}
            >
              <input
                type="checkbox"
                checked={selectedItems.has(policy.id)}
                onChange={() => {}}
                style={{ cursor: 'pointer', width: '18px', height: '18px' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, color: '#333' }}>{policy.primary}</div>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                  {policy.secondary}
                </div>
              </div>
              {selectedItems.has(policy.id) && (
                <span style={{ color: '#1976d2', fontWeight: 600 }}>✓</span>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 500, fontSize: '14px' }}>
            {selectedItems.size} policy/policies selected
          </p>
          {selectedItems.size > 0 && (
            <div style={{ fontSize: '13px', color: '#666' }}>
              <p style={{ margin: 0 }}>Selected policies:</p>
              <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                {policies.filter(p => selectedItems.has(p.id)).map(p => (
                  <li key={p.id} style={{ margin: '2px 0' }}>{p.primary}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  },
};
