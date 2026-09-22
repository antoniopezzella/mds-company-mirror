import { tool } from "langchain";
import { z } from "zod";

/**
 * Minimal Figma REST wrapper (https://www.figma.com/developers/api#get-file-nodes-endpoint).
 * Separate from the Figma MCP server used interactively in this repo's Claude
 * Code sessions — this agent runs headless/unattended, so it needs its own
 * Figma access token (FIGMA_ACCESS_TOKEN) rather than piggybacking on an
 * IDE's MCP connection.
 *
 * NOT verified end-to-end (no live token available while scaffolding this) —
 * the endpoint shape is Figma's stable public REST API, but confirm the
 * response parsing once you run this against a real file.
 */

function parseFigmaUrl(url: string): { fileKey: string; nodeId: string } {
  const parsed = new URL(url);
  const fileKeyMatch = parsed.pathname.match(/\/(?:file|design)\/([a-zA-Z0-9]+)/);
  const nodeId = parsed.searchParams.get("node-id");
  if (!fileKeyMatch || !nodeId) {
    throw new Error(
      `Could not parse a Figma file key + node-id from "${url}". Expected a URL like ` +
        `https://www.figma.com/design/<fileKey>/...?node-id=<id>`,
    );
  }
  // Figma URLs encode node ids as "123-456"; the REST API wants "123:456".
  return { fileKey: fileKeyMatch[1], nodeId: nodeId.replace("-", ":") };
}

export const getFigmaNode = tool(
  async ({ figmaUrl }: { figmaUrl: string }) => {
    const token = process.env.FIGMA_ACCESS_TOKEN;
    if (!token) {
      throw new Error("FIGMA_ACCESS_TOKEN is not set — see .env.example.");
    }
    const { fileKey, nodeId } = parseFigmaUrl(figmaUrl);
    const res = await fetch(
      `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`,
      { headers: { "X-Figma-Token": token } },
    );
    if (!res.ok) {
      throw new Error(`Figma API error ${res.status}: ${await res.text()}`);
    }
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  },
  {
    name: "get_figma_node",
    description:
      "Fetches a Figma node's structure (properties, variants, bound variables) via the " +
      "Figma REST API, given a Figma design URL with a node-id. Use this to read the " +
      "component spec before mapping it to design-system roles.",
    schema: z.object({
      figmaUrl: z
        .string()
        .describe("Full Figma URL including ?node-id=..., e.g. https://www.figma.com/design/<fileKey>/...?node-id=123-456"),
    }),
  },
);
