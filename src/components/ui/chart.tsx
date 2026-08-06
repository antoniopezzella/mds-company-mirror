import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';

/**
 * Chart — no MDS/Figma spec exists for this yet; built matching real
 * shadcn/ui conventions (Recharts + a `ChartConfig` → CSS-var bridge),
 * following the project's `dataviz` skill:
 *
 * - Series default to `--chart-1`..`--chart-5` (src/index.css) — a
 *   validated categorical palette (5 brand hues, CVD-safe adjacency order,
 *   independently checked for light and dark surfaces via
 *   `node scripts/validate_palette.js`). Don't reassign that order; a 6th+
 *   series should fold into "Other" rather than get a generated hue.
 * - Grid/axes are recessive (`border.default`/`text.secondary`), never the
 *   series color.
 * - Tooltip + legend ship by default (`ChartTooltipContent` /
 *   `ChartLegendContent`) — identity is never color-alone.
 */

const CHART_COLOR_VARS = ['--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5'] as const;

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: { light: string; dark: string } })
>;

type ChartContextValue = { config: ChartConfig };
const ChartContext = React.createContext<ChartContextValue | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error('Chart components must be used within a <ChartContainer>');
  return context;
}

let chartCount = 0;

export interface ChartContainerProps extends React.ComponentProps<'div'> {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ id, className, children, config, ...props }, ref) => {
    const generatedId = React.useId();
    const chartId = `chart-${id ?? generatedId}`.replace(/:/g, '');

    // Assigns each config entry a `--chart-N` var (falling back to the
    // validated categorical order) unless it explicitly opts into a status/
    // semantic role color via `color`.
    const colorAssignments = React.useMemo(() => {
      const entries = Object.entries(config);
      return entries.map(([key, item], index) => ({
        key,
        item,
        fallbackVar: CHART_COLOR_VARS[index % CHART_COLOR_VARS.length],
      }));
    }, [config]);

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          ref={ref}
          data-chart={chartId}
          className={cn('flex aspect-video justify-center text-xs', className)}
          {...props}
        >
          <ChartStyle id={chartId} colorAssignments={colorAssignments} />
          <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  }
);
ChartContainer.displayName = 'ChartContainer';

const ChartStyle: React.FC<{
  id: string;
  colorAssignments: { key: string; item: ChartConfig[string]; fallbackVar: string }[];
}> = ({ id, colorAssignments }) => {
  const rules = colorAssignments
    .map(({ key, item, fallbackVar }) => {
      if (item.theme) {
        return `[data-chart="${id}"] { --color-${key}: ${item.theme.light}; }\n.dark [data-chart="${id}"] { --color-${key}: ${item.theme.dark}; }`;
      }
      const value = item.color ?? `hsl(var(${fallbackVar}))`;
      return `[data-chart="${id}"] { --color-${key}: ${value}; }`;
    })
    .join('\n');

  return <style dangerouslySetInnerHTML={{ __html: rules }} />;
};

const ChartTooltip = RechartsPrimitive.Tooltip;

// Deliberately NOT derived from `React.ComponentProps<typeof RechartsPrimitive.Tooltip>` —
// that's the type for the `<Tooltip>` JSX element itself (what you'd pass to render it),
// not the shape Recharts actually invokes a custom `content` renderer with
// (`active`/`payload`/`label`, injected at render time). Those two types don't overlap
// the way the original shadcn v2-era recipe assumed; Recharts 3.x makes the mismatch a
// hard compile error under `strict: true` rather than silently `any`-ing it out.
interface ChartTooltipContentPayloadItem {
  dataKey?: string | number;
  name?: string | number;
  value?: number | string;
  color?: string;
  payload?: { fill?: string } & Record<string, unknown>;
}

interface ChartTooltipContentProps extends Omit<React.ComponentProps<'div'>, 'children'> {
  active?: boolean;
  payload?: ChartTooltipContentPayloadItem[];
  label?: React.ReactNode;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: 'line' | 'dot';
  labelFormatter?: (label: React.ReactNode, payload: ChartTooltipContentPayloadItem[]) => React.ReactNode;
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  ({ active, payload, label, className, indicator = 'dot', hideLabel = false, hideIndicator = false, labelFormatter }, ref) => {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  return (
    <div
      ref={ref}
      className={cn('grid min-w-[8rem] gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-md', className)}
      style={{ backgroundColor: getRoleColor('surface.default'), borderColor: getRoleColor('border.default'), color: getRoleColor('text.primary') }}
    >
      {!hideLabel && label !== undefined && (
        <div className="font-medium">{labelFormatter ? labelFormatter(label, payload) : (config[label as string]?.label ?? label)}</div>
      )}
      <div className="grid gap-1.5">
        {payload.map((entry, index) => {
          const key = entry.dataKey ?? entry.name;
          const itemConfig = config[key as string];
          const color = entry.color ?? entry.payload?.fill;
          return (
            <div key={index} className="flex w-full items-center gap-2">
              {!hideIndicator && (
                <span
                  className={cn('shrink-0 rounded-[2px]', indicator === 'dot' ? 'h-2.5 w-2.5' : 'h-1 w-3')}
                  style={{ backgroundColor: color }}
                />
              )}
              <div className="flex flex-1 items-center justify-between gap-4 leading-none">
                <span style={{ color: getRoleColor('text.secondary') }}>{itemConfig?.label ?? entry.name}</span>
                {entry.value !== undefined && <span className="font-mono font-medium">{entry.value.toLocaleString()}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
ChartTooltipContent.displayName = 'ChartTooltipContent';

const ChartLegend = RechartsPrimitive.Legend;

// Same rationale as ChartTooltipContentProps above: an explicit local type for what
// Recharts actually passes a custom legend `content` renderer, not `LegendProps` (the
// `<Legend>` JSX element's own props, where `payload` is typed as required).
interface ChartLegendContentPayloadItem {
  value?: string | number;
  dataKey?: string | number;
  color?: string;
}

interface ChartLegendContentProps extends Omit<React.ComponentProps<'div'>, 'children'> {
  payload?: ChartLegendContentPayloadItem[];
  hideIcon?: boolean;
}

const ChartLegendContent = React.forwardRef<HTMLDivElement, ChartLegendContentProps>(({ className, hideIcon = false, payload }, ref) => {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div ref={ref} className={cn('flex flex-wrap items-center justify-center gap-4', className)}>
      {payload.map((entry) => {
        const key = entry.dataKey ?? entry.value;
        const itemConfig = config[key as string];
        return (
          <div key={String(key)} className="flex items-center gap-1.5 text-xs">
            {!hideIcon && <span className="h-2.5 w-2.5 shrink-0 rounded-[2px]" style={{ backgroundColor: entry.color }} />}
            <span style={{ color: getRoleColor('text.secondary') }}>{itemConfig?.label ?? entry.value}</span>
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = 'ChartLegendContent';

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent };
