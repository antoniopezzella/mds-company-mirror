import { describe, it, expect } from 'vitest';
import { sanitizeInput, sanitizeHTML, sanitizeURL, escapeHTML } from './sanitizer';

describe('sanitizeInput', () => {
  it('should remove dangerous characters', () => {
    expect(sanitizeInput('<script>alert("XSS")</script>')).toBe('scriptalert("XSS")/script');
    expect(sanitizeInput('hello<>world')).toBe('helloworld');
  });

  it('should remove javascript: protocol', () => {
    expect(sanitizeInput('javascript:alert(1)')).toBe('alert(1)');
    expect(sanitizeInput('JAVASCRIPT:alert(1)')).toBe('alert(1)');
  });

  it('should remove event handlers', () => {
    expect(sanitizeInput('onclick=alert(1)')).toBe('alert(1)');
    expect(sanitizeInput('onload=malicious()')).toBe('malicious()');
  });

  it('should trim whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });

  it('should handle empty input', () => {
    expect(sanitizeInput('')).toBe('');
    // @ts-expect-error — deliberately violating the string param type to
    // verify sanitizeInput degrades safely for untrusted/non-TS callers.
    expect(sanitizeInput(null)).toBe('');
  });
});

describe('sanitizeHTML', () => {
  it('should allow safe HTML tags', () => {
    const input = '<p>Hello <strong>world</strong></p>';
    expect(sanitizeHTML(input)).toBe(input);
  });

  it('should remove script tags', () => {
    const input = '<p>Hello</p><script>alert("XSS")</script>';
    const result = sanitizeHTML(input);
    expect(result).not.toContain('<script');
    expect(result).toContain('<p>Hello</p>');
  });

  it('should remove event handlers', () => {
    const input = '<p onclick="alert(1)">Click me</p>';
    const result = sanitizeHTML(input);
    expect(result).not.toContain('onclick');
  });

  it('should remove dangerous protocols in links', () => {
    const input = '<a href="javascript:alert(1)">Click</a>';
    const result = sanitizeHTML(input);
    expect(result).not.toContain('javascript:');
  });

  it('should handle empty input', () => {
    expect(sanitizeHTML('')).toBe('');
  });
});

describe('sanitizeURL', () => {
  it('should allow safe protocols', () => {
    expect(sanitizeURL('https://example.com')).toBe('https://example.com');
    expect(sanitizeURL('http://example.com')).toBe('http://example.com');
    expect(sanitizeURL('mailto:test@example.com')).toBe('mailto:test@example.com');
    expect(sanitizeURL('tel:+1234567890')).toBe('tel:+1234567890');
    expect(sanitizeURL('/path/to/page')).toBe('/path/to/page');
  });

  it('should block dangerous protocols', () => {
    expect(sanitizeURL('javascript:alert(1)')).toBe('#');
    expect(sanitizeURL('data:text/html,<script>alert(1)</script>')).toBe('#');
    expect(sanitizeURL('vbscript:msgbox(1)')).toBe('#');
    expect(sanitizeURL('file:///etc/passwd')).toBe('#');
  });

  it('should be case insensitive', () => {
    expect(sanitizeURL('JAVASCRIPT:alert(1)')).toBe('#');
    expect(sanitizeURL('JavaScript:alert(1)')).toBe('#');
  });

  it('should handle empty input', () => {
    expect(sanitizeURL('')).toBe('');
  });
});

describe('escapeHTML', () => {
  it('should escape special characters', () => {
    expect(escapeHTML('<script>alert("XSS")</script>'))
      .toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
  });

  it('should escape all dangerous characters', () => {
    expect(escapeHTML('&<>"\'/')).toBe('&amp;&lt;&gt;&quot;&#x27;&#x2F;');
  });

  it('should handle normal text', () => {
    expect(escapeHTML('Hello world')).toBe('Hello world');
  });

  it('should handle empty input', () => {
    expect(escapeHTML('')).toBe('');
  });
});
