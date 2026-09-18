import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';

/**
 * # Collapsible
 *
 * No MDS/Figma spec exists for this component — a thin, unstyled re-export
 * of Radix Collapsible (matching the standard convention). Compose it
 * with role-token-driven styles at the call site, as shown below.
 */
const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-[320px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">3 policies</span>
          <CollapsibleTrigger asChild>
            <button className="rounded p-1.5 hover:bg-gray-100" aria-label="Toggle">
              <ChevronsUpDown className="h-4 w-4" />
            </button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded border px-3 py-2 text-sm">Commercial Auto</div>
        <CollapsibleContent className="mt-2 flex flex-col gap-2">
          <div className="rounded border px-3 py-2 text-sm">General Liability</div>
          <div className="rounded border px-3 py-2 text-sm">Cyber Liability</div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
