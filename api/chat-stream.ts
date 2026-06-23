import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as fs from 'fs';
import * as path from 'path';

// ── Knowledge base ────────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), 'apps/gateway/data/approved');

interface KnowledgeDoc {
  name: string;
  content: string;
  keywords: string[];
}

let _docs: KnowledgeDoc[] | null = null;

function loadDocs(): KnowledgeDoc[] {
  if (_docs) return _docs;
  try {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.md'));
    _docs = files.map(file => {
      const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf-8');
      // Extract keywords from headings and first 500 chars
      const headings = (content.match(/^#{1,3}\s+(.+)/gm) ?? []).map(h => h.replace(/^#+\s+/, '').toLowerCase());
      const preview = content.slice(0, 500).toLowerCase();
      return { name: file.replace('.md', ''), content, keywords: [...headings, ...preview.split(/\W+/).filter(w => w.length > 4)] };
    });
    return _docs;
  } catch {
    return [];
  }
}

function retrieveRelevantDocs(question: string, topK = 3): KnowledgeDoc[] {
  const docs = loadDocs();
  if (docs.length === 0) return [];

  const qTokens = question.toLowerCase().split(/\W+/).filter(w => w.length > 3);

  const scored = docs.map(doc => {
    const score = qTokens.reduce((acc, token) => {
      const inKeywords = doc.keywords.filter(k => k.includes(token)).length;
      const inContent = (doc.content.toLowerCase().match(new RegExp(token, 'g')) ?? []).length;
      return acc + inKeywords * 3 + Math.min(inContent, 10);
    }, 0);
    return { doc, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter(s => s.score > 0)
    .map(s => s.doc);
}

// ── System prompt ─────────────────────────────────────────────────────────────

const BASE_PROMPT = `You are a specialized AI risk advisor embedded in Marsh's B2B insurance dashboard. You have direct context from the user's live dashboard data plus Marsh's knowledge base on insurance, risk management, and market conditions.

## Live Dashboard Data

**Active Policies (6 total):**
- POL-2024-001: Global Manufacturing Inc. — Commercial Property — $2.4M — Active
- POL-2024-002: TechCorp Solutions — Cyber Liability — $890K — Active
- POL-2024-003: Healthcare Partners Group — Professional Liability — $1.2M — Pending
- POL-2024-004: Metro Construction Ltd. — General Liability — $560K — Active
- POL-2024-005: Oceanic Shipping Co. — Marine Cargo — $340K — Active
- POL-2024-006: Retail Ventures LLC — Business Interruption — $780K — **EXPIRED** ⚠️

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

## Instructions
- Reference actual policy numbers and dashboard data in your answers
- Flag the expired POL-2024-006 when discussing portfolio health
- Be concise — bullet points preferred over paragraphs
- Recommend specific Marsh services when actionable`;

// ── Handler ───────────────────────────────────────────────────────────────────

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

  // Retrieve relevant knowledge docs for this question
  const relevantDocs = retrieveRelevantDocs(question);
  const knowledgeSection = relevantDocs.length > 0
    ? `\n\n## Relevant Knowledge Base\n\n${relevantDocs.map(d => `### ${d.name}\n${d.content.slice(0, 1200)}`).join('\n\n---\n\n')}`
    : '';

  const systemPrompt = BASE_PROMPT + knowledgeSection;

  const messages = [
    { role: 'system', content: systemPrompt },
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
        max_tokens: 700,
        temperature: 0.4,
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
        } catch { /* skip */ }
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
  }

  res.end();
}
