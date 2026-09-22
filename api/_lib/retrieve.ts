// Ported from apps/gateway/src/rag/retriever.ts's retrieve() — pure
// string/regex logic, no Node APIs, safe on Vercel's Edge runtime.
// Dropped the @opentelemetry/api tracer wrapper (unnecessary here) and
// escaped regex special characters in query terms (the original built
// `new RegExp(term, 'g')` directly from raw user input).

export type Doc = { title: string; url: string; text: string };

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function retrieve(query: string, docs: Doc[], k = 3): Doc[] {
  const terms = query.toLowerCase().split(/\W+/).filter(Boolean);

  const score = (text: string) => {
    const lower = text.toLowerCase();
    return terms.reduce((s, term) => {
      const re = new RegExp(escapeRegExp(term), 'g');
      return s + (lower.match(re) || []).length;
    }, 0);
  };

  return docs
    .map((d) => ({ d, s: score(d.text) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, k)
    .map((x) => x.d);
}
