import { build } from 'esbuild';

await build({
  entryPoints: ['src/feedback/action-feedback.tsx'],
  outdir: 'dist/feedback',
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  target: 'es2022',
  minify: true,
  legalComments: 'eof',
  define: { 'process.env.NODE_ENV': '"production"' }
});
