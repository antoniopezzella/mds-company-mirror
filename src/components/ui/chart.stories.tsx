import type { Meta, StoryObj } from '@storybook/react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis } from 'recharts';
import { getRoleColor } from '@/theme/roles';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from './chart';

/**
 * # Chart (shadcn/ui)
 *
 * No MDS/Figma spec exists for this component — built matching real
 * shadcn/ui conventions (Recharts + `ChartConfig`), following this repo's
 * `dataviz` skill. Series default to `--chart-1`..`--chart-5` — five brand
 * hues (green, blue, gold, purple, red) validated for CVD-safe adjacency in
 * both light and dark mode via `node scripts/validate_palette.js`. That
 * order is load-bearing — don't reassign it.
 *
 * Every example ships a tooltip + legend by default (identity is never
 * color-alone) and uses recessive grid/axis lines.
 */
const meta: Meta = {
  title: 'Components/Chart',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

const premiumByMonth = [
  { month: 'Jan', property: 4200, liability: 2800 },
  { month: 'Feb', property: 3800, liability: 3100 },
  { month: 'Mar', property: 5100, liability: 2600 },
  { month: 'Apr', property: 4700, liability: 3400 },
  { month: 'May', property: 5600, liability: 3900 },
  { month: 'Jun', property: 6100, liability: 4200 },
];

const twoSeriesConfig: ChartConfig = {
  property: { label: 'Property' },
  liability: { label: 'Liability' },
};

export const LineChartExample: StoryObj = {
  render: () => (
    <ChartContainer config={twoSeriesConfig} className="h-[300px] w-full max-w-2xl">
      <LineChart data={premiumByMonth}>
        <CartesianGrid strokeDasharray="3 3" stroke={getRoleColor('border.default')} vertical={false} />
        <XAxis dataKey="month" stroke={getRoleColor('text.secondary')} tickLine={false} axisLine={false} />
        <YAxis stroke={getRoleColor('text.secondary')} tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="property" stroke="var(--color-property)" strokeWidth={2} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="liability" stroke="var(--color-liability)" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ChartContainer>
  ),
};

export const BarChartExample: StoryObj = {
  render: () => (
    <ChartContainer config={twoSeriesConfig} className="h-[300px] w-full max-w-2xl">
      <BarChart data={premiumByMonth}>
        <CartesianGrid strokeDasharray="3 3" stroke={getRoleColor('border.default')} vertical={false} />
        <XAxis dataKey="month" stroke={getRoleColor('text.secondary')} tickLine={false} axisLine={false} />
        <YAxis stroke={getRoleColor('text.secondary')} tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="property" fill="var(--color-property)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="liability" fill="var(--color-liability)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  ),
};

export const AreaChartExample: StoryObj = {
  render: () => (
    <ChartContainer config={twoSeriesConfig} className="h-[300px] w-full max-w-2xl">
      <AreaChart data={premiumByMonth}>
        <CartesianGrid strokeDasharray="3 3" stroke={getRoleColor('border.default')} vertical={false} />
        <XAxis dataKey="month" stroke={getRoleColor('text.secondary')} tickLine={false} axisLine={false} />
        <YAxis stroke={getRoleColor('text.secondary')} tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area type="monotone" dataKey="property" stroke="var(--color-property)" fill="var(--color-property)" fillOpacity={0.2} strokeWidth={2} />
        <Area type="monotone" dataKey="liability" stroke="var(--color-liability)" fill="var(--color-liability)" fillOpacity={0.2} strokeWidth={2} />
      </AreaChart>
    </ChartContainer>
  ),
};

const claimsByType = [
  { type: 'property', value: 42 },
  { type: 'auto', value: 28 },
  { type: 'liability', value: 18 },
  { type: 'cyber', value: 8 },
  { type: 'workers-comp', value: 4 },
];

const claimsConfig: ChartConfig = {
  property: { label: 'Property' },
  auto: { label: 'Auto' },
  liability: { label: 'Liability' },
  cyber: { label: 'Cyber' },
  'workers-comp': { label: 'Workers Comp' },
};

export const PieChartExample: StoryObj = {
  render: () => (
    <ChartContainer config={claimsConfig} className="h-[300px] w-full max-w-md">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Pie data={claimsByType} dataKey="value" nameKey="type" innerRadius={50} outerRadius={90} paddingAngle={2}>
          {claimsByType.map((entry) => (
            <Cell key={entry.type} fill={`var(--color-${entry.type})`} stroke={getRoleColor('surface.default')} strokeWidth={2} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  ),
};

export const SingleSeriesNoLegend: StoryObj = {
  render: () => (
    <ChartContainer config={{ property: { label: 'Property premium' } }} className="h-[240px] w-full max-w-xl">
      <LineChart data={premiumByMonth}>
        <CartesianGrid strokeDasharray="3 3" stroke={getRoleColor('border.default')} vertical={false} />
        <XAxis dataKey="month" stroke={getRoleColor('text.secondary')} tickLine={false} axisLine={false} />
        <YAxis stroke={getRoleColor('text.secondary')} tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="property" stroke="var(--color-property)" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ChartContainer>
  ),
};
