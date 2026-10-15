/**
 * Request guards for the public AI endpoint.
 *
 * `/api/chat-stream` proxies to OpenAI on our own API key. Before this existed
 * it had no authentication, no rate limiting, and `Access-Control-Allow-Origin:
 * '*'` — so anyone who found the URL could spend the OpenAI budget from any
 * origin, indefinitely, and feed up to 12 turns of attacker-controlled
 * `conversationHistory` straight into the prompt.
 *
 * These guards are deliberately cheap and dependency-free, because the endpoint
 * runs on the Edge runtime.
 */

/**
 * Origins allowed to call the endpoint.
 *
 * The production alias plus Vercel's generated deployment hostnames (so preview
 * deploys of a PR still work) and localhost for development. Anything else gets
 * no CORS headers, which stops a browser on a third-party site from using this
 * endpoint as a free AI proxy.
 *
 * NOTE this is a browser protection, not authentication: CORS is enforced by
 * the browser, so a direct server-side request (curl, a script) is unaffected.
 * The rate limit below is what constrains those.
 */
const ALLOWED_ORIGIN_PATTERNS: RegExp[] = [
  /^https:\/\/marsh-design-system\.vercel\.app$/,
  /^https:\/\/marsh-design-system-[a-z0-9-]+\.vercel\.app$/,
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
];

export function resolveAllowedOrigin(origin: string | null): string | null {
  if (!origin) return null;
  return ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(origin)) ? origin : null;
}

export function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = resolveAllowedOrigin(origin);
  if (!allowed) return {};
  return {
    'Access-Control-Allow-Origin': allowed,
    // Tell caches the response varies by Origin, or a CDN could serve one
    // origin's allowed response to another origin.
    Vary: 'Origin',
  };
}

// ─── Input caps ──────────────────────────────────────────────────────────────
// Everything below is attacker-controlled and ends up in the prompt, so each
// one is a direct lever on token spend.
export const LIMITS = {
  /** A genuine question is well under this; 2k chars is already generous. */
  QUESTION_MAX_CHARS: 2_000,
  /** The handler already slices to the last 12 turns; this caps their size. */
  HISTORY_MAX_TURNS: 12,
  HISTORY_MAX_TOTAL_CHARS: 12_000,
} as const;

export function validateInput(question: unknown, history: unknown): string | null {
  if (typeof question !== 'string' || !question.trim()) return 'Question is required';
  if (question.length > LIMITS.QUESTION_MAX_CHARS) {
    return `Question must be ${LIMITS.QUESTION_MAX_CHARS} characters or fewer`;
  }
  if (history === undefined) return null;
  if (!Array.isArray(history)) return 'conversationHistory must be an array';
  if (history.length > LIMITS.HISTORY_MAX_TURNS) {
    return `conversationHistory must contain ${LIMITS.HISTORY_MAX_TURNS} messages or fewer`;
  }
  let total = 0;
  for (const m of history) {
    if (!m || typeof m !== 'object') return 'conversationHistory entries must be objects';
    const content = (m as { content?: unknown }).content;
    if (typeof content !== 'string') return 'conversationHistory entries must have string content';
    total += content.length;
    if (total > LIMITS.HISTORY_MAX_TOTAL_CHARS) {
      return `conversationHistory must total ${LIMITS.HISTORY_MAX_TOTAL_CHARS} characters or fewer`;
    }
  }
  return null;
}

// ─── Rate limiting ───────────────────────────────────────────────────────────
/**
 * Fixed-window counter, held in module scope.
 *
 * BE HONEST ABOUT WHAT THIS IS: Edge functions run as many short-lived
 * isolates, so this map is per-isolate and resets when one is recycled. A
 * determined attacker spread across isolates gets more than the nominal limit.
 *
 * It is still worth having — it stops the realistic case, which is one client
 * looping requests — and it is the strongest option that adds no dependency
 * and no infrastructure. A hard limit needs shared state (Vercel KV, Upstash,
 * or a WAF rule); this is the stopgap until one exists, and should be replaced
 * rather than trusted indefinitely.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 15;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function clientKey(req: Request): string {
  // Vercel sets x-forwarded-for; the first entry is the client.
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]!.trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export function rateLimit(key: string, now = Date.now()): { ok: boolean; retryAfterSec: number } {
  // Opportunistic cleanup so the map can't grow without bound in a long-lived
  // isolate.
  if (buckets.size > 5_000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfterSec: 0 };
  }
  bucket.count += 1;
  if (bucket.count > MAX_REQUESTS_PER_WINDOW) {
    return { ok: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfterSec: 0 };
}

/** Test seam — the module-scope map would otherwise leak between test cases. */
export function __resetRateLimitForTests(): void {
  buckets.clear();
}
