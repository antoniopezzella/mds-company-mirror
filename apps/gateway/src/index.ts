import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import rateLimit from '@fastify/rate-limit';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { join } from 'node:path';
import { z } from 'zod';
import { AppConfig } from './config/app';
import { loadDocs, retrieve } from './rag/retriever';
import { composeAIAnswer, composeAIAnswerStream } from './tools/ai-answer';
import { validateAndSanitizeInput, containsInappropriateContent } from './security/input-validator';
import { auditLogger } from './security/audit-logger';

export function buildServer() {
  const app = Fastify({ 
    logger: true,
    genReqId: (req) => req.headers['x-request-id'] as string || crypto.randomUUID(),
  });
  
  const docs = loadDocs(join(process.cwd(), AppConfig.docsDir));

  // Security middleware
  app.register(helmet, {
    contentSecurityPolicy: false, // Temporarily disable for debugging
  });

  app.register(cors, {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3333', 'http://localhost:5173'],
    credentials: true,
  });

  app.register(fastifyStatic, { 
    root: join(process.cwd(), AppConfig.publicDir),
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  });
  
  app.register(rateLimit, { 
    max: 60, 
    timeWindow: 60_000,
    errorResponseBuilder: () => ({
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
    }),
  });

  app.get('/', async () => ({ 
    ok: true, 
    app: AppConfig.name,
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api/answer'
    }
  }));

  app.get('/health', async () => ({ ok: true, app: AppConfig.name }));

  const Body = z.object({ 
    question: z.string().min(3).max(1000),
    conversationHistory: z.array(z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string()
    })).optional(),
    sessionId: z.string().optional()
  });
  
  app.post('/api/answer', async (req, reply) => {
    const startTime = Date.now();
    const requestId = req.id;
    const clientIp = req.ip;
    
    // Validate request body
    const parsed = Body.safeParse(req.body);
    if (!parsed.success) {
      auditLogger.logBlocked(requestId, clientIp, '', 'Invalid request format');
      return reply.status(400).send({ error: 'Invalid question format' });
    }

    const { question, conversationHistory, sessionId } = parsed.data;

    // Validate and sanitize input
    const validation = validateAndSanitizeInput(question);
    if (!validation.isValid) {
      auditLogger.logBlocked(requestId, clientIp, question, validation.reason || 'Validation failed');
      return reply.status(400).send({ 
        error: validation.reason || 'Invalid question',
        message: 'Please rephrase your question and try again.',
      });
    }

    // Check for inappropriate content
    if (containsInappropriateContent(validation.sanitized)) {
      auditLogger.logBlocked(requestId, clientIp, question, 'Inappropriate content detected');
      return reply.status(400).send({ 
        error: 'Question contains inappropriate content',
        message: 'Please ask questions related to insurance and risk management.',
      });
    }

    try {
      // Process the sanitized question
      const hits = retrieve(validation.sanitized, docs, 3);
      const out = await composeAIAnswer(validation.sanitized, hits, conversationHistory);
      const latencyMs = Date.now() - startTime;

      // Audit log successful request
      auditLogger.logSuccess(
        requestId,
        clientIp,
        validation.sanitized,
        latencyMs,
        out.citations.length
      );

      return { ...out, latencyMs };
    } catch (error) {
      const latencyMs = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      auditLogger.logError(requestId, clientIp, validation.sanitized, errorMessage, latencyMs);
      
      app.log.error({ error, requestId }, 'Error processing request');
      
      return reply.status(500).send({
        error: 'Sorry, I encountered an error processing your request. Please try again.',
      });
    }
  });

  // SSE Streaming endpoint
  app.post('/api/answer-stream', async (req, reply) => {
    const requestId = req.id;
    const clientIp = req.ip;

    // Validate request body
    const parsed = Body.safeParse(req.body);
    if (!parsed.success) {
      auditLogger.logBlocked(requestId, clientIp, '', 'Invalid request format');
      return reply.status(400).send({ error: 'Invalid question format' });
    }

    const { question, conversationHistory } = parsed.data;

    // Validate and sanitize input
    const validation = validateAndSanitizeInput(question);
    if (!validation.isValid) {
      auditLogger.logBlocked(requestId, clientIp, question, validation.reason || 'Validation failed');
      return reply.status(400).send({
        error: validation.reason || 'Invalid question',
        message: 'Please rephrase your question and try again.',
      });
    }

    // Check for inappropriate content
    if (containsInappropriateContent(validation.sanitized)) {
      auditLogger.logBlocked(requestId, clientIp, question, 'Inappropriate content detected');
      return reply.status(400).send({
        error: 'Question contains inappropriate content',
        message: 'Please ask questions related to insurance and risk management.',
      });
    }

    try {
      // Set SSE headers
      reply.raw.setHeader('Content-Type', 'text/event-stream');
      reply.raw.setHeader('Cache-Control', 'no-cache');
      reply.raw.setHeader('Connection', 'keep-alive');
      reply.raw.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
      reply.raw.setHeader('X-Accel-Buffering', 'no'); // Disable nginx buffering

      const hits = retrieve(validation.sanitized, docs, 3);
      const stream = composeAIAnswerStream(validation.sanitized, hits, conversationHistory);

      for await (const chunk of stream) {
        const data = JSON.stringify(chunk);
        reply.raw.write(`data: ${data}\n\n`);
      }

      reply.raw.end();
      
      auditLogger.logSuccess(requestId, clientIp, validation.sanitized, 0, hits.length);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      auditLogger.logError(requestId, clientIp, validation.sanitized, errorMessage, 0);
      
      app.log.error({ error, requestId }, 'Error in streaming request');
      
      reply.raw.write(`data: ${JSON.stringify({ error: 'Stream error', done: true })}\n\n`);
      reply.raw.end();
    }
  });

  return app;
}
