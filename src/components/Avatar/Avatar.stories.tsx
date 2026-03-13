import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroupComponent } from './Avatar';
import { Box } from '@mui/material';
import Badge from '../Badge/Badge';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Display user profile images with optional status indicators and initials fallback.

## Best Practices
- Use for user identification in claims, team listings, and activity feeds
- Combine with status indicators to show online/offline state
- Group avatars for team representations
- Keep initials to 2 characters maximum
- Use consistent sizing across related items

## Accessibility
- Always provide \`alt\` text for images
- Status indicators should be announced to screen readers
- Clickable avatars must be keyboard accessible
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// ============================================================================
// BASIC VARIANTS - Show fundamental component states
// ============================================================================

export const Default: Story = {
  args: {
    initials: 'JD',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic avatar with initials fallback',
      },
    },
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/40?img=1',
    alt: 'John Doe',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar with profile image URL',
      },
    },
  },
};

// ============================================================================
// VISUAL VARIANTS - Size and shape options
// ============================================================================

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="S" size="small" />
        <span style={{ fontSize: '12px', color: '#666' }}>Small</span>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="M" size="medium" />
        <span style={{ fontSize: '12px', color: '#666' }}>Medium</span>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="L" size="large" />
        <span style={{ fontSize: '12px', color: '#666' }}>Large</span>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="XL" size="xlarge" />
        <span style={{ fontSize: '12px', color: '#666' }}>XL</span>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available avatar sizes for different contexts',
      },
    },
  },
};

export const Shapes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="C" variant="circular" />
        <span style={{ fontSize: '12px', color: '#666' }}>Circular</span>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="R" variant="rounded" />
        <span style={{ fontSize: '12px', color: '#666' }}>Rounded</span>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="S" variant="square" />
        <span style={{ fontSize: '12px', color: '#666' }}>Square</span>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different avatar shape variants',
      },
    },
  },
};

export const ColorTones: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="D" tone="default" />
        <span style={{ fontSize: '12px', color: '#666' }}>Default</span>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="P" tone="primary" />
        <span style={{ fontSize: '12px', color: '#666' }}>Primary</span>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="S" tone="secondary" />
        <span style={{ fontSize: '12px', color: '#666' }}>Secondary</span>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="G" tone="success" />
        <span style={{ fontSize: '12px', color: '#666' }}>Success</span>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="W" tone="warning" />
        <span style={{ fontSize: '12px', color: '#666' }}>Warning</span>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="X" tone="danger" />
        <span style={{ fontSize: '12px', color: '#666' }}>Danger</span>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar color tone variations for different contexts',
      },
    },
  },
};

// ============================================================================
// STATUS INDICATORS - Show user availability
// ============================================================================

export const WithStatusIndicators: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="ON" status="online" size="large" />
        <span style={{ fontSize: '12px', color: '#666' }}>Online</span>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="AW" status="away" size="large" />
        <span style={{ fontSize: '12px', color: '#666' }}>Away</span>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="BY" status="busy" size="large" />
        <span style={{ fontSize: '12px', color: '#666' }}>Busy</span>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar initials="OF" status="offline" size="large" />
        <span style={{ fontSize: '12px', color: '#666' }}>Offline</span>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar with status indicator showing user availability',
      },
    },
  },
};

export const WithBadge: Story = {
  render: () => (
    <Avatar
      initials="JD"
      size="large"
      badge={
        <Badge variant="dot" tone="success" size="small">
          <Box />
        </Badge>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar with badge overlay (e.g., notification count)',
      },
    },
  },
};

// ============================================================================
// INSURANCE PATTERNS - Real-world use cases
// ============================================================================

export const TeamMemberCard: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <Avatar initials="AB" tone="primary" size="large" status="online" />
        <Box>
          <div style={{ fontWeight: 600 }}>Alice Brown</div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>Policy Manager</div>
          <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '2px' }}>Available</div>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <Avatar initials="CD" tone="secondary" size="large" status="offline" />
        <Box>
          <div style={{ fontWeight: 600 }}>Charlie Davis</div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>Claims Adjuster</div>
          <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '2px' }}>Offline</div>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Team member card with avatar, name, role, and availability status',
      },
    },
  },
};

export const AvatarGroup: Story = {
  render: () => (
    <Box>
      <p style={{ marginTop: 0, color: '#666', fontSize: '14px' }}>Up to 5 team members (showing max 3 + count)</p>
      <AvatarGroupComponent
        max={3}
        avatars={[
          { initials: 'JD', name: 'John Doe' },
          { initials: 'AB', name: 'Alice Brown' },
          { initials: 'CD', name: 'Charlie Davis' },
          { initials: 'EF', name: 'Emma Frank' },
          { initials: 'GH', name: 'Grace Hall' },
        ]}
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Group of avatars with overflow handling (+N indicator)',
      },
    },
  },
};

export const PolicyReviewTeam: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Box sx={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <h3 style={{ marginTop: 0 }}>Policy Review Team</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>4 members assigned</p>
        <AvatarGroupComponent
          max={4}
          size="large"
          avatars={[
            { initials: 'AB', name: 'Alice Brown' },
            { initials: 'CD', name: 'Charlie Davis' },
            { initials: 'EF', name: 'Emma Frank' },
            { initials: 'GH', name: 'Grace Hall' },
            { initials: 'IJ', name: 'Ivan Jones' },
          ]}
        />
      </Box>
      <Box sx={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <h3 style={{ marginTop: 0 }}>Claims Processing Team</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>3 members assigned</p>
        <AvatarGroupComponent
          max={3}
          size="medium"
          avatars={[
            { initials: 'KL', name: 'Karen Lee' },
            { initials: 'MN', name: 'Mike Newton' },
            { initials: 'OP', name: 'Olivia Parker' },
            { initials: 'QR', name: 'Quinn Roberts' },
          ]}
        />
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple teams with assigned members for policy and claims workflows',
      },
    },
  },
};

export const ClaimAssignees: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box sx={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#fafafa' }}>
        <div style={{ fontWeight: 600, marginBottom: '12px' }}>Assigned to:</div>
        <AvatarGroupComponent
          size="small"
          max={3}
          avatars={[
            { initials: 'JD', name: 'John Doe' },
            { initials: 'AB', name: 'Alice Brown' },
            { initials: 'CD', name: 'Charlie Davis' },
          ]}
        />
      </Box>
      <div style={{ fontSize: '12px', color: '#666' }}>
        Showing up to 3 claim assignees. Use for claim details and assignment workflows.
      </div>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Claim assignees list showing team members working on a specific claim',
      },
    },
  },
};

// ============================================================================
// INTERACTIVE - User interactions
// ============================================================================

export const Interactive: Story = {
  render: function InteractiveAvatarDemo() {
    const [clicked, setClicked] = React.useState(false);
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <Avatar
          initials="JD"
          size="large"
          onClick={() => setClicked(!clicked)}
          status="online"
          style={{ cursor: 'pointer' }}
        />
        <div style={{ fontSize: '14px', color: '#666' }}>
          {clicked ? '✓ Avatar clicked' : 'Click avatar to interact'}
        </div>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Clickable avatar for opening user profile or menu',
      },
    },
  },
};
