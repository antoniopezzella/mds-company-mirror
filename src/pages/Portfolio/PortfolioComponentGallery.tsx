/**
 * PortfolioComponentGallery.tsx
 * Live interactive showcase of real MDS components for the portfolio.
 * Used in Portfolio.tsx to demonstrate component quality to recruiters.
 */
import React, { useState } from 'react';
import styles from './ComponentGallery.module.scss';

// ── Real MDS components ───────────────────────────────────────────────────
import DSButton from '../../components/Button/Button';
import { Alert } from '../../components/Alert/Alert';
import Tabs from '../../components/Tabs/Tabs';
import { Stepper } from '../../components/Stepper/Stepper';
import { Accordion } from '../../components/Accordion/Accordion';
import { Badge } from '../../components/Badge/Badge';
import { Chip } from '../../components/Chip/Chip';
import { Table } from '../../components/Table/Table';
import type { TableColumn } from '../../components/Table/Table';
import DSTextField from '../../components/TextField/TextField';
import DSSelect from '../../components/Select/Select';

// Inline SVG icons — avoids Vite dep-optimization reload on first load
import Box from '@mui/material/Box';

const SendIcon    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>;
const DownloadIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>;
const AddIcon      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>;
type SvgProps = { style?: React.CSSProperties };
const SearchIcon   = ({ style }: SvgProps) => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={style}><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>;
const PolicyIcon   = ({ style }: SvgProps) => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={style}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>;
const GroupIcon    = ({ style }: SvgProps) => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={style}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>;
const SecurityIcon = ({ style }: SvgProps) => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={style}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>;
const VerifiedIcon = ({ style }: SvgProps) => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={style}><path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"/></svg>;

// ── Sample data ───────────────────────────────────────────────────────────
interface PolicyRow extends Record<string, unknown> {
  ref: string;
  client: string;
  coverage: string;
  premium: string;
  status: 'Active' | 'Pending' | 'Expired' | 'Bound';
  effective: string;
  broker: string;
}

const policyData: PolicyRow[] = [
  { ref: 'POL-2025-001', client: 'Oceanus Shipping Ltd', coverage: 'Marine Cargo', premium: '$184,000', status: 'Active', effective: '01 Jan 2026', broker: 'A. Pezzella' },
  { ref: 'POL-2025-002', client: 'SkyBridge Aviation', coverage: 'Aviation Hull', premium: '$620,000', status: 'Bound', effective: '15 Feb 2026', broker: 'M. Chen' },
  { ref: 'POL-2025-003', client: 'Meridian Property Group', coverage: 'Commercial Property', premium: '$97,500', status: 'Pending', effective: '01 Mar 2026', broker: 'A. Pezzella' },
  { ref: 'POL-2025-004', client: 'Vanta Energy Corp', coverage: 'Energy Liability', premium: '$310,000', status: 'Active', effective: '01 Jan 2026', broker: 'S. Kim' },
  { ref: 'POL-2025-005', client: 'Trident Financial', coverage: 'D&O Liability', premium: '$58,200', status: 'Expired', effective: '01 Dec 2024', broker: 'M. Chen' },
  { ref: 'POL-2025-006', client: 'Hyperion Tech Solutions', coverage: 'Cyber Risk', premium: '$42,800', status: 'Pending', effective: '15 Mar 2026', broker: 'A. Pezzella' },
];

const statusTone = (status: PolicyRow['status']): 'success' | 'warning' | 'danger' | 'info' | 'default' => {
  switch (status) {
    case 'Active': return 'success';
    case 'Bound':  return 'info';
    case 'Pending': return 'warning';
    case 'Expired': return 'danger';
    default: return 'default';
  }
};

const policyColumns: TableColumn<PolicyRow>[] = [
  { key: 'ref',       header: 'Policy Ref',   sortable: true, width: '140px' },
  { key: 'client',    header: 'Client',        sortable: true },
  { key: 'coverage',  header: 'Coverage Type', sortable: true },
  { key: 'premium',   header: 'Premium',       sortable: true, align: 'right' },
  {
    key: 'status', header: 'Status', sortable: true, align: 'center',
    render: (_val, row) => (
      <Chip
        label={row.status}
        tone={statusTone(row.status)}
        size="sm"
        variant="filled"
      />
    ),
  },
  { key: 'effective', header: 'Effective', sortable: true },
  { key: 'broker',    header: 'Broker' },
];

// ── Category nav config ───────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'actions', label: 'Actions', count: 2, icon: '⚡' },
  { id: 'data',    label: 'Data Display', count: 3, icon: '📊' },
  { id: 'forms',   label: 'Form Elements', count: 3, icon: '📝' },
  { id: 'nav',     label: 'Navigation', count: 3, icon: '🧭' },
  { id: 'feedback',label: 'Feedback', count: 2, icon: '💬' },
];

// ── Token annotation helper ───────────────────────────────────────────────
function TokenList({ tokens, dark = false }: { tokens: { name: string; color: string }[]; dark?: boolean }) {
  return (
    <div className={dark ? styles.componentCardTokensDark : styles.componentCardTokens}>
      <span className={dark ? styles.tokensLabelDark : styles.tokensLabel}>Tokens →</span>
      {tokens.map(t => (
        <span key={t.name} className={dark ? styles.tokenChipDark : styles.tokenChip}>
          <span className={styles.tokenDot} style={{ background: t.color }} />
          {t.name}
        </span>
      ))}
    </div>
  );
}

// ── Demo card wrapper ─────────────────────────────────────────────────────
function DemoCard({
  title, desc, tag, children, tokens, dark = false,
}: {
  title: string;
  desc: string;
  tag: string;
  children: React.ReactNode;
  tokens?: { name: string; color: string }[];
  dark?: boolean;
}) {
  return (
    <div className={dark ? styles.componentCardDark : styles.componentCard}>
      <div className={styles.componentCardHeader}>
        <div>
          <div className={dark ? styles.componentCardTitleLight : styles.componentCardTitle}>{title}</div>
          <div className={dark ? styles.componentCardDescLight : styles.componentCardDesc}>{desc}</div>
        </div>
        <span className={dark ? styles.componentCardTagDark : styles.componentCardTag}>{tag}</span>
      </div>
      <div className={styles.componentCardBody}>{children}</div>
      {tokens && <TokenList tokens={tokens} dark={dark} />}
    </div>
  );
}

// ── Panel: Actions (Button + Chip) ────────────────────────────────────────
function ActionsPanel() {
  const [loading, setLoading] = useState(false);
  const triggerLoad = () => { setLoading(true); setTimeout(() => setLoading(false), 2000); };

  return (
    <div className={styles.panelGridFull} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Button showcase */}
      <DemoCard
        title="DSButton"
        desc="4 variants · 3 tones · 3 sizes · loading state · icon support"
        tag="Button · 12 stories"
        tokens={[
          { name: 'interactive.primary', color: '#000f47' },
          { name: 'interactive.secondary', color: '#0b4bff' },
          { name: 'status.danger.fg', color: '#e53e3e' },
          { name: 'status.success.fg', color: '#64bc30' },
          { name: 'focus.ring', color: '#0b4bff' },
        ]}
      >
        {/* Variants */}
        <div className={styles.rowLabel}>Variants</div>
        <div className={styles.btnRow}>
          <DSButton variant="primary">Primary CTA</DSButton>
          <DSButton variant="secondary">Secondary</DSButton>
          <DSButton variant="outline">Outline</DSButton>
          <DSButton variant="ghost">Ghost</DSButton>
        </div>

        {/* Sizes */}
        <div className={styles.rowLabel} style={{ marginTop: 20 }}>Sizes</div>
        <div className={styles.btnRow}>
          <DSButton variant="secondary" size="sm">Small</DSButton>
          <DSButton variant="secondary" size="md">Medium</DSButton>
          <DSButton variant="secondary" size="lg">Large</DSButton>
        </div>

        {/* Tones */}
        <div className={styles.rowLabel} style={{ marginTop: 20 }}>Tones</div>
        <div className={styles.btnRow}>
          <DSButton variant="primary" tone="default">Default</DSButton>
          <DSButton variant="primary" tone="danger">Danger</DSButton>
          <DSButton variant="primary" tone="success">Success</DSButton>
        </div>

        {/* Icons + Loading */}
        <div className={styles.rowLabel} style={{ marginTop: 20 }}>With icons & loading</div>
        <div className={styles.btnRow}>
          <DSButton variant="secondary" startIcon={<AddIcon />}>New Policy</DSButton>
          <DSButton variant="outline" endIcon={<DownloadIcon />}>Export CSV</DSButton>
          <DSButton variant="secondary" startIcon={<SendIcon />} loading={loading} onClick={triggerLoad}>
            {loading ? 'Submitting…' : 'Submit claim'}
          </DSButton>
          <DSButton variant="outline" disabled>Disabled</DSButton>
        </div>
      </DemoCard>

      {/* Chip showcase */}
      <DemoCard
        title="Chip"
        desc="7 semantic tones · filled & outlined variants · selectable · deletable"
        tag="Chip · 8 stories"
        tokens={[
          { name: 'status.success.bg', color: '#def2d7' },
          { name: 'status.warning.bg', color: '#fff2da' },
          { name: 'status.danger.bg', color: '#ffe8e8' },
          { name: 'surface.accent', color: '#f7f8f8' },
        ]}
      >
        <div className={styles.rowLabel}>Filled — all tones</div>
        <div className={styles.chipRow}>
          <Chip label="Default" tone="default" variant="filled" />
          <Chip label="Primary" tone="primary" variant="filled" />
          <Chip label="Secondary" tone="secondary" variant="filled" />
          <Chip label="Success" tone="success" variant="filled" />
          <Chip label="Warning" tone="warning" variant="filled" />
          <Chip label="Danger" tone="danger" variant="filled" />
          <Chip label="Info" tone="info" variant="filled" />
        </div>
        <div className={styles.rowLabel} style={{ marginTop: 20 }}>Outlined — domain examples</div>
        <div className={styles.chipRow}>
          <Chip label="Marine Cargo" tone="info" variant="outlined" />
          <Chip label="Aviation Hull" tone="primary" variant="outlined" />
          <Chip label="Cyber Risk" tone="warning" variant="outlined" />
          <Chip label="D&O Liability" tone="secondary" variant="outlined" />
          <Chip label="Lapsed" tone="danger" variant="outlined" />
        </div>
        <div className={styles.rowLabel} style={{ marginTop: 20 }}>Sizes</div>
        <div className={styles.chipRow}>
          <Chip label="Small" tone="primary" size="sm" />
          <Chip label="Medium" tone="primary" size="md" />
          <Chip label="Large" tone="primary" size="lg" />
        </div>
      </DemoCard>
    </div>
  );
}

// ── Panel: Data Display (Table + Badge) ───────────────────────────────────
function DataPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Table */}
      <DemoCard
        title="Table"
        desc="Sortable · striped · row selection · integrated pagination · sticky header · scroll shadows"
        tag="Table · 18 stories"
        tokens={[
          { name: 'surface.subtle', color: '#f8f8f8' },
          { name: 'border.default', color: '#878787' },
          { name: 'interactive.primary', color: '#000f47' },
          { name: 'text.primary', color: '#000f47' },
        ]}
      >
        <Table<PolicyRow>
          columns={policyColumns}
          data={policyData}
          variant="striped"
          size="sm"
          hoverable
          sortable
          stickyHeader
          maxHeight="340px"
          selectable
          pagination={{ enabled: true, pageSize: 5, showItemsRange: true, showTotalItems: true }}
          caption="Marsh McLennan — Active Policy Portfolio"
        />
      </DemoCard>

      {/* Badge */}
      <DemoCard
        title="Badge"
        desc="5 semantic tones · dot / number / text variants · configurable position"
        tag="Badge · 6 stories"
        tokens={[
          { name: 'status.success.bg', color: '#def2d7' },
          { name: 'status.warning.bg', color: '#fff2da' },
          { name: 'status.danger.bg', color: '#ffe8e8' },
          { name: 'surface.accent', color: '#f7f8f8' },
        ]}
      >
        <div className={styles.badgeGrid}>
          {([
            { tone: 'default', label: 'Default', content: 4 },
            { tone: 'success', label: 'Success', content: 12 },
            { tone: 'warning', label: 'Warning', content: 3 },
            { tone: 'danger',  label: 'Danger',  content: 99 },
            { tone: 'info',    label: 'Info',    content: 7 },
          ] as const).map(b => (
            <div key={b.tone} className={styles.badgeItem}>
              <Badge content={b.content} tone={b.tone} variant="number">
                <div className={styles.badgeTarget}>
                  {b.tone === 'default' && <PolicyIcon style={{ color: '#595959' }} />}
                  {b.tone === 'success' && <VerifiedIcon style={{ color: '#64bc30' }} />}
                  {b.tone === 'warning' && <SecurityIcon style={{ color: '#ffb700' }} />}
                  {b.tone === 'danger'  && <GroupIcon    style={{ color: '#e53e3e' }} />}
                  {b.tone === 'info'    && <SearchIcon   style={{ color: '#0b4bff' }} />}
                </div>
              </Badge>
              <span className={styles.badgeLabel}>{b.label}</span>
            </div>
          ))}
        </div>

        {/* Dot variant row */}
        <div className={styles.rowLabel} style={{ marginTop: 24 }}>Dot variant</div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {(['success', 'warning', 'danger', 'info', 'default'] as const).map(t => (
            <Badge key={t} tone={t} variant="dot">
              <div style={{
                padding: '8px 16px', background: '#ffffff', border: '1px solid #e3e3e3',
                borderRadius: 8, fontSize: 13, color: '#595959', cursor: 'default'
              }}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </div>
            </Badge>
          ))}
        </div>
      </DemoCard>
    </div>
  );
}

// ── Panel: Forms ──────────────────────────────────────────────────────────
function FormsPanel() {
  const [textVal, setTextVal] = useState('');
  const [selectVal, setSelectVal] = useState('');
  const [searchVal, setSearchVal] = useState('');

  return (
    <div className={styles.panelGrid2}>

      {/* TextField */}
      <DemoCard
        title="TextField"
        desc="outlined · filled · standard variants · 4 validation tones · helper text"
        tag="TextField · 10 stories"
        tokens={[
          { name: 'border.default', color: '#878787' },
          { name: 'border.focus', color: '#0b4bff' },
          { name: 'status.danger.fg', color: '#e53e3e' },
          { name: 'status.success.fg', color: '#64bc30' },
          { name: 'text.tertiary', color: '#767676' },
        ]}
      >
        <div className={styles.formStack}>
          <DSTextField
            label="Policy Reference"
            placeholder="POL-2025-XXX"
            size="small"
            fullWidth
            value={textVal}
            onChange={e => setTextVal(e.target.value)}
            helperText="Enter the 3-digit policy suffix"
          />
          <DSTextField
            label="Client Name"
            size="small"
            fullWidth
            tone="success"
            value="Oceanus Shipping Ltd"
            helperText="✓ Client verified in CRM"
          />
          <DSTextField
            label="Premium Amount"
            size="small"
            fullWidth
            tone="error"
            value="$0"
            helperText="Premium must be greater than $0"
          />
          <DSTextField
            label="Insured Address"
            size="small"
            fullWidth
            tone="warning"
            helperText="Address may need verification"
            value="123 Port Road"
          />
          <DSTextField
            label="Notes (disabled)"
            size="small"
            fullWidth
            disabled
            value="Renewal pending underwriter sign-off"
          />
        </div>
      </DemoCard>

      {/* Select + Search */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <DemoCard
          title="Select"
          desc="outlined · filled · standard · error state · helper text · disabled options"
          tag="Select · 8 stories"
          tokens={[
            { name: 'border.default', color: '#878787' },
            { name: 'border.focus', color: '#0b4bff' },
            { name: 'text.primary', color: '#000f47' },
          ]}
        >
          <div className={styles.formStack}>
            <DSSelect
              label="Coverage Type"
              size="small"
              fullWidth
              value={selectVal}
              onChange={e => setSelectVal(e.target.value as string)}
              options={[
                { value: 'marine', label: 'Marine Cargo' },
                { value: 'aviation', label: 'Aviation Hull' },
                { value: 'property', label: 'Commercial Property' },
                { value: 'cyber', label: 'Cyber Risk' },
                { value: 'do', label: 'D&O Liability' },
                { value: 'energy', label: 'Energy Liability', disabled: true },
              ]}
              helperText="Select the primary coverage line"
            />
            <DSSelect
              label="Policy Status"
              size="small"
              fullWidth
              value="active"
              options={[
                { value: 'active', label: 'Active' },
                { value: 'pending', label: 'Pending' },
                { value: 'expired', label: 'Expired' },
                { value: 'bound', label: 'Bound' },
              ]}
              tone="success"
              helperText="✓ Policy is currently active"
            />
            <DSSelect
              label="Broker Assignment"
              size="small"
              fullWidth
              value=""
              options={[
                { value: '', label: 'Unassigned' },
                { value: 'ap', label: 'A. Pezzella' },
                { value: 'mc', label: 'M. Chen' },
                { value: 'sk', label: 'S. Kim' },
              ]}
              error
              helperText="A broker must be assigned before binding"
            />
          </div>
        </DemoCard>

        <DemoCard
          title="Search TextField"
          desc="Icon adornment · clear button · controlled value"
          tag="TextField variant"
          tokens={[
            { name: 'text.tertiary', color: '#767676' },
            { name: 'border.default', color: '#878787' },
          ]}
        >
          <DSTextField
            placeholder="Search policies, clients, coverages…"
            size="small"
            fullWidth
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            InputProps={{ startAdornment: <SearchIcon style={{ color: '#878787', marginRight: 4 }} /> }}
          />
        </DemoCard>
      </div>
    </div>
  );
}

// ── Panel: Navigation ─────────────────────────────────────────────────────
function NavigationPanel() {
  const stepperSteps = [
    { id: 's1', label: 'Submission',    description: 'Risk data captured & validated',      status: 'completed' as const },
    { id: 's2', label: 'Underwriting',  description: 'Premium calculation in progress',     status: 'active' as const },
    { id: 's3', label: 'Negotiation',   description: 'Awaiting carrier response',           status: 'pending' as const },
    { id: 's4', label: 'Binding',       description: 'Final terms agreed — ready to bind',  status: 'pending' as const },
    { id: 's5', label: 'Policy Issued', description: 'Documents generated & dispatched',    status: 'pending' as const },
  ];

  const tabItems = [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <Box sx={{ p: 1 }}>
          <Box sx={{ fontSize: 14, color: '#595959', lineHeight: 1.7 }}>
            <strong style={{ color: '#000f47', display: 'block', marginBottom: 8 }}>Policy Overview</strong>
            Marine Cargo policy for Oceanus Shipping Ltd covering 42 vessels operating in North Atlantic routes.
            Annual premium of <strong style={{ color: '#000f47' }}>$184,000</strong> with a combined single limit of $50M.
          </Box>
        </Box>
      ),
    },
    {
      id: 'coverage',
      title: 'Coverage Details',
      content: (
        <Box sx={{ p: 1 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {[['Coverage Type', 'Marine Cargo A'],['Limit', '$50,000,000'],['Deductible', '$25,000'],['Territory', 'Worldwide'],['Voyage', 'All'],['Carrier', 'Lloyd\'s Syndicate']].map(([k,v]) => (
              <Box key={k}>
                <Box sx={{ fontSize: 11, color: '#767676', letterSpacing: '0.06em', textTransform: 'uppercase', mb: 0.5 }}>{k}</Box>
                <Box sx={{ fontSize: 14, fontWeight: 600, color: '#000f47' }}>{v}</Box>
              </Box>
            ))}
          </Box>
        </Box>
      ),
    },
    {
      id: 'claims',
      title: 'Claims',
      content: (
        <Box sx={{ p: 1 }}>
          <Box sx={{ fontSize: 14, color: '#595959', mb: 2 }}>No open claims on this policy.</Box>
          <DSButton variant="outline" size="sm" startIcon={<AddIcon />}>File New Claim</DSButton>
        </Box>
      ),
    },
    {
      id: 'documents',
      title: 'Documents',
      disabled: false,
      content: (
        <Box sx={{ p: 1 }}>
          {['Policy Schedule 2025.pdf', 'Certificate of Insurance.pdf', 'Marine Institute Clauses.pdf'].map(f => (
            <Box key={f} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid rgba(0,15,71,0.06)' }}>
              <Box sx={{ fontSize: 13, color: '#000f47' }}>{f}</Box>
              <DSButton variant="ghost" size="sm" endIcon={<DownloadIcon />}>Download</DSButton>
            </Box>
          ))}
        </Box>
      ),
    },
  ];

  const accordionItems = [
    {
      id: 'a1',
      title: 'What tokens does this component use?',
      subtitle: 'Token consumption',
      content: (
        <Box sx={{ fontSize: 14, color: '#595959', lineHeight: 1.7 }}>
          The Accordion uses <strong>surface.subtle</strong> for the background,
          <strong> border.default</strong> for dividers, <strong>text.primary</strong> for headings,
          and <strong>interactive.primary</strong> for the expand indicator colour.
        </Box>
      ),
    },
    {
      id: 'a2',
      title: 'How is keyboard navigation handled?',
      subtitle: 'Accessibility',
      content: (
        <Box sx={{ fontSize: 14, color: '#595959', lineHeight: 1.7 }}>
          Each panel has a <code>role="button"</code> with <code>aria-expanded</code> and
          <code> aria-controls</code> attributes. Arrow keys traverse panels; Enter/Space toggles.
          Focus-visible outline uses the <strong>focus.ring</strong> token (3px, #0b4bff).
        </Box>
      ),
    },
    {
      id: 'a3',
      title: 'What variants are available?',
      subtitle: 'API reference',
      content: (
        <Box sx={{ fontSize: 14, color: '#595959', lineHeight: 1.7 }}>
          Three variants: <strong>default</strong> (outlined), <strong>compact</strong> (tighter padding),
          and <strong>elevated</strong> (shadow + card-style). Supports
          <strong> allowMultiple</strong> for independent panel state.
        </Box>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Tabs */}
      <DemoCard
        title="Tabs"
        desc="standard · scrollable · fullWidth variants · keyboard navigation · ARIA tabpanel"
        tag="Tabs · 6 stories"
        tokens={[
          { name: 'interactive.secondary', color: '#0b4bff' },
          { name: 'border.default', color: '#878787' },
          { name: 'text.primary', color: '#000f47' },
        ]}
      >
        <Tabs tabs={tabItems} defaultActiveId="overview" variant="standard" enableKeyboardNavigation />
      </DemoCard>

      <div className={styles.panelGrid2}>

        {/* Stepper */}
        <DemoCard
          title="Stepper"
          desc="vertical & horizontal · 4 status states · clickable steps · content panels"
          tag="Stepper · 9 stories"
          tokens={[
            { name: 'status.success.fg', color: '#64bc30' },
            { name: 'interactive.primary', color: '#000f47' },
            { name: 'text.secondary', color: '#595959' },
          ]}
        >
          <div className={styles.stepperWrap}>
            <Stepper
              steps={stepperSteps}
              activeStep={1}
              orientation="vertical"
            />
          </div>
        </DemoCard>

        {/* Accordion */}
        <DemoCard
          title="Accordion"
          desc="default · compact · elevated variants · single & multi-expand · icons"
          tag="Accordion · 7 stories"
          tokens={[
            { name: 'surface.subtle', color: '#f8f8f8' },
            { name: 'border.default', color: '#878787' },
            { name: 'interactive.primary', color: '#000f47' },
          ]}
        >
          <div className={styles.accordionWrap}>
            <Accordion
              items={accordionItems}
              defaultExpanded={['a1']}
              allowMultiple
              variant="default"
            />
          </div>
        </DemoCard>

      </div>
    </div>
  );
}

// ── Panel: Feedback ───────────────────────────────────────────────────────
function FeedbackPanel() {
  return (
    <div className={styles.panelGridFull}>
      <DemoCard
        title="Alert"
        desc="4 severity levels · optional title · closable · outlined variant · ARIA live regions"
        tag="Alert · 8 stories"
        tokens={[
          { name: 'status.success.bg', color: '#def2d7' },
          { name: 'status.success.fg', color: '#1a5c0f' },
          { name: 'status.warning.bg', color: '#fff2da' },
          { name: 'status.danger.bg', color: '#ffe8e8' },
          { name: 'surface.subtle', color: '#f8f8f8' },
        ]}
      >
        <div className={styles.alertStack}>
          <Alert severity="success" title="Policy bound successfully">
            Policy <strong>POL-2025-002</strong> for SkyBridge Aviation has been bound. Certificate of Insurance generated.
          </Alert>
          <Alert severity="info" title="Market update available">
            Lloyd's Market Association has published updated Institute Cargo Clauses (A) effective 1 March 2026.
          </Alert>
          <Alert severity="warning" title="Certificate expiring soon">
            <strong>3 policies</strong> have certificates expiring within 14 days. Review and renew before the deadline.
          </Alert>
          <Alert severity="error" title="Submission validation failed">
            Required fields are missing: Vessel IMO number, cargo value, and port of loading. Please complete before resubmitting.
          </Alert>
        </div>

        <div style={{ marginTop: 24 }}>
          <div className={styles.rowLabel}>Outlined variant</div>
          <div className={styles.alertStack}>
            <Alert severity="success" outlined title="Payment received">Premium payment of $184,000 confirmed.</Alert>
            <Alert severity="warning" outlined title="Compliance check">Annual sanctions screening due in 7 days.</Alert>
          </div>
        </div>
      </DemoCard>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
const PortfolioComponentGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('actions');

  const renderPanel = () => {
    switch (activeCategory) {
      case 'actions':  return <ActionsPanel />;
      case 'data':     return <DataPanel />;
      case 'forms':    return <FormsPanel />;
      case 'nav':      return <NavigationPanel />;
      case 'feedback': return <FeedbackPanel />;
      default:         return null;
    }
  };

  return (
    <section className={styles.gallerySection} id="component-gallery">
      <div className={styles.galleryInner}>

        {/* Header */}
        <div className={styles.sectionEyebrow}>Live Component Gallery</div>
        <h2 className={styles.sectionTitle}>Real components. Real tokens. Real quality.</h2>
        <p className={styles.sectionDesc}>
          Every component below is the actual production MDS code — rendered live in this portfolio.
          Each one is token-driven, WCAG 2.1 AA compliant, and documented with{' '}
          <strong style={{ color: '#000f47' }}>43 components</strong> across{' '}
          <strong style={{ color: '#000f47' }}>200+ Storybook stories</strong>.
        </p>

        {/* Stats bar */}
        <div style={{
          display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 48,
          padding: '24px 32px', background: '#f7f8f8', borderRadius: 16,
          border: '1px solid rgba(0,15,71,0.06)',
        }}>
          {[
            { num: '43', label: 'Components', color: '#000f47' },
            { num: '200+', label: 'Storybook stories', color: '#0b4bff' },
            { num: '120+', label: 'Design tokens consumed', color: '#042791' },
            { num: '100%', label: 'TypeScript coverage', color: '#000f47' },
            { num: 'WCAG AA', label: 'All components tested', color: '#1a5c0f' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: '#767676', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Category tabs */}
        <div className={styles.tabNav} role="tablist" aria-label="Component categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              aria-controls={`panel-${cat.id}`}
              className={activeCategory === cat.id ? styles.tabBtnActive : styles.tabBtn}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              {cat.label}
              <span className={styles.tabCount}>{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Active panel */}
        <div
          id={`panel-${activeCategory}`}
          role="tabpanel"
          aria-labelledby={activeCategory}
        >
          {renderPanel()}
        </div>

      </div>
    </section>
  );
};

export default PortfolioComponentGallery;
