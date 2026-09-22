import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import rateLimit from '@fastify/rate-limit';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { join } from 'node:path';
import { z } from 'zod';
import { createUIMessageStream, pipeUIMessageStreamToResponse } from 'ai';
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

    const { question, conversationHistory, sessionId: _sessionId } = parsed.data;

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
      const hits = retrieve(validation.sanitized, docs, 3);

      // Re-envelopes composeAIAnswerStream's existing {token?, citations?,
      // done?} generator into the Vercel AI SDK's UI Message Stream
      // protocol — the same protocol api/chat-stream.ts (the Vercel Edge
      // Function) now emits — so AIAssistantChat.tsx's useChat() can talk to
      // whichever of the two backends actually serves a given page.
      // composeAIAnswerStream itself, and retrieval above, are untouched.
      const textId = crypto.randomUUID();
      const uiStream = createUIMessageStream({
        execute: async ({ writer }) => {
          writer.write({ type: 'start' });
          writer.write({ type: 'text-start', id: textId });
          try {
            for await (const chunk of composeAIAnswerStream(validation.sanitized, hits, conversationHistory)) {
              if (chunk.token) writer.write({ type: 'text-delta', id: textId, delta: chunk.token });
              if (chunk.citations) writer.write({ type: 'data-citations', data: chunk.citations });
            }
          } finally {
            writer.write({ type: 'text-end', id: textId });
            writer.write({ type: 'finish' });
          }
        },
      });

      await pipeUIMessageStreamToResponse({
        response: reply.raw,
        stream: uiStream,
        headers: { 'Access-Control-Allow-Origin': req.headers.origin || '*' },
      });

      auditLogger.logSuccess(requestId, clientIp, validation.sanitized, 0, hits.length);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      auditLogger.logError(requestId, clientIp, validation.sanitized, errorMessage, 0);

      app.log.error({ error, requestId }, 'Error in streaming request');

      // pipeUIMessageStreamToResponse sends headers before pulling the
      // first chunk, so a rejection reaching here after streaming started
      // has already committed a 200 — just end the connection. Only a
      // failure before that point (e.g. retrieve() throwing) can still use
      // a normal Fastify error response.
      if (!reply.raw.headersSent) {
        reply.status(500).send({ error: 'Sorry, I encountered an error processing your request. Please try again.' });
      } else {
        reply.raw.end();
      }
    }
  });

  return app;
}
