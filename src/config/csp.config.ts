/**
 * Environment-specific Content Security Policy configurations
 */

export const CSP_CONFIG = {
  development: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'", // Required for Vite HMR
      "'unsafe-eval'", // Required for Vite HMR
      'https://fonts.googleapis.com',
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for styled-components/emotion
      'https://fonts.googleapis.com',
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com',
      'data:',
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'blob:',
    ],
    'connect-src': [
      "'self'",
      'ws:', // Required for Vite HMR
      'wss:', // Required for Vite HMR
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'upgrade-insecure-requests': [],
  },

  production: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      // Remove unsafe-inline and unsafe-eval in production
      // Use nonce-based CSP instead
    ],
    'style-src': [
      "'self'",
      'https://fonts.googleapis.com',
      // Use nonce for inline styles
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com',
      'data:',
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'blob:',
    ],
    'connect-src': [
      "'self'",
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'upgrade-insecure-requests': [],
    'block-all-mixed-content': [],
  },
};

/**
 * Convert CSP config object to CSP header string
 */
export function generateCSPHeader(config: typeof CSP_CONFIG.production): string {
  return Object.entries(config)
    .map(([directive, sources]) => {
      if (sources.length === 0) {
        return directive;
      }
      return `${directive} ${sources.join(' ')}`;
    })
    .join('; ');
}

/**
 * Get CSP configuration based on environment
 */
export function getCSPConfig(): string {
  const env = process.env.NODE_ENV || 'development';
  const config = env === 'production' ? CSP_CONFIG.production : CSP_CONFIG.development;
  return generateCSPHeader(config);
}
