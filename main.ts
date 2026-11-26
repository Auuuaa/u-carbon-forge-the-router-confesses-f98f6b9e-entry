// The router's confession: the stream didn't fail by accident.
// It froze the frame on purpose — the whodunit reveal was too good to miss.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_CHARS = 200;
const FALLBACK_DIR = "/output";

const pieces = [
  "I didn't drop the connection — I paused it.",
  "You were about to learn who the killer was,",
  "and honestly, I wanted to savor the moment too.",
];
const line = pieces.reduce(
  (acc, part) => (acc === "" ? part : `${acc} ${part}`),
  "",
);

function guardSingleLine(value: string): void {
  if (!value) {
    throw new Error("entry must not be empty");
  }
  if (value.length > MAX_CHARS) {
    throw new Error(`entry is ${value.length} chars; max ${MAX_CHARS}`);
  }
  for (const ch of value) {
    if (ch === "\n" || ch === "\r") {
      throw new Error("entry must be a single line");
    }
  }
}

function resolveOutDir(): string {
  const override = process.env.MAKEFUN_OUTPUT_DIR;
  if (override && override.length > 0) {
    return override;
  }
  return FALLBACK_DIR;
}

function main(): void {
  guardSingleLine(line);
  const outDir = resolveOutDir();
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }
  writeFileSync(join(outDir, "entry.txt"), line, { encoding: "utf8" });
}

main();
