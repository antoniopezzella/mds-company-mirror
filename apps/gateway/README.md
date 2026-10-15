# AI Assistant Backend Configuration

## Quick Start

1. Copy this file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your OpenAI API key to `.env`:
   ```
   OPENAI_API_KEY=sk-...
   ```

3. Install gateway dependencies:
   ```bash
   cd apps/gateway && npm install
   ```

4. Run the AI assistant:
   ```bash
   npm run dev:gateway
   ```

## Configuration Options

### Required

- `OPENAI_API_KEY` - Your OpenAI API key from https://platform.openai.com/api-keys

### Optional

- `PORT` - Backend server port (default: 3333)
- `APP_NAME` - Application name (default: Marsh AI Assistant)
- `ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins
- `ENABLE_OTEL` - Enable OpenTelemetry tracing (default: false)
- `OTEL_EXPORTER_OTLP_ENDPOINT` - Jaeger endpoint for traces

## Running with Vite Frontend

To run both the frontend and backend together:

```bash
npm run dev:all
```

This will start:
- Vite dev server on http://localhost:5173
- AI Gateway on http://localhost:3333

## Testing the API

Health check:
```bash
curl http://localhost:3333/health
```

Ask a question:
```bash
curl -X POST http://localhost:3333/api/answer \
  -H "Content-Type: application/json" \
  -d '{"question": "What insurance services does Marsh offer?"}'
```

## Observability (Optional)

To enable OpenTelemetry tracing with Jaeger:

1. Start Jaeger:
   ```bash
   docker compose up -d jaeger
   ```

2. Enable tracing in `.env`:
   ```
   ENABLE_OTEL=true
   OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
   ```

3. View traces at http://localhost:16686

## Evaluation Suite

Run automated quality tests:

```bash
npm run gateway:eval
```

This tests the AI responses for:
- Topic coverage
- Citation quality
- Response latency
- Accuracy by category
