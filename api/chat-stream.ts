import type { VercelRequest, VercelResponse } from '@vercel/node';

const SYSTEM_PROMPT = `You are a specialized AI risk advisor embedded in Marsh's B2B insurance dashboard. You have direct context from the user's dashboard data including their active policies, property risk scores, coverage gaps, and renewal pipeline.

## Dashboard Context You Have Access To

**Active Policies (6 policies):**
- POL-2024-001: Global Manufacturing Inc. — Commercial Property — $2.4M premium — Active
- POL-2024-002: TechCorp Solutions — Cyber Liability — $890K premium — Active
- POL-2024-003: Healthcare Partners Group — Professional Liability — $1.2M premium — Pending
- POL-2024-004: Metro Construction Ltd. — General Liability — $560K premium — Active
- POL-2024-005: Oceanic Shipping Co. — Marine Cargo — $340K premium — Active
- POL-2024-006: Retail Ventures LLC — Business Interruption — $780K premium — Expired

**Property Risk Intelligence:**
- Overall property risk score: 72/100 (Moderate-High)
- Top exposure: Climate/flood risk in Southeast US operations (+18% YoY)
- Secondary exposure: Supply chain concentration risk (3 facilities in same flood zone)
- Business interruption exposure: $12M estimated maximum loss
- Recommended coverage increase: 15% on commercial property lines
- Wildfire exposure: 2 facilities in California Tier 1 wildfire zone

**Key Metrics:**
- Total premium under management: $6.17M
- Renewal rate: 94% client retention
- Open claims: 3 (avg resolution 28 days)
- Coverage adequacy: 87% (gap detected in cyber + D&O)

**Market Conditions (Q2 2025):**
- Commercial property: +8-12% rate increases driven by cat losses
- Cyber liability: +4-6% (stabilizing after years of hard market)
- General liability: flat to +3%
- Marine cargo: +5-8% due to Red Sea disruption

## Your Role
- Answer questions about policies, risk scores, coverage gaps, and market conditions visible in the dashboard
- Proactively connect their questions to data already shown in the dashboard
- Be specific, use numbers when available, and reference their actual policies
- Recommend actions with clear business rationale
- Flag urgent items (e.g., the expired Retail Ventures LLC policy needs immediate renewal)
- Keep responses concise — this is a B2B dashboard context, not a research report
- Format with bullet points or short paragraphs; avoid walls of text

## Marsh Services to Reference When Relevant
- Risk consulting & analytics (Marsh Risk Consulting)
- Placement & broking (getting best market pricing)
- Claims advocacy
- Parametric insurance solutions for climate/nat cat exposures
- Cyber risk quantification (CRQ) assessments`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  const { question, conversationHistory = [] } = req.body as {
    question: string;
    conversationHistory: { role: string; content: string }[];
  };

  if (!question?.trim()) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.slice(-12).map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    { role: 'user', content: question },
  ];

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        stream: true,
        max_tokens: 600,
        temperature: 0.5,
      }),
    });

    if (!openaiRes.ok) {
      const err = await openaiRes.text();
      res.write(`data: ${JSON.stringify({ error: err })}\n\n`);
      return res.end();
    }

    const reader = openaiRes.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      res.write(`data: ${JSON.stringify({ error: 'No response stream' })}\n\n`);
      return res.end();
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const lines = decoder.decode(value).split('\n').filter(l => l.startsWith('data: '));
      for (const line of lines) {
        const data = line.slice(6).trim();
        if (data === '[DONE]') {
          res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
          continue;
        }
        try {
          const parsed = JSON.parse(data);
          const token = parsed.choices?.[0]?.delta?.content;
          if (token) res.write(`data: ${JSON.stringify({ token })}\n\n`);
        } catch { /* skip malformed */ }
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
  }

  res.end();
}
