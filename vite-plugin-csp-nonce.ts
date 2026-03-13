/**
 * Vite plugin to inject nonce for Content Security Policy
 */
import { Plugin } from 'vite';
import crypto from 'crypto';

export function cspNoncePlugin(): Plugin {
  let nonce: string;

  return {
    name: 'csp-nonce',
    
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Generate a new nonce for each request
        nonce = crypto.randomBytes(16).toString('base64');
        
        // Store nonce in response locals for use in HTML transform
        (res as any).locals = (res as any).locals || {};
        (res as any).locals.cspNonce = nonce;
        
        next();
      });
    },

    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        // In production, use a static nonce (will be replaced by server)
        const nonceValue = process.env.NODE_ENV === 'production' 
          ? '{{CSP_NONCE}}' // Placeholder for server-side replacement
          : nonce || crypto.randomBytes(16).toString('base64');

        // Add nonce to all script tags
        html = html.replace(
          /<script/g,
          `<script nonce="${nonceValue}"`
        );

        // Add nonce to all style tags
        html = html.replace(
          /<style/g,
          `<style nonce="${nonceValue}"`
        );

        // Update CSP meta tag to use nonce instead of unsafe-inline
        if (process.env.NODE_ENV === 'production') {
          html = html.replace(
            /script-src 'self' 'unsafe-inline' 'unsafe-eval'/g,
            `script-src 'self' 'nonce-${nonceValue}'`
          );
          
          html = html.replace(
            /style-src 'self' 'unsafe-inline'/g,
            `style-src 'self' 'nonce-${nonceValue}'`
          );
        }

        return html;
      }
    }
  };
}
