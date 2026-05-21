import figma from '@figma/code-connect';
import { ChartMetricCard } from '../components/ChartMetricCard/ChartMetricCard';

/** Code Connect — Metric Card (V3 Content & Display) */
const NODE_URL = '${LIB}?node-id=7592-8740';

figma.connect(ChartMetricCard, NODE_URL, {
  props: {
    hasAlert: figma.boolean('Has Alert'),
    hasHeadline: figma.boolean('Has Headline'),
    hasInsights: figma.boolean('Has Insights'),
    hasHyperlink: figma.boolean('Has Hyperlink'),
    hasLeftDecoration: figma.boolean('Has left decoration'),
  },
  example: (props: any) => (
    <ChartMetricCard
      title="Metric Title"
      value="$1,234"
      trend={props.hasInsights ? { value: 12, direction: 'up' } : undefined}
    />
  ),
});
