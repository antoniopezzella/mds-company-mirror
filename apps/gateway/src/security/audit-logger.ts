import { appendFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { trace } from '@opentelemetry/api';

export type AuditLogEntry = {
  timestamp: string;
  requestId: string;
  clientIp: string;
  question: string;
  responseStatus: 'success' | 'error' | 'blocked';
  errorReason?: string;
  latencyMs: number;
  citationCount: number;
  userId?: string;
};

class AuditLogger {
  private logDir: string;
  private logFile: string;

  constructor(logDir = 'logs') {
    this.logDir = join(process.cwd(), logDir);
    this.logFile = join(this.logDir, `audit-${this.getDateString()}.jsonl`);
    this.ensureLogDirectory();
  }

  private ensureLogDirectory() {
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir, { recursive: true });
    }
  }

  private getDateString(): string {
    const now = new Date();
    return now.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  private updateLogFileIfNeeded() {
    const currentFile = join(this.logDir, `audit-${this.getDateString()}.jsonl`);
    if (currentFile !== this.logFile) {
      this.logFile = currentFile;
    }
  }

  /**
   * Log an audit entry
   */
  log(entry: AuditLogEntry) {
    const tracer = trace.getTracer('audit');
    return tracer.startActiveSpan('auditLog', (span) => {
      try {
        this.updateLogFileIfNeeded();
        
        const logEntry = {
          ...entry,
          timestamp: new Date().toISOString(),
        };

        // Append to JSONL file (one JSON object per line)
        appendFileSync(this.logFile, JSON.stringify(logEntry) + '\n', 'utf8');
        
        span.setAttribute('audit.status', entry.responseStatus);
        span.setAttribute('audit.latency', entry.latencyMs);
        
        // Also log to console in development
        if (process.env.NODE_ENV !== 'production') {
          console.debug('[AUDIT]', logEntry);
        }
      } catch (error) {
        console.error('Failed to write audit log:', error);
        span.recordException(error as Error);
      } finally {
        span.end();
      }
    });
  }

  /**
   * Log successful query
   */
  logSuccess(
    requestId: string,
    clientIp: string,
    question: string,
    latencyMs: number,
    citationCount: number,
    userId?: string
  ) {
    this.log({
      timestamp: new Date().toISOString(),
      requestId,
      clientIp,
      question,
      responseStatus: 'success',
      latencyMs,
      citationCount,
      userId,
    });
  }

  /**
   * Log blocked/rejected query
   */
  logBlocked(
    requestId: string,
    clientIp: string,
    question: string,
    reason: string,
    userId?: string
  ) {
    this.log({
      timestamp: new Date().toISOString(),
      requestId,
      clientIp,
      question,
      responseStatus: 'blocked',
      errorReason: reason,
      latencyMs: 0,
      citationCount: 0,
      userId,
    });
  }

  /**
   * Log error during processing
   */
  logError(
    requestId: string,
    clientIp: string,
    question: string,
    error: string,
    latencyMs: number,
    userId?: string
  ) {
    this.log({
      timestamp: new Date().toISOString(),
      requestId,
      clientIp,
      question,
      responseStatus: 'error',
      errorReason: error,
      latencyMs,
      citationCount: 0,
      userId,
    });
  }
}

// Singleton instance
export const auditLogger = new AuditLogger();
