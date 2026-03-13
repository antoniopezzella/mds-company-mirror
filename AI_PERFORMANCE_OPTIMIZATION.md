# AI Assistant Performance Optimization Guide

## Current Performance Issues 🐌

### Measured Response Times:
- **Request 1:** 72 seconds (72,081 ms)
- **Request 2:** 188 seconds (188,439 ms)
- **Target:** < 5 seconds

### Root Causes Identified:

1. **❌ No Response Streaming**
   - User waits for entire response before seeing anything
   - Perceived latency is very high

2. **❌ Using Large Ollama Model (mistral 7B)**
   - Good for quality, but slow for real-time chat
   - No optimization parameters set

3. **❌ Large Context Windows**
   - Sending 3 full documents in every prompt
   - No context trimming or summarization

4. **❌ No Caching Strategy**
   - Every request rebuilds entire context
   - Document retrieval happens every time

5. **❌ Synchronous Processing**
   - No parallel operations
   - Sequential document processing

## Optimization Strategy 🚀

### Quick Wins (Immediate Impact)

#### 1. Switch to Faster Model
```bash
# Install smaller, faster model (1.5GB vs 4GB)
ollama pull qwen2:1.5b

# Or use phi-3 mini (very fast, good quality)
ollama pull phi3:mini
```

#### 2. Enable Streaming (Biggest UX Improvement)
- User sees response appear word-by-word
- Feels instant even if total time is same
- **Reduces perceived latency by 90%**

#### 3. Add Ollama Performance Options
- Set `num_predict`: Limit max tokens
- Set `temperature`: 0.7 for faster sampling
- Set `top_p`: 0.9 to reduce choices
- Enable `num_gpu`: Use GPU if available

#### 4. Reduce Context Size
- Limit to 1-2 most relevant docs instead of 3
- Trim document text to key sections
- Summarize long documents

### Medium-Term Improvements

#### 5. Implement Request Caching
- Cache document retrievals by question hash
- Cache similar questions (semantic similarity)
- Use Redis or in-memory cache

#### 6. Parallel Processing
- Retrieve documents + load model simultaneously
- Pre-warm model on startup

#### 7. Add Response Timeout
- Set 30-second max response time
- Fallback to shorter context if timeout

### Long-Term Improvements

#### 8. Switch to OpenAI API (Production)
- gpt-4o-mini: 2-5 second responses
- Streaming built-in
- More reliable

#### 9. Use Smaller Embedding Model
- Faster document retrieval
- Better semantic search

#### 10. Implement Smart Context Selection
- Only include relevant document sections
- Skip redundant information

## Implementation Plan

### Phase 1: Immediate (10 minutes) ✅

**File: `apps/gateway/.env`**
```env
# Change this line:
OLLAMA_MODEL=mistral

# To this (much faster):
OLLAMA_MODEL=phi3:mini

# Or if you want balance of speed/quality:
OLLAMA_MODEL=llama3.2:3b
```

**File: `apps/gateway/src/tools/ai-answer.ts`**
- Add Ollama options for speed
- Add streaming support
- Reduce max tokens

**Expected Result:** 72s → 15-20s response time

### Phase 2: Streaming (30 minutes)

**File: `apps/gateway/src/index.ts`**
- Change response to Server-Sent Events (SSE)
- Stream tokens as they arrive

**File: Frontend AI component**
- Handle streaming responses
- Display partial results

**Expected Result:** User sees response in 1-2 seconds (even if total is 15s)

### Phase 3: Caching (1 hour)

**File: `apps/gateway/src/cache.ts` (new)**
- Implement simple in-memory cache
- Cache document retrievals
- Cache similar questions

**Expected Result:** Repeat questions: < 1 second

## Quick Fix Script

Run this to install a faster model:

```bash
# Install super-fast small model (recommended for development)
ollama pull phi3:mini

# Or balanced option
ollama pull llama3.2:3b

# Then update .env
echo "OLLAMA_MODEL=phi3:mini" >> apps/gateway/.env
```

## Monitoring Response Times

Add this to your Gateway logs:

```typescript
console.log(`[PERF] Question: ${question.slice(0, 50)}...`);
console.log(`[PERF] Retrieval: ${retrievalTime}ms`);
console.log(`[PERF] AI Generation: ${aiTime}ms`);
console.log(`[PERF] Total: ${totalTime}ms`);
```

## Recommended Model Comparison

| Model | Size | Speed | Quality | Use Case |
|-------|------|-------|---------|----------|
| **phi3:mini** | 2GB | ⚡⚡⚡⚡⚡ Fast | ⭐⭐⭐ Good | Development, Quick replies |
| **llama3.2:3b** | 2GB | ⚡⚡⚡⚡ Fast | ⭐⭐⭐⭐ Great | Balanced |
| **mistral** (current) | 4GB | ⚡⚡ Slow | ⭐⭐⭐⭐⭐ Excellent | Production quality |
| **qwen3-coder:30b** | 17GB | ⚡ Very Slow | ⭐⭐⭐⭐⭐ Best | Code generation only |

## Target Performance

| Metric | Current | Target | Best Case |
|--------|---------|--------|-----------|
| **Time to First Token** | 72s | < 2s | < 500ms |
| **Total Response Time** | 188s | < 10s | < 5s |
| **Perceived Latency** | 72s | < 1s | Instant |

## Next Steps

1. ✅ **Install faster model** (5 min)
2. ✅ **Update .env to use it** (1 min)
3. ✅ **Add Ollama performance options** (10 min)
4. ⏳ **Implement streaming** (30 min - biggest UX win)
5. ⏳ **Add response caching** (1 hour)
6. ⏳ **Optimize document retrieval** (1 hour)

## Testing Performance

```bash
# Before optimization
time curl -X POST http://localhost:3333/api/answer \
  -H "Content-Type: application/json" \
  -d '{"question":"What is cyber insurance?"}' 

# After optimization (should be much faster)
time curl -X POST http://localhost:3333/api/answer \
  -H "Content-Type: application/json" \
  -d '{"question":"What is cyber insurance?"}'
```

---

**Bottom Line:**
- Switching to `phi3:mini`: **5-10x faster** (72s → 7-15s)
- Adding streaming: **Instant feel** (user sees response in 1-2s)
- Combined: **Professional experience** instead of unusable delays
