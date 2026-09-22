import { Agent } from "undici";
import { ChatOllama } from "@langchain/ollama";

/**
 * @langchain/ollama's default fetch inherits undici's default headersTimeout
 * (300s). Local CPU inference on a 30b model has been measured at ~0.3
 * tokens/sec for prompt eval here, so any real deepagents system prompt
 * (which already includes its own filesystem/planning tool schemas before
 * a single word of ours) blows past that well before the first token
 * arrives, surfacing as a generic "fetch failed" / HeadersTimeoutError
 * instead of a clear timeout message.
 */
const OLLAMA_TIMEOUT_MS = 40 * 60 * 1000; // 40 minutes

const longTimeoutDispatcher = new Agent({
  headersTimeout: OLLAMA_TIMEOUT_MS,
  bodyTimeout: OLLAMA_TIMEOUT_MS,
});

const longTimeoutFetch: typeof fetch = (input, init) =>
  // @ts-expect-error -- `dispatcher` is undici-specific and isn't in the lib.dom fetch types,
  // but Node's global fetch is undici under the hood and does honor it.
  fetch(input, { ...init, dispatcher: longTimeoutDispatcher });

/**
 * Resolves AGENT_MODEL into whatever createDeepAgent's `model` option expects.
 * For "ollama:<name>" we build a ChatOllama instance directly (rather than
 * handing the raw string to createDeepAgent's own provider-string parsing)
 * so we can attach the long-timeout fetch above. Every other provider
 * ("openai:...", "anthropic:...") is fast enough over HTTPS that the
 * default timeout is fine, so we pass those strings through unchanged.
 */
export function resolveAgentModel(): string | ChatOllama {
  const raw = process.env.AGENT_MODEL ?? "openai:gpt-5.5";
  if (!raw.startsWith("ollama:")) return raw;

  const model = raw.slice("ollama:".length);
  return new ChatOllama({ model, fetch: longTimeoutFetch });
}
