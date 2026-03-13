# Security Guide

## Overview
This guide outlines security measures implemented in the Marsh Design System to protect against malicious injection attacks, XSS, CSRF, and other common web vulnerabilities.

## 🛡️ Security Measures Implemented

### 1. Content Security Policy (CSP)
**Location**: `index.html`

The application implements a strict Content Security Policy to prevent XSS attacks:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' data: https: blob:;
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
" />
```

**Key Features**:
- `default-src 'self'` - Only allow resources from same origin
- `frame-ancestors 'none'` - Prevent clickjacking
- `base-uri 'self'` - Prevent base tag injection
- `form-action 'self'` - Restrict form submissions
- `upgrade-insecure-requests` - Force HTTPS

**Note**: `unsafe-inline` and `unsafe-eval` are currently enabled for Vite HMR in development. For production, consider using nonce-based CSP.

### 2. Security Headers
**Location**: `index.html`

Additional HTTP security headers are implemented:

```html
<!-- Prevent MIME-type sniffing -->
<meta http-equiv="X-Content-Type-Options" content="nosniff" />

<!-- Prevent clickjacking -->
<meta http-equiv="X-Frame-Options" content="DENY" />

<!-- Control referrer information -->
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />

<!-- Restrict browser features -->
<meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()" />
```

### 3. Input Sanitization Utilities
**Location**: `src/utils/security/sanitizer.ts`

Comprehensive sanitization functions to clean user input:

#### **sanitizeInput(input: string)**
Basic sanitization for text inputs:
- Removes `<` and `>` characters
- Strips `javascript:` protocol
- Removes event handlers (`onclick`, `onload`, etc.)

```typescript
import { sanitizeInput } from '@/utils/security/sanitizer';

const userInput = sanitizeInput(formData.name);
```

#### **sanitizeHTML(html: string)**
Sanitizes HTML content while preserving safe tags:
- Allows: `b`, `i`, `em`, `strong`, `p`, `br`, `span`, `div`
- Removes: `<script>` tags, event handlers, dangerous attributes

```typescript
import { sanitizeHTML } from '@/utils/security/sanitizer';

const safeContent = sanitizeHTML(userGeneratedHTML);
```

#### **sanitizeURL(url: string)**
Validates and sanitizes URLs:
- Blocks: `javascript:`, `data:`, `vbscript:`, `file:` protocols
- Allows: `http:`, `https:`, `mailto:`, `tel:`, relative paths

```typescript
import { sanitizeURL } from '@/utils/security/sanitizer';

const safeLink = sanitizeURL(userProvidedLink);
```

#### **escapeHTML(text: string)**
Escapes special characters for safe rendering:
- Converts: `&`, `<`, `>`, `"`, `'`, `/` to HTML entities

```typescript
import { escapeHTML } from '@/utils/security/sanitizer';

const escaped = escapeHTML(userComment);
```

### 4. React Hooks for Safe Input Handling
**Location**: `src/hooks/useSanitizedInput.ts`

Custom hooks for form inputs with built-in sanitization:

#### **useSanitizedInput(initialValue)**
General purpose input sanitization:

```typescript
import { useSanitizedInput } from '@/hooks/useSanitizedInput';

const MyForm = () => {
  const name = useSanitizedInput('');
  
  return (
    <input
      value={name.value}
      onChange={(e) => name.handleChange(e.target.value)}
      error={name.error}
    />
  );
};
```

#### **useSanitizedEmail(initialValue)**
Email-specific validation and sanitization:

```typescript
import { useSanitizedEmail } from '@/hooks/useSanitizedInput';

const EmailForm = () => {
  const email = useSanitizedEmail('');
  
  const handleSubmit = () => {
    if (email.validate()) {
      // Safe to submit
    }
  };
};
```

### 5. SQL Injection Detection
**Location**: `src/utils/security/sanitizer.ts`

Utility to detect potential SQL injection patterns:

```typescript
import { containsSQLInjection } from '@/utils/security/sanitizer';

if (containsSQLInjection(userInput)) {
  console.error('Potential SQL injection detected');
  // Block request
}
```

**Detects**:
- SQL keywords: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `DROP`, etc.
- SQL operators: `--`, `;`, `/*`, `*/`
- Union-based injection: `UNION SELECT`
- Boolean-based injection: `OR 1=1`

### 6. Rate Limiting
**Location**: `src/utils/security/sanitizer.ts`

Client-side rate limiting to prevent abuse:

```typescript
import { rateLimiter } from '@/utils/security/sanitizer';

const handleAction = (userId: string) => {
  // Allow max 100 requests per minute per user
  if (!rateLimiter.isAllowed(userId, 100, 60000)) {
    console.error('Rate limit exceeded');
    return;
  }
  
  // Process request
};
```

### 7. Filename Sanitization
**Location**: `src/utils/security/sanitizer.ts`

Prevent path traversal in file uploads:

```typescript
import { sanitizeFilename } from '@/utils/security/sanitizer';

const safeFilename = sanitizeFilename(uploadedFile.name);
// Removes: ../, special characters, limits length
```

## 🔒 Best Practices

### 1. Never Use `dangerouslySetInnerHTML`
React's `dangerouslySetInnerHTML` bypasses XSS protection. If you must use it:

```typescript
import { sanitizeHTML } from '@/utils/security/sanitizer';

// ❌ Dangerous
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ Safe
<div dangerouslySetInnerHTML={{ __html: sanitizeHTML(userContent) }} />
```

### 2. Always Sanitize URL Parameters
```typescript
import { sanitizeInput } from '@/utils/security/sanitizer';

const params = new URLSearchParams(window.location.search);
const userId = sanitizeInput(params.get('userId') || '');
```

### 3. Validate on Both Client and Server
Client-side validation is for UX. Always validate on the server:

```typescript
// Client-side (UX)
if (!validateEmail(email)) {
  setError('Invalid email');
  return;
}

// Server-side (Security)
// Validate again in your API endpoint
```

### 4. Use Prepared Statements for Database Queries
If using a backend, always use parameterized queries:

```typescript
// ❌ Vulnerable to SQL injection
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ Safe with prepared statements
const query = 'SELECT * FROM users WHERE id = ?';
db.execute(query, [userId]);
```

### 5. Sanitize Before Storing
Sanitize data before storing in databases:

```typescript
const userData = {
  name: sanitizeInput(formData.name),
  email: sanitizeInput(formData.email),
  bio: sanitizeHTML(formData.bio),
};
```

## 🚨 Common Attack Vectors & Mitigations

| Attack Type | Description | Mitigation |
|------------|-------------|-----------|
| **XSS (Cross-Site Scripting)** | Injecting malicious scripts into web pages | CSP headers, input sanitization, React's built-in escaping |
| **SQL Injection** | Inserting SQL commands into input fields | Input validation, prepared statements, SQL pattern detection |
| **Clickjacking** | Tricking users to click on hidden elements | `X-Frame-Options: DENY`, CSP `frame-ancestors 'none'` |
| **MIME Sniffing** | Browser guessing file types incorrectly | `X-Content-Type-Options: nosniff` |
| **Path Traversal** | Accessing files outside intended directory | Filename sanitization, whitelist allowed paths |
| **Rate Limiting** | Overwhelming with too many requests | Client-side rate limiter, server-side throttling |

## 📋 Security Checklist

- [x] Content Security Policy implemented
- [x] Security headers added (X-Frame-Options, X-Content-Type-Options, etc.)
- [x] Input sanitization utilities created
- [x] React hooks for safe input handling
- [x] SQL injection detection
- [x] URL sanitization
- [x] Filename sanitization for uploads
- [x] Rate limiting utility
- [ ] HTTPS enforced (configure in deployment)
- [ ] Regular dependency audits (`npm audit`)
- [ ] Server-side validation (API endpoints)
- [ ] CSRF tokens for state-changing requests
- [ ] Secure authentication (JWT, OAuth)
- [ ] Subresource Integrity (SRI) for CDN assets
- [ ] Security incident response plan
- [ ] Regular penetration testing

## 🔧 Production Hardening

### For Production Deployment:

1. **Stricter CSP**:
   - Remove `unsafe-inline` and `unsafe-eval`
   - Implement nonce-based CSP for Vite scripts
   - Add `report-uri` for CSP violation reporting

2. **Server-Side Headers**:
   Configure in Netlify/Vercel/nginx:
   ```
   X-Frame-Options: DENY
   X-Content-Type-Options: nosniff
   Strict-Transport-Security: max-age=31536000; includeSubDomains
   ```

3. **HTTPS Only**:
   - Force HTTPS redirects
   - Use secure cookies: `Secure; HttpOnly; SameSite=Strict`

4. **Dependency Audits**:
   ```bash
   npm audit
   npm audit fix
   ```

5. **Environment Variables**:
   - Never commit secrets to git
   - Use `.env` files with `.gitignore`
   - Rotate credentials regularly

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

## 🆘 Reporting Security Issues

If you discover a security vulnerability, please:
1. **Do not** open a public issue
2. Email security@marsh.com (or appropriate contact)
3. Include detailed steps to reproduce
4. Allow time for fix before public disclosure

---

**Last Updated**: 2025-01-XX  
**Version**: 1.0.0
