import type { Meta, StoryObj } from '@storybook/react';
import { ImageWithFallback } from './image-with-fallback';

/**
 * # ImageWithFallback (shadcn/ui)
 *
 * `getRoleColor()`-driven counterpart to the MUI `ImageWithFallback`. Same
 * `src`/`fallbackSrc`/`showSkeleton` API as the MUI twin, plus `aspectRatio`
 * — genuinely part of the Figma "Image Placeholder" spec's `Format`
 * property even though the current MUI component doesn't expose it.
 */
const meta: Meta<typeof ImageWithFallback> = {
  title: 'Components/ImageWithFallback',
  component: ImageWithFallback,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    aspectRatio: {
      control: 'select',
      options: ['1:1', '5:4', '4:3', '3:2', '16:9', '16:10', '2:1', 'round', 'free'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageWithFallback>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/seed/marsh-img/480/320',
    alt: 'Sample image',
    aspectRatio: '3:2',
  },
  decorators: [(Story) => <div className="w-[320px]"><Story /></div>],
};

export const Square: Story = {
  args: {
    src: 'https://picsum.photos/seed/marsh-sq/400/400',
    alt: 'Square image',
    aspectRatio: '1:1',
  },
  decorators: [(Story) => <div className="w-[240px]"><Story /></div>],
};

export const Round: Story = {
  args: {
    src: 'https://picsum.photos/seed/marsh-round/200/200',
    alt: 'Round image',
    aspectRatio: 'round',
  },
  decorators: [(Story) => <div className="w-[120px]"><Story /></div>],
};

export const Widescreen: Story = {
  args: {
    src: 'https://picsum.photos/seed/marsh-wide/800/450',
    alt: 'Widescreen image',
    aspectRatio: '16:9',
  },
  decorators: [(Story) => <div className="w-[400px]"><Story /></div>],
};

export const BrokenImage: Story = {
  args: {
    src: 'https://example.invalid/nonexistent.jpg',
    alt: 'Broken image',
    aspectRatio: '3:2',
  },
  decorators: [(Story) => <div className="w-[320px]"><Story /></div>],
};

export const WithFallbackSrc: Story = {
  args: {
    src: 'https://example.invalid/nonexistent.jpg',
    fallbackSrc: 'https://picsum.photos/seed/marsh-fallback/480/320',
    alt: 'Falls back to a working image',
    aspectRatio: '3:2',
  },
  decorators: [(Story) => <div className="w-[320px]"><Story /></div>],
};
