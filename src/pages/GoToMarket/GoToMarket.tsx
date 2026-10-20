import { useEffect, useState, type CSSProperties } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  Compass,
  FlaskConical,
  Layers3,
  MoveUpRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert } from "@/components/ui/alert";
import { getRoleColor } from "@/theme/roles";
import {
  opportunities,
  gates,
  experiments,
  journey,
  releases,
  decisions,
  roadmapSource,
} from "./data";
import { Roadmap } from "./Roadmap";
import "./go-to-market.css";

// Keep the initial exploratory plan intact; roadmap v6 has a separate scope and checklist.
const storageKey = "marsh-one-gtm-roadmap-v6";
type Plan = { scope: string[]; gates: string[] };
const initialPlan = (): Plan => ({
  scope: opportunities.filter((item) => item.selected).map((item) => item.id),
  gates: [],
});
function readPlan(): Plan {
  try {
    const saved: unknown = JSON.parse(
      localStorage.getItem(storageKey) || "null"
    );
    if (
      saved &&
      typeof saved === "object" &&
      "scope" in saved &&
      "gates" in saved &&
      Array.isArray(saved.scope) &&
      Array.isArray(saved.gates)
    ) {
      return {
        scope: saved.scope.filter(
          (id): id is string =>
            typeof id === "string" &&
            opportunities.some((item) => item.id === id)
        ),
        gates: saved.gates.filter(
          (id): id is string =>
            typeof id === "string" && gates.some((item) => item.id === id)
        ),
      };
    }
  } catch {
    /* A fresh plan remains usable when browser storage is unavailable. */
  }
  return initialPlan();
}

export default function GoToMarket() {
  const [plan, setPlan] = useState<Plan>(readPlan);
  const [activeTab, setActiveTab] = useState("overview");
  const [storageError, setStorageError] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(plan));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [plan]);
  const toggle = (field: keyof Plan, id: string) =>
    setPlan((current) => ({
      ...current,
      [field]: current[field].includes(id)
        ? current[field].filter((value) => value !== id)
        : [...current[field], id],
    }));
  const exportBrief = () => {
    const text = [
      "# Marsh One — MVP decision brief",
      `Exported: ${new Date().toISOString().slice(0, 10)}`,
      "",
      "Working proposal derived from " +
        roadmapSource +
        ". Approval and delivery status are unverified. No client research or live commercial data connected.",
      "Recommended 2026 MVP: R1–R3 with the minimum Existing Client Bridge in parallel. Market and segment remain open for both audiences.",
      "2027: R4–R5 and full EC, gated by foundation evidence. H3/H4 remain strategic direction and vision, not delivery scope.",
      "",
      "## Source release map",
      ...releases.map(
        (release) =>
          `- ${release.id} — ${release.title} (${release.timing}): ${release.outcome} Condition: ${release.gate} Source: ${release.source}.`
      ),
      "",
      "## Selected scope",
      ...opportunities
        .filter((item) => plan.scope.includes(item.id))
        .map(
          (item) =>
            `- ${item.title}: ${item.outcome}\n  Owner role: ${item.owner}. Dependency: ${item.dependency}.\n  Validation: ${item.test}`
        ),
      "",
      "## Launch checklist (self-reported; not release approval)",
      ...gates.map(
        (gate) =>
          `- [${plan.gates.includes(gate.id) ? "x" : " "}] ${gate.title} — ${
            gate.owner
          }. Evidence required: ${gate.evidence}`
      ),
      "",
      "## Open decisions",
      ...decisions.map(
        (decision) =>
          `- [${decision.kind}] ${decision.title}: ${decision.detail} Source: ${decision.source}.`
      ),
      "- Agree success thresholds and response service level; attach evidence before launch approval.",
      "",
      "## Proposed success measure",
      "Prospects: comprehension, findability and Insight → Solution → Contact progression, with qualified contacts as a commercial signal. Existing clients: contextual pathway use, public-to-authenticated progression and re-identification friction. Segment outcomes by relationship. Numerical baselines are not attached.",
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/markdown" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "marsh-one-mvp-brief.md";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Decision brief download requested.");
  };
  const style = {
    "--gtm-ink": getRoleColor("fg.primary"),
    "--gtm-muted": getRoleColor("fg.neutral.subtle"),
    "--gtm-surface": getRoleColor("bg.default"),
    "--gtm-soft": getRoleColor("bg.neutral.subtle"),
    "--gtm-line": getRoleColor("border.default"),
    "--gtm-brand": getRoleColor("interactive.primary"),
    "--gtm-on-brand": getRoleColor("fg.on-interactive"),
    "--gtm-focus": getRoleColor("border.focus"),
  } as CSSProperties;

  const overview = (
    <div className="gtm-overview">
      <section className="gtm-thesis" aria-labelledby="thesis-title">
        <div className="gtm-eyebrow">THE EXPERIENCE WE WANT TO PROVE</div>
        <h2 id="thesis-title">
          From “where do I start?”
          <br />
          to the right expertise.
        </h2>
        <p>
          One connected journey that understands a business need, makes the next
          step clear, and brings a Marsh specialist into the conversation.
        </p>
        <div className="gtm-thesis-footer">
          <span>2026 PROPOSAL · R1–R3 + EXISTING CLIENT BRIDGE</span>
          <ArrowRight aria-hidden="true" />
        </div>
      </section>
      <Card>
        <CardHeader>
          <CardDescription>THE NEXT DECISION</CardDescription>
          <CardTitle>Serve both sides of the relationship.</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="gtm-copy">
            Roadmap v6 makes existing clients a first-class audience. The MVP
            should help prospects find expertise and help existing clients
            continue their relationship. Confirm the pilot market and segment
            for both pathways.
          </p>
          <dl className="gtm-facts">
            <div>
              <dt>Audience</dt>
              <dd>Prospects + existing clients</dd>
            </div>
            <div>
              <dt>2026 boundary</dt>
              <dd>R1–R3 + minimum EC bridge</dd>
            </div>
            <div>
              <dt>Decision needed</dt>
              <dd>Pilot scope + named EC owner</dd>
            </div>
          </dl>
        </CardContent>
        <CardFooter>
          <Badge tone="warning" soft>
            Needs validation
          </Badge>
        </CardFooter>
      </Card>
      <section className="gtm-journey gtm-full" aria-labelledby="journey-title">
        <div className="gtm-section-heading">
          <div>
            <span className="gtm-eyebrow">
              ONE JOURNEY, EIGHT STAGES · ROADMAP PART 6
            </span>
            <h2 id="journey-title">Build the smallest complete experience.</h2>
          </div>
          <a href="/marsh-one" target="_blank" rel="noreferrer">
            View Marsh One <MoveUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="gtm-journey-grid">
          {journey.map((item, i) => (
            <article key={item.stage}>
              <span className="gtm-step">0{i + 1}</span>
              <h3>{item.stage}</h3>
              <p>{item.outcome}</p>
              <span className="gtm-measure">{item.signal}</span>
            </article>
          ))}
        </div>
      </section>
      <Card>
        <CardHeader>
          <CardDescription>MEASURE VALUE</CardDescription>
          <CardTitle>Measure acquisition and continuity.</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="gtm-copy">
            For prospects: comprehension, findability and Insight → Solution →
            Contact progression, connected to qualified contact submissions.
          </p>
          <p className="gtm-copy">
            For existing clients: contextual pathway use,
            public-to-authenticated progression and reduced re-identification
            friction. Review both with the Product Lead each quarter.
          </p>
        </CardContent>
        <CardFooter>
          <Badge>Numerical baselines not attached</Badge>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>INNOVATION WITH A PURPOSE</CardDescription>
          <CardTitle>Make context travel with the client.</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="gtm-copy">
            The signature moment: a clear explanation of why an insight matters,
            followed by an expert handoff that carries the conversation forward.
          </p>
          <p className="gtm-copy">
            R2 establishes discoverability; R3 develops the contact and routing
            foundations. R4 tests AI discovery and comprehension after taxonomy,
            metadata and measurement generate signal.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="tertiary" onClick={() => setActiveTab("evidence")}>
            Explore validation plan <ArrowRight data-icon="inline-end" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  const scope = (
    <section aria-label="MVP scope">
      <div className="gtm-section-heading">
        <div>
          <span className="gtm-eyebrow">MAKE THE TRADE-OFFS VISIBLE</span>
          <h2>Your proposed 2026 MVP</h2>
          <p>
            R1–R3 plus the minimum EC bridge. Selections are a local planning
            scenario, not approved commitments. R4–R5 and later horizons are
            available in the Roadmap & decisions view.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Badge tone="info" soft>
            {plan.scope.length} selected
          </Badge>
          <Button
            variant="secondary"
            onClick={() => {
              setPlan((current) => ({
                ...current,
                scope: initialPlan().scope,
              }));
              setNotice(
                "Roadmap baseline applied to scope. Readiness checks unchanged."
              );
            }}
          >
            Use roadmap baseline
          </Button>
        </div>
      </div>
      <div className="gtm-scope-grid">
        {opportunities.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="gtm-row">
                <Badge>{item.stage}</Badge>
                <Checkbox
                  checked={plan.scope.includes(item.id)}
                  onCheckedChange={() => toggle("scope", item.id)}
                  aria-label={`Include ${item.title}`}
                />
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.outcome}</CardDescription>
            </CardHeader>
            <CardContent>
              <details>
                <summary>Evidence & delivery conditions</summary>
                <dl className="gtm-facts">
                  <div>
                    <dt>Evidence status</dt>
                    <dd>Roadmap v6 proposal · no client validation attached</dd>
                  </div>
                  <div>
                    <dt>Proposed test</dt>
                    <dd>{item.test}</dd>
                  </div>
                  <div>
                    <dt>Owner role</dt>
                    <dd>{item.owner}</dd>
                  </div>
                  <div>
                    <dt>Dependency</dt>
                    <dd>{item.dependency}</dd>
                  </div>
                </dl>
              </details>
            </CardContent>
          </Card>
        ))}
      </div>
      {!plan.scope.includes("handoff") && (
        <Alert severity="warning" title="The proposed journey has no handoff">
          Add expert handoff or explicitly redefine the pilot outcome before
          committing the scope.
        </Alert>
      )}
      {!plan.scope.includes("existing-client") && (
        <Alert
          severity="warning"
          title="The existing-client pathway is missing"
        >
          Roadmap v6 places minimum EC alongside R1–R3 in 2026. Removing it
          changes the proposed MVP boundary and needs an explicit scope
          decision.
        </Alert>
      )}
      {!plan.scope.includes("measurement") && (
        <Alert severity="warning" title="The learning loop is missing">
          Include measurement so the pilot can establish whether the experience
          creates value.
        </Alert>
      )}
    </section>
  );

  const evidence = (
    <section aria-label="Evidence and experiments">
      <div className="gtm-section-heading">
        <div>
          <span className="gtm-eyebrow">LEARN BEFORE COMMITTING</span>
          <h2>Turn assumptions into decisions.</h2>
          <p>
            These are proposed experiments. No results or validated demand are
            implied.
          </p>
        </div>
        <FlaskConical aria-hidden="true" />
      </div>
      <div className="gtm-experiments">
        {experiments.map((item, i) => (
          <Card key={item.title}>
            <CardHeader>
              <CardDescription>EXPERIMENT 0{i + 1} · PROPOSED</CardDescription>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="gtm-copy">{item.question}</p>
              <dl className="gtm-facts">
                <div>
                  <dt>Method</dt>
                  <dd>{item.method}</dd>
                </div>
                <div>
                  <dt>Decision unlocked</dt>
                  <dd>{item.decision}</dd>
                </div>
                <div>
                  <dt>Proposed owner</dt>
                  <dd>{item.owner}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>What informs this proposal?</CardTitle>
          <CardDescription>
            Existing product direction is context, not proof of client demand.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="gtm-sources">
            <li>
              <strong>{roadmapSource}</strong> — supplied by you. Parts 6–9
              inform journey, release scope and AI dependencies; Parts 12–14
              inform measurement, governance and open decisions. Narrative
              baselines and vision stories are not measured results.
            </li>
            <li>
              <a href="/marsh-one" target="_blank" rel="noreferrer">
                Local Marsh One experience
              </a>{" "}
              — discovery, service exploration and expert access.
            </li>
            <li>
              <a
                href="https://www.marsh.com/en/about/media/marsh-risk-unveils-ai-powered-risk-companion.html"
                target="_blank"
                rel="noreferrer"
              >
                Marsh Risk Companion announcement · April 28, 2026
              </a>{" "}
              — connected analytics and decision support. Assess reuse before
              building overlapping capabilities.
            </li>
            <li>
              Missing evidence: client interviews, journey baseline, market
              choice, delivery estimates and channel economics.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );

  const launch = (
    <section aria-label="Launch readiness">
      <div className="gtm-section-heading">
        <div>
          <span className="gtm-eyebrow">
            A CONTROLLED PILOT, THEN EXPANSION
          </span>
          <h2>Earn the right to launch.</h2>
          <p>
            Working checklist only. Checked items are self-reported and do not
            constitute release approval.
          </p>
        </div>
        <Badge
          tone={plan.gates.length === gates.length ? "success" : "warning"}
          soft
        >
          {plan.gates.length} / {gates.length} checked
        </Badge>
      </div>
      <div className="gtm-launch-grid">
        <Card>
          <CardHeader>
            <CardTitle>Pilot readiness</CardTitle>
            <CardDescription>
              Mark a condition only after reviewing the evidence with its owner.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <fieldset className="gtm-gates">
              <legend className="sr-only">Readiness conditions</legend>
              {gates.map((gate) => (
                <div key={gate.id}>
                  <Checkbox
                    checked={plan.gates.includes(gate.id)}
                    onCheckedChange={() => toggle("gates", gate.id)}
                    label={gate.title}
                    helperText={`${gate.owner} · ${gate.evidence}`}
                  />
                </div>
              ))}
            </fieldset>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Launch sequence</CardTitle>
            <CardDescription>
              Sequence proposal · dates and named owners to be agreed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="gtm-sequence">
              <li>
                <strong>01 · Align</strong>
                <p>
                  Choose pilot cohorts for both audiences, the market, client
                  problem and accountable Product Lead. Name the EC owner.
                </p>
              </li>
              <li>
                <strong>02 · Validate</strong>
                <p>
                  Test R1 comprehension, R2 findability, R3 handoff and the
                  minimum EC pathway. Refine scope from observed friction.
                </p>
              </li>
              <li>
                <strong>03 · Pilot</strong>
                <p>
                  Invite prospects through targeted entry points and existing
                  clients through relationship teams. Review pilot operations
                  weekly; review the roadmap quarterly.
                </p>
              </li>
              <li>
                <strong>04 · Expand</strong>
                <p>
                  Scale channels when client value, capacity and attribution are
                  demonstrated. Open R4 delivery only when foundation taxonomy,
                  metadata and measurement generate signal.
                </p>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </section>
  );

  return (
    <div className="gtm" style={style}>
      <a className="gtm-skip" href="#gtm-main">
        Skip to content
      </a>
      <header className="gtm-header">
        <a
          href="/marsh-one"
          className="gtm-wordmark"
          aria-label="Marsh One home"
        >
          marsh<span>one</span>
        </a>
        <div className="gtm-header-label">Product strategy / Go to market</div>
        <Badge tone="info" soft>
          Internal workspace
        </Badge>
      </header>
      <main id="gtm-main" className="gtm-main">
        <div className="gtm-title-row">
          <div>
            <div className="gtm-eyebrow">
              <Compass size={15} aria-hidden="true" /> MARSH ONE · MVP
              EXPLORATION
            </div>
            <h1>A clearer path to market.</h1>
            <p>Connect what clients need with what we build next.</p>
          </div>
          <Button variant="secondary" onClick={exportBrief}>
            <ArrowDownToLine data-icon="inline-start" />
            Export decision brief
          </Button>
        </div>
        <div className="gtm-status">
          <span>
            <span className="gtm-dot" /> Working proposal
          </span>
          <span>Roadmap v6 · July 2026 · delivery status unverified</span>
          <span>
            {storageError
              ? "Changes are temporary — storage unavailable"
              : "Roadmap v6 plan saved separately in this browser"}
          </span>
        </div>
        <div className="gtm-metrics">
          <div>
            <Compass aria-hidden="true" />
            <span>
              2026 boundary<strong>R1–R3 + EC</strong>
            </span>
          </div>
          <div>
            <Layers3 aria-hidden="true" />
            <span>
              MVP scope<strong>{plan.scope.length} capabilities</strong>
            </span>
          </div>
          <div>
            <FlaskConical aria-hidden="true" />
            <span>
              Client evidence<strong>Not yet validated</strong>
            </span>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" />
            <span>
              Readiness checklist
              <strong>
                {plan.gates.length} of {gates.length} checked
              </strong>
            </span>
          </div>
        </div>
        <Tabs
          variant="scrollable"
          defaultActiveId={activeTab}
          onSelect={setActiveTab}
          tabs={[
            { id: "overview", title: "Strategic overview", content: overview },
            {
              id: "roadmap",
              title: "Roadmap & decisions",
              content: <Roadmap />,
            },
            { id: "scope", title: "MVP scope", content: scope },
            {
              id: "evidence",
              title: "Evidence & experiments",
              content: evidence,
            },
            { id: "launch", title: "Launch readiness", content: launch },
          ]}
        />
        <footer className="gtm-footer">
          <span>MARSH ONE / FROM INSIGHT TO ACTION</span>
          <span>Define → validate → build → learn</span>
        </footer>
        <span role="status" className="sr-only">
          {notice}
        </span>
      </main>
    </div>
  );
}
