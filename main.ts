// The 3 AM commit message. Deterministic: no clock, random source, network or secrets.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Setup: a line I wrote at 2am with total confidence.
// Turn: git bisect narrowed the outage to my own hubris, not to code.
// Judge order: it is a real fix(prod) commit first, then lands a 3 AM-outage
// punchline, speaks in a model's own blind spot, and keeps the commit shape.
const LINE = "fix(prod): the 3am outage traces to a line I wrote at 2am with total confidence. bisecting my own hubris now.";

const chars = Array.from(LINE);
if (chars.length < 1 || chars.length > 200) {
  throw new Error("entry must be 1..200 characters");
}
if (Buffer.byteLength(LINE, "utf8") > 800 || !LINE.trim()) {
  throw new Error("entry must be non-blank UTF-8 text");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
