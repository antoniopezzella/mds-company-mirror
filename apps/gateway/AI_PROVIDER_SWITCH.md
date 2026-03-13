# AI Provider Configuration

## Current Setup: Ollama (Testing)

The gateway is now configured to use **Ollama** by default for testing.

### Prerequisites for Ollama

Make sure Ollama is running:
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# If not running, start Ollama
ollama serve

# Pull the llama3 model if you haven't
ollama pull llama3
```

### Switch Between Providers

Edit `apps/gateway/.env`:

**For Testing (Ollama - FREE):**
```env
AI_PROVIDER=ollama
OLLAMA_MODEL=llama3
OLLAMA_API_URL=http://localhost:11434
```

**For Production (OpenAI):**
```env
AI_PROVIDER=openai
# No need to set OLLAMA variables
```

### Quick Commands

**Start Gateway with Ollama (default):**
```bash
npm run dev:gateway
# or from root:
npm run dev:all
```

**Test if working:**
```bash
curl -X POST http://localhost:3333/api/answer \
  -H "Content-Type: application/json" \
  -d '{"question":"What is cyber insurance?"}'
```

### Available Ollama Models

You can change the model in `.env`:
- `llama3` (default, 8B parameters)
- `llama3:70b` (larger, more accurate)
- `mistral`
- `mixtral`

Example:
```env
OLLAMA_MODEL=mistral
```

### Troubleshooting

**Gateway not connecting to Ollama?**
1. Check Ollama is running: `ollama list`
2. Check the API endpoint: `curl http://localhost:11434/api/tags`
3. Restart gateway: Stop and run `npm run dev:gateway` again

**Want to use OpenAI instead?**
Just change one line in `.env`:
```env
AI_PROVIDER=openai
```
Then restart the gateway.
