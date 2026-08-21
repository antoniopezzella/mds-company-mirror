import figma from '@figma/code-connect';
import Tabs from '../components/ui/tabs';

/** Code Connect — Tabs (V3 Navigation) */
const NODE_URL = '${LIB}?node-id=7584-43859';

figma.connect(Tabs, NODE_URL, {
  props: {
    hasTab2: figma.boolean('Has tab 2'),
    hasTab3: figma.boolean('Has tab 3'),
    hasTab4: figma.boolean('Has tab 4'),
    hasTab5: figma.boolean('Has tab 5'),
  },
  example: (props: any) => (
    <Tabs
      tabs={[
        { id: 'tab1', title: 'Tab 1', content: 'Tab 1 content' },
        ...(props.hasTab2 ? [{ id: 'tab2', title: 'Tab 2', content: 'Tab 2 content' }] : []),
        ...(props.hasTab3 ? [{ id: 'tab3', title: 'Tab 3', content: 'Tab 3 content' }] : []),
      ]}
      defaultActiveId="tab1"
    />
  ),
});
