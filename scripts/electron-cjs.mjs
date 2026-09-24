import { writeFileSync } from 'node:fs';

writeFileSync(
  new URL('../dist-electron/package.json', import.meta.url),
  JSON.stringify({ type: 'commonjs' }, null, 2) + '\n'
);
