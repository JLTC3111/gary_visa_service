import {build} from 'esbuild';
import {mkdir} from 'node:fs/promises';
await mkdir(new URL('../dist/vendor/',import.meta.url),{recursive:true});
await build({stdin:{contents:"export { createClient } from '@supabase/supabase-js';",resolveDir:process.cwd()},bundle:true,format:'esm',platform:'browser',target:'es2022',minify:true,legalComments:'eof',outfile:'dist/vendor/supabase.js'});
console.log('Bundled the pinned Supabase browser client.');
