import { trace } from '@opentelemetry/api';

export type ValidationResult = {
  isValid: boolean;
  sanitized: string;
  reason?: string;
};

/**
 * Validates and sanitizes user input to prevent injection attacks
 * and ensure input quality
 */
export function validateAndSanitizeInput(input: string): ValidationResult {
  const tracer = trace.getTracer('security');
  return tracer.startActiveSpan('validateInput', (span) => {
    span.setAttribute('input.length', input.length);
    
    // Check for empty or whitespace-only input
    if (!input || input.trim().length === 0) {
      span.setAttribute('validation.result', 'empty');
      span.end();
      return {
        isValid: false,
        sanitized: '',
        reason: 'Question cannot be empty',
      };
    }

    // Check minimum length (prevent single character spam)
    if (input.trim().length < 3) {
      span.setAttribute('validation.result', 'too_short');
      span.end();
      return {
        isValid: false,
        sanitized: input.trim(),
        reason: 'Question must be at least 3 characters',
      };
    }

    // Check maximum length (prevent DoS via large inputs)
    const MAX_LENGTH = 1000;
    if (input.length > MAX_LENGTH) {
      span.setAttribute('validation.result', 'too_long');
      span.end();
      return {
        isValid: false,
        sanitized: input.substring(0, MAX_LENGTH),
        reason: `Question must be less than ${MAX_LENGTH} characters`,
      };
    }

    // Remove null bytes (security risk)
    let sanitized = input.replace(/\0/g, '');

    // Remove excessive whitespace
    sanitized = sanitized.replace(/\s+/g, ' ').trim();

    // Check for potential script injection attempts
    const scriptPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi, // event handlers like onclick=
      /<iframe/gi,
      /<object/gi,
      /<embed/gi,
    ];

    for (const pattern of scriptPatterns) {
      if (pattern.test(sanitized)) {
        span.setAttribute('validation.result', 'script_injection');
        span.recordException(new Error('Script injection attempt detected'));
        span.end();
        return {
          isValid: false,
          sanitized: sanitized.replace(pattern, ''),
          reason: 'Invalid characters detected in question',
        };
      }
    }

    // Check for SQL injection patterns (even though we don't use SQL)
    const sqlPatterns = [
      /(\bUNION\b.*\bSELECT\b)/gi,
      /(\bDROP\b.*\bTABLE\b)/gi,
      /(\bINSERT\b.*\bINTO\b)/gi,
      /(\bDELETE\b.*\bFROM\b)/gi,
      /--/g, // SQL comments
      /;.*\bDROP\b/gi,
    ];

    for (const pattern of sqlPatterns) {
      if (pattern.test(sanitized)) {
        span.setAttribute('validation.result', 'sql_injection');
        span.recordException(new Error('SQL injection attempt detected'));
        span.end();
        return {
          isValid: false,
          sanitized: sanitized.replace(pattern, ''),
          reason: 'Invalid characters detected in question',
        };
      }
    }

    // Check for command injection patterns
    const commandPatterns = [
      /[;&|`$]/g, // Shell metacharacters
      /\$\(/g, // Command substitution
      /\.\.\//g, // Directory traversal
    ];

    for (const pattern of commandPatterns) {
      if (pattern.test(sanitized)) {
        span.setAttribute('validation.result', 'command_injection');
        span.recordException(new Error('Command injection attempt detected'));
        span.end();
        return {
          isValid: false,
          sanitized: sanitized.replace(pattern, ''),
          reason: 'Invalid characters detected in question',
        };
      }
    }

    // Check for excessive special characters (potential gibberish or attack)
    const specialCharCount = (sanitized.match(/[^a-zA-Z0-9\s.,?!'-]/g) || []).length;
    const specialCharRatio = specialCharCount / sanitized.length;
    
    if (specialCharRatio > 0.3) {
      span.setAttribute('validation.result', 'excessive_special_chars');
      span.end();
      return {
        isValid: false,
        sanitized,
        reason: 'Question contains too many special characters',
      };
    }

    // Check for repeated characters (potential spam)
    if (/(.)\1{10,}/.test(sanitized)) {
      span.setAttribute('validation.result', 'repeated_chars');
      span.end();
      return {
        isValid: false,
        sanitized,
        reason: 'Question contains suspicious repeated characters',
      };
    }

    span.setAttribute('validation.result', 'valid');
    span.setAttribute('sanitized.length', sanitized.length);
    span.end();

    return {
      isValid: true,
      sanitized,
    };
  });
}

/**
 * Check if content contains inappropriate or harmful language
 */
export function containsInappropriateContent(text: string): boolean {
  const lowerText = text.toLowerCase();
  
  // List of inappropriate terms (basic example - in production use a more comprehensive list)
  const inappropriateTerms = [
    'explicit sexual content',
    'violence',
    'hate speech',
    // Add more terms as needed
  ];

  return inappropriateTerms.some(term => lowerText.includes(term));
}

/**
 * Rate limit tracking per IP/user
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(identifier: string, maxRequests = 60, windowMs = 60000): boolean {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  if (!record || now > record.resetTime) {
    requestCounts.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}
