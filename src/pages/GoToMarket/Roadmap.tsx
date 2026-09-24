import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  decisions,
  horizons,
  principles,
  releases,
  roadmapSource,
} from "./data";

export function Roadmap() {
  return (
    <section aria-label="Roadmap and decisions">
      <div className="gtm-section-heading">
        <div>
          <span className="gtm-eyebrow">SOURCE ROADMAP → MVP DECISIONS</span>
          <h2>Commit near. Keep the vision open.</h2>
          <p>
            {roadmapSource}. Timing and outcomes below reflect the supplied
            proposal, not verified delivery status or approved dates.
          </p>
        </div>
      </div>
      <div className="gtm-horizons">
        {horizons.map((horizon) => (
          <Card key={horizon.title}>
            <CardHeader>
              <CardDescription>{horizon.timing}</CardDescription>
              <CardTitle>{horizon.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                tone={horizon.type === "Outcome roadmap" ? "info" : "default"}
                soft
              >
                {horizon.type}
              </Badge>
              <p className="gtm-copy mt-4">{horizon.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="gtm-section-heading mt-8">
        <div>
          <span className="gtm-eyebrow">2026–2027 · PARTS 7–9</span>
          <h2>One foundation. Two client pathways.</h2>
          <p>
            2026 proposal: R1–R3 with EC in parallel. 2027 guidance and
            continuity are gated by evidence.
          </p>
        </div>
      </div>
      <div className="gtm-scope-grid">
        {releases.map((release) => (
          <Card key={release.id}>
            <CardHeader>
              <div className="gtm-row">
                <Badge tone={release.id === "EC" ? "info" : "default"} soft>
                  {release.id}
                </Badge>
                <span className="gtm-release-time">{release.timing}</span>
              </div>
              <CardTitle>{release.title}</CardTitle>
              <CardDescription>{release.journey}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="gtm-copy">{release.outcome}</p>
              <dl className="gtm-facts">
                <div>
                  <dt>Delivery condition</dt>
                  <dd>{release.gate}</dd>
                </div>
                <div>
                  <dt>Source</dt>
                  <dd>Roadmap v6 · {release.source}</dd>
                </div>
                <div>
                  <dt>Delivery status</dt>
                  <dd>Not verified</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>AI follows the foundations.</CardTitle>
          <CardDescription>
            Part 9 distinguishes capabilities that solve different journey
            problems.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="gtm-sequence">
            <li>
              <strong>R2 · Discoverability</strong>
              <p>
                Structure content and taxonomy so relevant expertise can be
                found. This is content architecture, not a chatbot.
              </p>
            </li>
            <li>
              <strong>R3 / R5 · Routing</strong>
              <p>
                Qualify and route inquiries with useful context. Low-confidence
                cases retain a named human owner; design the specialist intake
                experience in parallel.
              </p>
            </li>
            <li>
              <strong>R4 · Discovery and comprehension</strong>
              <p>
                Test guided narrowing and sourced contextual framing after
                taxonomy, metadata and behavioral measurement generate signal.
                Pages remain usable without the AI layer.
              </p>
            </li>
            <li>
              <strong>H3 / H4 · Anticipation and orchestration</strong>
              <p>
                Keep these as strategic bets. Authenticated context, mature
                signals and specialist workflows are prerequisites, not assumed
                capabilities.
              </p>
            </li>
          </ol>
        </CardContent>
      </Card>
      <div className="gtm-section-heading mt-8">
        <div>
          <span className="gtm-eyebrow">BEFORE COMMITTING THE PLAN</span>
          <h2>Decisions that need an owner.</h2>
          <p>
            Open questions and source inconsistencies are separated from
            dashboard recommendations.
          </p>
        </div>
      </div>
      <div className="gtm-scope-grid">
        {decisions.map((decision) => (
          <Card key={decision.title}>
            <CardHeader>
              <CardDescription>
                {decision.kind} · {decision.source}
              </CardDescription>
              <CardTitle>{decision.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="gtm-copy">{decision.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>The decision principles, in order</CardTitle>
          <CardDescription>
            Roadmap v6 · Part 3. Use the order when principles compete.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="gtm-principles">
            {principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </section>
  );
}
