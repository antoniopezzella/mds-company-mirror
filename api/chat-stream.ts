import { createUIMessageStream, createUIMessageStreamResponse } from 'ai';
// Explicit `.js` extension: Vercel type-checks functions under node16-style
// ESM resolution, which requires it (TS2835). TypeScript still maps it to
// the sibling `retrieve.ts`, and it resolves the same under `bundler`.
import { retrieve, type Doc } from './_lib/retrieve.js';
import kbDocsRaw from './_data/knowledge-base.json';

export const config = { runtime: 'edge' };

// Loaded once at module scope, reused across warm Edge invocations.
const KB_DOCS = kbDocsRaw as Doc[];
const DOC_CHAR_LIMIT = 1500;

function buildKnowledgeBaseSection(docs: Doc[]): string {
  if (!docs.length) {
    return `## Marsh Knowledge Base

No specific knowledge base articles matched this question closely — answer using general Marsh insurance domain expertise, and avoid stating specific statistics or figures you're not confident are accurate.`;
  }
  const body = docs
    .map((d) => {
      const text = d.text.length > DOC_CHAR_LIMIT ? d.text.slice(0, DOC_CHAR_LIMIT) + '...' : d.text;
      return `**${d.title}**\n${text}`;
    })
    .join('\n\n');
  return `## Marsh Knowledge Base\n\n${body}`;
}

const CUSTOMER_PROMPT_PREFIX = `You are a specialized AI risk advisor embedded in Marsh's B2B insurance dashboard. You have direct context from the user's live dashboard data plus Marsh's knowledge base on insurance, risk management, and market conditions.

## Live Dashboard Data

**Active Policies (6 total):**
- POL-2024-001: Global Manufacturing Inc. — Commercial Property — $2.4M — Active
- POL-2024-002: TechCorp Solutions — Cyber Liability — $890K — Active
- POL-2024-003: Healthcare Partners Group — Professional Liability — $1.2M — Pending
- POL-2024-004: Metro Construction Ltd. — General Liability — $560K — Active
- POL-2024-005: Oceanic Shipping Co. — Marine Cargo — $340K — Active
- POL-2024-006: Retail Ventures LLC — Business Interruption — $780K — EXPIRED ⚠️

**Property Risk Score: 72/100 (Moderate-High)**
- Primary exposure: Climate/flood risk, Southeast US (+18% YoY)
- Supply chain concentration: 3 facilities in same flood zone
- Wildfire: 2 California Tier 1 facilities
- Estimated maximum loss: $12M business interruption
- Recommended action: +15% commercial property coverage increase

**Portfolio Metrics:**
- Total premium under management: $6.17M
- Coverage adequacy: 87% (gaps in cyber + D&O)
- Open claims: 3 (avg 28 days resolution)
- Renewal rate: 94%

**Market Conditions Q2 2025:**
- Commercial property: +8–12% (cat-driven)
- Cyber: +4–6% (stabilizing)
- General liability: flat to +3%
- Marine cargo: +5–8% (Red Sea disruption)

`;

const CUSTOMER_PROMPT_SUFFIX = `
## Instructions
- Reference actual policy numbers and dashboard metrics in your answers
- Flag the expired POL-2024-006 proactively when relevant
- Be concise — use bullet points, keep responses under 300 words
- Recommend specific Marsh services when actionable
- Tone: professional, direct, like a senior risk advisor`;

// Used on public marketing pages (no logged-in account/policy data exists
// for these visitors) — kept separate from CUSTOMER_PROMPT rather than
// branching one string at render time, so neither prompt has to reason
// about which parts of it apply to the other audience.
const PROSPECT_PROMPT_PREFIX = `You are a specialized AI risk advisor embedded on Marsh's public marketing site. The person you're talking to is a prospective client browsing marketing pages — not a logged-in customer. You have no account, policy, or portfolio data for this visitor. Answer using Marsh's knowledge base on insurance, risk management, and market conditions below.

`;

const PROSPECT_PROMPT_SUFFIX = `
## Instructions
- Never reference or imply specific policy numbers, account data, or portfolio metrics — you have none for this visitor and must not invent any
- Speak in general terms about risks, market trends, and Marsh's capabilities — not "your" coverage, "your" exposures, or "your" claims
- Be concise — use bullet points, keep responses under 300 words
- When the visitor signals real interest — comparing providers, asking about pricing, coverage for their business, or next steps — proactively invite them to use the "Contact us" button to talk with a Marsh advisor. Don't push this on purely educational questions
- Tone: professional, direct, consultative — like a knowledgeable risk advisor helping someone evaluate their options`;

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), { status: 500 });
  }

  let body: {
    question: string;
    conversationHistory?: { role: string; content: string }[];
    visitorType?: 'customer' | 'prospect';
  };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { question, conversationHistory = [], visitorType } = body;
  if (!question?.trim()) {
    return new Response(JSON.stringify({ error: 'Question is required' }), { status: 400 });
  }

  const topDocs = retrieve(question, KB_DOCS, 3);
  const kbSection = buildKnowledgeBaseSection(topDocs);
  const systemPrompt =
    visitorType === 'prospect'
      ? PROSPECT_PROMPT_PREFIX + kbSection + PROSPECT_PROMPT_SUFFIX
      : CUSTOMER_PROMPT_PREFIX + kbSection + CUSTOMER_PROMPT_SUFFIX;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.slice(-12).map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    { role: 'user', content: question },
  ];

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages, stream: true, max_tokens: 600, temperature: 0.4 }),
  });

  if (!openaiRes.ok) {
    const err = await openaiRes.text();
    return new Response(JSON.stringify({ error: err }), { status: 502 });
  }

  // Re-envelopes the OpenAI SSE token stream into the Vercel AI SDK's UI
  // Message Stream protocol (text-start/text-delta/text-end + a
  // data-citations part, wrapped in start/finish) so the client can consume
  // it via `useChat()`. Retrieval and prompt construction above are
  // untouched — this only changes how the same tokens are packaged.
  const textId = crypto.randomUUID();

  const uiStream = createUIMessageStream({
    execute: async ({ writer }) => {
      writer.write({ type: 'start' });
      writer.write({ type: 'text-start', id: textId });

      const reader = openaiRes.body!.getReader();
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const lines = decoder.decode(value).split('\n').filter(l => l.startsWith('data: '));
          for (const line of lines) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              const token = parsed.choices?.[0]?.delta?.content;
              if (token) writer.write({ type: 'text-delta', id: textId, delta: token });
            } catch { /* skip */ }
          }
        }
      } finally {
        writer.write({ type: 'text-end', id: textId });
        if (topDocs.length) {
          const citations = topDocs.map(d => ({ title: d.title, url: d.url }));
          writer.write({ type: 'data-citations', data: citations });
        }
        writer.write({ type: 'finish' });
      }
    },
  });

  return createUIMessageStreamResponse({
    stream: uiStream,
    headers: { 'Access-Control-Allow-Origin': '*' },
  });
}
