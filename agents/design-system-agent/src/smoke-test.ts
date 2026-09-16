import "dotenv/config";
import { createDeepAgent } from "deepagents";
import { tool } from "langchain";
import { z } from "zod";
import { resolveAgentModel } from "./model.js";

const ping = tool(async ({ value }: { value: string }) => `pong:${value}`, {
  name: "ping",
  description: "Echoes back pong: plus the given value. Call this to prove tool calling works.",
  schema: z.object({ value: z.string() }),
});

const agent = createDeepAgent({
  model: resolveAgentModel(),
  systemPrompt: "You must call the ping tool with value='hello' before responding, then report its exact result.",
  tools: [ping],
});

const result = await agent.invoke({
  messages: [{ role: "user", content: "Call ping with value hello and tell me the result." }],
});

const last = result.messages[result.messages.length - 1];
console.debug("FINAL:", typeof last.content === "string" ? last.content : JSON.stringify(last.content));
