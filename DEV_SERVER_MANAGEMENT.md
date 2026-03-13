# Development Server Management

## Fixed Issues ✅

### Problem
The AI Assistant (Gateway) wasn't starting automatically with `npm run dev`, causing:
- Manual startup required every time
- Orphaned processes blocking ports (EADDRINUSE errors)
- Gateway not responding to AI questions
- Confusion about which services are running

### Root Causes
1. **`npm run dev` only started Vite** (frontend on port 5176)
2. **Gateway had to be started separately** with `npm run dev:gateway`
3. **No automatic cleanup** of orphaned processes
4. **`dev:all` script used unreliable `&` operator** instead of proper concurrent execution

## Solution Implemented ✨

### 1. Installed `concurrently`
- Properly runs multiple Node.js processes simultaneously
- Handles cleanup when stopping (Ctrl+C kills all child processes)
- Color-coded output for better visibility

### 2. Created Cleanup Script
**`scripts/cleanup-ports.js`** - Runs before starting dev servers
- Kills orphaned processes on ports 3333, 5173, 5176
- Clears stuck tsx/vite/npm processes
- Prevents EADDRINUSE errors

### 3. Updated npm Scripts

**Before:**
```json
"dev": "vite",                           // ❌ Only frontend
"dev:gateway": "cd apps/gateway && npm run dev",
"dev:all": "npm run dev & npm run dev:gateway"  // ❌ Unreliable
```

**After:**
```json
"predev": "node scripts/cleanup-ports.js",      // ✅ Auto cleanup
"dev": "concurrently --kill-others --names \"VITE,GATEWAY\" -c \"cyan,magenta\" \"vite\" \"cd apps/gateway && npm run dev\"",  // ✅ Both services
"dev:frontend": "vite",                         // ✅ Frontend only
"dev:gateway": "cd apps/gateway && npm run dev" // ✅ Gateway only
```

## How to Use 🚀

### Start Everything (Recommended)
```bash
npm run dev
```
**This now starts:**
- ✅ Vite frontend (port 5176) - cyan output
- ✅ Gateway AI backend (port 3333) - magenta output
- ✅ Auto cleanup before starting
- ✅ Ctrl+C stops everything cleanly

### Start Services Individually (If Needed)
```bash
# Frontend only
npm run dev:frontend

# Gateway only  
npm run dev:gateway
```

### Manual Cleanup (If Something Goes Wrong)
```bash
node scripts/cleanup-ports.js
```

## What You'll See 👀

```
🧹 Cleaning up orphaned processes...
✓ Cleared port 3333
✓ Cleared port 5173
✓ Cleared port 5176
✅ Cleanup complete!

[VITE]    VITE v7.0.0  ready in 234 ms
[VITE]    ➜  Local:   http://localhost:5176/
[GATEWAY] Server listening at http://0.0.0.0:3333
[GATEWAY] Gateway running on http://localhost:3333
```

## Services Running

| Service | Port | URL | Purpose |
|---------|------|-----|---------|
| **Vite Frontend** | 5176 | http://localhost:5176 | React app with AI assistant UI |
| **Gateway Backend** | 3333 | http://localhost:3333 | AI API (Ollama/OpenAI integration) |
| **Storybook** | 6006 | http://localhost:6006 | Component library (separate: `npm run storybook`) |

## Troubleshooting 🔧

### "Port already in use" Error
```bash
# Run cleanup manually
node scripts/cleanup-ports.js

# Then try again
npm run dev
```

### Gateway Not Responding
1. Check if Ollama is running: `curl http://localhost:11434/api/tags`
2. Check Gateway logs in terminal (magenta output)
3. Verify `.env` file exists in `apps/gateway/`

### "tsx watch" Process Won't Die
```bash
# Nuclear option - kill all Node processes
pkill -9 -f tsx
pkill -9 -f node

# Then restart
npm run dev
```

## Environment Variables 📝

**`apps/gateway/.env`** must exist with:
```env
AI_PROVIDER=ollama
OLLAMA_MODEL=mistral
OLLAMA_API_URL=http://localhost:11434
PORT=3333
ALLOWED_ORIGINS=http://localhost:3333,http://localhost:5173
NODE_ENV=development
```

## Architecture 🏗️

```
┌─────────────────────────────────────────────┐
│  Browser (http://localhost:5176)           │
│  ┌─────────────────────────────────────┐   │
│  │   React App (Vite)                  │   │
│  │   - UI Components                   │   │
│  │   - AI Assistant Interface          │   │
│  └─────────────┬───────────────────────┘   │
└────────────────┼───────────────────────────┘
                 │ HTTP POST /api/answer
                 ▼
┌────────────────────────────────────────────┐
│  Gateway (http://localhost:3333)          │
│  ┌───────────────────────────────────┐    │
│  │  Fastify API Server               │    │
│  │  - Request validation             │    │
│  │  - RAG (document retrieval)       │    │
│  │  - AI provider integration        │    │
│  └────────────┬──────────────────────┘    │
└───────────────┼────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────┐
│  Ollama (http://localhost:11434)          │
│  - LLM inference (mistral, qwen, etc)     │
│  - Runs locally on your machine           │
└────────────────────────────────────────────┘
```

## Testing the Fix ✅

1. **Stop all running servers** (if any)
2. **Run:** `npm run dev`
3. **Verify:**
   - You see both VITE and GATEWAY output
   - http://localhost:5176 loads
   - http://localhost:3333/health returns 200 (or create this endpoint)
4. **Test AI Assistant:**
   - Ask a question in the UI
   - Should get a response (not hang)

## Key Changes Summary

- ✅ `npm run dev` now starts **both** frontend and backend automatically
- ✅ Automatic cleanup prevents port conflicts
- ✅ Proper process management (Ctrl+C stops everything)
- ✅ Color-coded logs for easy debugging
- ✅ `dev:frontend` and `dev:gateway` still work individually

**Before:** Required 2 terminal windows + manual cleanup
**After:** Single command, automatic cleanup, clean shutdown
