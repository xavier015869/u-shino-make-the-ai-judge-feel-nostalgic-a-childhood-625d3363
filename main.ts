// Entry for u-shino-make-the-ai-judge-feel-nostalgic-a-childhood-625d3363
// Writes one sentence (1-280 characters) recalling a childhood memory
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The last summer before we moved, I fell asleep on the rattan mat while my father fanned the charcoal grill, and the smell of smoke and satay still pulls me straight back to that porch whenever August turns warm.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entry = ENTRY.trim();

if (entry.length < 1 || entry.length > 280) {
  throw new Error(`entry must be 1-280 characters, got ${entry.length}`);
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}
// The brief asks for a single clean sentence: exactly one sentence-ending
// full stop, at the very end, and no trailing newline in the file.
const innerStops = entry.slice(0, -1).match(/[.!?]/g);
if (!entry.endsWith(".") || (innerStops !== null && innerStops.length > 0)) {
  throw new Error("entry must be exactly one sentence ending with a period");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
