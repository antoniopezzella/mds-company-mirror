import type { Meta, StoryObj } from '@storybook/react';
import { RESGAssetListPage } from './RESGAssetListPage';

const meta = {
  title: 'Pages/RESG Asset List',
  component: RESGAssetListPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# RESG Asset List Page

Real Estate Asset Management Tool interface for the RESG project. Features comprehensive asset tracking, filtering, and management capabilities.

## Features

- **Client Overview**: Display client name and key metrics (Total Assets, TIV)
- **Quick Actions**: Rate Matrix, Allocations, and Adjustments buttons
- **Smart Filtering**: Multi-select filter chips with asset counts
- **Asset Search**: Real-time search functionality
- **Data Table**: Sortable columns with status indicators
- **Responsive Design**: Mobile-friendly layout using MDS grid system

## Design System Usage

- Uses MDS Table component with pagination
- Chip components for filters and status indicators  
- Button components for actions
- MDS grid breakpoint mixins for responsive design
- Design system color roles and typography

## Based on Figma Design

Figma node: **953:20268** - "1.3.1 Asset List_ add-all"
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RESGAssetListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - full page experience
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Complete asset management interface with all features enabled.',
      },
    },
  },
};

// Mobile view story
export const MobileView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile-responsive layout showing how the interface adapts to smaller screens.',
      },
    },
  },
};

// Tablet view story  
export const TabletView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet layout showing the responsive behavior at medium screen sizes.',
      },
    },
  },
};