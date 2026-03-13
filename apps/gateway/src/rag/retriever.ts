import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { trace } from '@opentelemetry/api';

export type Doc = { title: string; url: string; text: string };

export function loadDocs(root: string): Doc[] {
  const files = readdirSync(root).filter(f => f.endsWith('.md'));
  return files.map(f => {
    const p = join(root, f);
    const text = readFileSync(p, 'utf8');
    const title = text.split('\n')[0].replace(/^#\s*/, '') || f;
    const url = `/docs/${f}`;
    return { title, url, text };
  });
}

export function retrieve(query: string, docs: Doc[], k = 3) {
  const tracer = trace.getTracer('retriever');
  return tracer.startActiveSpan('retrieve', (span) => {
    span.setAttribute('query', query);
    span.setAttribute('docs.count', docs.length);
    span.setAttribute('k', k);
    
    const terms = query.toLowerCase().split(/\W+/).filter(Boolean);
    span.setAttribute('terms.count', terms.length);
    
    const score = (t: string) => terms.reduce((s, w) => s + (t.toLowerCase().match(new RegExp(w, 'g')) || []).length, 0);
    const results = docs.map(d => ({ d, s: score(d.text) }))
               .filter(x => x.s > 0)
               .sort((a,b)=>b.s-a.s)
               .slice(0,k).map(x=>x.d);
    
    span.setAttribute('results.count', results.length);
    span.end();
    return results;
  });
}
