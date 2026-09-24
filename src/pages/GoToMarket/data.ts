export const opportunities = [
  {
    id: "discovery",
    title: "Guided needs discovery",
    stage: "Understand",
    outcome:
      "Help a prospect describe their business need without knowing Marsh’s structure.",
    test: "Observe 8 target prospects completing a need-finding task. Proposed gate: 6 of 8 reach a relevant next step without assistance.",
    signal: "Task success; time to relevant next step",
    owner: "Product + research",
    dependency: "One agreed segment, market and service taxonomy",
    selected: true,
  },
  {
    id: "insights",
    title: "Relevant, sourced insights",
    stage: "Explore",
    outcome:
      "Explain why a service or insight fits the prospect’s stated need.",
    test: "Test relevance and comprehension with the same cohort. Proposed gate: 6 of 8 can explain why the recommendation applies.",
    signal: "Recommendation comprehension; source engagement",
    owner: "Content + subject specialists",
    dependency: "Approved content, provenance and review dates",
    selected: true,
  },
  {
    id: "handoff",
    title: "Context-preserving expert handoff",
    stage: "Connect",
    outcome:
      "Carry the prospect’s need into an accountable conversation with the right specialist.",
    test: "Rehearse 10 routed requests. Proposed gate: all reach the assigned team and at least 9 are acknowledged within the agreed service level.",
    signal: "Accepted handoffs; time to first response",
    owner: "Sales operations",
    dependency: "Routing owner, consent and response commitment",
    selected: true,
  },
  {
    id: "measurement",
    title: "Journey measurement & feedback",
    stage: "Learn",
    outcome:
      "Show where people struggle and whether the handoff becomes a useful conversation.",
    test: "Reconcile a scripted set of journeys with event records. Proposed gate: every expected event is present once, with no unnecessary personal data.",
    signal: "Journey completion; event completeness",
    owner: "Analytics + engineering",
    dependency: "Event contract, privacy review and CRM outcome link",
    selected: true,
  },
  {
    id: "assistant",
    title: "Grounded AI discovery assistant",
    stage: "Experiment",
    outcome:
      "Let prospects explore approved content in their own words, with visible sources and expert escalation.",
    test: "Compare against guided discovery on the same tasks; test unsupported questions. Ship only if usefulness improves and specialist review accepts the fallback behavior.",
    signal: "Task success versus guided flow; unsupported-answer rate",
    owner: "AI + subject specialists",
    dependency: "Approved retrieval corpus, evaluation set and fallback",
    selected: false,
  },
  {
    id: "workspace",
    title: "Persistent client workspace",
    stage: "Later",
    outcome:
      "Let returning clients save context and manage actions across visits.",
    test: "Validate repeat-use demand before adding identity and account integration.",
    signal: "Repeat-task frequency; demand for saved context",
    owner: "Client experience",
    dependency: "Identity, entitlements and system integration",
    selected: false,
  },
  {
    id: "simulation",
    title: "Interactive risk scenarios",
    stage: "Later",
    outcome:
      "Support deeper comparison when approved risk models and client inputs are available.",
    test: "Map existing Marsh capabilities and integration options before proposing a new simulator.",
    signal: "Decision usefulness; existing capability fit",
    owner: "Risk analytics",
    dependency: "Approved models, licensed data and specialist validation",
    selected: false,
  },
];

export const gates = [
  {
    id: "audience",
    title: "Pilot audience agreed",
    owner: "GTM lead",
    evidence:
      "Named market, business segment, buyer role and recruitment list.",
  },
  {
    id: "value",
    title: "Client value demonstrated",
    owner: "Research lead",
    evidence:
      "Observed task results and decision on the proposed success thresholds.",
  },
  {
    id: "content",
    title: "Content and trust reviewed",
    owner: "Content + legal",
    evidence: "Approved sources, review dates, consent and privacy decisions.",
  },
  {
    id: "routing",
    title: "Expert handoff operational",
    owner: "Sales operations",
    evidence:
      "Routing rehearsal, named receiving team and agreed response service level.",
  },
  {
    id: "quality",
    title: "Experience tested",
    owner: "Engineering + design",
    evidence:
      "Keyboard, mobile, accessibility, error recovery and performance checks.",
  },
  {
    id: "measurement",
    title: "Measurement and support ready",
    owner: "Analytics + operations",
    evidence:
      "Reconciled events, outcome attribution, support owner and rollback plan.",
  },
];

export const experiments = [
  {
    title: "Find the right starting point",
    question:
      "Can a prospect find help without understanding our organization?",
    method: "Moderated task test · 8 target prospects",
    decision: "Choose guided discovery, navigation, or a revised taxonomy.",
    owner: "Research lead",
  },
  {
    title: "Prove the handoff",
    question:
      "Does a specialist receive enough context to start a useful conversation?",
    method: "Service rehearsal · 10 routed requests",
    decision: "Confirm routing, minimum context and response commitment.",
    owner: "Sales operations",
  },
  {
    title: "Earn the AI experience",
    question: "Does conversational discovery outperform the guided journey?",
    method: "Comparative tasks + reviewed answer evaluation",
    decision: "Include grounded AI only when it improves the journey.",
    owner: "AI product lead",
  },
];
