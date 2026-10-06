import { Building2, FileText, LayoutDashboard, Users } from 'lucide-react';

import type { SideNavItem } from '@/components/ui/side-navigation';
import type { FormatKind } from '@/lib/format';

/**
 * Sample data for the `marsh-dashboard` block.
 *
 * REPLACE THIS FILE. It exists so the block renders something real the moment
 * it is copied in — a starter that needs a backend before it shows anything
 * is a starter nobody runs. The shapes below are the contract the page
 * expects; keep them, change the contents.
 */

// `icon` is a rendered ELEMENT, not a component reference — SideNavItem types
// it as React.ReactNode, so `icon: LayoutDashboard` is a type error.
export const DASHBOARD_NAV: SideNavItem[] = [
  { label: 'Overview', icon: <LayoutDashboard className="size-4" />, path: '#', active: true },
  { label: 'Policies', icon: <FileText className="size-4" />, path: '#' },
  { label: 'Clients', icon: <Building2 className="size-4" />, path: '#' },
  { label: 'Teams', icon: <Users className="size-4" />, path: '#' },
];

export interface SummaryStat {
  label: string;
  value: number;
  /** Read by `StatCard` through `FormatProvider` — do not pre-format. */
  format: FormatKind;
  /** Period-over-period change, as a ratio. `0.082` renders as +8.2%. */
  delta?: number;
}

export const SUMMARY: SummaryStat[] = [
  { label: 'Gross written premium', value: 48_200_000, format: 'currency', delta: 0.082 },
  { label: 'Active policies', value: 1_284, format: 'number', delta: 0.021 },
  { label: 'Renewal rate', value: 0.914, format: 'percent', delta: -0.006 },
  { label: 'Clients', value: 317, format: 'number', delta: 0.044 },
];

export interface Policy {
  id: string;
  reference: string;
  client: string;
  line: string;
  premium: number;
  renewal: string;
}

export const POLICIES: Policy[] = [
  { id: '1', reference: 'MP-104882', client: 'Centrica Us Holdings Inc.', line: 'Property', premium: 1_240_000, renewal: '2027-01-15' },
  { id: '2', reference: 'MP-104901', client: 'Cleco Corporate Holdings Llc', line: 'Casualty', premium: 880_500, renewal: '2026-11-30' },
  { id: '3', reference: 'MP-105012', client: 'FMC Corporation', line: 'Marine', premium: 2_110_000, renewal: '2027-03-01' },
  { id: '4', reference: 'MP-105044', client: 'Hilton International Co.', line: 'Property', premium: 640_000, renewal: '2026-12-12' },
  { id: '5', reference: 'MP-105118', client: 'Ingersoll-Rand Company', line: 'Cyber', premium: 415_750, renewal: '2027-02-20' },
  { id: '6', reference: 'MP-105203', client: 'Kellanova Operating Co.', line: 'Casualty', premium: 1_905_000, renewal: '2027-04-08' },
  { id: '7', reference: 'MP-105277', client: 'Nordson Corporation', line: 'Property', premium: 730_250, renewal: '2026-10-29' },
  { id: '8', reference: 'MP-105341', client: 'Quanta Services Inc.', line: 'Construction', premium: 3_480_000, renewal: '2027-05-17' },
  { id: '9', reference: 'MP-105399', client: 'Rockwell Automation Inc.', line: 'Cyber', premium: 522_000, renewal: '2027-01-31' },
  { id: '10', reference: 'MP-105460', client: 'Trane Technologies Company Llc', line: 'Marine', premium: 1_067_400, renewal: '2026-12-03' },
  { id: '11', reference: 'MP-105512', client: 'Vulcan Construction Materials Llc', line: 'Construction', premium: 2_240_900, renewal: '2027-06-22' },
  { id: '12', reference: 'MP-105588', client: 'Stanley Black & Decker Inc.', line: 'Property', premium: 955_000, renewal: '2027-02-09' },
];
