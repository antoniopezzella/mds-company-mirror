import type { Meta, StoryObj } from '@storybook/react-vite';
import '../../styles/_grid.scss';

const meta = {
  title: '_health/Grid',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const GridPresent: Story = {
  render: () => (
    <div className="container" style={{ padding: 8 }}>
      <div className="row gap-2" data-testid="row">
        <div className="col-6" style={{ background: '#eef6ff', padding: 8 }}>A</div>
        <div className="col-6" style={{ background: '#eef6ff', padding: 8 }}>B</div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const row = canvasElement.querySelector('[data-testid="row"]') as HTMLElement | null;
    if (!row) throw new Error('row not found');
    const styles = getComputedStyle(row);
    if (!styles.display.includes('grid')) {
      throw new Error(`expected display:grid, got ${styles.display}`);
    }
    const template = styles.gridTemplateColumns || '';
    if (!template) {
      throw new Error('grid-template-columns is empty');
    }
  }
};
