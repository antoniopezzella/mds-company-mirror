import { describe, it, expect, beforeEach } from 'vitest';
import {
  resolveAllowedOrigin,
  corsHeaders,
  validateInput,
  rateLimit,
  clientKey,
  LIMITS,
  __resetRateLimitForTests,
} from './guard';

describe('CORS origin allowlist', () => {
  it.each([
    'https://marsh-design-system.vercel.app',
    'https://marsh-design-system-d70vpcckb-antoniopezzellas-projects.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:6006',
  ])('allows %s', (origin) => {
    expect(resolveAllowedOrigin(origin)).toBe(origin);
  });

  // The whole point: before this, Access-Control-Allow-Origin was '*', so any
  // site on the internet could use this endpoint as a free AI proxy from a
  // visitor's browser.
  it.each([
    'https://evil.example.com',
    'https://marsh-design-system.vercel.app.evil.com',
    'http://marsh-design-system.vercel.app',
    'https://notmarsh-design-system.vercel.app',
  ])('rejects %s', (origin) => {
    expect(resolveAllowedOrigin(origin)).toBeNull();
  });

  it('emits no CORS headers for a disallowed origin', () => {
    expect(corsHeaders('https://evil.example.com')).toEqual({});
  });

  it('varies on Origin so a cache cannot cross-serve an allowed response', () => {
    const h = corsHeaders('https://marsh-design-system.vercel.app');
    expect(h['Access-Control-Allow-Origin']).toBe('https://marsh-design-system.vercel.app');
    expect(h.Vary).toBe('Origin');
  });

  it('emits nothing when there is no Origin header', () => {
    expect(corsHeaders(null)).toEqual({});
  });
});

describe('input caps', () => {
  it('accepts an ordinary question', () => {
    expect(validateInput('What does cyber cover include?', [])).toBeNull();
  });

  it.each<[unknown, string]>([
    ['', 'empty'],
    ['   ', 'whitespace'],
    [undefined, 'missing'],
    [42, 'non-string'],
  ])('rejects a question that is %s (%s)', (q) => {
    expect(validateInput(q, [])).toBe('Question is required');
  });

  it('rejects an oversized question', () => {
    const msg = validateInput('x'.repeat(LIMITS.QUESTION_MAX_CHARS + 1), []);
    expect(msg).toMatch(/characters or fewer/);
  });

  it('allows a question exactly at the cap', () => {
    expect(validateInput('x'.repeat(LIMITS.QUESTION_MAX_CHARS), [])).toBeNull();
  });

  it('rejects too many history turns', () => {
    const history = Array.from({ length: LIMITS.HISTORY_MAX_TURNS + 1 }, () => ({
      role: 'user',
      content: 'hi',
    }));
    expect(validateInput('ok', history)).toMatch(/messages or fewer/);
  });

  // The cap that actually matters for spend: few turns, enormous each.
  it('rejects history that is small in count but huge in total size', () => {
    const history = [
      { role: 'user', content: 'x'.repeat(LIMITS.HISTORY_MAX_TOTAL_CHARS) },
      { role: 'assistant', content: 'x' },
    ];
    expect(validateInput('ok', history)).toMatch(/characters or fewer/);
  });

  it('rejects malformed history entries', () => {
    expect(validateInput('ok', 'not-an-array')).toMatch(/must be an array/);
    expect(validateInput('ok', [null])).toMatch(/must be objects/);
    expect(validateInput('ok', [{ role: 'user' }])).toMatch(/string content/);
  });

  it('treats omitted history as fine', () => {
    expect(validateInput('ok', undefined)).toBeNull();
  });
});

describe('rate limiting', () => {
  beforeEach(__resetRateLimitForTests);

  it('allows requests up to the limit, then refuses', () => {
    for (let i = 0; i < 15; i++) {
      expect(rateLimit('1.2.3.4').ok).toBe(true);
    }
    const blocked = rateLimit('1.2.3.4');
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });

  it('counts each client separately', () => {
    for (let i = 0; i < 15; i++) rateLimit('1.2.3.4');
    expect(rateLimit('1.2.3.4').ok).toBe(false);
    expect(rateLimit('5.6.7.8').ok).toBe(true);
  });

  it('lets a client through again once the window rolls over', () => {
    const t0 = 1_000_000;
    for (let i = 0; i < 15; i++) rateLimit('1.2.3.4', t0);
    expect(rateLimit('1.2.3.4', t0).ok).toBe(false);
    expect(rateLimit('1.2.3.4', t0 + 60_001).ok).toBe(true);
  });
});

describe('client identification', () => {
  it('takes the first entry of x-forwarded-for', () => {
    const req = new Request('https://x.test', {
      headers: { 'x-forwarded-for': '9.9.9.9, 10.0.0.1, 10.0.0.2' },
    });
    expect(clientKey(req)).toBe('9.9.9.9');
  });

  it('falls back to x-real-ip, then to a constant', () => {
    expect(clientKey(new Request('https://x.test', { headers: { 'x-real-ip': '8.8.8.8' } }))).toBe('8.8.8.8');
    expect(clientKey(new Request('https://x.test'))).toBe('unknown');
  });
});
