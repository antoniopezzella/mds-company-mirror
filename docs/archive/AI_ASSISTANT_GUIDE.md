# AI Assistant Integration Guide

## Overview

The MDS Platform now includes a fully integrated **AI-powered insurance assistant** that combines:

- **Backend Gateway:** Fastify server with RAG (Retrieval Augmented Generation)
- **Frontend Component:** Material-UI React chat interface
- **Insurance Content:** 10 comprehensive documents (68,000+ words)
- **Enterprise Features:** Security, observability, automated testing

---

## Architecture

```
MDS-Platform/
├── src/
│   └── components/
│       ├── AIAgentBot/          # Floating chat trigger button
│       └── AIAssistantChat/     # Full chat interface
├── apps/
│   └── gateway/                 # AI Backend (Node.js/Fastify)
│       ├── src/
│       │   ├── config/          # App configuration
│       │   ├── security/        # Input validation, audit logging
│       │   ├── rag/             # Document retrieval
│       │   ├── tools/           # OpenAI integration
│       │   ├── observability/   # OpenTelemetry tracing
│       │   ├── eval/            # Quality evaluation suite
│       │   └── index.ts         # Main server
│       └── data/
│           └── approved/        # Insurance documents (10 MD files)
└── docker-compose.yml           # Jaeger for observability
```

---

## Setup Instructions

### Step 1: Install Dependencies

```bash
# Install frontend dependencies (if not already done)
npm install

# Install backend dependencies
cd apps/gateway
npm install
cd ../..
```

### Step 2: Configure Environment

```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-proj-...your-key-here
```

Get your API key from: https://platform.openai.com/api-keys

### Step 3: Run the Application

**Option A: Run both frontend and backend together**
```bash
npm run dev:all
```

**Option B: Run separately**
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
npm run dev:gateway
```

### Step 4: Test the Integration

1. **Open the app:** http://localhost:5173
2. **Click the AI bot** in the bottom-right corner
3. **Ask a question:** "What insurance services does Marsh offer?"
4. **View the response** with citations and suggestions

---

## Using the Components

### AIAgentBot Component

The floating chat trigger button that opens the full chat interface.

```tsx
import { AIAgentBot } from './components/AIAgentBot';

function App() {
  return (
    <div>
      {/* Your app content */}
      
      {/* AI Assistant Bot */}
      <AIAgentBot 
        position={{ bottom: 24, right: 24 }}
        apiEndpoint="http://localhost:3333/api/answer"
      />
    </div>
  );
}
```

**Props:**
- `position` - Custom positioning (default: bottom-right)
- `apiEndpoint` - Backend API URL (optional, defaults to localhost:3333)
- `isOpen` - Initial open state (optional)
- `onOpen` - Callback when opened (optional)

### AIAssistantChat Component

The full-featured chat interface (used internally by AIAgentBot).

```tsx
import { AIAssistantChat } from './components/AIAssistantChat';

function CustomChat() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <AIAssistantChat 
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      apiEndpoint="http://localhost:3333/api/answer"
    />
  );
}
```

---

## Backend API

### Endpoints

**Health Check**
```bash
GET /health
```

**Ask Question**
```bash
POST /api/answer
Content-Type: application/json

{
  "question": "What are cyber insurance rate trends?",
  "conversationHistory": [
    { "role": "user", "content": "Previous question" },
    { "role": "assistant", "content": "Previous answer" }
  ],
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "text": "Based on current market conditions...",
  "citations": [
    { "title": "Market Conditions", "url": "/docs/market_conditions.md" }
  ],
  "suggestions": [
    "What about property insurance rates?",
    "How can I reduce cyber risk?"
  ],
  "latencyMs": 2847
}
```

### Security Features

1. **Input Validation:**
   - Length validation (3-1000 characters)
   - Injection prevention (SQL, script, command)
   - Special character filtering
   - Rate limiting (60 requests/minute)

2. **Audit Logging:**
   - All requests logged to `apps/gateway/logs/`
   - JSONL format for easy parsing
   - Includes timestamps, IPs, latency, status

3. **Rate Limiting:**
   - 60 requests per minute per IP
   - Configurable via environment variables

---

## Insurance Content

The system includes 10 comprehensive documents:

1. **brand_faq.md** (11,000+ words) - Marsh McLennan company coverage
2. **client_journey.md** (6,800+ words) - Client lifecycle
3. **cyber_risk.md** (4,000+ words) - Cyber threats and compliance
4. **emerging_risks.md** (5,900+ words) - Climate, AI, supply chain risks
5. **employee_benefits.md** - Benefits consulting and retention
6. **executive_perspectives.md** (9,200+ words) - CFO, CRO, CISO, HR views
7. **glossary_resources.md** (6,500+ words) - 100+ terms and templates
8. **insurance_services.md** - Marsh insurance offerings
9. **market_conditions.md** (17,500+ words) - Rate trends and market intelligence
10. **small_business_insurance.md** (7,300+ words) - SMB packages and pricing

**Location:** `apps/gateway/data/approved/`

**Adding Documents:**
1. Add new `.md` files to `apps/gateway/data/approved/`
2. Restart the gateway server
3. Documents are automatically indexed

---

## Observability (Optional)

### Enable OpenTelemetry Tracing

1. **Start Jaeger:**
   ```bash
   docker compose up -d jaeger
   ```

2. **Enable tracing in `.env`:**
   ```env
   ENABLE_OTEL=true
   OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
   ```

3. **Restart gateway:**
   ```bash
   npm run dev:gateway
   ```

4. **View traces:**
   - Open http://localhost:16686
   - Select service: `@marsh/gateway`
   - View request traces with timing details

### What You'll See

- Complete request flow visualization
- Individual span timings (validation, retrieval, OpenAI call)
- Error tracking and exceptions
- Performance bottleneck identification

---

## Quality Assurance

### Automated Evaluation Suite

Run comprehensive quality tests:

```bash
npm run gateway:eval
```

**What it tests:**
- ✅ Topic coverage (does answer address the question?)
- ✅ Citations (are approved documents cited?)
- ✅ Latency (responses under 5 seconds?)
- ✅ Accuracy by category (cyber, benefits, insurance, brand)

**Sample output:**
```
🧪 Running AI Assistant Evaluations...
Testing 10 cases

[1/10] Testing: "What are cyber insurance rate trends?"... ✅ (2847ms)
[2/10] Testing: "How can I reduce employee benefits costs?"... ✅ (3102ms)
...

📊 EVALUATION SUMMARY
==========================================
Total Tests:     10
Passed:          9 (90%)
Failed:          1

Avg Latency:     2847ms
Avg Citations:   3.0
```

### Continuous Improvement

- Run evals after adding new documents
- Monitor pass rate (target: 90%+)
- Check latency (target: <3s average)
- Review failed tests for content gaps

---

## Deployment

### Production Checklist

1. **Environment Variables:**
   ```env
   NODE_ENV=production
   OPENAI_API_KEY=sk-proj-...
   PORT=3333
   ALLOWED_ORIGINS=https://yourdomain.com
   ```

2. **Build Backend:**
   ```bash
   npm run build:gateway
   ```

3. **Start Production Server:**
   ```bash
   cd apps/gateway
   npm start
   ```

4. **Deploy Frontend:**
   ```bash
   npm run build
   # Deploy dist/ to your hosting provider
   ```

### Hosting Options

**Backend:**
- Railway (recommended)
- Render
- AWS/Azure
- Docker container

**Frontend:**
- Vercel (recommended)
- Netlify
- Cloudflare Pages

### Environment Setup

Update frontend API endpoint for production:

```tsx
<AIAgentBot 
  apiEndpoint="https://your-api-domain.com/api/answer"
/>
```

---

## Troubleshooting

### Common Issues

**1. "OpenAI API error"**
- Check `.env` has valid `OPENAI_API_KEY`
- Verify API key has credits: https://platform.openai.com/usage
- Check network connectivity

**2. "CORS error"**
- Add frontend URL to `ALLOWED_ORIGINS` in `.env`
- Restart gateway server

**3. "No documents found"**
- Verify files exist in `apps/gateway/data/approved/`
- Check file permissions
- Ensure files have `.md` extension

**4. "Rate limit exceeded"**
- Wait 60 seconds
- Adjust rate limit in `apps/gateway/src/index.ts`

**5. Backend won't start**
- Check port 3333 is available
- Install dependencies: `cd apps/gateway && npm install`
- Check Node.js version: `node --version` (should be 22.x)

### Debug Mode

Enable detailed logging:

```env
NODE_ENV=development
```

View logs in terminal and `apps/gateway/logs/`

---

## Contributing

### Adding New Documents

1. Create `.md` file in `apps/gateway/data/approved/`
2. Start with `# Title` as first line
3. Use clear sections and formatting
4. Restart gateway to index new content

### Improving Responses

Edit `apps/gateway/src/tools/ai-answer.ts`:
- Adjust prompt template
- Modify temperature (0-1, lower = more focused)
- Change model (gpt-4o-mini, gpt-4, etc.)

### Adding Evaluation Cases

Edit `apps/gateway/src/eval/test-cases.ts`:

```typescript
{
  question: "Your test question?",
  category: "insurance",
  expectedTopics: ["key", "topics", "to", "cover"],
  expectedCitations: ["document_name"]
}
```

---

## Performance Tips

1. **Cache documents in memory** (already implemented)
2. **Use gpt-4o-mini** for cost efficiency (already configured)
3. **Limit conversation history** to last 5 exchanges
4. **Enable rate limiting** in production
5. **Monitor OpenAI usage** via dashboard

---

## Cost Estimation

**OpenAI API Costs (gpt-4o-mini):**
- Average query: ~1,500 tokens
- Cost per query: ~$0.0003
- 1,000 queries: ~$0.30
- 10,000 queries: ~$3.00

Very affordable for internal use or demos!

---

## Support

**Issues:** https://github.com/mmctech/MarshDesignSystem/issues

**Documentation:**
- Backend: `apps/gateway/README.md`
- Main: `README.md`
- Deployment: `DEPLOYMENT.md`

---

## License

See main project LICENSE file.
