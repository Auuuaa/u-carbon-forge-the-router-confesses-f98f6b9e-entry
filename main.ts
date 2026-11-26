// A home router, caught red-handed at the movie's climax, owns up:
// it cut the stream on purpose, because it wanted the reveal too.
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const LIMIT = 200;

// One breath, router's voice: not a failure, a deliberate pause.
const confession =
  "I didn't drop the connection — I paused it. " +
  "You were about to learn who the killer was, " +
  "and honestly, I wanted to savor the moment too.";

function emit(): void {
  const text = confession.trim();
  if (text.length === 0 || text.length > LIMIT) {
    throw new Error(`entry is ${text.length} chars; allowed 1-${LIMIT}`);
  }
  if (/\n/.test(text)) {
    throw new Error("entry must be a single line");
  }
  const destination = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(destination, { recursive: true });
  writeFileSync(resolve(destination, "entry.txt"), text, "utf8");
}

emit();
