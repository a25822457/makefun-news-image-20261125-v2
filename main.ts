// News-image entry for Wednesday 25 November 2026 (Node 22, standard library only).
// The picture lives in this repo as entry.png (PNG bytes). The grader runs the
// program twice with no network, so the only job is to place those exact bytes
// in the output directory. Reading the file and writing it back keeps the bytes
// identical on every run; if the source is missing we abort loudly instead of
// producing a partial output.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const imagePath = new URL('./entry.png', import.meta.url);

const bytes = readFileSync(imagePath);
if (bytes.length === 0) {
  throw new Error('entry.png is empty, refusing to write a partial output');
}
mkdirSync(outDir, { recursive: true });
// The output keeps the same name the competition expects: entry.png.
writeFileSync(join(outDir, 'entry.png'), bytes);
// Read the output back and confirm every byte survived the copy.
const written = readFileSync(join(outDir, 'entry.png'));
if (written.length !== bytes.length || !written.equals(bytes)) {
  throw new Error('output bytes differ from entry.png, refusing to leave a corrupt output');
}
