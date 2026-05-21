import figma from '@figma/code-connect';
import Tabs from '../components/Tabs/Tabs';

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
        { label: 'Tab 1', value: 'tab1' },
        ...(props.hasTab2 ? [{ label: 'Tab 2', value: 'tab2' }] : []),
        ...(props.hasTab3 ? [{ label: 'Tab 3', value: 'tab3' }] : []),
      ]}
      value="tab1"
    />
  ),
});
