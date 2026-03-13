import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';
import InfoIcon from '@mui/icons-material/Info';
import PolicyIcon from '@mui/icons-material/Description';
import ClaimIcon from '@mui/icons-material/ReceiptLong';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Collapsible sections for organizing expandable content in insurance workflows.

## Best Practices
- Use for FAQ sections, policy details, and claim documentation
- Keep titles concise and descriptive
- Group related information logically
- Provide visual feedback for expanded/collapsed states
- Support keyboard navigation

## Accessibility
- Implements ARIA accordion pattern
- Keyboard: Tab, Enter, Arrow keys for navigation
- Screen readers announce expand/collapse state
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Policy Details',
        content: 'View and manage your policy information',
        subtitle: 'Active',
      },
      {
        id: '2',
        title: 'Coverage Options',
        content: 'Explore available coverage plans and benefits',
        subtitle: '3 options available',
      },
      {
        id: '3',
        title: 'Claims History',
        content: 'Review your past claims and current status',
        subtitle: 'No active claims',
      },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Policy Information',
        icon: <PolicyIcon />,
        content: 'Your policy includes comprehensive coverage for personal and business liability',
        subtitle: 'Updated Dec 2024',
      },
      {
        id: '2',
        title: 'Claims Process',
        icon: <ClaimIcon />,
        content: 'File a claim in 3 steps: 1) Contact support, 2) Submit documentation, 3) Track status',
        subtitle: 'Quick & easy',
      },
      {
        id: '3',
        title: 'Help & Support',
        icon: <InfoIcon />,
        content: 'Chat with our support team 24/7 for assistance with your policies and claims',
        subtitle: 'Available now',
      },
    ],
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    items: [
      {
        id: '1',
        title: 'Billing',
        content: 'View your bill and payment history',
      },
      {
        id: '2',
        title: 'Settings',
        content: 'Update your account preferences',
      },
      {
        id: '3',
        title: 'Documents',
        content: 'Download policy documents and certificates',
      },
    ],
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    items: [
      {
        id: '1',
        title: 'Coverage Summary',
        icon: <PolicyIcon />,
        content: 'You have comprehensive coverage including liability, property damage, and workers compensation.',
      },
      {
        id: '2',
        title: 'Deductibles',
        icon: <InfoIcon />,
        content: 'Standard deductibles: $500 for property, $1000 for liability. Adjust as needed.',
      },
      {
        id: '3',
        title: 'Exclusions',
        icon: <InfoIcon />,
        content: 'Some exclusions apply. Review your policy document for complete details.',
      },
    ],
  },
};

export const MultipleOpen: Story = {
  args: {
    allowMultiple: true,
    items: [
      {
        id: '1',
        title: 'Policy Terms',
        content: 'Read the full terms and conditions of your insurance policy',
      },
      {
        id: '2',
        title: 'Coverage Details',
        content: 'Detailed breakdown of what is covered under each section',
      },
      {
        id: '3',
        title: 'Renewal Information',
        content: 'Your policy will renew on December 31, 2025',
      },
    ],
    defaultExpanded: ['1', '2'],
  },
};

export const WithDisabled: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Active Policy',
        content: 'Your current active policy with full benefits',
      },
      {
        id: '2',
        title: 'Archived Policy',
        content: 'View archived policies',
        disabled: true,
      },
      {
        id: '3',
        title: 'Pending Claims',
        content: 'Claims under review',
      },
    ],
  },
};

export const PolicyManagement: Story = {
  args: {
    variant: 'elevated',
    allowMultiple: true,
    items: [
      {
        id: '1',
        title: 'Business Liability Insurance',
        icon: <PolicyIcon />,
        subtitle: 'Policy #POL-2024-001 • Active',
        content:
          'Comprehensive liability coverage for your business. Coverage includes premises liability, products liability, and completed operations. Annual premium: $2,500.',
      },
      {
        id: '2',
        title: 'Professional Indemnity',
        icon: <PolicyIcon />,
        subtitle: 'Policy #POL-2024-002 • Active',
        content:
          'Professional liability coverage protecting you against claims of negligence or errors. Covers legal fees and settlements up to $1,000,000.',
      },
      {
        id: '3',
        title: 'Property Insurance',
        icon: <PolicyIcon />,
        subtitle: 'Policy #POL-2024-003 • Active',
        content:
          'Building and contents coverage for your office location. Covers fire, theft, vandalism, and natural disasters. Annual premium: $4,200.',
      },
    ],
    defaultExpanded: ['1'],
  },
};

export const ClaimsHistory: Story = {
  args: {
    variant: 'default',
    items: [
      {
        id: '1',
        title: 'Water Damage Claim',
        subtitle: 'Claim #CLM-2024-567 • Settled',
        content:
          'Pipe burst resulted in water damage to office space. Claim settled for $12,500. Date: Oct 15, 2024.',
      },
      {
        id: '2',
        title: 'Equipment Theft Claim',
        subtitle: 'Claim #CLM-2024-123 • Pending',
        content:
          'Computer equipment stolen from warehouse. Estimated loss: $5,000. Currently under investigation. Expected resolution: Jan 2025.',
      },
      {
        id: '3',
        title: 'Liability Claim',
        subtitle: 'Claim #CLM-2024-234 • Closed',
        content:
          'Client injury on premises. Settled with insurance coverage. All legal proceedings completed. Settlement: $8,000.',
      },
    ],
  },
};

export const FAQ: Story = {
  args: {
    variant: 'default',
    items: [
      {
        id: '1',
        title: 'How do I file a claim?',
        content: 'Contact our claims team within 30 days of the incident. Provide documentation of the loss and any relevant photos or reports.',
      },
      {
        id: '2',
        title: 'What is covered under my policy?',
        content: 'Your policy covers liability, property damage, and business interruption. Review your policy documents for exclusions.',
      },
      {
        id: '3',
        title: 'When will my policy renew?',
        content: 'Your policy renews annually on the date it was originally issued. You will receive a renewal notice 30 days prior.',
      },
      {
        id: '4',
        title: 'Can I modify my coverage?',
        content: 'Yes, you can adjust your coverage limits and deductibles during the renewal period or request mid-term changes.',
      },
    ],
  },
};

// Interactive story - users can expand/collapse sections
export const InteractiveExpand: Story = {
  render: function InteractiveAccordionDemo() {
    const [expanded, setExpanded] = React.useState<string | false>('1');

    const policyItems = [
      {
        id: '1',
        title: 'Business Liability Insurance',
        icon: <PolicyIcon />,
        subtitle: 'Policy #POL-2024-001 • Active',
        content:
          'Comprehensive liability coverage for your business. Coverage includes premises liability, products liability, and completed operations. Annual premium: $2,500. Last payment: Dec 1, 2024.',
      },
      {
        id: '2',
        title: 'Professional Indemnity',
        icon: <PolicyIcon />,
        subtitle: 'Policy #POL-2024-002 • Active',
        content:
          'Professional liability coverage protecting you against claims of negligence or errors. Covers legal fees and settlements up to $1,000,000. Expires: June 30, 2025.',
      },
      {
        id: '3',
        title: 'Property Insurance',
        icon: <PolicyIcon />,
        subtitle: 'Policy #POL-2024-003 • Active',
        content:
          'Building and contents coverage for your office location. Covers fire, theft, vandalism, and natural disasters. Annual premium: $4,200. Coverage limit: $500,000.',
      },
    ];

    const handleChange = (panel: string) => {
      setExpanded(expanded === panel ? false : panel);
    };

    return (
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Click sections to expand/collapse. Currently expanded: {expanded ? `Policy ${expanded}` : 'None'}
          </p>
        </div>
        <div style={{ borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
          {policyItems.map((item, index) => (
            <div
              key={item.id}
              style={{
                borderBottom: index < policyItems.length - 1 ? '1px solid #e0e0e0' : 'none',
              }}
            >
              <div
                onClick={() => handleChange(item.id)}
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  backgroundColor: expanded === item.id ? '#f5f5f5' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background-color 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {item.icon}
                  <div>
                    <div style={{ fontWeight: 500 }}>{item.title}</div>
                    <div style={{ fontSize: '12px', color: '#999' }}>{item.subtitle}</div>
                  </div>
                </div>
                <span style={{ fontSize: '20px', transition: 'transform 0.2s', transform: expanded === item.id ? 'rotate(180deg)' : 'rotate(0)' }}>
                  ▼
                </span>
              </div>
              {expanded === item.id && (
                <div style={{ padding: '16px', backgroundColor: '#fafafa', borderTop: '1px solid #e0e0e0' }}>
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
};
