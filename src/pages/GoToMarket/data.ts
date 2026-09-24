// Source: user-supplied marsh-one-roadmap-v6.docx, July 2026, Parts 6–14.
// Targets are roadmap proposals; delivery status and measured baselines are unverified.
export const roadmapSource =
  "Marsh One Strategic Product Roadmap · v6 · July 2026";
export const opportunities = [
  {
    id: "foundation",
    title: "One Marsh foundation",
    stage: "R1 · 2026",
    outcome:
      "Make the unified proposition clear, with a relevant next step and regional and language scaling designed in.",
    test: "Roadmap target: after 90 seconds, users can explain One Marsh and identify a relevant path. Agree the comprehension pass rate before testing.",
    signal: "Comprehension; entry-to-path progression",
    owner: "Product + design · proposed",
    dependency:
      "Brand proposition, localized navigation and mobile entry strategy",
    selected: true,
  },
  {
    id: "discovery",
    title: "Intent-first navigation and taxonomy",
    stage: "R2 · 2026",
    outcome:
      "Help clients find a relevant solution without knowing which business owns it.",
    test: "Roadmap target: reach a relevant Solution Detail in two interactions or fewer from Solutions landing. Validate with tree testing and session analysis.",
    signal: "Tree-test success; search no-result exits",
    owner: "Content Strategy Lead + taxonomy",
    dependency:
      "Client language, cross-business categories and content inventory",
    selected: true,
  },
  {
    id: "insights",
    title: "Connected insights, proof and solutions",
    stage: "R2–R3 · 2026",
    outcome:
      "Connect an Insight to a relevant solution, credible proof and contextual action.",
    test: "Test the full Insight → Solution → Contact journey. Evaluate comprehension, confidence and progression; establish baselines before setting uplift targets.",
    signal: "Insight → Solution CTR; Solution → Contact conversion",
    owner: "Content + subject specialists · proposed",
    dependency:
      "Content production owner, tagging workflow, cases and expert profiles",
    selected: true,
  },
  {
    id: "discoverability",
    title: "Search and AI discoverability",
    stage: "R2 · 2026",
    outcome:
      "Structure the five priority B2B risk topics for discoverability across search and AI answers.",
    test: "Roadmap proposal: baseline ten common advisory queries; track citations quarterly. Structured content is an intervention to test, not a guarantee of citation.",
    signal: "Citation presence for a defined query set",
    owner: "Content Strategy Lead + SEO + taxonomy",
    dependency:
      "Priority topics, entity relationships, schema and editorial authority",
    selected: true,
  },
  {
    id: "handoff",
    title: "Qualified contact and useful continuation",
    stage: "R3 · late 2026",
    outcome:
      "Give every inquiry a receiving human owner, useful context and a clear next step after submission.",
    test: "Map intake through meaningful response with specialists. Rehearse qualification, contextual confirmation and low-confidence routing to a named generalist. Agree the response SLA.",
    signal: "Solution → Contact conversion; time to meaningful response",
    owner: "Sales operations + relationship teams · proposed",
    dependency:
      "Qualification logic, consent, specialist workflow and human fallback",
    selected: true,
  },
  {
    id: "existing-client",
    title: "Minimum Existing Client Bridge",
    stage: "EC · 2026, parallel",
    outcome:
      "Give existing clients a contextual path from Solution Detail, Insight and Contact, including relationship-aware routing and confirmation.",
    test: "Test existing-client tasks on all three entry surfaces. Check that clients can identify themselves and reach an appropriate next step without being treated as a cold lead.",
    signal: "Existing-client pathway use; re-identification friction",
    owner: "Existing Client Bridge owner · unassigned",
    dependency:
      "Relationship team input, supported destinations and routing rules",
    selected: true,
  },
  {
    id: "measurement",
    title: "Journey measurement and review",
    stage: "R1–R3 + EC · 2026",
    outcome:
      "Make journey evidence available for quarterly scope and sequencing decisions.",
    test: "Reconcile journey events and segment prospect versus existing-client outcomes. Confirm the Product Lead, review cadence and decision triggers.",
    signal: "Journey progression by audience; evidence-led decisions",
    owner: "Product Lead + analytics",
    dependency:
      "Event contract, privacy decisions, baseline and named review owner",
    selected: true,
  },
];

export const gates = [
  {
    id: "audience",
    title: "Both pilot audiences defined",
    owner: "GTM lead",
    evidence:
      "Market, segment, buyer and recruitment plan for prospects and existing clients.",
  },
  {
    id: "value",
    title: "Foundation and findability validated",
    owner: "Research lead",
    evidence:
      "R1 comprehension results and R2 two-interaction task results; pass rates agreed.",
  },
  {
    id: "content",
    title: "Content operation and trust ready",
    owner: "Content Strategy Lead",
    evidence:
      "Editorial owner, approved proof, tagging workflow, update cadence and discoverability baseline.",
  },
  {
    id: "routing",
    title: "Contact and specialist workflow rehearsed",
    owner: "Sales operations",
    evidence:
      "Named recipient, agreed response SLA, contextual confirmation, consent and human fallback.",
  },
  {
    id: "existing-client",
    title: "Minimum client bridge verified",
    owner: "EC owner · unassigned",
    evidence:
      "Working existing-client pathways on Solution Detail, Insight and Contact; relationship-aware routing.",
  },
  {
    id: "quality",
    title: "Mobile and localization validated",
    owner: "Engineering + design",
    evidence:
      "Mobile Enter and Engage tasks, keyboard access, accessibility and regional/language scaling.",
  },
  {
    id: "measurement",
    title: "Measurement and quarterly review owned",
    owner: "Product Lead",
    evidence:
      "Named lead, cohort baselines, review date, decision triggers, support and rollback plan.",
  },
];

export const experiments = [
  {
    title: "Understand One Marsh",
    question:
      "Can prospects and existing clients explain the proposition and choose a relevant path after 90 seconds?",
    method: "R1 · comprehension testing, segmented by relationship",
    decision:
      "Revise the proposition, transition messaging or entry navigation.",
    owner: "Research + design · proposed",
  },
  {
    title: "Find a solution in two interactions",
    question:
      "Can clients reach the right Solution Detail from Solutions landing without knowing our structure?",
    method: "R2 · tree testing + session analysis",
    decision: "Choose intent categories and connect Insights to solutions.",
    owner: "Content Strategy Lead + research",
  },
  {
    title: "Continue the existing relationship",
    question:
      "Can an existing client take a relevant next step from Insight, Solution Detail and Contact?",
    method: "EC · client tasks + relationship-team interviews",
    decision: "Define the minimum bridge and name an accountable owner.",
    owner: "EC owner · unassigned",
  },
  {
    title: "Prove the human handoff",
    question:
      "What context does a specialist need, and where is it lost in the current intake process?",
    method: "R3 · service mapping and routing rehearsal",
    decision:
      "Agree qualification, response expectations and a human fallback.",
    owner: "Sales operations · proposed",
  },
  {
    title: "Baseline AI discoverability",
    question:
      "Does Marsh appear for the ten common advisory queries selected for the pilot?",
    method:
      "R2 · defined query set, recorded answer sources and quarterly review",
    decision: "Test content architecture changes on five priority topics.",
    owner: "Content Strategy Lead + SEO",
  },
  {
    title: "Earn the guidance layer",
    question:
      "Does guided discovery or contextual AI framing improve progression without reducing trust?",
    method: "R4 discovery · comparative tasks; gated delivery in 2027",
    decision:
      "Resolve the interaction target and assess foundations before opening R4.",
    owner: "Product + research · proposed",
  },
];

export const journey = [
  {
    stage: "Enter",
    outcome: "Arrive through search, campaign, AI search or direct access.",
    signal: "R1 / R2 · discoverability",
  },
  {
    stage: "Orient",
    outcome: "Understand One Marsh and recognize a relevant starting point.",
    signal: "R1 · comprehension",
  },
  {
    stage: "Explore",
    outcome: "Browse solutions, industries and insights using client language.",
    signal: "R2 · progression",
  },
  {
    stage: "Narrow",
    outcome:
      "Identify a relevant solution without knowing the business structure.",
    signal: "R2 · task success",
  },
  {
    stage: "Understand",
    outcome: "See what the solution is, who it serves and what it delivers.",
    signal: "R3 · clarity",
  },
  {
    stage: "Trust",
    outcome: "Evaluate relevant proof, cases and specialist expertise.",
    signal: "R3 · confidence",
  },
  {
    stage: "Engage",
    outcome: "Contact a specialist or take an existing-client pathway.",
    signal: "R3 / EC · qualified action",
  },
  {
    stage: "Continue",
    outcome: "Receive a useful next step; deepen continuity in 2027.",
    signal: "EC / R5 · continuity",
  },
];

export const horizons = [
  {
    title: "H1 · Unify",
    timing: "2026",
    type: "Outcome roadmap",
    description:
      "R1–R3 + minimum EC bridge. Proposed MVP boundary; revisit outcomes quarterly.",
  },
  {
    title: "H2 · Guide",
    timing: "2027",
    type: "Outcome roadmap",
    description:
      "R4–R5 + full EC bridge. Delivery depends on evidence from the foundation.",
  },
  {
    title: "H3 · Anticipate",
    timing: "2028–2030",
    type: "Strategic direction",
    description:
      "Proactive, relationship-aware relevance. No feature commitments in this dashboard.",
  },
  {
    title: "H4 · Orchestrate",
    timing: "2029–2031",
    type: "Vision",
    description:
      "Integrated advice with continuity across domains. Horizon dates need reconciliation.",
  },
];

export const releases = [
  {
    id: "R1",
    title: "One Marsh Foundation",
    timing: "2026",
    journey: "Enter → Orient",
    outcome:
      "Users explain One Marsh and identify a relevant next step after 90 seconds.",
    gate: "Validate comprehension, mobile entry and localization architecture.",
    source: "Part 7",
  },
  {
    id: "R2",
    title: "Intent-First Information Architecture",
    timing: "2026",
    journey: "Orient → Explore → Narrow",
    outcome:
      "Relevant Solution Detail in two interactions or fewer from Solutions landing.",
    gate: "Client taxonomy, connected content and search/AI discoverability baseline.",
    source: "Part 7",
  },
  {
    id: "R3",
    title: "Trust, Proof, and Conversion",
    timing: "Late 2026",
    journey: "Understand → Trust → Engage",
    outcome:
      "Solution pages create confident action with a qualified, contextual handoff.",
    gate: "Proof, contextual CTAs, intake ownership, response SLA and fallback.",
    source: "Part 7",
  },
  {
    id: "EC",
    title: "Existing Client Bridge",
    timing: "2026 minimum → 2027 full",
    journey: "Engage → Continue",
    outcome:
      "Clients find pathways that acknowledge their relationship across public entry points.",
    gate: "Runs alongside R1–R3. Assign a named owner; test existing-client routing.",
    source: "Part 8",
  },
  {
    id: "R4",
    title: "Guided Discovery and Personalization",
    timing: "Early to mid-2027",
    journey: "Explore → Narrow → Understand",
    outcome:
      "Unsure users identify a relevant path; interaction threshold needs clarification.",
    gate: "Do not begin delivery until R1–R3 taxonomy, metadata and measurement generate signal.",
    source: "Parts 7 and 9",
  },
  {
    id: "R5",
    title: "Cross-Journey Orchestration",
    timing: "Mid to late 2027",
    journey: "Understand → Engage → Continue",
    outcome:
      "Returning users receive a coherent next step reflecting earlier exploration.",
    gate: "Consent, continuity expectations and public-to-authenticated handoff validated.",
    source: "Parts 7–9",
  },
];

export const decisions = [
  {
    title: "Name the pilot and accountable owners",
    detail:
      "Choose market and segment for both audiences. Assign EC ownership and confirm the Product Lead before the first quarterly review.",
    source: "Parts 8, 12–14",
    kind: "Open decision",
  },
  {
    title: "Reconcile horizon dates",
    detail:
      "Part 5 uses H3 2028–2030 and H4 2029–2031; other passages use 2028–2029, a 2032 story and a 2035 vision. Keep stories as vision and agree one planning calendar.",
    source: "Context; Parts 2, 5, 10 and 16",
    kind: "Source inconsistency",
  },
  {
    title: "Resolve the R4 interaction target",
    detail:
      "“Under three interactions” differs from testing three questions. Define an interaction, starting point and success threshold before estimation.",
    source: "Parts 7 and 9",
    kind: "Source inconsistency",
  },
  {
    title: "Close the content and channel gaps",
    detail:
      "R2 already names AI discoverability, while Part 14 still calls it missing. Update the gap and assign the content production, tagging and maintenance model.",
    source: "Parts 7 and 14",
    kind: "Open decision",
  },
  {
    title: "Set the mobile entry and engagement strategy",
    detail:
      "Choose priority mobile tasks and a device research plan before finalizing the R1 experience; support localization from the foundation.",
    source: "Parts 7 and 14",
    kind: "Open decision",
  },
  {
    title: "Make review decisions evidence-led",
    detail:
      "Recommendation: record continue, change or stop with rationale. A review that retains scope can be valid; mandatory change is not evidence of learning.",
    source: "Part 13 · dashboard recommendation",
    kind: "Recommendation",
  },
];

export const principles = [
  "Organize around client intent, not business structure.",
  "Connect every interaction to a relevant next step.",
  "Amplify human expertise.",
  "Serve existing client relationships as a first-class audience.",
  "Measure journey outcomes, not page output.",
];
