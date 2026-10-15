import { ChatOpenAI } from '@langchain/openai';
import type { Ollama as OllamaType } from 'ollama';
let Ollama: typeof import('ollama').Ollama | null = null;
try {
  // Dynamic import for compatibility with ESM/TypeScript
  Ollama = (await import('ollama')).Ollama;
} catch {
  Ollama = null;
}
import type { Doc } from '../rag/retriever';
import { trace } from '@opentelemetry/api';

const model = new ChatOpenAI({
  modelName: 'gpt-4o-mini',
  temperature: 0.3,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

type ConversationTurn = { role: 'user' | 'assistant'; content: string };

// Streaming version for SSE
export async function* composeAIAnswerStream(
  question: string,
  docs: Doc[],
  conversationHistory?: ConversationTurn[]
): AsyncGenerator<{ token?: string; citations?: { title: string; url: string }[]; done?: boolean }> {
  if (!docs.length) {
    yield { token: "I couldn't find relevant information in our approved documents to answer your question. Could you rephrase or ask about insurance, risk management, or employee benefits?" };
    yield { done: true };
    return;
  }

  const topDocs = docs.slice(0, 2);
  const context = topDocs.map((doc, i) => {
    const trimmedText = doc.text.length > 500 ? doc.text.substring(0, 500) + '...' : doc.text;
    return `Document ${i + 1}: ${doc.title}\n${trimmedText}`;
  }).join('\n\n---\n\n');

  let conversationContext = '';
  if (conversationHistory && conversationHistory.length > 0) {
    conversationContext = '\n\nPrevious conversation:\n' +
      conversationHistory.map(turn => `${turn.role}: ${turn.content}`).join('\n') + '\n';
  }

  const prompt = `You are a Marsh insurance assistant. Answer concisely based on the documents below.${conversationContext}

Context: ${context}

Question: ${question}

Instructions:
- Answer in 2-3 paragraphs MAX
- Only use document information
- End with "SUGGESTIONS:" and 2 follow-up questions

Answer:`;

  try {
    if (process.env.AI_PROVIDER === 'ollama' && Ollama) {
      // Mirrors composeAIAnswer's non-streaming Ollama branch below, just
      // with stream: true and iterated as an AsyncGenerator instead of
      // awaited as a single response.
      if (process.env.OLLAMA_API_URL) {
        process.env.OLLAMA_BASE_URL = process.env.OLLAMA_API_URL;
      }
      const ollama: OllamaType = new Ollama();
      const stream = await ollama.chat({
        model: process.env.OLLAMA_MODEL || 'llama3',
        messages: [{ role: 'user', content: prompt }],
        stream: true,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          num_predict: 500,
          num_ctx: 2048,
          repeat_penalty: 1.1,
        },
      });

      for await (const part of stream) {
        const content = part.message?.content;
        if (content) {
          yield { token: content };
        }
      }
    } else {
      // Stream from OpenAI
      const stream = await model.stream(prompt);

      for await (const chunk of stream) {
        const content = typeof chunk.content === 'string' ? chunk.content : '';
        if (content) {
          yield { token: content };
        }
      }
    }

    // Send citations at the end
    yield {
      citations: docs.map(d => ({ title: d.title, url: d.url })),
      done: true
    };
  } catch (error) {
    console.error('Streaming error:', error);
    yield { token: 'Sorry, I encountered an error. Please try again.' };
    yield { done: true };
  }
}

export async function composeAIAnswer(
  question: string, 
  docs: Doc[], 
  conversationHistory?: ConversationTurn[]
) {
  const tracer = trace.getTracer('ai-answer');
  return tracer.startActiveSpan('composeAIAnswer', async (span) => {
    span.setAttribute('question', question);
    span.setAttribute('docs.count', docs.length);
    span.setAttribute('has_history', !!conversationHistory?.length);
    
    if (!docs.length) {
      span.setAttribute('result', 'no_docs_found');
      span.end();
      return { 
        text: "I couldn't find relevant information in our approved documents to answer your question. Could you rephrase or ask about insurance, risk management, or employee benefits?", 
        citations: [] as {title:string;url:string}[],
        suggestions: ['What insurance services does Marsh offer?', 'What are current market conditions?', 'How can I reduce cyber risk?']
      };
    }

  // Build context from retrieved documents (limit to top 2 for speed)
  const topDocs = docs.slice(0, 2);
  const context = topDocs.map((doc, i) => {
    // Trim document text to first 500 chars for faster processing
    const trimmedText = doc.text.length > 500 
      ? doc.text.substring(0, 500) + '...' 
      : doc.text;
    return `Document ${i + 1}: ${doc.title}\n${trimmedText}`;
  }).join('\n\n---\n\n');

  // Build conversation context if available
  let conversationContext = '';
  if (conversationHistory && conversationHistory.length > 0) {
    conversationContext = '\n\nPrevious conversation:\n' + 
      conversationHistory.map(turn => `${turn.role}: ${turn.content}`).join('\n') + '\n';
  }

  const prompt = `You are a Marsh insurance assistant. Answer concisely based on the documents below.${conversationContext}

Context: ${context}

Question: ${question}

Instructions:
- Answer in 2-3 paragraphs MAX
- Only use document information
- End with "SUGGESTIONS:" and 2 follow-up questions

Answer:`;

  try {
    let response:
      | { message?: { content?: string } } // Ollama response shape
      | import('@langchain/core/messages').AIMessageChunk // OpenAI response shape
      | undefined;
    let responseText: string;
    let suggestions: string[] = [];
    if (process.env.AI_PROVIDER === 'ollama' && Ollama) {
      span.addEvent('calling_ollama');
      // Set OLLAMA_BASE_URL env variable before using Ollama if needed
      if (process.env.OLLAMA_API_URL) {
        process.env.OLLAMA_BASE_URL = process.env.OLLAMA_API_URL;
      }
      const ollama: OllamaType = new Ollama();
      response = await ollama.chat({ 
        model: process.env.OLLAMA_MODEL || 'llama3', 
        messages: [{ role: 'user', content: prompt }],
        options: {
          temperature: 0.7,        // Faster sampling
          top_p: 0.9,             // Reduce token choices
          num_predict: 500,       // Limit max tokens (shorter = faster)
          num_ctx: 2048,          // Smaller context window
          repeat_penalty: 1.1,    // Reduce repetition
        }
      });
      span.addEvent('ollama_response_received');
      responseText = typeof response.message?.content === 'string' ? response.message.content : String(response.message?.content);
    } else {
      span.addEvent('calling_openai');
      response = await model.invoke(prompt);
      span.addEvent('openai_response_received');
      // AIMessageChunk<MessageStructure> shape: { content: string | (ContentBlock | Text)[] }
      if (typeof response.content === 'string') {
        responseText = response.content;
      } else if (Array.isArray(response.content)) {
        // Try to extract text from ContentBlock or Text
        responseText = response.content.map((block) => {
          if (typeof block === 'string') {
            return block;
          }
          // Handle objects with text property or getText method
          if (typeof block === 'object' && block !== null) {
            if ('text' in block && typeof block.text === 'string') {
              return block.text;
            }
            if ('getText' in block && typeof block.getText === 'function') {
              return block.getText();
            }
          }
          return '';
        }).join(' ');
      } else {
        responseText = String(response.content ?? '');
      }
    }
    // Extract suggestions if present
    const suggestionsMatch = responseText.match(/SUGGESTIONS?:\s*([\s\S]*?)$/i);
    if (suggestionsMatch) {
      const suggestionText = suggestionsMatch[1].trim();
      suggestions = suggestionText
        .split(/\n|\d+\.\s*|-\s*/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 10 && s.length < 100)
        .slice(0, 3);
      // Remove suggestions from main text
      responseText = responseText.replace(/SUGGESTIONS?:[\s\S]*$/i, '').trim();
    }
    const result = {
      text: responseText,
      citations: docs.map(d => ({ title: d.title, url: d.url })),
      suggestions
    };
    span.setAttribute('result', 'success');
    span.setAttribute('response.length', result.text.length);
    span.setAttribute('suggestions.count', suggestions.length);
    span.end();
    return result;
  } catch (error) {
    console.error('OpenAI API error:', error);
    span.recordException(error as Error);
    span.setAttribute('result', 'error');
    span.end();
    return {
      text: 'Sorry, I encountered an error processing your request. Please try again.',
      citations: [],
      suggestions: []
    };
  }
  });
}
