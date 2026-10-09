import figma from '@figma/code-connect';
import { StatCard } from '../components/ui/stat-card';

/**
 * Code Connect — Metric Card (V3 Content & Display)
 *
 * Repointed from the deleted `src/components/ChartMetricCard` (MUI) to
 * `ui/stat-card`'s `StatCard` — the genuine successor for a "metric with
 * trend" card. `ui/metric-card`'s `MetricCard` was considered first (it is
 * the closer name match) but it only takes `{ value, label }` — no
 * trend/delta/sparkline — so it would silently drop the entire "chart" half
 * of what ChartMetricCard was. `StatCard` keeps label + value plus a delta
 * badge and an inline sparkline (`sparkline: number[]`), the real match for
 * the old `change`/`trend`/`data[]` shape.
 *
 * Only `hasInsights` has a real target on `StatCard` (`trendDescription`).
 * `hasAlert`, `hasHeadline`, `hasHyperlink`, and `hasLeftDecoration` are
 * dropped: `StatCard` has no alert banner, no optional-headline toggle (its
 * `label` is a required prop, always rendered), no hyperlink slot, and no
 * leading-decoration/icon slot — there is nothing honest to map them to.
 */
const NODE_URL = '${LIB}?node-id=7592-8740';

figma.connect(StatCard, NODE_URL, {
  props: {
    hasInsights: figma.boolean('Has Insights'),
  },
  example: (props) => (
    <StatCard
      label="Metric Title"
      value={1234}
      format="currency"
      delta={12}
      sparkline={[8, 12, 10, 14]}
      trendDescription={props.hasInsights ? 'vs last period' : undefined}
    />
  ),
});
