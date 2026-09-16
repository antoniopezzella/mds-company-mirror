import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';
import { Box, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

const meta = {
  title: 'Components/Chip (MUI)',
  component: Chip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Chip label text',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: 'Chip visual variant',
    },
    tone: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Chip color tone',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Chip size',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof Chip>;

// Basic chip
export const Default: Story = {
  args: {
    label: 'Chip',
  },
};

// Chip variants
export const Filled: Story = {
  args: {
    label: 'Filled Chip',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Chip',
    variant: 'outlined',
  },
};

// Different tones
export const DefaultTone: Story = {
  args: {
    label: 'Default',
    tone: 'default',
  },
};

export const PrimaryTone: Story = {
  args: {
    label: 'Primary',
    tone: 'primary',
  },
};

export const SecondaryTone: Story = {
  args: {
    label: 'Secondary',
    tone: 'secondary',
  },
};

export const SuccessTone: Story = {
  args: {
    label: 'Success',
    tone: 'success',
  },
};

export const WarningTone: Story = {
  args: {
    label: 'Warning',
    tone: 'warning',
  },
};

export const DangerTone: Story = {
  args: {
    label: 'Danger',
    tone: 'danger',
  },
};

export const InfoTone: Story = {
  args: {
    label: 'Info',
    tone: 'info',
  },
};

// Different sizes
export const SmallChip: Story = {
  args: {
    label: 'Small',
    size: 'sm',
  },
};

export const MediumChip: Story = {
  args: {
    label: 'Medium',
    size: 'md',
  },
};

export const LargeChip: Story = {
  args: {
    label: 'Large',
    size: 'lg',
  },
};

// With icons
export const WithIcon: Story = {
  args: {
    label: 'Verified',
    icon: <VerifiedIcon />,
    tone: 'success',
  },
};

export const WithLeadingIcon: Story = {
  args: {
    label: 'Active',
    icon: <CheckIcon />,
    tone: 'success',
    size: 'md',
  },
};

// Deletable chip
export const Deletable: Story = {
  args: {
    label: 'Removable',
    onDelete: () => console.info('Chip deleted'),
  },
};

export const DeletableWithIcon: Story = {
  args: {
    label: 'Policy',
    icon: <LocalOfferIcon />,
    onDelete: () => console.info('Chip deleted'),
    tone: 'primary',
  },
};

// Selectable chip
export const Selectable: Story = {
  args: {
    label: 'Select me',
    selectable: true,
    onClick: () => console.info('Chip clicked'),
  },
};

export const SelectableSelected: Story = {
  args: {
    label: 'Selected',
    selectable: true,
    selected: true,
    onClick: () => console.info('Chip clicked'),
    tone: 'primary',
  },
};

// Disabled chip
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

// Status chips
export const StatusChips: Story = {
  render: () => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <Chip label="Active" tone="success" />
      <Chip label="Pending" tone="warning" />
      <Chip label="Expired" tone="danger" />
      <Chip label="Draft" tone="info" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status chips using different color tones to indicate state.',
      },
    },
  },
};

// Policy tags
export const PolicyTags: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 2 }}>
      <Chip
        label="Commercial Property"
        tone="primary"
        onDelete={() => console.info('Remove tag')}
      />
      <Chip
        label="Active"
        tone="success"
        icon={<CheckIcon />}
      />
      <Chip
        label="High Risk"
        tone="warning"
        icon={<WarningIcon />}
      />
      <Chip
        label="Renewal Due"
        tone="danger"
      />
      <Chip
        label="Claim History"
        tone="info"
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Collection of policy-related chips showing various statuses and tags.',
      },
    },
  },
};

// Claim status chips
export const ClaimStatusChips: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Box>
        <h4>Claim Status:</h4>
        <Stack direction="row" spacing={1}>
          <Chip label="Submitted" tone="info" />
          <Chip label="Under Review" tone="warning" icon={<WarningIcon />} />
          <Chip label="Approved" tone="success" icon={<CheckIcon />} />
          <Chip label="Rejected" tone="danger" icon={<ErrorIcon />} />
        </Stack>
      </Box>
      <Box>
        <h4>Priority Level:</h4>
        <Stack direction="row" spacing={1}>
          <Chip label="Low" tone="info" />
          <Chip label="Medium" tone="primary" />
          <Chip label="High" tone="warning" />
          <Chip label="Critical" tone="danger" />
        </Stack>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Insurance domain example showing claim statuses and priority levels.',
      },
    },
  },
};

// Filterable chips
export const FilterChips: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <h4>Filter by type:</h4>
      <Stack direction="row" spacing={1}>
        <Chip
          label="Commercial"
          selectable
          selected={false}
          onClick={() => console.info('Filter: Commercial')}
        />
        <Chip
          label="Residential"
          selectable
          selected={true}
          tone="primary"
          onClick={() => console.info('Filter: Residential')}
        />
        <Chip
          label="Auto"
          selectable
          selected={false}
          onClick={() => console.info('Filter: Auto')}
        />
        <Chip
          label="Liability"
          selectable
          selected={true}
          tone="primary"
          onClick={() => console.info('Filter: Liability')}
        />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Selectable filter chips allowing users to toggle categories.',
      },
    },
  },
};

// Removable tags
export const RemovableTags: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <h4>Selected tags:</h4>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        <Chip
          label="High Priority"
          tone="danger"
          onDelete={() => console.info('Remove tag')}
        />
        <Chip
          label="Critical Issue"
          tone="danger"
          onDelete={() => console.info('Remove tag')}
        />
        <Chip
          label="In Progress"
          tone="warning"
          onDelete={() => console.info('Remove tag')}
        />
        <Chip
          label="Needs Review"
          tone="info"
          onDelete={() => console.info('Remove tag')}
        />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Removable tag chips for managing selections or labels.',
      },
    },
  },
};

// Chip sizes comparison
export const SizeComparison: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Box>
        <h4>Small chips:</h4>
        <Stack direction="row" spacing={1}>
          <Chip label="Active" tone="success" size="sm" />
          <Chip label="Pending" tone="warning" size="sm" />
          <Chip label="Expired" tone="danger" size="sm" />
        </Stack>
      </Box>
      <Box>
        <h4>Medium chips:</h4>
        <Stack direction="row" spacing={1}>
          <Chip label="Active" tone="success" size="md" />
          <Chip label="Pending" tone="warning" size="md" />
          <Chip label="Expired" tone="danger" size="md" />
        </Stack>
      </Box>
      <Box>
        <h4>Large chips:</h4>
        <Stack direction="row" spacing={1}>
          <Chip label="Active" tone="success" size="lg" />
          <Chip label="Pending" tone="warning" size="lg" />
          <Chip label="Expired" tone="danger" size="lg" />
        </Stack>
      </Box>
    </Stack>
  ),
};

// Variant comparison
export const VariantComparison: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Box>
        <h4>Filled variant:</h4>
        <Stack direction="row" spacing={1}>
          <Chip label="Active" tone="success" variant="filled" />
          <Chip label="Pending" tone="warning" variant="filled" />
          <Chip label="Expired" tone="danger" variant="filled" />
        </Stack>
      </Box>
      <Box>
        <h4>Outlined variant:</h4>
        <Stack direction="row" spacing={1}>
          <Chip label="Active" tone="success" variant="outlined" />
          <Chip label="Pending" tone="warning" variant="outlined" />
          <Chip label="Expired" tone="danger" variant="outlined" />
        </Stack>
      </Box>
    </Stack>
  ),
};

// Icon variations
export const IconVariations: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Box>
        <h4>With icons:</h4>
        <Stack direction="row" spacing={1}>
          <Chip label="Verified" tone="success" icon={<CheckIcon />} />
          <Chip label="Warning" tone="warning" icon={<WarningIcon />} />
          <Chip label="Error" tone="danger" icon={<ErrorIcon />} />
        </Stack>
      </Box>
      <Box>
        <h4>With delete action:</h4>
        <Stack direction="row" spacing={1}>
          <Chip
            label="Removable"
            icon={<LocalOfferIcon />}
            onDelete={() => console.info('Deleted')}
          />
          <Chip
            label="Deletable"
            tone="primary"
            icon={<CheckIcon />}
            onDelete={() => console.info('Deleted')}
          />
        </Stack>
      </Box>
    </Stack>
  ),
};

// Interactive story - users can select/deselect and delete chips
export const InteractiveSelection: Story = {
  render: function InteractiveChipDemo() {
    const [selectedChips, setSelectedChips] = React.useState<Set<string>>(new Set(['liability', 'property']));
    const [allChips, setAllChips] = React.useState<Set<string>>(new Set(['liability', 'property', 'workers', 'professional', 'cyber']));

    const coverageOptions = [
      { id: 'liability', label: 'General Liability', tone: 'primary' },
      { id: 'property', label: 'Property Coverage', tone: 'primary' },
      { id: 'workers', label: 'Workers Comp', tone: 'secondary' },
      { id: 'professional', label: 'Professional Indemnity', tone: 'info' },
      { id: 'cyber', label: 'Cyber Insurance', tone: 'info' },
    ];

    const toggleChip = (chipId: string) => {
      const newSelected = new Set(selectedChips);
      if (newSelected.has(chipId)) {
        newSelected.delete(chipId);
      } else {
        newSelected.add(chipId);
      }
      setSelectedChips(newSelected);
    };

    const deleteChip = (chipId: string) => {
      const newAll = new Set(allChips);
      const newSelected = new Set(selectedChips);
      newAll.delete(chipId);
      newSelected.delete(chipId);
      setAllChips(newAll);
      setSelectedChips(newSelected);
    };

    return (
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: '#666', marginBottom: '8px' }}>
            <strong>Selected coverage:</strong> {selectedChips.size} of {allChips.size}
          </p>
          <p style={{ fontSize: '14px', color: '#999' }}>
            Click chips to select/deselect. Click the X to remove an option.
          </p>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {coverageOptions.map(option => 
            allChips.has(option.id) ? (
              <div
                key={option.id}
                role="button"
                tabIndex={0}
                aria-pressed={selectedChips.has(option.id)}
                onClick={() => toggleChip(option.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleChip(option.id);
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  backgroundColor: selectedChips.has(option.id) ? '#1976d2' : '#f0f0f0',
                  color: selectedChips.has(option.id) ? 'white' : '#333',
                  border: selectedChips.has(option.id) ? 'none' : '1px solid #ddd',
                  transition: 'all 0.2s',
                  fontWeight: selectedChips.has(option.id) ? 600 : 400,
                }}
              >
                <span>{option.label}</span>
                {selectedChips.has(option.id) && <CheckIcon style={{ fontSize: '16px' }} />}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChip(option.id);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0 4px',
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '4px',
                  }}
                >
                  ×
                </button>
              </div>
            ) : null
          )}
        </div>

        <div style={{ marginTop: '24px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 500 }}>Selection Summary:</p>
          {selectedChips.size > 0 ? (
            <p style={{ margin: 0, color: '#666' }}>
              You have selected: {Array.from(selectedChips).map(id => 
                coverageOptions.find(o => o.id === id)?.label
              ).filter(Boolean).join(', ')}
            </p>
          ) : (
            <p style={{ margin: 0, color: '#999' }}>No coverage options selected</p>
          )}
        </div>
      </div>
    );
  },
};
