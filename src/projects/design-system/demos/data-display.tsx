import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, ContentCard } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { Chip } from '@/components/ui/chip';
import { Table, type TableColumn } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { getRoleColor } from '@/theme/roles';
import { useThemeMode } from '@/theme/ThemeModeContext';

export function CardDemo() {
  const { mode } = useThemeMode();
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Commercial Property</CardTitle>
          <CardDescription>Policy MB-0042 · renews Mar 2027</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm" style={{ color: getRoleColor('text.secondary', { mode }) }}>
            Coverage limit $2.4M, deductible $10,000.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" size="sm">
            View policy
          </Button>
        </CardFooter>
      </Card>
      <ContentCard
        category="Risk bulletin"
        date="Aug 12, 2026"
        title="Coastal flood zones reassessed"
        description="Updated FEMA maps affect 3 of your insured properties."
        ctaLabel="Read more"
        onCtaClick={() => {}}
      />
    </div>
  );
}

export function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Avatar initials="JD" size="sm" />
      <Avatar initials="AM" size="md" tone="primary" />
      <Avatar initials="RK" size="lg" tone="success" status="online" />
      <Avatar initials="TL" size="xl" variant="rounded" status="busy" />
      <Avatar initials="?" size="md" tone="warning" status="away" />
    </div>
  );
}

const BADGE_TONES: BadgeTone[] = ['default', 'info', 'success', 'warning', 'danger', 'disabled'];

export function BadgeDemo() {
  const { mode } = useThemeMode();
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {BADGE_TONES.map((tone) => (
          <Badge key={tone} tone={tone}>
            {tone}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {BADGE_TONES.filter((t) => t !== 'default' && t !== 'disabled').map((tone) => (
          <Badge key={tone} tone={tone} soft>
            {tone} (soft)
          </Badge>
        ))}
      </div>
      <p className="text-xs" style={{ color: getRoleColor('text.secondary', { mode }) }}>
        Not to be confused with <code className="font-mono">badge-anchor.tsx</code> — an overlay indicator pinned to a child element, a different pattern entirely.
      </p>
    </div>
  );
}

export function ChipDemo() {
  const [selected, setSelected] = React.useState<string[]>(['property']);
  const toggle = (id: string) => setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  const [tags, setTags] = React.useState(['flood-zone', 'high-value']);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {(['property', 'liability', 'cyber', 'auto'] as const).map((id) => (
          <Chip key={id} label={id} selectable selected={selected.includes(id)} onClick={() => toggle(id)} />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Chip key={tag} label={tag} variant="outlined" tone="info" onDelete={() => setTags((prev) => prev.filter((t) => t !== tag))} />
        ))}
      </div>
    </div>
  );
}

interface ClaimRow {
  id: string;
  policy: string;
  status: string;
  amount: string;
}

const CLAIM_ROWS: ClaimRow[] = [
  { id: 'CLM-1042', policy: 'MB-0042', status: 'Open', amount: '$12,400' },
  { id: 'CLM-1039', policy: 'MB-0011', status: 'Under review', amount: '$3,200' },
  { id: 'CLM-1027', policy: 'MB-0042', status: 'Closed', amount: '$48,900' },
];

const CLAIM_COLUMNS: TableColumn<ClaimRow>[] = [
  { key: 'id', header: 'Claim', sortable: true },
  { key: 'policy', header: 'Policy', sortable: true },
  { key: 'status', header: 'Status' },
  { key: 'amount', header: 'Amount', align: 'right' },
];

export function TableDemo() {
  return <Table columns={CLAIM_COLUMNS} data={CLAIM_ROWS} sortable hoverable variant="striped" />;
}

export function SkeletonDemo() {
  return (
    <div className="flex flex-wrap items-start gap-8">
      <div className="flex flex-col gap-2">
        <Skeleton variant="text" width={160} />
        <Skeleton variant="text" width={220} />
        <Skeleton variant="text" width={120} />
      </div>
      <Skeleton variant="circular" />
      <Skeleton variant="rounded" width={200} height={96} />
    </div>
  );
}
