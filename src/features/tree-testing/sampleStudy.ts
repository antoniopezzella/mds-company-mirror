import type { TreeStudyConfig } from './types';

export const sampleTreeStudy: TreeStudyConfig = {
  title: 'Client Portal Tree Test',
  description:
    'A lightweight tree test for a Marsh-style client portal. Participants navigate only the information architecture, not page layouts, so you can see whether labels and groupings support findability.',
  rootLabel: 'Portal',
  tree: [
    {
      id: 'coverage',
      label: 'Coverage & Policies',
      description: 'Policy administration, documents, and renewals.',
      children: [
        {
          id: 'active-policies',
          label: 'Active Policies',
          description: 'Current placements and coverage details.'
        },
        {
          id: 'renewals',
          label: 'Renewals',
          description: 'Upcoming policy review and renewal activity.'
        },
        {
          id: 'certificates',
          label: 'Certificates of Insurance',
          description: 'Generate and download COIs.'
        }
      ]
    },
    {
      id: 'claims',
      label: 'Claims',
      description: 'Claim reporting and claim status.',
      children: [
        {
          id: 'open-claims',
          label: 'Open Claims',
          description: 'Claims currently under review.'
        },
        {
          id: 'claim-history',
          label: 'Claims History',
          description: 'Resolved and archived claims.'
        },
        {
          id: 'report-claim',
          label: 'Report a New Claim',
          description: 'Start a new loss notice.'
        }
      ]
    },
    {
      id: 'risk',
      label: 'Risk Management',
      description: 'Prevention programs, assessments, and controls.',
      children: [
        {
          id: 'risk-assessments',
          label: 'Risk Assessments',
          description: 'Facility and portfolio assessments.'
        },
        {
          id: 'loss-control',
          label: 'Loss Control Recommendations',
          description: 'Inspection findings and prevention advice.'
        },
        {
          id: 'safety-training',
          label: 'Safety Training',
          description: 'Training materials and sessions.'
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics & Benchmarking',
      description: 'Performance insights and peer comparisons.',
      children: [
        {
          id: 'risk-insights',
          label: 'Risk Insights',
          description: 'Risk scorecards and modeled signals.'
        },
        {
          id: 'cost-drivers',
          label: 'Cost Drivers',
          description: 'Premium and loss driver analysis.'
        },
        {
          id: 'benchmarks',
          label: 'Industry Benchmarks',
          description: 'Compare performance against peers.'
        }
      ]
    },
    {
      id: 'documents',
      label: 'Documents',
      description: 'Shared files, contracts, and compliance records.',
      children: [
        {
          id: 'shared-files',
          label: 'Shared Files',
          description: 'Project documents from your service team.'
        },
        {
          id: 'contracts',
          label: 'Contracts',
          description: 'Master services and brokerage agreements.'
        },
        {
          id: 'compliance',
          label: 'Compliance Records',
          description: 'Regulatory, audit, and governance documentation.'
        }
      ]
    },
    {
      id: 'account',
      label: 'Account Settings',
      description: 'Administration for users, access, and preferences.',
      children: [
        {
          id: 'team-access',
          label: 'Team Access',
          description: 'Invite teammates and manage permissions.'
        },
        {
          id: 'billing',
          label: 'Billing & Invoices',
          description: 'Invoices and billing contacts.'
        },
        {
          id: 'preferences',
          label: 'Notification Preferences',
          description: 'Alerts, digests, and delivery settings.'
        }
      ]
    }
  ],
  tasks: [
    {
      id: 'task-coi',
      prompt: 'Where would you go to download a certificate of insurance for a vendor request?',
      successNodeId: 'certificates'
    },
    {
      id: 'task-claim',
      prompt: 'Where would you start if a facility incident happened today and you needed to file it?',
      successNodeId: 'report-claim'
    },
    {
      id: 'task-benchmark',
      prompt: 'Where would you look to compare your program performance against similar companies?',
      successNodeId: 'benchmarks'
    },
    {
      id: 'task-access',
      prompt: 'Where would you add a colleague so they can log in and see the account?',
      successNodeId: 'team-access'
    },
    {
      id: 'task-loss-control',
      prompt: 'Where would you expect to find recommendations from a recent site inspection?',
      successNodeId: 'loss-control'
    }
  ]
};
