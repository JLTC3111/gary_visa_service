import { build } from 'esbuild';
import { copyFile, mkdir, writeFile, rm } from 'node:fs/promises';

await rm('dist/visuals', { recursive: true, force: true });
const result = await build({
  entryPoints: { 'visual-effects': 'src/visuals/bootstrap.js' },
  outdir: 'dist/visuals',
  bundle: true,
  format: 'esm',
  splitting: true,
  chunkNames: '[name]-[hash]',
  minify: true,
  target: ['es2022'],
  jsx: 'automatic',
  metafile: true,
  legalComments: 'linked',
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'info'
});
await mkdir('dist/visuals', { recursive: true });
await copyFile('src/visuals/react-bits/LICENSE.md', 'dist/visuals/REACT-BITS-LICENSE.txt');
await writeFile('dist/visuals/build-manifest.json', JSON.stringify({
  entry: 'visual-effects.js',
  styles: Object.keys(result.metafile.outputs).filter(name => name.endsWith('.css')).map(name => name.replace('dist/', '')),
  outputs: Object.fromEntries(Object.entries(result.metafile.outputs).map(([name, entry]) => [name.replace('dist/', ''), { bytes: entry.bytes }]))
}, null, 2) + '\n');
