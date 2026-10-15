import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlignCenter, AlignLeft, AlignRight, ChevronDown, Copy, Minus, Plus, Redo2, Undo2 } from 'lucide-react';

import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from './button-group';
import { Button } from './button';
import { Input } from './input';

/**
 * # ButtonGroup
 *
 * Joins related buttons into one visual unit: adjacent buttons share a single
 * border and the corners between them flatten, so the group reads as one
 * control rather than several placed side by side.
 *
 * **Use it for actions that belong to the same decision** — alignment, undo/redo,
 * a split action with its menu, an input with its affix.
 *
 * **Don't use it to save space.** Unrelated actions crammed into a group imply a
 * relationship that isn't there. If the buttons wouldn't share a sentence
 * ("align left, centre, or right"), they shouldn't share a border.
 *
 * ## Accessibility
 *
 * The container is `role="group"`, which tells assistive tech the buttons belong
 * together — but a group with no name announces nothing useful. **Give it an
 * `aria-label`** unless the relationship is already obvious from a visible
 * heading or the button labels themselves.
 *
 * ## Sizing
 *
 * There is **no `size` prop on the group** — upstream shadcn has none either, in
 * the React or the Vue port. A group's height is simply the height of what it
 * contains, so set `size` on the child `Button`s (`sm` / `md` / `lg`) and the
 * group follows. See the **Sizes** and **IconSizes** stories.
 *
 * ## Related
 *
 * - `ToggleGroup` — when the buttons represent *state* (pressed / not pressed),
 *   not one-off actions. A text-alignment control that shows which alignment is
 *   currently active is a ToggleGroup; one that just applies an alignment is a
 *   ButtonGroup.
 * - `InputGroup` — when the unit is built around an input rather than buttons.
 */
const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Joins related buttons into a single unit with shared borders. Ported from shadcn/ui, re-skinned with MDS role tokens. '
          + 'Sizing is set on the child Buttons, not on the group — see the Sizes story.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Stacking direction. Determines which borders and corners collapse.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: { 'aria-label': 'Text alignment' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical', 'aria-label': 'Text alignment' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

/** Icon-only buttons still need names — the icon conveys nothing to a screen reader. */
export const IconOnly: StoryObj = {
  render: () => (
    <ButtonGroup aria-label="Text alignment">
      <Button variant="outline" iconOnly aria-label="Align left" icon={<AlignLeft className="h-4 w-4" />} />
      <Button variant="outline" iconOnly aria-label="Align center" icon={<AlignCenter className="h-4 w-4" />} />
      <Button variant="outline" iconOnly aria-label="Align right" icon={<AlignRight className="h-4 w-4" />} />
    </ButtonGroup>
  ),
};

/**
 * A separator marks a boundary *within* a group — here, history actions on one
 * side and a clipboard action on the other. It's decorative, so it adds nothing
 * to the accessibility tree.
 */
export const WithSeparator: StoryObj = {
  render: () => (
    <ButtonGroup aria-label="Editor actions">
      <Button variant="outline" iconOnly aria-label="Undo" icon={<Undo2 className="h-4 w-4" />} />
      <Button variant="outline" iconOnly aria-label="Redo" icon={<Redo2 className="h-4 w-4" />} />
      <ButtonGroupSeparator />
      <Button variant="outline" iconOnly aria-label="Copy" icon={<Copy className="h-4 w-4" />} />
    </ButtonGroup>
  ),
};

/** `ButtonGroupText` is a label, not a control — useful for units and prefixes. */
export const WithText: StoryObj = {
  render: () => (
    <ButtonGroup aria-label="Quantity">
      <Button variant="outline" iconOnly aria-label="Decrease quantity" icon={<Minus className="h-4 w-4" />} />
      <ButtonGroupText>12</ButtonGroupText>
      <Button variant="outline" iconOnly aria-label="Increase quantity" icon={<Plus className="h-4 w-4" />} />
    </ButtonGroup>
  ),
};

/**
 * With an input. Note `asChild` on the text so it renders a real `<label>`
 * bound to the field — a visual prefix that isn't a label leaves the input
 * unnamed.
 */
export const WithInput: StoryObj = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText asChild>
        <label htmlFor="bg-domain">https://</label>
      </ButtonGroupText>
      <Input id="bg-domain" placeholder="example.com" className="w-[200px]" />
      <Button variant="primary">Save</Button>
    </ButtonGroup>
  ),
};

/** A split action: the primary action plus a menu of related ones. */
export const SplitAction: StoryObj = {
  render: () => (
    <ButtonGroup aria-label="Export">
      <Button variant="primary">Export</Button>
      <Button variant="primary" iconOnly aria-label="More export options" icon={<ChevronDown className="h-4 w-4" />} />
    </ButtonGroup>
  ),
};

/**
 * Nested groups are spaced apart rather than joined, so each reads as its own
 * unit while staying on one row.
 */
export const NestedGroups: StoryObj = {
  render: () => (
    <ButtonGroup aria-label="Editor toolbar">
      <ButtonGroup aria-label="History">
        <Button variant="outline" iconOnly aria-label="Undo" icon={<Undo2 className="h-4 w-4" />} />
        <Button variant="outline" iconOnly aria-label="Redo" icon={<Redo2 className="h-4 w-4" />} />
      </ButtonGroup>
      <ButtonGroup aria-label="Alignment">
        <Button variant="outline" iconOnly aria-label="Align left" icon={<AlignLeft className="h-4 w-4" />} />
        <Button variant="outline" iconOnly aria-label="Align center" icon={<AlignCenter className="h-4 w-4" />} />
      </ButtonGroup>
    </ButtonGroup>
  ),
};

/**
 * **Size comes from the buttons, not the group.** `ButtonGroup` has no `size`
 * prop — upstream shadcn doesn't have one either, in the React or Vue port. Set
 * `size` on each child `Button` and the group adopts that scale, because its
 * own height is just the height of what it contains.
 *
 * Keep one size per group. Mixing them makes the shared border step mid-row and
 * the unit stops reading as one control.
 */
export const Sizes: StoryObj = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup aria-label="Small">
        <Button variant="outline" size="sm">Small</Button>
        <Button variant="outline" size="sm">Small</Button>
        <Button variant="outline" size="sm">Small</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Default">
        <Button variant="outline" size="md">Default</Button>
        <Button variant="outline" size="md">Default</Button>
        <Button variant="outline" size="md">Default</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Large">
        <Button variant="outline" size="lg">Large</Button>
        <Button variant="outline" size="lg">Large</Button>
        <Button variant="outline" size="lg">Large</Button>
      </ButtonGroup>
    </div>
  ),
};

/** Icon-only groups at each size, where the scale is most visible. */
export const IconSizes: StoryObj = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <ButtonGroup key={size} aria-label={`Text alignment (${size})`}>
          <Button variant="outline" size={size} iconOnly aria-label={`Align left (${size})`} icon={<AlignLeft className="h-4 w-4" />} />
          <Button variant="outline" size={size} iconOnly aria-label={`Align center (${size})`} icon={<AlignCenter className="h-4 w-4" />} />
          <Button variant="outline" size={size} iconOnly aria-label={`Align right (${size})`} icon={<AlignRight className="h-4 w-4" />} />
        </ButtonGroup>
      ))}
    </div>
  ),
};

/** Every variant the group is likely to be built from, for visual comparison. */
export const Variants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ButtonGroup aria-label="Outline">
        <Button variant="outline">One</Button>
        <Button variant="outline">Two</Button>
        <Button variant="outline">Three</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Primary">
        <Button variant="primary">One</Button>
        <Button variant="primary">Two</Button>
        <Button variant="primary">Three</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Secondary">
        <Button variant="secondary">One</Button>
        <Button variant="secondary">Two</Button>
        <Button variant="secondary">Three</Button>
      </ButtonGroup>
    </div>
  ),
};
