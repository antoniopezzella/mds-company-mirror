import "dotenv/config";
import { buildDesignSystemAgent } from "./agent.js";

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag: string) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const componentName = get("--component");
  const figmaNodeUrl = get("--figma-url");
  const note = get("--note");
  if (!componentName || !figmaNodeUrl) {
    console.error(
      "Usage: npm run build-component -- --component <PascalCaseName> --figma-url <figma node URL> [--note \"extra instruction\"]",
    );
    process.exit(1);
  }
  return { componentName, figmaNodeUrl, note };
}

async function main() {
  const { componentName, figmaNodeUrl, note } = parseArgs();
  const agent = buildDesignSystemAgent({ componentName, figmaNodeUrl });

  const stream = await agent.stream(
    {
      messages: [
        {
          role: "user",
          content:
            `Build/review the "${componentName}" component from this Figma node: ${figmaNodeUrl}\n\n` +
            "Follow the five-step plan in your system prompt." +
            (note ? `\n\nAdditional instruction: ${note}` : ""),
        },
      ],
    },
    { streamMode: "values" },
  );

  for await (const chunk of stream) {
    const last = chunk.messages?.[chunk.messages.length - 1];
    if (last) {
      const preview =
        typeof last.content === "string" ? last.content : JSON.stringify(last.content);
      console.log(`\n[${last.getType?.() ?? "message"}] ${preview.slice(0, 2000)}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
