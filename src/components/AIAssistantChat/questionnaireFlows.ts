export type FlowAnswers = Record<string, string | string[]>;

export interface FlowChoice {
  value: string;
  label: string;
}

export interface FlowItem {
  name: string;
  title: string;
  description?: string;
  required?: boolean;
  /** Renders choices as checkboxes instead of radios. */
  multiple?: boolean;
  choices?: FlowChoice[];
  /** Renders a QuestionnaireInput alongside/instead of choices. */
  freeform?: { placeholder: string };
  /** Evaluated against the live answers on every change — when true, this
   * item is passed `disabled` to the primitive, which excludes it from the
   * navigation sequence entirely (confirmed: the primitive's own step count
   * shrinks, not just renders the step non-interactive). */
  disabledWhen?: (answers: FlowAnswers) => boolean;
}

export interface Flow {
  defaultItem: string;
  items: FlowItem[];
  synthesize: (answers: FlowAnswers) => string | null;
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

// ── Dashboard (customer) flow ─────────────────────────────────────────────

const PRODUCT_LABEL: Record<string, string> = {
  property: 'Property',
  cyber: 'Cyber',
  liability: 'General Liability',
  policy: 'my policy portfolio',
  all: 'all my products',
};

const INSIGHT_QUESTION: Record<string, (product: string, timeframe?: string) => string> = {
  'risk-exposure': (p, t) => `What are my top risk exposures for ${p}${t ? ` ${t}` : ''}?`,
  'renewal-readiness': (p, t) => `How ready am I for renewal on ${p}${t ? ` ${t}` : ''}?`,
  'claims-activity': (p, t) => `What's my recent claims activity for ${p}${t ? ` ${t}` : ''}?`,
  'coverage-gaps': (p, t) => `What coverage gaps exist in ${p}${t ? ` ${t}` : ''}?`,
};

const TIMEFRAME_LABEL: Record<string, string> = {
  current: 'right now',
  'this-quarter': 'this quarter',
  'upcoming-renewal': 'for my upcoming renewal',
};

export const DASHBOARD_FLOW: Flow = {
  defaultItem: 'product',
  items: [
    {
      name: 'product',
      title: 'Which product or policy?',
      required: true,
      choices: [
        { value: 'property', label: 'Property' },
        { value: 'cyber', label: 'Cyber' },
        { value: 'liability', label: 'General liability' },
        { value: 'policy', label: 'My policy portfolio' },
        { value: 'all', label: 'All my products' },
      ],
    },
    {
      name: 'insightType',
      title: 'What kind of insight?',
      required: true,
      choices: [
        { value: 'risk-exposure', label: 'Risk exposure' },
        { value: 'renewal-readiness', label: 'Renewal readiness' },
        { value: 'claims-activity', label: 'Claims activity' },
        { value: 'coverage-gaps', label: 'Coverage gaps' },
      ],
    },
    {
      name: 'timeframe',
      title: 'Any specific timeframe?',
      description: 'Optional — skip if not relevant.',
      choices: [
        { value: 'current', label: 'Right now' },
        { value: 'this-quarter', label: 'This quarter' },
        { value: 'upcoming-renewal', label: 'Upcoming renewal' },
      ],
    },
  ],
  synthesize: (answers) => {
    const product = first(answers.product);
    const insightType = first(answers.insightType);
    const timeframe = first(answers.timeframe);
    if (!product || !insightType) return null;
    const build = INSIGHT_QUESTION[insightType];
    if (!build) return null;
    return build(PRODUCT_LABEL[product] ?? product, timeframe ? TIMEFRAME_LABEL[timeframe] : undefined);
  },
};

// ── Marketing-site (prospect) flow ────────────────────────────────────────

const COMPANY_SIZE_LABEL: Record<string, string> = {
  small: 'under 200 employees',
  mid: '200 to 2,000 employees',
  large: 'over 2,000 employees',
};

const COVERAGE_AREA_LABEL: Record<string, string> = {
  property: 'property',
  cyber: 'cyber',
  liability: 'general liability',
  other: 'other coverage',
};

const TIMELINE_LABEL: Record<string, string> = {
  now: "we're looking to move right away",
  soon: "we're planning over the next few months",
  researching: "we're just researching for now",
};

export const MARKETING_FLOW: Flow = {
  defaultItem: 'companySize',
  items: [
    {
      name: 'companySize',
      title: 'How big is your company?',
      required: true,
      choices: [
        { value: 'small', label: 'Under 200 employees' },
        { value: 'mid', label: '200–2,000 employees' },
        { value: 'large', label: '2,000+ employees' },
      ],
    },
    {
      name: 'coverageArea',
      title: 'What coverage are you exploring?',
      required: true,
      choices: [
        { value: 'property', label: 'Property' },
        { value: 'cyber', label: 'Cyber' },
        { value: 'liability', label: 'General liability' },
        { value: 'other', label: 'Something else' },
      ],
    },
    {
      name: 'timeline',
      title: "What's your timeline?",
      description: "Optional — skip if you're not sure yet.",
      choices: [
        { value: 'now', label: 'Right away' },
        { value: 'soon', label: 'Next few months' },
        { value: 'researching', label: 'Just researching' },
      ],
    },
  ],
  synthesize: (answers) => {
    const companySize = first(answers.companySize);
    const coverageArea = first(answers.coverageArea);
    const timeline = first(answers.timeline);
    if (!companySize || !coverageArea) return null;
    const sizeLabel = COMPANY_SIZE_LABEL[companySize] ?? companySize;
    const areaLabel = COVERAGE_AREA_LABEL[coverageArea] ?? coverageArea;
    const timelineLabel = timeline ? TIMELINE_LABEL[timeline] : undefined;
    return `We're a company with ${sizeLabel} looking into ${areaLabel} coverage${timelineLabel ? ` — ${timelineLabel}` : ''}. What should we know?`;
  },
};

// ── Claims intake flow ────────────────────────────────────────────────────
// New this pass — proves the flow-driven architecture actually supports
// conditional branching + freeform text, not just linear single-select.
// `propertyDetail`/`cyberDetail`/`liabilityDetail` are all declared as items
// up front; only the one matching `incidentType` is ever reachable, the
// other two are excluded from the step sequence entirely (verified via the
// primitive's own step count shrinking, not just rendered inert).

const INCIDENT_TYPE_LABEL: Record<string, string> = {
  property: 'property damage',
  cyber: 'a cyber incident',
  liability: 'a liability or injury issue',
  other: 'an incident',
};

const PROPERTY_DETAIL_LABEL: Record<string, string> = {
  fire: 'fire damage',
  flood: 'flood or water damage',
  theft: 'theft',
  storm: 'storm damage',
};

const CYBER_DETAIL_LABEL: Record<string, string> = {
  breach: 'a data breach',
  ransomware: 'a ransomware attack',
  bec: 'a business email compromise',
};

const LIABILITY_DETAIL_LABEL: Record<string, string> = {
  customer: 'a customer',
  employee: 'an employee',
  thirdparty: 'a third party',
};

const WHEN_LABEL: Record<string, string> = {
  today: 'today',
  week: 'this week',
  earlier: 'more than a week ago',
};

export const CLAIMS_FLOW: Flow = {
  defaultItem: 'incidentType',
  items: [
    {
      name: 'incidentType',
      title: 'What kind of incident is this?',
      required: true,
      choices: [
        { value: 'property', label: 'Property damage' },
        { value: 'cyber', label: 'Cyber incident' },
        { value: 'liability', label: 'Liability or injury' },
        { value: 'other', label: 'Something else' },
      ],
    },
    {
      name: 'propertyDetail',
      title: 'What kind of property damage?',
      choices: [
        { value: 'fire', label: 'Fire' },
        { value: 'flood', label: 'Flood or water' },
        { value: 'theft', label: 'Theft' },
        { value: 'storm', label: 'Storm' },
      ],
      disabledWhen: (a) => first(a.incidentType) !== 'property',
    },
    {
      name: 'cyberDetail',
      title: 'What kind of cyber incident?',
      choices: [
        { value: 'breach', label: 'Data breach' },
        { value: 'ransomware', label: 'Ransomware' },
        { value: 'bec', label: 'Business email compromise' },
      ],
      disabledWhen: (a) => first(a.incidentType) !== 'cyber',
    },
    {
      name: 'liabilityDetail',
      title: 'Who was involved?',
      choices: [
        { value: 'customer', label: 'A customer' },
        { value: 'employee', label: 'An employee' },
        { value: 'thirdparty', label: 'A third party' },
      ],
      disabledWhen: (a) => first(a.incidentType) !== 'liability',
    },
    {
      name: 'whenHappened',
      title: 'When did this happen?',
      required: true,
      choices: [
        { value: 'today', label: 'Today' },
        { value: 'week', label: 'This week' },
        { value: 'earlier', label: 'More than a week ago' },
      ],
    },
    {
      name: 'description',
      title: 'Anything else we should know?',
      description: 'Optional — a few details help us route this faster.',
      freeform: { placeholder: 'What happened…' },
    },
  ],
  synthesize: (answers) => {
    const incidentType = first(answers.incidentType);
    const when = first(answers.whenHappened);
    if (!incidentType || !when) return null;

    const detail =
      incidentType === 'property'
        ? PROPERTY_DETAIL_LABEL[first(answers.propertyDetail) ?? '']
        : incidentType === 'cyber'
          ? CYBER_DETAIL_LABEL[first(answers.cyberDetail) ?? '']
          : incidentType === 'liability'
            ? LIABILITY_DETAIL_LABEL[first(answers.liabilityDetail) ?? '']
            : undefined;

    const typeLabel = INCIDENT_TYPE_LABEL[incidentType] ?? 'an incident';
    const description = first(answers.description);

    let message = `I need to report a claim: ${detail ?? typeLabel}, which happened ${WHEN_LABEL[when] ?? when}.`;
    if (description?.trim()) {
      message += ` Additional details: ${description.trim()}`;
    }
    return message;
  },
};
