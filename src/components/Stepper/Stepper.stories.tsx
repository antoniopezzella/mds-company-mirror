import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from './Stepper';
import ClaimIcon from '@mui/icons-material/ReceiptLong';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VerifiedIcon from '@mui/icons-material/Verified';
import PaymentIcon from '@mui/icons-material/Payment';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Multi-step process indicator. Shows progress through sequential workflow with visual status for each step.'
      }
    }
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    steps: [
      {
        id: '1',
        label: 'Step 1: Submit',
        description: 'Initial submission',
        status: 'completed',
      },
      {
        id: '2',
        label: 'Step 2: Review',
        description: 'Under review',
        status: 'active',
      },
      {
        id: '3',
        label: 'Step 3: Approve',
        description: 'Pending approval',
        status: 'pending',
      },
    ],
    activeStep: 1,
  },
};

export const WithContent: Story = {
  args: {
    steps: [
      {
        id: '1',
        label: 'Create Account',
        description: 'Set up your profile',
        content: 'Provide your basic information and create a secure password.',
        status: 'completed',
      },
      {
        id: '2',
        label: 'Verify Email',
        description: 'Confirm your email address',
        content: 'Check your inbox for a verification link and click to confirm.',
        status: 'active',
      },
      {
        id: '3',
        label: 'Setup Complete',
        description: 'You are all set',
        content: 'Your account is ready to use. Start exploring the platform.',
        status: 'pending',
      },
    ],
    activeStep: 1,
  },
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    steps: [
      {
        id: '1',
        label: 'Step 1',
        status: 'completed',
      },
      {
        id: '2',
        label: 'Step 2',
        status: 'active',
      },
      {
        id: '3',
        label: 'Step 3',
        status: 'pending',
      },
      {
        id: '4',
        label: 'Step 4',
        status: 'pending',
      },
    ],
    activeStep: 1,
  },
};

export const WithError: Story = {
  args: {
    steps: [
      {
        id: '1',
        label: 'Information Submitted',
        status: 'completed',
      },
      {
        id: '2',
        label: 'Documents Missing',
        description: 'Action required',
        status: 'error',
        content: 'Please upload the required documents: proof of loss and damage photos.',
      },
      {
        id: '3',
        label: 'Review',
        status: 'pending',
      },
    ],
    activeStep: 1,
  },
};

export const ClaimProcess: Story = {
  args: {
    steps: [
      {
        id: '1',
        label: 'Claim Filed',
        icon: <ClaimIcon />,
        description: 'December 20, 2024',
        content: 'Your claim #CLM-2024-789 has been successfully submitted.',
        status: 'completed',
      },
      {
        id: '2',
        label: 'Initial Review',
        icon: <AssignmentIcon />,
        description: 'In progress',
        content: 'Our team is reviewing your claim documentation and photos.',
        status: 'active',
      },
      {
        id: '3',
        label: 'Damage Assessment',
        icon: <VerifiedIcon />,
        description: 'Scheduled',
        content: 'We will schedule an appointment to inspect the damage.',
        status: 'pending',
      },
      {
        id: '4',
        label: 'Settlement',
        icon: <PaymentIcon />,
        description: 'Pending',
        content: 'Once approved, payment will be processed to your account.',
        status: 'pending',
      },
    ],
    activeStep: 1,
  },
};

export const PolicyRenewal: Story = {
  args: {
    steps: [
      {
        id: '1',
        label: 'Renewal Notice Sent',
        description: 'November 2024',
        status: 'completed',
        content: 'Renewal notice and new policy terms emailed to your account.',
      },
      {
        id: '2',
        label: 'Review Coverage',
        description: 'Your action',
        status: 'active',
        content:
          'Review your current coverage levels and make any desired changes to your policy.',
      },
      {
        id: '3',
        label: 'Process Payment',
        description: 'Due Dec 31',
        status: 'pending',
        content: 'Submit payment to finalize your renewal.',
      },
      {
        id: '4',
        label: 'Renewal Complete',
        description: 'Effective Jan 1',
        status: 'pending',
        content: 'Your policy will be active for another year.',
      },
    ],
    activeStep: 1,
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    steps: [
      {
        id: '1',
        label: 'Information',
        status: 'completed',
      },
      {
        id: '2',
        label: 'Review',
        status: 'active',
      },
      {
        id: '3',
        label: 'Submit',
        status: 'pending',
      },
    ],
    activeStep: 1,
  },
};

export const AllStatuses: Story = {
  args: {
    steps: [
      {
        id: '1',
        label: 'Completed Step',
        status: 'completed',
        content: 'This step has been completed successfully.',
      },
      {
        id: '2',
        label: 'Active Step',
        status: 'active',
        content: 'You are currently on this step. Complete it to continue.',
      },
      {
        id: '3',
        label: 'Pending Step',
        status: 'pending',
        content: 'This step is waiting to be started.',
      },
      {
        id: '4',
        label: 'Error Step',
        status: 'error',
        content: 'An error occurred on this step. Please review and correct.',
      },
    ],
    activeStep: 1,
  },
};

// Interactive story with state management - users can navigate steps
export const InteractiveNavigation: Story = {
  render: function InteractiveStepperDemo() {
    const [activeStep, setActiveStep] = React.useState(0);
    
    const claimSteps = [
      {
        id: '1',
        label: 'File Claim',
        description: 'Submit your claim',
        status: activeStep > 0 ? 'completed' : activeStep === 0 ? 'active' : 'pending',
        content: 'Fill out the claim form with incident details.',
      },
      {
        id: '2',
        label: 'Upload Documents',
        description: 'Provide evidence',
        status: activeStep > 1 ? 'completed' : activeStep === 1 ? 'active' : 'pending',
        content: 'Upload photos, receipts, and other supporting documents.',
      },
      {
        id: '3',
        label: 'Assessment',
        description: 'Review your claim',
        status: activeStep > 2 ? 'completed' : activeStep === 2 ? 'active' : 'pending',
        content: 'Wait for our team to review and assess your claim.',
      },
      {
        id: '4',
        label: 'Settlement',
        description: 'Receive payment',
        status: activeStep > 3 ? 'completed' : activeStep === 3 ? 'active' : 'pending',
        content: 'Once approved, funds will be transferred to your account.',
      },
    ];

    return (
      <div style={{ padding: '24px' }}>
        <Stepper steps={claimSteps} activeStep={activeStep} />
        <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
              opacity: activeStep === 0 ? 0.5 : 1,
            }}
          >
            Previous
          </button>
          <button
            onClick={() => setActiveStep(prev => Math.min(3, prev + 1))}
            disabled={activeStep === 3}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              cursor: activeStep === 3 ? 'not-allowed' : 'pointer',
              opacity: activeStep === 3 ? 0.5 : 1,
            }}
          >
            Next
          </button>
          <span style={{ marginLeft: '16px', color: '#666' }}>
            Step {activeStep + 1} of {claimSteps.length}
          </span>
        </div>
      </div>
    );
  },
};
