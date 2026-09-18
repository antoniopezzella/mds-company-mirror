import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, ContentCard } from './card';
import { Badge } from './badge';

/**
 * # Card
 *
 * The composable `Card`/`CardHeader`/`CardTitle`/`CardDescription`/
 * `CardContent`/`CardFooter` primitives are the canonical primitive shape —
 * the primary API here. `ContentCard` is a convenience wrapper matching
 * what the MDS Card's own Figma spec actually describes (see the note in
 * card.tsx about the existing MUI `Card.tsx` being a differently-scoped
 * "insight/stats card", already covered by `metric-card`).
 */
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const Composable: StoryObj = {
  render: () => (
    <div className="w-[360px]">
      <Card>
        <CardHeader>
          <CardTitle>Renewal reminder</CardTitle>
          <CardDescription>Your commercial auto policy renews in 14 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Review your coverage limits before the renewal date to avoid a lapse.</p>
        </CardContent>
        <CardFooter>
          <button className="rounded bg-[#000f47] px-3 py-1.5 text-sm text-white">Review policy</button>
          <button className="rounded border px-3 py-1.5 text-sm">Dismiss</button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const Borderless: StoryObj = {
  render: () => (
    <div className="w-[360px]">
      <Card border={false} className="shadow-md">
        <CardHeader>
          <CardTitle>Shadow instead of border</CardTitle>
          <CardDescription>Set border={'{false}'} and add your own className for elevation.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

// ── ContentCard (matches the actual Figma "Card" spec) ─────────────────────

export const ContentCardVertical: StoryObj<typeof ContentCard> = {
  render: (args) => (
    <div className="w-[320px]">
      <ContentCard {...args} />
    </div>
  ),
  args: {
    image: 'https://picsum.photos/seed/marsh1/400/240',
    category: 'Risk Insights',
    date: 'Jan 12, 2026',
    title: 'How to prepare for hurricane season',
    description: 'A practical guide to assessing exposure and reviewing coverage before peak season.',
    ctaLabel: 'Read more',
    onCtaClick: () => alert('Navigate to article'),
  },
};

export const ContentCardHorizontal: StoryObj<typeof ContentCard> = {
  render: (args) => (
    <div className="w-[480px]">
      <ContentCard {...args} />
    </div>
  ),
  args: {
    orientation: 'horizontal',
    image: 'https://picsum.photos/seed/marsh2/300/300',
    category: 'Claims',
    date: 'Feb 3, 2026',
    title: 'Filing a claim after a covered loss',
    description: 'Step-by-step guidance for what to document and who to contact.',
  },
};

export const ContentCardNoImage: StoryObj<typeof ContentCard> = {
  render: (args) => (
    <div className="w-[320px]">
      <ContentCard {...args} />
    </div>
  ),
  args: {
    category: 'Cyber',
    title: 'Cyber liability checklist',
    description: 'Twelve questions to ask before your next renewal.',
    ctaLabel: 'View checklist',
    onCtaClick: () => alert('Navigate'),
  },
};

export const CardGrid: StoryObj = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="mb-1 flex items-center gap-2">
              <Badge tone="info" soft>
                Policy
              </Badge>
            </div>
            <CardTitle>Policy #{i}</CardTitle>
            <CardDescription>Auto insurance, renews in {30 * i} days</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  ),
};
