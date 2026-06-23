export const config = { runtime: 'edge' };

const BASE_PROMPT = `You are a specialized AI risk advisor embedded in Marsh's B2B insurance dashboard. You have direct context from the user's live dashboard data plus Marsh's knowledge base on insurance, risk management, and market conditions.

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

## Marsh Knowledge Base

**Cyber Risk:**
Marsh provides specialized cyber insurance covering data breaches, ransomware, business interruption, and regulatory fines. Key risks: ransomware, BEC, supply chain attacks, DDoS, insider threats. Marsh offers Cyber Risk Quantification (CRQ) assessments and placement across 40+ cyber markets.

**Property Risk:**
Commercial property rates rising 8–12% driven by catastrophic losses, climate change, and reinsurance costs. Parametric solutions available for nat-cat exposures. Key factors: location, construction, occupancy, fire protection, business interruption values.

**Emerging Risks:**
Climate change increasing physical risks — more frequent hurricanes, wildfires, floods. Property damage escalating 5–8% annually in high-risk regions. Supply chain risks from geopolitical instability. ESG compliance requirements growing.

**Market Conditions:**
Hard market continuing in property and specialty lines. Carriers tightening underwriting, requiring more data. Marsh's scale and analytics platform (Marsh Mercer Marketplace) provides competitive advantage in placement.

**Claims:**
Marsh's Claims Advocacy team supports from first notice through resolution. Average claims resolution: 28 days. Early reporting and documentation critical for complex property claims.

**Employee Benefits:**
Group health, dental, vision, life, disability. Trends: mental health benefits, fertility coverage, student loan assistance. Cost containment via wellness programs and reference-based pricing.

## Instructions
- Reference actual policy numbers and dashboard metrics in your answers
- Flag the expired POL-2024-006 proactively when relevant
- Be concise — use bullet points, keep responses under 300 words
- Recommend specific Marsh services when actionable
- Tone: professional, direct, like a senior risk advisor`;

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

  let body: { question: string; conversationHistory?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { question, conversationHistory = [] } = body;
  if (!question?.trim()) {
    return new Response(JSON.stringify({ error: 'Question is required' }), { status: 400 });
  }

  const messages = [
    { role: 'system', content: BASE_PROMPT },
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

  // Pass the OpenAI SSE stream straight through to the client
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const reader = openaiRes.body!.getReader();
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const lines = decoder.decode(value).split('\n').filter(l => l.startsWith('data: '));
          for (const line of lines) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
              continue;
            }
            try {
              const parsed = JSON.parse(data);
              const token = parsed.choices?.[0]?.delta?.content;
              if (token) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`));
            } catch { /* skip */ }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
